import Link from 'next/link';
import SiteImage from '@/components/SiteImage';

export default function AboutCta({
  eyebrow = 'Our story',
  quote = 'Your journey to radiant confidence, *made simple.*',
  body = 'The J Effect was born from the belief that skincare should be a supportive ritual, something you return to when life gets loud. Clean, effective, effortless.',
  btnLabel = 'Read our story',
  btnHref = '/about',
  slot = 'story',
}) {
  const [before, accent] = quote.split('*');
  return (
    <section className="about-cta">
      <div className="about-cta__inner">
        <div className="about-cta__img reveal">
          <SiteImage slot={slot} alt="An evening ritual with The J Effect" sizes="(min-width: 900px) 36vw, 90vw" />
        </div>
        <div>
          <div className="eyebrow reveal">{eyebrow}</div>
          <blockquote className="about-cta__quote reveal reveal--d1">{before}{accent && <em>{accent}</em>}</blockquote>
          <p className="about-cta__body reveal reveal--d2">{body}</p>
          <Link href={btnHref} className="btn-secondary reveal reveal--d3">
            {btnLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
