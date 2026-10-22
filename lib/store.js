// ──────────────────────────────────────────────────────────────
// THE J EFFECT — Storefront data layer (server only)
//
// The static catalog (lib/products.js + lib/catalog/*) holds the long-form
// copy. Edits made in the admin are stored in Supabase as per-product
// overrides and merged on top here. If Supabase is not configured or is
// unreachable, the storefront serves the static catalog unchanged.
// ──────────────────────────────────────────────────────────────
import 'server-only';
import { PRODUCTS as CATALOG_PRODUCTS, FEATURED_SLUGS, CATEGORY_META, normalizeProduct } from './products';
import { SUPABASE_URL, SUPABASE_ANON_KEY, supabaseConfigured } from './supabase/config';
import { previewEnabled, previewClient } from './admin/preview-db';

export const PRODUCTS_TAG = 'products';
export const SETTINGS_TAG = 'settings';

async function rest(table, tag) {
  // Local admin demo mode reads the in-memory demo database instead of Supabase.
  if (previewEnabled) return (await previewClient().from(table).select('*')).data;
  if (!supabaseConfigured) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      next: { tags: [tag], revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function getOverrides() {
  const rows = await rest('product_overrides', PRODUCTS_TAG);
  return new Map((rows || []).map((r) => [r.slug, r]));
}

const num = (v) => (Number.isFinite(v) ? v : null);

// Products created in the admin (public.custom_products) become full catalog entries.
function customToBase(row, idx) {
  const d = row.data || {};
  const cat = CATEGORY_META[d.category] ? d.category : 'serum';
  const meta = CATEGORY_META[cat];
  const base = normalizeProduct({
    no: 100 + idx, slug: row.slug, name: d.name || row.slug, descriptor: d.descriptor || '', category: cat,
    type: d.type || meta.label.replace(/s$/, ''), step: '', ritual: d.ritual || 'AM + PM',
    price: Number.isFinite(d.price) ? d.price : 0, size: d.size || '', tags: Array.isArray(d.tags) ? d.tags : [],
    tagline: d.tagline || '', short: d.short || '', story: d.short ? [d.short] : [], benefits: Array.isArray(d.benefits) ? d.benefits : [],
    key_ingredients: [], ingredients: d.ingredients || '', how_to_use: Array.isArray(d.how_to_use) ? d.how_to_use : [],
    texture: '', scent: '', skin_types: [], badges: [], pairs_with: [], faqs: [], warnings: '', quote: '',
    seo: { title: `${d.name || ''} ${d.descriptor || ''}`.trim(), description: d.short || '', keywords: [] },
  });
  return { ...base, published: row.published !== false, custom: true };
}

export const INVENTORY_TAG = 'inventory';

// Catalog + admin-created products, before overrides. Used by the admin and by getAllProducts.
export async function getBaseProducts() {
  const rows = (await rest('custom_products', PRODUCTS_TAG)) || [];
  const custom = rows
    .filter((r) => !CATALOG_PRODUCTS.some((p) => p.slug === r.slug))
    .sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)))
    .map(customToBase);
  return [...CATALOG_PRODUCTS, ...custom];
}

