// ──────────────────────────────────────────────────────────────
// THE J EFFECT — Product Catalog
//
// Product copy lives in lib/catalog/*.js (one file per ritual).
// Each entry has:
//   no, slug, name, descriptor      Nº, URL, brand name, SEO descriptor
//   category, type, step, ritual    filter key, display type, ritual step, AM/PM
//   price (cents), size, tags
//   tagline, short, story[], benefits[], key_ingredients[]
//   ingredients (INCI), how_to_use[], texture, scent, skin_types[]
//   badges[], pairs_with[slugs], faqs[{q,a}], warnings, quote
//   seo { title, description, keywords[] }
//   shoot { vessel, formula, botanicals, ritual, scene, light }
//     → art direction for the 5 product photos (see scripts/build-kling-prompts.mjs)
//
// Images: drop the 5 generated shots into
//   public/products/<slug>/<slug>-<shot>.webp   (shot = hero|texture|ingredients|ritual|lifestyle)
// then run `npm run images:sync` (runs automatically before dev/build).
// Until real shots exist, the rendered packaging previews
// (<slug>-pack.webp, <slug>-label.webp) are used.
//
// Stripe: paste each Price ID into lib/stripe-prices.js.
// ──────────────────────────────────────────────────────────────

import { FACE } from './catalog/face';
import { BODY } from './catalog/body';
import { BATH } from './catalog/bath';
import { HAIR } from './catalog/hair';
import IMAGE_MANIFEST from './product-images.json';
import { STRIPE_PRICES } from './stripe-prices';

export const SHOTS = [
  { key: 'hero',        label: 'Studio' },
  { key: 'texture',     label: 'Texture' },
  { key: 'ingredients', label: 'Ingredients' },
  { key: 'ritual',      label: 'Ritual' },
  { key: 'lifestyle',   label: 'Lifestyle' },
];

