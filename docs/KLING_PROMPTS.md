# The J Effect · Kling Product Image Prompts

Five images for each of the 47 products (235 prompts). Generated from the `shoot` brief of each product in `lib/catalog/*.js` by `npm run prompts:kling`; edit the brief there and re-run rather than editing this file.

## How to generate

1. **Reference image:** upload the finished, labeled product photo (front-facing, plain background, label sharp) as the image reference. Use Kling's subject/product reference mode and set reference strength high so the packaging and label are preserved.
2. **Aspect ratio:** **3:4** (portrait). Product pages display every image at 3:4.
3. **Resolution:** the highest available (2K or above). Final files are resized to 1200×1600.
4. **Prompt:** paste the product's prompt. Each prompt already contains the style block and the label lock.
5. **Negative prompt:** paste the shared negative prompt below.
6. **Pick the best of 4:** check that the label text is exactly right before keeping an image. Regenerate if any letter changes.

**Shared negative prompt**

```
altered or misspelled label text, extra text, watermark, changed logo, redesigned packaging, duplicate or extra products, warped or melted bottle, floating objects, plastic-looking skin, extra or deformed fingers, long acrylic nails, harsh flash, oversaturated colors, cluttered background, low resolution, blurry product
```

## Saving the images

Name each file `<slug>-<shot>` (PNG, JPG or WEBP) and drop it in `photos-inbox/` at the project root, for example `photos-inbox/retinol-peptide-face-serum-hero.png`. Then run:

```bash
npm run images:sync
```

This optimizes every photo to a 1200×1600 WEBP in `public/products/<slug>/` and updates the gallery manifest. A product's gallery switches from the packaging preview to the photos automatically, and the "packaging preview" note disappears once the hero shot exists.

| Shot | Suffix | Used for |
| --- | --- | --- |
| 01 · Studio hero | `-hero` | Main product image, collection cards, Google Shopping. |
| 02 · Texture | `-texture` | Shows the formula so shoppers can imagine how it feels. |
| 03 · Ingredients | `-ingredients` | Visual proof of the key ingredients; supports ingredient-led SEO. |
| 04 · Ritual (in use) | `-ritual` | How to use it; builds trust and shows real skin. |
| 05 · Lifestyle | `-lifestyle` | Aspirational scene for the ritual banner and social. |

---

## Contents

