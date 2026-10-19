import SiteImage from '@/components/SiteImage';

const DEFAULT_PILLARS = [
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>, title: 'Clean Ingredients', desc: 'No parabens, no sulfates, no fillers. Every ingredient earns its place.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>, title: 'Made in the USA',   desc: 'Thoughtfully formulated and quality-controlled in the United States.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>, title: 'Cruelty Free',        desc: 'Never tested on animals. Beauty without compromise.' },
  { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>, title: 'Mindful Packaging',   desc: 'Minimalist, sustainability-conscious packaging.' },
];

export default function BrandPromise({
  eyebrow = 'Our promise',
  title = 'Formulated with *intention.*',
  body = 'Every J Effect product earns its place on your shelf. We obsess over what goes in, and what stays out.',
  badgeNumber = '100%',
  badgeLabel = 'Clean promise',
  pillars = DEFAULT_PILLARS,
}) {
  const [before, accent] = title.split('*');
  return (
    <section className="brand-promise">
      <div className="brand-promise__inner">
        <div className="brand-promise__stack reveal">
          <div className="brand-promise__img-main"><SiteImage slot="promise-main" alt="Clean, intentional formulas" sizes="(min-width: 900px) 36vw, 80vw" /></div>
          <div className="brand-promise__img-accent"><SiteImage slot="promise-accent" alt="Botanical ingredients" sizes="(min-width: 900px) 18vw, 40vw" /></div>
          <div className="brand-promise__badge">
            <div className="brand-promise__badge-num">{badgeNumber}</div>
            <div className="brand-promise__badge-label">{badgeLabel}</div>
          </div>
        </div>

        <div>
          <div className="eyebrow reveal">{eyebrow}</div>
          <h2 className="section-title section-title--dark reveal reveal--d1">{before}{accent && <em>{accent}</em>}</h2>
          <p className="body-text reveal reveal--d2" style={{ marginTop: 22 }}>{body}</p>
          <ul className="pillars reveal reveal--d3">
            {pillars.map((p) => (
              <li className="pillar" key={p.title}>
                <span className="pillar__icon">{p.icon}</span>
                <div>
                  <div className="pillar__title">{p.title}</div>
                  <div className="pillar__desc">{p.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
