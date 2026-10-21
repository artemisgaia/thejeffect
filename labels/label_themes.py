"""
Per-product visual themes for The J Effect Supliful labels.

Only the FRONT (middle) panel and the colour of the side panels change.
All regulatory text, positions, sizes and icons stay as Supliful's template.

theme keys
  layout : frame | double | arch | corners | band | rules
  pattern: dots speckle waves rays arcs lines leaves hex drops stars weave citrus fan beans blades strands chevrons
  font   : sans (Poppins bold caps) | serif (Cormorant Garamond caps)
  bg/fg  : front panel background / text
  acc    : decorative accent (frame, pattern, J)      acc2: accent used for TEXT (subtitle), defaults to acc
  sbg/sfg: side-panel background / text
"""
import math, random

CREAMW = '#F7F3EC'


def _rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def mix(a, b, t):
    """colour a blended toward b by t (opaque result, avoids PDF transparency)"""
    ra, rb = _rgb(a), _rgb(b)
    return '#%02X%02X%02X' % tuple(round(ra[i] + (rb[i] - ra[i]) * t) for i in range(3))


def _lum(h):
    def f(c):
        c /= 255
        return c / 12.92 if c <= .03928 else ((c + .055) / 1.055) ** 2.4
    r, g, b = _rgb(h)
    return .2126 * f(r) + .7152 * f(g) + .0722 * f(b)


def contrast(a, b):
    la, lb = _lum(a), _lum(b)
    if la < lb:
        la, lb = lb, la
    return (la + .05) / (lb + .05)


def T(layout, pattern, font, bg, fg, acc, sbg, sfg, acc2=None):
    return dict(layout=layout, pattern=pattern, font=font, bg=bg, fg=fg, acc=acc, acc2=acc2 or acc, sbg=sbg, sfg=sfg)