- [Nº 01 · Soft Reset](#n01)
- [Nº 02 · Pure Slate](#n02)
- [Nº 03 · Rose Balance](#n03)
- [Nº 04 · Refine Tonic](#n04)
- [Nº 05 · Aqua Lock](#n05)
- [Nº 06 · Golden Hour](#n06)
- [Nº 07 · First Light](#n07)
- [Nº 08 · Clear Canvas](#n08)
- [Nº 09 · Glasslight](#n09)
- [Nº 10 · Dew Repair](#n10)
- [Nº 11 · Green Shield](#n11)
- [Nº 12 · Even Tone](#n12)
- [Nº 13 · Calm Tone](#n13)
- [Nº 14 · Midnight Renewal](#n14)
- [Nº 15 · Clear Calm](#n15)
- [Nº 16 · Wide Awake](#n16)
- [Nº 17 · Jojoba Glow](#n17)
- [Nº 18 · Ritual Glide](#n18)
- [Nº 19 · Watermelon Dew](#n19)
- [Nº 20 · Aqua Veil](#n20)
- [Nº 21 · Daily Calm](#n21)
- [Nº 22 · Copper Bloom](#n22)
- [Nº 23 · Timeless Renewal](#n23)
- [Nº 24 · Contour](#n24)
- [Nº 25 · Moonlit](#n25)
- [Nº 26 · Deep Earth](#n26)
- [Nº 27 · Morning Brew](#n27)
- [Nº 28 · Bare Shea](#n28)
- [Nº 29 · Citrus Grove](#n29)
- [Nº 30 · Lavender Fields](#n30)
- [Nº 31 · Still Night](#n31)
- [Nº 32 · Cool Down](#n32)
- [Nº 33 · Turmeric Gold](#n33)
- [Nº 34 · Obsidian](#n34)
- [Nº 35 · Milk & Honey](#n35)
- [Nº 36 · Evening Calm](#n36)
- [Nº 37 · Forest Slumber](#n37)
- [Nº 38 · Cooling Aloe](#n38)
- [Nº 39 · Breathe Deep](#n39)
- [Nº 40 · Coconut Shore](#n40)
- [Nº 41 · Sandalwood Ember](#n41)
- [Nº 42 · Wild Sage](#n42)
- [Nº 43 · Luffa Polish](#n43)
- [Nº 44 · Full Crown](#n44)
- [Nº 45 · Rosemary Root](#n45)
- [Nº 46 · Root Ritual](#n46)
- [Nº 47 · Silk Strand](#n47)

---

<a id="n01"></a>

## Nº 01 · Soft Reset

**Gentle Hydrating Gel Cleanser** · 6 fl oz / 177 ml · slug `gentle-cleansing-gel`
Reference: the labeled clear PET pump bottle filled with pale golden translucent gel, white pump head.

### 01 · Studio hero → `gentle-cleansing-gel-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same clear PET pump bottle filled with pale golden translucent gel, white pump head, same cap, same proportions, and the same The J Effect label (Nº 01, "Soft Reset") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `gentle-cleansing-gel-texture`

```
Macro texture shot: a glossy ribbon of clear, pale-gold cleansing gel with tiny suspended air bubbles in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same clear PET pump bottle filled with pale golden translucent gel, white pump head, same cap, same proportions, and the same The J Effect label (Nº 01, "Soft Reset") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `gentle-cleansing-gel-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: fresh watermelon wedges, a halved green apple, a sprig of witch hazel leaves and a small bowl of red lentils. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same clear PET pump bottle filled with pale golden translucent gel, white pump head, same cap, same proportions, and the same The J Effect label (Nº 01, "Soft Reset") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `gentle-cleansing-gel-ritual`

```
In-use ritual moment: wet hands working a soft, fine white lather between the palms over a stone basin. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same clear PET pump bottle filled with pale golden translucent gel, white pump head, same cap, same proportions, and the same The J Effect label (Nº 01, "Soft Reset") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `gentle-cleansing-gel-lifestyle`

```
Aspirational lifestyle scene: the product on the edge of a travertine bathroom sink beside a folded linen face towel and a small ceramic dish. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same clear PET pump bottle filled with pale golden translucent gel, white pump head, same cap, same proportions, and the same The J Effect label (Nº 01, "Soft Reset") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n02"></a>

## Nº 02 · Pure Slate

**Activated Charcoal Facial Cleanser** · 2 fl oz / 59 ml · slug `charcoal-facial-cleanser`
Reference: the labeled matte black squeeze bottle with a black flip-top cap.

### 01 · Studio hero → `charcoal-facial-cleanser-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same matte black squeeze bottle with a black flip-top cap, same cap, same proportions, and the same The J Effect label (Nº 02, "Pure Slate") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `charcoal-facial-cleanser-texture`

```
Macro texture shot: a thick swirl of glossy charcoal-black gel with a soft grey foam edge in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same matte black squeeze bottle with a black flip-top cap, same cap, same proportions, and the same The J Effect label (Nº 02, "Pure Slate") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `charcoal-facial-cleanser-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: raw charcoal pieces, fresh tea tree sprigs and a split aloe vera leaf on dark slate. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same matte black squeeze bottle with a black flip-top cap, same cap, same proportions, and the same The J Effect label (Nº 02, "Pure Slate") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `charcoal-facial-cleanser-ritual`

```
In-use ritual moment: fingertips massaging a pale grey charcoal lather across the T-zone and nose. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same matte black squeeze bottle with a black flip-top cap, same cap, same proportions, and the same The J Effect label (Nº 02, "Pure Slate") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `charcoal-facial-cleanser-lifestyle`

```
Aspirational lifestyle scene: the product on a dark basalt bathroom shelf beside a black ceramic cup and a grey waffle towel. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same matte black squeeze bottle with a black flip-top cap, same cap, same proportions, and the same The J Effect label (Nº 02, "Pure Slate") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n03"></a>

## Nº 03 · Rose Balance

**Green Tea & Chamomile Balancing Toner** · 6 fl oz / 177 ml · slug `gentle-balancing-toner`
Reference: the labeled clear PET bottle with a white fine-mist spray top, filled with clear liquid.

### 01 · Studio hero → `gentle-balancing-toner-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same clear PET bottle with a white fine-mist spray top, filled with clear liquid, same cap, same proportions, and the same The J Effect label (Nº 03, "Rose Balance") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `gentle-balancing-toner-texture`

```
Macro texture shot: a fine, backlit cloud of toner mist with glistening droplets settling on a glass surface in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same clear PET bottle with a white fine-mist spray top, filled with clear liquid, same cap, same proportions, and the same The J Effect label (Nº 03, "Rose Balance") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `gentle-balancing-toner-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: fresh pink Damask rose petals, chamomile flowers, loose green tea leaves and a cut aloe leaf. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same clear PET bottle with a white fine-mist spray top, filled with clear liquid, same cap, same proportions, and the same The J Effect label (Nº 03, "Rose Balance") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `gentle-balancing-toner-ritual`

```
In-use ritual moment: a hand holding the bottle and misting toward a glowing cheek, droplets caught in the light. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same clear PET bottle with a white fine-mist spray top, filled with clear liquid, same cap, same proportions, and the same The J Effect label (Nº 03, "Rose Balance") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `gentle-balancing-toner-lifestyle`

```
Aspirational lifestyle scene: the product on a pale marble vanity tray beside a small bud vase with a single garden rose and cotton rounds in a glass jar. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same clear PET bottle with a white fine-mist spray top, filled with clear liquid, same cap, same proportions, and the same The J Effect label (Nº 03, "Rose Balance") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n04"></a>

## Nº 04 · Refine Tonic

**Witch Hazel Pore-Perfecting Toner** · 6 fl oz / 177 ml · slug `witch-hazel-pore-toner`
Reference: the labeled clear PET bottle with a white fine-mist spray top, filled with clear liquid.

### 01 · Studio hero → `witch-hazel-pore-toner-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same clear PET bottle with a white fine-mist spray top, filled with clear liquid, same cap, same proportions, and the same The J Effect label (Nº 04, "Refine Tonic") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `witch-hazel-pore-toner-texture`

```
Macro texture shot: a crisp splash of clear toner frozen mid-air above a glass tray, droplets sharp and bright in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same clear PET bottle with a white fine-mist spray top, filled with clear liquid, same cap, same proportions, and the same The J Effect label (Nº 04, "Refine Tonic") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `witch-hazel-pore-toner-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: witch hazel branches with yellow ribbon flowers, sliced white radish and green bamboo leaves. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same clear PET bottle with a white fine-mist spray top, filled with clear liquid, same cap, same proportions, and the same The J Effect label (Nº 04, "Refine Tonic") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `witch-hazel-pore-toner-ritual`

```
In-use ritual moment: a cotton pad soaked with toner sweeping across a cheek and nose, pores looking smooth. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same clear PET bottle with a white fine-mist spray top, filled with clear liquid, same cap, same proportions, and the same The J Effect label (Nº 04, "Refine Tonic") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `witch-hazel-pore-toner-lifestyle`

```
Aspirational lifestyle scene: the product on a clean white bathroom counter beside a stack of cotton rounds and a glass of water with a lemon slice. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same clear PET bottle with a white fine-mist spray top, filled with clear liquid, same cap, same proportions, and the same The J Effect label (Nº 04, "Refine Tonic") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n05"></a>

## Nº 05 · Aqua Lock

**4-Weight Hyaluronic Acid Serum** · 1 fl oz / 30 ml · slug `hyaluronic-acid-serum`
Reference: the labeled clear glass 1 oz dropper bottle with a white rubber bulb and white collar, filled with clear serum.

### 01 · Studio hero → `hyaluronic-acid-serum-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same clear glass 1 oz dropper bottle with a white rubber bulb and white collar, filled with clear serum, same cap, same proportions, and the same The J Effect label (Nº 05, "Aqua Lock") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `hyaluronic-acid-serum-texture`

```
Macro texture shot: a single crystal-clear drop of serum falling from the glass pipette into a still pool, with concentric ripples in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same clear glass 1 oz dropper bottle with a white rubber bulb and white collar, filled with clear serum, same cap, same proportions, and the same The J Effect label (Nº 05, "Aqua Lock") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `hyaluronic-acid-serum-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: clear water droplets, smooth river stones and a few floating white orchid petals in a shallow glass dish. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same clear glass 1 oz dropper bottle with a white rubber bulb and white collar, filled with clear serum, same cap, same proportions, and the same The J Effect label (Nº 05, "Aqua Lock") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `hyaluronic-acid-serum-ritual`

```
In-use ritual moment: fingertips pressing clear serum into a dewy cheek, skin glowing and plump. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same clear glass 1 oz dropper bottle with a white rubber bulb and white collar, filled with clear serum, same cap, same proportions, and the same The J Effect label (Nº 05, "Aqua Lock") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `hyaluronic-acid-serum-lifestyle`

```
Aspirational lifestyle scene: the product on a white marble ledge beside a clear glass carafe of water and a eucalyptus stem. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same clear glass 1 oz dropper bottle with a white rubber bulb and white collar, filled with clear serum, same cap, same proportions, and the same The J Effect label (Nº 05, "Aqua Lock") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n06"></a>

## Nº 06 · Golden Hour

**Triple Vitamin C Brightening Serum** · 1 fl oz / 30 ml · slug `vitamin-c-brightening-serum`
Reference: the labeled amber glass 1 oz dropper bottle with a black rubber bulb and black collar.

### 01 · Studio hero → `vitamin-c-brightening-serum-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 06, "Golden Hour") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `vitamin-c-brightening-serum-texture`

```
Macro texture shot: a glowing amber-gold drop suspended at the tip of the glass pipette, sunlight passing through it in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 06, "Golden Hour") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `vitamin-c-brightening-serum-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: halved blood oranges, sliced lemon wheels, calendula petals and a scattering of rice grains. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 06, "Golden Hour") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `vitamin-c-brightening-serum-ritual`

```
In-use ritual moment: a hand holding the dropper above an open palm catching a golden drop, sunlight across the skin. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 06, "Golden Hour") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `vitamin-c-brightening-serum-lifestyle`

```
Aspirational lifestyle scene: the product on a sunlit windowsill in warm late-afternoon light with long shadows, beside a small ceramic bowl of citrus. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 06, "Golden Hour") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n07"></a>

## Nº 07 · First Light

**Niacinamide, Vitamin C & E Glow Serum** · 1 fl oz / 30 ml · slug `vitamin-glow-serum`
Reference: the labeled opaque white 1 oz dropper bottle with a white rubber bulb and white collar.

### 01 · Studio hero → `vitamin-glow-serum-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same opaque white 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 07, "First Light") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `vitamin-glow-serum-texture`

```
Macro texture shot: a soft, milky ivory serum drop blooming on a glass surface, with a subtle pearly sheen in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same opaque white 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 07, "First Light") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `vitamin-glow-serum-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: halved yuzu, soft yellow mimosa flowers and a few sunflower seeds on warm cream linen. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same opaque white 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 07, "First Light") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `vitamin-glow-serum-ritual`

```
In-use ritual moment: fingertips gently patting milky serum across the cheekbone in first morning light. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same opaque white 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 07, "First Light") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `vitamin-glow-serum-lifestyle`

```
Aspirational lifestyle scene: the product on a pale oak bedside tray at sunrise beside a ceramic coffee cup and folded white linen. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same opaque white 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 07, "First Light") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n08"></a>

## Nº 08 · Clear Canvas

**10% Niacinamide Serum** · 1 fl oz / 30 ml · slug `niacinamide-10-serum`
Reference: the labeled slim opaque white cylindrical airless pump bottle with a white cap.

### 01 · Studio hero → `niacinamide-10-serum-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same slim opaque white cylindrical airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 08, "Clear Canvas") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `niacinamide-10-serum-texture`

```
Macro texture shot: a smooth, clear gel-serum swatch drawn across frosted glass in one clean stroke in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same slim opaque white cylindrical airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 08, "Clear Canvas") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `niacinamide-10-serum-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: fresh chamomile flowers, green bamboo leaves and a few smooth white pebbles on pale stone. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same slim opaque white cylindrical airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 08, "Clear Canvas") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `niacinamide-10-serum-ritual`

```
In-use ritual moment: a fingertip tapping clear serum onto the side of the nose and cheek, pores looking refined. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same slim opaque white cylindrical airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 08, "Clear Canvas") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `niacinamide-10-serum-lifestyle`

```
Aspirational lifestyle scene: the product on a minimalist white shelf beside a small matte ceramic vase with a single green bamboo stem. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same slim opaque white cylindrical airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 08, "Clear Canvas") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n09"></a>

## Nº 09 · Glasslight

**PDRN & Peptide Brightening Serum** · 1 fl oz / 30 ml · slug `pdrn-brightening-serum`
Reference: the labeled opaque white 1 oz serum bottle with a white press-pump dropper top.

### 01 · Studio hero → `pdrn-brightening-serum-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same opaque white 1 oz serum bottle with a white press-pump dropper top, same cap, same proportions, and the same The J Effect label (Nº 09, "Glasslight") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `pdrn-brightening-serum-texture`

```
Macro texture shot: a clear, glossy serum drop resting on a mirror-polished surface, reflecting light like liquid glass in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same opaque white 1 oz serum bottle with a white press-pump dropper top, same cap, same proportions, and the same The J Effect label (Nº 09, "Glasslight") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `pdrn-brightening-serum-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: clear glass spheres, a single white camellia flower and a pale pink peony petal on white acrylic. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same opaque white 1 oz serum bottle with a white press-pump dropper top, same cap, same proportions, and the same The J Effect label (Nº 09, "Glasslight") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `pdrn-brightening-serum-ritual`

```
In-use ritual moment: a close-up of a glowing, glass-smooth cheek with a hand gently pressing serum in, soft highlight on the skin. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same opaque white 1 oz serum bottle with a white press-pump dropper top, same cap, same proportions, and the same The J Effect label (Nº 09, "Glasslight") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `pdrn-brightening-serum-lifestyle`

```
Aspirational lifestyle scene: the product on a mirrored vanity tray in a bright, modern Seoul-style bathroom with soft white light. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same opaque white 1 oz serum bottle with a white press-pump dropper top, same cap, same proportions, and the same The J Effect label (Nº 09, "Glasslight") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n10"></a>

## Nº 10 · Dew Repair

**Snail Mucin Repair Serum** · 1 fl oz / 30 ml · slug `snail-mucin-face-serum`
Reference: the labeled opaque white 1 oz dropper bottle with a white rubber bulb and white collar.

### 01 · Studio hero → `snail-mucin-face-serum-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same opaque white 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 10, "Dew Repair") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `snail-mucin-face-serum-texture`

```
Macro texture shot: a glossy, stretchy string of clear serum pulled between two fingertips, catching the light in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same opaque white 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 10, "Dew Repair") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `snail-mucin-face-serum-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: fresh centella asiatica leaves, a smooth river pebble with morning dew and pale green moss. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same opaque white 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 10, "Dew Repair") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `snail-mucin-face-serum-ritual`

```
In-use ritual moment: a hand pressing dewy serum into the cheek, skin looking bouncy and hydrated. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same opaque white 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 10, "Dew Repair") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `snail-mucin-face-serum-lifestyle`

```
Aspirational lifestyle scene: the product on a wet stone shelf in a softly lit spa bathroom with green plants and gentle steam. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same opaque white 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 10, "Dew Repair") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n11"></a>

## Nº 11 · Green Shield

**Green Tea Antioxidant Serum** · 1 fl oz / 30 ml · slug `green-tea-antioxidant-serum`
Reference: the labeled slim opaque white cylindrical airless pump bottle with a white cap.

### 01 · Studio hero → `green-tea-antioxidant-serum-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same slim opaque white cylindrical airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 11, "Green Shield") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `green-tea-antioxidant-serum-texture`

```
Macro texture shot: a clear, pale-green-tinted gel serum swirl beside a ceramic cup of steaming matcha-green tea in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same slim opaque white cylindrical airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 11, "Green Shield") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `green-tea-antioxidant-serum-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: fresh green tea leaves, a bamboo whisk, loose-leaf sencha and tamanu nuts on a dark wooden board. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same slim opaque white cylindrical airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 11, "Green Shield") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `green-tea-antioxidant-serum-ritual`

```
In-use ritual moment: fingertips smoothing serum across the forehead, fresh green tea leaves softly blurred in front. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same slim opaque white cylindrical airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 11, "Green Shield") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `green-tea-antioxidant-serum-lifestyle`

```
Aspirational lifestyle scene: the product on a Japanese-inspired wooden tray beside a cast-iron teapot, soft natural window light and a green plant. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same slim opaque white cylindrical airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 11, "Green Shield") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n12"></a>

## Nº 12 · Even Tone

**Dark Spot Serum with Kojic & Azelaic Acid** · 1 fl oz / 30 ml · slug `dark-spot-serum`
Reference: the labeled clear glass 1 oz dropper bottle with a white rubber bulb, filled with a soft peach-cream serum.

### 01 · Studio hero → `dark-spot-serum-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same clear glass 1 oz dropper bottle with a white rubber bulb, filled with a soft peach-cream serum, same cap, same proportions, and the same The J Effect label (Nº 12, "Even Tone") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `dark-spot-serum-texture`

```
Macro texture shot: a creamy peach-toned serum drop beside a thin, even swatch on clear glass in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same clear glass 1 oz dropper bottle with a white rubber bulb, filled with a soft peach-cream serum, same cap, same proportions, and the same The J Effect label (Nº 12, "Even Tone") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `dark-spot-serum-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: halved pomegranate with glossy seeds, dried shiitake mushrooms and sprigs of sea fennel on warm stone. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same clear glass 1 oz dropper bottle with a white rubber bulb, filled with a soft peach-cream serum, same cap, same proportions, and the same The J Effect label (Nº 12, "Even Tone") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `dark-spot-serum-ritual`

```
In-use ritual moment: a fingertip dabbing serum onto a sun mark on the upper cheek, even and luminous skin. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same clear glass 1 oz dropper bottle with a white rubber bulb, filled with a soft peach-cream serum, same cap, same proportions, and the same The J Effect label (Nº 12, "Even Tone") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `dark-spot-serum-lifestyle`

```
Aspirational lifestyle scene: the product on a warm travertine vanity with a small gold dish, a pomegranate and soft afternoon light. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same clear glass 1 oz dropper bottle with a white rubber bulb, filled with a soft peach-cream serum, same cap, same proportions, and the same The J Effect label (Nº 12, "Even Tone") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n13"></a>

## Nº 13 · Calm Tone

**Kojic-Free Dark Spot Serum for Sensitive Skin** · 1 fl oz / 30 ml · slug `dark-spot-serum-sensitive-skin`
Reference: the labeled clear glass 1 oz dropper bottle with a white rubber bulb, filled with a light tan serum.

### 01 · Studio hero → `dark-spot-serum-sensitive-skin-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same clear glass 1 oz dropper bottle with a white rubber bulb, filled with a light tan serum, same cap, same proportions, and the same The J Effect label (Nº 13, "Calm Tone") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `dark-spot-serum-sensitive-skin-texture`

```
Macro texture shot: a soft, light-tan serum drop on frosted glass with a delicate smear in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same clear glass 1 oz dropper bottle with a white rubber bulb, filled with a light tan serum, same cap, same proportions, and the same The J Effect label (Nº 13, "Calm Tone") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `dark-spot-serum-sensitive-skin-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: calendula flowers, chamomile blossoms, a halved jackfruit and a small bowl of white rice on soft linen. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same clear glass 1 oz dropper bottle with a white rubber bulb, filled with a light tan serum, same cap, same proportions, and the same The J Effect label (Nº 13, "Calm Tone") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `dark-spot-serum-sensitive-skin-ritual`

```
In-use ritual moment: a gentle hand smoothing serum over a calm, even cheek with visible natural skin texture. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same clear glass 1 oz dropper bottle with a white rubber bulb, filled with a light tan serum, same cap, same proportions, and the same The J Effect label (Nº 13, "Calm Tone") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `dark-spot-serum-sensitive-skin-lifestyle`

```
Aspirational lifestyle scene: the product on a soft linen-covered vanity with dried chamomile in a small vase and diffused morning light. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same clear glass 1 oz dropper bottle with a white rubber bulb, filled with a light tan serum, same cap, same proportions, and the same The J Effect label (Nº 13, "Calm Tone") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n14"></a>

## Nº 14 · Midnight Renewal

**Retinol & Peptide Face Serum** · 1 fl oz / 30 ml · slug `retinol-peptide-face-serum`
Reference: the labeled opaque white 1 oz dropper bottle with a white rubber bulb and white collar.

### 01 · Studio hero → `retinol-peptide-face-serum-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same opaque white 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 14, "Midnight Renewal") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `retinol-peptide-face-serum-texture`

```
Macro texture shot: a single silky, pale-ivory serum drop falling from the pipette against a deep midnight-blue backdrop in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same opaque white 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 14, "Midnight Renewal") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `retinol-peptide-face-serum-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: dried lavender sprigs, a white moonflower and chamomile blossoms on dark slate. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same opaque white 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 14, "Midnight Renewal") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `retinol-peptide-face-serum-ritual`

```
In-use ritual moment: a hand applying serum to the jawline in low, warm lamp light before bed. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same opaque white 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 14, "Midnight Renewal") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `retinol-peptide-face-serum-lifestyle`

```
Aspirational lifestyle scene: the product on a dark walnut nightstand beside a lit candle, a silk eye mask and an open book, moonlit evening mood. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same opaque white 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 14, "Midnight Renewal") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n15"></a>

## Nº 15 · Clear Calm

**Aloe & Tea Tree Clarifying Gel** · 2.2 fl oz / 62 g · slug `aloe-tea-tree-clarifying-gel`
Reference: the labeled clear PET squeeze bottle with a black flip-top cap, filled with clear gel.

### 01 · Studio hero → `aloe-tea-tree-clarifying-gel-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same clear PET squeeze bottle with a black flip-top cap, filled with clear gel, same cap, same proportions, and the same The J Effect label (Nº 15, "Clear Calm") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `aloe-tea-tree-clarifying-gel-texture`

```
Macro texture shot: a clear, cooling aloe gel dollop with tiny suspended bubbles on a chilled glass surface in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same clear PET squeeze bottle with a black flip-top cap, filled with clear gel, same cap, same proportions, and the same The J Effect label (Nº 15, "Clear Calm") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `aloe-tea-tree-clarifying-gel-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: a freshly split aloe vera leaf, sliced cucumber, tea tree sprigs and willow bark curls. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same clear PET squeeze bottle with a black flip-top cap, filled with clear gel, same cap, same proportions, and the same The J Effect label (Nº 15, "Clear Calm") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `aloe-tea-tree-clarifying-gel-ritual`

```
In-use ritual moment: a fingertip dabbing clear gel onto the chin, fresh, calm-looking skin. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same clear PET squeeze bottle with a black flip-top cap, filled with clear gel, same cap, same proportions, and the same The J Effect label (Nº 15, "Clear Calm") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `aloe-tea-tree-clarifying-gel-lifestyle`

```
Aspirational lifestyle scene: the product on a bright white bathroom counter with a potted aloe plant and a cool glass of cucumber water. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same clear PET squeeze bottle with a black flip-top cap, filled with clear gel, same cap, same proportions, and the same The J Effect label (Nº 15, "Clear Calm") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n16"></a>

## Nº 16 · Wide Awake

**Peptide Eye Gel-Cream** · 1 fl oz / 30 ml · slug `peptide-eye-gel-cream`
Reference: the labeled slim opaque white airless pump bottle with a white cap.

### 01 · Studio hero → `peptide-eye-gel-cream-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same slim opaque white airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 16, "Wide Awake") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `peptide-eye-gel-cream-texture`

```
Macro texture shot: a small, glossy dollop of translucent-white eye gel-cream on a chilled metal spoon in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same slim opaque white airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 16, "Wide Awake") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `peptide-eye-gel-cream-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: green bamboo leaves, a small cluster of dark grapes and ice cubes on pale stone. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same slim opaque white airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 16, "Wide Awake") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `peptide-eye-gel-cream-ritual`

```
In-use ritual moment: a ring finger gently patting gel-cream under the eye along the orbital bone, soft natural skin texture. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same slim opaque white airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 16, "Wide Awake") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `peptide-eye-gel-cream-lifestyle`

```
Aspirational lifestyle scene: the product on a clean white shelf inside an open mini skincare fridge with soft cool light. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same slim opaque white airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 16, "Wide Awake") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n17"></a>

## Nº 17 · Jojoba Glow

**Jojoba & Squalane Face Oil** · 1 fl oz / 30 ml · slug `nourishing-jojoba-face-oil`
Reference: the labeled amber glass 1 oz dropper bottle with a black rubber bulb and black collar.

### 01 · Studio hero → `nourishing-jojoba-face-oil-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 17, "Jojoba Glow") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `nourishing-jojoba-face-oil-texture`

```
Macro texture shot: a pool of clear golden oil on a ceramic dish with a single drop falling in, rich warm highlights in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 17, "Jojoba Glow") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `nourishing-jojoba-face-oil-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: jojoba seeds, a magnolia bloom, a prickly pear paddle and frankincense resin tears on raw linen. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 17, "Jojoba Glow") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `nourishing-jojoba-face-oil-ritual`

```
In-use ritual moment: fingertips pressing a glossy drop of golden oil onto a cheekbone, soft warm glow on the skin. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 17, "Jojoba Glow") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `nourishing-jojoba-face-oil-lifestyle`

```
Aspirational lifestyle scene: the product on a raw linen cloth over a wooden vanity in warm golden-hour light, with a ceramic dish of jojoba seeds. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 17, "Jojoba Glow") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n18"></a>

## Nº 18 · Ritual Glide

**Gua Sha Facial Oil** · 1 fl oz / 30 ml · slug `gua-sha-face-oil`
Reference: the labeled amber glass 1 oz dropper bottle with a black rubber bulb and black collar.

### 01 · Studio hero → `gua-sha-face-oil-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 18, "Ritual Glide") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `gua-sha-face-oil-texture`

```
Macro texture shot: a glistening trail of golden oil on the smooth edge of a rose quartz gua sha stone in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 18, "Ritual Glide") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `gua-sha-face-oil-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: a rose quartz gua sha, dried rosehips, a pomegranate half, camellia flowers and ginseng root on cream linen. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 18, "Ritual Glide") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `gua-sha-face-oil-ritual`

```
In-use ritual moment: a hand gliding a rose quartz gua sha along the jawline over glistening, oiled skin. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 18, "Ritual Glide") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `gua-sha-face-oil-lifestyle`

```
Aspirational lifestyle scene: the product on a cream travertine vanity beside a rose quartz gua sha, a small candle and a folded muslin cloth. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 18, "Ritual Glide") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n19"></a>

## Nº 19 · Watermelon Dew

**Watermelon Hydration Moisturizer** · 1.7 fl oz / 50 ml · slug `watermelon-hydration-moisturizer`
Reference: the labeled slim opaque white airless tube-bottle with a white cap.

### 01 · Studio hero → `watermelon-hydration-moisturizer-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same slim opaque white airless tube-bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 19, "Watermelon Dew") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `watermelon-hydration-moisturizer-texture`

```
Macro texture shot: a fresh swirl of soft white cream with a subtle pink-tinted sheen, beside a glistening watermelon cube in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same slim opaque white airless tube-bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 19, "Watermelon Dew") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `watermelon-hydration-moisturizer-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: fresh watermelon slices and cubes, a sliced green apple, mandarin segments and mint leaves on white marble. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same slim opaque white airless tube-bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 19, "Watermelon Dew") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `watermelon-hydration-moisturizer-ritual`

```
In-use ritual moment: a finger swiping through a bouncy dollop of cream, fresh watermelon softly blurred behind. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same slim opaque white airless tube-bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 19, "Watermelon Dew") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `watermelon-hydration-moisturizer-lifestyle`

```
Aspirational lifestyle scene: the product on a bright white marble counter with a bowl of watermelon slices and summery sunlight through a window. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same slim opaque white airless tube-bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 19, "Watermelon Dew") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n20"></a>

## Nº 20 · Aqua Veil

**Oil-Balancing Hydro Gel-Cream** · 1.7 fl oz / 50 ml · slug `hydro-balancing-gel-cream`
Reference: the labeled slim opaque white cylindrical airless pump bottle with a white cap.

### 01 · Studio hero → `hydro-balancing-gel-cream-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same slim opaque white cylindrical airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 20, "Aqua Veil") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `hydro-balancing-gel-cream-texture`

```
Macro texture shot: a translucent, wobbly blue-tinted water-gel dollop with a splash of water droplets around it in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same slim opaque white cylindrical airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 20, "Aqua Veil") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `hydro-balancing-gel-cream-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: clear water splashes, pale blue sea glass, a sprig of green tea and a halved mandarin. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same slim opaque white cylindrical airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 20, "Aqua Veil") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `hydro-balancing-gel-cream-ritual`

```
In-use ritual moment: a hand smoothing a cool water-gel across the forehead, skin fresh and balanced with a soft sheen. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same slim opaque white cylindrical airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 20, "Aqua Veil") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `hydro-balancing-gel-cream-lifestyle`

```
Aspirational lifestyle scene: the product on a pale blue-grey tiled bathroom shelf with fresh water droplets and bright coastal morning light. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same slim opaque white cylindrical airless pump bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 20, "Aqua Veil") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n21"></a>

## Nº 21 · Daily Calm

**Hyaluronic Acid Hydration Cream** · 2 oz / 56 g · slug `hyaluronic-hydration-cream`
Reference: the labeled opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth white cream.

### 01 · Studio hero → `hyaluronic-hydration-cream-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth white cream, same cap, same proportions, and the same The J Effect label (Nº 21, "Daily Calm") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `hyaluronic-hydration-cream-texture`

```
Macro texture shot: a smooth, satiny swirl of white cream with a soft peak, beside a thin cucumber slice in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth white cream, same cap, same proportions, and the same The J Effect label (Nº 21, "Daily Calm") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `hyaluronic-hydration-cream-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: halved avocado, fresh cucumber slices and a small glass of water with droplets on white linen. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth white cream, same cap, same proportions, and the same The J Effect label (Nº 21, "Daily Calm") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `hyaluronic-hydration-cream-ritual`

```
In-use ritual moment: fingers scooping cream from the open jar, a soft peak of cream on the fingertip. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth white cream, same cap, same proportions, and the same The J Effect label (Nº 21, "Daily Calm") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `hyaluronic-hydration-cream-lifestyle`

```
Aspirational lifestyle scene: the product on a calm bathroom shelf beside a small succulent and a white ceramic tray in soft morning light. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth white cream, same cap, same proportions, and the same The J Effect label (Nº 21, "Daily Calm") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n22"></a>

## Nº 22 · Copper Bloom

**Copper Peptide Moisturizer** · 1.7 fl oz / 50 ml · slug `copper-peptide-moisturizer`
Reference: the labeled slim opaque white airless tube-bottle with a white cap.

### 01 · Studio hero → `copper-peptide-moisturizer-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same slim opaque white airless tube-bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 22, "Copper Bloom") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `copper-peptide-moisturizer-texture`

```
Macro texture shot: a silky white cream swirl with a warm copper-toned reflection from a polished copper dish in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same slim opaque white airless tube-bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 22, "Copper Bloom") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `copper-peptide-moisturizer-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: fresh cranberries, moringa leaves and pods, neem leaves and a small hammered copper dish. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same slim opaque white airless tube-bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 22, "Copper Bloom") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `copper-peptide-moisturizer-ritual`

```
In-use ritual moment: a hand smoothing cream along the cheekbone, warm copper-toned light on healthy skin. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same slim opaque white airless tube-bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 22, "Copper Bloom") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `copper-peptide-moisturizer-lifestyle`

```
Aspirational lifestyle scene: the product on a warm terracotta-and-cream vanity with a hammered copper tray and dried botanicals. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same slim opaque white airless tube-bottle with a white cap, same cap, same proportions, and the same The J Effect label (Nº 22, "Copper Bloom") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n23"></a>

## Nº 23 · Timeless Renewal

**Retinol & Ceramide Anti-Aging Moisturizer** · 1.7 fl oz / 50 ml · slug `anti-aging-moisturizer`
Reference: the labeled opaque white airless pump bottle with a clear cap.

### 01 · Studio hero → `anti-aging-moisturizer-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same opaque white airless pump bottle with a clear cap, same cap, same proportions, and the same The J Effect label (Nº 23, "Timeless Renewal") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `anti-aging-moisturizer-texture`

```
Macro texture shot: a rich, velvety ivory cream dollop with a soft glossy peak, textured and luxurious in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same opaque white airless pump bottle with a clear cap, same cap, same proportions, and the same The J Effect label (Nº 23, "Timeless Renewal") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `anti-aging-moisturizer-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: raw shea nuts, white meadowfoam blossoms and a sprig of rosemary on a wooden vanity tray. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same opaque white airless pump bottle with a clear cap, same cap, same proportions, and the same The J Effect label (Nº 23, "Timeless Renewal") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `anti-aging-moisturizer-ritual`

```
In-use ritual moment: fingertips smoothing rich cream up the neck and jawline of mature skin with natural texture. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same opaque white airless pump bottle with a clear cap, same cap, same proportions, and the same The J Effect label (Nº 23, "Timeless Renewal") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `anti-aging-moisturizer-lifestyle`

```
Aspirational lifestyle scene: the product on a wooden vanity tray beside a small jade roller and a sprig of rosemary, warm natural side light. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same opaque white airless pump bottle with a clear cap, same cap, same proportions, and the same The J Effect label (Nº 23, "Timeless Renewal") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n24"></a>

## Nº 24 · Contour

**DMAE & CoQ10 Firming Cream** · 2 oz / 56 g · slug `dmae-firming-cream`
Reference: the labeled opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth cream.

### 01 · Studio hero → `dmae-firming-cream-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth cream, same cap, same proportions, and the same The J Effect label (Nº 24, "Contour") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `dmae-firming-cream-texture`

```
Macro texture shot: a sculpted, glossy swirl of ivory cream with a clean, defined edge in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth cream, same cap, same proportions, and the same The J Effect label (Nº 24, "Contour") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `dmae-firming-cream-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: halved avocado, whole almonds, fresh rosemary and aloe on a cream stone plinth. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth cream, same cap, same proportions, and the same The J Effect label (Nº 24, "Contour") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `dmae-firming-cream-ritual`

```
In-use ritual moment: fingers sweeping cream upward along the neck and jawline in a lifting motion. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth cream, same cap, same proportions, and the same The J Effect label (Nº 24, "Contour") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `dmae-firming-cream-lifestyle`

```
Aspirational lifestyle scene: the product on sculptural cream stone plinths of different heights, soft gallery-style side light. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth cream, same cap, same proportions, and the same The J Effect label (Nº 24, "Contour") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n25"></a>

## Nº 25 · Moonlit

**Melatonin & Collagen Night Cream** · 2 oz / 56 g · slug `collagen-night-cream`
Reference: the labeled opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth white cream.

### 01 · Studio hero → `collagen-night-cream-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth white cream, same cap, same proportions, and the same The J Effect label (Nº 25, "Moonlit") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `collagen-night-cream-texture`

```
Macro texture shot: a soft, smooth white cream swirl glowing in cool blue moonlight in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth white cream, same cap, same proportions, and the same The J Effect label (Nº 25, "Moonlit") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `collagen-night-cream-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: dried lavender bundles, a halved avocado and a sprig of rosemary on a dark linen cloth. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth white cream, same cap, same proportions, and the same The J Effect label (Nº 25, "Moonlit") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `collagen-night-cream-ritual`

```
In-use ritual moment: a hand smoothing cream on the cheek in dim, cool moonlight with warm lamp glow behind. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth white cream, same cap, same proportions, and the same The J Effect label (Nº 25, "Moonlit") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `collagen-night-cream-lifestyle`

```
Aspirational lifestyle scene: the product on a bedside table beside a silk pillow, a lavender bundle and a dimmed lamp, moonlit night mood. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show smooth white cream, same cap, same proportions, and the same The J Effect label (Nº 25, "Moonlit") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n26"></a>

## Nº 26 · Deep Earth

**Pure Dead Sea Mud Mask** · 7 oz / 198 g · slug `dead-sea-mud-mask`
Reference: the labeled clear PET jar with a black screw lid, filled with dark olive-grey mud.

### 01 · Studio hero → `dead-sea-mud-mask-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same clear PET jar with a black screw lid, filled with dark olive-grey mud, same cap, same proportions, and the same The J Effect label (Nº 26, "Deep Earth") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `dead-sea-mud-mask-texture`

```
Macro texture shot: a thick, glossy spread of dark olive-grey mud swept across stone with a wooden spatula in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same clear PET jar with a black screw lid, filled with dark olive-grey mud, same cap, same proportions, and the same The J Effect label (Nº 26, "Deep Earth") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `dead-sea-mud-mask-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: chunks of Dead Sea salt crystals, rough mineral stones and a wooden spatula on pale limestone. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same clear PET jar with a black screw lid, filled with dark olive-grey mud, same cap, same proportions, and the same The J Effect label (Nº 26, "Deep Earth") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `dead-sea-mud-mask-ritual`

```
In-use ritual moment: a woman's relaxed face with a smooth layer of dark mud mask, eyes closed, a warm towel around her hair. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same clear PET jar with a black screw lid, filled with dark olive-grey mud, same cap, same proportions, and the same The J Effect label (Nº 26, "Deep Earth") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `dead-sea-mud-mask-lifestyle`

```
Aspirational lifestyle scene: the product on a limestone ledge in a desert-toned spa bathroom with a stone bowl of salt crystals and warm sunlight. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same clear PET jar with a black screw lid, filled with dark olive-grey mud, same cap, same proportions, and the same The J Effect label (Nº 26, "Deep Earth") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n27"></a>

## Nº 27 · Morning Brew

**Peppermint Coffee Body Scrub** · 4 oz / 113 g · slug `coffee-body-scrub`
Reference: the labeled dark smoky PET jar with a black screw lid, filled with dark coffee scrub.

### 01 · Studio hero → `coffee-body-scrub-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same dark smoky PET jar with a black screw lid, filled with dark coffee scrub, same cap, same proportions, and the same The J Effect label (Nº 27, "Morning Brew") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `coffee-body-scrub-texture`

```
Macro texture shot: a handful of dark, glistening coffee-and-sugar scrub with visible grains and a sheen of oil in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same dark smoky PET jar with a black screw lid, filled with dark coffee scrub, same cap, same proportions, and the same The J Effect label (Nº 27, "Morning Brew") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `coffee-body-scrub-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: whole roasted coffee beans, raw brown sugar cubes, coarse sea salt and fresh peppermint leaves on dark wood. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same dark smoky PET jar with a black screw lid, filled with dark coffee scrub, same cap, same proportions, and the same The J Effect label (Nº 27, "Morning Brew") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `coffee-body-scrub-ritual`

```
In-use ritual moment: hands massaging dark coffee scrub over a wet shoulder in the shower, water droplets on skin. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same dark smoky PET jar with a black screw lid, filled with dark coffee scrub, same cap, same proportions, and the same The J Effect label (Nº 27, "Morning Brew") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `coffee-body-scrub-lifestyle`

```
Aspirational lifestyle scene: the product on a wet slate shower ledge beside a ceramic espresso cup and a wooden scoop, warm morning light through steam. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same dark smoky PET jar with a black screw lid, filled with dark coffee scrub, same cap, same proportions, and the same The J Effect label (Nº 27, "Morning Brew") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n28"></a>

## Nº 28 · Bare Shea

**Raw Unrefined Organic Shea Butter** · 4 oz / 113 g · slug `raw-shea-butter`
Reference: the labeled clear PET jar with a black screw lid, filled with creamy pale-yellow shea butter.

### 01 · Studio hero → `raw-shea-butter-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same clear PET jar with a black screw lid, filled with creamy pale-yellow shea butter, same cap, same proportions, and the same The J Effect label (Nº 28, "Bare Shea") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `raw-shea-butter-texture`

```
Macro texture shot: a glossy, softly melting curl of ivory-yellow shea butter on a wooden spoon in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same clear PET jar with a black screw lid, filled with creamy pale-yellow shea butter, same cap, same proportions, and the same The J Effect label (Nº 28, "Bare Shea") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `raw-shea-butter-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: whole shea nuts in their shells, a woven basket and warm earthy fabric on sun-baked clay. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same clear PET jar with a black screw lid, filled with creamy pale-yellow shea butter, same cap, same proportions, and the same The J Effect label (Nº 28, "Bare Shea") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `raw-shea-butter-ritual`

```
In-use ritual moment: hands rubbing melted shea butter together, a sheen of nourishment on the skin. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same clear PET jar with a black screw lid, filled with creamy pale-yellow shea butter, same cap, same proportions, and the same The J Effect label (Nº 28, "Bare Shea") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `raw-shea-butter-lifestyle`

```
Aspirational lifestyle scene: the product on a warm clay-toned shelf beside a woven basket and dried pampas grass in golden afternoon light. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same clear PET jar with a black screw lid, filled with creamy pale-yellow shea butter, same cap, same proportions, and the same The J Effect label (Nº 28, "Bare Shea") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n29"></a>

## Nº 29 · Citrus Grove

**Grass-Fed Tallow Cream, Orange & Bergamot** · 2 oz / 56 g · slug `tallow-cream-orange-bergamot`
Reference: the labeled opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream.

### 01 · Studio hero → `tallow-cream-orange-bergamot-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream, same cap, same proportions, and the same The J Effect label (Nº 29, "Citrus Grove") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `tallow-cream-orange-bergamot-texture`

```
Macro texture shot: a velvety, off-white balm with a soft scooped edge and a warm glow in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream, same cap, same proportions, and the same The J Effect label (Nº 29, "Citrus Grove") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `tallow-cream-orange-bergamot-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: halved oranges, bergamot fruit, orange blossoms and citrus leaves on a rustic wooden board. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream, same cap, same proportions, and the same The J Effect label (Nº 29, "Citrus Grove") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `tallow-cream-orange-bergamot-ritual`

```
In-use ritual moment: fingertips warming a small amount of balm before pressing it onto the back of the hand. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream, same cap, same proportions, and the same The J Effect label (Nº 29, "Citrus Grove") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `tallow-cream-orange-bergamot-lifestyle`

```
Aspirational lifestyle scene: the product on a farmhouse wooden table in a sunny kitchen with a bowl of oranges and a linen napkin. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream, same cap, same proportions, and the same The J Effect label (Nº 29, "Citrus Grove") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n30"></a>

## Nº 30 · Lavender Fields

**Grass-Fed Tallow Cream, Lemongrass & Lavender** · 2 oz / 56 g · slug `tallow-cream-lemongrass-lavender`
Reference: the labeled opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream.

### 01 · Studio hero → `tallow-cream-lemongrass-lavender-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream, same cap, same proportions, and the same The J Effect label (Nº 30, "Lavender Fields") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `tallow-cream-lemongrass-lavender-texture`

```
Macro texture shot: a velvety, off-white balm with a smooth, swirled surface in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream, same cap, same proportions, and the same The J Effect label (Nº 30, "Lavender Fields") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `tallow-cream-lemongrass-lavender-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: fresh lavender stems, lemongrass stalks and a small bundle of dried herbs tied with twine. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream, same cap, same proportions, and the same The J Effect label (Nº 30, "Lavender Fields") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `tallow-cream-lemongrass-lavender-ritual`

```
In-use ritual moment: hands massaging balm into dry knuckles and the backs of the hands. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream, same cap, same proportions, and the same The J Effect label (Nº 30, "Lavender Fields") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `tallow-cream-lemongrass-lavender-lifestyle`

```
Aspirational lifestyle scene: the product on a weathered wooden garden table with lavender in a terracotta pot and soft outdoor light. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream, same cap, same proportions, and the same The J Effect label (Nº 30, "Lavender Fields") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n31"></a>

## Nº 31 · Still Night

**Grass-Fed Tallow Cream, Fir & Lavender** · 2 oz / 56 g · slug `tallow-cream-peaceful-night`
Reference: the labeled opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream.

### 01 · Studio hero → `tallow-cream-peaceful-night-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream, same cap, same proportions, and the same The J Effect label (Nº 31, "Still Night") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `tallow-cream-peaceful-night-texture`

```
Macro texture shot: a velvety off-white balm in soft candlelight with a gentle glow in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream, same cap, same proportions, and the same The J Effect label (Nº 31, "Still Night") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `tallow-cream-peaceful-night-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: fresh fir branches, dried lavender, pine cones and a small beeswax candle on dark wood. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream, same cap, same proportions, and the same The J Effect label (Nº 31, "Still Night") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `tallow-cream-peaceful-night-ritual`

```
In-use ritual moment: hands smoothing balm onto the feet at the edge of a bed in warm candlelight. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream, same cap, same proportions, and the same The J Effect label (Nº 31, "Still Night") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `tallow-cream-peaceful-night-lifestyle`

```
Aspirational lifestyle scene: the product on a rustic cabin nightstand with a lit candle, fir branches in a jar and a wool blanket, evening mood. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same opaque white 2 oz cosmetic jar with a white screw lid, lid removed to show off-white tallow cream, same cap, same proportions, and the same The J Effect label (Nº 31, "Still Night") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n32"></a>

## Nº 32 · Cool Down

**Aloe & Menthol Cooling Body Cream** · 4 oz / 113 g · slug `aloe-menthol-cooling-cream`
Reference: the labeled clear PET jar with a black screw lid, filled with bright white cream.

### 01 · Studio hero → `aloe-menthol-cooling-cream-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same clear PET jar with a black screw lid, filled with bright white cream, same cap, same proportions, and the same The J Effect label (Nº 32, "Cool Down") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `aloe-menthol-cooling-cream-texture`

```
Macro texture shot: a thick, whipped white cream swirl with frosty mist and a few ice crystals around it in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same clear PET jar with a black screw lid, filled with bright white cream, same cap, same proportions, and the same The J Effect label (Nº 32, "Cool Down") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `aloe-menthol-cooling-cream-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: a split aloe leaf, fresh mint sprigs, menthol crystals, ice and rosehips on cool grey stone. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same clear PET jar with a black screw lid, filled with bright white cream, same cap, same proportions, and the same The J Effect label (Nº 32, "Cool Down") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `aloe-menthol-cooling-cream-ritual`

```
In-use ritual moment: hands massaging white cream into a toned calf after a workout, subtle cool mist. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same clear PET jar with a black screw lid, filled with bright white cream, same cap, same proportions, and the same The J Effect label (Nº 32, "Cool Down") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `aloe-menthol-cooling-cream-lifestyle`

```
Aspirational lifestyle scene: the product on a wooden bench in a sunlit home gym or spa changing room with a rolled towel and a water bottle. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same clear PET jar with a black screw lid, filled with bright white cream, same cap, same proportions, and the same The J Effect label (Nº 32, "Cool Down") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n33"></a>

## Nº 33 · Turmeric Gold

**Kojic Acid & Turmeric Brightening Bar** · 3.5 oz / 99 g · slug `kojic-turmeric-soap`
Reference: the labeled rectangular bright orange-gold soap bar wrapped with a paper label band.

### 01 · Studio hero → `kojic-turmeric-soap-hero`

```
Studio hero packshot of the product resting flat at a slight three-quarter angle, label band facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same rectangular bright orange-gold soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 33, "Turmeric Gold") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `kojic-turmeric-soap-texture`

```
Macro texture shot: a creamy golden lather piled on the corner of the bar, with the bar's smooth cut edge visible in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same rectangular bright orange-gold soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 33, "Turmeric Gold") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `kojic-turmeric-soap-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: fresh turmeric roots, a small pile of turmeric powder, lemon halves and a mango on terracotta. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same rectangular bright orange-gold soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 33, "Turmeric Gold") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `kojic-turmeric-soap-ritual`

```
In-use ritual moment: hands lathering golden foam, the bar resting on a terracotta dish behind. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same rectangular bright orange-gold soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 33, "Turmeric Gold") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `kojic-turmeric-soap-lifestyle`

```
Aspirational lifestyle scene: the product on a terracotta soap dish in a warm Mediterranean-style bathroom with sunlight and plaster walls. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same rectangular bright orange-gold soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 33, "Turmeric Gold") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n34"></a>

## Nº 34 · Obsidian

**Activated Charcoal & Tea Tree Bar** · 4 oz / 113 g · slug `charcoal-soap`
Reference: the labeled rectangular matte black charcoal soap bar wrapped with a paper label band.

### 01 · Studio hero → `charcoal-soap-hero`

```
Studio hero packshot of the product resting flat at a slight three-quarter angle, label band facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same rectangular matte black charcoal soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 34, "Obsidian") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `charcoal-soap-texture`

```
Macro texture shot: a dense, silky grey-white lather on the bar's matte black surface, crisp cut edges in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same rectangular matte black charcoal soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 34, "Obsidian") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `charcoal-soap-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: raw charcoal chunks, fresh peppermint sprigs and tea tree branches on black slate. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same rectangular matte black charcoal soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 34, "Obsidian") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `charcoal-soap-ritual`

```
In-use ritual moment: wet hands lathering the black bar into a pale grey foam under running water. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same rectangular matte black charcoal soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 34, "Obsidian") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `charcoal-soap-lifestyle`

```
Aspirational lifestyle scene: the product on a black stone soap dish in a dark modern shower with water droplets and a single green plant. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same rectangular matte black charcoal soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 34, "Obsidian") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n35"></a>

## Nº 35 · Milk & Honey

**Oat, Goat Milk & Honey Bar** · 4 oz / 113 g · slug `oat-milk-honey-soap`
Reference: the labeled rectangular warm tan-and-brown soap bar with visible oat flecks, wrapped with a paper label band.

### 01 · Studio hero → `oat-milk-honey-soap-hero`

```
Studio hero packshot of the product resting flat at a slight three-quarter angle, label band facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same rectangular warm tan-and-brown soap bar with visible oat flecks, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 35, "Milk & Honey") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `oat-milk-honey-soap-texture`

```
Macro texture shot: a creamy, milky lather on the bar with a drizzle of golden honey and oat flakes nearby in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same rectangular warm tan-and-brown soap bar with visible oat flecks, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 35, "Milk & Honey") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `oat-milk-honey-soap-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: rolled oats in a wooden bowl, a honey dipper with dripping honey and a small glass bottle of milk. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same rectangular warm tan-and-brown soap bar with visible oat flecks, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 35, "Milk & Honey") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `oat-milk-honey-soap-ritual`

```
In-use ritual moment: hands holding the bar under warm running water, creamy lather between fingers. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same rectangular warm tan-and-brown soap bar with visible oat flecks, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 35, "Milk & Honey") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `oat-milk-honey-soap-lifestyle`

```
Aspirational lifestyle scene: the product on a wooden soap dish in a cozy farmhouse bathroom beside a folded cream towel and a honey jar. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same rectangular warm tan-and-brown soap bar with visible oat flecks, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 35, "Milk & Honey") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n36"></a>

## Nº 36 · Evening Calm

**Lavender Essential Oil Bar** · 4 oz / 113 g · slug `calming-lavender-soap`
Reference: the labeled rectangular cream soap bar speckled with purple lavender buds, wrapped with a paper label band.

### 01 · Studio hero → `calming-lavender-soap-hero`

```
Studio hero packshot of the product resting flat at a slight three-quarter angle, label band facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same rectangular cream soap bar speckled with purple lavender buds, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 36, "Evening Calm") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `calming-lavender-soap-texture`

```
Macro texture shot: a soft, creamy lather with visible lavender buds on the bar's cut edge in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same rectangular cream soap bar speckled with purple lavender buds, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 36, "Evening Calm") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `calming-lavender-soap-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: fresh and dried lavender bundles, loose lavender buds and a small glass essential oil vial. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same rectangular cream soap bar speckled with purple lavender buds, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 36, "Evening Calm") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `calming-lavender-soap-ritual`

```
In-use ritual moment: hands with a soft lather under warm water in dim, cozy bathroom light. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same rectangular cream soap bar speckled with purple lavender buds, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 36, "Evening Calm") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `calming-lavender-soap-lifestyle`

```
Aspirational lifestyle scene: the product on a white ceramic dish beside a lit candle, a dried lavender bundle and a folded cream towel, evening mood. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same rectangular cream soap bar speckled with purple lavender buds, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 36, "Evening Calm") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n37"></a>

## Nº 37 · Forest Slumber

**Fir Needle & Lavender Bar** · 4 oz / 113 g · slug `slumber-soap`
Reference: the labeled rectangular two-layer soap bar, pale yellow top and soft blue-grey bottom, wrapped with a paper label band.

### 01 · Studio hero → `slumber-soap-hero`

```
Studio hero packshot of the product resting flat at a slight three-quarter angle, label band facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same rectangular two-layer soap bar, pale yellow top and soft blue-grey bottom, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 37, "Forest Slumber") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `slumber-soap-texture`

```
Macro texture shot: a creamy lather on the bar, showing the clean two-tone layer on its cut edge in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same rectangular two-layer soap bar, pale yellow top and soft blue-grey bottom, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 37, "Forest Slumber") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `slumber-soap-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: fresh fir branches, pine cones, dried lavender and moss on weathered wood. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same rectangular two-layer soap bar, pale yellow top and soft blue-grey bottom, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 37, "Forest Slumber") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `slumber-soap-ritual`

```
In-use ritual moment: hands lathering in a steamy shower with fir branches hanging from the showerhead. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same rectangular two-layer soap bar, pale yellow top and soft blue-grey bottom, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 37, "Forest Slumber") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `slumber-soap-lifestyle`

```
Aspirational lifestyle scene: the product on a cedar shower shelf with a eucalyptus-and-fir bundle and soft steam in evening light. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same rectangular two-layer soap bar, pale yellow top and soft blue-grey bottom, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 37, "Forest Slumber") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n38"></a>

## Nº 38 · Cooling Aloe

**Aloe & Cucumber Bar** · 4 oz / 113 g · slug `aloe-cool-cucumber-soap`
Reference: the labeled rectangular two-tone soap bar, green top layer and pale yellow body, wrapped with a paper label band.

### 01 · Studio hero → `aloe-cool-cucumber-soap-hero`

```
Studio hero packshot of the product resting flat at a slight three-quarter angle, label band facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same rectangular two-tone soap bar, green top layer and pale yellow body, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 38, "Cooling Aloe") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `aloe-cool-cucumber-soap-texture`

```
Macro texture shot: a fresh, creamy lather on the green-topped bar with a few water droplets in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same rectangular two-tone soap bar, green top layer and pale yellow body, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 38, "Cooling Aloe") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `aloe-cool-cucumber-soap-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: a cross-section of aloe leaf, thin cucumber slices and fresh mint on wet white stone. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same rectangular two-tone soap bar, green top layer and pale yellow body, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 38, "Cooling Aloe") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `aloe-cool-cucumber-soap-ritual`

```
In-use ritual moment: wet hands lathering the bar under a cool stream of water. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same rectangular two-tone soap bar, green top layer and pale yellow body, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 38, "Cooling Aloe") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `aloe-cool-cucumber-soap-lifestyle`

```
Aspirational lifestyle scene: the product on a wet stone surface in a bright shower with water droplets and a eucalyptus branch in soft focus. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same rectangular two-tone soap bar, green top layer and pale yellow body, wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 38, "Cooling Aloe") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n39"></a>

## Nº 39 · Breathe Deep

**Eucalyptus & Peppermint Bar** · 4 oz / 113 g · slug `eucalyptus-peppermint-soap`
Reference: the labeled rectangular pale cream soap bar wrapped with a paper label band.

### 01 · Studio hero → `eucalyptus-peppermint-soap-hero`

```
Studio hero packshot of the product resting flat at a slight three-quarter angle, label band facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same rectangular pale cream soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 39, "Breathe Deep") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `eucalyptus-peppermint-soap-texture`

```
Macro texture shot: a rich, bright white lather on the bar with swirling steam around it in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same rectangular pale cream soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 39, "Breathe Deep") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `eucalyptus-peppermint-soap-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: fresh eucalyptus branches, peppermint leaves, rosemary and a lemon half on wet stone. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same rectangular pale cream soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 39, "Breathe Deep") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `eucalyptus-peppermint-soap-ritual`

```
In-use ritual moment: hands lathering in thick shower steam with a eucalyptus bundle hanging from the showerhead. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same rectangular pale cream soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 39, "Breathe Deep") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `eucalyptus-peppermint-soap-lifestyle`

```
Aspirational lifestyle scene: the product on a stone shower niche filled with soft steam, eucalyptus bundle above, cool morning light. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same rectangular pale cream soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 39, "Breathe Deep") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n40"></a>

## Nº 40 · Coconut Shore

**Coconut & Shea Butter Bar** · 4 oz / 113 g · slug `coconut-shea-soap`
Reference: the labeled rectangular dark chocolate-brown soap bar wrapped with a paper label band.

### 01 · Studio hero → `coconut-shea-soap-hero`

```
Studio hero packshot of the product resting flat at a slight three-quarter angle, label band facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same rectangular dark chocolate-brown soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 40, "Coconut Shore") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `coconut-shea-soap-texture`

```
Macro texture shot: a creamy white lather against the rich brown bar, with coconut shavings in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same rectangular dark chocolate-brown soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 40, "Coconut Shore") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `coconut-shea-soap-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: a cracked coconut with white flesh, coconut shavings, sea shells and a palm frond on pale sand. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same rectangular dark chocolate-brown soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 40, "Coconut Shore") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `coconut-shea-soap-ritual`

```
In-use ritual moment: sun-kissed hands lathering creamy foam in an outdoor shower. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same rectangular dark chocolate-brown soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 40, "Coconut Shore") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `coconut-shea-soap-lifestyle`

```
Aspirational lifestyle scene: the product on a weathered driftwood ledge in an outdoor beach shower with palm shadows and bright sun. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same rectangular dark chocolate-brown soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 40, "Coconut Shore") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n41"></a>

## Nº 41 · Sandalwood Ember

**Sandalwood & Charred Oak Bar** · 4 oz / 113 g · slug `sandalwood-soap`
Reference: the labeled rectangular warm tan sandalwood soap bar wrapped with a paper label band.

### 01 · Studio hero → `sandalwood-soap-hero`

```
Studio hero packshot of the product resting flat at a slight three-quarter angle, label band facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same rectangular warm tan sandalwood soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 41, "Sandalwood Ember") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `sandalwood-soap-texture`

```
Macro texture shot: a creamy lather on the tan bar, with fine wisps of smoke curling behind in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same rectangular warm tan sandalwood soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 41, "Sandalwood Ember") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `sandalwood-soap-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: sandalwood chips, a charred oak log slice, cinnamon sticks and star anise on dark walnut. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same rectangular warm tan sandalwood soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 41, "Sandalwood Ember") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `sandalwood-soap-ritual`

```
In-use ritual moment: hands lathering in warm amber light with a faint wisp of incense smoke behind. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same rectangular warm tan sandalwood soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 41, "Sandalwood Ember") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `sandalwood-soap-lifestyle`

```
Aspirational lifestyle scene: the product on a dark walnut shelf beside an amber glass candle and a charred oak board, moody warm lighting. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same rectangular warm tan sandalwood soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 41, "Sandalwood Ember") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n42"></a>

## Nº 42 · Wild Sage

**Lemongrass & Sage Bar** · 4 oz / 113 g · slug `lemongrass-sage-soap`
Reference: the labeled rectangular pale butter-yellow soap bar wrapped with a paper label band.

### 01 · Studio hero → `lemongrass-sage-soap-hero`

```
Studio hero packshot of the product resting flat at a slight three-quarter angle, label band facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same rectangular pale butter-yellow soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 42, "Wild Sage") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `lemongrass-sage-soap-texture`

```
Macro texture shot: a soft, creamy lather on the pale bar with a sprig of sage resting across it in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same rectangular pale butter-yellow soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 42, "Wild Sage") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `lemongrass-sage-soap-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: fresh lemongrass stalks, a bundle of white sage, lemon leaves and sea salt on light oak. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same rectangular pale butter-yellow soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 42, "Wild Sage") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `lemongrass-sage-soap-ritual`

```
In-use ritual moment: hands lathering in bright natural light, sage leaves blurred in the foreground. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same rectangular pale butter-yellow soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 42, "Wild Sage") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `lemongrass-sage-soap-lifestyle`

```
Aspirational lifestyle scene: the product on a light oak soap dish in a sun-filled bathroom with a potted herb garden on the windowsill. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same rectangular pale butter-yellow soap bar wrapped with a paper label band, same cap, same proportions, and the same The J Effect label (Nº 42, "Wild Sage") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n43"></a>

## Nº 43 · Luffa Polish

**Exfoliating Luffa & Tea Tree Bar** · 4 oz / 113 g · slug `exfoliating-luffa-bar`
Reference: the labeled white paper soap box with a cut-out window revealing a golden bar with embedded natural luffa.

### 01 · Studio hero → `exfoliating-luffa-bar-hero`

```
Studio hero packshot of the product resting flat at a slight three-quarter angle, label band facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same white paper soap box with a cut-out window revealing a golden bar with embedded natural luffa, same cap, same proportions, and the same The J Effect label (Nº 43, "Luffa Polish") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `exfoliating-luffa-bar-texture`

```
Macro texture shot: a close-up of the bar's cut face showing the luffa's natural fibrous web inside creamy soap in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same white paper soap box with a cut-out window revealing a golden bar with embedded natural luffa, same cap, same proportions, and the same The J Effect label (Nº 43, "Luffa Polish") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `exfoliating-luffa-bar-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: a whole dried luffa gourd, pink grapefruit halves, tea tree sprigs and a chunk of cocoa butter. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same white paper soap box with a cut-out window revealing a golden bar with embedded natural luffa, same cap, same proportions, and the same The J Effect label (Nº 43, "Luffa Polish") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `exfoliating-luffa-bar-ritual`

```
In-use ritual moment: a hand scrubbing the bar over a wet heel and ankle, foam and water droplets. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same white paper soap box with a cut-out window revealing a golden bar with embedded natural luffa, same cap, same proportions, and the same The J Effect label (Nº 43, "Luffa Polish") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `exfoliating-luffa-bar-lifestyle`

```
Aspirational lifestyle scene: the product on the edge of a freestanding white bathtub with a linen towel and a grapefruit on a wooden bath tray. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same white paper soap box with a cut-out window revealing a golden bar with embedded natural luffa, same cap, same proportions, and the same The J Effect label (Nº 43, "Luffa Polish") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n44"></a>

## Nº 44 · Full Crown

**Peptide Scalp Serum for Fuller-Looking Hair** · 1 fl oz / 30 ml · slug `peptide-hair-growth-serum`
Reference: the labeled amber glass 1 oz dropper bottle with a white rubber bulb and white collar.

### 01 · Studio hero → `peptide-hair-growth-serum-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 44, "Full Crown") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `peptide-hair-growth-serum-texture`

```
Macro texture shot: a clear serum drop falling from the pipette onto a close-up section of a healthy scalp part in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 44, "Full Crown") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `peptide-hair-growth-serum-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: saw palmetto berries, fresh rosemary sprigs, eucalyptus leaves and wheat stalks on warm stone. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 44, "Full Crown") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `peptide-hair-growth-serum-ritual`

```
In-use ritual moment: fingertips massaging the scalp through a neat hair part, dropper in the other hand. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 44, "Full Crown") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `peptide-hair-growth-serum-lifestyle`

```
Aspirational lifestyle scene: the product on a warm wooden vanity beside a wide-tooth wooden comb and a sprig of rosemary, soft morning light. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Soft, diffused morning window light from the left, fresh neutral-cool white balance, gentle open shadows. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a white rubber bulb and white collar, same cap, same proportions, and the same The J Effect label (Nº 44, "Full Crown") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n45"></a>

## Nº 45 · Rosemary Root

**Rosemary & Ginger Scalp Serum** · 2 fl oz / 59 ml · slug `botanical-hair-growth-serum`
Reference: the labeled clear glass 2 oz dropper bottle with a black rubber bulb, filled with golden-yellow serum.

### 01 · Studio hero → `botanical-hair-growth-serum-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same clear glass 2 oz dropper bottle with a black rubber bulb, filled with golden-yellow serum, same cap, same proportions, and the same The J Effect label (Nº 45, "Rosemary Root") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `botanical-hair-growth-serum-texture`

```
Macro texture shot: a golden-yellow serum drop hanging from the pipette above a sprig of rosemary in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same clear glass 2 oz dropper bottle with a black rubber bulb, filled with golden-yellow serum, same cap, same proportions, and the same The J Effect label (Nº 45, "Rosemary Root") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `botanical-hair-growth-serum-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: fresh rosemary bundles, sliced ginger root, licorice root sticks and a small dish of green spirulina powder. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same clear glass 2 oz dropper bottle with a black rubber bulb, filled with golden-yellow serum, same cap, same proportions, and the same The J Effect label (Nº 45, "Rosemary Root") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `botanical-hair-growth-serum-ritual`

```
In-use ritual moment: a hand applying drops along a scalp part through thick, glossy hair. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Use the reference image as the exact product: the same clear glass 2 oz dropper bottle with a black rubber bulb, filled with golden-yellow serum, same cap, same proportions, and the same The J Effect label (Nº 45, "Rosemary Root") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `botanical-hair-growth-serum-lifestyle`

```
Aspirational lifestyle scene: the product on a sunny bathroom windowsill with a potted rosemary plant and a wooden hairbrush. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Bright, clean natural daylight, soft diffused shadows, neutral white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same clear glass 2 oz dropper bottle with a black rubber bulb, filled with golden-yellow serum, same cap, same proportions, and the same The J Effect label (Nº 45, "Rosemary Root") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n46"></a>

## Nº 46 · Root Ritual

**Castor & Rosemary Scalp Oil** · 1 fl oz / 30 ml · slug `scalp-health-hair-oil`
Reference: the labeled amber glass 1 oz dropper bottle with a black rubber bulb and black collar.

### 01 · Studio hero → `scalp-health-hair-oil-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 46, "Root Ritual") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `scalp-health-hair-oil-texture`

```
Macro texture shot: a thick golden oil drop sliding down the dropper onto a scalp part, glistening in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 46, "Root Ritual") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `scalp-health-hair-oil-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: castor beans, rosemary sprigs, jasmine flowers, argan nuts and a small wooden comb on linen. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 46, "Root Ritual") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `scalp-health-hair-oil-ritual`

