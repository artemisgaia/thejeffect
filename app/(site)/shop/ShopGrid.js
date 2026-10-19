'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';

function Grid({ products, filters, eyebrow, title, intro }) {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(searchParams.get('filter') || 'all');

  const filtered = active === 'all'
    ? products
    : products.filter((p) => p.category === active || p.tags.includes(active));

  return (
    <>
      <div className="collection-hero">
        <div className="collection-hero__inner">
          <div className="eyebrow eyebrow--light reveal">{eyebrow}</div>
          <h1 className="section-title section-title--light reveal reveal--d1">{title}</h1>
          <p className="collection-hero__sub reveal reveal--d2">{intro}</p>
          <div className="collection-hero__count reveal reveal--d3">{filtered.length} products</div>
        </div>
      </div>

      {filters.length > 0 && (
        <div className="collection-filters">
          <span className="filter-label">Filter:</span>
          {filters.map((f) => (
            <button
              key={f.value}
              className={`filter-btn${active === f.value ? ' is-active' : ''}`}
              onClick={() => setActive(f.value)}
              aria-pressed={active === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="collection-main">
        {filtered.length > 0 ? (
          <div className="collection-grid">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="collection-empty">No products found for this category.</div>
        )}
      </div>
    </>
  );
}

export default function ShopGrid(props) {
  return (
    <Suspense fallback={<div style={{ padding: '120px 24px', textAlign: 'center', color: 'var(--ink-muted)' }}>Loading…</div>}>
      <Grid {...props} />
    </Suspense>
  );
}
