import { CATEGORY_META, toCard } from '@/lib/products';
import { getProducts } from '@/lib/store';
import { itemListGraph, jsonLd } from '@/lib/seo';
import ShopGrid from './ShopGrid';

export const metadata = {
  title: 'Shop Clean Skincare, Serums & Ritual Bars',
  description:
    'Shop J Effect rituals: serums, cleanser, moisturizers, face oil, body care, handmade ritual bars and scalp care. Clean formulas, made in the USA.',
  alternates: { canonical: '/shop' },
  openGraph: { url: '/shop', title: 'Shop the Full Ritual | The J Effect' },
};

export default async function ShopPage() {
  const PRODUCTS = await getProducts();
  const FILTERS = [
    { label: 'All', value: 'all' },
    ...Object.entries(CATEGORY_META)
      .filter(([key]) => PRODUCTS.some((p) => p.category === key))
      .map(([value, meta]) => ({ label: meta.label, value })),
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemListGraph('Shop all The J Effect skincare', '/shop', PRODUCTS))} />
      <ShopGrid
        products={PRODUCTS.map(toCard)}
        filters={FILTERS}
        eyebrow="All Products"
        title="Shop the full ritual."
        intro="Clean, results-driven skincare crafted in the USA. Every product numbered, every formula designed to layer beautifully."
      />
    </>
  );
}
