'use client';
import { useMemo, useState, useActionState } from 'react';
import { createPosOrder } from './actions';
import { money } from '@/lib/admin/format';

export default function PosApp({ products }) {
  const [q, setQ] = useState('');
  const [cart, setCart] = useState({});
  const [state, action, pending] = useActionState(async (prev, fd) => {
    const r = await createPosOrder(prev, fd);
    if (r?.ok) setCart({});
    return r;
  }, null);
  const shown = useMemo(() => products.filter((p) => !q || `${p.name} ${p.descriptor}`.toLowerCase().includes(q.toLowerCase())), [products, q]);
  const lines = Object.entries(cart).map(([slug, quantity]) => ({ ...products.find((p) => p.slug === slug), quantity }));
  const subtotal = lines.reduce((s, l) => s + l.price * l.quantity, 0);
  const add = (slug, d = 1) => setCart((c) => { const n = { ...c, [slug]: Math.max(0, (c[slug] || 0) + d) }; if (!n[slug]) delete n[slug]; return n; });

  return (
    <div className="adm-pos">
      <section className="adm-table-wrap">
        <div className="adm-toolbar"><input className="adm-input" type="search" placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" /></div>
        <div className="adm-pos__grid">
          {shown.map((p) => (
            <button type="button" key={p.slug} className="adm-pos__item" onClick={() => add(p.slug)} disabled={p.sold_out} aria-label={`Add ${p.name}`}>
              {p.image ? /* eslint-disable-next-line @next/next/no-img-element */ <img src={p.image} alt="" loading="lazy" /> : <span style={{ aspectRatio: '1', background: '#ebebeb', borderRadius: 7 }} />}
              <strong>{p.name}</strong><span>{p.sold_out ? 'Sold out' : money(p.price)}</span>
            </button>
          ))}
        </div>
      </section>
      <form action={action} className="adm-card" style={{ position: 'sticky', top: 0 }}>
        <h2 className="adm-h2--big">Current sale</h2>
        <input type="hidden" name="cart" value={JSON.stringify(Object.entries(cart).map(([slug, quantity]) => ({ slug, quantity })))} />
        {lines.length === 0 ? <p className="adm-card__sub" style={{ marginTop: 8 }}>Tap a product to add it.</p> : (
          <ul className="adm-checks" style={{ margin: '8px 0' }}>
            {lines.map((l) => (
              <li key={l.slug}><div style={{ flex: 1 }}><strong>{l.name}</strong><span>{money(l.price)}</span></div>
                <div className="adm-actions" style={{ gap: 4 }}>
                  <button type="button" className="adm-btn adm-btn--small" onClick={() => add(l.slug, -1)} aria-label={`Remove one ${l.name}`}>−</button>
                  <span style={{ minWidth: 18, textAlign: 'center' }}>{l.quantity}</span>
                  <button type="button" className="adm-btn adm-btn--small" onClick={() => add(l.slug, 1)} aria-label={`Add one ${l.name}`}>+</button>
                </div></li>
            ))}
          </ul>
        )}
        <div className="adm-form" style={{ marginTop: 8 }}>
          <label className="adm-field"><span>Discount</span><div className="adm-money"><input type="number" name="discount" min="0" step="0.01" defaultValue="0" /></div></label>
          <label className="adm-field"><span>Customer email (optional)</span><input type="email" name="email" /></label>
          <label className="adm-field"><span>Payment</span><select name="method"><option value="cash">Cash</option><option value="card">Card (outside Stripe)</option><option value="gift card">Gift card</option></select></label>
          <div className="adm-totals"><div className="tot"><span>Subtotal</span><span>{money(subtotal)}</span></div></div>
          {state?.error && <p className="adm-alert adm-alert--error" role="alert">{state.error}</p>}
          {state?.ok && <p className="adm-alert adm-alert--ok" role="status">{state.message}</p>}
          <button className="adm-btn adm-btn--primary" disabled={pending || lines.length === 0}>{pending ? 'Recording…' : 'Record sale'}</button>
        </div>
      </form>
    </div>
  );
}
