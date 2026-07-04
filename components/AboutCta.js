import Link from 'next/link';
import Image from 'next/image';

export default function AboutCta({
  eyebrow = 'Our Story',
  quote = 'Your journey to radiant confidence — made simple.',
  body = 'The J Effect was born from the belief that skincare should be a supportive ritual — something you return to when life gets loud. Clean, effective, effortless.',
  btnLabel = 'Read Our Story',
  btnHref = '/about',
  image = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80',
}) {
  return (
    <section className="about-cta">
      <div className="about-cta__inner">
        <div className="about-cta__img reveal" style={{ position: 'relative' }}>
          {image ? (
            <>
              <Image className="is-pending-img" src={image} alt="The J Effect story" loading="lazy" width={900} height={900} />
              <div className="pending-badge">
                <span className="pending-badge__label">Coming Soon</span>
                <span className="pending-badge__sub">Updating Inventory</span>
              </div>
            </>
          ) : (
            <div style={{ width: '100%', minHeight: '360px', background: 'var(--cream-3)' }} />
          )}
        </div>
        <div>
          <div className="eyebrow reveal">{eyebrow}</div>
          <blockquote className="about-cta__quote reveal reveal--d1">{quote}</blockquote>
          <p className="about-cta__body reveal reveal--d2">{body}</p>
          <Link href={btnHref} className="btn-secondary reveal reveal--d3">
            {btnLabel} →
          </Link>
        </div>
      </div>
    </section>
  );
}
