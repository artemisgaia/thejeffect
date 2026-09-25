// ──────────────────────────────────────────────────────────────
// Renders branded packaging previews for every product:
//   public/products/<slug>/<slug>-pack.webp   vessel + label
//   public/products/<slug>/<slug>-label.webp  flat label detail
//
// These stand in until the 5 real product photos exist.
// Usage: npm run images:render [-- <slug> <slug> ...]
// Needs Google Chrome (override the path with CHROME=...).
// ──────────────────────────────────────────────────────────────
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import { FACE } from '../lib/catalog/face.js';
import { BODY } from '../lib/catalog/body.js';
import { BATH } from '../lib/catalog/bath.js';
import { HAIR } from '../lib/catalog/hair.js';

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const W = 1200;
const H = 1600;
const root = path.resolve(import.meta.dirname, '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'je-pack-'));

const ACCENT = {
  'cleanser': '#6F8466', 'toner': '#B97D74', 'serum': '#C0673F', 'treatment': '#C0673F',
  'eye-care': '#7F7A9C', 'face-oil': '#B8873E', 'moisturizer': '#355438', 'mask': '#5E6660',
  'body': '#A0704F', 'ritual-bar': '#6B7048', 'hair': '#6E4B3A',
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const no2 = (n) => String(n).padStart(2, '0');

// ── Vessel detection from the shoot brief ─────────────────────
function vesselOf(p) {
  const v = p.shoot.vessel.toLowerCase();
  const glass = v.includes('amber') ? 'amber' : v.includes('clear glass') ? 'clear' : 'white';
  const dark = (re) => re.test(v);
  if (v.includes('soap box')) return { kind: 'box' };
  if (v.includes('soap bar')) return { kind: 'bar', color: barColor(p.slug) };
  if (v.includes('dropper') || v.includes('press-pump')) {
    return { kind: 'dropper', glass, bulb: dark(/black rubber bulb/) ? '#1d1b19' : '#f3f0ea', fill: fillColor(p.slug) };
  }
  if (v.includes('mist')) return { kind: 'mist' };
  if (v.includes('airless')) return { kind: 'airless' };
  if (v.includes('squeeze')) return { kind: 'squeeze', dark: dark(/black squeeze/) };
  if (v.includes('pump')) return { kind: 'pump', fill: '#f1dca4' };
  if (v.includes('jar')) {
    const pet = v.includes('pet') || v.includes('smoky');
    return { kind: 'jar', lid: dark(/black screw lid/) ? '#1d1b19' : '#f4f1ec', pet, fill: jarFill(p.slug) };
  }
  return { kind: 'dropper', glass: 'white', bulb: '#f3f0ea' };
}

function fillColor(slug) {
  return {
    'hyaluronic-acid-serum': 'rgba(235,240,238,.55)',
    'dark-spot-serum': '#e9c8ad',
    'dark-spot-serum-sensitive-skin': '#d9bf9a',
    'botanical-hair-growth-serum': '#d8b454',
  }[slug] || 'rgba(235,240,238,.55)';
}
function jarFill(slug) {
  return {
    'raw-shea-butter': '#efe0ae',
    'dead-sea-mud-mask': '#4b4a3d',
    'coffee-body-scrub': '#3a2618',
    'aloe-menthol-cooling-cream': '#fbfaf6',
  }[slug] || '#fbfaf6';
}
function barColor(slug) {
  return {
    'kojic-turmeric-soap': ['#e0932f', '#c97a1e'],
    'charcoal-soap': ['#2b2a28', '#1b1a19'],
    'oat-milk-honey-soap': ['#c9a47a', '#a9825a'],
    'calming-lavender-soap': ['#ece3d6', '#d9cdbd'],
    'slumber-soap': ['#efe3a6', '#9aa6ad'],
    'aloe-cool-cucumber-soap': ['#8fb574', '#efe2a6'],
    'eucalyptus-peppermint-soap': ['#efe6cf', '#ddd1b3'],
    'coconut-shea-soap': ['#4a2f22', '#34211a'],
    'sandalwood-soap': ['#cfa77c', '#b58c62'],
    'lemongrass-sage-soap': ['#f1e4a8', '#dccf8f'],
  }[slug] || ['#e8dcc8', '#d6c7ae'];
}

function actives(p) {
  const n = p.key_ingredients[0].name.replace(/\s*\(.*?\)\s*/g, ' ').trim();
  const short = n.length > 26 ? n.split(/,| \+ /)[0].trim() : n;
  return short.toUpperCase();
}

// ── Label (font-size drives scale; everything is in em) ──────
function label(p, layout) {
  const accent = ACCENT[p.category];
  const kicker = `${esc(p.step.toUpperCase())} · ${esc(p.type.toUpperCase())}`;
  const collection = p.collection ? `<div class="coll">${esc(p.collection.toUpperCase())}</div>` : '';
  return `
  <div class="label label--${layout}" style="--accent:${accent}">
    <div class="label__top">
      <div class="label__tag">${kicker}</div>
      <div class="label__no"><span>Nº</span>${no2(p.no)}</div>
    </div>
    <div class="label__brand">THE&nbsp;&nbsp;J&nbsp;&nbsp;EFFECT</div>
    <div class="label__body">
      ${collection}
      <div class="label__name">${esc(p.name)}</div>
      <div class="label__desc">${esc(p.descriptor)}</div>
      <div class="label__pill">${esc(actives(p))}</div>
      <div class="label__tagline">${esc(p.tagline)}</div>
    </div>
    <div class="label__foot"><span>${esc(p.size.toUpperCase())}</span><span>${esc(p.ritual.toUpperCase())}</span></div>
  </div>`;
}

// ── Vessels ───────────────────────────────────────────────────
function vessel(p, v) {
  switch (v.kind) {
    case 'dropper': {
      const body = v.glass === 'amber'
        ? 'linear-gradient(90deg,#5b2f10 0%,#9a5a24 22%,#b8742f 45%,#8a4d1c 75%,#4e270c 100%)'
        : v.glass === 'clear'
          ? `linear-gradient(90deg,rgba(255,255,255,.55),rgba(255,255,255,.15) 30%,rgba(255,255,255,.35) 70%,rgba(255,255,255,.6)), ${v.fill}`
          : 'linear-gradient(90deg,#e7e2d9 0%,#fbf9f5 30%,#fffefb 55%,#ece7de 100%)';
      const collar = v.bulb === '#1d1b19' ? '#1d1b19' : '#f1ede5';
      return `
      <div class="dropper">
        <div class="dropper__bulb" style="background:${v.bulb}"></div>
        <div class="dropper__collar" style="--c:${collar}"></div>
        <div class="dropper__body" style="background:${body}">${label(p, 'tall')}</div>
      </div>`;
    }
    case 'pump':
      return `
      <div class="pump">
        <div class="pump__head"></div><div class="pump__stem"></div><div class="pump__collar"></div>
        <div class="pump__body"><div class="pump__liquid" style="background:${v.fill}"></div>${label(p, 'tall')}</div>
      </div>`;
    case 'mist':
      return `
      <div class="pump mist">
        <div class="mist__cap"></div><div class="pump__collar"></div>
        <div class="pump__body"><div class="pump__liquid" style="background:rgba(236,240,238,.7)"></div>${label(p, 'tall')}</div>
      </div>`;
    case 'airless':
      return `
      <div class="airless">
        <div class="airless__cap"></div>
        <div class="airless__body">${label(p, 'slim')}</div>
      </div>`;
    case 'squeeze':
      return `
      <div class="squeeze ${v.dark ? 'squeeze--dark' : ''}">
        <div class="squeeze__cap"></div>
        <div class="squeeze__body">${label(p, 'tall')}</div>
      </div>`;
    case 'jar':
      return `
      <div class="jar">
        <div class="jar__lid" style="--lid:${v.lid}"></div>
        <div class="jar__body ${v.pet ? 'jar__body--pet' : ''}" style="--fill:${v.fill}">${label(p, 'wide')}</div>
      </div>`;
    case 'bar':
      return `
      <div class="bar" style="--a:${v.color[0]};--b:${v.color[1]}">
        <div class="bar__top"></div>
        <div class="bar__front"><div class="bar__band">${label(p, 'band')}</div></div>
      </div>`;
    case 'box':
      return `
      <div class="bar box">
        <div class="bar__top box__top"></div>
        <div class="bar__front box__front"><div class="box__window"></div>${label(p, 'boxlabel')}</div>
      </div>`;
  }
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=block');
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{background:radial-gradient(ellipse 90% 70% at 50% 42%,#FBF8F2 0%,#F4EEE3 55%,#EAE2D4 100%);display:flex;align-items:center;justify-content:center;font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased}
.stage{position:relative;display:flex;align-items:flex-end;justify-content:center;width:100%;height:100%;padding-bottom:230px}
.stage>.dropper,.stage>.pump,.stage>.airless,.stage>.squeeze,.stage>.jar,.stage>.bar{transform:scale(1.14);transform-origin:50% 100%}
.shadow{position:absolute;bottom:190px;left:50%;transform:translateX(-50%);width:640px;height:70px;border-radius:50%;background:radial-gradient(ellipse at center,rgba(60,48,32,.28) 0%,rgba(60,48,32,.10) 45%,transparent 72%);filter:blur(6px)}

/* label */
.label{position:relative;background:#FBF8F1;color:#243B27;display:flex;flex-direction:column;font-size:var(--fs,16px);box-shadow:inset 0 0 0 1px rgba(36,59,39,.06)}
.label__top{display:flex;justify-content:space-between;align-items:flex-start;padding:1.2em 1.3em 0}
.label__tag{background:var(--accent);color:#FBF8F1;font-weight:600;font-size:.62em;letter-spacing:.18em;padding:.55em .8em;white-space:nowrap}
.label__no{font-family:'Playfair Display',serif;font-style:italic;color:var(--accent);font-size:3.4em;line-height:.8;margin-top:-.02em}
.label__no span{font-size:.28em;vertical-align:top;margin-right:.08em;font-style:normal;letter-spacing:.02em}
.label__brand{padding:.2em 1.3em 0;font-size:.62em;letter-spacing:.34em;font-weight:500;color:#3D3A35}
.label__body{flex:1;display:flex;flex-direction:column;justify-content:flex-end;padding:0 1.3em 1.2em}
.coll{font-size:.55em;letter-spacing:.28em;color:var(--accent);font-weight:600;margin-bottom:.5em}
.label__name{font-family:'Playfair Display',serif;font-weight:500;font-size:2.05em;line-height:1.02;letter-spacing:-.015em;color:#243B27}
.label__desc{font-size:.78em;line-height:1.35;color:#3D3A35;margin-top:.45em}
.label__pill{align-self:flex-start;margin-top:.8em;background:color-mix(in srgb,var(--accent) 16%,#FBF8F1);color:color-mix(in srgb,var(--accent) 80%,#1C1A17);font-size:.56em;font-weight:600;letter-spacing:.16em;padding:.55em .8em}
.label__tagline{font-family:'Playfair Display',serif;font-style:italic;font-size:.82em;color:#6B6559;margin-top:.7em;line-height:1.3}
.label__foot{background:var(--accent);color:#FBF8F1;display:flex;justify-content:space-between;font-size:.58em;letter-spacing:.2em;font-weight:500;padding:1.05em 1.6em}

.label--tall{position:absolute;left:7%;right:7%;top:16%;bottom:8%;--fs:19px}
.label--slim{position:absolute;left:9%;right:9%;top:6%;bottom:6%;--fs:13.5px}
.label--slim .label__name{font-size:2.2em}
.label--slim .label__top{flex-direction:column;gap:.8em}
.label--wide{position:absolute;left:7%;right:7%;top:12%;bottom:11%;--fs:15.5px}
.label--wide .label__top{padding-top:1em}
.label--wide .label__no{font-size:2.6em}
.label--wide .label__name{font-size:1.9em}
.label--band{position:absolute;inset:0;--fs:12px}
.label--band .label__no{font-size:2.4em}
.label--band .label__name{font-size:1.75em}
.label--boxlabel{position:absolute;right:5%;top:10%;bottom:10%;width:48%;--fs:12.5px}
.label--flat{width:760px;height:1040px;--fs:30px;box-shadow:0 30px 80px rgba(60,48,32,.18)}

/* dropper */
.dropper{position:relative;display:flex;flex-direction:column;align-items:center;z-index:1}
.dropper__bulb{width:150px;height:210px;border-radius:75px 75px 18px 18px;box-shadow:inset -18px 0 30px rgba(0,0,0,.18),inset 14px 0 24px rgba(255,255,255,.35)}
.dropper__collar{width:230px;height:96px;margin-top:-4px;background:repeating-linear-gradient(90deg,var(--c) 0 9px,color-mix(in srgb,var(--c) 82%,#000) 9px 12px);border-radius:6px;box-shadow:inset 0 -10px 16px rgba(0,0,0,.12)}
.dropper__body{position:relative;width:440px;height:680px;border-radius:70px 70px 34px 34px;box-shadow:inset -30px 0 50px rgba(0,0,0,.12),inset 26px 0 40px rgba(255,255,255,.45),0 2px 0 rgba(0,0,0,.05)}

/* pump & mist */
.pump{position:relative;display:flex;flex-direction:column;align-items:center;z-index:1}
.pump__head{width:220px;height:70px;background:linear-gradient(90deg,#e9e5dd,#fffefa 45%,#e4dfd6);border-radius:10px 60px 10px 10px;transform:translateX(30px)}
.pump__stem{width:70px;height:90px;background:linear-gradient(90deg,#e4dfd6,#fffefa,#e4dfd6)}
.pump__collar{width:200px;height:80px;background:repeating-linear-gradient(90deg,#f1ede5 0 9px,#d8d2c7 9px 12px);border-radius:6px}
.pump__body{position:relative;width:450px;height:760px;border-radius:40px;background:linear-gradient(90deg,rgba(255,255,255,.7),rgba(255,255,255,.2) 30%,rgba(255,255,255,.35) 70%,rgba(255,255,255,.75));box-shadow:inset 0 0 0 2px rgba(255,255,255,.6),inset -26px 0 40px rgba(0,0,0,.06);overflow:hidden}
.pump__liquid{position:absolute;left:0;right:0;bottom:0;top:12%;opacity:.85}
.mist__cap{width:190px;height:170px;background:linear-gradient(90deg,#e9e5dd,#fffefa 45%,#e4dfd6);border-radius:18px 18px 6px 6px}

/* airless */
.airless{position:relative;display:flex;flex-direction:column;align-items:center;z-index:1}
.airless__cap{width:270px;height:260px;border-radius:20px 20px 4px 4px;background:linear-gradient(90deg,#e6e1d8,#fffefb 40%,#f3efe8 70%,#dcd6cc);box-shadow:inset 0 -6px 10px rgba(0,0,0,.06)}
.airless__body{position:relative;width:270px;height:860px;border-radius:4px 4px 22px 22px;background:linear-gradient(90deg,#e6e1d8,#fffefb 38%,#f6f2eb 70%,#dad4c9)}

/* squeeze */
.squeeze{position:relative;display:flex;flex-direction:column;align-items:center;z-index:1}
.squeeze__cap{width:230px;height:130px;border-radius:30px 30px 8px 8px;background:linear-gradient(90deg,#e6e1d8,#fffefb 45%,#ddd7cd)}
.squeeze__body{position:relative;width:400px;height:780px;border-radius:120px 120px 40px 40px;background:linear-gradient(90deg,rgba(255,255,255,.75),rgba(255,255,255,.3) 35%,rgba(255,255,255,.45) 70%,rgba(255,255,255,.8)),#eef1ee}
.squeeze--dark .squeeze__cap{background:linear-gradient(90deg,#141312,#3a3835 45%,#121110)}
.squeeze--dark .squeeze__body{background:linear-gradient(90deg,#141312,#3b3936 38%,#26241f 70%,#0f0e0d)}
.squeeze--dark .label--tall{top:22%}

/* jar */
.jar{position:relative;display:flex;flex-direction:column;align-items:center;z-index:1}
.jar__lid{width:660px;height:170px;border-radius:22px 22px 8px 8px;background:linear-gradient(90deg,color-mix(in srgb,var(--lid) 86%,#000),var(--lid) 30%,color-mix(in srgb,var(--lid) 92%,#fff) 55%,color-mix(in srgb,var(--lid) 82%,#000));box-shadow:inset 0 -8px 12px rgba(0,0,0,.12)}
.jar__body{position:relative;width:640px;height:470px;border-radius:10px 10px 40px 40px;background:linear-gradient(90deg,#e6e1d8,#fffefb 38%,#f6f2eb 70%,#dad4c9)}
.jar__body--pet{background:linear-gradient(90deg,rgba(255,255,255,.55),rgba(255,255,255,.1) 30%,rgba(255,255,255,.2) 70%,rgba(255,255,255,.6)),var(--fill)}

/* bar & box */
.bar{position:relative;width:760px;z-index:1;margin-bottom:10px}
.bar__top{height:120px;background:linear-gradient(180deg,color-mix(in srgb,var(--a) 70%,#fff),var(--a));border-radius:30px 30px 0 0;transform:perspective(900px) rotateX(45deg);transform-origin:bottom}
.bar__front{position:relative;height:430px;background:linear-gradient(180deg,var(--a) 0 38%,var(--b) 38% 100%);border-radius:0 0 28px 28px;box-shadow:inset 0 -18px 30px rgba(0,0,0,.12),inset 0 10px 18px rgba(255,255,255,.18)}
.bar__band{position:absolute;left:50%;transform:translateX(-50%);top:-2px;bottom:0;width:360px;box-shadow:0 0 0 1px rgba(0,0,0,.04),6px 0 14px rgba(0,0,0,.08),-6px 0 14px rgba(0,0,0,.08)}
.box{--a:#fbf8f2;--b:#f2ece2}
.box__front{background:linear-gradient(90deg,#efe9df,#fbf8f2 40%,#f4eee5)}
.box__window{position:absolute;left:6%;top:14%;width:40%;height:72%;border-radius:18px;background:radial-gradient(circle at 30% 30%,#e8c98c,#caa25f 60%,#b58a4a);box-shadow:inset 0 6px 14px rgba(0,0,0,.25);overflow:hidden}
.box__window::after{content:'';position:absolute;inset:0;background:repeating-radial-gradient(circle at 50% 50%,rgba(255,255,255,.0) 0 10px,rgba(120,84,36,.35) 11px 12px)}

/* flat label page */
.flat{position:relative;display:flex;align-items:center;justify-content:center;width:100%;height:100%}
`;

function page(inner) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${inner}</body></html>`;
}

function shoot(html, out) {
  const file = path.join(tmp, path.basename(out, '.webp') + '.html');
  const png = file.replace(/\.html$/, '.png');
  fs.writeFileSync(file, html);
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    `--window-size=${W},${H}`, '--virtual-time-budget=6000', `--screenshot=${png}`, `file://${file}`,
  ], { stdio: 'ignore' });
  return sharp(png).webp({ quality: 86 }).toFile(out);
}

const all = [...FACE, ...BODY, ...BATH, ...HAIR].sort((a, b) => a.no - b.no);
const only = process.argv.slice(2);
const list = only.length ? all.filter((p) => only.includes(p.slug)) : all;

for (const p of list) {
  const dir = path.join(root, 'public', 'products', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  const v = vesselOf(p);
  await shoot(page(`<div class="stage"><div class="shadow"></div>${vessel(p, v)}</div>`), path.join(dir, `${p.slug}-pack.webp`));
  await shoot(page(`<div class="flat">${label(p, 'flat')}</div>`), path.join(dir, `${p.slug}-label.webp`));
  console.log(`Nº ${no2(p.no)}  ${p.slug}  (${v.kind})`);
}
fs.rmSync(tmp, { recursive: true, force: true });
