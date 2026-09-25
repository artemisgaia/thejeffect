import { notFound } from 'next/navigation';
import { PRODUCTS, CATEGORY_META, toCard } from '@/lib/products';
import { itemListGraph, jsonLd, categoryUrl } from '@/lib/seo';
import ShopGrid from '../../ShopGrid';

export const dynamicParams = false;

const byPath = (path) => Object.entries(CATEGORY_META).find(([, m]) => m.path === path);

export function generateStaticParams() {
  return Object.entries(CATEGORY_META)
    .filter(([key]) => PRODUCTS.some((p) => p.category === key))
    .map(([, m]) => ({ category: m.path }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const entry = byPath(category);
  if (!entry) return {};
  const [key, meta] = entry;
  return {
    title: meta.seoTitle,
    description: meta.seoDescription,
    alternates: { canonical: categoryUrl(key) },
    openGraph: { url: categoryUrl(key), title: `${meta.seoTitle} | The J Effect`, description: meta.seoDescription },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const entry = byPath(category);
  if (!entry) notFound();
  const [key, meta] = entry;
  const products = PRODUCTS.filter((p) => p.category === key);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(itemListGraph(meta.seoTitle, categoryUrl(key), products))} />
      <ShopGrid
        products={products.map(toCard)}
        filters={[]}
        eyebrow={meta.eyebrow}
        title={meta.h1}
        intro={meta.intro}
      />
    </>
  );
}
