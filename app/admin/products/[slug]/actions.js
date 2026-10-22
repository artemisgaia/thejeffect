'use server';
import { revalidatePath, updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { FEATURED_SLUGS } from '@/lib/products';
import { PRODUCTS_TAG, getBaseProducts } from '@/lib/store';
import { SUPABASE_URL } from '@/lib/supabase/config';

const BUCKET = 'product-images';
const PUBLIC_PREFIX = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`;
const NON_CUSTOM_TAGS = ['bestseller', 'new'];

function refreshStorefront(slug) {
  updateTag(PRODUCTS_TAG);
  revalidatePath('/', 'layout');
  revalidatePath(`/admin/products/${slug}`);
}

function parseImages(raw, slug) {
  let list;
  try { list = JSON.parse(raw || '[]'); } catch { return null; }
  if (!Array.isArray(list)) return null;
  return list
    .filter((i) => i && typeof i.url === 'string' && typeof i.path === 'string')
    // Only accept files that live in our bucket under this product's folder.
    .filter((i) => i.url === `${PUBLIC_PREFIX}${i.path}` && i.path.startsWith(`${slug}/`))
    .slice(0, 12)
    .map((i) => ({ path: i.path, url: i.url, alt: String(i.alt || '').slice(0, 200) }));
}

const sameSet = (a, b) => a.length === b.length && [...a].sort().every((v, i) => v === [...b].sort()[i]);

export async function saveProduct(prevState, formData) {
  const { supabase, user } = await requireAdmin();

  const slug = String(formData.get('slug') || '');
  const base = (await getBaseProducts()).find((p) => p.slug === slug);
  if (!base) return { error: 'Unknown product.' };

  const text = (k, max = 2000) => String(formData.get(k) ?? '').trim().slice(0, max);
  const money = (k) => {
    const v = text(k, 12);
    if (v === '') return null;
    const n = Number(v);
    return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) : NaN;
  };

  const name = text('name', 120);
  const descriptor = text('descriptor', 160);
  const tagline = text('tagline', 240);
  const short = text('short', 1200);
  const size = text('size', 60);
  if (!name || !descriptor || !size) return { error: 'Name, descriptor and size are required.' };

  const price = money('price');
  if (price === null || Number.isNaN(price) || price <= 0) return { error: 'Enter a valid price greater than $0.' };
  const compare = money('compare_at_price');
  if (Number.isNaN(compare)) return { error: 'Compare-at price is not a valid amount.' };
  if (compare !== null && compare <= price) return { error: 'Compare-at price must be higher than the price (or left empty).' };

  const baseCustomTags = base.tags.filter((t) => t !== base.category && !NON_CUSTOM_TAGS.includes(t));
  const tags = [...new Set(
    text('tags', 600).split(',').map((t) => t.trim().toLowerCase().replace(/\s+/g, '-')).filter(Boolean),
  )].filter((t) => t !== base.category && !NON_CUSTOM_TAGS.includes(t));

  const bestseller = formData.has('bestseller');
  const isNew = formData.has('is_new');
  const featured = formData.has('featured');
  const soldOut = formData.has('sold_out');
  const published = formData.has('published');

  const images = parseImages(formData.get('images'), slug);
  if (images === null) return { error: 'Image list was invalid. Reload the page and try again.' };

  const seoTitle = text('seo_title', 120);
  const seoDescription = text('seo_description', 320);

  // Store only what differs from the catalog, so future catalog edits still flow through.
  const data = {};
  const diff = (key, val, baseVal) => { if (val !== baseVal) data[key] = val; };
  diff('name', name, base.name);
  diff('descriptor', descriptor, base.descriptor);
  diff('tagline', tagline, base.tagline);
  diff('short', short, base.short);
  diff('size', size, base.size);
  diff('price', price, base.price);
  if (compare !== null) data.compare_at_price = compare;
  if (!sameSet(tags, baseCustomTags)) data.tags = tags;
  diff('bestseller', bestseller, base.tags.includes('bestseller'));
  diff('is_new', isNew, base.tags.includes('new'));
  diff('featured', featured, FEATURED_SLUGS.includes(slug));
  if (soldOut) data.sold_out = true;
  const seo = {};
  if (seoTitle && seoTitle !== base.seo.title) seo.title = seoTitle;
  if (seoDescription && seoDescription !== base.seo.description) seo.description = seoDescription;
  if (Object.keys(seo).length) data.seo = seo;

  const { data: existing } = await supabase.from('product_overrides').select('images').eq('slug', slug).maybeSingle();
  const oldPaths = (existing?.images || []).map((i) => i.path);

  const nothingChanged = Object.keys(data).length === 0 && images.length === 0 && published;
  if (nothingChanged) {
    if (existing) {
      const { error } = await supabase.from('product_overrides').delete().eq('slug', slug);
      if (error) return { error: error.message };
    }
  } else {
    const { error } = await supabase.from('product_overrides').upsert({
      slug,
      data,
      images: images.length ? images : null,
      published,
      updated_at: new Date().toISOString(),
      updated_by: user.email,
    });
    if (error) return { error: error.message };
  }

  // Remove files that are no longer referenced.
  const keep = new Set(images.map((i) => i.path));
  const orphaned = oldPaths.filter((p) => !keep.has(p));
  if (orphaned.length) await supabase.storage.from(BUCKET).remove(orphaned);

  refreshStorefront(slug);
  return { ok: true, message: 'Saved. The change is live on the storefront.', at: Date.now() };
}

export async function resetProduct(formData) {
  const { supabase } = await requireAdmin();
  const slug = String(formData.get('slug') || '');
  if (!(await getBaseProducts()).some((p) => p.slug === slug)) return;

  const { data: existing } = await supabase.from('product_overrides').select('images').eq('slug', slug).maybeSingle();
  await supabase.from('product_overrides').delete().eq('slug', slug);
  const paths = (existing?.images || []).map((i) => i.path);
  if (paths.length) await supabase.storage.from(BUCKET).remove(paths);

  refreshStorefront(slug);
  redirect(`/admin/products/${slug}`);
}
