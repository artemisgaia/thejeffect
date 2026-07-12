'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatMoney } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { SITE_CONFIG } from '@/lib/site-config';

export default function ProductPageClient({ product, related }) {
  const { addToCart } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);

  const handleATC = () => {
    addToCart(product, selectedVariant);
  };

  const price = selectedVariant?.price || product.price;
  const hasCompare = product.compare_at_price && product.compare_at_price > product.price;

  return (
    <div className="product-page-wrapper">
      {/* 1. Hero / Split Section */}
      <div className="product-hero">
        <div className="product-hero__inner">
          <div className="product-hero__media reveal">
            {/* Gallery */}
            <div className="product-gallery">
              <div className="product-gallery__main">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className={`product-gallery__slide${i === activeImg ? ' active' : ''}`}
                    style={{ display: i === activeImg ? 'block' : 'none', position: 'relative' }}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} — image ${i + 1}`}
                      priority={i === 0}
                      width={900}
                      height={1100}
                    />
                  </div>
                ))}
              </div>
              {product.images.length > 1 && (
                <div className="product-gallery__thumbs">
                  {product.images.map((img, i) => (
                    <Image
                      key={i}
                      className={`product-gallery__thumb${i === activeImg ? ' active' : ''}`}
                      src={img}
                      alt={`View ${i + 1}`}
                      loading="lazy"
                      width={72}
                      height={80}
                      onClick={() => setActiveImg(i)}
                    />
                  ))}
                </div>
              )}
              {product.packagingPreview && (
                <p className="gallery-note">Packaging preview — final product photography coming soon.</p>
              )}
            </div>
          </div>

          <div className="product-hero__info">
            <nav className="breadcrumb reveal" aria-label="Breadcrumb">
              <ol className="breadcrumb__list">
                <li className="breadcrumb__item"><Link href="/shop" className="breadcrumb__link">Shop</Link></li>
                <li className="breadcrumb__item"><span className="breadcrumb__sep">›</span></li>
                <li className="breadcrumb__item breadcrumb__item--current">{product.title}</li>
              </ol>
            </nav>

            <div className="product-hero__header reveal reveal--d1">
              <div className="product-hero__type">{product.type}</div>
              <h1 className="product-hero__title">{product.title}</h1>
              
              <div className="product-hero__rating" aria-label="5 stars">
                <span style={{ color: 'var(--gold)' }}>★★★★★</span>
                <span className="product-hero__rating-text">5.0 · Proven Results</span>
              </div>
              
              <div className="product-hero__price">
                {formatMoney(price)}
                {hasCompare && (
                  <span className="product-hero__compare">{formatMoney(product.compare_at_price)}</span>
                )}
              </div>
            </div>

            <p className="product-hero__desc reveal reveal--d2">{product.description}</p>
            
            {product.texture && (
              <div className="product-hero__texture reveal reveal--d2">
                <strong>Texture:</strong> {product.texture}
              </div>
            )}

            {product.benefits && (
              <ul className="product-hero__benefits reveal reveal--d3">
                {product.benefits.map((benefit, i) => (
                  <li key={i}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            )}

            {product.variants?.length > 1 && (
              <div className="product-hero__variants reveal reveal--d4">
                <div className="product-hero__label">Size</div>
                <div className="variant-btns">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      className={`variant-btn${selectedVariant?.id === v.id ? ' active' : ''}`}
                      onClick={() => setSelectedVariant(v)}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="product-hero__atc-wrap reveal reveal--d4">
              <button
                className="btn-primary product-hero__atc"
                onClick={handleATC}
                aria-label={`Add ${product.title} to cart`}
              >
                Add to Ritual — {formatMoney(price)}
              </button>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '.72rem', color: 'var(--ink-muted)', textAlign: 'center', marginTop: '10px', letterSpacing: '.04em' }}>
                30-day money-back guarantee · Free shipping over $50
              </p>
            </div>

            <div className="product-hero__trust reveal reveal--d4">
              {SITE_CONFIG.trust.map((t, i) => (
                <div className="product-trust-item" key={i}>
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </div>
              ))}
            </div>

            <div className="product-hero__accordions reveal reveal--d4">
              {product.ingredients && (
                <div className="accordion">
                  <button className="accordion__btn" aria-expanded="false" aria-controls="acc-ing">
                    Full Ingredients <span className="accordion__icon" aria-hidden="true">+</span>
                  </button>
                  <div className="accordion__body" id="acc-ing">
                    <p style={{ fontSize: '.78rem', lineHeight: '1.8', color: 'var(--ink-soft)' }}>{product.ingredients}</p>
                  </div>
                </div>
              )}
              <div className="accordion">
                <button className="accordion__btn" aria-expanded="false" aria-controls="acc-ship">
                  Shipping &amp; Returns <span className="accordion__icon" aria-hidden="true">+</span>
                </button>
                <div className="accordion__body" id="acc-ship">
                  <p>Free shipping on orders over $50. Orders ship within 1–2 business days. 30-day returns accepted on unopened products.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Ingredients Grid */}
      {product.key_ingredients && product.key_ingredients.length > 0 && (
        <section className="product-ingredients">
          <div className="product-ingredients__inner">
            <div className="product-ingredients__header text-center reveal">
              <div className="eyebrow eyebrow--dark">Why it works</div>
              <h2 className="section-title section-title--dark">Key Ingredients.</h2>
            </div>
            <div className="product-ingredients__grid">
              {product.key_ingredients.map((ing, i) => (
                <div key={i} className={`product-ingredient-card reveal reveal--d${i+1}`}>
                  <h3 className="product-ingredient-card__title">{ing.name}</h3>
                  <p className="product-ingredient-card__desc">{ing.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. The Ritual Banner */}
      {product.how_to_use && (
        <section className="product-ritual-banner">
          <div className="product-ritual-banner__bg">
             <Image
               src={product.images[0]}
               alt="Ritual"
               fill
               style={{ objectFit: 'cover' }}
               loading="lazy"
             />
             <div className="product-ritual-banner__overlay"></div>
          </div>
          <div className="product-ritual-banner__content reveal">
            <div className="eyebrow eyebrow--light">The Method</div>
            <h2 className="section-title section-title--light">How to use.</h2>
            <p className="product-ritual-banner__text">{product.how_to_use}</p>
          </div>
        </section>
      )}

      {/* 4. The Promise Quote */}
      {product.quote && (
        <section className="product-quote-section">
          <div className="product-quote-section__inner reveal">
             <h2 className="product-quote-section__quote">{product.quote}</h2>
             <div className="product-quote-section__author">— The J Effect</div>
          </div>
        </section>
      )}

      {/* 5. Sticky ATC bar */}
      <div className="sticky-bar" id="sticky-bar" aria-hidden="true">
        <div className="sticky-bar__inner">
          <div className="sticky-bar__product">
            {product.images[0] && (
              <Image
                src={product.images[0]}
                alt={product.title}
                className="sticky-bar__img"
                width={44}
                height={44}
                loading="lazy"
              />
            )}
            <span className="sticky-bar__name">{product.title}</span>
          </div>
          <span className="sticky-bar__price">{formatMoney(price)}</span>
          <button className="btn-primary sticky-bar__atc" onClick={handleATC}>
            Add to Ritual →
          </button>
        </div>
      </div>

      {/* 6. Related products */}
      {related.length > 0 && (
        <section className="related-products">
          <div className="related-products__inner">
            <div className="eyebrow reveal">Complete the Ritual</div>
            <h2 className="section-title section-title--dark reveal reveal--d1">You may also love.</h2>
            <div className="product-grid">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