export const CATEGORY_META = {
  'cleanser': {
    label: 'Cleansers', path: 'cleansers', eyebrow: 'Step 01 · Cleanse',
    h1: 'Face cleansers that never strip.',
    intro: 'Gentle gel and charcoal cleansers that lift makeup, SPF and the day while leaving your moisture barrier intact.',
    seoTitle: 'Gentle Face Cleansers & Face Wash',
    seoDescription: 'Shop The J Effect face cleansers: a sulfate-free hydrating gel cleanser and an activated charcoal face wash. Clean formulas, made in the USA.',
  },
  'toner': {
    label: 'Toners', path: 'toners', eyebrow: 'Step 02 · Tone',
    h1: 'Toners that balance and prep.',
    intro: 'Rose water and witch hazel toners that rebalance skin after cleansing and help every serum absorb.',
    seoTitle: 'Hydrating & Pore-Refining Toners',
    seoDescription: 'Shop The J Effect toners: a rose water balancing toner and a witch hazel pore-perfecting toner with hyaluronic acid. Made in the USA.',
  },
  'serum': {
    label: 'Serums', path: 'serums', eyebrow: 'Step 03 · Treat',
    h1: 'Face serums for every skin goal.',
    intro: 'Targeted, layerable serums: hyaluronic acid, vitamin C, niacinamide, retinol, PDRN, snail mucin and dark spot care.',
    seoTitle: 'Face Serums: Vitamin C, Retinol, Hyaluronic Acid',
    seoDescription: 'Shop The J Effect face serums: vitamin C, retinol, hyaluronic acid, 10% niacinamide, PDRN, snail mucin and dark spot serums. Made in the USA.',
  },
  'treatment': {
    label: 'Treatments', path: 'treatments', eyebrow: 'Step 03 · Treat',
    h1: 'Targeted treatments.',
    intro: 'Focused care for blemish-prone and reactive moments.',
    seoTitle: 'Blemish & Spot Treatments',
    seoDescription: 'Shop The J Effect treatments, including our aloe and tea tree clarifying gel for blemish-prone skin. Made in the USA.',
  },
  'eye-care': {
    label: 'Eye Care', path: 'eye-care', eyebrow: 'Step 03 · Treat',
    h1: 'Eye care for rested-looking eyes.',
    intro: 'Lightweight peptide care for puffiness and the delicate skin around the eyes.',
    seoTitle: 'Peptide Eye Cream & Eye Gel',
    seoDescription: 'Shop The J Effect eye care: a peptide eye gel-cream that reduces the look of puffiness and hydrates. Fragrance-free, made in the USA.',
  },
  'face-oil': {
    label: 'Face Oils', path: 'face-oils', eyebrow: 'Step 04 · Nourish',
    h1: 'Face oils for glow and gua sha.',
    intro: 'Lightweight botanical oils that seal in your ritual and give perfect slip for facial massage.',
    seoTitle: 'Face Oils: Jojoba, Squalane & Gua Sha Oil',
    seoDescription: 'Shop The J Effect face oils: a jojoba and squalane face oil and a 12-botanical gua sha facial oil. Made in the USA.',
  },
  'moisturizer': {
    label: 'Moisturizers', path: 'moisturizers', eyebrow: 'Step 05 · Moisturize',
    h1: 'Moisturizers that seal the ritual.',
    intro: 'From weightless gel-creams to rich retinol and copper peptide creams, find the finish your skin wants.',
    seoTitle: 'Face Moisturizers & Night Creams',
    seoDescription: 'Shop The J Effect moisturizers: watermelon gel-cream, copper peptide, retinol and ceramide, DMAE firming and collagen night creams. Made in USA.',
  },
  'mask': {
    label: 'Masks', path: 'masks', eyebrow: 'Weekly ritual',
    h1: 'Masks for a weekly reset.',
    intro: 'Mineral-rich treatments to clarify pores and renew texture, once or twice a week.',
    seoTitle: 'Dead Sea Mud Mask',
    seoDescription: 'Shop The J Effect masks, including pure Dead Sea mud mask for pores and oily skin. Vegan, fragrance-free, made in the USA.',
  },
  'body': {
    label: 'Body', path: 'body', eyebrow: 'Body ritual',
    h1: 'Body care, made to be savored.',
    intro: 'Grass-fed tallow creams, raw shea butter, coffee scrub and cooling body cream for soft skin from shoulders to soles.',
    seoTitle: 'Body Care: Tallow Cream, Shea Butter & Scrubs',
    seoDescription: 'Shop The J Effect body care: grass-fed tallow cream, raw organic shea butter, coffee body scrub and cooling aloe body cream. Made in the USA.',
  },
  'ritual-bar': {
    label: 'Ritual Bars', path: 'ritual-bars', eyebrow: 'Handcrafted bars',
    h1: 'Handcrafted ritual bars.',
    intro: 'Small-batch cleansing bars made in the USA from organic oils and pure botanicals. Eleven scents, zero sulfates.',
    seoTitle: 'Handmade Natural Soap Bars',
    seoDescription: 'Shop The J Effect handmade soap bars: charcoal, kojic acid and turmeric, lavender, oat and goat milk, sandalwood, eucalyptus and more. Made in USA.',
  },
  'hair': {
    label: 'Hair & Scalp', path: 'hair-scalp', eyebrow: 'Hair ritual',
    h1: 'Scalp care for fuller-looking hair.',
    intro: 'Peptide and rosemary scalp serums and nourishing oils for stronger, shinier, healthier-looking hair.',
    seoTitle: 'Hair Serums & Scalp Oils: Rosemary, Peptides',
    seoDescription: 'Shop The J Effect hair and scalp care: peptide hair serum, rosemary scalp serum, castor scalp oil and nourishing hair oil. Made in the USA.',
  },
};

const PLACEHOLDER_PRICE = 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID';

function altFor(p, shot) {
  const full = `${p.name} ${p.descriptor}`;
  switch (shot) {
    case 'hero':        return `${full} by The J Effect, ${p.size}`;
    case 'texture':     return `${p.name} texture close-up: ${p.texture.replace(/\.$/, '').toLowerCase()}`;
    case 'ingredients': return `${p.name} with key ingredients: ${p.key_ingredients.map((k) => k.name).join(', ')}`;
    case 'ritual':      return `How to use ${p.name} ${p.type.toLowerCase()}: ${p.how_to_use[0].replace(/\.$/, '').toLowerCase()}`;
    case 'lifestyle':   return `${p.name} in a ${p.ritual === 'PM' ? 'nighttime' : 'daily'} skincare ritual`;
    case 'pack':        return `${full} packaging, Nº ${String(p.no).padStart(2, '0')}`;
    case 'label':       return `${p.name} label detail with key actives and size`;
    default:            return full;
  }
}