```
In-use ritual moment: hands sectioning hair and massaging oil into the scalp, relaxed and slow. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 46, "Root Ritual") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `scalp-health-hair-oil-lifestyle`

```
Aspirational lifestyle scene: the product on a wooden bathroom stool with a wide-tooth comb, a silk scrunchie and a warm towel, soft evening light. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Low, warm lamp and candlelight, deep soft shadows, intimate evening mood. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 46, "Root Ritual") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---

<a id="n47"></a>

## Nº 47 · Silk Strand

**Nourishing Hair Oil with Keratin & Manuka Honey** · 1 fl oz / 30 ml · slug `moisturizing-strengthening-hair-oil`
Reference: the labeled amber glass 1 oz dropper bottle with a black rubber bulb and black collar.

### 01 · Studio hero → `moisturizing-strengthening-hair-oil-hero`

```
Studio hero packshot of the product standing upright and centered, label facing the camera, on a seamless warm cream (#F7F3EC) backdrop with a low travertine plinth. Soft wraparound studio light with a gentle key light from the upper left and a soft contact shadow. The product fills about 60% of the frame height. Minimal, premium e-commerce hero image, no props. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 47, "Silk Strand") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 02 · Texture → `moisturizing-strengthening-hair-oil-texture`

```
Macro texture shot: a glossy golden oil drop on the tip of a strand of shiny, smooth hair in the sharp foreground. The product stands just behind, slightly out of focus but with the label readable. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 47, "Silk Strand") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 03 · Ingredients → `moisturizing-strengthening-hair-oil-ingredients`

