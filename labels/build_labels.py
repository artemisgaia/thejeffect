#!/usr/bin/env python3
"""
Build The J Effect Supliful labels from the Supliful template (.ai) files.

For every template folder in "Labels Supliful/" this:
  1. reads the template's text lines + positions (PyMuPDF),
  2. keeps the side panels (suggested use / warnings / ingredients / PAO icon)
     word-for-word at the exact template positions, recoloured,
  3. swaps the manufacturer placeholder for The J Effect's address,
  4. replaces the centre artwork with the forest-green / gold front panel,
  5. prints with headless Chrome, outlines all text (pdftocairo -> SVG -> Chrome, page cropped to the exact template size),
  6. sets Media/Crop/Bleed = full page and Trim/Art = 9pt inset (Supliful spec).

Requires: pip install pymupdf pikepdf ; poppler (pdftocairo) ; Google Chrome.
Run with:  python3 build_labels.py [CODE ...]
"""
import fitz, glob, html, os, re, subprocess, sys, tempfile, shutil
import pikepdf
from label_themes import THEMES, DEFAULT, pattern_svg, mix, check_contrast, _lum

HERE = os.path.dirname(os.path.abspath(__file__))
TPL = os.path.join(HERE, 'Labels Supliful')
SRC = os.path.join(HERE, 'src')
OUT = os.path.join(HERE, 'output')
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

FOREST, GOLD, GOLD_L, CREAM, CLAIM = '#243B27', '#C9A15B', '#D4AA60', '#F7F3EC', '#E3DDD0'
ADDRESS = ['The J Effect', '1600 Vine St, Los Angeles, CA 90028', 'info@thejeffect.com']


def parse(path):
    page = fitz.open(path)[0]
    W, H = page.rect.width, page.rect.height
    spans = []
    for b in page.get_text('dict')['blocks']:
        if b['type'] != 0:
            continue
        for l in b['lines']:
            for s_ in l['spans']:
                if s_['text'].strip():
                    spans.append(dict(x0=s_['bbox'][0], x1=s_['bbox'][2], base=s_['origin'][1], size=s_['size'],
                                      bold='Bold' in s_['font'], text=s_['text']))
    spans.sort(key=lambda s_: s_['base'])
    rows = []
    for s_ in spans:
        if rows and abs(rows[-1][0]['base'] - s_['base']) < 0.6:
            rows[-1].append(s_)
        else:
            rows.append([s_])
    groups = []
    for row in rows:
        row.sort(key=lambda s_: s_['x0'])
        cur = None
        for s_ in row:
            if cur and abs(cur[-1]['size'] - s_['size']) < 0.6 and 0 <= s_['x0'] - cur[-1]['x1'] + 0.5 and s_['x0'] - cur[-1]['x1'] <= 14:
                cur.append(s_)
            else:
                cur = [s_]
                groups.append(cur)
    lines = []
    for g in groups:
        segs, prev = [], None
        for s_ in g:
            t = s_['text']
            if prev is not None and not prev['text'].endswith(' ') and not t.startswith(' ') and s_['x0'] - prev['x1'] > 1.0:
                t = ' ' + t
            segs.append((t, s_['bold'], s_['size'], s_['base']))
            prev = s_
        text = ''.join(t for t, *_ in segs)
        lines.append(dict(x0=min(s_['x0'] for s_ in g), x1=max(s_['x1'] for s_ in g), base=g[0]['base'],
                          size=max(s_['size'] for s_ in g), segs=segs, text=text.strip(),
                          bold=all(s_['bold'] for s_ in g)))
    allD = []
    for d in page.get_drawings():
        fl = d.get('fill'); r = d['rect']
        if r.width >= W - 1 and r.height >= H - 1:
            continue  # background
        if fl and fl[1] > 0.6 and fl[0] < 0.4:
            continue  # green placeholder
        allD.append(d)
    dark = [d for d in allD if not (d.get('fill') and all(c > 0.97 for c in d['fill']))]
    icon = []
    if dark:
        bb = fitz.Rect(dark[0]['rect'])
        for d in dark:
            bb |= d['rect']
        bb += (-1, -1, 1, 1)
        for d in allD:  # keep original paint order
            white = d.get('fill') and all(c > 0.97 for c in d['fill'])
            if not white:
                icon.append(d)
            elif bb.contains(d['rect']):
                icon.append(dict(d, _white=True))
    return W, H, lines, icon


