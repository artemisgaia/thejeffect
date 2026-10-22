import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/auth';
import { money, dateTime } from '@/lib/admin/format';
import { PageHead, EmptyState, Badge, titleCase } from '../_ui/parts';
import Icon from '../_ui/Icon';

export const metadata = { title: 'Orders' };
export const dynamic = 'force-dynamic';

const TABS = [['all', 'All'], ['unfulfilled', 'Unfulfilled'], ['unpaid', 'Unpaid'], ['refunded', 'Refunded'], ['open', 'Open']];
const PAY = { paid: 'ok', refunded: 'danger', partially_refunded: 'warn', pending: 'warn', cancelled: 'danger' };

export default async function Orders({ searchParams }) {
  const sp = await searchParams;
  const tab = TABS.some(([k]) => k === sp?.tab) ? sp.tab : 'all';
  const q = String(sp?.q || '').trim().toLowerCase();
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(500);
  const all = data || [];
  const rows = all.filter((o) => {
    if (tab === 'unfulfilled' && !(o.fulfillment === 'unfulfilled' && o.status !== 'cancelled' && o.status !== 'refunded')) return false;
    if (tab === 'unpaid' && o.status !== 'pending') return false;
    if (tab === 'refunded' && !(o.status === 'refunded' || o.status === 'partially_refunded')) return false;
    if (tab === 'open' && !(o.fulfillment === 'unfulfilled' && o.status !== 'cancelled')) return false;
    return !q || `${o.number} ${o.name} ${o.email}`.toLowerCase().includes(q);
  });
  const count = (k) => all.filter((o) => (k === 'all' ? true : k === 'unfulfilled' || k === 'open' ? o.fulfillment === 'unfulfilled' && o.status !== 'cancelled' : k === 'unpaid' ? o.status === 'pending' : o.status === 'refunded' || o.status === 'partially_refunded')).length;

  return (
    <div className="adm-wide">
      <PageHead title="Orders" icon="orders">
        <Link href="/admin/orders/drafts/new" className="adm-btn adm-btn--primary"><Icon name="plus" size={14} /> Create order</Link>
      </PageHead>
      {all.length === 0 ? (
        <EmptyState art="orders" title="Your orders will show here" text="This is where you’ll fulfill orders, collect payments, and track order progress. Orders arrive automatically when customers pay through Stripe checkout." cta="Create order" href="/admin/orders/drafts/new" learn="orders" />
      ) : (
        <div className="adm-table-wrap">
          <div className="adm-tabs" role="tablist">
            {TABS.map(([k, l]) => (<Link key={k} role="tab" aria-selected={tab === k} href={`/admin/orders?tab=${k}`} className={`adm-tab${tab === k ? ' is-active' : ''}`}>{l} <span className="adm-pill">{count(k)}</span></Link>))}
          </div>
          <form className="adm-toolbar" role="search"><input type="hidden" name="tab" value={tab} /><input className="adm-input" type="search" name="q" defaultValue={sp?.q || ''} placeholder="Search orders" aria-label="Search orders" /><button className="adm-btn" type="submit">Search</button></form>
          <div className="adm-table-scroll">
            <table className="adm-table">
              <thead><tr><th>Order</th><th>Date</th><th>Customer</th><th className="num">Total</th><th>Payment status</th><th>Fulfillment status</th><th className="num">Items</th><th>Delivery method</th></tr></thead>
              <tbody>
                {rows.map((o) => (
                  <tr key={o.id}>
                    <td><Link href={`/admin/orders/${o.id}`} className="adm-link" style={{ color: 'inherit', fontWeight: 600 }}>#{o.number}</Link></td>
                    <td>{dateTime(o.created_at)}</td>
                    <td>{o.name || o.email || '—'}</td>
                    <td className="num">{money(o.total)}</td>
                    <td><Badge tone={PAY[o.status] || ''} fill={o.status === 'paid'}>{titleCase(o.status)}</Badge></td>
                    <td><Badge tone={o.fulfillment === 'fulfilled' ? 'ok' : 'warn'} fill={o.fulfillment === 'fulfilled'}>{titleCase(o.fulfillment)}</Badge></td>
                    <td className="num">{(o.items || []).reduce((s, i) => s + i.quantity, 0)}</td>
                    <td>{o.shipping_method || '—'}</td>
                  </tr>
                ))}
                {rows.length === 0 && <tr><td colSpan={8} className="adm-empty">No orders match.</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="adm-foot">{rows.length} orders</div>
        </div>
      )}
      <p className="adm-learn">Learn more about <a href="https://thejeffect.com" target="_blank" rel="noreferrer">orders</a></p>
    </div>
  );
}
