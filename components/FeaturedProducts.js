import Link from 'next/link';
import { toCard } from '@/lib/products';
import { getFeaturedProducts } from '@/lib/store';
import ProductCard from './ProductCard';

export default async function FeaturedProducts({
  eyebrow = 'Daily Essentials',
  title = 'Curated for your skin.',
  viewAllLabel = 'View All Products',
  viewAllHref = '/shop',
  count = 4,
  products = null,
}) {
  const items = (products || (await getFeaturedProducts())).slice(0, count);

  return (
    <section className="featured-products">
      <div className="featured-products__inner">
        <div className="featured-products__header">
          <div>
            <div className="eyebrow reveal">{eyebrow}</div>
            <h2 className="section-title section-title--dark reveal reveal--d1">{title}</h2>
          </div>
          <Link href={viewAllHref} className="view-all-link reveal reveal--d2">
            {viewAllLabel} →
          </Link>
        </div>
        <div className="product-grid">
          {items.map((p) => (
            <ProductCard key={p.id} product={toCard(p)} />
          ))}
        </div>
      </div>
    </section>
  );
}