def drawing_svg(d, color):
    parts, cur = [], None

    def mv(pt):
        nonlocal cur
        if cur is None or abs(cur.x - pt.x) > 1e-3 or abs(cur.y - pt.y) > 1e-3:
            parts.append(f'M{pt.x:.3f} {pt.y:.3f}')

    for it in d['items']:
        k = it[0]
        if k == 'l':
            p1, p2 = it[1], it[2]
            mv(p1); parts.append(f'L{p2.x:.3f} {p2.y:.3f}'); cur = p2
        elif k == 'c':
            p1, c1, c2, p2 = it[1:5]
            mv(p1); parts.append(f'C{c1.x:.3f} {c1.y:.3f} {c2.x:.3f} {c2.y:.3f} {p2.x:.3f} {p2.y:.3f}'); cur = p2
        elif k == 're':
            r = it[1]
            parts.append(f'M{r.x0:.3f} {r.y0:.3f}H{r.x1:.3f}V{r.y1:.3f}H{r.x0:.3f}Z'); cur = None
        elif k == 'qu':
            q = it[1]
            parts.append(f'M{q.ul.x:.3f} {q.ul.y:.3f}L{q.ur.x:.3f} {q.ur.y:.3f}L{q.lr.x:.3f} {q.lr.y:.3f}L{q.ll.x:.3f} {q.ll.y:.3f}Z'); cur = None
    path = ''.join(parts)
    if d.get('closePath'):
        path += 'Z'
    fill = color if d.get('fill') else 'none'
    stroke = color if d.get('color') else 'none'
    sw = d.get('width') or 0
    rule = 'evenodd' if d.get('even_odd') else 'nonzero'
    return (f'<path d="{path}" fill="{fill}" fill-rule="{rule}" stroke="{stroke}" '
            f'stroke-width="{sw:.3f}" stroke-linejoin="round" stroke-linecap="round"/>')


def line_html(L, left, width=None, justify=False):
    top = L['base'] - 1.05 * L['size']
    inner = ''
    for t, bold, size, _ in L['segs']:
        t = html.escape(t)
        inner += f'<b>{t}</b>' if bold else t
    inner = inner.rstrip()
    st = f'left:{left:.2f}pt;top:{top:.2f}pt;font-size:{L["size"]:.2f}pt;'
    if justify:
        st += f'width:{width:.2f}pt;text-align:justify;text-align-last:justify;'
    else:
        st += 'white-space:nowrap;'
    return f'<div class="ln" style="{st}">{inner}</div>'


ICON_SAFE = 12.4  # jar icon is artwork, not text: keep it just inside Supliful's 12pt safe line
SAFE = 13.5   # pt from the cut edge: Supliful trim inset is 9pt, safe zone 12pt, +1.5pt cushion
LABELS = re.compile(r'^(SUGGESTED USE:|CAUTION:|WARNING:|STORAGE:|KEEP OUT|INGREDIENTS:|Ingredients:|Manufactured)')


def seg_html(L):
    out = ''
    for t, bold, size, _ in L['segs']:
        t = html.escape(t)
        out += f'<b>{t}</b>' if bold else t
    return out.strip()


