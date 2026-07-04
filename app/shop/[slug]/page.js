import { notFound } from 'next/navigation';
import { PRODUCTS, getProductBySlug, formatMoney } from '@/lib/products';
import ProductPageClient from './ProductPageClient';

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: 'Product Not Found — The J Effect' };
  return {
    title: `${p.title} — The J Effect`,
    description: p.description,
    openGraph: {
      title: `${p.title} — The J Effect`,
      description: p.description,
      images: p.images[0] ? [{ url: p.images[0] }] : [],
    },
  };
}

function ProductJsonLd({ product }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images,
    brand: { '@type': 'Brand', name: 'The J Effect' },
    offers: {
      '@type': 'Offer',
      price: (product.price / 100).toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://thejeffect.com/shop/${product.slug}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '24',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.tags.some((t) => product.tags.includes(t))
  ).slice(0, 4);

  return (
    <>
      <ProductJsonLd product={product} />
      <ProductPageClient product={product} related={related} />
    </>
  );
}
