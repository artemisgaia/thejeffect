import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES, CATEGORY_META } from '@/lib/products';

export default function CategoryCards({
  eyebrow = 'Shop By Ritual',
  title = 'Find your perfect daily ritual.',
  categories = CATEGORIES,
}) {
  return (
    <section className="categories">
      <div className="categories__inner">
        <div className="categories__header">
          <div className="eyebrow reveal">{eyebrow}</div>
          <h2 className="section-title section-title--dark reveal reveal--d1">{title}</h2>
        </div>

        <div className="categories__grid">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={`/shop/category/${CATEGORY_META[cat.filter].path}`}
              className={`cat-card reveal reveal--d${i + 1}`}
            >
              {cat.image ? (
                <div className="cat-card__media">
                  <Image className="cat-card__img is-pending-img" src={cat.image} alt={cat.name} loading="lazy" width={600} height={800} />
                  <div className="pending-badge">
                    <span className="pending-badge__label">Coming Soon</span>
                    <span className="pending-badge__sub">Updating Inventory</span>
                  </div>
                </div>
              ) : (
                <div className="cat-card__img" style={{ background: 'var(--cream-2)', width: '100%', height: '100%' }} />
              )}
              <div className="cat-card__overlay" aria-hidden="true" />
              <div className="cat-card__body">
                <div className="cat-card__label">{cat.label}</div>
                <div className="cat-card__name">{cat.name}</div>
                <span className="cat-card__cta">{cat.cta} →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