def column_html(col, W, H, is_right, pl, pr):
    col = sorted(col, key=lambda L: L['base'])
    if not col:
        return ''
    cmax = max(L['x1'] for L in col)
    cmin = min(L['x0'] for L in col)
    deltas = [b['base'] - a['base'] for a, b in zip(col, col[1:]) if b['base'] - a['base'] > 0.5]
    pitch = min(deltas) if deltas else col[0]['size'] * 1.2
    paras, cur, prev = [], None, None
    for L in col:
        delta = (L['base'] - prev['base']) if prev else 0
        if cur is None or LABELS.match(L['text']) or delta > pitch * 1.25:
            cur = dict(lines=[L], gap=max(0, delta - pitch) if prev else 0)
            paras.append(cur)
        else:
            cur['lines'].append(L)
        prev = L
    if is_right:      # keep the template's column width: slide left instead of narrowing when the cut edge is close
        xr = min(cmax, W - SAFE)
        xl = max(pl + 3, cmin - max(0, cmax - xr))
    else:
        xl = max(cmin, SAFE)
        xr = min(cmax + max(0, xl - cmin), pl - 3)
    width = xr - xl
    first = col[0]
    size = first['size']
    top = first['base'] - ((pitch - 1.4 * size) / 2 + 1.05 * size)
    dy = max(0, SAFE - 0.3 + 0.72 * size - first['base'])      # cap-height clearance from the top cut edge
    out = []
    for P in paras:
        L0 = P['lines'][0]
        txt0 = L0['text']
        if txt0.startswith('Manufactured'):
            head = 'Manufactured for and distributed by:' if width >= 110 else 'Manufactured for and<br>distributed by:'
            addr = (['The J Effect', '1600 Vine St,<br><span style="white-space:nowrap">Los Angeles, CA 90028</span>', 'info@thejeffect.com']
                    if width < 80 else [ADDRESS[0], ADDRESS[1].replace(', CA 9', ', CA&nbsp;9'), ADDRESS[2]])
            body, just = head + '<br>' + '<br>'.join(addr), False
        else:
            body = ' '.join(seg_html(L) for L in P['lines'])
            full = [L for L in P['lines'][:-1] if L['x1'] >= cmax - 0.7]
            just = len(P['lines']) > 1 and len(full) >= max(1, (len(P['lines']) - 1) / 2)
        out.append(f'<p style="margin-top:{P["gap"]:.2f}pt;font-size:{L0["size"]:.2f}pt;'
                   f'text-align:{"justify" if just else "left"}">{body}</p>')
    return (f'<div class="col" style="left:{xl:.2f}pt;top:{top + dy:.2f}pt;width:{width:.2f}pt;line-height:{pitch:.2f}pt">'
            + ''.join(out) + '</div>')