```
Editorial still life of the product surrounded by its key ingredients: avocado halves, almonds, a honeycomb piece with manuka honey and carrot seeds on warm linen. Ingredients arranged with intention around the product at a three-quarter angle, the product as the clear hero, label facing camera. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 47, "Silk Strand") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 04 · Ritual (in use) → `moisturizing-strengthening-hair-oil-ritual`

```
In-use ritual moment: hands smoothing oil through the glossy ends of long hair, catching the light. The product is visible and in focus in the frame, held in the other hand or resting nearby with the label facing camera. Real, un-retouched skin with natural texture, natural-looking hands with neat bare nails, no jewelry. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 47, "Silk Strand") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

### 05 · Lifestyle → `moisturizing-strengthening-hair-oil-lifestyle`

```
Aspirational lifestyle scene: the product on a warm cream vanity beside a wooden paddle brush and a silk ribbon in golden-hour light. The product is the clear hero in sharp focus with the label facing camera; the surroundings are softly blurred. Warm golden-hour sunlight from a low side angle, long soft shadows, warm honeyed white balance. Calm, intentional mood that feels like coming home to yourself. Use the reference image as the exact product: the same amber glass 1 oz dropper bottle with a black rubber bulb and black collar, same cap, same proportions, and the same The J Effect label (Nº 47, "Silk Strand") with identical layout, colors and typography, sharp and legible. Do not redesign, re-letter or add text to the packaging. Luxury clean-beauty editorial photography for The J Effect. Brand palette of warm cream, deep forest green and muted antique gold. Medium-format camera, 100mm lens, shallow depth of field, photorealistic, rich natural textures, calm and intentional composition with generous negative space.
```

---
