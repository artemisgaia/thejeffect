import Link from 'next/link';
import SiteImage from '@/components/SiteImage';

const DEFAULT_STEPS = [
  { title: 'Cleanse', desc: 'Reset the day. Calm the skin. Start fresh.' },
  { title: 'Treat',   desc: 'Target with intention: serum, oil, eye care.' },
  { title: 'Seal',    desc: 'Lock in moisture. Wake up luminous.' },
];

export default function RitualSplit({
  eyebrow = 'The ritual method',
  title = 'Skincare as *ceremony.*',
  body = 'Three intentional steps, designed to layer perfectly and deliver steady, beautiful results.',
  btnLabel = 'Explore the Guide',
  btnHref = '/ritual-guide',
  steps = DEFAULT_STEPS,
  slot = 'ritual',
}) {
  const [before, accent] = title.split('*');
  return (
    <section className="ritual-split">
      <div className="ritual-split__inner">
        <div className="ritual-split__img reveal">
          <SiteImage slot={slot} alt="The three-step J Effect ritual" sizes="(min-width: 900px) 40vw, 90vw" />
        </div>

        <div className="ritual-split__text">
          <div className="eyebrow eyebrow--light reveal">{eyebrow}</div>
          <h2 className="ritual-split__title reveal reveal--d1">{before}{accent && <em>{accent}</em>}</h2>
          <p className="ritual-split__body reveal reveal--d2">{body}</p>

          <ol className="ritual-steps reveal reveal--d2">
            {steps.map((step, i) => (
              <li className="ritual-step" key={step.title}>
                <span className="ritual-step__num">0{i + 1}</span>
                <div>
                  <div className="ritual-step__title">{step.title}</div>
                  <div className="ritual-step__desc">{step.desc}</div>
                </div>
              </li>
            ))}
          </ol>

          <Link href={btnHref} className="btn-primary reveal reveal--d3">
            {btnLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
