import Link from 'next/link';
import Image from 'next/image';
import { POSTS } from '@/lib/products';
import EmailSignup from '@/components/EmailSignup';

export const metadata = {
  title: 'Journal — The J Effect',
  description: 'Ritual guidance, ingredient insight, and skincare wisdom from The J Effect.',
};

export default function JournalPage() {
  return (
    <>
      {/* Blog Hero */}
      <div className="collection-hero blog-hero">
        <div className="collection-hero__inner">
          <div className="eyebrow eyebrow--light reveal">The J Effect Journal</div>
          <h1 className="section-title section-title--light reveal reveal--d1">
            Ritual wisdom &amp; ingredient truth.
          </h1>
          <p className="collection-hero__sub reveal reveal--d2">
            Everything you need to build an intentional, effective skincare practice — at your pace.
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <section className="section section--lg" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 24px' }}>
          <div className="blog-grid">
            {POSTS.map((post, i) => (
              <article className={`article-card reveal reveal--d${i + 1}`} key={post.slug}>
                <Link href={`/journal/${post.slug}`} style={{ display: 'block' }}>
                  <div className="article-card__img">
                    <Image
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      width={800}
                      height={500}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </Link>
                <div className="article-card__body">
                  <span className="article-card__date">{post.date}</span>
                  <h2 className="article-card__title">
                    <Link href={`/journal/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="article-card__excerpt">{post.excerpt}</p>
                  <Link href={`/journal/${post.slug}`} className="view-all-link" style={{ marginTop: '16px', display: 'inline-flex' }}>
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EmailSignup />
    </>
  );
}
