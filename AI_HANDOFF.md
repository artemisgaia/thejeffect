# ✦ The J Effect — AI Handoff & Architecture Guide

Welcome! If you are an AI assistant (like Claude) taking over this project, please read this document carefully before making any modifications. This document outlines the core architecture, the strict aesthetic guidelines, and the technical standards established during the 2027 site-wide overhaul.

## 1. Project Overview & Tech Stack
"The J Effect" is an ultra-premium, luxury skincare e-commerce brand.
- **Framework**: Next.js 15 (App Router)
- **Styling**: 100% Custom Vanilla CSS (`app/globals.css`). **DO NOT** install Tailwind CSS or any external component libraries (e.g., Material UI, Chakra).
- **Icons**: Custom inline SVGs. **DO NOT** use unicode emojis (🌿, ✨, 🌊) anywhere in the UI. 
- **Images**: Next.js native `<Image />` component exclusively for automatic WebP compression and lazy loading. 

## 2. Brand & Aesthetic Guidelines (CRITICAL)
This site operates on a "2027 Luxury Standard." Every interaction must feel expensive, fluid, and intentional.
- **Typography**: 
  - Headings: `Playfair Display` (tight kerning, e.g., `letter-spacing: -0.02em`, tall line-heights).
  - Body: `DM Sans` (clean, highly legible).
- **Color Palette**: 
  - Dark Forest (`#243B27`)
  - Gold (`#C4954A`)
  - Cream (`#F7F3EC`)
  - *Rule*: Avoid flat hex codes in large areas. Use subtle radial gradients (e.g., in the footer and hero overlay) to create "velvet depth."
- **Micro-Interactions**:
  - **Blur-Reveals**: Elements should not just "fade up." They use a cinematic blur-reveal (`filter: blur(12px)` transitioning to `0px`).
  - **Glassmorphism**: Sticky headers and value cards use frosted-glass effects (`backdrop-filter: blur(24px)`).
  - **Magnetic Spring Physics**: Buttons, cards, and the Cart Drawer utilize custom `cubic-bezier` transition curves to mimic physical weight and iOS spring physics.

## 3. Directory Structure
```
jeffect-website/
├── app/
│   ├── about/             # Frosted-glass value cards, custom SVGs
│   ├── journal/           # Dynamic blog routing (app/journal/[slug]/page.js)
│   ├── ritual-guide/      # Editorial landing page with asymmetrical layout
│   ├── shop/              # Product grid and dynamic product pages ([slug])
│   ├── layout.js          # Global layout, SEO metadata, custom webkit scrollbar
│   ├── globals.css        # The heart of the styling, animations, and tokens
│   ├── loading.js         # Global fade-transition state
│   └── not-found.js       # Custom 404 with blur-reveal animations
├── components/
│   ├── Header.js          # Mega-menu, glassmorphism sticky header
│   ├── CartDrawer.js      # Spring physics drawer, polished empty state
│   ├── ThemeScript.js     # Client-side IntersectionObserver for .reveal classes
│   └── ...
├── context/
│   └── CartContext.js     # Global cart state & Stripe checkout initialization
└── lib/
    ├── products.js        # The pseudo-database (Products, Categories, Blog Posts)
    └── site-config.js     # Global SEO metadata and configuration
```

## 4. Key Mechanics to Maintain
- **Reveal Animations**: To animate an element on scroll, simply add the `.reveal` class to it. Add `.reveal--d1`, `.reveal--d2`, etc., for staggered delays. The `ThemeScript.js` component automatically observes these and adds the `.revealed` class when they enter the viewport.
- **Cart Context**: The cart logic (`useCart`) manages state globally and formats money values automatically. 
- **Dynamic SEO**: All dynamic routes (`app/shop/[slug]/page.js`, `app/journal/[slug]/page.js`) use the Next.js `generateMetadata` function. Do not hardcode `<title>` tags.

## 5. Next Steps / Verification
If you are running verification or proposing further improvements, ensure that your changes **do not degrade** the premium aesthetic. Any new components must utilize the existing CSS variables (e.g., `var(--ease)`, `var(--forest)`), the blur-reveal physics, and the custom SVG styling.