function buildGallery(p) {
  const files = IMAGE_MANIFEST[p.slug] || [];
  const has = (kind) => files.includes(kind);
  const src = (kind) => `/products/${p.slug}/${p.slug}-${kind}.webp`;

  const shots = SHOTS.map((s) => s.key).filter(has);
  // Fill with rendered packaging previews until all 5 photos exist.
  const fillers = ['pack', 'label'].filter(has);
  const kinds = shots.length >= SHOTS.length ? shots : [...shots, ...fillers].slice(0, SHOTS.length);

  return kinds.map((kind) => ({ kind, src: src(kind), alt: altFor(p, kind) }));
}

function normalize(p) {
  const gallery = buildGallery(p);
  const stripe_price_id = STRIPE_PRICES[p.slug] || PLACEHOLDER_PRICE;
  const title = p.collection ? `${p.collection} ${p.name}` : `${p.name} ${p.descriptor}`;
  return {
    ...p,
    id: `prod_${p.slug}`,
    sku: `JE-${String(p.no).padStart(3, '0')}`,
    title,
    compare_at_price: null,
    stripe_price_id,
    variants: [{ id: `var_${p.slug}`, label: p.size, price: p.price, stripe_price_id }],
    tags: [...new Set([p.category, ...p.tags])],
    gallery,
    images: gallery.map((g) => g.src),
    packagingPreview: !gallery.some((g) => g.kind === 'hero'),
  };
}

export const PRODUCTS = [...FACE, ...BODY, ...BATH, ...HAIR]
  .sort((a, b) => a.no - b.no)
  .map(normalize);

const BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));

// Helper: get product by slug
export function getProductBySlug(slug) {
  return BY_SLUG.get(slug) || null;
}

export { formatMoney } from './format';

// The lightweight shape client components need (cards, cart, grids).
// Keeps full copy, FAQs and shoot briefs out of client payloads.
export function toCard(p) {
  return {
    id: p.id,
    slug: p.slug,
    no: p.no,
    title: p.title,
    name: p.name,
    descriptor: p.descriptor,
    type: p.type,
    category: p.category,
    tags: p.tags,
    size: p.size,
    price: p.price,
    compare_at_price: p.compare_at_price,
    stripe_price_id: p.stripe_price_id,
    variants: p.variants,
    images: p.images.slice(0, 2),
    alt: p.gallery[0]?.alt || p.title,
  };
}

// "Complete the ritual": hand-picked pairings, in order.
export function getPairings(p) {
  return (p.pairs_with || []).map(getProductBySlug).filter(Boolean);
}

// Related: same category first, then shared concern tags.
export function getRelated(p, limit = 4) {
  const exclude = new Set([p.slug, ...(p.pairs_with || [])]);
  const score = (q) =>
    (q.category === p.category ? 10 : 0) + q.tags.filter((t) => p.tags.includes(t)).length;
  return PRODUCTS.filter((q) => !exclude.has(q.slug))
    .map((q) => [score(q), q])
    .filter(([s]) => s > 1)
    .sort((a, b) => b[0] - a[0] || a[1].no - b[1].no)
    .slice(0, limit)
    .map(([, q]) => q);
}

// Home page "Daily Essentials" row.
export const FEATURED_SLUGS = [
  'watermelon-hydration-moisturizer',
  'retinol-peptide-face-serum',
  'vitamin-c-brightening-serum',
  'pdrn-brightening-serum',
];
export const FEATURED_PRODUCTS = FEATURED_SLUGS.map(getProductBySlug).filter(Boolean);

