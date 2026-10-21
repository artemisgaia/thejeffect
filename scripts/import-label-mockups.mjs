// ──────────────────────────────────────────────────────────────
// Imports the Supliful label mockups (one folder per product) into
//   public/products/<slug>/<slug>-<shot>.webp   (1200×1600, 3:4)
// then run `npm run images:sync` to refresh lib/product-images.json.
//
//   node scripts/import-label-mockups.mjs "~/Downloads/Labels screens"
//
// Source images are 2048×2048. The site frames products at 3:4, so:
//   extend = fit the full square to the width, then extend the plain studio
//            background above and below (nothing is cropped)
//   cover  = centre crop (hand shots and macro textures that fill the frame)
//
// Only shots that show the finished label correctly are imported. Blank
// labels, wrong-panel renders and near-duplicates are left out on purpose.
// ──────────────────────────────────────────────────────────────
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const srcRoot = (process.argv[2] || '~/Downloads/Labels screens').replace(/^~/, os.homedir());

// shot map: source key → [site shot, mode]. Source key = main | view-N | label_designs
const STD = { main: ['hero'], 'view-2': ['lifestyle'], 'view-3': ['ingredients'], 'view-4': ['ritual'] };
const BOTTLE = { main: ['hero'], 'view-2': ['ingredients'], 'view-3': ['lifestyle'], 'view-4': ['ritual'] };
const JAR = { main: ['hero'], 'view-2': ['lifestyle'], 'view-3': ['ingredients'], 'view-4': ['texture', 'cover'] };
const TALLOW = { main: ['hero'], 'view-2': ['ingredients'], 'view-3': ['lifestyle'], 'view-4': ['ritual'], 'view-5': ['texture'] };

