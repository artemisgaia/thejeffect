# The J Effect

Ultra-premium clean skincare storefront. Next.js 16 (App Router), React 19, vanilla CSS, Stripe checkout, Supabase (data, photos, admin), Resend (email) and Formspree (contact form).

## Run it

```bash
npm install
cp .env.local.example .env.local   # fill in keys (see below)
npm run dev                         # http://localhost:3000
```

The storefront works with no keys at all: it serves the static catalog in `lib/catalog/*`. Each key you add switches on one capability.

## Connect the services

| Service | What it powers | Keys |
| --- | --- | --- |
| **Stripe** | Checkout. Prices come from the catalog/admin, so no Price IDs are needed. | `STRIPE_SECRET_KEY` |
| **Supabase** | Admin login, product edits, photo uploads, subscriber list | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| **Resend** | Welcome email, campaigns from the admin | `RESEND_API_KEY`, `RESEND_SEGMENT_ID`, `RESEND_FROM` |
| **Formspree** | Contact page messages | `FORMSPREE_FORM_ID` |

### Supabase setup (once)

1. Create a project at supabase.com and copy the URL, anon key and service-role key into `.env.local` (and Vercel).
2. Open **SQL editor**, paste `supabase/schema.sql` and run it. It is safe to re-run.
3. **Authentication → Users → Add user** with your email and a strong password.
4. In the SQL editor run: `insert into public.admins (email) values ('you@example.com');`
5. Visit `/admin` and sign in.

### Resend setup

Verify your sending domain in Resend, create a **Segment** for subscribers and put its ID in `RESEND_SEGMENT_ID`. `RESEND_FROM` must use the verified domain.

## The admin (`/admin`)

- **Products:** edit name, descriptor, copy, price, compare-at price, size, tags, badges, sold-out and visibility, SEO title and description, and upload, reorder or remove photos. Changes go live immediately.
- **Subscribers:** list, remove, export CSV.
- **Campaigns:** compose in the brand email template, send a test, send to the list via Resend.
- **Settings:** the announcement bar.

Edits are stored as overrides on top of the static catalog (`product_overrides`), only for fields that differ, so long-form copy still comes from `lib/catalog/*`. "Revert to catalog version" removes the overrides.

## Images

- **Product photos:** prompts in `docs/KLING_PROMPTS.md`. Save as `photos-inbox/<slug>-<shot>.png`, then `npm run images:sync`.
- **Site photos (hero, categories, About, Journal, Ritual Guide):** 22 named slots in `lib/site-slots.js`. Prompts in `docs/SITE_IMAGE_PROMPTS.md` (regenerate with `npm run prompts:site`). Save as `photos-inbox/site-<slot>.png`, then `npm run images:sync`.
- Until a photo exists, each slot shows the product packaging render inside its arch frame.
- Photos uploaded in the admin are served from Supabase Storage.

## Project map

```
app/
  (site)/        storefront pages (shared header, footer, cart)
  admin/         admin dashboard (own layout, noindex)
  api/           checkout, newsletter, contact
  styles/        base · chrome · catalog · home · inner · pages (legacy page styles)
components/      Header, Footer, Hero, ProductCard, SiteImage, ...
lib/
  store.js       storefront data layer (catalog + Supabase overrides)
  site-slots.js  site image slots and prompts
  supabase/      clients (server, browser, service-role)
proxy.js         guards /admin and refreshes the session
supabase/        schema.sql
```

See `AI_HANDOFF.md` for the design rules.
