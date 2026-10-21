// ──────────────────────────────────────────────────────────────
// Imports the "J EFFEC images" set (people / lifestyle / campaign shots) into
//   public/site/<slot>.webp                         homepage, about, ritual guide slots
//   public/products/<slug>/<slug>-model.webp         product galleries ("In use")
//
//   node scripts/import-brand-images.mjs "~/Downloads/J EFFEC images"
//
// `crop` = [left, top, width, height] in source pixels, applied before resizing.
// Only images whose printed label matches a real product are attached to that
// product; duplicates and weaker takes are listed in SKIPPED.
// ──────────────────────────────────────────────────────────────
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const src = (process.argv[2] || '~/Downloads/J EFFEC images').replace(/^~/, os.homedir());

// size = output [w, h]
const SLOTS = {
  hero:            { file: 'hero.jpeg',                    crop: [1480, 0, 1152, 1536], size: [1200, 1600] },
  story:           { file: 'hero 2.jpeg',                  crop: [1417, 0, 1229, 1536], size: [1200, 1500] },
  'about-hero':    { file: 'Group.jpeg',                   crop: [1523, 0, 1229, 1536], size: [1200, 1500] },
  'about-mission': { file: 'Group 2.jpeg',                 crop: [880, 0, 1229, 1536], size: [1200, 1500] },
  'cat-cleanse':   { file: 'Cleanser better.jpeg',         size: [1200, 1600] },
  'cat-treat':     { file: 'Serum.jpeg',                   size: [1200, 1600] },
  'cat-seal':      { file: 'Body cream.jpeg',              size: [1200, 1600] },
  'guide-treat':   { file: 'Hand.jpeg',                    size: [1200, 1600] },
  'guide-seal':    { file: 'Moisturizer 2 better.jpeg',    size: [1200, 1600] },
};

// Label printed on the packaging decides the product.
const PRODUCTS = {
  'gua-sha-face-oil':            'Hand.jpeg',                 // GUA SHA FACE OIL
  'hyaluronic-hydration-cream':  'Body cream.jpeg',           // SKIN HYDRATION CREAM (file name says "body")
  'charcoal-facial-cleanser':    'Cleanser better.jpeg',      // CHARCOAL FACIAL CLEANSER
  'botanical-hair-growth-serum': 'Hair.jpeg',                 // BOTANICAL HAIR GROWTH SERUM
  'hyaluronic-acid-serum':       'Serum.jpeg',                // HYALURONIC ACID SERUM
};

// Not imported: Cleanser not the best image.jpeg (weaker take of the same shot),
// Hair 2.jpeg (near-duplicate of Hair.jpeg), Moisturzer.jpeg (near-duplicate of
// Moisturizer 2 better.jpeg). The PEPTIDE MOISTURIZER shot is used only as the
// Ritual Guide "Seal" image, not attached to a product (mapping still unconfirmed).

async function render(file, out, { crop, size }) {
  let img = sharp(path.join(src, file));
  if (crop) img = img.extract({ left: crop[0], top: crop[1], width: crop[2], height: crop[3] });
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await img.resize(size[0], size[1], { fit: 'cover', position: 'attention' }).webp({ quality: 82 }).toFile(out);
  return fs.statSync(out).size;
}

let n = 0, bytes = 0;
for (const [slot, def] of Object.entries(SLOTS)) {
  bytes += await render(def.file, path.join(root, 'public', 'site', `${slot}.webp`), def); n++;
}
for (const [slug, file] of Object.entries(PRODUCTS)) {
  if (!fs.existsSync(path.join(root, 'public', 'products', slug))) { console.warn('no folder', slug); continue; }
  bytes += await render(file, path.join(root, 'public', 'products', slug, `${slug}-model.webp`), { size: [1200, 1600] }); n++;
}
console.log(`import-brand-images → ${n} images, ${(bytes / 1e6).toFixed(1)} MB`);
