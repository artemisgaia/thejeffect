'use client';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/site-config';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { cartCount, setCartOpen } = useCart();
  const { announcement, nav, name } = SITE_CONFIG;

  return (
    <>
      {/* Announcement Bar */}
      {announcement.show && announcement.text && (
        <div
          className="announce"
          id="announce"
          role="banner"
          style={{ background: announcement.bg, color: announcement.color }}
        >
          {announcement.link ? (
            <Link href={announcement.link} style={{ color: 'inherit', textDecoration: 'none' }}>
              {announcement.text}
            </Link>
          ) : (
            announcement.text
          )}
        </div>
      )}

      {/* Main Header */}
      <header className="site-header" id="site-header" role="banner">
        <div className="header-inner">
          {/* Hamburger */}
          <button
            className="header__menu-btn"
            id="menu-btn"
            aria-label="Open menu"
            aria-expanded="false"
            aria-controls="mobile-nav"
          >
            <span className="header__menu-bar" />
            <span className="header__menu-bar" />
            <span className="header__menu-bar" />
          </button>

          {/* Logo */}
          <Link href="/" className="header__logo" aria-label={`${name} home`}>
            <span className="header__logo-text">{name}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="header__nav" aria-label="Main navigation">
            {nav.map((item) => {
              if (item.label === 'Shop') {
                return (
                  <div key={item.href} className="header__nav-item has-mega-menu">
                    <Link href={item.href} className="header__nav-link">
                      {item.label}
                    </Link>
                    <div className="mega-menu">
                      <div className="mega-menu__inner">
                        <div>
                          <div className="mega-menu__col-title">Shop By Ritual</div>
                          <ul className="mega-menu__list">
                            <li><Link href="/shop" className="mega-menu__link">All Products</Link></li>
                            <li><Link href="/shop?filter=moisturizer" className="mega-menu__link">Moisturizers</Link></li>
                            <li><Link href="/shop?filter=serum" className="mega-menu__link">Serums</Link></li>
                            <li><Link href="/shop?filter=cleanser" className="mega-menu__link">Cleansers</Link></li>
                            <li><Link href="/shop?filter=ritual-bar" className="mega-menu__link">Ritual Bars</Link></li>
                          </ul>
                        </div>
                        <div className="mega-menu__promos">
                          <Link href="/shop/watermelon-hydration-moisturizer" className="mega-promo">
                            <Image src="/products/watermelon-hydration-moisturizer.webp" alt="Bestseller" loading="lazy" width={600} height={450} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div className="mega-promo__overlay" />
                            <div className="mega-promo__text">
                              <div className="mega-promo__label">Bestseller</div>
                              <div className="mega-promo__title">Watermelon Hydration</div>
                            </div>
                          </Link>
                          <Link href="/ritual-guide" className="mega-promo">
                            <Image src="/products/hyaluronic-acid-serum.webp" alt="Ritual Guide" loading="lazy" width={600} height={450} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div className="mega-promo__overlay" />
                            <div className="mega-promo__text">
                              <div className="mega-promo__label">Method</div>
                              <div className="mega-promo__title">The Ritual Guide</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link key={item.href} href={item.href} className="header__nav-link">
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="header__actions">
            <button className="header__icon-btn" id="search-btn" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button
              className="header__cart-btn"
              id="cart-btn"
              aria-label="Open cart"
              onClick={() => setCartOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="header__cart-count" id="cart-count">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="mobile-nav" id="mobile-nav" aria-hidden="true" role="dialog" aria-label="Navigation">
        <div className="mobile-nav__overlay" id="mobile-overlay" />
        <div className="mobile-nav__panel">
          <button className="mobile-nav__close" id="mobile-close" aria-label="Close menu">✕</button>
          <nav className="mobile-nav__links">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="mobile-nav__link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Search Popup */}
      <div className="search-popup" id="search-popup" aria-hidden="true" role="dialog" aria-label="Search">
        <div className="search-popup__overlay" id="search-overlay" />
        <div className="search-popup__panel">
          <div className="search-popup__inner">
            <div className="search-popup__header">
              <span className="search-popup__title">Search</span>
              <button className="search-popup__close" id="search-close" aria-label="Close search">✕</button>
            </div>
            <form action="/shop" method="get" className="search-popup__form" role="search">
              <label htmlFor="search-popup-input" className="visually-hidden">Search products</label>
              <input
                id="search-popup-input"
                type="search"
                name="q"
                className="search-popup__input"
                placeholder="Search products"
                autoComplete="off"
              />
              <button type="submit" className="search-popup__submit" aria-label="Submit search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
