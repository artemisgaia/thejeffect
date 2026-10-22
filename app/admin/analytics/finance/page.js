import { requireAdmin } from '@/lib/admin/auth';
import { HISTORY, CASH, HISTORY_SOURCE, HISTORY_UPDATED } from '@/lib/admin/history';
import { money, dateShort } from '@/lib/admin/format';
import Chart from '../../_ui/Chart';
import { PageHead, Badge } from '../../_ui/parts';

export const metadata = { title: 'Finance' };
export const dynamic = 'force-dynamic';

const usd = (n) => money(Math.round(n * 100));

export default async function Finance() {
  await requireAdmin();
  const labels = HISTORY.map((h) => h.short);
  const kpi = [
    ['Current available cash', usd(CASH.available), 'Liquid balance in business accounts (Shopify payouts + bank)'],
    ['Total reinvested', usd(CASH.reinvested), 'Capital deployed back into the business'],
    ['Held in reserve', usd(CASH.reserve), 'Set aside as a buffer'],
    ['Owner draw (all time)', usd(CASH.ownerDraw), 'Withdrawn for personal use'],
  ];
  const totals = [
    ['Cumulative net profit', usd(CASH.cumulativeProfit)], ['Total revenue', usd(CASH.totalRevenue)],
    ['Total expenses', usd(CASH.totalExpenses)], ['Taxes owed', usd(CASH.taxesOwed)],
  ];
  return (
    <div className="adm-wide">
      <PageHead title="Finance" icon="chart" sub={`Imported from ${HISTORY_SOURCE}. Last updated ${dateShort(HISTORY_UPDATED)}. These are the previous store's results, before Stripe checkout.`} />

      <div className="adm-grid adm-grid--stats">
        {kpi.map(([l, v, n]) => (<div className="adm-stat" key={l}><span className="adm-stat__label">{l}</span><div className="adm-stat__value">{v}</div><div className="adm-stat__note">{n}</div></div>))}
      </div>
      <p className="adm-card__sub">Profit is not the same as balance. The periods below show what was earned each period; after reinvestment and reserves, the cash available to spend is what the balance above reflects.</p>

      <div className="adm-grid adm-grid--stats">
        {totals.map(([l, v]) => (<div className="adm-stat" key={l}><span className="adm-stat__label">{l}</span><div className="adm-stat__value">{v}</div></div>))}
      </div>

      <section className="adm-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <h2>Revenue, profit and expenses by month</h2>
          <div className="adm-legend-row"><span><i style={{ background: '#5bc0eb' }} />Revenue</span><span><i style={{ background: '#2d8f5f' }} />Profit</span><span><i style={{ background: '#c4954a' }} />Expenses</span></div>
        </div>
        <Chart labels={labels} format={(v) => (v >= 1000 ? `$${Math.round(v / 1000)}k` : `$${v}`)} series={[
          { label: 'Revenue', color: '#5bc0eb', points: HISTORY.map((h) => h.revenue), area: true },
          { label: 'Expenses', color: '#c4954a', points: HISTORY.map((h) => h.expenses) },
          { label: 'Profit', color: '#2d8f5f', points: HISTORY.map((h) => h.profit) },
        ]} />
      </section>

      <section className="adm-card adm-card--flush" style={{ marginTop: 16 }}>
        <div className="adm-table-scroll">
          <table className="adm-table">
            <thead><tr><th>Period</th><th className="num">Revenue</th><th className="num">Profit</th><th className="num">Expenses</th><th className="num">Margin</th><th className="num">Taxes owed</th></tr></thead>
            <tbody>
              {[...HISTORY].reverse().map((h) => (
                <tr key={h.period}>
                  <td><strong style={{ fontWeight: 550 }}>{h.period}</strong><div style={{ color: 'var(--a-muted)', fontSize: 12 }}>The J Effect</div></td>
                  <td className="num">{usd(h.revenue)}</td><td className="num">{usd(h.profit)}</td><td className="num">{usd(h.expenses)}</td>
                  <td className="num">{((h.profit / h.revenue) * 100).toFixed(1)}%</td><td className="num">{usd(0)}</td>
                </tr>
              ))}
              <tr><td><strong>Total</strong></td><td className="num"><strong>{usd(CASH.totalRevenue)}</strong></td><td className="num"><strong>{usd(CASH.cumulativeProfit)}</strong></td><td className="num"><strong>{usd(CASH.totalExpenses)}</strong></td><td className="num"><strong>{((CASH.cumulativeProfit / CASH.totalRevenue) * 100).toFixed(1)}%</strong></td><td className="num">{usd(0)}</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <p className="adm-card__sub" style={{ marginTop: 10 }}><Badge tone="info">Imported</Badge> New sales through Stripe appear in Analytics, Orders and Customers.</p>
    </div>
  );
}
