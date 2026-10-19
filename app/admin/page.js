import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/auth';
import { getAllProducts } from '@/lib/store';

export const metadata = { title: 'Overview' };
export const dynamic = 'force-dynamic';

const has = (v) => Boolean(process.env[v]);

export default async function AdminOverview() {
  const { supabase } = await requireAdmin();
  const products = await getAllProducts();

  const [{ count: subscribers }, { data: campaigns }] = await Promise.all([
    supabase.from('subscribers').select('*', { count: 'exact', head: true }).eq('status', 'subscribed'),
    supabase.from('campaigns').select('id, subject, status, recipients, sent_at, created_at').order('created_at', { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: 'Products live', value: products.filter((p) => p.published).length, note: `${products.length} in catalog` },
    { label: 'Hidden', value: products.filter((p) => !p.published).length, note: 'not shown on the site' },
    { label: 'Sold out', value: products.filter((p) => p.sold_out).length, note: 'cannot be purchased' },
    { label: 'Subscribers', value: subscribers ?? 0, note: 'on the email list' },
  ];

  const checks = [
    { ok: true, title: 'Supabase', text: 'Connected. You are signed in.' },
    { ok: has('SUPABASE_SERVICE_ROLE_KEY'), title: 'Newsletter storage', text: 'SUPABASE_SERVICE_ROLE_KEY lets sign-ups be saved to the subscribers table.' },
    { ok: has('RESEND_API_KEY'), title: 'Resend API key', text: 'Needed for welcome emails and campaigns.' },
    { ok: has('RESEND_SEGMENT_ID'), title: 'Resend segment', text: 'RESEND_SEGMENT_ID is the list campaigns are sent to.' },
    { ok: has('FORMSPREE_FORM_ID'), title: 'Formspree', text: 'FORMSPREE_FORM_ID delivers contact-page messages to your inbox.' },
    { ok: has('STRIPE_SECRET_KEY'), title: 'Stripe checkout', text: 'STRIPE_SECRET_KEY is required to take payments.' },
    { ok: has('NEXT_PUBLIC_SITE_URL'), title: 'Site URL', text: 'NEXT_PUBLIC_SITE_URL is used for checkout redirects.' },
  ];

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Overview</h1>
          <p>Edit products and photos, manage subscribers and send campaigns. Changes go live on the storefront immediately.</p>
        </div>
        <Link href="/admin/products" className="adm-btn adm-btn--primary">Manage products</Link>
      </header>

      <div className="adm-grid adm-grid--stats">
        {stats.map((s) => (
          <div className="adm-stat" key={s.label}>
            <div className="adm-stat__label">{s.label}</div>
            <div className="adm-stat__value">{s.value}</div>
            <div className="adm-stat__note">{s.note}</div>
          </div>
        ))}
      </div>

      <div className="adm-grid adm-grid--2">
        <section className="adm-card">
          <h2>Setup checklist</h2>
          <p className="adm-card__sub">Environment variables are set in Vercel and <code>.env.local</code>.</p>
          <ul className="adm-checks">
            {checks.map((c) => (
              <li key={c.title}>
                <i className={`adm-dot ${c.ok ? 'adm-dot--ok' : 'adm-dot--off'}`} aria-hidden="true" />
                <div><strong>{c.title}{c.ok ? '' : ' · not set'}</strong><span>{c.text}</span></div>
              </li>
            ))}
          </ul>
        </section>

        <section className="adm-card">
          <h2>Recent campaigns</h2>
          <p className="adm-card__sub">Emails sent through Resend.</p>
          {campaigns?.length ? (
            <ul className="adm-checks">
              {campaigns.map((c) => (
                <li key={c.id}>
                  <i className={`adm-dot ${c.status === 'sent' ? 'adm-dot--ok' : ''}`} aria-hidden="true" />
                  <div>
                    <strong>{c.subject}</strong>
                    <span>{c.status === 'sent' ? `Sent to ${c.recipients ?? '?'} · ${new Date(c.sent_at).toLocaleDateString()}` : 'Draft'}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="adm-empty">No campaigns yet. <Link href="/admin/campaigns" className="adm-btn--link">Write the first one</Link>.</p>
          )}
        </section>
      </div>
    </>
  );
}
