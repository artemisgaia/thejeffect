import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatMoney, toCard, CATEGORY_META } from '@/lib/products';
import { getProducts, getProduct, pairingsOf, relatedOf } from '@/lib/store';
import { productGraph, jsonLd, categoryUrl } from '@/lib/seo';
import ProductCard from '@/components/ProductCard';
import ProductGallery from './ProductGallery';
import AddToRitual from './AddToRitual';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return { title: 'Product Not Found' };

  const url = `/shop/${p.slug}`;
  // Share image comes from ./opengraph-image.js
  return {
    title: p.seo.title,
    description: p.seo.description,
    keywords: p.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: `${p.name} ${p.descriptor} | The J Effect`,
      description: p.seo.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${p.name} ${p.descriptor}`,
      description: p.seo.description,
    },
    other: {
      'product:brand': 'The J Effect',
      'product:price:amount': (p.price / 100).toFixed(2),
      'product:price:currency': 'USD',
      'product:availability': p.sold_out ? 'out of stock' : 'in stock',
      'product:condition': 'new',
      'product:retailer_item_id': p.sku,
    },
  };
}

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
);

const Leaf = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
);

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();

  const all = await getProducts();
  const cat = CATEGORY_META[p.category];
  const pairings = pairingsOf(p, all);
  const related = relatedOf(p, all);
  const no = String(p.no).padStart(2, '0');
  const badges = [...new Set([...p.badges, 'Made in USA'])];
  const ritualImage = p.gallery.find((g) => g.kind === 'lifestyle') || p.gallery[0];

  return (
    <article className="pdp">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productGraph(p, pairings))} />

      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section className="pdp-hero">
        <div className="pdp-hero__inner">
          <ProductGallery images={p.gallery} />

          <div className="pdp-info">
            <nav className="pdp-crumbs" aria-label="Breadcrumb">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/shop">Shop</Link></li>
                <li><Link href={categoryUrl(p.category)}>{cat.label}</Link></li>
                <li aria-current="page">{p.name}</li>
              </ol>
            </nav>

            <p className="pdp-info__kicker">
              <span className="pdp-info__no">Nº {no}</span>
              <span>{p.step}</span>
              <span>{p.ritual}</span>
            </p>

            <h1 className="pdp-info__title">
              {p.collection && <span className="pdp-info__collection">{p.collection} </span>}
              {p.name}{' '}
              <span className="pdp-info__descriptor">{p.descriptor}</span>
            </h1>

            <p className="pdp-info__tagline">{p.tagline}</p>

            <div className="pdp-info__price-row">
              <span className="pdp-info__price">{formatMoney(p.price)}</span>
              <span className="pdp-info__size">{p.size}</span>
            </div>

            <p className="pdp-info__short">{p.short}</p>

            <ul className="pdp-info__benefits">
              {p.benefits.map((b) => (
                <li key={b}><Check />{b}</li>
              ))}
            </ul>

            <dl className="pdp-facts">
              <div><dt>Best for</dt><dd>{p.skin_types.join(' · ')}</dd></div>
              <div><dt>Texture</dt><dd>{p.texture}</dd></div>
              <div><dt>When</dt><dd>{p.ritual}</dd></div>
            </dl>

            <AddToRitual product={toCard(p)} />

            <ul className="pdp-badges" aria-label="Formula standards">
              {badges.map((b) => (
                <li key={b}><Leaf />{b}</li>
              ))}
            </ul>

            <div className="pdp-details">
              <details open>
                <summary>How to use</summary>
                <ol className="pdp-steps">
                  {p.how_to_use.map((s) => <li key={s}>{s}</li>)}
                </ol>
              </details>
              <details>
                <summary>Full ingredients</summary>
                <p className="pdp-inci">{p.ingredients}</p>
              </details>
              <details>
                <summary>Details</summary>
                <dl className="pdp-spec">
                  <div><dt>Size</dt><dd>{p.size}</dd></div>
                  <div><dt>Scent</dt><dd>{p.scent}</dd></div>
                  <div><dt>Skin type</dt><dd>{p.skin_types.join(', ')}</dd></div>
                  <div><dt>Ritual step</dt><dd>{p.step} · {p.ritual}</dd></div>
                  <div><dt>Made in</dt><dd>USA</dd></div>
                  <div><dt>SKU</dt><dd>{p.sku}</dd></div>
                </dl>
              </details>
              <details>
                <summary>Precautions</summary>
                <p>{p.warnings}</p>
              </details>
              <details>
                <summary>Shipping &amp; returns</summary>
                <p>
                  Free U.S. shipping on orders over $50. Orders ship within 1–2 business days.
                  30-day money-back guarantee. <Link href="/shipping">Full policy</Link>.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. The formula ──────────────────────────────────── */}
      <section className="pdp-story">
        <div className="pdp-story__inner">
          <div className="pdp-story__head reveal">
            <div className="eyebrow">The formula</div>
            <h2 className="section-title section-title--dark">
              Inside <em>{p.name}</em>.
            </h2>
          </div>
          <div className="pdp-story__body reveal reveal--d1">
            {p.story.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
            <blockquote className="pdp-story__quote">
              <p>“{p.quote}”</p>
              <cite>The J Effect</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── 3. Key ingredients ──────────────────────────────── */}
      <section className="product-ingredients" aria-labelledby="key-ingredients">
        <div className="product-ingredients__inner">
          <div className="product-ingredients__header text-center reveal">
            <div className="eyebrow eyebrow--center">Why it works</div>
            <h2 id="key-ingredients" className="section-title section-title--dark">Key ingredients.</h2>
          </div>
          <div className="product-ingredients__grid">
            {p.key_ingredients.map((ing, i) => (
              <div key={ing.name} className={`product-ingredient-card reveal reveal--d${i + 1}`}>
                <span className="product-ingredient-card__no">0{i + 1}</span>
                <h3 className="product-ingredient-card__title">{ing.name}</h3>
                <p className="product-ingredient-card__desc">{ing.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. The method ───────────────────────────────────── */}
      <section className={`pdp-method${ritualImage ? '' : ' pdp-method--solo'}`}>
        {ritualImage && (
          <div className="pdp-method__media">
            <Image src={ritualImage.src} alt={ritualImage.alt} fill sizes="(min-width: 900px) 50vw, 100vw" style={{ objectFit: 'cover' }} />
          </div>
        )}
        <div className="pdp-method__content reveal">
          <div className="eyebrow eyebrow--light">The method</div>
          <h2 className="section-title section-title--light">Your {p.name} ritual.</h2>
          <ol className="pdp-method__steps">
            {p.how_to_use.map((s, i) => (
              <li key={s}>
                <span className="pdp-method__num">{String(i + 1).padStart(2, '0')}</span>
                <p>{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 5. Complete the ritual ──────────────────────────── */}
      {pairings.length > 0 && (
        <section className="related-products pdp-pairs">
          <div className="related-products__inner">
            <div className="eyebrow reveal">Complete the ritual</div>
            <h2 className="section-title section-title--dark reveal reveal--d1">Pairs beautifully with.</h2>
            <div className="product-grid product-grid--3">
              {pairings.map((q) => <ProductCard key={q.id} product={toCard(q)} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. FAQ ──────────────────────────────────────────── */}
      <section className="pdp-faq" aria-labelledby="faq-title">
        <div className="pdp-faq__inner">
          <div className="pdp-faq__head reveal">
            <div className="eyebrow">Good questions</div>
            <h2 id="faq-title" className="section-title section-title--dark">{p.name}, answered.</h2>
          </div>
          <div className="pdp-faq__list">
            {p.faqs.map((f) => (
              <details key={f.q} className="pdp-faq__item">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Related ──────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="related-products">
          <div className="related-products__inner">
            <div className="eyebrow reveal">More {cat.label.toLowerCase()}</div>
            <h2 className="section-title section-title--dark reveal reveal--d1">You may also love.</h2>
            <div className="product-grid">
              {related.map((q) => <ProductCard key={q.id} product={toCard(q)} />)}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
