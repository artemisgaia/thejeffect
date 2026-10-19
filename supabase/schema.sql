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
