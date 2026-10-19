// ──────────────────────────────────────────────────────────────
// THE J EFFECT — Site image slots
//
// Every photo spot on the site (hero, category arches, gallery, About,
// Journal, Ritual Guide) is a named slot. Drop a finished image at
//   public/site/<slot>.webp          (or put <slot>.png|jpg in photos-inbox/
//                                      as `site-<slot>.png` and run
//                                      `npm run images:sync`)
// and the slot switches from the packaging fallback to the photo.
//
// `prompt` is ready to paste into an image generator together with the
// product reference image(s) listed in `refs`. Regenerate the guide with
// `npm run prompts:site` (writes docs/SITE_IMAGE_PROMPTS.md).
// ──────────────────────────────────────────────────────────────

export const SITE_STYLE =
  'Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. ' +
  'Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.';

export const SITE_NEGATIVE =
  'altered or misspelled label text, extra text, watermark, logo overlay, changed logo, redesigned packaging, duplicate or extra products, warped or melted bottle, ' +
  'floating objects, plastic-looking skin, extra or deformed fingers, long acrylic nails, harsh flash, oversaturated colors, cluttered background, stock-photo look, low resolution, blurry product';

export const SITE_LOCK =
  'Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging.';

const LIGHT = {
  morning: 'Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows',
  golden: 'Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance',
  evening: 'Low, warm lamp and candlelight, deep soft shadows, intimate evening mood',
  studio: 'Soft wraparound studio light with a gentle key from the upper left and a soft contact shadow',
};

