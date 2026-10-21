// ──────────────────────────────────────────────────────────────
// 1. Imports new product photos from photos-inbox/
//      <slug>-<shot>.(png|jpg|jpeg|webp)
//    → public/products/<slug>/<slug>-<shot>.webp (1200×1600, 3:4)
// 2. Writes lib/product-images.json, the manifest lib/products.js
//    uses to build each product gallery.
// Runs automatically before `npm run dev` and `npm run build`.
// ──────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const inbox = path.join(root, 'photos-inbox');
const dir = path.join(root, 'public', 'products');
const SHOTS = ['hero', 'model', 'texture', 'ingredients', 'ritual', 'lifestyle'];
const shotRe = new RegExp(`^(.+)-(${SHOTS.join('|')})\\.(png|jpe?g|webp)$`, 'i');

// ── 1. Import from the inbox (only re-encodes new or changed files) ──
const incoming = fs.existsSync(inbox) ? fs.readdirSync(inbox).filter((f) => shotRe.test(f)) : [];
if (incoming.length) {
  const { default: sharp } = await import('sharp');
  let imported = 0;
  for (const file of incoming) {
    const [, slug, shot] = file.match(shotRe);
    const src = path.join(inbox, file);
    const outDir = path.join(dir, slug);
    const out = path.join(outDir, `${slug}-${shot.toLowerCase()}.webp`);
    if (!fs.existsSync(outDir)) {
      console.warn(`images:sync ⚠ no product folder for "${slug}" (${file}), skipped`);
      continue;
    }
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) continue;
    await sharp(src).resize(1200, 1600, { fit: 'cover', position: 'attention' }).webp({ quality: 84 }).toFile(out);
    imported++;
  }
  if (imported) console.log(`images:sync → imported ${imported} photo(s) from photos-inbox/`);
}

// ── 2. Manifest ──
const manifest = {};
for (const slug of fs.readdirSync(dir).sort()) {
  const folder = path.join(dir, slug);
  if (!fs.statSync(folder).isDirectory()) continue;
  const kinds = fs
    .readdirSync(folder)
    .filter((f) => f.startsWith(`${slug}-`) && f.endsWith('.webp'))
    .map((f) => f.slice(slug.length + 1, -'.webp'.length))
    .sort();
  if (kinds.length) manifest[slug] = kinds;
}

fs.writeFileSync(path.join(root, 'lib', 'product-images.json'), JSON.stringify(manifest, null, 2) + '\n');
const withPhotos = Object.values(manifest).filter((k) => k.includes('hero')).length;
console.log(`images:sync → ${Object.keys(manifest).length} products (${withPhotos} with photography)`);
