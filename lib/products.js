// ──────────────────────────────────────────────────────────────
// THE J EFFECT — Static Product Catalog
//
// stripe_price_id: Create a Price in your Stripe dashboard for
// each product and paste the Price ID here (e.g. price_xxx).
//
// imagePlaceholder: true means this product does not yet have
// real product photography. The site blurs these images and
// shows a "Coming Soon — Updating Inventory" badge until real
// photos are supplied (see PHOTO_SHOT_LIST.md). Flip to false
// once real images are swapped in.
// ──────────────────────────────────────────────────────────────

export const PRODUCTS = [
  // ══════════════════════ FACIAL — SERUMS ══════════════════════
  {
    id: 'prod_hyaluronic-acid-serum',
    slug: 'hyaluronic-acid-serum',
    title: 'Hyaluronic Acid Serum',
    type: 'Serum',
    tags: ['serum', 'hydration', 'anti-aging'],
    price: 3600,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&q=80',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80',
    ],
    description: 'A deep-penetrating hydration serum built on four molecular weights of hyaluronic acid, designed to plump the skin and visibly reduce fine lines. Locks in moisture for a dewy bounce all day long.',
    how_to_use: 'Apply 3–4 drops to slightly damp skin after cleansing. Gently press into the face and neck. Follow with moisturizer to seal in hydration.',
    ingredients: 'Water, Sodium Hyaluronate (multi-weight Hyaluronic Acid), Glycerin, Phenoxyethanol, Ethylhexylglycerin.',
    benefits: [
      'Provides intense, multi-layer hydration',
      'Visibly plumps fine lines and wrinkles',
      'Leaves a dewy, non-sticky finish',
    ],
    key_ingredients: [
      { name: '4× Hyaluronic Acid', description: 'Four molecular weights work at every skin layer, drawing in and holding moisture.' },
      { name: 'Glycerin', description: 'A powerful humectant that strengthens the skin barrier and locks in hydration.' },
    ],
    texture: 'Lightweight, fast-absorbing water gel.',
    quote: '"The absolute foundation of a luminous, bouncy complexion. Hydration changes everything."',
    variants: [
      { id: 'var_has-30ml', label: '30ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3600 },
    ],
  },
  {
    id: 'prod_pdrn-brightening-serum',
    slug: 'pdrn-brightening-serum',
    title: 'PDRN Brightening Serum',
    type: 'Serum',
    tags: ['serum', 'brightening', 'k-beauty'],
    price: 4600,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=700&q=80',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80',
    ],
    description: 'Inspired by advanced Korean skincare, this lightweight serum pairs PDRN (Polydeoxyribonucleotide) with peptides to accelerate skin renewal and reveal a radiant, glass-like complexion.',
    how_to_use: 'Apply to cleansed and toned skin. Massage gently until fully absorbed. Suitable for daily use, morning and evening.',
    ingredients: 'Water, Sodium DNA (PDRN), Niacinamide, Acetyl Hexapeptide-8, Glycerin, Caprylyl Glycol.',
    benefits: [
      'Promotes rapid skin recovery and regeneration',
      'Fades dark spots for a glass-skin finish',
      'Soothes micro-damage from environmental stress',
    ],
    key_ingredients: [
      { name: 'PDRN (Sodium DNA)', description: 'A regenerative ingredient that helps heal and thicken the skin barrier.' },
      { name: 'Peptide Complex', description: 'Supports firmness and radiance from within the skin.' },
    ],
    texture: 'Ultra-light, refreshing serum.',
    quote: '"The secret to a flawless, glass-like finish. True radiance starts from within the barrier."',
    variants: [
      { id: 'var_pbs-30ml', label: '30ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 4600 },
    ],
  },
  {
    id: 'prod_niacinamide-10-serum',
    slug: 'niacinamide-10-serum',
    title: '10% Niacinamide Serum',
    type: 'Serum',
    tags: ['serum', 'pore-minimizing', 'oil-control'],
    price: 3200,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=700&q=80',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80',
    ],
    description: 'A concentrated 10% Vitamin B3 serum that refines the look of enlarged pores, balances oil production, and evens out overall skin tone with consistent use.',
    how_to_use: 'Apply 2–3 drops to clean skin morning and night, before moisturizer.',
    ingredients: 'Water, Niacinamide (10%), Zinc PCA, Glycerin, Panthenol.',
    benefits: [
      'Visibly minimizes the look of pores',
      'Balances excess oil production',
      'Improves the look of uneven skin tone',
    ],
    key_ingredients: [
      { name: 'Niacinamide (10%)', description: 'A well-studied form of Vitamin B3 that supports barrier function and tone.' },
      { name: 'Zinc PCA', description: 'Helps regulate sebum for a more balanced complexion.' },
    ],
    texture: 'Lightweight, quick-absorbing serum.',
    quote: '"Pore-perfecting, oil-balancing, and gentle enough for daily use."',
    variants: [
      { id: 'var_n10-30ml', label: '30ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3200 },
    ],
  },
  {
    id: 'prod_green-tea-antioxidant-serum',
    slug: 'green-tea-antioxidant-serum',
    title: 'Green Tea Antioxidant Serum',
    type: 'Serum',
    tags: ['serum', 'antioxidant', 'environmental-defense'],
    price: 3400,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=700&q=80',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80',
    ],
    description: 'A daily antioxidant shield formulated with Camellia Sinensis (green tea) extract to defend skin against environmental stress while calming and evening the complexion.',
    how_to_use: 'Apply 3–4 drops to clean skin each morning before SPF.',
    ingredients: 'Water, Camellia Sinensis Leaf Extract, Glycerin, Sodium Hyaluronate, Phenoxyethanol.',
    benefits: [
      'Shields skin from daily environmental stress',
      'Calms visible redness and irritation',
      'Supports a more even, healthy-looking tone',
    ],
    key_ingredients: [
      { name: 'Green Tea Extract', description: 'Rich in polyphenols that help neutralize free radicals.' },
    ],
    texture: 'Light, silky antioxidant serum.',
    quote: '"Your daily shield. Quiet protection with visible results."',
    variants: [
      { id: 'var_gts-30ml', label: '30ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3400 },
    ],
  },
  {
    id: 'prod_dark-spot-serum',
    slug: 'dark-spot-serum',
    title: 'Dark Spot Serum',
    type: 'Serum',
    tags: ['serum', 'brightening', 'hyperpigmentation'],
    price: 4000,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=700&q=80',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80',
    ],
    description: 'A targeted brightening treatment formulated to visibly fade the look of dark spots and hyperpigmentation, revealing a more even, luminous complexion over time.',
    how_to_use: 'Apply directly to areas of concern, or all over, morning and night. Always follow with SPF during the day.',
    ingredients: 'Water, Niacinamide, Alpha Arbutin, Tranexamic Acid, Glycerin.',
    benefits: [
      'Visibly fades the look of dark spots',
      'Evens out overall skin tone',
      'Helps prevent new discoloration from forming',
    ],
    key_ingredients: [
      { name: 'Alpha Arbutin', description: 'A gentle brightening agent that targets the look of excess pigment.' },
      { name: 'Tranexamic Acid', description: 'Supports a clearer, more even-toned complexion over time.' },
    ],
    texture: 'Silky, fast-absorbing serum.',
    quote: '"Targeted brilliance for a brighter, more even complexion."',
    variants: [
      { id: 'var_dss-30ml', label: '30ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 4000 },
    ],
  },
  {
    id: 'prod_retinol-peptide-face-serum',
    slug: 'retinol-peptide-face-serum',
    title: 'Retinol & Peptide Face Serum',
    type: 'Serum',
    tags: ['serum', 'anti-aging', 'night', 'bestseller'],
    price: 4400,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=700&q=80',
      'https://images.unsplash.com/photo-1556227834-09f1de7a7d14?w=700&q=80',
    ],
    description: 'An advanced nighttime formula that refines skin texture, boosts firmness, and evens out tone. Retinol and peptides work while you sleep to promote a firmer, smoother appearance.',
    how_to_use: 'Use only at night. Apply a pea-sized amount to clean, dry skin. Always wear SPF the following morning.',
    ingredients: 'Water, Retinol, Palmitoyl Pentapeptide-4, Squalane, Glycerin, Phenoxyethanol.',
    benefits: [
      'Accelerates cellular turnover while you sleep',
      'Firms and improves the look of skin elasticity',
      'Reduces the appearance of fine lines',
    ],
    key_ingredients: [
      { name: 'Encapsulated Retinol', description: 'Delivers anti-aging benefits slowly to help minimize irritation.' },
      { name: 'Peptide Complex', description: 'Signals the skin to support a firmer, more resilient appearance.' },
    ],
    texture: 'Silky, velvety serum that melts into the skin.',
    quote: '"Wake up to skin that feels renewed, sculpted, and deeply restored." PM Only.',
    variants: [
      { id: 'var_rps-30ml', label: '30ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 4400 },
    ],
  },
  {
    id: 'prod_vitamin-c-brightening-serum',
    slug: 'vitamin-c-brightening-serum',
    title: 'Vitamin C Brightening Serum',
    type: 'Serum',
    tags: ['serum', 'brightening', 'antioxidant'],
    price: 3800,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=700&q=80',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80',
    ],
    description: 'A stabilized Vitamin C formula that brightens dullness, evens skin tone, and defends against daily environmental stress — a morning non-negotiable.',
    how_to_use: 'Apply 3–4 drops to clean skin each morning. Follow with moisturizer and SPF.',
    ingredients: 'Water, Ascorbic Acid, Vitamin E, Ferulic Acid, Glycerin.',
    benefits: [
      'Brightens dull, tired-looking skin',
      'Helps even out overall skin tone',
      'Provides daytime antioxidant protection',
    ],
    key_ingredients: [
      { name: 'Stabilized Vitamin C', description: 'Paired with Vitamin E and Ferulic Acid for enhanced stability and potency.' },
    ],
    texture: 'Light, silky, fast-absorbing serum.',
    quote: '"If you could only use two products for the rest of your life, make it Vitamin C and SPF."',
    variants: [
      { id: 'var_vcs-30ml', label: '30ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3800 },
    ],
  },
  {
    id: 'prod_spf-serum',
    slug: 'spf-serum',
    title: 'SPF Serum',
    type: 'SPF',
    tags: ['spf', 'daily', 'moisturizer'],
    price: 3200,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=700&q=80',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80',
    ],
    description: 'A weightless, serum-textured SPF that protects skin from daily UV exposure without the heavy, chalky finish of traditional sunscreens.',
    how_to_use: 'Apply generously as the last step of your morning routine. Reapply every two hours when in direct sun.',
    ingredients: 'Water, Zinc Oxide, Niacinamide, Glycerin, Squalane.',
    benefits: [
      'Provides daily broad-spectrum protection',
      'Wears invisibly under makeup',
      'Doubles as a lightweight hydrator',
    ],
    key_ingredients: [
      { name: 'Zinc Oxide', description: 'A mineral filter that provides broad-spectrum protection with a gentle profile.' },
    ],
    texture: 'Weightless, serum-like SPF.',
    quote: '"The ultimate anti-aging product, reimagined as a serum."',
    variants: [
      { id: 'var_spfs-50ml', label: '50ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3200 },
    ],
  },
  {
    id: 'prod_lip-serum',
    slug: 'lip-serum',
    title: 'Lip Serum',
    type: 'Lip Care',
    tags: ['lip-care', 'hydration', 'plumping'],
    price: 1800,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=700&q=80',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80',
    ],
    description: 'A hydrating lip treatment that plumps and conditions delicate lip skin, leaving lips soft, smooth, and subtly glossy.',
    how_to_use: 'Apply to lips as needed throughout the day, or as the final step of your evening routine.',
    ingredients: 'Hyaluronic Acid, Shea Butter, Vitamin E, Peppermint Oil.',
    benefits: [
      'Deeply hydrates dry, chapped lips',
      'Visibly plumps for a fuller look',
      'Leaves a soft, subtly glossy finish',
    ],
    key_ingredients: [
      { name: 'Hyaluronic Acid', description: 'Draws in moisture to keep delicate lip skin hydrated.' },
    ],
    texture: 'Lightweight, glossy lip oil-serum.',
    quote: '"A little plump, a lot of care."',
    variants: [
      { id: 'var_ls-5ml', label: '5ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 1800 },
    ],
  },

  // ══════════════════════ FACIAL — FACE OILS ══════════════════════
  {
    id: 'prod_nourishing-jojoba-face-oil',
    slug: 'nourishing-jojoba-face-oil',
    title: 'Nourishing Jojoba Face Oil',
    type: 'Face Oil',
    tags: ['face-oil', 'balancing', 'glow'],
    price: 2800,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=700&q=80',
    ],
    description: 'A pure Jojoba Wax formula that mimics the skin\'s natural sebum, balancing oil production while delivering a healthy, radiant glow — non-comedogenic and gentle enough for daily use.',
    how_to_use: 'Warm 2–3 drops in your palms and press into skin as the final step of your routine.',
    ingredients: 'Simmondsia Chinensis (Jojoba) Seed Oil.',
    benefits: [
      'Balances oil production without clogging pores',
      'Seals in all preceding skincare steps',
      'Delivers a natural, lit-from-within glow',
    ],
    key_ingredients: [
      { name: 'Jojoba Wax', description: 'Structurally resembles human sebum, making it highly compatible and non-comedogenic.' },
    ],
    texture: 'Lightweight, golden oil.',
    quote: '"The holy grail of balance. It understands exactly what your skin needs."',
    variants: [
      { id: 'var_njfo-30ml', label: '30ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 2800 },
    ],
  },
  {
    id: 'prod_gua-sha-face-oil',
    slug: 'gua-sha-face-oil',
    title: 'Gua Sha Face Oil',
    type: 'Face Oil',
    tags: ['face-oil', 'massage', 'lymphatic'],
    price: 2800,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'Formulated to provide the perfect glide for facial massage tools, this lightweight botanical blend supports lymphatic drainage and leaves skin supple and de-puffed.',
    how_to_use: 'Apply 4–5 drops to clean skin before using your Gua Sha or facial roller. Glide tools gently following facial contours.',
    ingredients: 'Vitis Vinifera (Grape) Seed Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Tocopherol.',
    benefits: [
      'Provides friction-free slip for facial massage',
      'Assists in reducing morning puffiness',
      'Nourishes the skin with Vitamin E',
    ],
    key_ingredients: [
      { name: 'Grapeseed Oil', description: 'An ultra-light, non-clogging oil that provides perfect glide.' },
    ],
    texture: 'Silky, slippery, and fast-absorbing.',
    quote: '"Elevate your massage. The perfect glide for a sculpted, lifted look."',
    variants: [
      { id: 'var_gsfo-30ml', label: '30ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 2800 },
    ],
  },

  // ══════════════════════ FACIAL — CLEANSERS ══════════════════════
  {
    id: 'prod_gentle-cleansing-gel',
    slug: 'gentle-cleansing-gel',
    title: 'Gentle Cleansing Gel',
    type: 'Cleanser',
    tags: ['cleanser', 'gentle', 'daily'],
    price: 2200,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80',
    ],
    description: 'A calming, oil-free gel cleanser infused with watermelon, apple, and witch hazel to sweep away daily impurities without stripping the skin — gentle enough for sensitive skin.',
    how_to_use: 'Massage onto damp skin for 30–60 seconds, then rinse thoroughly with lukewarm water. Use morning and evening.',
    ingredients: 'Water, Citrullus Lanatus (Watermelon) Fruit Extract, Pyrus Malus (Apple) Fruit Extract, Witch Hazel, Aloe Barbadensis Leaf Juice.',
    benefits: [
      'Removes impurities without disrupting the acid mantle',
      'Calms redness during the cleansing process',
      'Leaves skin feeling soft, not squeaky',
    ],
    key_ingredients: [
      { name: 'Witch Hazel', description: 'A gentle, naturally soothing toning agent.' },
      { name: 'Watermelon & Apple Extract', description: 'Rich in vitamins and antioxidants for a fresh, hydrated finish.' },
    ],
    texture: 'Clear, gentle lathering gel.',
    quote: '"A clean slate. Respect your barrier from the very first step of your ritual."',
    variants: [
      { id: 'var_gcg-177ml', label: '177ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 2200 },
    ],
  },
  {
    id: 'prod_charcoal-facial-cleanser',
    slug: 'charcoal-facial-cleanser',
    title: 'Charcoal Facial Cleanser',
    type: 'Cleanser',
    tags: ['cleanser', 'purifying', 'oily-skin'],
    price: 2400,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A deep-cleaning formula with activated charcoal, Vitamin E, and aloe that purifies oily and combination skin without over-drying.',
    how_to_use: 'Massage onto damp skin, focusing on the T-zone. Rinse thoroughly with lukewarm water. Use morning and evening.',
    ingredients: 'Water, Activated Charcoal, Tocopherol (Vitamin E), Aloe Barbadensis Leaf Juice, Cocamidopropyl Betaine.',
    benefits: [
      'Draws out excess oil and impurities',
      'Purifies without over-stripping the skin',
      'Leaves pores looking visibly refined',
    ],
    key_ingredients: [
      { name: 'Activated Charcoal', description: 'Binds to and lifts away dirt, oil, and environmental buildup.' },
    ],
    texture: 'Deep-cleaning black gel cleanser.',
    quote: '"A true reset for oily, congested days."',
    variants: [
      { id: 'var_cfc-177ml', label: '177ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 2400 },
    ],
  },

  // ══════════════════════ FACIAL — TONERS ══════════════════════
  {
    id: 'prod_gentle-balancing-toner',
    slug: 'gentle-balancing-toner',
    title: 'Gentle Balancing Toner',
    type: 'Toner',
    tags: ['toner', 'balancing', 'alcohol-free'],
    price: 2000,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'An alcohol-free balancing mist with rose water, green tea, and chamomile that preps skin for the rest of your routine without any tightness or sting.',
    how_to_use: 'Sweep across face and neck with a cotton pad after cleansing, or mist directly onto skin.',
    ingredients: 'Rosa Damascena (Rose) Flower Water, Camellia Sinensis Leaf Extract, Chamomilla Recutita Flower Extract, Glycerin.',
    benefits: [
      'Rebalances skin pH after cleansing',
      'Preps skin to better absorb serums',
      'Calms and soothes on contact',
    ],
    key_ingredients: [
      { name: 'Rose Water', description: 'Gently hydrates while calming the look of redness.' },
      { name: 'Chamomile Extract', description: 'A soothing botanical that helps reduce visible irritation.' },
    ],
    texture: 'Light, alcohol-free mist.',
    quote: '"The bridge between cleanse and treat — never skip it."',
    variants: [
      { id: 'var_gbt-177ml', label: '177ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 2000 },
    ],
  },
  {
    id: 'prod_witch-hazel-pore-toner',
    slug: 'witch-hazel-pore-toner',
    title: 'Witch Hazel Pore Toner',
    type: 'Toner',
    tags: ['toner', 'pore-minimizing'],
    price: 2000,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A refining witch hazel toner that visibly tightens the look of pores and removes the last traces of cleanser residue, oil, and makeup.',
    how_to_use: 'Sweep across face with a cotton pad after cleansing. Follow with serum and moisturizer.',
    ingredients: 'Hamamelis Virginiana (Witch Hazel) Water, Glycerin, Aloe Barbadensis Leaf Juice.',
    benefits: [
      'Visibly refines the look of enlarged pores',
      'Removes residual impurities post-cleanse',
      'Leaves skin feeling fresh and clean',
    ],
    key_ingredients: [
      { name: 'Witch Hazel', description: 'A natural astringent that helps tighten the appearance of pores.' },
    ],
    texture: 'Light, quick-absorbing toner.',
    quote: '"Pore-perfecting simplicity, in one clean swipe."',
    variants: [
      { id: 'var_whpt-177ml', label: '177ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 2000 },
    ],
  },
  {
    id: 'prod_aha-exfoliating-toner',
    slug: 'aha-exfoliating-toner',
    title: 'AHA Exfoliating Toner',
    type: 'Toner',
    tags: ['toner', 'exfoliating', 'resurfacing'],
    price: 2400,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A resurfacing toner with gentle AHA acids that sweeps away dead skin cell buildup, revealing smoother, brighter skin with regular use.',
    how_to_use: 'Sweep across face with a cotton pad in the evening, 2–3 times per week. Always follow with SPF the next morning.',
    ingredients: 'Water, Glycolic Acid, Lactic Acid, Aloe Barbadensis Leaf Juice, Glycerin.',
    benefits: [
      'Gently resurfaces for smoother texture',
      'Brightens the look of dull, tired skin',
      'Preps skin for better serum absorption',
    ],
    key_ingredients: [
      { name: 'Glycolic & Lactic Acid', description: 'Gentle AHAs that encourage visible skin renewal.' },
    ],
    texture: 'Light, quick-absorbing exfoliating toner.',
    quote: '"Resurface, renew, reveal — one swipe at a time."',
    variants: [
      { id: 'var_aet-177ml', label: '177ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 2400 },
    ],
  },

  // ══════════════════════ FACIAL — MOISTURIZERS ══════════════════════
  {
    id: 'prod_watermelon-hydration-moisturizer',
    slug: 'watermelon-hydration-moisturizer',
    title: 'Watermelon Hydration Moisturizer',
    type: 'Moisturizer',
    tags: ['bestseller', 'moisturizer', 'hydration'],
    price: 2800,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=700&q=80',
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=700&q=80',
    ],
    description: 'A lightweight, non-comedogenic moisturizer with niacinamide, watermelon, and green tea that delivers a burst of hydration while balancing oily and combination skin.',
    how_to_use: 'Apply 2–3 pumps to clean, toned skin morning and night. Gently press into skin using fingertips.',
    ingredients: 'Water, Citrullus Lanatus (Watermelon) Fruit Extract, Niacinamide, Camellia Sinensis Leaf Extract, Glycerin.',
    benefits: [
      'Quenches thirsty skin instantly',
      'Regulates excess oil production',
      'Preps skin perfectly for smooth makeup application',
    ],
    key_ingredients: [
      { name: 'Watermelon Extract', description: 'Rich in amino acids and vitamins, it intensely hydrates and soothes.' },
      { name: 'Niacinamide', description: 'Balances oil while supporting an even-looking tone.' },
    ],
    texture: 'Cooling, lightweight gel-cream.',
    quote: '"A tall glass of water for your face. Effortlessly light, powerfully hydrating."',
    variants: [
      { id: 'var_whm-50ml', label: '50ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 2800 },
    ],
  },
  {
    id: 'prod_anti-aging-moisturizer',
    slug: 'anti-aging-moisturizer',
    title: 'Anti Aging Moisturizer',
    type: 'Moisturizer',
    tags: ['moisturizer', 'anti-aging', 'ceramides'],
    price: 4200,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80',
      'https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=700&q=80',
    ],
    description: 'A rich, comforting cream formulated with retinol, skin-identical ceramides, and peptides. It deeply moisturizes while supporting cell renewal and a firmer-looking complexion.',
    how_to_use: 'Apply a dime-sized amount to the face and neck as the final step of your evening ritual.',
    ingredients: 'Water, Ceramide NP, Retinol, Acetyl Octapeptide-3, Butyrospermum Parkii (Shea) Butter, Glycerin.',
    benefits: [
      'Deeply nourishes dry and mature skin types',
      'Restores depleted ceramides to rebuild the barrier',
      'Softens the look of deep-set lines',
    ],
    key_ingredients: [
      { name: 'Ceramide NP', description: 'A building block of the skin barrier, locking in moisture and keeping irritants out.' },
      { name: 'Peptides', description: 'Support firmness and a smoother-looking complexion over time.' },
    ],
    texture: 'Rich, buttery cream that absorbs beautifully.',
    quote: '"Like a comforting hug for your skin. The ultimate reset at the end of a long day."',
    variants: [
      { id: 'var_aam-50ml', label: '50ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 4200 },
    ],
  },
  {
    id: 'prod_hydro-balancing-gel-cream',
    slug: 'hydro-balancing-gel-cream',
    title: 'Hydro Balancing Gel-Cream',
    type: 'Moisturizer',
    tags: ['moisturizer', 'oil-control', 'water-based'],
    price: 3400,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A water-based, oil-controlling gel-cream with green tea and fermented actives that hydrates deeply without adding excess weight or shine.',
    how_to_use: 'Apply 2–3 pumps to clean skin morning and night. Ideal for oily and combination skin types.',
    ingredients: 'Water, Camellia Sinensis Leaf Extract, Pseudoalteromonas Ferment Extract, Glycerin, Sodium Hyaluronate.',
    benefits: [
      'Hydrates without adding excess shine',
      'Helps control oil throughout the day',
      'Leaves a soft, matte-fresh finish',
    ],
    key_ingredients: [
      { name: 'Pseudoalteromonas Ferment', description: 'A marine-derived ferment known for supporting skin resilience.' },
    ],
    texture: 'Cool, water-based gel-cream.',
    quote: '"Hydration that never feels heavy."',
    variants: [
      { id: 'var_hbgc-50ml', label: '50ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3400 },
    ],
  },

  // ══════════════════════ FACIAL — EYE CARE ══════════════════════
  {
    id: 'prod_eye-cream',
    slug: 'eye-cream',
    title: 'Eye Cream',
    type: 'Eye Care',
    tags: ['eye-care', 'hydration', 'brightening'],
    price: 3000,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=700&q=80',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80',
    ],
    description: 'A gentle, peptide-infused eye cream that hydrates the delicate under-eye area and helps soften the look of dark circles and puffiness.',
    how_to_use: 'Gently pat a small amount around the orbital bone morning and night, avoiding direct contact with the eye.',
    ingredients: 'Water, Peptide Complex, Caffeine, Squalane, Glycerin.',
    benefits: [
      'Hydrates the delicate eye area',
      'Helps soften the look of dark circles',
      'Reduces the appearance of morning puffiness',
    ],
    key_ingredients: [
      { name: 'Peptides', description: 'Support a smoother, more resilient-looking eye area.' },
      { name: 'Caffeine', description: 'Helps de-puff and brighten tired-looking eyes.' },
    ],
    texture: 'Lightweight, cooling cream.',
    quote: '"Brighter eyes, softer mornings."',
    variants: [
      { id: 'var_ec-15ml', label: '15ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3000 },
    ],
  },
  {
    id: 'prod_retinol-eye-cream',
    slug: 'retinol-eye-cream',
    title: 'Retinol Eye Cream',
    type: 'Eye Care',
    tags: ['eye-care', 'anti-aging', 'night'],
    price: 3600,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=700&q=80',
      'https://images.unsplash.com/photo-1556227834-09f1de7a7d14?w=700&q=80',
    ],
    description: 'A gentle, low-irritation retinol formula built specifically for the delicate eye area, targeting the look of fine lines and crepiness overnight.',
    how_to_use: 'Use only at night. Gently pat a small amount around the orbital bone, avoiding direct contact with the eye.',
    ingredients: 'Water, Encapsulated Retinol, Squalane, Ceramide NP, Glycerin.',
    benefits: [
      'Targets the look of fine lines around the eyes',
      'Softens the appearance of crepey texture',
      'Hydrates while you sleep',
    ],
    key_ingredients: [
      { name: 'Encapsulated Retinol', description: 'A slow-release form of retinol formulated for sensitive eye-area skin.' },
    ],
    texture: 'Rich, nourishing night cream.',
    quote: '"Gentle enough for the eyes, powerful enough to work."',
    variants: [
      { id: 'var_rec-15ml', label: '15ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3600 },
    ],
  },

  // ══════════════════════ FACIAL — MASKS ══════════════════════
  {
    id: 'prod_hydrating-face-mask',
    slug: 'hydrating-face-mask',
    title: 'Hydrating Face Mask',
    type: 'Mask',
    tags: ['mask', 'hydration'],
    price: 2800,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=700&q=80',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80',
    ],
    description: 'An intensive hydration mask that floods thirsty skin with moisture, leaving it plump, soft, and visibly refreshed after just one use.',
    how_to_use: 'Apply a generous layer to clean skin. Leave on for 10–15 minutes, then rinse or massage in excess.',
    ingredients: 'Water, Sodium Hyaluronate, Glycerin, Aloe Barbadensis Leaf Juice, Panthenol.',
    benefits: [
      'Delivers an intensive burst of hydration',
      'Leaves skin looking plump and refreshed',
      'Soothes dry, tight-feeling skin',
    ],
    key_ingredients: [
      { name: 'Sodium Hyaluronate', description: 'Floods the skin with deep, lasting moisture.' },
    ],
    texture: 'Rich, gel-cream mask.',
    quote: '"Fifteen minutes to a plumper, dewier tomorrow."',
    variants: [
      { id: 'var_hfm-100ml', label: '100ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 2800 },
    ],
  },
  {
    id: 'prod_brightening-face-mask',
    slug: 'brightening-face-mask',
    title: 'Brightening Face Mask',
    type: 'Mask',
    tags: ['mask', 'brightening'],
    price: 3000,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A radiance-boosting mask formulated with brightening actives to visibly even out tone and restore a healthy, lit-from-within glow.',
    how_to_use: 'Apply an even layer to clean skin. Leave on for 10–15 minutes, then rinse thoroughly. Use 2–3 times per week.',
    ingredients: 'Water, Niacinamide, Vitamin C, Glycerin, Aloe Barbadensis Leaf Juice.',
    benefits: [
      'Visibly evens out skin tone',
      'Restores a healthy, radiant glow',
      'Leaves skin looking brighter after one use',
    ],
    key_ingredients: [
      { name: 'Niacinamide & Vitamin C', description: 'A brightening duo that works together to even tone and boost radiance.' },
    ],
    texture: 'Smooth, brightening cream mask.',
    quote: '"Even tone, brighter glow, in fifteen minutes flat."',
    variants: [
      { id: 'var_bfm-100ml', label: '100ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3000 },
    ],
  },

  // ══════════════════════ FACIAL — MIST ══════════════════════
  {
    id: 'prod_facial-mist',
    slug: 'facial-mist',
    title: 'Facial Mist',
    type: 'Mist',
    tags: ['mist', 'hydration', 'refresh'],
    price: 1800,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A refreshing, hydrating mist that revives skin and sets makeup any time of day — a quick reset in a single spritz.',
    how_to_use: 'Mist onto face as needed throughout the day, or over makeup to set and refresh.',
    ingredients: 'Water, Rosa Damascena (Rose) Flower Water, Glycerin, Panthenol.',
    benefits: [
      'Instantly refreshes and hydrates skin',
      'Sets makeup for longer wear',
      'Perfect for on-the-go touch-ups',
    ],
    key_ingredients: [
      { name: 'Rose Water', description: 'Gently hydrates and calms skin with every spritz.' },
    ],
    texture: 'Fine, lightweight facial mist.',
    quote: '"Refresh. Hydrate. Repeat as needed."',
    variants: [
      { id: 'var_fm-100ml', label: '100ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 1800 },
    ],
  },

  // ══════════════════════ FACIAL — TINTED ══════════════════════
  {
    id: 'prod_bb-cream-tinted-moisturizer',
    slug: 'bb-cream-tinted-moisturizer',
    title: 'BB Cream / Tinted Moisturizer',
    type: 'Tinted Moisturizer',
    tags: ['tinted-moisturizer', 'spf', 'daily'],
    price: 3000,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=700&q=80',
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80',
    ],
    description: 'A skincare-forward tinted moisturizer that evens out the complexion with light, buildable coverage while hydrating and protecting with SPF.',
    how_to_use: 'Apply with fingertips or a makeup sponge to clean, moisturized skin. Buildable for a natural, skin-like finish.',
    ingredients: 'Water, Zinc Oxide, Niacinamide, Iron Oxides, Glycerin.',
    benefits: [
      'Evens out the look of skin tone',
      'Provides light, natural-looking coverage',
      'Hydrates and protects with SPF',
    ],
    key_ingredients: [
      { name: 'Zinc Oxide', description: 'Provides gentle, broad-spectrum protection.' },
    ],
    texture: 'Lightweight, blendable cream.',
    quote: '"Skincare and coverage, in one effortless step."',
    variants: [
      { id: 'var_bbtm-30ml', label: '30ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3000 },
    ],
  },

  // ══════════════════════ BODY CARE ══════════════════════
  {
    id: 'prod_tallow-cream',
    slug: 'tallow-cream',
    title: 'Tallow Cream',
    type: 'Body Cream',
    tags: ['body', 'body-cream', 'nourishing'],
    price: 3200,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A deeply biocompatible cream built on grass-fed bovine tallow, rich in the same fatty acids naturally found in skin, for deep nourishment on body or face.',
    how_to_use: 'Warm a small amount between palms and massage into skin as needed, focusing on especially dry areas.',
    ingredients: 'Grass-Fed Bovine Tallow, Jojoba Oil, Shea Butter, Vitamin E.',
    benefits: [
      'Deeply nourishes very dry, compromised skin',
      'Biocompatible with the skin\'s natural lipids',
      'Versatile enough for face and body',
    ],
    key_ingredients: [
      { name: 'Grass-Fed Tallow', description: 'Rich in vitamins A, D, E, and K, closely mirroring the skin\'s own fats.' },
    ],
    texture: 'Rich, dense, deeply nourishing cream.',
    quote: '"Ancient nourishment, reimagined for modern skin."',
    variants: [
      { id: 'var_tc-113g', label: '4oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3200 },
    ],
  },
  {
    id: 'prod_body-lotion',
    slug: 'body-lotion',
    title: 'Body Lotion',
    type: 'Body Lotion',
    tags: ['body', 'lotion', 'daily'],
    price: 2600,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A lightweight, fast-absorbing daily lotion that keeps skin soft and hydrated from morning to night without any greasy residue.',
    how_to_use: 'Apply generously to body after showering, focusing on drier areas like elbows and knees.',
    ingredients: 'Water, Glycerin, Cetearyl Alcohol, Shea Butter, Panthenol.',
    benefits: [
      'Provides all-day, lightweight moisture',
      'Absorbs quickly with no greasy residue',
      'Softens rough, dry patches',
    ],
    key_ingredients: [
      { name: 'Shea Butter', description: 'Conditions and softens skin without weighing it down.' },
    ],
    texture: 'Light, fast-absorbing lotion.',
    quote: '"Daily moisture, made effortless."',
    variants: [
      { id: 'var_bl-200ml', label: '200ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 2600 },
    ],
  },
  {
    id: 'prod_firming-body-cream',
    slug: 'firming-body-cream',
    title: 'Firming Body Cream',
    type: 'Body Cream',
    tags: ['body', 'body-cream', 'firming'],
    price: 3400,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=700&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80',
    ],
    description: 'A collagen-supporting body cream formulated to visibly firm and improve the look of skin elasticity with consistent daily use.',
    how_to_use: 'Massage generously into skin daily, using upward strokes toward the heart.',
    ingredients: 'Water, Hydrolyzed Collagen, Caffeine, Shea Butter, Glycerin.',
    benefits: [
      'Visibly firms the look of skin over time',
      'Improves the appearance of elasticity',
      'Deeply conditions with rich, nourishing butters',
    ],
    key_ingredients: [
      { name: 'Hydrolyzed Collagen', description: 'Supports the look of firmer, more resilient skin.' },
    ],
    texture: 'Rich, fast-absorbing cream.',
    quote: '"Firmer-looking skin, one ritual at a time."',
    variants: [
      { id: 'var_fbc-200ml', label: '200ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3400 },
    ],
  },
  {
    id: 'prod_body-butter',
    slug: 'body-butter',
    title: 'Body Butter',
    type: 'Body Butter',
    tags: ['body', 'butter', 'rich'],
    price: 2800,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A deeply rich whipped body butter built on shea and mango butters, delivering intense nourishment for very dry or rough skin.',
    how_to_use: 'Scoop a small amount and warm between palms before massaging into skin, especially after bathing.',
    ingredients: 'Butyrospermum Parkii (Shea) Butter, Mangifera Indica (Mango) Seed Butter, Coconut Oil, Vitamin E.',
    benefits: [
      'Delivers deep, long-lasting nourishment',
      'Softens very dry or rough skin',
      'Leaves a subtle, non-greasy glow',
    ],
    key_ingredients: [
      { name: 'Shea & Mango Butter', description: 'A rich pairing of butters that deeply conditions the skin.' },
    ],
    texture: 'Thick, whipped body butter.',
    quote: '"Deep, rich nourishment for skin that needs it most."',
    variants: [
      { id: 'var_bb-8oz', label: '8oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 2800 },
    ],
  },
  {
    id: 'prod_body-serum',
    slug: 'body-serum',
    title: 'Body Serum',
    type: 'Body Serum',
    tags: ['body', 'serum', 'treatment'],
    price: 3600,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=700&q=80',
      'https://images.unsplash.com/photo-1556227834-09f1de7a7d14?w=700&q=80',
    ],
    description: 'A concentrated active treatment for the body, delivering targeted hydration and brightening benefits typically reserved for facial skincare.',
    how_to_use: 'Apply to clean, dry skin, focusing on areas of concern. Follow with body lotion or oil to seal in benefits.',
    ingredients: 'Water, Niacinamide, Hyaluronic Acid, Glycerin, Panthenol.',
    benefits: [
      'Delivers targeted, active treatment to the body',
      'Improves the look of skin texture and tone',
      'Layers beautifully under lotion or oil',
    ],
    key_ingredients: [
      { name: 'Niacinamide & Hyaluronic Acid', description: 'A hydrating, brightening duo formulated for body skin.' },
    ],
    texture: 'Lightweight, fast-absorbing serum.',
    quote: '"Skincare-grade treatment, from neck to toe."',
    variants: [
      { id: 'var_bs-100ml', label: '100ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3600 },
    ],
  },
  {
    id: 'prod_stretch-mark-cream',
    slug: 'stretch-mark-cream',
    title: 'Stretch Mark Cream',
    type: 'Body Cream',
    tags: ['body', 'body-cream', 'specialized'],
    price: 2800,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A nourishing, elasticity-supporting cream formulated to hydrate and condition skin prone to stretch marks, from pregnancy to growth changes.',
    how_to_use: 'Massage generously into areas of concern twice daily for best results.',
    ingredients: 'Water, Centella Asiatica Extract, Cocoa Butter, Shea Butter, Vitamin E.',
    benefits: [
      'Supports skin elasticity over time',
      'Deeply hydrates areas prone to stretching',
      'Gentle enough for daily, long-term use',
    ],
    key_ingredients: [
      { name: 'Centella Asiatica', description: 'A healing botanical known for supporting skin resilience.' },
    ],
    texture: 'Rich, deeply conditioning cream.',
    quote: '"Support your skin through every change."',
    variants: [
      { id: 'var_smc-150ml', label: '150ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 2800 },
    ],
  },
  {
    id: 'prod_body-oil',
    slug: 'body-oil',
    title: 'Body Oil',
    type: 'Body Oil',
    tags: ['body', 'oil', 'glow'],
    price: 3200,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A fast-absorbing dry oil that nourishes skin and leaves behind a subtle, healthy-looking sheen without any greasy residue.',
    how_to_use: 'Massage into slightly damp skin post-shower for best absorption.',
    ingredients: 'Sweet Almond Oil, Jojoba Oil, Vitamin E, Sunflower Seed Oil.',
    benefits: [
      'Absorbs quickly with no greasy feel',
      'Leaves skin with a healthy, subtle glow',
      'Deeply conditions dry or rough patches',
    ],
    key_ingredients: [
      { name: 'Sweet Almond & Jojoba Oil', description: 'A lightweight blend that nourishes without clogging pores.' },
    ],
    texture: 'Fast-absorbing dry oil.',
    quote: '"A subtle glow, from the inside out."',
    variants: [
      { id: 'var_bo-100ml', label: '100ml', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3200 },
    ],
  },
  {
    id: 'prod_bath-soak',
    slug: 'bath-soak',
    title: 'Bath Soak',
    type: 'Bath',
    tags: ['body', 'bath', 'relax'],
    price: 2200,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A mineral-rich bath soak that transforms an ordinary bath into a deeply relaxing ritual, soothing tired muscles and softening skin.',
    how_to_use: 'Add a generous scoop to warm running bath water. Soak for 20 minutes to unwind.',
    ingredients: 'Magnesium Sulfate (Epsom Salt), Dead Sea Salt, Lavender Essential Oil.',
    benefits: [
      'Soothes tired, tense muscles',
      'Softens and conditions skin',
      'Promotes deep relaxation before bed',
    ],
    key_ingredients: [
      { name: 'Epsom & Dead Sea Salt', description: 'Mineral-rich salts that support relaxation and skin softening.' },
    ],
    texture: 'Fine mineral salt blend.',
    quote: '"Turn an ordinary bath into a ritual."',
    variants: [
      { id: 'var_bths-300g', label: '300g', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 2200 },
    ],
  },

  // ══════════════════════ BATH — SOAP BARS ══════════════════════
  {
    id: 'prod_aloe-cool-cucumber-soap',
    slug: 'aloe-cool-cucumber-soap',
    title: 'Aloe & Cool Cucumber Soap',
    type: 'Ritual Bar',
    tags: ['ritual-bar', 'bath', 'soothing'],
    price: 1400,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A crisp, cooling botanical bar with hydrating aloe and cucumber, hand-poured with organic fair-trade oils for a soothing, all-natural wash.',
    how_to_use: 'Lather between wet hands. Massage the foam gently onto the skin. Rinse thoroughly.',
    ingredients: 'Saponified Organic Oils, Aloe Barbadensis Leaf Extract, Cucumis Sativus (Cucumber) Extract.',
    benefits: [
      'Provides an instant cooling sensation',
      'Soothes and hydrates while cleansing',
      'Made with organic, fair-trade oils',
    ],
    key_ingredients: [
      { name: 'Aloe & Cucumber', description: 'A cooling, hydrating pair that calms as it cleanses.' },
    ],
    texture: 'Solid bar, creamy lather.',
    quote: '"Crisp, cool, and quietly luxurious."',
    variants: [
      { id: 'var_accs-113g', label: '4oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 1400 },
    ],
  },
  {
    id: 'prod_charcoal-soap',
    slug: 'charcoal-soap',
    title: 'Charcoal Soap',
    type: 'Ritual Bar',
    tags: ['ritual-bar', 'bath', 'purifying'],
    price: 1400,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A deep-cleaning bar with activated charcoal, peppermint, and tea tree that purifies the body without staining skin or towels.',
    how_to_use: 'Lather between wet hands or a washcloth. Massage over the body. Rinse thoroughly.',
    ingredients: 'Saponified Oils, Activated Charcoal, Mentha Piperita (Peppermint) Oil, Melaleuca Alternifolia (Tea Tree) Oil.',
    benefits: [
      'Deep-cleans and purifies the skin',
      'Non-staining, despite the deep black color',
      'Leaves a refreshing, cooling tingle',
    ],
    key_ingredients: [
      { name: 'Activated Charcoal', description: 'Draws out impurities for a deep, purifying wash.' },
    ],
    texture: 'Solid bar, deep-cleansing lather.',
    quote: '"Purify without the mess."',
    variants: [
      { id: 'var_cs-113g', label: '4oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 1400 },
    ],
  },
  {
    id: 'prod_kojic-turmeric-soap',
    slug: 'kojic-turmeric-soap',
    title: 'Kojic Acid & Turmeric Soap',
    type: 'Ritual Bar',
    tags: ['ritual-bar', 'bath', 'brightening'],
    price: 1600,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A brightening bar formulated with kojic acid, turmeric, mango butter, and lemon oil to help even out skin tone with each wash.',
    how_to_use: 'Lather and apply to areas of concern. Leave on for 30–60 seconds before rinsing thoroughly.',
    ingredients: 'Saponified Oils, Kojic Acid, Curcuma Longa (Turmeric) Root Powder, Mangifera Indica (Mango) Seed Butter, Lemon Peel Oil.',
    benefits: [
      'Helps visibly even out skin tone',
      'Conditions with rich mango butter',
      'Gently exfoliates with natural turmeric',
    ],
    key_ingredients: [
      { name: 'Kojic Acid & Turmeric', description: 'A natural brightening duo that targets the look of uneven tone.' },
    ],
    texture: 'Solid bar, golden lather.',
    quote: '"Targeted brightening, in bar form."',
    variants: [
      { id: 'var_kts-99g', label: '3.5oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 1600 },
    ],
  },
  {
    id: 'prod_oat-milk-honey-soap',
    slug: 'oat-milk-honey-soap',
    title: 'Oat Milk Honey Soap',
    type: 'Ritual Bar',
    tags: ['ritual-bar', 'bath', 'sensitive'],
    price: 1400,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A gently exfoliating bar with colloidal oats, honey, and goat milk, formulated especially for sensitive skin.',
    how_to_use: 'Lather between wet hands. Massage gently over the body. Rinse thoroughly.',
    ingredients: 'Saponified Goat Milk, Colloidal Oatmeal, Honey, Glycerin.',
    benefits: [
      'Gently exfoliates without irritation',
      'Soothes and conditions sensitive skin',
      'Leaves skin feeling soft, not stripped',
    ],
    key_ingredients: [
      { name: 'Colloidal Oats & Honey', description: 'A gentle, soothing pair ideal for sensitive or reactive skin.' },
    ],
    texture: 'Solid bar, creamy, gentle lather.',
    quote: '"Gentle exfoliation, made for sensitive skin."',
    variants: [
      { id: 'var_omhs-113g', label: '4oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 1400 },
    ],
  },
  {
    id: 'prod_slumber-soap',
    slug: 'slumber-soap',
    title: 'Slumber Soap',
    type: 'Ritual Bar',
    tags: ['ritual-bar', 'bath', 'night'],
    price: 1400,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A relaxing sleep-prep ritual bar infused with fir needle and lavender to calm the mind and prepare the body for rest.',
    how_to_use: 'Use in the evening shower or bath. Lather over the body and breathe deeply to enjoy the aromatherapy benefits.',
    ingredients: 'Saponified Oils, Abies Balsamea (Fir Needle) Oil, Lavandula Angustifolia (Lavender) Oil.',
    benefits: [
      'Promotes deep relaxation before bed',
      'Cleanses without stripping moisture',
      'A calming ritual to close out the day',
    ],
    key_ingredients: [
      { name: 'Fir Needle & Lavender', description: 'A calming aromatherapy blend clinically associated with relaxation.' },
    ],
    texture: 'Solid bar, dense aromatic lather.',
    quote: '"Breathe deeply, cleanse gently, prepare for rest."',
    variants: [
      { id: 'var_ss-113g', label: '4oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 1400 },
    ],
  },
  {
    id: 'prod_exfoliating-luffa-bar',
    slug: 'exfoliating-luffa-bar',
    title: 'Exfoliating Luffa Bar',
    type: 'Ritual Bar',
    tags: ['ritual-bar', 'bath', 'exfoliating'],
    price: 1600,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A built-in luffa bar that combines natural exfoliating fiber with organic oils, resurfacing and renewing rough, dull skin.',
    how_to_use: 'Lather with water and gently scrub over the body in circular motions. Rinse thoroughly.',
    ingredients: 'Saponified Organic Oils, Natural Luffa Fiber, Vitamin E.',
    benefits: [
      'Physically exfoliates dull, rough skin',
      'Encourages smoother-feeling skin over time',
      'Biodegradable and zero-waste',
    ],
    key_ingredients: [
      { name: 'Natural Luffa Fiber', description: 'A gentle, biodegradable exfoliant embedded directly in the bar.' },
    ],
    texture: 'Solid bar with built-in luffa texture.',
    quote: '"Resurface. Renew. Reveal."',
    variants: [
      { id: 'var_elb2-113g', label: '4oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 1600 },
    ],
  },
  {
    id: 'prod_rose-hibiscus-soap',
    slug: 'rose-hibiscus-soap',
    title: 'Rose & Hibiscus Soap',
    type: 'Ritual Bar',
    tags: ['ritual-bar', 'bath', 'floral'],
    price: 1400,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A softly floral bar infused with rose and hibiscus extracts, conditioning skin while filling the shower with a delicate botanical scent.',
    how_to_use: 'Lather between wet hands. Massage gently over the body. Rinse thoroughly.',
    ingredients: 'Saponified Oils, Rosa Damascena (Rose) Extract, Hibiscus Sabdariffa Flower Extract, Glycerin.',
    benefits: [
      'Conditions skin with a delicate floral scent',
      'Leaves skin feeling soft and cared for',
      'A gentle daily wash for all skin types',
    ],
    key_ingredients: [
      { name: 'Rose & Hibiscus', description: 'A softly conditioning, antioxidant-rich floral blend.' },
    ],
    texture: 'Solid bar, floral lather.',
    quote: '"A quiet moment of floral luxury."',
    variants: [
      { id: 'var_rhs-113g', label: '4oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 1400 },
    ],
  },
  {
    id: 'prod_lavender-mint-soap',
    slug: 'lavender-mint-soap',
    title: 'Lavender & Mint Soap',
    type: 'Ritual Bar',
    tags: ['ritual-bar', 'bath', 'cooling'],
    price: 1400,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A cooling, calming bar that pairs lavender with fresh mint for an invigorating yet soothing daily wash.',
    how_to_use: 'Lather between wet hands. Massage gently over the body. Rinse thoroughly.',
    ingredients: 'Saponified Oils, Lavandula Angustifolia (Lavender) Oil, Mentha Piperita (Peppermint) Oil.',
    benefits: [
      'Cools and refreshes on contact',
      'Calms the senses with lavender aromatherapy',
      'Cleanses gently without drying skin',
    ],
    key_ingredients: [
      { name: 'Lavender & Mint', description: 'A cooling, calming aromatherapy pairing.' },
    ],
    texture: 'Solid bar, cooling lather.',
    quote: '"Cooling. Calming. Quietly invigorating."',
    variants: [
      { id: 'var_lms-113g', label: '4oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 1400 },
    ],
  },
  {
    id: 'prod_coffee-scrub-soap',
    slug: 'coffee-scrub-soap',
    title: 'Coffee Scrub Soap',
    type: 'Ritual Bar',
    tags: ['ritual-bar', 'bath', 'exfoliating'],
    price: 1400,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'An energizing exfoliating bar with ground coffee that buffs away rough, dull skin while caffeine helps invigorate tired-looking skin.',
    how_to_use: 'Lather with water and gently scrub over the body in circular motions. Rinse thoroughly.',
    ingredients: 'Saponified Oils, Coffea Arabica (Coffee) Seed Powder, Caffeine, Shea Butter.',
    benefits: [
      'Physically exfoliates rough, dull skin',
      'Invigorates with natural caffeine',
      'Leaves skin feeling smooth and conditioned',
    ],
    key_ingredients: [
      { name: 'Ground Coffee & Caffeine', description: 'Buffs away dullness while energizing the look of skin.' },
    ],
    texture: 'Solid bar, gritty exfoliating lather.',
    quote: '"Wake up your skin, one shower at a time."',
    variants: [
      { id: 'var_css-113g', label: '4oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 1400 },
    ],
  },
  {
    id: 'prod_goat-milk-soap',
    slug: 'goat-milk-soap',
    title: 'Goat Milk Soap',
    type: 'Ritual Bar',
    tags: ['ritual-bar', 'bath', 'gentle'],
    price: 1400,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A gentle, creamy bar built on goat milk\'s naturally occurring lactic acid, softening skin while cleansing with a mild, non-stripping formula.',
    how_to_use: 'Lather between wet hands. Massage gently over the body. Rinse thoroughly.',
    ingredients: 'Saponified Goat Milk, Coconut Oil, Olive Oil, Glycerin.',
    benefits: [
      'Gently softens with natural lactic acid',
      'Cleanses without stripping the skin',
      'Ideal for daily, all-over use',
    ],
    key_ingredients: [
      { name: 'Goat Milk', description: 'Naturally rich in lactic acid, gently softening the skin.' },
    ],
    texture: 'Solid bar, creamy lather.',
    quote: '"Gentle, creamy, quietly effective."',
    variants: [
      { id: 'var_gms-113g', label: '4oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 1400 },
    ],
  },
  {
    id: 'prod_dead-sea-salt-soap',
    slug: 'dead-sea-salt-soap',
    title: 'Dead Sea Salt Soap',
    type: 'Ritual Bar',
    tags: ['ritual-bar', 'bath', 'detox'],
    price: 1600,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A mineral-rich detoxifying bar infused with Dead Sea salt, drawing out impurities while conditioning skin with trace minerals.',
    how_to_use: 'Lather between wet hands. Massage gently over the body. Rinse thoroughly.',
    ingredients: 'Saponified Oils, Dead Sea Salt, Glycerin, Shea Butter.',
    benefits: [
      'Draws out impurities with mineral-rich salt',
      'Conditions skin with trace minerals',
      'Leaves skin feeling clean and refreshed',
    ],
    key_ingredients: [
      { name: 'Dead Sea Salt', description: 'Rich in magnesium and other minerals known to support healthy-looking skin.' },
    ],
    texture: 'Solid bar, mineral-infused lather.',
    quote: '"Minerals. Detox. Quiet renewal."',
    variants: [
      { id: 'var_dsss-113g', label: '4oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 1600 },
    ],
  },

  // ══════════════════════ HAIR CARE ══════════════════════
  {
    id: 'prod_botanical-hair-growth-serum',
    slug: 'botanical-hair-growth-serum',
    title: 'Botanical Hair Growth Serum',
    type: 'Hair Serum',
    tags: ['hair', 'hair-serum', 'growth', 'scalp'],
    price: 3600,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A leave-in scalp treatment formulated with rosemary, ginger, and Densidyl to support a healthier-looking scalp environment for fuller, stronger-looking hair.',
    how_to_use: 'Apply directly to the scalp daily. Massage in gently. Do not rinse.',
    ingredients: 'Water, Rosmarinus Officinalis (Rosemary) Leaf Extract, Zingiber Officinale (Ginger) Root Extract, Densidyl, Glycerin.',
    benefits: [
      'Supports a healthier-looking scalp environment',
      'Nourishes hair follicles with botanical actives',
      'Leave-in formula fits easily into any routine',
    ],
    key_ingredients: [
      { name: 'Rosemary & Ginger', description: 'Traditional botanicals associated with scalp vitality.' },
      { name: 'Densidyl', description: 'A scalp-conditioning complex that supports the look of denser hair.' },
    ],
    texture: 'Lightweight, non-greasy scalp serum.',
    quote: '"Scalp health is hair health."',
    variants: [
      { id: 'var_bhgs-59ml', label: '2 fl oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3600 },
    ],
  },
  {
    id: 'prod_peptide-hair-growth-serum',
    slug: 'peptide-hair-growth-serum',
    title: 'Peptide Hair Growth Serum',
    type: 'Hair Serum',
    tags: ['hair', 'hair-serum', 'growth', 'scalp'],
    price: 3800,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'An advanced peptide-complex scalp serum designed to nourish follicles and support the appearance of thicker, fuller-looking hair over time.',
    how_to_use: 'Apply directly to the scalp daily. Massage in gently. Do not rinse.',
    ingredients: 'Water, Peptide Complex, Panthenol, Biotin, Glycerin.',
    benefits: [
      'Nourishes the scalp with advanced peptides',
      'Supports the look of fuller, thicker hair',
      'Lightweight, daily leave-in formula',
    ],
    key_ingredients: [
      { name: 'Peptide Complex', description: 'Advanced follicle-focused actives that support scalp nourishment.' },
    ],
    texture: 'Lightweight, non-greasy scalp serum.',
    quote: '"Advanced follicle science, made simple."',
    variants: [
      { id: 'var_phgs-59ml', label: '2 fl oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3800 },
    ],
  },
  {
    id: 'prod_moisturizing-strengthening-hair-oil',
    slug: 'moisturizing-strengthening-hair-oil',
    title: 'Moisturizing & Strengthening Hair Oil',
    type: 'Hair Oil',
    tags: ['hair', 'hair-oil', 'shine', 'strength'],
    price: 3200,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A conditioning hair oil blend of almond, avocado, olive, and carrot oils that strengthens strands and leaves hair glossy and smooth.',
    how_to_use: 'Apply a few drops to damp or dry hair, focusing on mid-lengths and ends. Can be used before or after styling.',
    ingredients: 'Prunus Amygdalus Dulcis (Sweet Almond) Oil, Persea Gratissima (Avocado) Oil, Olea Europaea (Olive) Oil, Daucus Carota (Carrot) Seed Oil.',
    benefits: [
      'Conditions and strengthens strands',
      'Adds visible shine and softness',
      'Suitable for all hair types',
    ],
    key_ingredients: [
      { name: 'Almond, Avocado & Olive Oil', description: 'A nourishing trio that conditions and adds shine.' },
    ],
    texture: 'Lightweight, fast-absorbing hair oil.',
    quote: '"Conditioning, shine, and strength — in every drop."',
    variants: [
      { id: 'var_mshv-60ml', label: '2 fl oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3200 },
    ],
  },
  {
    id: 'prod_scalp-health-hair-oil',
    slug: 'scalp-health-hair-oil',
    title: 'Hair Oil for Scalp Health & Growth',
    type: 'Hair Oil',
    tags: ['hair', 'hair-oil', 'scalp', 'growth'],
    price: 3200,
    compare_at_price: null,
    stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID',
    imagePlaceholder: true,
    images: [
      'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=700&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700&q=80',
    ],
    description: 'A scalp-focused natural oil blend that nourishes the scalp environment to support healthier-looking growth from the root.',
    how_to_use: 'Part hair in sections and apply directly to the scalp. Massage in gently for 2–3 minutes.',
    ingredients: 'Simmondsia Chinensis (Jojoba) Oil, Ricinus Communis (Castor) Oil, Rosmarinus Officinalis (Rosemary) Leaf Extract.',
    benefits: [
      'Nourishes the scalp environment',
      'Supports the look of healthier hair growth',
      'Lightweight enough for regular use',
    ],
    key_ingredients: [
      { name: 'Jojoba & Castor Oil', description: 'A nourishing pair traditionally used for scalp conditioning.' },
    ],
    texture: 'Rich, scalp-focused treatment oil.',
    quote: '"A scalp-focused ritual for healthier-looking hair."',
    variants: [
      { id: 'var_shho-60ml', label: '2 fl oz', stripe_price_id: 'price_REPLACE_WITH_YOUR_STRIPE_PRICE_ID', price: 3200 },
    ],
  },
];

// Helper: get product by slug
export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

// Helper: format price from cents
export function formatMoney(cents) {
  return '$' + (cents / 100).toFixed(2);
}

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
