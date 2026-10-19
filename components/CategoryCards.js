import Link from 'next/link';
import SiteImage from '@/components/SiteImage';
import { CATEGORIES, CATEGORY_META } from '@/lib/products';

export default function CategoryCards({
  eyebrow = 'Shop by ritual',
  title = 'Find your *perfect* daily ritual.',
  categories = CATEGORIES,
}) {
  const [before, accent, after] = title.split('*');
  return (
    <section className="categories" id="after-hero">
      <div className="categories__inner">
        <div className="categories__header">
          <div className="eyebrow reveal">{eyebrow}</div>
          <h2 className="section-title section-title--dark reveal reveal--d1">
            {before}{accent && <em>{accent}</em>}{after}
          </h2>
        </div>

        <div className="categories__grid">
          {categories.map((cat, i) => (
            <Link
              key={cat.slot}
              href={`/shop/category/${CATEGORY_META[cat.filter].path}`}
              className={`cat-card reveal reveal--d${i + 1}`}
            >
              <div className="cat-card__media">
                <SiteImage slot={cat.slot} alt={cat.name} sizes="(min-width: 1000px) 22vw, (min-width: 600px) 45vw, 90vw" />
              </div>
              <div className="cat-card__body">
                <div className="cat-card__label">{cat.label}</div>
                <div className="cat-card__name">{cat.name}</div>
                <span className="cat-card__cta">{cat.cta} <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
