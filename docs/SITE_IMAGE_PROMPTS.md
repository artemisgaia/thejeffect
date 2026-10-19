# The J Effect · Site Image Prompts

One prompt for every photo spot on the website (22 images). Generated from `lib/site-slots.js` by `npm run prompts:site`; edit the scene there and re-run rather than editing this file.

Until a photo exists, each spot shows the product packaging inside the site's arch frame, so nothing looks broken while you generate.

## How to generate

1. **Reference image(s):** use the finished, labeled product photos (the Supliful product images, once your Canva labels are on them). Upload every product listed under *Reference* as an image reference, in subject/product-reference mode with high strength so the label stays exact. A few prompts need no reference (ingredient-only scenes).
2. **Aspect ratio and size:** use the ratio shown for each image. Final files are cropped to the exact pixel size.
3. **Prompt:** paste the prompt as written. It already contains the label lock and the brand style.
4. **Negative prompt:** paste the shared negative prompt below.
5. **Pick the best of 4:** check the label text is exactly right before keeping an image. Regenerate if any letter changes.

**Shared negative prompt**

```
altered or misspelled label text, extra text, watermark, logo overlay, changed logo, redesigned packaging, duplicate or extra products, warped or melted bottle, floating objects, plastic-looking skin, extra or deformed fingers, long acrylic nails, harsh flash, oversaturated colors, cluttered background, stock-photo look, low resolution, blurry product
```

## Saving the images

Name each file `site-<slot>` (PNG, JPG or WEBP) and drop it in `photos-inbox/` at the project root, for example `photos-inbox/site-hero.png`. Then run:

```bash
npm run images:sync
```

The photo is cropped to the right size, converted to WebP into `public/site/`, and the spot switches over automatically.

| Slot | Page | Ratio | Final size |
| --- | --- | --- | --- |
| `hero` | Home | 3:4 | 1500×2000 |
| `cat-cleanse` | Home | 3:4 | 1200×1600 |
| `cat-treat` | Home | 3:4 | 1200×1600 |
| `cat-seal` | Home | 3:4 | 1200×1600 |
| `cat-body` | Home | 3:4 | 1200×1600 |
| `ritual` | Home | 4:5 | 1600×2000 |
| `gallery-1` | Home | 3:4 | 1200×1600 |
| `gallery-2` | Home | 1:1 | 1400×1400 |
| `gallery-3` | Home | 1:1 | 1400×1400 |
| `gallery-4` | Home | 2:1 | 2000×1000 |
| `gallery-5` | Home | 1:1 | 1400×1400 |
| `promise-main` | Home | 4:5 | 1600×2000 |
| `promise-accent` | Home | 1:1 | 1200×1200 |
| `story` | Home | 4:5 | 1600×2000 |
| `about-hero` | About | 4:5 | 1600×2000 |
| `about-mission` | About | 4:5 | 1600×2000 |
| `journal-ritual` | Journal | 3:2 | 1800×1200 |
| `journal-vitamin-c` | Journal | 3:2 | 1800×1200 |
| `journal-habit` | Journal | 3:2 | 1800×1200 |
| `guide-cleanse` | Ritual Guide | 3:4 | 1200×1600 |
| `guide-treat` | Ritual Guide | 3:4 | 1200×1600 |
| `guide-seal` | Ritual Guide | 3:4 | 1200×1600 |

---

## Home

### Home · Hero

- **Slot / file name:** `hero` → `photos-inbox/site-hero.png`
- **Ratio / size:** 3:4 · 1500×2000
- **Reference:** Nº 19 Watermelon Dew

```
The Watermelon Dew jar, lid off, resting on a rounded travertine plinth against a deep forest green linen backdrop. A hand enters from the right lifting a fingertip of translucent pink gel-cream. A halved watermelon slice and a eucalyptus sprig sit soft-focus behind. A subtle antique-gold rim light edges the jar. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Vertical composition, the jar in the lower-middle third with calm negative space above. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Home · Category · Cleanse

- **Slot / file name:** `cat-cleanse` → `photos-inbox/site-cat-cleanse.png`
- **Ratio / size:** 3:4 · 1200×1600
- **Reference:** Nº 01 Soft Reset; Nº 02 Pure Slate

```
The gel cleanser and charcoal cleanser standing together on wet grey river stone with fresh water droplets and a fern frond leaning in from the side. Cool mineral mood, cream and forest tones. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Home · Category · Treat

