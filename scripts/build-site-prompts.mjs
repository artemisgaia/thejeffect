// Generates docs/SITE_IMAGE_PROMPTS.md from lib/site-slots.js.
//   npm run prompts:site
import fs from 'node:fs';
import path from 'node:path';
import { SITE_SLOTS, SITE_NEGATIVE, slotPrompt } from '../lib/site-slots.js';
import { FACE } from '../lib/catalog/face.js';
import { BODY } from '../lib/catalog/body.js';
import { BATH } from '../lib/catalog/bath.js';
import { HAIR } from '../lib/catalog/hair.js';

const root = path.resolve(import.meta.dirname, '..');
const products = Object.fromEntries([...FACE, ...BODY, ...BATH, ...HAIR].map((p) => [p.slug, p]));
const no2 = (n) => String(n).padStart(2, '0');
const refName = (slug) => (products[slug] ? `Nº ${no2(products[slug].no)} ${products[slug].name}` : slug);

const pages = [...new Set(Object.values(SITE_SLOTS).map((s) => s.page))];

let md = `# The J Effect · Site Image Prompts

One prompt for every photo spot on the website (${Object.keys(SITE_SLOTS).length} images). Generated from \`lib/site-slots.js\` by \`npm run prompts:site\`; edit the scene there and re-run rather than editing this file.

Until a photo exists, each spot shows the product packaging inside the site's arch frame, so nothing looks broken while you generate.

## How to generate

1. **Reference image(s):** use the finished, labeled product photos (the Supliful product images, once your Canva labels are on them). Upload every product listed under *Reference* as an image reference, in subject/product-reference mode with high strength so the label stays exact. A few prompts need no reference (ingredient-only scenes).
2. **Aspect ratio and size:** use the ratio shown for each image. Final files are cropped to the exact pixel size.
3. **Prompt:** paste the prompt as written. It already contains the label lock and the brand style.
4. **Negative prompt:** paste the shared negative prompt below.
5. **Pick the best of 4:** check the label text is exactly right before keeping an image. Regenerate if any letter changes.

**Shared negative prompt**

\`\`\`
${SITE_NEGATIVE}
\`\`\`

## Saving the images

Name each file \`site-<slot>\` (PNG, JPG or WEBP) and drop it in \`photos-inbox/\` at the project root, for example \`photos-inbox/site-hero.png\`. Then run:

\`\`\`bash
npm run images:sync
\`\`\`

The photo is cropped to the right size, converted to WebP into \`public/site/\`, and the spot switches over automatically.

| Slot | Page | Ratio | Final size |
| --- | --- | --- | --- |
${Object.entries(SITE_SLOTS).map(([k, s]) => `| \`${k}\` | ${s.page} | ${s.ratio} | ${s.size} |`).join('\n')}

`;

for (const page of pages) {
  md += `---\n\n## ${page}\n\n`;
  for (const [key, s] of Object.entries(SITE_SLOTS).filter(([, v]) => v.page === page)) {
    md += `### ${s.label}\n\n`;
    md += `- **Slot / file name:** \`${key}\` → \`photos-inbox/site-${key}.png\`\n`;
    md += `- **Ratio / size:** ${s.ratio} · ${s.size}\n`;
    md += `- **Reference:** ${s.refs.length ? s.refs.map(refName).join('; ') : 'none (no packaging in this image)'}\n\n`;
    md += `\`\`\`\n${slotPrompt(key)}\n\`\`\`\n\n`;
  }
}

fs.writeFileSync(path.join(root, 'docs', 'SITE_IMAGE_PROMPTS.md'), md);
console.log(`prompts:site → docs/SITE_IMAGE_PROMPTS.md (${Object.keys(SITE_SLOTS).length} prompts)`);
