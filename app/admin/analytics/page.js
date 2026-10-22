import { requireAdmin } from '@/lib/admin/auth';
import { loadAnalytics, loadHistory, summarizeHistory } from '@/lib/admin/stats';
import { HISTORY_SOURCE, CASH } from '@/lib/admin/history';
import { money } from '@/lib/admin/format';
import Chart from '../_ui/Chart';
import { PageHead } from '../_ui/parts';
import Link from 'next/link';

export const metadata = { title: 'Analytics' };
export const dynamic = 'force-dynamic';

const RANGES = { ytd: '2026 to date (imported)', '7': 'Last 7 days', '30': 'Last 30 days', '90': 'Last 90 days' };
const dash = (v, f = (x) => x) => (v == null ? '—' : f(v));

export default async function Analytics({ searchParams }) {
  const sp = await searchParams;
  const { supabase } = await requireAdmin();
  const live30 = await loadAnalytics(supabase, 30);
  // Until Stripe orders exist, default to the real imported 2026 history.
  const range = RANGES[sp?.range] ? sp.range : live30.orderCount > 0 ? '30' : 'ytd';
  const ytd = range === 'ytd';
  const days = ytd ? 30 : Number(range);
  const a = ytd ? live30 : await loadAnalytics(supabase, days);
  const hist = await loadHistory(supabase);
  const h = summarizeHistory(hist);
  const labels = ytd ? hist.map((r) => r.short) : a.days.map((d) => d.slice(5));
  const salesSeries = ytd ? hist.map((r) => r.revenue) : a.salesSeries;
  const salesTotal = ytd ? h.revenue : a.total;
  // Monthly figures are rounded, so when they match the Private Office totals within $2, show the exact totals.
  const near = (v, exact) => (Math.abs(v - exact * 100) <= 200 ? exact * 100 : v);
  const profitShown = near(h.profit, CASH.cumulativeProfit);
  const expensesShown = near(h.expenses, CASH.totalExpenses);
  const maxSrc = Math.max(1, ...a.bySource.map(([, n]) => n));
  const maxDev = Math.max(1, ...a.byDevice.map(([, n]) => n));
  const maxProd = Math.max(1, ...a.topProducts.map((p) => p.sales));

  const kpis = ytd
    ? [['Gross sales', money(h.revenue)], ['Returning customer rate', dash(h.returningRate, (x) => `${x}%`)], ['Orders fulfilled', dash(h.fulfilled)], ['Orders', dash(h.orders)]]
    : [['Gross sales', money(a.gross)], ['Returning customer rate', a.returningRate == null ? '—' : `${a.returningRate}%`], ['Orders fulfilled', a.fulfilled], ['Orders', a.orderCount]];

  return (
    <div className="adm-wide">
      <PageHead title="Analytics" icon="chart" sub="Orders come from Stripe checkout. Sessions come from the site’s own tracking, alongside Vercel Analytics.">
        <form className="adm-actions" method="get">
          <select className="adm-input" name="range" defaultValue={range} aria-label="Date range">
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
          <div className="adm-stat__value" style={{ marginBottom: 8 }}>{money(salesTotal)}</div>
          <Chart labels={labels} format={(v) => (v >= 100000 ? `$${Math.round(v / 100000)}k` : `$${Math.round(v / 100)}`)} series={[{ label: 'Sales', color: '#5bc0eb', points: salesSeries, area: true }, ...(ytd ? [{ label: 'Profit', color: '#2d8f5f', points: hist.map((r) => r.profit) }] : [])]} />
          {ytd && <p className="adm-card__sub" style={{ marginTop: 8 }}>Monthly revenue and profit from {HISTORY_SOURCE}. Orders and customer counts are blank until entered under <Link href="/admin/analytics/history" className="adm-link">Monthly history</Link>.</p>}
        </section>
        <section className="adm-card">
          <h2>Total sales breakdown</h2>
          {ytd ? (
            <dl className="adm-kv" style={{ marginTop: 8 }}>
              <div><dt>Revenue</dt><dd>{money(h.revenue)}</dd></div>
              <div><dt>Expenses</dt><dd>−{money(expensesShown)}</dd></div>
              <div><dt>Profit</dt><dd>{money(profitShown)}</dd></div>
              <div><dt>Margin</dt><dd>{h.revenue ? ((profitShown / h.revenue) * 100).toFixed(1) : '0.0'}%</dd></div>
              <div><dt>Average order value</dt><dd>{dash(h.aov, money)}</dd></div>
              <div><dt><strong>Total sales</strong></dt><dd><strong>{money(h.revenue)}</strong></dd></div>
            </dl>
          ) : (
            <dl className="adm-kv" style={{ marginTop: 8 }}>
              <div><dt>Gross sales</dt><dd>{money(a.gross)}</dd></div>
              <div><dt>Discounts</dt><dd>−{money(a.discounts)}</dd></div>
              <div><dt>Returns</dt><dd>−{money(a.refunds)}</dd></div>
              <div><dt>Net sales</dt><dd>{money(a.net)}</dd></div>
              <div><dt>Shipping charges</dt><dd>{money(a.shipping)}</dd></div>
              <div><dt>Taxes</dt><dd>{money(a.tax)}</dd></div>
              <div><dt><strong>Total sales</strong></dt><dd><strong>{money(a.total)}</strong></dd></div>
            </dl>
          )}
        </section>
      </div>

      <div className="adm-grid adm-grid--2" style={{ marginTop: 16 }}>
        <section className="adm-card">
          <h2>Sessions over time</h2>
          <div className="adm-stat__value" style={{ marginBottom: 8 }}>{a.sessions}</div>
          <Chart labels={a.days.map((d) => d.slice(5))} series={[{ label: 'Sessions', color: '#5bc0eb', points: a.sessionsSeries, area: true }]} />
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
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div><h2>Monthly history · 2026</h2><p className="adm-card__sub">Imported from {HISTORY_SOURCE}. These months were sold before Stripe checkout.</p></div>
          <Link href="/admin/analytics/history" className="adm-btn adm-btn--small">Edit history</Link>
        </div>
        <div className="adm-table-scroll">
          <table className="adm-table">
            <thead><tr><th>Period</th><th className="num">Revenue</th><th className="num">Profit</th><th className="num">Orders</th><th className="num">Fulfilled</th><th className="num">Returning</th></tr></thead>
            <tbody>
              {[...hist].reverse().map((r) => (
                <tr key={r.label}><td>{r.label}</td><td className="num">{money(r.revenue)}</td><td className="num">{money(r.profit)}</td><td className="num">{dash(r.orders)}</td><td className="num">{dash(r.fulfilled)}</td><td className="num">{dash(r.returning)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