// Category definitions
export const CATEGORIES = [
  { label: 'Step 01', name: 'Cleanse & Reset',  cta: 'Shop Cleansers',    filter: 'cleanser',     image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80' },
  { label: 'Step 02', name: 'Treat & Target',   cta: 'Shop Serums',       filter: 'serum',        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=700&q=80' },
  { label: 'Step 03', name: 'Seal & Protect',   cta: 'Shop Moisturizers', filter: 'moisturizer',  image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80' },
  { label: 'Body Ritual', name: 'Body & Glow',  cta: 'Shop Body',         filter: 'body',         image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80' },
];

// Mosaic images
export const MOSAIC_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&q=80', caption: 'The full ritual', tall: true },
  { src: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80', caption: 'Vitamin C glow' },
  { src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',    caption: 'Watermelon Hydration' },
  { src: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80', caption: 'Balancing mist', wide: true },
  { src: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80', caption: 'Ritual bar' },
];

// Blog/Journal posts
export const POSTS = [
  {
    slug: 'your-3-step-ritual',
    title: 'Your 3-Step Morning Ritual for Luminous Skin',
    date: 'June 15, 2026',
    excerpt: 'The right routine doesn\'t have to be complicated. Three steps, done consistently, change everything.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80',
    content: `
      <p>Clean skin, targeted treatment, and sealed moisture — that's the J Effect method in its simplest form. We often receive questions about the "perfect" routine, and the truth is, perfection lies in consistency, not complexity.</p>
      <h2>Step 1: The Reset</h2>
      <p>Your morning cleanse isn't about scrubbing away grime—it's about removing overnight oil and creating a fresh canvas. Using a gentle, pH-balanced cleanser ensures your moisture barrier remains intact. If your skin feels tight after washing, your cleanser is too harsh.</p>
      <h2>Step 2: The Target</h2>
      <p>This is where the magic happens. A potent antioxidant, like Vitamin C, is non-negotiable for morning routines. It acts as a shield against environmental aggressors—pollution, UV damage, and free radicals. Apply it to slightly damp skin to enhance absorption.</p>
      <blockquote>"Skincare is a daily practice of returning to yourself. Don't rush it."</blockquote>
      <h2>Step 3: The Seal</h2>
      <p>Never skip moisturizer, even if your skin is oily. A lightweight hydration layer locks in the active ingredients from Step 2 and repairs the skin barrier. Finally, the most important step of all: SPF. Sunscreen is the ultimate anti-aging product, protecting your skin's collagen and elastin.</p>
    `,
  },
  {
    slug: 'vitamin-c-the-truth',
    title: 'Vitamin C — What It Actually Does for Your Skin',
    date: 'May 28, 2026',
    excerpt: 'The most misunderstood ingredient in skincare. Here\'s what the science actually says.',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80',
    content: `
      <p>Vitamin C (ascorbic acid) is one of the most researched topical antioxidants in dermatology, yet it remains one of the most misunderstood ingredients by consumers.</p>
      <h2>The Science of Brightening</h2>
      <p>At its core, Vitamin C inhibits melanin production. It doesn't just fade existing dark spots and hyperpigmentation; it proactively prevents new ones from forming. It's not a bleaching agent—it's a targeted melanin regulator.</p>
      <h2>Collagen Synthesis</h2>
      <p>Beyond brightening, Vitamin C is an essential cofactor in collagen synthesis. Without it, your skin cannot effectively produce new collagen, leading to premature sagging and fine lines. Regular application literally helps your skin rebuild its structural integrity.</p>
      <blockquote>"If you could only use two products for the rest of your life, make it Vitamin C and SPF."</blockquote>
      <h2>Stability Matters</h2>
      <p>Not all Vitamin C is created equal. L-ascorbic acid is highly unstable and degrades when exposed to light and air (which is why our formula is housed in opaque packaging). When selecting a serum, look for complementary antioxidants like Vitamin E or Ferulic Acid, which stabilize the Vitamin C and double its photoprotective qualities.</p>
    `,
  },
  {
    slug: 'building-a-consistent-ritual',
    title: 'How to Actually Build a Skincare Habit That Sticks',
    date: 'May 10, 2026',
    excerpt: 'Consistency beats complexity every single time. Here\'s the framework that works.',
    image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&q=80',
    content: `
      <p>The most effective skincare ritual is the one you actually do. A 12-step routine might look great on social media, but if you abandon it after a week because it's too exhausting, your skin won't reap the benefits.</p>
      <h2>Start with the Non-Negotiables</h2>
      <p>Strip your routine down to the absolute essentials: Cleanser, Moisturizer, and SPF. Do not add serums, exfoliants, or masks until you have reliably completed this 3-step baseline for at least 21 days.</p>
      <h2>Habit Stacking</h2>
      <p>The psychological secret to building a routine is "Habit Stacking." Tie your skincare ritual to an existing, non-negotiable habit. For example, tell yourself: <em>"After I brush my teeth, I will immediately wash my face."</em> The established habit acts as the trigger for the new habit.</p>
      <blockquote>"Consistency beats intensity. A basic routine done daily is better than a complex routine done monthly."</blockquote>
      <h2>Embrace the Ritual</h2>
      <p>Change your mindset. Skincare is not a chore you have to complete before you can go to bed. It is a 3-minute ritual of self-care. It's the moment you literally wash away the stress of the day. When you view it as a luxury rather than an obligation, consistency follows naturally.</p>
    `,
  },
];
