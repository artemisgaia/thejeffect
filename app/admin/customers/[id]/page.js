import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { money, dateTime } from '@/lib/admin/format';
import { PageHead, Badge, titleCase } from '../../_ui/parts';
import CustomerForm from '../CustomerForm';
import ResourcePage from '../../_ui/resource-page';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Customer' };

export default async function Customer({ params, searchParams }) {
  const { id } = await params;
  if (id === 'segments' || id === 'companies') return <ResourcePage parts={['customers', id]} searchParams={await searchParams} />;
  const { supabase } = await requireAdmin();
  if (id === 'new') {
    return (<><div className="adm-narrow" /><PageHead title="Add customer" icon="users" back={{ href: '/admin/customers', label: 'Customers' }} /><CustomerForm /></>);
  }
  const { data: c } = await supabase.from('customers').select('*').eq('id', id).maybeSingle();
  if (!c) notFound();
  const { data: orders } = await supabase.from('orders').select('*').eq('customer_id', id).order('created_at', { ascending: false });
  return (
    <>
      <div className="adm-narrow" />
      <PageHead title={c.name || c.email} icon="users" back={{ href: '/admin/customers', label: 'Customers' }} />
      <div className="adm-grid adm-grid--stats"><div className="adm-stat"><span className="adm-stat__label">Amount spent</span><div className="adm-stat__value">{money(c.total_spent)}</div></div><div className="adm-stat"><span className="adm-stat__label">Orders</span><div className="adm-stat__value">{c.orders_count}</div></div><div className="adm-stat"><span className="adm-stat__label">Customer since</span><div className="adm-stat__value" style={{ fontSize: 16 }}>{dateTime(c.created_at)}</div></div></div>
      {(orders || []).length > 0 && (
        <section className="adm-card adm-card--flush" style={{ marginBottom: 16 }}>
          <div className="adm-card__head"><h2>Orders</h2></div>
          <table className="adm-table"><tbody>{orders.map((o) => (<tr key={o.id}><td><Link className="adm-link" href={`/admin/orders/${o.id}`}>#{o.number}</Link></td><td>{dateTime(o.created_at)}</td><td><Badge tone={o.status === 'paid' ? 'ok' : 'warn'} fill>{titleCase(o.status)}</Badge></td><td className="num">{money(o.total)}</td></tr>))}</tbody></table>
        </section>
      )}
      <CustomerForm c={c} />
    </>
  );
}
