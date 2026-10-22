-- ──────────────────────────────────────────────────────────────
-- THE J EFFECT — Supabase schema
--
-- Run once in the Supabase SQL editor (Dashboard → SQL → New query).
-- Safe to re-run: every statement is idempotent.
--
-- The static catalog in lib/catalog/*.js stays the source of truth for
-- long-form copy. Rows in `product_overrides` layer edits on top of it
-- (price, name, tags, images, SEO, publish state...), so the storefront
-- keeps working even if Supabase is unreachable.
-- ──────────────────────────────────────────────────────────────

-- ── Admin allowlist ─────────────────────────────────────────────
create table if not exists public.admins (
  email      text primary key,
  created_at timestamptz not null default now()
);

-- Add yourself (create the same user under Authentication → Users first):
--   insert into public.admins (email) values ('you@example.com')
--     on conflict do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

alter table public.admins enable row level security;
drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row" on public.admins
  for select to authenticated
  using (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

-- ── Product overrides ───────────────────────────────────────────
create table if not exists public.product_overrides (
  slug       text primary key,
  data       jsonb not null default '{}'::jsonb,   -- partial product fields
  images     jsonb,                                 -- ordered [{path,url,alt}]; null = catalog images
  published  boolean not null default true,
  updated_at timestamptz not null default now(),
  updated_by text
);

alter table public.product_overrides enable row level security;
drop policy if exists "overrides public read" on public.product_overrides;
create policy "overrides public read" on public.product_overrides
  for select to anon, authenticated using (true);
drop policy if exists "overrides admin write" on public.product_overrides;
create policy "overrides admin write" on public.product_overrides
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ── Site settings (announcement bar, etc.) ──────────────────────
create table if not exists public.site_settings (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
drop policy if exists "settings public read" on public.site_settings;
create policy "settings public read" on public.site_settings
  for select to anon, authenticated using (true);
drop policy if exists "settings admin write" on public.site_settings;
create policy "settings admin write" on public.site_settings
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ── Newsletter subscribers ──────────────────────────────────────
-- Inserted server-side with the service-role key (never from the browser).
create table if not exists public.subscribers (
  id                uuid primary key default gen_random_uuid(),
  email             text not null,
  status            text not null default 'subscribed'
                      check (status in ('subscribed', 'unsubscribed')),
  source            text,
  resend_contact_id text,
  created_at        timestamptz not null default now()
);
create unique index if not exists subscribers_email_key
  on public.subscribers (lower(email));

alter table public.subscribers enable row level security;
drop policy if exists "subscribers admin read" on public.subscribers;
create policy "subscribers admin read" on public.subscribers
  for select to authenticated using (public.is_admin());
drop policy if exists "subscribers admin update" on public.subscribers;
create policy "subscribers admin update" on public.subscribers
  for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists "subscribers admin delete" on public.subscribers;
create policy "subscribers admin delete" on public.subscribers
  for delete to authenticated using (public.is_admin());

-- ── Campaign log (email broadcasts sent through Resend) ─────────
create table if not exists public.campaigns (
  id                  uuid primary key default gen_random_uuid(),
  subject             text not null,
  preview_text        text,
  body                text not null,
  resend_broadcast_id text,
  status              text not null default 'draft',
  recipients          integer,
  created_by          text,
  created_at          timestamptz not null default now(),
  sent_at             timestamptz
);

alter table public.campaigns enable row level security;
drop policy if exists "campaigns admin all" on public.campaigns;
create policy "campaigns admin all" on public.campaigns
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ── Storage: public bucket for product images ───────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images', 'product-images', true, 8388608,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "product images public read" on storage.objects;
create policy "product images public read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'product-images');

drop policy if exists "product images admin insert" on storage.objects;
create policy "product images admin insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "product images admin update" on storage.objects;
create policy "product images admin update" on storage.objects
  for update to authenticated
  using (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "product images admin delete" on storage.objects;
create policy "product images admin delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'product-images' and public.is_admin());

-- ═════════ part 2 ═════════

-- ──────────────────────────────────────────────────────────────
-- THE J EFFECT — Supabase schema, part 2 (store admin)
--
-- Run AFTER supabase/schema.sql, in the Supabase SQL editor.
-- Safe to re-run: every statement is idempotent.
--
-- Orders, customers and abandoned checkouts are written by the Stripe
-- webhook (service role). Analytics events are written by /api/track
-- (service role). Everything else is edited by admins in /admin.
-- ──────────────────────────────────────────────────────────────

-- ── Customers ────────────────────────────────────────────────────
create table if not exists public.customers (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  name          text,
  phone         text,
  address       jsonb,
  marketing     boolean not null default false,
  stripe_customer_id text,
  tags          text[] not null default '{}',
  note          text,
  orders_count  integer not null default 0,
  total_spent   integer not null default 0,        -- cents
  last_order_at timestamptz,
  created_at    timestamptz not null default now()
);
create unique index if not exists customers_email_key on public.customers (lower(email));

-- ── Orders ───────────────────────────────────────────────────────
create sequence if not exists public.order_number_seq start 1001;
create table if not exists public.orders (
  id            uuid primary key default gen_random_uuid(),
  number        integer not null default nextval('public.order_number_seq'),
  source        text not null default 'online',     -- online | pos | draft
  stripe_session_id text,
  stripe_payment_intent text,
  customer_id   uuid references public.customers(id) on delete set null,
  email         text,
  name          text,
  status        text not null default 'paid',       -- paid | refunded | partially_refunded | pending | cancelled
  fulfillment   text not null default 'unfulfilled',-- unfulfilled | fulfilled
  currency      text not null default 'usd',
  subtotal      integer not null default 0,
  shipping      integer not null default 0,
  discount      integer not null default 0,
  tax           integer not null default 0,
  total         integer not null default 0,
  refunded      integer not null default 0,
  items         jsonb not null default '[]'::jsonb, -- [{slug,name,quantity,price,image}]
  shipping_address jsonb,
  shipping_method  text,
  discount_code text,
  note          text,
  tags          text[] not null default '{}',
  tracking      jsonb,                              -- {carrier,number,url}
  fulfilled_at  timestamptz,
  created_at    timestamptz not null default now()
);
create unique index if not exists orders_number_key on public.orders (number);
create unique index if not exists orders_session_key on public.orders (stripe_session_id) where stripe_session_id is not null;

create table if not exists public.draft_orders (
  id          uuid primary key default gen_random_uuid(),
  number      integer generated always as identity,
  email       text,
  name        text,
  items       jsonb not null default '[]'::jsonb,
  note        text,
  discount    integer not null default 0,
  shipping    integer not null default 0,
  total       integer not null default 0,
  status      text not null default 'open',         -- open | invoiced | completed
  payment_url text,
  created_at  timestamptz not null default now()
);

create table if not exists public.abandoned_checkouts (
  id          uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,
  email       text,
  items       jsonb not null default '[]'::jsonb,
  total       integer not null default 0,
  recovery_url text,
  recovered   boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ── Discounts and gift cards ────────────────────────────────────
create table if not exists public.discounts (
  id          uuid primary key default gen_random_uuid(),
  code        text not null,
  title       text,
  kind        text not null default 'percent',      -- percent | fixed | free_shipping
  value       integer not null default 0,           -- percent, or cents
  min_subtotal integer not null default 0,          -- cents
  usage_limit integer,
  used        integer not null default 0,
  starts_at   timestamptz,
  ends_at     timestamptz,
  active      boolean not null default true,
  stripe_coupon_id text,
  stripe_promo_id  text,
  created_at  timestamptz not null default now()
);
create unique index if not exists discounts_code_key on public.discounts (upper(code));

create table if not exists public.gift_cards (
  id          uuid primary key default gen_random_uuid(),
  code        text not null,
  initial_value integer not null default 0,         -- cents
  balance     integer not null default 0,
  email       text,
  note        text,
  expires_at  timestamptz,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);
create unique index if not exists gift_cards_code_key on public.gift_cards (upper(code));

-- ── Catalog extras ──────────────────────────────────────────────
create table if not exists public.collections (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  handle      text not null,
  description text,
  kind        text not null default 'manual',       -- manual | smart
  rule        text,                                 -- smart: category or tag the rule matches
  product_slugs text[] not null default '{}',
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);
create unique index if not exists collections_handle_key on public.collections (handle);

-- Products created in the admin (merged into the catalog by lib/store.js).
create table if not exists public.custom_products (
  slug        text primary key,
  data        jsonb not null default '{}'::jsonb,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.locations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  address     text,
  city        text,
  region      text,
  postal      text,
  country     text default 'United States',
  active      boolean not null default true,
  pos         boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists public.inventory (
  slug        text primary key,
  quantity    integer not null default 0,
  track       boolean not null default true,
  sku         text,
  barcode     text,
  allow_backorder boolean not null default false,
  updated_at  timestamptz not null default now()
);

create table if not exists public.purchase_orders (
  id          uuid primary key default gen_random_uuid(),
  number      integer generated always as identity,
  supplier    text not null,
  status      text not null default 'draft',        -- draft | ordered | received | cancelled
  expected_at date,
  items       jsonb not null default '[]'::jsonb,   -- [{slug,quantity,cost}]
  note        text,
  created_at  timestamptz not null default now()
);

create table if not exists public.transfers (
  id          uuid primary key default gen_random_uuid(),
  number      integer generated always as identity,
  from_location text,
  to_location text,
  status      text not null default 'draft',        -- draft | in_transit | received
  items       jsonb not null default '[]'::jsonb,
  note        text,
  created_at  timestamptz not null default now()
);

-- ── Customers: segments and B2B ─────────────────────────────────
create table if not exists public.segments (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  rule        text not null default 'all',          -- all | purchased | repeat | never | subscribed | abandoned_30
  created_at  timestamptz not null default now()
);

create table if not exists public.companies (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  contact_name text,
  email       text,
  phone       text,
  tax_id      text,
  payment_terms text default 'Due on receipt',      -- Due on receipt | Net 15 | Net 30 | Net 60
  discount_percent integer not null default 0,
  address     text,
  note        text,
  tags        text[] not null default '{}',
  created_at  timestamptz not null default now()
);

-- ── Markets, catalogs, rollouts ─────────────────────────────────
create table if not exists public.markets (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  regions     text,
  currency    text not null default 'USD',
  active      boolean not null default true,
  primary_market boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists public.catalogs (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  market      text,
  price_adjust integer not null default 0,          -- percent, negative = discount
  collection_handle text,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.metafield_definitions (
  id          uuid primary key default gen_random_uuid(),
  resource    text not null default 'Products',
  name        text not null,
  key         text,
  type        text not null default 'Single line text',
  description text,
  created_at  timestamptz not null default now()
);

create table if not exists public.rollouts (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  scheduled_at timestamptz,
  summary     text,
  status      text not null default 'scheduled',    -- scheduled | live | cancelled
  created_at  timestamptz not null default now()
);

-- ── Content ─────────────────────────────────────────────────────
create table if not exists public.pages (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  handle      text not null,
  body        text not null default '',
  published   boolean not null default true,
  updated_at  timestamptz not null default now(),
  created_at  timestamptz not null default now()
);
create unique index if not exists pages_handle_key on public.pages (handle);

create table if not exists public.blog_posts (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  handle      text not null,
  excerpt     text,
  body        text not null default '',
  author      text default 'The J Effect',
  published   boolean not null default false,
  published_at timestamptz,
  created_at  timestamptz not null default now()
);
create unique index if not exists blog_posts_handle_key on public.blog_posts (handle);

create table if not exists public.menus (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  handle      text not null,
  items       text not null default '',             -- one "Label | /url" per line
  created_at  timestamptz not null default now()
);
create unique index if not exists menus_handle_key on public.menus (handle);

create table if not exists public.metaobject_definitions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  type        text not null,
  fields      text not null default '',             -- one field name per line
  created_at  timestamptz not null default now()
);
create unique index if not exists metaobject_definitions_type_key on public.metaobject_definitions (type);

create table if not exists public.metaobjects (
  id          uuid primary key default gen_random_uuid(),
  type        text not null,
  title       text not null,
  data        jsonb not null default '{}'::jsonb,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.files (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  path        text not null,
  url         text not null,
  mime        text,
  size        integer,
  alt         text,
  created_at  timestamptz not null default now()
);

-- ── Analytics events (written by /api/track) ────────────────────
create table if not exists public.site_events (
  id          bigint generated always as identity primary key,
  session_id  text not null,
  kind        text not null default 'pageview',     -- pageview | add_to_cart | checkout
  path        text,
  referrer    text,
  source      text,                                 -- utm_source or referrer host
  device      text,                                 -- mobile | tablet | desktop
  product     text,
  created_at  timestamptz not null default now()
);
create index if not exists site_events_created_idx on public.site_events (created_at desc);
create index if not exists site_events_session_idx on public.site_events (session_id);

-- ── Row level security: admins only, service role bypasses ──────
do $$
declare t text;
begin
  foreach t in array array[
    'customers','orders','draft_orders','abandoned_checkouts','discounts','gift_cards',
    'collections','locations','inventory','purchase_orders','transfers','segments','companies',
    'markets','catalogs','rollouts','pages','blog_posts','menus','metaobject_definitions',
    'metaobjects','files','site_events','custom_products','metafield_definitions'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "admin all" on public.%I', t);
    execute format('create policy "admin all" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- Published pages and collections are readable by the storefront.
drop policy if exists "pages public read" on public.pages;
create policy "pages public read" on public.pages for select to anon, authenticated using (published);
drop policy if exists "blog public read" on public.blog_posts;
create policy "blog public read" on public.blog_posts for select to anon, authenticated using (published);
drop policy if exists "collections public read" on public.collections;
create policy "collections public read" on public.collections for select to anon, authenticated using (published);
drop policy if exists "custom products public read" on public.custom_products;
create policy "custom products public read" on public.custom_products for select to anon, authenticated using (true);
drop policy if exists "inventory public read" on public.inventory;
create policy "inventory public read" on public.inventory for select to anon, authenticated using (true);

-- Admins can list/manage who else is an admin.
drop policy if exists "admins manage" on public.admins;
create policy "admins manage" on public.admins for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Seed the two things Shopify ships with.
insert into public.markets (name, regions, currency, primary_market)
select 'United States', 'United States', 'USD', true
where not exists (select 1 from public.markets);
-- Locations: United States and Europe.
insert into public.locations (name, address, city, region, postal, country, pos)
select 'United States', '1600 Vine St', 'Los Angeles', 'CA', '90028', 'United States', true
where not exists (select 1 from public.locations where name = 'United States');
insert into public.locations (name, country, pos)
select 'Europe', 'Europe', false
where not exists (select 1 from public.locations where name = 'Europe');

-- Catalogs: one for everything, plus one per product category (US market).
insert into public.catalogs (name, market, price_adjust, collection_handle)
select v.name, 'United States', 0, v.handle
from (values
  ('All products', null),
  ('Serums', 'serums'), ('Moisturizers', 'moisturizers'), ('Cleansers', 'cleansers'), ('Face oils', 'face-oils'),
  ('Eye care', 'eye-care'), ('Treatments', 'treatments'), ('Masks', 'masks'), ('Body', 'body'),
  ('Ritual bars', 'ritual-bars'), ('Hair and scalp', 'hair-scalp')
) v(name, handle)
where not exists (select 1 from public.catalogs c where c.name = v.name);

insert into public.segments (name, rule)
select * from (values
  ('Customers who have purchased at least once', 'purchased'),
  ('Email subscribers', 'subscribed'),
  ('Abandoned checkouts in the last 30 days', 'abandoned_30'),
  ('Customers who have purchased more than once', 'repeat'),
  ('Customers who haven''t purchased', 'never')
) v(name, rule)
where not exists (select 1 from public.segments);

-- ═════════ make yourself an admin (create the login first: Authentication → Users → Add user) ═════════
insert into public.admins (email) values ('admin@artemisgaia.co') on conflict do nothing;