- **Slot / file name:** `cat-treat` → `photos-inbox/site-cat-treat.png`
- **Ratio / size:** 3:4 · 1200×1600
- **Reference:** Nº 14 Midnight Renewal; Nº 06 Golden Hour; Nº 05 Aqua Lock

```
Three dropper serums grouped at different heights on a pale frosted-glass shelf, one dropper tip holding a glistening drop of serum. Soft green leaf shadows fall across a cream wall. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Home · Category · Seal

- **Slot / file name:** `cat-seal` → `photos-inbox/site-cat-seal.png`
- **Ratio / size:** 3:4 · 1200×1600
- **Reference:** Nº 22 Copper Bloom; Nº 19 Watermelon Dew

```
Two open moisturizer jars on rumpled natural linen, a generous sculpted swirl of cream in the foreground catching the light, a single dried flower beside them. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Home · Category · Body

- **Slot / file name:** `cat-body` → `photos-inbox/site-cat-body.png`
- **Ratio / size:** 3:4 · 1200×1600
- **Reference:** Nº 29 Citrus Grove; Nº 28 Bare Shea; Nº 27 Morning Brew

```
A tallow cream jar, raw shea butter jar and coffee scrub arranged on a warm oak tray with a folded cream towel and a wooden spoon, a dried orange slice as the accent. Spa-at-home mood. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Home · Ritual method

- **Slot / file name:** `ritual` → `photos-inbox/site-ritual.png`
- **Ratio / size:** 4:5 · 1600×2000
- **Reference:** Nº 01 Soft Reset; Nº 06 Golden Hour; Nº 19 Watermelon Dew

```
A calm morning vanity: the cleanser, a vitamin C dropper serum and the Watermelon Dew jar lined up left to right on a stone tray by a window, a white linen hand towel folded beside them, steam-soft light, a sprig of eucalyptus in a small glass. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Home · Gallery 1 (tall)

- **Slot / file name:** `gallery-1` → `photos-inbox/site-gallery-1.png`
- **Ratio / size:** 3:4 · 1200×1600
- **Reference:** Nº 05 Aqua Lock; Nº 01 Soft Reset; Nº 19 Watermelon Dew

```
Overhead flat-lay of a full ritual (cleanser, serum, moisturizer) on a cream travertine slab with scattered dried petals and a water-glass shadow. Soft wraparound studio light with a gentle key from the upper left and a soft contact shadow. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Home · Gallery 2

- **Slot / file name:** `gallery-2` → `photos-inbox/site-gallery-2.png`
- **Ratio / size:** 1:1 · 1400×1400
- **Reference:** Nº 06 Golden Hour

```
The vitamin C serum bottle among fresh orange slices and a sprig of leaves, a bead of golden serum on the dropper, warm radiant color against a cream wall. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Home · Gallery 3

- **Slot / file name:** `gallery-3` → `photos-inbox/site-gallery-3.png`
- **Ratio / size:** 1:1 · 1400×1400
- **Reference:** Nº 19 Watermelon Dew

```
Extreme close-up of translucent pink watermelon gel-cream swiped across a glass surface, the open jar softly out of focus behind it. Fresh, juicy, dewy. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Home · Gallery 4 (wide)

- **Slot / file name:** `gallery-4` → `photos-inbox/site-gallery-4.png`
- **Ratio / size:** 2:1 · 2000×1000
- **Reference:** Nº 03 Rose Balance

```
The rose water toner bottle on a pale stone ledge, a few fresh pink rose petals and a fine mist hanging in the air, soft shallow depth of field, wide horizontal composition with the bottle on the left third. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Home · Gallery 5

- **Slot / file name:** `gallery-5` → `photos-inbox/site-gallery-5.png`
- **Ratio / size:** 1:1 · 1400×1400
- **Reference:** Nº 34 Obsidian; Nº 35 Milk & Honey

```
Two handcrafted ritual bars on a wet slate dish with a thin ribbon of lather and water droplets, a sprig of lavender beside them. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Home · Promise (main)

- **Slot / file name:** `promise-main` → `photos-inbox/site-promise-main.png`
- **Ratio / size:** 4:5 · 1600×2000
- **Reference:** Nº 09 Glasslight

```
Two hands gently holding the PDRN serum bottle over a cream linen cloth, a small stone bowl of botanicals beside them. Quiet, honest, tactile. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Home · Promise (accent)

