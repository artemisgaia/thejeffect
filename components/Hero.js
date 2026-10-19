import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/site-config';

// "Where calm meets *luminous* skin." → *word* becomes the gold italic accent.
function accent(text) {
  return String(text).split('*').map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}

export default function Hero({
  eyebrow = 'Crafted in the USA · Est. 2024',
  title = 'Where calm meets *luminous* skin.',
  subtitle = 'Clean formulas, intentional rituals, and radiant results.',
  btn1Label = 'Shop the Ritual',
  btn1Href = '/shop',
  btn2Label = 'See the Guide',
  btn2Href = '/ritual-guide',
  visual = null,
  floatLabel = 'Bestseller',
  floatTitle = null,
  floatSub = '',
  floatHref = '/shop',
  trust = null,
}) {
  const trustBadges = trust || SITE_CONFIG.trust;

  return (
    <section className="hero" aria-label="Welcome">
      <div className="hero__bg" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__content">
          {eyebrow && <p className="hero__eyebrow">{eyebrow}</p>}
          <h1 className="hero__title">{accent(title)}</h1>
          <p className="hero__subtitle">{subtitle}</p>

          <div className="hero__actions">
            {btn1Label && <Link href={btn1Href} className="btn-primary">{btn1Label} <span aria-hidden="true">→</span></Link>}
            {btn2Label && <Link href={btn2Href} className="btn-ghost-light">{btn2Label} <span aria-hidden="true">→</span></Link>}
          </div>

          {trustBadges.length > 0 && (
            <ul className="hero__trust">
              {trustBadges.map((b, i) => (
                <li className="hero__trust-item" key={i}>
                  <span className="hero__trust-icon">{b.icon}</span>
                  <span className="hero__trust-label">{b.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {visual && (
          <div className="hero__visual">
            <div className="hero__arch">{visual}</div>
            <span className="hero__ring" aria-hidden="true" />
            {floatTitle && (
              <Link href={floatHref} className="hero__float-card">
                <span className="hero__float-label">{floatLabel}</span>
                <span className="hero__float-val">{floatTitle}</span>
                <span className="hero__float-sub">{floatSub}</span>
              </Link>
            )}
          </div>
        )}
      </div>

      <a className="hero__scroll" href="#after-hero" aria-label="Scroll to content">
        <span>Scroll</span><i aria-hidden="true" />
      </a>
    </section>
  );
}
