import { notFound } from 'next/navigation';
import { supabaseConfigured, SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/supabase/config';

// Pages edited in Admin → Online Store → Pages (public.pages, published only).
export const revalidate = 300;

async function getPage(handle) {
  if (!supabaseConfigured) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/pages?select=title,body&handle=eq.${encodeURIComponent(handle)}&published=eq.true&limit=1`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }, next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return (await res.json())[0] || null;
  } catch { return null; }
}

export async function generateMetadata({ params }) {
  const { handle } = await params;
  const p = await getPage(handle);
  return p ? { title: p.title } : {};
}

export default async function AdminPage({ params }) {
  const { handle } = await params;
  const page = await getPage(handle);
  if (!page) notFound();
  const paras = String(page.body || '').split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
  return (
    <>
      <div className="collection-hero">
        <div className="collection-hero__inner"><h1 className="section-title section-title--light">{page.title}</h1></div>
      </div>
      <section className="legal">
        <div className="legal__inner" style={{ maxWidth: 760, margin: '0 auto', padding: '56px 20px 96px' }}>
          {paras.map((t, i) => <p key={i} style={{ marginBottom: 18, lineHeight: 1.8 }}>{t}</p>)}
        </div>
      </section>
    </>
  );
}
