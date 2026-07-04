import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/site-config';

export default function Hero({
  eyebrow = 'Crafted in the USA · Est. 2024',
  title = 'Where calm meets luminous skin.',
  subtitle = 'Clean formulas, intentional rituals, and radiant results — The J Effect is skincare designed to feel like coming home to yourself.',
  btn1Label = 'Shop the Ritual',
  btn1Href = '/shop',
  btn2Label = 'See the Guide',
  btn2Href = '/ritual-guide',
  image = null,
  showFloatCard = true,
  floatLabel = 'Bestseller',
  floatTitle = 'Watermelon Hydration',
  floatSub = 'Moisturizer — $25.99',
  trust = null,
}) {
  const trustBadges = trust || SITE_CONFIG.trust;

  return (
    <section
      className="hero hero-section"
      style={{ background: 'var(--forest)' }}
      aria-label="Hero"
    >
      {/* Background */}
      <div
        className={`hero__bg${image ? ' is-pending-img' : ''}`}
        style={
          image
            ? { backgroundImage: `url('${image}')` }
            : { background: 'linear-gradient(135deg, #1a2b1c 0%, #243B27 50%, #2d4a2f 100%)' }
        }
      />
      <div
        className="hero__bg-overlay"
        style={image ? undefined : { background: 'rgba(26,43,28,0.3)' }}
      />

      <div className="hero__content">
        {eyebrow && <p className="hero__eyebrow">{eyebrow}</p>}
        <h1 className="hero__title">{title}</h1>
        <p className="hero__subtitle">{subtitle}</p>

        <div className="hero__actions">
          {btn1Label && (
            <Link href={btn1Href} className="btn-primary">{btn1Label} →</Link>
          )}
          {btn2Label && (
            <Link href={btn2Href} className="btn-ghost-light">{btn2Label} →</Link>
          )}
        </div>

        {trustBadges.length > 0 && (
          <div className="hero__trust">
            {trustBadges.map((b, i) => (
              <div className="hero__trust-item" key={i}>
                <span className="hero__trust-icon">{b.icon}</span>
                <span className="hero__trust-label">{b.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {showFloatCard && (
        <div className="hero__float-card">
          <div className="hero__float-label">{floatLabel}</div>
          <div className="hero__float-val">{floatTitle}</div>
          <div className="hero__float-sub">{floatSub}</div>
        </div>
      )}
    </section>
  );
}
