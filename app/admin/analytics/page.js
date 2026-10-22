import { requireAdmin } from '@/lib/admin/auth';
import { loadAnalytics } from '@/lib/admin/stats';
import { HISTORY, HISTORY_SOURCE } from '@/lib/admin/history';
import { money } from '@/lib/admin/format';
import Chart from '../_ui/Chart';
import { PageHead } from '../_ui/parts';
import Link from 'next/link';

export const metadata = { title: 'Analytics' };
export const dynamic = 'force-dynamic';

const RANGES = { '7': 'Last 7 days', '30': 'Last 30 days', '90': 'Last 90 days' };

export default async function Analytics({ searchParams }) {
  const sp = await searchParams;
  const days = RANGES[sp?.range] ? Number(sp.range) : 30;
  const { supabase } = await requireAdmin();
  const a = await loadAnalytics(supabase, days);
  const labels = a.days.map((d) => d.slice(5));
  const maxSrc = Math.max(1, ...a.bySource.map(([, n]) => n));
  const maxDev = Math.max(1, ...a.byDevice.map(([, n]) => n));
  const maxProd = Math.max(1, ...a.topProducts.map((p) => p.sales));

  const kpis = [
    ['Gross sales', money(a.gross)], ['Returning customer rate', a.returningRate == null ? '—' : `${a.returningRate}%`],
    ['Orders fulfilled', a.fulfilled], ['Orders', a.orderCount],
  ];

  return (
    <div className="adm-wide">
      <PageHead title="Analytics" icon="chart" sub="Orders come from Stripe checkout. Sessions come from the site’s own tracking, alongside Vercel Analytics.">
        <form className="adm-actions" method="get">
          <select className="adm-input" name="range" defaultValue={String(days)} aria-label="Date range" onChange={undefined}>
            {Object.entries(RANGES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <button className="adm-btn" type="submit">Apply</button>
          <Link href="/admin/analytics/reports" className="adm-btn">Reports</Link>
        </form>
      </PageHead>

      <div className="adm-grid adm-grid--stats">
        {kpis.map(([l, v]) => (<div className="adm-stat" key={l}><span className="adm-stat__label">{l}</span><div className="adm-stat__value">{v}</div></div>))}
      </div>

      <div className="adm-split">
        <section className="adm-card">
          <h2>Total sales over time</h2>
          <div className="adm-stat__value" style={{ marginBottom: 8 }}>{money(a.total)}</div>
          <Chart labels={labels} format={(v) => `$${Math.round(v / 100)}`} series={[{ label: 'Sales', color: '#5bc0eb', points: a.salesSeries, area: true }]} />
        </section>
        <section className="adm-card">
          <h2>Total sales breakdown</h2>
          <dl className="adm-kv" style={{ marginTop: 8 }}>
            <div><dt>Gross sales</dt><dd>{money(a.gross)}</dd></div>
            <div><dt>Discounts</dt><dd>−{money(a.discounts)}</dd></div>
            <div><dt>Returns</dt><dd>−{money(a.refunds)}</dd></div>
            <div><dt>Net sales</dt><dd>{money(a.net)}</dd></div>
            <div><dt>Shipping charges</dt><dd>{money(a.shipping)}</dd></div>
            <div><dt>Taxes</dt><dd>{money(a.tax)}</dd></div>
            <div><dt><strong>Total sales</strong></dt><dd><strong>{money(a.total)}</strong></dd></div>
          </dl>
        </section>
      </div>

      <div className="adm-grid adm-grid--2" style={{ marginTop: 16 }}>
        <section className="adm-card">
          <h2>Sessions over time</h2>
          <div className="adm-stat__value" style={{ marginBottom: 8 }}>{a.sessions}</div>
          <Chart labels={labels} series={[{ label: 'Sessions', color: '#5bc0eb', points: a.sessionsSeries, area: true }]} />
          {!a.hasTraffic && <p className="adm-card__sub">No visits recorded yet. They appear as soon as people browse the live site.</p>}
        </section>
        <section className="adm-card">
          <h2>Conversion rate breakdown</h2>
          <dl className="adm-kv" style={{ marginTop: 8 }}>
            <div><dt>Sessions</dt><dd>{a.funnel.sessions}</dd></div>
            <div><dt>Added to cart</dt><dd>{a.funnel.cart}</dd></div>
            <div><dt>Reached checkout</dt><dd>{a.funnel.checkout}</dd></div>
            <div><dt>Completed</dt><dd>{a.funnel.purchased}</dd></div>
            <div><dt>Conversion rate</dt><dd>{a.conversion}%</dd></div>
          </dl>
        </section>
        <section className="adm-card">
          <h2>Sessions by traffic source</h2>
          {a.bySource.length === 0 ? <p className="adm-card__sub">No data for this date range</p> : a.bySource.map(([k, n]) => (<div className="adm-bar" key={k}><div><i style={{ width: `${(n / maxSrc) * 100}%` }} /></div><span>{k} · {n}</span></div>))}
        </section>
        <section className="adm-card">
          <h2>Sessions by device type</h2>
          {a.byDevice.length === 0 ? <p className="adm-card__sub">No data for this date range</p> : a.byDevice.map(([k, n]) => (<div className="adm-bar" key={k}><div><i style={{ width: `${(n / maxDev) * 100}%` }} /></div><span>{k} · {n}</span></div>))}
        </section>
        <section className="adm-card">
          <h2>Total sales by product</h2>
          {a.topProducts.length === 0 ? <p className="adm-card__sub">No data for this date range</p> : a.topProducts.map((p) => (<div className="adm-bar" key={p.slug}><div><i style={{ width: `${(p.sales / maxProd) * 100}%` }} /></div><span>{p.name} · {money(p.sales)}</span></div>))}
        </section>
        <section className="adm-card">
          <h2>Top pages</h2>
          {a.topPages.length === 0 ? <p className="adm-card__sub">No data for this date range</p> : (
            <table className="adm-table"><tbody>{a.topPages.map(([p, n]) => (<tr key={p}><td>{p}</td><td className="num">{n}</td></tr>))}</tbody></table>
          )}
        </section>
      </div>

      <section className="adm-card" style={{ marginTop: 16 }}>
        <h2>Monthly history · 2026</h2>
        <p className="adm-card__sub">Imported from {HISTORY_SOURCE}. These months were sold on the previous store.</p>
        <div className="adm-table-scroll">
          <table className="adm-table">
            <thead><tr><th>Period</th><th className="num">Revenue</th><th className="num">Profit</th><th className="num">Expenses</th><th className="num">Margin</th></tr></thead>
            <tbody>
              {[...HISTORY].reverse().map((h) => (
                <tr key={h.period}><td>{h.period}</td><td className="num">{money(h.revenue * 100)}</td><td className="num">{money(h.profit * 100)}</td><td className="num">{money(h.expenses * 100)}</td><td className="num">{((h.profit / h.revenue) * 100).toFixed(1)}%</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
