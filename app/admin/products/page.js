import { requireAdmin } from '@/lib/admin/auth';
import { getAllProducts } from '@/lib/store';
import { CATEGORY_META } from '@/lib/products';
import ProductTable from './ProductTable';

export const metadata = { title: 'Products' };
export const dynamic = 'force-dynamic';

export default async function AdminProducts() {
  await requireAdmin();
  const products = await getAllProducts();

  const rows = products.map((p) => ({
    slug: p.slug,
    no: p.no,
    name: p.name,
    descriptor: p.descriptor,
    category: p.category,
    categoryLabel: CATEGORY_META[p.category]?.label || p.category,
    price: p.price,
    size: p.size,
    image: p.images[0] || '',
    published: p.published,
    sold_out: Boolean(p.sold_out),
    edited: Boolean(p.edited),
    bestseller: p.tags.includes('bestseller'),
  }));

  const categories = Object.entries(CATEGORY_META)
    .filter(([key]) => rows.some((r) => r.category === key))
    .map(([value, m]) => ({ value, label: m.label }));

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Products</h1>
          <p>{products.length} products. Open one to change its copy, price, photos, SEO and visibility.</p>
        </div>
      </header>
      <ProductTable rows={rows} categories={categories} />
    </>
  );
}
