import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { applyOverride } from '@/lib/store';
import { PRODUCTS, FEATURED_SLUGS } from '@/lib/products';
import ProductForm from './ProductForm';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = PRODUCTS.find((x) => x.slug === slug);
  return { title: p ? p.name : 'Product' };
}

export default async function AdminProductPage({ params }) {
  const { supabase } = await requireAdmin();
  const { slug } = await params;
  const base = PRODUCTS.find((p) => p.slug === slug);
  if (!base) notFound();

  const { data: row } = await supabase.from('product_overrides').select('*').eq('slug', slug).maybeSingle();
  const p = applyOverride(base, row);

  const dollars = (cents) => (cents == null ? '' : (cents / 100).toFixed(2));
  const initial = {
    slug,
    name: p.name,
    descriptor: p.descriptor,
    tagline: p.tagline,
    short: p.short,
    size: p.size,
    price: dollars(p.price),
    compare_at_price: dollars(p.compare_at_price),
    tags: p.tags.filter((t) => ![p.category, 'bestseller', 'new'].includes(t)).join(', '),
    published: p.published !== false,
    bestseller: p.tags.includes('bestseller'),
    is_new: p.tags.includes('new'),
    featured: row ? Boolean(p.featured) : FEATURED_SLUGS.includes(slug),
    sold_out: Boolean(p.sold_out),
    seoTitle: p.seo.title,
    seoDescription: p.seo.description,
    images: Array.isArray(row?.images) ? row.images : [],
  };
  const catalogImages = base.gallery.map((g) => ({ src: g.src, alt: g.alt }));

  return (
    <>
      <header className="adm-head">
        <div>
          <Link href="/admin/products" className="adm-crumb">← All products</Link>
          <h1>{p.name}</h1>
          <p>Nº {String(p.no).padStart(2, '0')} · {p.descriptor} · SKU {p.sku}</p>
        </div>
        <Link href={`/shop/${slug}`} target="_blank" className="adm-btn">View on site ↗</Link>
      </header>
      <ProductForm initial={initial} catalogImages={catalogImages} hasOverride={Boolean(row)} />
    </>
  );
}
