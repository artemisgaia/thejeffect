// ──────────────────────────────────────────────────────────────
// Builds docs/KLING_PROMPTS.md: 5 image prompts per product for
// Kling image generation, from each product's `shoot` brief in
// lib/catalog/*.js. Edit the brief, re-run, and prompts stay in sync.
// Usage: npm run prompts:kling
// ──────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';
import { FACE } from '../lib/catalog/face.js';
import { BODY } from '../lib/catalog/body.js';
import { BATH } from '../lib/catalog/bath.js';
import { HAIR } from '../lib/catalog/hair.js';

const root = path.resolve(import.meta.dirname, '..');
const products = [...FACE, ...BODY, ...BATH, ...HAIR].sort((a, b) => a.no - b.no);
const no2 = (n) => String(n).padStart(2, '0');

const LIGHT = {
  morning: 'soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows',
  daylight: 'bright, clean natural daylight, soft diffused shadows, neutral white balance',
  golden: 'warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance',
  evening: 'low, warm lamp and candlelight, deep soft shadows, intimate evening mood',
};

const STYLE =
  'Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. ' +
  'Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.';

const lock = (p) =>
  `Use the reference image as the exact product: the same ${p.shoot.vessel}, same cap, same proportions, and the same The J Effect label ` +
  `(Nº ${no2(p.no)}, "${p.name}") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging.`;

const NEGATIVE =
  'altered or misspelled label text, extra text, watermark, changed logo, redesigned packaging, duplicate or extra products, warped or melted bottle, ' +
  'floating objects, plastic-looking skin, extra or deformed fingers, long acrylic nails, harsh flash, oversaturated colors, cluttered background, low resolution, blurry product';

const SHOTS = [
  {
    key: 'hero',
    title: '01 · Studio hero',
    purpose: 'Main product image, collection cards, Google Shopping.',
    prompt: (p) =>
      `Studio hero packshot of the product ${p.category === 'ritual-bar' ? 'resting flat at a slight three-quarter angle, label band facing the camera' : 'standing upright and centered, label facing the camera'}, on a seamless warm cream (#F7F3EC) backdrop ` +
      `with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. ` +
      `The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props.`,
  },
  {
    key: 'texture',
    title: '02 · Texture',
    purpose: 'Shows the formula so shoppers can imagine how it feels.',
    prompt: (p) =>
      `Macro texture shot: ${p.shoot.formula} in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. ` +
      `${cap(LIGHT[p.shoot.light])}.`,
  },
  {
    key: 'ingredients',
    title: '03 · Ingredients',
    purpose: 'Visual proof of the key ingredients; supports ingredient-led SEO.',
    prompt: (p) =>
      `Editorial still life of the product surrounded by its key ingredients: ${p.shoot.botanicals}. ` +
      `Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. ` +
      `${cap(LIGHT[p.shoot.light])}.`,
  },
  {
    key: 'ritual',
    title: '04 · Ritual (in use)',
    purpose: 'How to use it; builds trust and shows real skin.',
    prompt: (p) =>
      `In-use ritual moment: ${p.shoot.ritual}. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. ` +
      `Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. ${cap(LIGHT[p.shoot.light])}.`,
  },
  {
    key: 'lifestyle',
    title: '05 · Lifestyle',
    purpose: 'Aspirational scene for the ritual banner and social.',
    prompt: (p) =>
      `Aspirational lifestyle scene: the product ${p.shoot.scene}. The product is the clear hero in sharp focus with the label facing camera; ` +
      `the surroundings are softly blurred. ${cap(LIGHT[p.shoot.light])}. Calm, intentional mood that feels like coming home to yourself.`,
  },
];

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

let md = `# The J Effect · Kling Product Image Prompts

Five images for each of the ${products.length} products (${products.length * SHOTS.length} prompts). Generated from the \`shoot\` brief of each product in \`lib/catalog/*.js\` by \`npm run prompts:kling\`; edit the brief there and re-run rather than editing this file.

## How to generate

1. **Reference image:** upload the finished, labeled product photo (front-facing, plain background, label sharp) as the image reference. Use Kling's subject/product reference mode and set reference strength high so the packaging and label are preserved.
2. **Aspect ratio:** **3:4** (portrait). Product pages display every image at 3:4.
3. **Resolution:** the highest available (2K or above). Final files are resized to 1200×1600.
4. **Prompt:** paste the product's prompt. Each prompt already contains the style block and the label lock.
5. **Negative prompt:** paste the shared negative prompt below.
6. **Pick the best of 4:** check that the label text is exactly right before keeping an image. Regenerate if any letter changes.

**Shared negative prompt**

\`\`\`
${NEGATIVE}
\`\`\`

## Saving the images

Name each file \`<slug>-<shot>\` (PNG, JPG or WEBP) and drop it in \`photos-inbox/\` at the project root, for example \`photos-inbox/retinol-peptide-face-serum-hero.png\`. Then run:

\`\`\`bash
npm run images:sync
\`\`\`

This optimizes every photo to a 1200×1600 WEBP in \`public/products/<slug>/\` and updates the gallery manifest. A product's gallery switches from the packaging preview to the photos automatically, and the "packaging preview" note disappears once the hero shot exists.

| Shot | Suffix | Used for |
| --- | --- | --- |
${SHOTS.map((s) => `| ${s.title} | \`-${s.key}\` | ${s.purpose} |`).join('\n')}

---

## Contents

${products.map((p) => `- [Nº ${no2(p.no)} · ${p.name}](#n${no2(p.no)})`).join('\n')}

---
`;

for (const p of products) {
  md += `
<a id="n${no2(p.no)}"></a>

## Nº ${no2(p.no)} · ${p.name}

**${p.descriptor}** · ${p.size} · slug \`${p.slug}\`
Reference: the labeled ${p.shoot.vessel}.

`;
  for (const s of SHOTS) {
    md += `### ${s.title} → \`${p.slug}-${s.key}\`

\`\`\`
${s.prompt(p)} ${lock(p)} ${STYLE}
\`\`\`

`;
  }
  md += `---\n`;
}

const json = {
  negative: NEGATIVE,
  shots: SHOTS.map(({ key, title, purpose }) => ({ key, title, purpose })),
  products: products.map((p) => ({
    no: p.no, slug: p.slug, name: p.name, descriptor: p.descriptor, category: p.category,
    size: p.size, vessel: p.shoot.vessel,
    prompts: Object.fromEntries(SHOTS.map((s) => [s.key, `${s.prompt(p)} ${lock(p)} ${STYLE}`])),
  })),
};

fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
fs.writeFileSync(path.join(root, 'docs', 'KLING_PROMPTS.md'), md);
fs.writeFileSync(path.join(root, 'docs', 'kling-prompts.json'), JSON.stringify(json, null, 2) + '\n');
console.log(`prompts:kling → docs/KLING_PROMPTS.md (${products.length * SHOTS.length} prompts)`);
