'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

const FILTERS = [
  { label: 'All',          value: 'all' },
  { label: 'Serums',       value: 'serum' },
  { label: 'Moisturizers', value: 'moisturizer' },
  { label: 'Cleansers',    value: 'cleanser' },
  { label: 'Toners',       value: 'toner' },
  { label: 'Face Oils',    value: 'face-oil' },
  { label: 'Eye Care',     value: 'eye-care' },
  { label: 'Masks',        value: 'mask' },
  { label: 'Ritual Bars',  value: 'ritual-bar' },
  { label: 'Body',         value: 'body' },
  { label: 'Hair',         value: 'hair' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';
  const [active, setActive] = useState(initialFilter);

  const filtered = active === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.tags.includes(active) || p.type.toLowerCase().includes(active));

  return (
    <>
      {/* Collection Hero */}
      <div className="collection-hero">
        <div className="collection-hero__inner">
          <div className="eyebrow eyebrow--light reveal">All Products</div>
          <h1 className="section-title section-title--light reveal reveal--d1">
            Shop the full ritual.
          </h1>
          <p className="collection-hero__sub reveal reveal--d2">
            Clean, results-driven skincare crafted in the USA. Every product designed to layer beautifully.
          </p>
          <div className="collection-hero__count reveal reveal--d3">{filtered.length} products</div>
        </div>
      </div>

      {/* Filters */}
      <div className="collection-filters">
        <span className="filter-label">Filter:</span>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`filter-btn${active === f.value ? ' is-active' : ''}`}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="collection-main">
        {filtered.length > 0 ? (
          <div className="collection-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="collection-empty">No products found for this category.</div>
        )}
      </div>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ padding: '120px 24px', textAlign: 'center', color: 'var(--ink-muted)' }}>Loading…</div>}>
      <ShopContent />
    </Suspense>
  );
}
