import Link from 'next/link';
import SiteImage from '@/components/SiteImage';
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
      { name: 'Nº 01 Soft Reset Cleanser', slug: 'gentle-cleansing-gel' },
      { name: 'Nº 38 Cooling Aloe Bar', slug: 'aloe-cool-cucumber-soap' },
    ],
    slot: 'guide-cleanse',
  },
  {
    num: '02',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>,
    title: 'Treat & Target',
    subtitle: 'Work with intention.',
    desc: 'Serums, oils, and eye treatments are your precision tools. Applied on clean, slightly damp skin, they absorb deeper and deliver faster — brightening, firming, targeting.',
    tip: 'Tip: Apply lightest to heaviest. Let each step absorb before layering.',
    products: [
      { name: 'Nº 09 Glasslight PDRN Serum', slug: 'pdrn-brightening-serum' },
      { name: 'Nº 17 Jojoba Glow Face Oil', slug: 'nourishing-jojoba-face-oil' },
      { name: 'Nº 18 Ritual Glide Gua Sha Oil', slug: 'gua-sha-face-oil' },
    ],
    slot: 'guide-treat',
  },
  {
    num: '03',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>,
    title: 'Seal & Protect',
    subtitle: 'Lock it in.',
    desc: 'Moisturizer seals everything in — nutrients, hydration, and treatment. It creates a protective layer that keeps skin supple through the night or shields it through the day.',
    tip: 'Tip: In the morning, always follow with SPF. It\'s non-negotiable.',
    products: [
      { name: 'Nº 19 Watermelon Dew Moisturizer', slug: 'watermelon-hydration-moisturizer' },
      { name: 'Nº 23 Timeless Renewal Cream', slug: 'anti-aging-moisturizer' },
    ],
    slot: 'guide-seal',
  },
];

const FAQS = [
  { q: 'How often should I do the full ritual?', a: 'Both morning and evening. Consistency is the single most important factor in skincare results.' },
  { q: 'Can I use all three steps if I have sensitive skin?', a: 'Yes. Many of our formulas are fragrance-free and made with sensitive skin in mind; check each product’s details. Start with Cleanse + Moisturizer, then add treatment steps one at a time.' },
  { q: 'What order do I apply Glasslight serum and Jojoba Glow oil?', a: 'Serum first (water-based), then oil (oil-based). Oils always go after serums.' },
  { q: 'Do I need a ritual bar if I already have a cleansing gel?', a: 'They\'re alternatives — choose based on preference. Soft Reset gel is ideal for daily face cleansing; ritual bars are great for body, travel and zero-waste routines.' },
];

export default function RitualGuidePage() {
  return (
    <>
      <div className="collection-hero">
        <div className="collection-hero__inner">
          <div className="eyebrow eyebrow--light reveal">The J Effect method</div>
          <h1 className="section-title section-title--light reveal reveal--d1">Skincare as <em>ceremony.</em></h1>
          <p className="collection-hero__sub reveal reveal--d2">
            Three intentional steps. Designed to layer beautifully, work in harmony, and deliver steady, visible results.
          </p>
        </div>
      </div>

      <section className="guide">
        <div className="guide__inner">
          <div className="guide__head">
            <div className="eyebrow eyebrow--center reveal">The three steps</div>
            <h2 className="section-title section-title--dark reveal reveal--d1">Your complete <em>ritual.</em></h2>
          </div>

          <div className="guide__steps">
            {STEPS.map((step, i) => (
              <div className={`guide-step reveal${i % 2 ? ' guide-step--flip' : ''}`} key={step.num}>
                <div className="guide-step__text">
                  <div className="guide-step__num">{step.num}</div>
                  <div className="guide-step__icon">{step.icon}</div>
                  <div className="eyebrow">{step.subtitle}</div>
                  <h3 className="guide-step__title">{step.title}</h3>
                  <p className="guide-step__desc">{step.desc}</p>
                  <p className="guide-step__tip">{step.tip}</p>
                  <div className="guide-step__products">
                    <div className="guide-step__products-label">For this step</div>
                    <div className="guide-step__chips">
                      {step.products.map((p) => (
                        <Link key={p.slug} href={`/shop/${p.slug}`} className="ritual-guide__product-chip">{p.name}</Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="guide-step__img">
                  <SiteImage slot={step.slot} alt={step.title} sizes="(min-width: 900px) 34vw, 80vw" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="guide-faq">
        <div className="guide-faq__inner">
          <div className="eyebrow eyebrow--center reveal">Common questions</div>
          <h2 className="section-title section-title--dark reveal reveal--d1">Ritual <em>FAQ.</em></h2>
          <div className="guide-faq__list">
            {FAQS.map((faq) => (
              <div className="accordion reveal" key={faq.q}>
                <button className="accordion__btn" aria-expanded="false">
                  {faq.q} <span className="accordion__icon" aria-hidden="true">+</span>
                </button>
                <div className="accordion__body"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="closing__inner">
          <div className="eyebrow eyebrow--center reveal">Ready to begin?</div>
          <h2 className="section-title section-title--dark reveal reveal--d1">Start your ritual <em>today.</em></h2>
          <p className="body-text reveal reveal--d2">
            Every J Effect product is formulated to work beautifully on its own, and even better together.
          </p>
          <Link href="/shop" className="btn-primary reveal reveal--d3">Shop the full collection <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <EmailSignup />
    </>
  );
}