export function applyOverride(p, row) {
  if (!row) return p;
  const d = row.data || {};

  const name = d.name || p.name;
  const descriptor = d.descriptor || p.descriptor;
  const size = d.size || p.size;
  const price = num(d.price) ?? p.price;
  const compare = num(d.compare_at_price);
  const stripe_price_id =
    d.stripe_price_id && d.stripe_price_id.startsWith('price_') ? d.stripe_price_id : p.stripe_price_id;

  const tags = new Set([p.category, ...(Array.isArray(d.tags) ? d.tags : p.tags)]);
  if (d.bestseller === true) tags.add('bestseller');
  if (d.bestseller === false) tags.delete('bestseller');
  if (d.is_new === true) tags.add('new');
  if (d.is_new === false) tags.delete('new');

  let { gallery } = p;
  if (Array.isArray(row.images) && row.images.length > 0) {
    gallery = row.images.map((img, i) => ({
      kind: i === 0 ? 'hero' : 'custom',
      src: img.url,
      alt: img.alt || `${name} ${descriptor}`,
    }));
  }

  return {
    ...p,
    name,
    descriptor,
    tagline: d.tagline || p.tagline,
    short: d.short || p.short,
    size,
    price,
    compare_at_price: compare && compare > price ? compare : null,
    stripe_price_id,
    title: p.collection ? `${p.collection} ${name}` : `${name} ${descriptor}`,
    variants: [{ id: `var_${p.slug}`, label: size, price, stripe_price_id }],
    tags: [...tags],
    seo: {
      ...p.seo,
      title: d.seo?.title || p.seo.title,
      description: d.seo?.description || p.seo.description,
    },
    sold_out: d.sold_out === true,
    featured: d.featured ?? FEATURED_SLUGS.includes(p.slug),
    featured_at: row.updated_at || null,
    gallery,
    images: gallery.map((g) => g.src),
    published: row.published !== false,
    edited: true,
  };
}

// Every product, including unpublished ones. Used by the admin and checkout.
export async function getAllProducts() {
  const [base, overrides, invRows] = await Promise.all([getBaseProducts(), getOverrides(), rest('inventory', INVENTORY_TAG)]);
  const inv = new Map((invRows || []).map((r) => [r.slug, r]));
  return base.map((p) => {
    const merged = applyOverride(p, overrides.get(p.slug));
    const i = inv.get(p.slug);
    // Tracked stock at zero (and no backorders) marks the product sold out.
    if (i && i.track && i.quantity <= 0 && !i.allow_backorder) return { ...merged, sold_out: true };
    return merged;
  });
}

// Storefront catalog: unpublished products are hidden everywhere.
export async function getProducts() {
  return (await getAllProducts()).filter((p) => p.published !== false);
}

export async function getProduct(slug) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}

// Homepage "Daily Essentials". Defaults come from FEATURED_SLUGS; the admin can
// feature or un-feature any product. Newly featured products lead the row.
export async function getFeaturedProducts() {
  const products = await getProducts();
  const defaults = new Set(FEATURED_SLUGS);
  const featured = products.filter((p) => (p.edited ? p.featured : defaults.has(p.slug)));
  const rank = (p) => (defaults.has(p.slug) ? FEATURED_SLUGS.indexOf(p.slug) + 1000 : 0);
  return featured.sort((a, b) =>
    rank(a) - rank(b) || String(b.featured_at).localeCompare(String(a.featured_at)));
}

// "Complete the ritual": hand-picked pairings, in order.
export function pairingsOf(p, products) {
  const bySlug = new Map(products.map((q) => [q.slug, q]));
  return (p.pairs_with || []).map((s) => bySlug.get(s)).filter(Boolean);
}

// Related: same category first, then shared concern tags.
export function relatedOf(p, products, limit = 4) {
  const exclude = new Set([p.slug, ...(p.pairs_with || [])]);
  const score = (q) =>
    (q.category === p.category ? 10 : 0) + q.tags.filter((t) => p.tags.includes(t)).length;
  return products
    .filter((q) => !exclude.has(q.slug))
    .map((q) => [score(q), q])
    .filter(([s]) => s > 1)
    .sort((a, b) => b[0] - a[0] || a[1].no - b[1].no)
    .slice(0, limit)
    .map(([, q]) => q);
}

// ── Site settings ───────────────────────────────────────────────
// Returns only what the admin has saved. `announcement` is null until
// edited, in which case the Header falls back to the default in site-config.
export async function getSiteSettings() {
  const rows = await rest('site_settings', SETTINGS_TAG);
  const byKey = Object.fromEntries((rows || []).map((r) => [r.key, r.value]));
  return { announcement: byKey.announcement || null };
}
