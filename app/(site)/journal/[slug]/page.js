import SiteImage from '@/components/SiteImage';
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
      <article className="post">
        <header className="post__header">
          <div className="eyebrow eyebrow--center reveal">{post.date}</div>
          <h1 className="post__title reveal reveal--d1">{post.title}</h1>
        </header>
        <div className="post__hero reveal reveal--d2">
          <SiteImage slot={post.slot} alt={post.title} priority sizes="(min-width: 900px) 70vw, 100vw" />
        </div>
        <div className="post__content reveal" dangerouslySetInnerHTML={{ __html: post.content }} />
        <footer className="post__footer reveal">
          <Link href="/journal" className="btn-outline"><span aria-hidden="true">←</span> Back to Journal</Link>
        </footer>
      </article>

      <EmailSignup />
    </>
  );
}