def build_html(code, W, H, lines, icon):
    anchors = [L for L in lines if L['size'] >= 9.5 and L['bold']] or \
              [L for L in lines if L['bold'] and L['size'] >= 6.5 and L['x0'] > .2 * W and L['x1'] < .8 * W]
    cx = sum((L['x0'] + L['x1']) / 2 for L in anchors) / len(anchors) if anchors else W / 2
    side, center = [], []
    for L in lines:
        mid = (L['x0'] + L['x1']) / 2
        (center if abs(mid - cx) < 4 and L['x0'] > .1 * W and L['x1'] < .9 * W else side).append(L)
    left = [L for L in side if (L['x0'] + L['x1']) / 2 < cx]
    right = [L for L in side if (L['x0'] + L['x1']) / 2 >= cx]

    # ---- side columns: re-flowed inside the safe zone, J Effect address replaces the placeholder
    # ---- centre content ------------------------------------------------------------
    center.sort(key=lambda L: L['base'])
    big = [L for L in center if L['size'] >= 9.5]
    name_lines = big or [L for L in center if L['bold'] and L['size'] >= 6.5]
    rest = [L for L in center if L not in name_lines]
    net = [L['text'] for L in rest if L['text'].startswith('Net')]
    rest = [L for L in rest if not L['text'].startswith('Net')]
    cmin = min([L['size'] for L in rest] or [4.5])
    typ_lines = []
    for L in rest:  # leading run of caps / larger lines directly under the name = subtitle
        if len(typ_lines) == rest.index(L) and L['base'] > (name_lines[-1]['base'] if name_lines else 0) and \
                (L['text'].upper() == L['text'] or L['size'] >= cmin + 0.4 and L['size'] > 4.9 and rest[-1] is not L):
            typ_lines.append(L)
    claims_lines = [L for L in rest if L not in typ_lines]
    name = [L['text'] for L in name_lines]
    typ = [L['text'] for L in typ_lines]
    claims = [L['text'].replace(' - ', '-') for L in claims_lines]

    Lw = max([L['x1'] for L in left] or [0])
    Rw = min([L['x0'] for L in right] or [W])
    half = min(cx - (Lw + 6 if left else 0), Rw - 6 - cx)
    px0, pw = cx - half, 2 * half
    side_html = column_html(left, W, H, False, px0, px0 + pw) + column_html(right, W, H, True, px0, px0 + pw)

    alltxt = ' '.join(typ)
    caps = alltxt.upper() == alltxt
    t = .34 if caps and max([len(x) for x in typ] or [0]) <= 13 else (.18 if caps else .07)
    trk = f'letter-spacing:{t}em;text-indent:{t}em'
    esc = lambda a: '<br>'.join(html.escape(x) for x in a)
    th = THEMES.get(code, DEFAULT)
    bg, fg, acc, acc2, sbg, sfg = th['bg'], th['fg'], th['acc'], th['acc2'], th['sbg'], th['sfg']
    dark = _lum(bg) < .3
    icon_svg = ''
    ib = 'null'
    if icon:
        ix1 = max(d['rect'].x1 for d in icon); iy1 = max(d['rect'].y1 for d in icon)
        ix0 = min(d['rect'].x0 for d in icon); iy0 = min(d['rect'].y0 for d in icon)
        idx = min(0, (W - ICON_SAFE) - ix1) + max(0, ICON_SAFE - ix0)
        idy = min(0, (H - ICON_SAFE) - iy1) + max(0, ICON_SAFE - iy0)
        ib = f'[{ix0 + idx:.2f},{iy0 + idy:.2f},{ix1 + idx:.2f},{iy1 + idy:.2f}]'
        icon_svg = (f'<svg class="ico" width="{W}pt" height="{H}pt" viewBox="0 0 {W} {H}"><g transform="translate({idx:.2f} {idy:.2f})">' +
                    ''.join(drawing_svg(d, sbg if d.get('_white') else sfg) for d in icon) + '</g></svg>')

    lay = th['layout']
    fy = 12.5
    R = min(pw / 2 - 4, 30)
    framecss = {
        'frame': f'border:.5pt solid {acc};',
        'double': f'border:1.1pt solid {acc};outline:.35pt solid {acc};outline-offset:-{2.4 if H < 110 else 3.2}pt;',
        'arch': f'border:.6pt solid {acc};border-radius:{R:.1f}pt {R:.1f}pt 2pt 2pt;padding-top:7pt;',
        'corners': '',
        'band': '',
        'rules': f'border-top:.5pt solid {acc};border-bottom:.5pt solid {acc};padding:4pt 1.5pt;',
    }[lay]
    corners_svg = ''
    if lay == 'corners':
        x1, x2, y1, y2, L_ = 4, pw - 4, fy, H - fy, 9
        d = (f'M{x1} {y1 + L_}V{y1}H{x1 + L_}M{x2 - L_} {y1}H{x2}V{y1 + L_}'
             f'M{x2} {y2 - L_}V{y2}H{x2 - L_}M{x1 + L_} {y2}H{x1}V{y2 - L_}')
        corners_svg = (f'<svg style="position:absolute;left:0;top:0" width="{pw:.2f}pt" height="{H}pt" viewBox="0 0 {pw:.2f} {H}">'
                       f'<path d="{d}" fill="none" stroke="{acc}" stroke-width=".9" stroke-linecap="square"/></svg>')
    bandcss = ''
    if lay == 'band':
        bandcss = (f'.markwrap{{align-self:stretch;margin:0 -5.5pt;padding:4.5pt 0;background:{mix(bg, acc, .3 if dark else .5)};'
                   f'border-top:.45pt solid {acc};border-bottom:.45pt solid {acc}}}')
    soft = th['pattern'] in ('dots', 'speckle', 'stars', 'beans')
    strong = mix(bg, acc, (.22 if dark else .40) * (.8 if soft else 1))
    faint = mix(bg, acc, .07 if dark else .15)
    fx0, fy0, fx1, fy1 = 4, fy, pw - 4, H - fy
    clip = (f'<clipPath id="out"><path clip-rule="evenodd" d="M0 0H{pw:.2f}V{H}H0Z M{fx0} {fy0}V{fy1}H{fx1:.2f}V{fy0}Z"/></clipPath>')
    inner_pat = pattern_svg(th["pattern"], pw, H, faint, code)
    outer_pat = pattern_svg(th["pattern"], pw, H, strong, code)
    pat = (f'<svg style="position:absolute;left:0;top:0" width="{pw:.2f}pt" height="{H}pt" viewBox="0 0 {pw:.2f} {H}">'
           f'<defs>{clip}</defs><g>{inner_pat}</g><g clip-path="url(#out)">{outer_pat}</g></svg>')
    if th['font'] == 'serif':
        namecss = "font-family:'Cormorant Garamond',serif;font-weight:600;font-size:11.5pt;letter-spacing:.12em;line-height:1.05"
    else:
        namecss = "font-weight:700;font-size:9pt;letter-spacing:.06em;line-height:1.12"

    return f"""<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../fonts/fonts.css">
<style>
@page{{size:{W}pt {H}pt;margin:0}}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:{W}pt;height:{H}pt;background:{sbg};overflow:hidden}}
body{{position:relative;font-family:'Poppins',sans-serif;color:{sfg}}}
.col{{position:absolute;font-weight:400}}
.col p{{margin:0}} .col b{{font-weight:700}}
.ico{{position:absolute;left:0;top:0}}
.panel{{position:absolute;top:0;height:{H}pt;left:{px0:.2f}pt;width:{pw:.2f}pt;background:{bg};color:{fg};overflow:hidden}}
.frame{{position:absolute;left:4pt;right:4pt;top:{fy}pt;bottom:{fy}pt;{framecss}
 display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;text-align:center;padding:2pt 1.5pt;gap:4pt}}
{bandcss}
.markwrap{{display:flex;justify-content:center}}
.mark{{display:flex;justify-content:center;align-items:baseline;gap:.2em;font-family:'Cormorant Garamond',serif;font-size:13pt;line-height:1;white-space:nowrap}}
.the{{font-size:.56em;font-style:italic;font-weight:400;letter-spacing:.04em}}
.j{{font-size:1.5em;font-weight:500;font-style:italic;color:{acc2};line-height:.7;margin:0 .14em 0 -.04em}}
.eff{{font-weight:500;letter-spacing:.3em;text-transform:uppercase;margin-right:-.3em}}
.name{{{namecss};text-transform:uppercase}}
.type{{font-size:7pt;line-height:1.2;color:{acc2};font-weight:500}}
.claims{{font-size:7pt;line-height:8pt;color:{mix(bg, fg, .92)}}}
.net{{font-size:7pt;line-height:1.2}}
.g{{display:flex;flex-direction:column;align-items:center;gap:2.2pt}}
</style></head><body>
{side_html}{icon_svg}
<div class="panel">{pat}{corners_svg}<div class="frame" id="frame">
 <div class="markwrap"><div class="mark" data-fit="0.94"><span class="the">The</span><span class="j">J</span><span class="eff">Effect</span></div></div>
 <div class="g"><div class="name" data-fit="0.94">{esc(name)}</div>{f'<div class="type" style="{trk}">{esc(typ)}</div>' if typ else ''}</div>
 <div class="g">{('<div class="claims">' + ''.join('<div class="cl">' + html.escape(c) + '</div>' for c in claims) + '</div>') if claims else ''}<div class="net">{esc(net)}</div></div>
</div></div>
<script>
document.fonts.ready.then(()=>{{
 const fr=document.getElementById('frame'); const avail=fr.clientWidth-5-({'8' if lay in ('arch','double') else '0'});
 document.querySelectorAll('.cl').forEach(c=>{{ c.style.whiteSpace='nowrap'; c.style.display='inline-block';
  if(c.offsetWidth>avail){{ c.style.whiteSpace='normal'; c.style.display='block'; c.style.width=avail+'px'; c.style.textWrap='balance'; }} else {{ c.style.display='block'; }} }});
 const net=document.querySelector('.net'); net.style.display='inline-block'; net.style.whiteSpace='nowrap';
 if(net.offsetWidth>avail) net.innerHTML=net.textContent.replace(/^(Net Wt\\.)\\s*/,'$1<br>'); net.style.display=''; net.style.whiteSpace='';
 const fit=(el,k,min)=>{{ el.style.whiteSpace='nowrap'; el.style.display='inline-block'; let fs=parseFloat(getComputedStyle(el).fontSize);
  while(el.offsetWidth>avail*k && fs>min){{ fs*=0.97; el.style.fontSize=fs+'px'; }} el.style.display=''; }};
 const mark=fr.querySelector('.mark'), name=fr.querySelector('.name');
 fit(mark,0.94,11); fit(name,0.94,10);
 const gapPx=()=>parseFloat(getComputedStyle(fr).rowGap)||0;
 const tight=()=>{{ let sum=0; for(const c of fr.children) sum+=c.offsetHeight; const cs=getComputedStyle(fr);
  const inner=fr.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom)-2; return sum+(fr.children.length-1)*gapPx() > inner; }};
 const cl=(f)=>document.querySelectorAll('.claims').forEach(f), cll=document.querySelectorAll('.cl');
 const steps=[()=>mark.style.fontSize='11.5pt',()=>cl(c=>c.style.lineHeight='7.4pt'),()=>fr.style.gap='3pt',()=>mark.style.fontSize='10pt',
  ()=>cl(c=>c.style.lineHeight='7pt'),()=>name.style.fontSize='9pt',()=>fr.style.gap='2pt',()=>mark.style.fontSize='9pt',()=>name.style.fontSize='8.2pt',
  ()=>{{ fr.style.padding='0 1.5pt'; fr.style.gap='1.2pt'; }},()=>mark.style.fontSize='8.4pt',()=>name.style.fontSize='7.6pt',()=>cl(c=>c.style.lineHeight='6.9pt')];
 for(const st of steps){{ if(!tight()) break; st(); }}
 if(tight()) document.body.setAttribute('data-overflow','1');
 {{ const fb=fr.getBoundingClientRect();
  const bad=[...fr.querySelectorAll('.mark,.name,.type,.cl,.net')].some(e=>{{const r=e.getBoundingClientRect(); return r.top<fb.top+2||r.bottom>fb.bottom-2||r.left<fb.left+2||r.right>fb.right-2;}});
  if(bad) document.body.setAttribute('data-overflow','1');
  const pb=document.querySelector('.panel').getBoundingClientRect();
  const hit=[...document.querySelectorAll('.col')].some(e=>{{const r=e.getBoundingClientRect(); return r.right>pb.left+0.5&&r.left<pb.right-0.5&&r.bottom>pb.top&&r.top<pb.bottom;}});
  {{ const k=4/3; document.querySelectorAll('.col').forEach(col=>{{ const p0=col.firstElementChild; if(!p0) return;
   const pr=document.createElement('i'); pr.style.cssText='display:inline-block;width:0;height:0'; p0.insertBefore(pr,p0.firstChild);
   const base=pr.getBoundingClientRect().top; pr.remove(); const fs=parseFloat(getComputedStyle(p0).fontSize);
   const need=({SAFE}-0.3)*k-(base-0.76*fs); if(need>0) col.style.top=(parseFloat(col.style.top)+need/k)+'pt'; }}); }}
  const IB={ib};
  const trects=(el)=>{{ const rg=document.createRange(); rg.selectNodeContents(el); return [...rg.getClientRects()].filter(r=>r.width>1); }};
  if(IB){{ const k=4/3; document.querySelectorAll('.col').forEach(col=>{{ const last=col.lastElementChild; if(!last) return;
   const hit=()=>trects(last).some(r=>r.right>IB[0]*k-2&&r.left<IB[2]*k+2&&r.bottom>IB[1]*k-4&&r.top<IB[3]*k);
   if(hit()){{ const rs=trects(last).filter(r=>r.right>IB[0]*k-2); const over=Math.max(...rs.map(r=>r.bottom))-(IB[1]*k-4); const mt=parseFloat(getComputedStyle(last).marginTop)||0;
    last.style.marginTop=Math.max(0,mt-over-2)+'px'; if(hit()) document.body.setAttribute('data-edge','1'); }} }}); }}
  const lim=({SAFE}-0.5)*4/3, WP={W}*4/3, HP={H}*4/3;
  const edge=[...document.querySelectorAll('.col p,.mark,.name,.type,.cl,.net')].some(e=>{{const r=e.getBoundingClientRect(); return r.left<lim-1||r.right>WP-lim+1||r.bottom>HP-lim+1||r.top<lim-6;}});
  if(edge) document.body.setAttribute('data-edge','1');
  if(hit) document.body.setAttribute('data-sidehit','1'); }}

}});
</script></body></html>""", (name, typ, claims, net, round(half * 2, 1))