const MAP = {
  'niacinamide-10-serum': ['10% NIACINAMIDE SERUM', BOTTLE],
  'aloe-cool-cucumber-soap': ['ALOE & COOL CUCUMBER SOAP', STD],
  'aloe-tea-tree-clarifying-gel': ['ALOE & TEA TREE RADIANCE GEL', { ...BOTTLE, 'view-5': ['texture', 'cover'] }],
  'anti-aging-moisturizer': ['ANTI AGING MOISTURIZER', {
    'view-3': ['hero', 'cover'], 'view-2': ['ritual', 'cover'], 'view-4': ['lifestyle', 'cover'], 'view-5': ['ingredients', 'cover'] }],
  'eucalyptus-peppermint-soap': ['BREATHE CLEAR SOAP', STD],
  'calming-lavender-soap': ['CALMING LAVENDER SOAP', STD],
  'charcoal-facial-cleanser': ['CHARCOAL FACIAL CLEANSER', { main: ['hero'], 'view-2': ['texture'], 'view-3': ['lifestyle'], 'view-4': ['ritual'] }],
  'charcoal-soap': ['CHARCOAL SOAP', { 'view-1': ['hero'], 'view-2': ['lifestyle'], 'view-3': ['ingredients'], 'view-4': ['texture'] }],
  'coconut-shea-soap': ['COCONUT BEACH SOAP', STD],
  'dark-spot-serum': ['DARK SPOT SERUM Normal', { 'view-1': ['hero'], 'view-2': ['ingredients'], 'view-3': ['lifestyle'], 'view-4': ['texture'] }],
  'dark-spot-serum-sensitive-skin': ['DARK SPOT SERUM Sensitive', { 'view-1': ['hero'], 'view-2': ['ingredients'], 'view-3': ['lifestyle'], 'view-4': ['ritual'] }],
  'dead-sea-mud-mask': ['Dead Sea Mud', {
    'view-1': ['hero'], 'view-2': ['lifestyle', 'cover'], 'view-3': ['ritual', 'cover'], 'view-4': ['texture', 'cover'], 'view-5': ['ingredients', 'cover'] }],
  'exfoliating-luffa-bar': ['EXFOLIATING LUFFA BAR', { 'view-1': ['hero'] }],
  'gua-sha-face-oil': ['GUA SHA', { 'view-2': ['hero'], 'view-3': ['ingredients'], 'view-4': ['texture'] }],
  'hyaluronic-acid-serum': ['HYALURONIC ACID', {
    label_designs: ['hero'], 'view-2': ['ingredients'], 'view-4': ['ritual', 'cover'], 'view-5': ['lifestyle', 'cover'] }],
  'kojic-turmeric-soap': ['KOJIC ACID & TURMERIC SOAP', { main: ['hero'], 'view-2': ['lifestyle'], 'view-5': ['texture', 'cover'] }],
  'lemongrass-sage-soap': ['Lemongrass and sage soap', STD],
  'oat-milk-honey-soap': ['OAT MILK HONEY SOAP', { main: ['hero'], 'view-1': ['lifestyle'], 'view-2': ['ingredients'], 'view-3': ['ritual'], 'view-5': ['texture'] }],
  'pdrn-brightening-serum': ['PDRN BRIGHTENING', { 'view-5': ['texture'] }],
  'coffee-body-scrub': ['PEPPERMINT COFFEE SCRUB', { main: ['hero'] }],
  'peptide-eye-gel-cream': ['PEPTIDE EYE GEL-CREAM', BOTTLE],
  'copper-peptide-moisturizer': ['PEPTIDE MOISTURIZER', BOTTLE],
  'raw-shea-butter': ['RAW SHEA BUTTER', { main: ['hero'] }],
  'aloe-menthol-cooling-cream': ['RECOVERY CREAM', { main: ['hero'] }],
  'retinol-peptide-face-serum': ['RETINOL AND PEPTIDE', { 'view-5': ['texture'] }],
  'sandalwood-soap': ['RICH SANDALWOOD SOAP', STD],
  'dmae-firming-cream': ['SKIN FIRMING CREAM', JAR],
  'collagen-night-cream': ['SLEEP PLUS COLLAGEN', JAR],
  'hyaluronic-hydration-cream': ['Skin Hydration Cream', { ...JAR, 'view-4': ['ritual'], 'view-5': ['texture', 'cover'] }],
  'slumber-soap': ['Slumber Soap', STD],
  'tallow-cream-lemongrass-lavender': ['TALLOW CREAM Lavender', TALLOW],
  'tallow-cream-orange-bergamot': ['TALLOW CREAM Orange', TALLOW],
  'tallow-cream-peaceful-night': ['TALLOW CREAM peaceful night', TALLOW],
  'vitamin-c-brightening-serum': ['VITAMIN C', { 'view-1': ['hero'], 'view-2': ['ingredients'], 'view-3': ['lifestyle'], 'view-4': ['ritual'] }],
};

const keyOf = (file) => {
  const b = file.toLowerCase();
  if (b.startsWith('label_designs')) return 'label_designs';
  if (b.startsWith('main')) return 'main';
  const m = b.match(/^view-(\d)-/);   // only the keys listed in MAP are used; blank-label shots are simply not listed
  return m ? `view-${m[1]}` : null;
};

let wrote = 0, skipped = 0;
for (const [slug, [folder, shots]] of Object.entries(MAP)) {
  const dir = path.join(srcRoot, folder);
  if (!fs.existsSync(dir)) { console.warn(`missing folder: ${folder}`); continue; }
  const outDir = path.join(root, 'public', 'products', slug);
  if (!fs.existsSync(outDir)) { console.warn(`no product folder for ${slug}`); continue; }
  const files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f));
  for (const [key, [shot, mode = 'extend']] of Object.entries(shots)) {
    const f = files.find((x) => keyOf(x) === key);
    if (!f) { console.warn(`  ${slug}: no source for ${key}`); skipped++; continue; }
    const out = path.join(outDir, `${slug}-${shot}.webp`);
    const img = sharp(path.join(dir, f));
    const pipeline = mode === 'cover'
      ? img.resize(1200, 1600, { fit: 'cover', position: 'centre' })
      : img.resize(1200, 1200).extend({ top: 200, bottom: 200, extendWith: 'copy' });
    await pipeline.webp({ quality: 84 }).toFile(out);
    wrote++;
  }
}
console.log(`import-label-mockups → wrote ${wrote} image(s), ${skipped} missing source(s)`);
