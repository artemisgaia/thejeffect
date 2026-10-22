'use server';
import { revalidatePath, updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { CATEGORY_META } from '@/lib/products';
import { PRODUCTS_TAG, getBaseProducts } from '@/lib/store';
import { slugify, toCents } from '@/lib/admin/format';

export async function createProduct(_p, fd) {
  const { supabase } = await requireAdmin();
  const text = (k, max = 2000) => String(fd.get(k) ?? '').trim().slice(0, max);
  const name = text('name', 120);
  const descriptor = text('descriptor', 160);
  const category = text('category', 40);
  const price = toCents(fd.get('price'));
  if (!name) return { error: 'Give the product a name.' };
  if (!CATEGORY_META[category]) return { error: 'Choose a category.' };
  if (!(price > 0)) return { error: 'Enter a price greater than $0.' };
  const slug = slugify(text('slug', 80) || `${name} ${descriptor}`);
  if (!slug) return { error: 'Could not create a URL from that name.' };
  if ((await getBaseProducts()).some((p) => p.slug === slug)) return { error: 'A product with that URL already exists.' };

  const lines = (k) => text(k, 4000).split('\n').map((s) => s.trim()).filter(Boolean);
  const data = {
    name, descriptor, category, price, size: text('size', 60), short: text('short', 1200), tagline: text('tagline', 240),
    ingredients: text('ingredients', 4000), how_to_use: lines('how_to_use'), benefits: lines('benefits'),
    tags: text('tags', 300).split(',').map((s) => s.trim()).filter(Boolean), type: text('type', 60),
  };
  const { error } = await supabase.from('custom_products').insert({ slug, data, published: fd.has('published') });
  if (error) return { error: error.message };
  updateTag(PRODUCTS_TAG);
  revalidatePath('/shop');
  revalidatePath('/admin/products');
  redirect(`/admin/products/${slug}`);
}