THEMES = {
    # ---- serums -------------------------------------------------------------------
    'EVL0NCNS': T('frame',   'dots',     'sans',  '#0F3B3D', '#F2F7F5', '#7FD0C0', '#EEF4F3', '#0F3B3D'),           # niacinamide: lab teal
    'EVL0PDRN': T('arch',    'rays',     'serif', '#F3DDD3', '#5A2B34', '#B76E79', '#FBF3EF', '#4A2229', '#8E3F55'),  # PDRN brightening: rose gold
    'EVL0PPEC': T('corners', 'arcs',     'sans',  '#E4E7F7', '#252A63', '#6E74C9', '#F4F5FC', '#252A63', '#4249A8'),  # eye gel-cream: periwinkle
    'EVL0REPE': T('double',  'lines',    'sans',  '#5E1A33', '#FBEFF1', '#F0A6B8', '#F8EEF0', '#4B1226'),           # retinol + peptide: wine
    'FMN0DRSE': T('band',    'dots',     'sans',  '#E6EDE4', '#2F4A36', '#6F9A78', '#F6F8F4', '#2F4A36', '#42694B'),  # dark spot, sensitive: soft sage
    'FMN0SPOT': T('frame',   'speckle',  'sans',  '#3A4310', '#F6F4E0', '#C7D75A', '#F4F5E8', '#2F3610'),           # dark spot, normal: olive lime
    'FMN0GUSH': T('arch',    'arcs',     'serif', '#0F4A35', '#F1F7F2', '#9AD7B4', '#EEF5F0', '#0F3B2A'),           # gua sha oil: jade
    'FMN0HYAL': T('frame',   'drops',    'sans',  '#0E4A7A', '#F0F7FC', '#8FD8EE', '#EDF4F9', '#0C3A60'),           # hyaluronic: ocean
    'FMN0VITC': T('band',    'rays',     'sans',  '#A5420A', '#FFF6EA', '#FFD58A', '#FBF1E6', '#6B2E06'),           # vitamin C: sunrise orange
    'FMN6PEHA': T('corners', 'strands',  'sans',  '#35241B', '#F7EFE6', '#D49A66', '#F6F0E9', '#35241B'),           # peptide hair: espresso copper
    'FMN6ROHA': T('arch',    'leaves',   'serif', '#2F4A22', '#F3F7EA', '#C3D68A', '#F1F5E8', '#26391B'),           # botanical hair: moss
    # ---- creams / moisturizers -------------------------------------------------------
    'EVL0PPMO': T('arch',    'waves',    'serif', '#4A2457', '#F6EEF8', '#E8B4C8', '#F5EFF7', '#3A1B45'),           # peptide moisturizer: plum
    'FMN0ANNO': T('double',  'fan',      'serif', '#1C1812', '#F6EEDD', '#D6B36A', '#F6F1E6', '#2B2418'),           # anti-aging: black + gold deco
    'OSM0FIRM': T('double',  'chevrons', 'serif', '#1B2B4D', '#F5F1E6', '#D4AF6A', '#F2F4F8', '#1B2B4D'),           # firming: navy lift
    'OSM0SLEE': T('rules',   'stars',    'serif', '#171A3F', '#EEF0FA', '#B9B2F0', '#F1F2FA', '#171A3F'),           # sleep + collagen: night indigo
    'OSM0HYDR': T('arch',    'arcs',     'sans',  '#D6EEE9', '#0F4C4C', '#2E9C8F', '#F3FAF8', '#0F4C4C', '#17695F'),  # hydration: cucumber aqua
    'TRO0RCVC': T('frame',   'arcs',     'sans',  '#7A1E22', '#FDEFEA', '#F2B8A0', '#FAEEEA', '#55141A'),           # recovery cream: warm crimson
    'TRO0RASB': T('double',  'dots',     'serif', '#5B3D24', '#F6ECDD', '#E6C27A', '#F4EEE6', '#3E2815'),           # raw shea butter: shea brown
    # ---- gels / tallow --------------------------------------------------------------
    'TPO0ALTE': T('frame',   'leaves',   'sans',  '#DCEEDD', '#1E4A2B', '#4E9A5F', '#F5FAF5', '#1E4A2B', '#2A7239'),  # aloe + tea tree gel: fresh mint
    'TPO0TABE': T('double',  'citrus',   'serif', '#8A3B12', '#FFF3E4', '#F2B455', '#FBF1E6', '#5A2508', '#F7C672'),           # tallow orange bergamot: terracotta
    'TRO0TALE': T('arch',    'leaves',   'serif', '#4B4672', '#F4F1FA', '#E6D77A', '#F3F1F8', '#332F55'),           # tallow lemongrass lavender: dusk violet
    'TRO0TANI': T('rules',   'stars',    'serif', '#101830', '#F3EEE0', '#E8CE8A', '#F0F1F6', '#101830'),           # tallow peaceful night: midnight
    # ---- cleansers / scrub / mud ----------------------------------------------------
    'TRO0CHCL': T('frame',   'speckle',  'sans',  '#1B1E22', '#F2F3F4', '#7FD6B8', '#F1F2F3', '#1B1E22'),           # charcoal cleanser: charcoal + mint
    'TRO0COFF': T('corners', 'beans',    'sans',  '#3A2417', '#F7EEE6', '#8FE0C0', '#F6EFE9', '#3A2417'),           # peppermint coffee scrub: roast + mint
    'TRO0DMUD': T('double',  'waves',    'sans',  '#0D2D45', '#F2EBDD', '#D9C08F', '#F1F3F6', '#0D2D45'),           # dead sea mud: deep sea + sand
    # ---- soaps ----------------------------------------------------------------------
    'TRO0ALOS': T('band',    'leaves',   'sans',  '#D5EACF', '#1F4A2A', '#4C9E5E', '#F3F9F1', '#1F4A2A', '#2A7239'),  # aloe cucumber: fresh green
    'TRO0CASO': T('arch',    'lines',    'serif', '#E3DCF1', '#3B2D66', '#8A70C9', '#F6F3FA', '#3B2D66', '#6B52B0'),  # lavender: lilac
    'TRO0CHSO': T('frame',   'speckle',  'sans',  '#141618', '#F2F3F4', '#B9BFC6', '#F1F2F3', '#141618'),           # charcoal soap: black
    'TRO0COSO': T('band',    'waves',    'serif', '#F2E4CB', '#1E4A57', '#C9803F', '#FAF4E8', '#1E4A57', '#8F4E14'),  # coconut beach: sand + sea
    'TRO0KOTU': T('arch',    'rays',     'sans',  '#E9B63A', '#3B2504', '#7A3E00', '#FBF3DF', '#3B2504', '#5A2E00'),  # kojic + turmeric: turmeric gold
    'TRO0LESO': T('frame',   'blades',   'serif', '#DDE6C9', '#36402A', '#8E9A1F', '#F6F8EF', '#36402A', '#5E6812'),  # lemongrass + sage
    'TRO0LUFF': T('corners', 'weave',    'sans',  '#E8DCC2', '#4A3B1E', '#8A9A4B', '#F8F3E6', '#4A3B1E', '#4F5F20'),  # luffa: natural fibre
    'TRO0OATM': T('arch',    'hex',      'serif', '#F5E6BC', '#5A3A12', '#C98A1E', '#FBF6E6', '#5A3A12', '#85540A'),  # oat milk honey: honeycomb
    'TRO0SASO': T('double',  'lines',    'serif', '#6A4526', '#F8EEE0', '#E7C99A', '#F6EEE4', '#4A3018'),           # sandalwood: warm wood
    'TRO0SINU': T('arch',    'arcs',     'sans',  '#1A5559', '#EEF8F6', '#BDEBE0', '#EEF6F5', '#124043'),           # breathe clear: eucalyptus
    'TRO0TRAI': T('rules',   'stars',    'serif', '#1F2F3F', '#F1F0F8', '#C7B8F0', '#F0F2F6', '#1F2F3F'),           # slumber: cedar night
}

