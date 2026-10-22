import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { money, dateTime } from '@/lib/admin/format';
import { PageHead, Badge, titleCase } from '../../_ui/parts';
import { FulfillForm, RefundForm, NoteForm } from '../OrderForms';
import { unfulfillOrder, cancelOrder } from '../actions';
import ResourcePage from '../../_ui/resource-page';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Order' };

export default async function Order({ params, searchParams }) {
  const { id } = await params;
  if (id === 'drafts' || id === 'abandoned') return <ResourcePage parts={['orders', id]} searchParams={await searchParams} />;
  const { supabase } = await requireAdmin();
  const { data: o } = await supabase.from('orders').select('*').eq('id', id).maybeSingle();
  if (!o) notFound();
  const a = o.shipping_address || {};
  const remaining = o.total - (o.refunded || 0);
  return (
    <>
      <div className="adm-narrow" />
      <PageHead title={`#${o.number}`} icon="orders" back={{ href: '/admin/orders', label: 'Orders' }}>
        <Badge tone={o.status === 'paid' ? 'ok' : 'warn'} fill={o.status === 'paid'}>{titleCase(o.status)}</Badge>
        <Badge tone={o.fulfillment === 'fulfilled' ? 'ok' : 'warn'} fill={o.fulfillment === 'fulfilled'}>{titleCase(o.fulfillment)}</Badge>
        {o.status !== 'cancelled' && <form action={cancelOrder}><input type="hidden" name="id" value={o.id} /><button className="adm-btn adm-btn--danger adm-btn--small">Cancel order</button></form>}
      </PageHead>
      <p className="adm-card__sub" style={{ marginTop: -8 }}>{dateTime(o.created_at)} · {titleCase(o.source)}</p>
      <div className="adm-split">
        <div>
          <section className="adm-card adm-card--flush">
            <div className="adm-card__head"><h2><Badge tone={o.fulfillment === 'fulfilled' ? 'ok' : 'warn'} fill={o.fulfillment === 'fulfilled'}>{titleCase(o.fulfillment)}</Badge></h2></div>
            {(o.items || []).map((it, i) => (
              <div className="adm-linegroup" key={i}>
                <div className="adm-prod">{it.image ? /* eslint-disable-next-line @next/next/no-img-element */ <img className="adm-thumb" src={it.image} alt="" /> : <span className="adm-thumb" />}<div><strong>{it.name}</strong><span>{money(it.price)} × {it.quantity}</span></div></div>
                <strong>{money(it.price * it.quantity)}</strong>
              </div>
            ))}
            {o.fulfillment === 'fulfilled' ? (
              <div className="adm-linegroup"><div><strong>Fulfilled {dateTime(o.fulfilled_at)}</strong>{o.tracking && <span>{o.tracking.carrier} {o.tracking.number}</span>}</div><form action={unfulfillOrder}><input type="hidden" name="id" value={o.id} /><button className="adm-btn adm-btn--small">Mark unfulfilled</button></form></div>
            ) : o.status !== 'cancelled' && <FulfillForm id={o.id} />}
          </section>
          <section className="adm-card adm-card--flush">
            <div className="adm-card__head"><h2><Badge tone={o.status === 'paid' ? 'ok' : 'warn'} fill>{titleCase(o.status)}</Badge></h2></div>
            <div className="adm-card__body"><div className="adm-totals">
              <div><span>Subtotal</span><span>{money(o.subtotal)}</span></div>
              {o.discount > 0 && <div><span>Discount {o.discount_code && `(${o.discount_code})`}</span><span>−{money(o.discount)}</span></div>}
              <div><span>Shipping ({o.shipping_method || '—'})</span><span>{money(o.shipping)}</span></div>
              {o.tax > 0 && <div><span>Tax</span><span>{money(o.tax)}</span></div>}
              <div className="tot"><span>Total</span><span>{money(o.total)}</span></div>
              {o.refunded > 0 && <div><span>Refunded</span><span>−{money(o.refunded)}</span></div>}
              <div><span>Net payment</span><span>{money(remaining)}</span></div>
            </div></div>
            {remaining > 0 && o.status !== 'cancelled' && <RefundForm id={o.id} max={remaining} />}
          </section>
        </div>
        <div>
          <section className="adm-card"><h2>Customer</h2>
            <p>{o.customer_id ? <Link className="adm-link" href={`/admin/customers/${o.customer_id}`}>{o.name || o.email}</Link> : (o.name || '—')}</p>
            <p style={{ color: 'var(--a-muted)' }}>{o.email}</p>
          </section>
          <section className="adm-card"><h2>Shipping address</h2>
            <p>{[o.name, a.line1, a.line2, [a.city, a.region, a.postal].filter(Boolean).join(', '), a.country].filter(Boolean).map((l, i) => <span key={i}>{l}<br /></span>)}</p>
          </section>
          <section className="adm-card"><NoteForm id={o.id} note={o.note || ''} tags={o.tags || []} /></section>
        </div>
      </div>
    </>
  );
}