- **Slot / file name:** `promise-accent` → `photos-inbox/site-promise-accent.png`
- **Ratio / size:** 1:1 · 1200×1200
- **Reference:** none (no packaging in this image)

```
Macro still life of botanical ingredients (green tea leaves, chamomile, aloe slice, rose petals) arranged on a cream ceramic plate, no packaging in frame. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. No product packaging appears in this image. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Home · Our story

- **Slot / file name:** `story` → `photos-inbox/site-story.png`
- **Ratio / size:** 4:5 · 1600×2000
- **Reference:** Nº 25 Moonlit

```
Evening ritual: a woman in a soft cream robe, shoulders-up, eyes gently closed, smoothing night cream along her cheek, natural skin texture with visible pores, the jar on a wooden nightstand beside a flickering candle. Intimate, unposed, calm. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

## About

### About · Hero

- **Slot / file name:** `about-hero` → `photos-inbox/site-about-hero.png`
- **Ratio / size:** 4:5 · 1600×2000
- **Reference:** Nº 19 Watermelon Dew; Nº 14 Midnight Renewal; Nº 01 Soft Reset

```
A curated group of J Effect products on a long travertine plinth, a eucalyptus branch casting a lace-like shadow across the cream wall behind them. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### About · Mission

- **Slot / file name:** `about-mission` → `photos-inbox/site-about-mission.png`
- **Ratio / size:** 4:5 · 1600×2000
- **Reference:** Nº 21 Daily Calm

```
Close portrait crop of two hands cradling an open cream jar at chest height, soft cream knit sweater, the cream texture just visible. Warm, human, reassuring. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

## Journal

### Journal · 3-step morning ritual

- **Slot / file name:** `journal-ritual` → `photos-inbox/site-journal-ritual.png`
- **Ratio / size:** 3:2 · 1800×1200
- **Reference:** Nº 01 Soft Reset; Nº 06 Golden Hour; Nº 19 Watermelon Dew

```
Three products in a row on a sunlit bathroom shelf beside a small potted fern and a white ceramic cup of water, the bathroom window blurred behind. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Journal · Vitamin C

- **Slot / file name:** `journal-vitamin-c` → `photos-inbox/site-journal-vitamin-c.png`
- **Ratio / size:** 3:2 · 1800×1200
- **Reference:** Nº 06 Golden Hour

```
The vitamin C serum bottle beside a halved blood orange and a few drops of golden serum on a white marble slab, bright and clean. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Journal · Building a habit

- **Slot / file name:** `journal-habit` → `photos-inbox/site-journal-habit.png`
- **Ratio / size:** 3:2 · 1800×1200
- **Reference:** Nº 21 Daily Calm

```
A toothbrush cup, a folded towel and a J Effect cream jar on a tidy bathroom counter, as if the habits are stacked together, a notebook and pen on the edge. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

## Ritual Guide

### Ritual Guide · Cleanse

- **Slot / file name:** `guide-cleanse` → `photos-inbox/site-guide-cleanse.png`
- **Ratio / size:** 3:4 · 1200×1600
- **Reference:** Nº 01 Soft Reset

```
A pump-bottle gel cleanser beside a ceramic basin of clear water, a droplet-covered stone and a fern leaf, cool and fresh. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Ritual Guide · Treat

- **Slot / file name:** `guide-treat` → `photos-inbox/site-guide-treat.png`
- **Ratio / size:** 3:4 · 1200×1600
- **Reference:** Nº 09 Glasslight; Nº 17 Jojoba Glow

```
A dropper serum and a face-oil bottle on a mirrored tray, one drop of serum falling from the dropper, soft glow reflecting beneath. Soft wraparound studio light with a gentle key from the upper left and a soft contact shadow. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### Ritual Guide · Seal

- **Slot / file name:** `guide-seal` → `photos-inbox/site-guide-seal.png`
- **Ratio / size:** 3:4 · 1200×1600
- **Reference:** Nº 23 Timeless Renewal

```
An open moisturizer jar on cream silk with a soft crescent moon of cream swirled on the lid, a single white flower beside it, a quiet bedtime mood. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image(s) as the exact product(s): same vessel, cap, proportions and The J Effect label with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 85–100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