export const SITE_SLOTS = {
  // ── Home ────────────────────────────────────────────────
  hero: {
    label: 'Home · Hero', page: 'Home', ratio: '3:4', size: '1500×2000',
    fallback: 'watermelon-hydration-moisturizer', refs: ['watermelon-hydration-moisturizer'],
    alt: 'Watermelon Dew hydration moisturizer by The J Effect',
    scene: `The Watermelon Dew jar, lid off, resting on a rounded travertine plinth against a deep forest green linen backdrop. A hand enters from the right lifting a fingertip of translucent pink gel-cream. A halved watermelon slice and a eucalyptus sprig sit soft-focus behind. A subtle antique-gold rim light edges the jar. ${LIGHT.morning}. Vertical composition, the jar in the lower-middle third with calm negative space above.`,
  },
  'cat-cleanse': {
    label: 'Home · Category · Cleanse', page: 'Home', ratio: '3:4', size: '1200×1600',
    fallback: 'gentle-cleansing-gel', refs: ['gentle-cleansing-gel', 'charcoal-facial-cleanser'],
    alt: 'Gentle cleansing gel and charcoal cleanser',
    scene: `The gel cleanser and charcoal cleanser standing together on wet grey river stone with fresh water droplets and a fern frond leaning in from the side. Cool mineral mood, cream and forest tones. ${LIGHT.morning}.`,
  },
  'cat-treat': {
    label: 'Home · Category · Treat', page: 'Home', ratio: '3:4', size: '1200×1600',
    fallback: 'retinol-peptide-face-serum', refs: ['retinol-peptide-face-serum', 'vitamin-c-brightening-serum', 'hyaluronic-acid-serum'],
    alt: 'Dropper serums by The J Effect',
    scene: `Three dropper serums grouped at different heights on a pale frosted-glass shelf, one dropper tip holding a glistening drop of serum. Soft green leaf shadows fall across a cream wall. ${LIGHT.golden}.`,
  },
  'cat-seal': {
    label: 'Home · Category · Seal', page: 'Home', ratio: '3:4', size: '1200×1600',
    fallback: 'copper-peptide-moisturizer', refs: ['copper-peptide-moisturizer', 'watermelon-hydration-moisturizer'],
    alt: 'Moisturizer jars by The J Effect',
    scene: `Two open moisturizer jars on rumpled natural linen, a generous sculpted swirl of cream in the foreground catching the light, a single dried flower beside them. ${LIGHT.morning}.`,
  },
  'cat-body': {
    label: 'Home · Category · Body', page: 'Home', ratio: '3:4', size: '1200×1600',
    fallback: 'tallow-cream-orange-bergamot', refs: ['tallow-cream-orange-bergamot', 'raw-shea-butter', 'coffee-body-scrub'],
    alt: 'Body care by The J Effect',
    scene: `A tallow cream jar, raw shea butter jar and coffee scrub arranged on a warm oak tray with a folded cream towel and a wooden spoon, a dried orange slice as the accent. Spa-at-home mood. ${LIGHT.golden}.`,
  },
  ritual: {
    label: 'Home · Ritual method', page: 'Home', ratio: '4:5', size: '1600×2000',
    fallback: 'vitamin-c-brightening-serum', refs: ['gentle-cleansing-gel', 'vitamin-c-brightening-serum', 'watermelon-hydration-moisturizer'],
    alt: 'The three-step J Effect ritual',
    scene: `A calm morning vanity: the cleanser, a vitamin C dropper serum and the Watermelon Dew jar lined up left to right on a stone tray by a window, a white linen hand towel folded beside them, steam-soft light, a sprig of eucalyptus in a small glass. ${LIGHT.morning}.`,
  },
  'gallery-1': {
    label: 'Home · Gallery 1 (tall)', page: 'Home', ratio: '3:4', size: '1200×1600',
    fallback: 'hyaluronic-acid-serum', refs: ['hyaluronic-acid-serum', 'gentle-cleansing-gel', 'watermelon-hydration-moisturizer'],
    alt: 'The full ritual',
    scene: `Overhead flat-lay of a full ritual (cleanser, serum, moisturizer) on a cream travertine slab with scattered dried petals and a water-glass shadow. ${LIGHT.studio}.`,
  },
  'gallery-2': {
    label: 'Home · Gallery 2', page: 'Home', ratio: '1:1', size: '1400×1400',
    fallback: 'vitamin-c-brightening-serum', refs: ['vitamin-c-brightening-serum'],
    alt: 'Vitamin C glow',
    scene: `The vitamin C serum bottle among fresh orange slices and a sprig of leaves, a bead of golden serum on the dropper, warm radiant color against a cream wall. ${LIGHT.golden}.`,
  },
  'gallery-3': {
    label: 'Home · Gallery 3', page: 'Home', ratio: '1:1', size: '1400×1400',
    fallback: 'watermelon-hydration-moisturizer', refs: ['watermelon-hydration-moisturizer'],
    alt: 'Watermelon Dew hydration',
    scene: `Extreme close-up of translucent pink watermelon gel-cream swiped across a glass surface, the open jar softly out of focus behind it. Fresh, juicy, dewy. ${LIGHT.morning}.`,
  },
  'gallery-4': {
    label: 'Home · Gallery 4 (wide)', page: 'Home', ratio: '2:1', size: '2000×1000',
    fallback: 'gentle-balancing-toner', refs: ['gentle-balancing-toner'],
    alt: 'Rose water balancing toner',
    scene: `The rose water toner bottle on a pale stone ledge, a few fresh pink rose petals and a fine mist hanging in the air, soft shallow depth of field, wide horizontal composition with the bottle on the left third. ${LIGHT.morning}.`,
  },
  'gallery-5': {
    label: 'Home · Gallery 5', page: 'Home', ratio: '1:1', size: '1400×1400',
    fallback: 'charcoal-soap', refs: ['charcoal-soap', 'oat-milk-honey-soap'],
    alt: 'Handcrafted ritual bars',
    scene: `Two handcrafted ritual bars on a wet slate dish with a thin ribbon of lather and water droplets, a sprig of lavender beside them. ${LIGHT.evening}.`,
  },
  'promise-main': {
    label: 'Home · Promise (main)', page: 'Home', ratio: '4:5', size: '1600×2000',
    fallback: 'pdrn-brightening-serum', refs: ['pdrn-brightening-serum'],
    alt: 'Clean, intentional formulas',
    scene: `Two hands gently holding the PDRN serum bottle over a cream linen cloth, a small stone bowl of botanicals beside them. Quiet, honest, tactile. ${LIGHT.morning}.`,
  },
  'promise-accent': {
    label: 'Home · Promise (accent)', page: 'Home', ratio: '1:1', size: '1200×1200',
    fallback: 'green-tea-antioxidant-serum', refs: [],
    alt: 'Botanical ingredients',
    scene: `Macro still life of botanical ingredients (green tea leaves, chamomile, aloe slice, rose petals) arranged on a cream ceramic plate, no packaging in frame. ${LIGHT.morning}.`,
  },
  story: {
    label: 'Home · Our story', page: 'Home', ratio: '4:5', size: '1600×2000',
    fallback: 'collagen-night-cream', refs: ['collagen-night-cream'],
    alt: 'An evening ritual with The J Effect',
    scene: `Evening ritual: a woman in a soft cream robe, shoulders-up, eyes gently closed, smoothing night cream along her cheek, natural skin texture with visible pores, the jar on a wooden nightstand beside a flickering candle. Intimate, unposed, calm. ${LIGHT.evening}.`,
  },

  // ── About ───────────────────────────────────────────────
  'about-hero': {
    label: 'About · Hero', page: 'About', ratio: '4:5', size: '1600×2000',
    fallback: 'watermelon-hydration-moisturizer', refs: ['watermelon-hydration-moisturizer', 'retinol-peptide-face-serum', 'gentle-cleansing-gel'],
    alt: 'The J Effect products on a clean surface',
    scene: `A curated group of J Effect products on a long travertine plinth, a eucalyptus branch casting a lace-like shadow across the cream wall behind them. ${LIGHT.golden}.`,
  },
  'about-mission': {
    label: 'About · Mission', page: 'About', ratio: '4:5', size: '1600×2000',
    fallback: 'hyaluronic-hydration-cream', refs: ['hyaluronic-hydration-cream'],
    alt: 'A J Effect jar held in hands',
    scene: `Close portrait crop of two hands cradling an open cream jar at chest height, soft cream knit sweater, the cream texture just visible. Warm, human, reassuring. ${LIGHT.morning}.`,
  },

  // ── Journal ─────────────────────────────────────────────
  'journal-ritual': {
    label: 'Journal · 3-step morning ritual', page: 'Journal', ratio: '3:2', size: '1800×1200',
    fallback: 'gentle-cleansing-gel', refs: ['gentle-cleansing-gel', 'vitamin-c-brightening-serum', 'watermelon-hydration-moisturizer'],
    alt: 'A three-step morning ritual',
    scene: `Three products in a row on a sunlit bathroom shelf beside a small potted fern and a white ceramic cup of water, the bathroom window blurred behind. ${LIGHT.morning}.`,
  },
  'journal-vitamin-c': {
    label: 'Journal · Vitamin C', page: 'Journal', ratio: '3:2', size: '1800×1200',
    fallback: 'vitamin-c-brightening-serum', refs: ['vitamin-c-brightening-serum'],
    alt: 'Vitamin C serum with citrus',
    scene: `The vitamin C serum bottle beside a halved blood orange and a few drops of golden serum on a white marble slab, bright and clean. ${LIGHT.golden}.`,
  },
  'journal-habit': {
    label: 'Journal · Building a habit', page: 'Journal', ratio: '3:2', size: '1800×1200',
    fallback: 'hyaluronic-hydration-cream', refs: ['hyaluronic-hydration-cream'],
    alt: 'A simple skincare habit',
    scene: `A toothbrush cup, a folded towel and a J Effect cream jar on a tidy bathroom counter, as if the habits are stacked together, a notebook and pen on the edge. ${LIGHT.morning}.`,
  },

  // ── Ritual Guide ────────────────────────────────────────
  'guide-cleanse': {
    label: 'Ritual Guide · Cleanse', page: 'Ritual Guide', ratio: '3:4', size: '1200×1600',
    fallback: 'gentle-cleansing-gel', refs: ['gentle-cleansing-gel'],
    alt: 'Cleanse and reset',
    scene: `A pump-bottle gel cleanser beside a ceramic basin of clear water, a droplet-covered stone and a fern leaf, cool and fresh. ${LIGHT.morning}.`,
  },
  'guide-treat': {
    label: 'Ritual Guide · Treat', page: 'Ritual Guide', ratio: '3:4', size: '1200×1600',
    fallback: 'pdrn-brightening-serum', refs: ['pdrn-brightening-serum', 'nourishing-jojoba-face-oil'],
    alt: 'Treat and target',
    scene: `A dropper serum and a face-oil bottle on a mirrored tray, one drop of serum falling from the dropper, soft glow reflecting beneath. ${LIGHT.studio}.`,
  },
  'guide-seal': {
    label: 'Ritual Guide · Seal', page: 'Ritual Guide', ratio: '3:4', size: '1200×1600',
    fallback: 'anti-aging-moisturizer', refs: ['anti-aging-moisturizer'],
    alt: 'Seal and protect',
    scene: `An open moisturizer jar on cream silk with a soft crescent moon of cream swirled on the lid, a single white flower beside it, a quiet bedtime mood. ${LIGHT.evening}.`,
  },
};

export const SITE_SLOT_KEYS = Object.keys(SITE_SLOTS);

export function slotPrompt(key) {
  const s = SITE_SLOTS[key];
  const lock = s.refs.length ? ` ${SITE_LOCK}` : ' No product packaging appears in this image.';
  return `${s.scene}${lock} ${SITE_STYLE}`;
}