DEFAULT = THEMES['EVL0NCNS']


def check_contrast():
    bad = []
    for code, t in THEMES.items():
        for nm, a, b, mn in (('front text', t['fg'], t['bg'], 7), ('subtitle', t['acc2'], t['bg'], 4.5),
                             ('side text', t['sfg'], t['sbg'], 7), ('J accent', t['acc'], t['bg'], 2.2)):
            c = contrast(a, b)
            if c < mn:
                bad.append(f'{code}: {nm} {c:.1f} < {mn}')
    return bad


# ------------------------------------------------------------------------------------
# Patterns: return svg inner markup for a w x h pt panel (opaque strokes, no alpha)
# ------------------------------------------------------------------------------------
def _poly(pts):
    return 'M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in pts)


def pattern_svg(kind, w, h, col, seed=0):
    r = random.Random(f'{kind}{seed}')
    sw = .45
    out = []
    S = lambda d, fill='none', s=sw: out.append(f'<path d="{d}" fill="{fill}" stroke="{col if fill == "none" else "none"}" stroke-width="{s}" stroke-linecap="round" stroke-linejoin="round"/>')
    if kind == 'dots':
        sp = 8.5
        for j, y in enumerate(range(0, int(h) + 9, int(sp))):
            for x in range(0, int(w) + 9, int(sp)):
                out.append(f'<circle cx="{x + (sp / 2 if j % 2 else 0):.1f}" cy="{y}" r="{.7 + .5 * ((x * 7 + y * 3) % 5) / 4:.2f}" fill="{col}"/>')
    elif kind == 'speckle':
        for _ in range(int(w * h / 14)):
            out.append(f'<circle cx="{r.uniform(0, w):.1f}" cy="{r.uniform(0, h):.1f}" r="{r.uniform(.25, .9):.2f}" fill="{col}"/>')
    elif kind == 'waves':
        y = 4
        while y < h + 6:
            S(_poly([(x, y + 2.4 * math.sin((x / 20) * math.pi * 2 + y / 7)) for x in range(0, int(w) + 3, 3)]))
            y += 7
    elif kind == 'rays':
        cx, cy = w / 2, h * 1.08
        n = 30
        for i in range(n):
            a = math.pi * (1.06 + .88 * i / (n - 1))
            S(f'M{cx:.1f} {cy:.1f}L{cx + math.cos(a) * h * 1.6:.1f} {cy + math.sin(a) * h * 1.6:.1f}', s=.4)
    elif kind == 'arcs':
        cx, cy = w / 2, h * 1.02
        rr = 10
        while rr < h * 1.4:
            S(f'M{cx - rr:.1f} {cy:.1f}A{rr:.1f} {rr:.1f} 0 0 1 {cx + rr:.1f} {cy:.1f}')
            rr += 9
    elif kind == 'lines':
        d = -h
        while d < w + h:
            S(f'M{d:.1f} {h}L{d + h:.1f} 0', s=.4)
            d += 6.5
    elif kind == 'leaves':
        for _ in range(26):
            x, y, a, s_ = r.uniform(0, w), r.uniform(0, h), r.uniform(0, 360), r.uniform(5, 9)
            out.append(f'<g transform="translate({x:.1f} {y:.1f}) rotate({a:.0f}) scale({s_ / 8:.2f})"><path d="M0 0C4 -5 10 -5 16 0C10 5 4 5 0 0ZM0 0L16 0" fill="none" stroke="{col}" stroke-width="{sw / (s_ / 8):.2f}" stroke-linejoin="round"/></g>')
    elif kind == 'hex':
        rd = 8.5
        dx, dy = rd * 1.5, rd * math.sqrt(3) / 2
        for i in range(-1, int(w / dx) + 3):
            for j in range(-1, int(h / (2 * dy)) + 3):
                cx = i * dx
                cy = j * 2 * dy + (dy if i % 2 else 0)
                S(_poly([(cx + rd * math.cos(math.pi / 3 * k), cy + rd * math.sin(math.pi / 3 * k)) for k in range(7)]), s=.4)
    elif kind == 'drops':
        for _ in range(16):
            x, y, s_ = r.uniform(0, w), r.uniform(0, h), r.uniform(.7, 1.5)
            out.append(f'<path transform="translate({x:.1f} {y:.1f}) scale({s_:.2f})" d="M0 -6C3 -2 5 1 5 3.2A5 5 0 0 1 -5 3.2C-5 1 -3 -2 0 -6Z" fill="none" stroke="{col}" stroke-width="{sw / s_:.2f}"/>')
    elif kind == 'stars':
        for _ in range(34):
            x, y, s_ = r.uniform(0, w), r.uniform(0, h), r.uniform(1.2, 3.4)
            out.append(f'<path transform="translate({x:.1f} {y:.1f}) scale({s_:.2f})" d="M0 -1C.15 -.2 .2 -.15 1 0C.2 .15 .15 .2 0 1C-.15 .2 -.2 .15 -1 0C-.2 -.15 -.15 -.2 0 -1Z" fill="{col}"/>')
        out.append(f'<path transform="translate({w * .78:.1f} {h * .16:.1f})" d="M0 -7A7 7 0 1 0 6 3.5A5.6 5.6 0 0 1 0 -7Z" fill="none" stroke="{col}" stroke-width=".6"/>')
    elif kind == 'weave':
        for sgn in (1, -1):
            d = -h
            while d < w + h:
                S(f'M{d:.1f} {0 if sgn > 0 else h}L{d + h:.1f} {h if sgn > 0 else 0}', s=.35)
                d += 7
    elif kind == 'citrus':
        for (cx, cy, rd) in ((w * .08, h * .12, 26), (w * .95, h * .9, 32)):
            for k in (1, .78, .5):
                out.append(f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{rd * k:.1f}" fill="none" stroke="{col}" stroke-width=".5"/>')
            for i in range(10):
                a = i * math.pi / 5
                S(f'M{cx:.1f} {cy:.1f}L{cx + math.cos(a) * rd * .78:.1f} {cy + math.sin(a) * rd * .78:.1f}', s=.4)
    elif kind == 'fan':
        cx, cy = w / 2, h * 1.05
        for rr in range(14, int(h * 1.5), 10):
            S(f'M{cx - rr:.1f} {cy:.1f}A{rr} {rr} 0 0 1 {cx + rr:.1f} {cy:.1f}', s=.5)
        for i in range(15):
            a = math.pi * (1.05 + .9 * i / 14)
            S(f'M{cx:.1f} {cy:.1f}L{cx + math.cos(a) * h * 1.5:.1f} {cy + math.sin(a) * h * 1.5:.1f}', s=.35)
    elif kind == 'beans':
        for _ in range(16):
            x, y, a = r.uniform(0, w), r.uniform(0, h), r.uniform(0, 180)
            out.append(f'<g transform="translate({x:.1f} {y:.1f}) rotate({a:.0f})"><ellipse rx="5" ry="3.2" fill="none" stroke="{col}" stroke-width=".5"/><path d="M-4.6 0C-1 -2 1 2 4.6 0" fill="none" stroke="{col}" stroke-width=".5"/></g>')
    elif kind == 'blades':
        for i in range(34):
            x = r.uniform(-2, w + 2)
            hh = r.uniform(h * .35, h * .8)
            lean = r.uniform(-14, 14)
            S(f'M{x:.1f} {h + 2}Q{x + lean * .3:.1f} {h - hh * .6:.1f} {x + lean:.1f} {h - hh:.1f}', s=.5)
    elif kind == 'strands':
        for i in range(14):
            y0 = r.uniform(-6, h)
            S(f'M-4 {y0:.1f}C{w * .3:.1f} {y0 + r.uniform(-20, 20):.1f} {w * .65:.1f} {y0 + r.uniform(-24, 24):.1f} {w + 4} {y0 + r.uniform(-12, 12):.1f}', s=.45)
    elif kind == 'chevrons':
        y = -4
        while y < h + 12:
            S(_poly([(0, y + 9), (w / 2, y), (w, y + 9)]), s=.45)
            y += 9
    return ''.join(out)
