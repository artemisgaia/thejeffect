'use client';
import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    { q: "Are your products cruelty-free?", a: "Yes, The J Effect is proudly Leaping Bunny certified. We never test on animals — beauty without compromise, always." },
    { q: "Where are your products made?", a: "All of our skincare is formulated, tested, and manufactured in the USA using globally sourced, clean ingredients." },
    { q: "Are your products safe for sensitive skin?", a: "Absolutely. We formulate without parabens, sulfates, or artificial fragrances. However, we always recommend patch-testing new products on a small area first." },
    { q: "How long until I see results?", a: "While hydration benefits are immediate, you will typically see significant improvements in skin texture and tone within 4–6 weeks of consistent use." },
    { q: "What is your return policy?", a: "We offer a 30-day money-back guarantee on unopened or gently used products. See our Shipping & Returns page for more details." },
    { q: "What order should I apply my products?", a: "Follow our 3-step ritual: Cleanse, Treat, Seal. Start with your cleanser, apply serums or oils, then lock everything in with a moisturizer. Visit our Ritual Guide for the full method." },
    { q: "Do you offer free shipping?", a: "Yes! We offer free standard shipping on all orders over $50 within the United States. Orders typically ship within 1–2 business days." },
    { q: "Can I use your products during pregnancy?", a: "Most of our products are pregnancy-safe, but we recommend consulting your dermatologist before introducing new products during pregnancy, especially those containing retinol." },
    { q: "Are your products vegan?", a: "The majority of our products are vegan. Each product page lists full ingredients so you can verify. We never use animal-derived ingredients unless clearly noted." },
    { q: "How do I know which products are right for me?", a: "Start with our Ritual Guide — it walks you through choosing products based on your skin type and goals. You can also reach out to us via our Contact page for a personalized recommendation." },
  ];

  return (
    <div className="policy-page">
      <div className="policy-page__inner">
        <h1 className="policy-page__title reveal">Frequently Asked Questions</h1>
        <p className="reveal reveal--d1" style={{ textAlign: 'center', fontFamily: "var(--font-body)", color: 'var(--ink-soft)', fontSize: '.95rem', maxWidth: '500px', margin: '-24px auto 48px', lineHeight: '1.8' }}>
          Everything you need to know about The J Effect, our products, and your ritual.
        </p>
        <div className="policy-page__content">
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className="accordion" key={i}>
                <button className="accordion__btn" aria-expanded="false" aria-controls={`faq-${i}`}>
                  {faq.q} <span className="accordion__icon" aria-hidden="true">+</span>
                </button>
                <div className="accordion__body" id={`faq-${i}`}>
                  <div className="accordion__inner"><p>{faq.a}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '64px', padding: '48px 24px', background: 'var(--cream-2)' }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: '1.5rem', fontWeight: '400', color: 'var(--ink)', marginBottom: '12px' }}>Still have questions?</h2>
          <p style={{ fontFamily: "var(--font-body)", color: 'var(--ink-muted)', fontSize: '.88rem', marginBottom: '24px' }}>
            We are here to help. Reach out and we will get back to you within 24 hours.
          </p>
          <Link href="/contact" className="btn-secondary">Get in Touch →</Link>
        </div>
      </div>
    </div>
  );
}
