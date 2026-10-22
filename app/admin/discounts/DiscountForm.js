'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useActionState } from 'react';
import { saveDiscount, deleteDiscount } from './actions';
import { fromCents } from '@/lib/admin/format';

const loc = (v) => (v ? new Date(v).toISOString().slice(0, 16) : '');

export default function DiscountForm({ d = {} }) {
  const [s, action, pending] = useActionState(saveDiscount, null);
  const [kind, setKind] = useState(d.kind || 'percent');
  return (
    <>
      <form action={action} className="adm-form">
        <input type="hidden" name="id" value={d.id || ''} />
        <section className="adm-card"><h2>Discount code</h2><div className="adm-form" style={{ marginTop: 10 }}>
          <label className="adm-field"><span>Code</span><input type="text" name="code" defaultValue={d.code || ''} placeholder="WELCOME10" required style={{ textTransform: 'uppercase' }} /><small>Customers enter this at checkout.</small></label>
          <label className="adm-field"><span>Internal name (optional)</span><input type="text" name="title" defaultValue={d.title || ''} /></label>
        </div></section>
        <section className="adm-card"><h2>Value</h2><div className="adm-form" style={{ marginTop: 10 }}>
          <label className="adm-field"><span>Type</span><select name="kind" value={kind} onChange={(e) => setKind(e.target.value)}><option value="percent">Percentage off the order</option><option value="fixed">Fixed amount off the order</option></select></label>
          {kind === 'percent' && <label className="adm-field"><span>Percentage</span><input type="number" name="percent" min="1" max="100" defaultValue={d.kind === 'percent' ? d.value : 10} /></label>}
          {kind === 'fixed' && <label className="adm-field"><span>Amount</span><div className="adm-money"><input type="number" name="amount" min="0.01" step="0.01" defaultValue={d.kind === 'fixed' ? fromCents(d.value) : ''} /></div></label>}
        </div></section>
        <section className="adm-card"><h2>Requirements and limits</h2><div className="adm-form" style={{ marginTop: 10 }}>
          <label className="adm-field"><span>Minimum order subtotal</span><div className="adm-money"><input type="number" name="min_subtotal" min="0" step="0.01" defaultValue={d.min_subtotal ? fromCents(d.min_subtotal) : ''} /></div></label>
          <label className="adm-field"><span>Total uses limit</span><input type="number" name="usage_limit" min="1" defaultValue={d.usage_limit || ''} placeholder="Unlimited" /></label>
          <div className="adm-row">
            <label className="adm-field"><span>Start</span><input type="datetime-local" name="starts_at" defaultValue={loc(d.starts_at)} /></label>
            <label className="adm-field"><span>End</span><input type="datetime-local" name="ends_at" defaultValue={loc(d.ends_at)} /></label>
          </div>
          <div className="adm-setting"><div><strong>Active</strong><span>Turn off to stop the code working.</span></div><label className="adm-toggle"><input type="checkbox" name="active" defaultChecked={d.active ?? true} aria-label="Active" /><i /></label></div>
        </div></section>
        {s?.error && <p className="adm-alert adm-alert--error" role="alert">{s.error}</p>}
        <div className="adm-savebar"><Link className="adm-btn" href="/admin/discounts">Cancel</Link><button className="adm-btn adm-btn--primary" disabled={pending}>{pending ? 'Saving…' : 'Save discount'}</button></div>
      </form>
      {d.id && <form action={deleteDiscount}><input type="hidden" name="id" value={d.id} /><button className="adm-btn adm-btn--danger" onClick={(e) => { if (!confirm('Delete this discount?')) e.preventDefault(); }}>Delete discount</button></form>}
    </>
  );
}
