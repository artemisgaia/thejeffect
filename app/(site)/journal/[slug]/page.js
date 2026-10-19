import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS } from '@/lib/products';
import EmailSignup from '@/components/EmailSignup';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — Journal | The J Effect`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="blog-post">
        {/* Post Hero */}
        <header className="blog-post__hero">
          <div className="blog-post__hero-img-wrap reveal reveal--d1">
            <Image
              className="is-pending-img"
              src={post.image}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="pending-badge">
              <span className="pending-badge__label">Coming Soon</span>
              <span className="pending-badge__sub">Updating Inventory</span>
            </div>
          </div>
          <div className="blog-post__header-content">
            <div className="eyebrow eyebrow--center reveal reveal--d2">{post.date}</div>
            <h1 className="section-title section-title--dark reveal reveal--d3" style={{ textAlign: 'center', marginTop: '16px', maxWidth: '800px', margin: '16px auto 0' }}>
              {post.title}
            </h1>
          </div>
        </header>

        {/* Post Body */}
        <div className="blog-post__body-container reveal">
          <div 
            className="blog-post__content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Back Link */}
        <div className="blog-post__footer reveal" style={{ textAlign: 'center', padding: '60px 20px', borderTop: '1px solid var(--cream-3)' }}>
          <Link href="/journal" className="btn-secondary">
            ← Back to Journal
          </Link>
        </div>
      </article>

      <EmailSignup />
    </>
  );
}
