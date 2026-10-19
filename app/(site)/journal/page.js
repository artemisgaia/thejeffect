import Link from 'next/link';
import SiteImage from '@/components/SiteImage';
import { POSTS } from '@/lib/products';
import EmailSignup from '@/components/EmailSignup';

export const metadata = {
  title: 'Journal — The J Effect',
  description: 'Ritual guidance, ingredient insight, and skincare wisdom from The J Effect.',
};

export default function JournalPage() {
  return (
    <>
      <div className="collection-hero">
        <div className="collection-hero__inner">
          <div className="eyebrow eyebrow--light reveal">The J Effect Journal</div>
          <h1 className="section-title section-title--light reveal reveal--d1">
            Ritual wisdom &amp; <em>ingredient truth.</em>
          </h1>
          <p className="collection-hero__sub reveal reveal--d2">
            Everything you need to build an intentional, effective skincare practice, at your pace.
          </p>
        </div>
      </div>

      <section className="journal">
        <div className="journal__grid">
          {POSTS.map((post, i) => (
            <article className={`article-card reveal reveal--d${i + 1}`} key={post.slug}>
              <Link href={`/journal/${post.slug}`} className="article-card__img" aria-label={post.title}>
                <SiteImage slot={post.slot} alt={post.title} sizes="(min-width: 900px) 30vw, 90vw" />
              </Link>
              <div className="article-card__body">
                <span className="article-card__date">{post.date}</span>
                <h2 className="article-card__title"><Link href={`/journal/${post.slug}`}>{post.title}</Link></h2>
                <p className="article-card__excerpt">{post.excerpt}</p>
                <Link href={`/journal/${post.slug}`} className="view-all-link">Read more <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <EmailSignup />
    </>
  );
}
