import Link from 'next/link';
import Image from 'next/image';
import MarqueeBar from '@/components/MarqueeBar';
import EmailSignup from '@/components/EmailSignup';

export const metadata = {
  title: 'Our Story — The J Effect',
  description: 'The J Effect was born from the belief that skincare should be a supportive ritual. Learn about our mission, values, and clean promise.',
};

const VALUES = [
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>, title: 'Clean Ingredients',  desc: 'No parabens, no sulfates, no fillers. Every ingredient earns its place in our formulas.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>, title: 'Made in the USA',    desc: 'Thoughtfully formulated and quality-controlled in the United States.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>, title: 'Cruelty Free',         desc: 'Never tested on animals. Beauty without compromise, always.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>, title: 'Mindful Packaging',    desc: 'Minimalist, sustainability-conscious packaging with your future in mind.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>, title: 'Results You Feel',      desc: 'Skincare that doesn\'t just look clean — it works. Every formula is tested for efficacy.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>, title: 'Inclusive by Design',  desc: 'Built for all skin types, tones, and rhythms. There is no one way to do a ritual.' },
];

export default function AboutPage() {
  return (
    <>
      {/* About Hero */}
      <div className="about-hero">
        <div className="about-hero__text">
          <div className="eyebrow eyebrow--light reveal">Our Story</div>
          <h1 className="section-title section-title--light reveal reveal--d1">Made with intention.</h1>
          <p className="about-hero__sub reveal reveal--d2">
            The J Effect was born from a simple belief: skincare should feel like a return to yourself.
          </p>
          <div className="about-hero__actions reveal reveal--d3">
            <Link href="/shop" className="btn-primary">Shop the Ritual →</Link>
            <Link href="/ritual-guide" className="btn-ghost-light">See the Guide →</Link>
          </div>
        </div>
        <div className="about-hero__img reveal reveal--d2" style={{ position: 'relative', overflow: 'hidden', minHeight: '320px' }}>
          <Image
            className="is-pending-img"
            src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=900&q=80"
            alt="The J Effect skincare products arranged on a clean surface"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="pending-badge">
            <span className="pending-badge__label">Coming Soon</span>
            <span className="pending-badge__sub">Updating Inventory</span>
          </div>
        </div>
      </div>

      <MarqueeBar items={['Crafted in the USA', 'Clean Formulas', 'Mindful Rituals', 'Cruelty Free', 'Luminous Skin']} />

      {/* Mission */}
      <div className="about-mission">
        <div className="about-mission__img reveal" style={{ position: 'relative', overflow: 'hidden', minHeight: '320px' }}>
          <Image
            className="is-pending-img"
            src="https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=900&q=80"
            alt="Clean skincare jar held in hands showing The J Effect products"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            loading="lazy"
          />
          <div className="pending-badge">
            <span className="pending-badge__label">Coming Soon</span>
            <span className="pending-badge__sub">Updating Inventory</span>
          </div>
        </div>
        <div>
          <div className="eyebrow reveal">Our Mission</div>
          <h2 className="section-title section-title--dark reveal reveal--d1">Your Journey to Radiant Confidence.</h2>
          <div className="body-text reveal reveal--d2" style={{ marginTop: '16px', whiteSpace: 'pre-line' }}>
            {`We believe skincare should be a supportive ritual — something you return to when life gets loud.\n\nBuilt on clarity, comfort, and consistency. Every product we make is designed to slot effortlessly into your day and make the ritual feel like a gift to yourself, not a chore.\n\nThe J Effect isn't about fixing your skin. It's about meeting it where it is — with clean, honest formulas that let your natural radiance through.`}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="about-values">
        <div className="about-values__inner">
          <div className="about-values__header">
            <div className="eyebrow eyebrow--center reveal">What We Stand For</div>
            <h2 className="section-title section-title--dark reveal reveal--d1">The J Effect values.</h2>
          </div>
          <div className="about-values__grid">
            {VALUES.map((v, i) => (
              <div className={`value-card reveal reveal--d${i + 1}`} key={i}>
                <div className="value-card__icon">{v.icon}</div>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing */}
      <section className="section section--lg" style={{ textAlign: 'center', maxWidth: '1300px', margin: '0 auto' }}>
        <div className="eyebrow eyebrow--center reveal">A Note From Us</div>
        <h2 className="section-title section-title--dark reveal reveal--d1" style={{ marginBottom: '20px' }}>Built for real routines.</h2>
        <p className="body-text reveal reveal--d2" style={{ maxWidth: '640px', margin: '0 auto 36px' }}>
          Thank you for being part of this ritual with us. Every purchase, every routine, every quiet morning moment — you are what The J Effect is made for.
        </p>
        <Link href="/shop" className="btn-secondary reveal reveal--d3">Shop the Full Collection →</Link>
      </section>

      <EmailSignup />
    </>
  );
}
