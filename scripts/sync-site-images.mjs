// ──────────────────────────────────────────────────────────────
// Imports finished site photos from photos-inbox/
//   site-<slot>.(png|jpg|jpeg|webp)  →  public/site/<slot>.webp
// Slots are defined in lib/site-slots.js (hero, cat-cleanse, about-hero...).
// Each photo is cropped to the slot's ratio and size, then the slot
// switches from the packaging fallback to the photo automatically.
// Runs before `npm run dev` and `npm run build`.
// ──────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { SITE_SLOTS } from '../lib/site-slots.js';

const root = path.resolve(import.meta.dirname, '..');
const inbox = path.join(root, 'photos-inbox');
const outDir = path.join(root, 'public', 'site');
const re = /^site-(.+)\.(png|jpe?g|webp)$/i;

const incoming = fs.existsSync(inbox) ? fs.readdirSync(inbox).filter((f) => re.test(f)) : [];
let imported = 0;

if (incoming.length) {
  const { default: sharp } = await import('sharp');
  fs.mkdirSync(outDir, { recursive: true });
  for (const file of incoming) {
    const slot = file.match(re)[1];
    const def = SITE_SLOTS[slot];
    if (!def) {
      console.warn(`site:sync ⚠ unknown slot "${slot}" (${file}). Valid: ${Object.keys(SITE_SLOTS).join(', ')}`);
      continue;
    }
    const [w, h] = def.size.split('×').map(Number);
    const src = path.join(inbox, file);
    const out = path.join(outDir, `${slot}.webp`);
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) continue;
    await sharp(src).resize(w, h, { fit: 'cover', position: 'attention' }).webp({ quality: 84 }).toFile(out);
    imported++;
  }
}

const live = fs.existsSync(outDir) ? fs.readdirSync(outDir).filter((f) => f.endsWith('.webp')).length : 0;
const total = Object.keys(SITE_SLOTS).length;
console.log(`site:sync → ${imported ? `imported ${imported}, ` : ''}${live}/${total} site slots have photography`);
