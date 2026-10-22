# The J Effect admin (Shopify-style)

Sign in at `/admin/login`. Layout, navigation and screens follow Shopify's admin:
Home, Orders (Drafts, Abandoned checkouts), Products (Collections, Inventory, Purchase orders,
Transfers, Gift cards), Customers (Segments, Companies, Email subscribers), Growth (Attribution,
Campaigns), Discounts, Content (Metaobjects, Files, Menus, Blog posts), Markets (Catalogs, Rollouts),
Analytics (Reports, Live View), Online Store (Themes view-only, Pages, Preferences), Point of Sale,
and Settings (its own sidebar, like Shopify).

## One-time setup
1. Supabase → SQL editor: run `supabase/schema.sql`, then `supabase/schema_v2.sql` (both safe to re-run).
2. Supabase → Authentication → Users → add your user; then `insert into public.admins (email) values ('you@…');`
3. Vercel env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
   `NEXT_PUBLIC_SITE_URL`. Later: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_*`, `FORMSPREE_FORM_ID`.
4. Stripe → Developers → Webhooks → endpoint `https://www.thejeffect.com/api/stripe/webhook`, events
   `checkout.session.completed`, `checkout.session.expired`, `charge.refunded`.

## Where data comes from
- **Orders, customers, abandoned checkouts**: written by the Stripe webhook (`app/api/stripe/webhook`). Empty until Stripe is live.
- **Sessions, sources, devices, funnel, Live View**: first-party tracking (`lib/track.js` → `/api/track` → `site_events`), next to Vercel Analytics.
- **2026 revenue / profit / cash**: `lib/admin/history.js`, copied from Artemis Private Office → Financials. Shown as imported history.
- **Discounts**: percent/fixed codes become Stripe coupons + promotion codes (Stripe Checkout validates them).
- **Inventory**: tracked products at 0 show as sold out; webhook and POS reduce stock.
- **Products created in the admin**: `custom_products` table, merged into the catalog by `lib/store.js`.
- **Shipping rates / free-shipping threshold**: Settings → Shipping and delivery (read by `/api/checkout`).
- **Announcement bar, pages (`/pages/<handle>`), product edits**: live on the storefront.

## Local demo mode (never in production)
Set `ADMIN_PREVIEW=1` in `.env.local` to open `/admin` with no login and in-memory demo data
(`lib/admin/preview-db.js`). It is hard-disabled when `NODE_ENV=production`.

## Not wired to the storefront yet
Menus, Blog posts, Metaobjects, Files, Markets/Catalogs/Rollouts, notification and policy text are stored
and editable but the storefront does not read them yet (navigation, journal and policies are still in code).