def render(code, src_html, W, H, outpdf, outpng):
    tmp = tempfile.mkdtemp()
    dom = subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--allow-file-access-from-files',
                          '--virtual-time-budget=6000', '--dump-dom', 'file://' + src_html],
                         capture_output=True, text=True).stdout
    if re.search(r'<body[^>]*data-overflow', dom):
        print(f'  !! {code}: front text too close to / crossing the frame')
    if re.search(r'<body[^>]*data-edge', dom):
        print(f'  !! {code}: text too close to the cut edge')
    if re.search(r'<body[^>]*data-sidehit', dom):
        print(f'  !! {code}: side text touches the front panel')
    raw = os.path.join(tmp, 'raw.pdf')
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
                    '--allow-file-access-from-files', '--virtual-time-budget=6000',
                    f'--print-to-pdf={raw}', 'file://' + src_html],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    svg = os.path.join(tmp, 'o.svg')
    subprocess.run(['pdftocairo', '-svg', '-f', '1', '-l', '1', raw, svg], check=True)
    sv = open(svg).read()
    sv = re.sub(r'<svg([^>]*?)width="[\d.]+pt" height="[\d.]+pt" viewBox="[^"]*"',
                f'<svg\\1width="{W}pt" height="{H}pt" viewBox="0 0 {W} {H}"', sv, 1)
    sbg = THEMES.get(code, DEFAULT)['sbg']
    wrap = os.path.join(tmp, 'o.html')
    open(wrap, 'w').write(f'<!doctype html><html><head><meta charset="utf-8"><style>@page{{size:{W}pt {H}pt;margin:0}}'
                          f'html,body{{margin:0;padding:0;background:{sbg};overflow:hidden}}svg{{display:block}}</style></head><body>'
                          + sv[sv.index('<svg'):] + '</body></html>')
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
                    f'--print-to-pdf={outpdf}', 'file://' + wrap],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    pdf = pikepdf.open(outpdf, allow_overwriting_input=True)
    pg = pdf.pages[0]
    Hc = float(pg.MediaBox[3]) - float(pg.MediaBox[1])
    dy = Hc - H                                    # Chrome rounds the page up; trim the spare strip at the bottom
    if abs(dy) > 1e-3:
        pg.contents_add(pikepdf.Stream(pdf, f'q 1 0 0 1 0 {-dy:.4f} cm\n'.encode()), prepend=True)
        pg.contents_add(pikepdf.Stream(pdf, b'\nQ'))
    M, T = [0, 0, W, H], [9, 9, W - 9, H - 9]
    pg.MediaBox = M; pg.CropBox = M; pg.BleedBox = M; pg.TrimBox = T; pg.ArtBox = T
    pdf.save(outpdf)
    subprocess.run(['pdftocairo', '-png', '-r', '300', '-singlefile', outpdf, outpng[:-4]], check=True)
    shutil.rmtree(tmp)


def main(only):
    os.makedirs(SRC, exist_ok=True); os.makedirs(OUT, exist_ok=True)
    for d in sorted(os.listdir(TPL)):
        if not os.path.isdir(os.path.join(TPL, d)):
            continue
        code = d.split('_')[0]
        if only and code not in only:
            continue
        ai = glob.glob(os.path.join(TPL, d, '*.ai'))[0]
        W, H, lines, icon = parse(ai)
        h, info = build_html(code, W, H, lines, icon)
        src = os.path.join(SRC, f'{code}.html')
        open(src, 'w').write(h)
        pdf = os.path.join(OUT, f'{d}_label.pdf')
        png = os.path.join(OUT, f'{code}_preview.png')
        render(code, src, W, H, pdf, png)
        print(f'{code}  {W}x{H}  panel={info[4]}pt  name={info[0]} type={info[1]} claims={len(info[2])} net={info[3]}')


if __name__ == '__main__':
    main(set(sys.argv[1:]))
