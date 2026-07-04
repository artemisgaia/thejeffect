import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found — The J Effect',
};

export default function NotFoundPage() {
  return (
    <div style={{ paddingTop: 'calc(var(--announce-h) + var(--header-h) + 40px)', background: 'var(--cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '0 24px 80px' }}>
        <div className="reveal" style={{ fontSize: '10rem', lineHeight: '1', fontFamily: "'Playfair Display', serif", color: 'var(--cream-3)', fontWeight: '500', marginBottom: '24px' }}>
          404
        </div>
        <h1 className="reveal reveal--d1" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: '400', color: 'var(--ink)', marginBottom: '16px' }}>
          Page not found.
        </h1>
        <p className="reveal reveal--d2" style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--ink-soft)', marginBottom: '40px' }}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn-primary reveal reveal--d3">
          Return Home →
        </Link>
      </div>
    </div>
  );
}
