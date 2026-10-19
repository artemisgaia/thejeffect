# ✦ The J Effect — AI Handoff & Architecture Guide

Welcome! If you are an AI assistant (like Claude) taking over this project, please read this document carefully before making any modifications. This document outlines the core architecture, the strict aesthetic guidelines, and the technical standards established during the 2027 site-wide overhaul.

## 1. Project Overview & Tech Stack
"The J Effect" is an ultra-premium, luxury skincare e-commerce brand.
- **Framework**: Next.js 16 (App Router, Turbopack), React 19. `AGENTS.md` applies: read `node_modules/next/dist/docs/` before writing Next code (e.g. `middleware` is now `proxy.js`, `revalidateTag` takes a second argument).
- **Styling**: 100% custom vanilla CSS in `app/styles/*.css`. **DO NOT** install Tailwind CSS or any component library.
- **Icons**: custom inline SVGs. **DO NOT** use emojis in the UI.
- **Images**: `next/image` only. Site photo spots are named slots rendered with `<SiteImage slot="..." />` (see `lib/site-slots.js`); never hotlink stock photos.
- **Data**: static catalog in `lib/catalog/*` plus Supabase overrides managed in `/admin` (see `lib/store.js`, `supabase/schema.sql`). Read products through `lib/store.js` (async), never import `PRODUCTS` into pages.
- **Email / forms**: Resend (newsletter, campaigns), Formspree (contact), via `app/api/*`.

## 2. Brand & Aesthetic Guidelines (CRITICAL)
Calm, spacious, expensive. When in doubt, remove something: one idea per section, generous whitespace, few elements on screen.
- **Typography**:
  - Display: `Cormorant Garamond` (`var(--font-display)`), tight tracking, italic gold accent word in headlines (`*word*` in component props becomes `<em>`).
  - Body: `DM Sans` (`var(--font-body)`).
  - Loaded with `next/font` in `app/layout.js`; never hardcode font names.
- **Color Palette** (tokens in `app/styles/base.css`):
  - Dark Forest `--forest` `#243B27`, Gold `--gold` `#C4954A`, Cream `--cream` `#F7F3EC`, and `--pack` `#EEE7DC` (packaging render background).
  - Large areas use subtle radial gradients ("velvet depth"), not flat fills.
- **Signature shape**: the arch (`border-radius: var(--arch)`) frames hero, category, ritual, story and About imagery.
- **Motion**: `.reveal` blur-reveal on scroll (`.reveal--d1..d6` for stagger), spring easing on buttons and cards, glass header. `prefers-reduced-motion` is respected globally.
- **Accessibility**: no custom cursor, visible `:focus-visible` rings, skip link, labelled controls.

## 3. Directory Structure
```
app/
├── (site)/                # Storefront (layout adds header, footer, cart drawer)
│   ├── page.js            # Home: hero, categories, featured, ritual, reviews, story, email
│   ├── shop/ about/ journal/ ritual-guide/ contact/ cart/ faq/ ...
├── admin/                 # Admin dashboard (own layout, noindex, Supabase auth)
├── api/                   # checkout (server-priced), newsletter (Resend), contact (Formspree)
├── styles/                # base · chrome · catalog · home · inner · pages(legacy page styles)
├── layout.js              # Root: fonts, metadata, JSON-LD
└── not-found.js
components/                # Header, Footer, Hero, ProductCard, SiteImage, SiteChrome, ...
context/CartContext.js     # Cart in an external store (localStorage, cross-tab)
lib/
├── store.js               # Storefront data layer (catalog + Supabase overrides). Server only.
├── products.js            # Static catalog assembly, categories, journal posts
├── catalog/*              # Long-form product copy
├── site-slots.js          # Named site photo spots + generation prompts
└── supabase/              # server, browser, service-role clients
proxy.js                   # Guards /admin, refreshes session
supabase/schema.sql        # Tables, RLS, storage bucket
```

## 4. Key Mechanics to Maintain
- **Reveal Animations**: To animate an element on scroll, simply add the `.reveal` class to it. Add `.reveal--d1`, `.reveal--d2`, etc., for staggered delays. The `ThemeScript.js` component automatically observes these and adds the `.revealed` class when they enter the viewport.
- **Cart Context**: The cart logic (`useCart`) manages state globally and formats money values automatically. 
- **Dynamic SEO**: All dynamic routes (`app/shop/[slug]/page.js`, `app/journal/[slug]/page.js`) use the Next.js `generateMetadata` function. Do not hardcode `<title>` tags.

## 5. Next Steps / Verification
If you are running verification or proposing further improvements, ensure that your changes **do not degrade** the premium aesthetic. Any new components must utilize the existing CSS variables (e.g., `var(--ease)`, `var(--forest)`), the blur-reveal physics, and the custom SVG styling.
