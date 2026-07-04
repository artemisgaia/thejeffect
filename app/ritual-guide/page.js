import Link from 'next/link';
import Image from 'next/image';
import MarqueeBar from '@/components/MarqueeBar';
import EmailSignup from '@/components/EmailSignup';

export const metadata = {
  title: 'The Ritual Guide',
  description: 'Learn The J Effect\'s three-step ritual method for luminous, calm skin. Cleanse, Treat, Seal.',
};

const STEPS = [
  {
    num: '01',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>,
    title: 'Cleanse & Reset',
    subtitle: 'Start fresh.',
    desc: 'A gentle, pH-balanced cleanse removes the day — pollution, SPF, impurities — without stripping the skin\'s natural moisture barrier. The foundation of everything that follows.',
    tip: 'Tip: Use lukewarm water, never hot. Massage for 30–60 seconds.',
    products: [
      { name: 'Gentle Cleansing Gel', slug: 'gentle-cleansing-gel' },
      { name: 'Aloe & Cool Cucumber Soap', slug: 'aloe-cool-cucumber-soap' },
    ],
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900&q=80'
  },
  {
    num: '02',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>,
    title: 'Treat & Target',
    subtitle: 'Work with intention.',
    desc: 'Serums, oils, and eye treatments are your precision tools. Applied on clean, slightly damp skin, they absorb deeper and deliver faster — brightening, firming, targeting.',
    tip: 'Tip: Apply lightest to heaviest. Let each step absorb before layering.',
    products: [
      { name: 'PDRN Brightening Serum', slug: 'pdrn-brightening-serum' },
      { name: 'Nourishing Jojoba Face Oil', slug: 'nourishing-jojoba-face-oil' },
      { name: 'Gua Sha Face Oil', slug: 'gua-sha-face-oil' },
    ],
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=900&q=80'
  },
  {
    num: '03',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>,
    title: 'Seal & Protect',
    subtitle: 'Lock it in.',
    desc: 'Moisturizer seals everything in — nutrients, hydration, and treatment. It creates a protective layer that keeps skin supple through the night or shields it through the day.',
    tip: 'Tip: In the morning, always follow with SPF. It\'s non-negotiable.',
    products: [
      { name: 'Watermelon Hydration Moisturizer', slug: 'watermelon-hydration-moisturizer' },
      { name: 'Anti Aging Moisturizer', slug: 'anti-aging-moisturizer' },
    ],
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=900&q=80'
  },
];

const FAQS = [
  { q: 'How often should I do the full ritual?', a: 'Both morning and evening. Consistency is the single most important factor in skincare results.' },
  { q: 'Can I use all three steps if I have sensitive skin?', a: 'Yes — our formulas are designed for sensitive skin. Start with Cleanse + Moisturizer, then add treatment steps one at a time.' },
  { q: 'What order do I apply the PDRN Serum and Jojoba Face Oil?', a: 'Serum first (water-based), then oil (oil-based). Oils always go after serums.' },
  { q: 'Do I need the Soap Bar if I already have the Cleansing Gel?', a: 'They\'re alternatives — choose based on preference. The Gel is ideal for daily use; the Bar is great for travel and zero-waste routines.' },
];

export default function RitualGuidePage() {
  return (
    <>
      {/* Hero */}
      <div className="collection-hero">
        <div className="collection-hero__inner">
          <div className="eyebrow eyebrow--light reveal">The J Effect Method</div>
          <h1 className="section-title section-title--light reveal reveal--d1">
            Skincare as ceremony.
          </h1>
          <p className="collection-hero__sub reveal reveal--d2">
            Three intentional steps. Designed to layer beautifully, work in harmony, and deliver steady, visible results.
          </p>
        </div>
      </div>

      <MarqueeBar />

      {/* Steps */}
      <section className="section section--lg" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 24px' }}>
          <div className="eyebrow eyebrow--center reveal" style={{ marginBottom: '12px' }}>The Three Steps</div>
          <h2 className="section-title section-title--dark reveal reveal--d1" style={{ textAlign: 'center', marginBottom: '64px' }}>Your complete ritual.</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {STEPS.map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '60px',
                  alignItems: 'center',
                  direction: i % 2 === 1 ? 'rtl' : 'ltr',
                }}
                className="ritual-guide__step reveal"
              >
                <div style={{ direction: 'ltr' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '5rem', color: 'var(--cream-3)', fontWeight: '400', lineHeight: '1', marginBottom: '16px' }}>{step.num}</div>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{step.icon}</div>
                  <div className="eyebrow" style={{ marginBottom: '8px' }}>{step.subtitle}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: 'var(--ink)', marginBottom: '20px', fontWeight: '400' }}>{step.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--ink-soft)', lineHeight: '1.85', fontWeight: '300', marginBottom: '16px' }}>{step.desc}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '.82rem', color: 'var(--forest)', fontStyle: 'italic', marginBottom: '24px' }}>{step.tip}</p>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '.72rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '10px' }}>For this step:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {step.products.map((p) => (
                        <Link key={p.slug} href={`/shop/${p.slug}`} className="ritual-guide__product-chip">
                          {p.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{
                  direction: 'ltr',
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  background: 'var(--cream-2)'
                }}>
                  <Image className="is-pending-img" src={step.image} alt={step.title} fill style={{ objectFit: 'cover' }} loading={i === 0 ? 'eager' : 'lazy'} />
                  <div className="pending-badge">
                    <span className="pending-badge__label">Coming Soon</span>
                    <span className="pending-badge__sub">Updating Inventory</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section section--lg" style={{ background: 'var(--cream-2)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
          <div className="eyebrow eyebrow--center reveal" style={{ marginBottom: '12px' }}>Common Questions</div>
          <h2 className="section-title section-title--dark reveal reveal--d1" style={{ textAlign: 'center', marginBottom: '48px' }}>Ritual FAQ.</h2>
          <div className="product-info__accordions">
            {FAQS.map((faq, i) => (
              <div className="accordion reveal" key={i}>
                <button className="accordion__btn" aria-expanded="false">
                  {faq.q} <span className="accordion__icon" aria-hidden="true">+</span>
                </button>
                <div className="accordion__body">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--lg" style={{ textAlign: 'center', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 24px' }}>
          <div className="eyebrow eyebrow--center reveal">Ready to begin?</div>
          <h2 className="section-title section-title--dark reveal reveal--d1" style={{ marginBottom: '16px' }}>Start your ritual today.</h2>
          <p className="body-text reveal reveal--d2" style={{ marginBottom: '36px' }}>
            Every J Effect product is formulated to work beautifully on its own — and even better together.
          </p>
          <Link href="/shop" className="btn-primary reveal reveal--d3">Shop the Full Collection →</Link>
        </div>
      </section>

      <EmailSignup />
    </>
  );
}
