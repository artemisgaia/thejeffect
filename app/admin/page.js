import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/auth';
import { getAllProducts } from '@/lib/store';
import { loadAnalytics } from '@/lib/admin/stats';
import { HISTORY, CASH, HISTORY_SOURCE, HISTORY_UPDATED } from '@/lib/admin/history';
import { money, dateShort } from '@/lib/admin/format';
import Chart from './_ui/Chart';
import Icon from './_ui/Icon';
import { Badge } from './_ui/parts';

export const metadata = { title: 'Home' };
export const dynamic = 'force-dynamic';

const has = (v) => Boolean(process.env[v]);
const usd = (n) => money(Math.round(n * 100));

export default async function AdminHome() {
  const { supabase } = await requireAdmin();
  const [a, products, { count: subscribers }] = await Promise.all([
    loadAnalytics(supabase, 30),
    getAllProducts(),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }).eq('status', 'subscribed'),
  ]);

  const steps = [
    { icon: 'tag', title: 'Add your products', text: `${products.filter((p) => p.published !== false).length} products are live. Edit prices, photos and copy any time.`, cta: 'Manage products', href: '/admin/products', done: products.length > 0 },
    { icon: 'card', title: 'Payments', text: 'Customers pay through Stripe at checkout.', cta: 'Payment settings', href: '/admin/settings/payments', done: has('STRIPE_SECRET_KEY') },
    { icon: 'truck', title: 'Review shipping rates', text: 'Check the standard, expedited and overnight rates used at checkout.', cta: 'Shipping settings', href: '/admin/settings/shipping', done: false },
    { icon: 'mail', title: 'Connect email', text: 'Add Resend so welcome emails and campaigns can send.', cta: 'Open campaigns', href: '/admin/campaigns', done: has('RESEND_API_KEY') },
    { icon: 'globe', title: 'Domain', text: 'www.thejeffect.com is connected through Vercel.', cta: 'Domain settings', href: '/admin/settings/domains', done: true },
    { icon: 'shield', title: 'Review policies', text: 'Add your refund, shipping and privacy policies.', cta: 'Open policies', href: '/admin/settings/policies', done: false },
  ];
  const stats = [
    { label: 'Total sales', value: money(a.total), note: 'last 30 days' },
    { label: 'Orders', value: a.orderCount, note: 'last 30 days' },
    { label: 'Sessions', value: a.sessions, note: a.hasTraffic ? 'last 30 days' : 'tracking starts with the next visit' },
    { label: 'Conversion rate', value: `${a.conversion}%`, note: 'sessions that bought' },
    { label: 'Email subscribers', value: subscribers ?? 0, note: 'on the list' },
  ];
  const ytdRev = CASH.totalRevenue;
  const ytdProfit = CASH.cumulativeProfit;
  const labels = HISTORY.map((h) => h.short);

  return (
    <div className="adm-wide">
      <header className="adm-head">
        <div><h1><Icon name="home" size={20} /> Home</h1><p>Here’s what’s happening with The J Effect.</p></div>
        <div className="adm-head__actions">
          <Link href="/admin/analytics" className="adm-btn">View analytics</Link>
          <Link href="/admin/products" className="adm-btn adm-btn--primary">Products</Link>
        </div>
      </header>

      <div className="adm-grid adm-grid--stats">
        {stats.map((s) => (
          <div className="adm-stat" key={s.label}>
            <span className="adm-stat__label">{s.label}</span>
            <div className="adm-stat__value">{s.value}</div>
            <div className="adm-stat__note">{s.note}</div>
          </div>
        ))}
      </div>

      <div className="adm-split">
        <div>
          <section className="adm-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div><h2>Performance to date · 2026</h2><p className="adm-card__sub">Imported from {HISTORY_SOURCE} (updated {dateShort(HISTORY_UPDATED)}). Covers the previous store, before Stripe checkout.</p></div>
              <div className="adm-legend-row"><span><i style={{ background: '#5bc0eb' }} />Revenue</span><span><i style={{ background: '#2d8f5f' }} />Profit</span></div>
            </div>
            <div className="adm-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, margin: '4px 0 12px' }}>
              <div><span className="adm-stat__label">Revenue</span><div className="adm-stat__value">{usd(ytdRev)}</div></div>
              <div><span className="adm-stat__label">Profit</span><div className="adm-stat__value">{usd(ytdProfit)}</div></div>
              <div><span className="adm-stat__label">Available cash</span><div className="adm-stat__value">{usd(CASH.available)}</div></div>
            </div>
            <Chart labels={labels} format={(v) => (v >= 1000 ? `$${Math.round(v / 1000)}k` : `$${v}`)} series={[{ label: 'Revenue', color: '#5bc0eb', points: HISTORY.map((h) => h.revenue), area: true }, { label: 'Profit', color: '#2d8f5f', points: HISTORY.map((h) => h.profit) }]} />
          </section>

          <section className="adm-card">
            <h2>Sales over time · last 30 days</h2>
            <p className="adm-card__sub">{a.orderCount ? 'Paid orders from Stripe checkout.' : 'No orders yet. Orders appear here the moment a customer pays through Stripe.'}</p>
            <Chart labels={a.days.map((d) => d.slice(5))} format={(v) => `$${Math.round(v / 100)}`} series={[{ label: 'Sales', color: '#5bc0eb', points: a.salesSeries, area: true }]} />
          </section>
        </div>

        <div>
          <section className="adm-card">
            <h2>Setup guide</h2>
            <p className="adm-card__sub">{steps.filter((s) => s.done).length} of {steps.length} steps done</p>
            <ul className="adm-checks">
              {steps.map((s) => (
                <li key={s.title}>
                  <i className={`adm-dot ${s.done ? 'adm-dot--ok' : 'adm-dot--off'}`} aria-hidden="true" />
                  <div><strong>{s.title}</strong><span>{s.text} <Link href={s.href} className="adm-link">{s.cta}</Link></span></div>
                </li>
              ))}
            </ul>
          </section>
          <section className="adm-card">
            <h2>Cash position</h2>
            <dl className="adm-kv" style={{ marginTop: 8 }}>
              <div><dt>Reinvested</dt><dd>{usd(CASH.reinvested)}</dd></div>
              <div><dt>Held in reserve</dt><dd>{usd(CASH.reserve)}</dd></div>
              <div><dt>Owner draw</dt><dd>{usd(CASH.ownerDraw)}</dd></div>
              <div><dt>Taxes owed</dt><dd>{usd(CASH.taxesOwed)}</dd></div>
            </dl>
            <p className="adm-card__sub" style={{ marginTop: 10 }}>Figures from the Private Office. <Badge tone="info">Imported</Badge></p>
          </section>
        </div>
      </div>
    </div>
  );
}
