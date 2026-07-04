import Link from 'next/link';
import Image from 'next/image';

const DEFAULT_STEPS = [
  { title: 'Cleanse', desc: 'Reset the day. Calm the skin. Start fresh.' },
  { title: 'Treat',   desc: 'Target with intention — serum, oil, eye care.' },
  { title: 'Seal',    desc: 'Lock in moisture. Wake up luminous.' },
];

export default function RitualSplit({
  eyebrow = 'The Ritual Method',
  title = 'Skincare as ceremony.',
  body = 'Three intentional steps — designed to layer perfectly and deliver steady, beautiful results.',
  btnLabel = 'Explore the Guide',
  btnHref = '/ritual-guide',
  steps = DEFAULT_STEPS,
  image = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=900&q=80',
  imagePosition = 'left',
}) {
  const imgBlock = (
    <div className="ritual-split__img" style={{ position: 'relative' }}>
      {image ? (
        <>
          <Image className="is-pending-img" src={image} alt="The Ritual Method" loading="lazy" width={900} height={1100} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div className="pending-badge">
            <span className="pending-badge__label">Coming Soon</span>
            <span className="pending-badge__sub">Updating Inventory</span>
          </div>
        </>
      ) : (
        <div style={{ width: '100%', height: '100%', background: 'var(--cream-2)', minHeight: '400px' }} />
      )}
    </div>
  );

  return (
    <section className="ritual-split">
      <div className="ritual-split__inner">
        {imagePosition === 'left' && imgBlock}

        <div className="ritual-split__text">
          <div className="eyebrow eyebrow--light reveal">{eyebrow}</div>
          <h2 className="ritual-split__title reveal reveal--d1">{title}</h2>
          <p className="ritual-split__body reveal reveal--d2">{body}</p>

          {steps.length > 0 && (
            <div className="ritual-steps reveal reveal--d2">
              {steps.map((step, i) => (
                <div className="ritual-step" key={i}>
                  <div className="ritual-step__num">0{i + 1}</div>
                  <div>
                    <div className="ritual-step__title">{step.title}</div>
                    <div className="ritual-step__desc">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link href={btnHref} className="btn-primary reveal reveal--d3" style={{ alignSelf: 'flex-start' }}>
            {btnLabel} →
          </Link>
        </div>

        {imagePosition === 'right' && imgBlock}
      </div>
    </section>
  );
}
