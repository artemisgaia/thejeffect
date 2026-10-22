'use client';
import Link from 'next/link';
import { useActionState } from 'react';
import { saveCustomer, deleteCustomer } from './actions';

export default function CustomerForm({ c = {} }) {
  const [s, action, pending] = useActionState(saveCustomer, null);
  const a = c.address || {};
  return (
    <>
      <form action={action} className="adm-form">
        <input type="hidden" name="id" value={c.id || ''} />
        <section className="adm-card"><h2>Customer overview</h2><div className="adm-form" style={{ marginTop: 10 }}>
          <label className="adm-field"><span>Full name</span><input type="text" name="name" defaultValue={c.name || ''} /></label>
          <div className="adm-row">
            <label className="adm-field"><span>Email</span><input type="email" name="email" defaultValue={c.email || ''} required /></label>
            <label className="adm-field"><span>Phone</span><input type="tel" name="phone" defaultValue={c.phone || ''} /></label>
          </div>
          <div className="adm-row">
            <label className="adm-field"><span>City</span><input type="text" name="city" defaultValue={a.city || ''} /></label>
            <label className="adm-field"><span>State / region</span><input type="text" name="region" defaultValue={a.region || ''} /></label>
            <label className="adm-field"><span>Country</span><input type="text" name="country" defaultValue={a.country || ''} /></label>
          </div>
          <div className="adm-setting"><div><strong>Email marketing</strong><span>Customer agreed to receive marketing emails.</span></div><label className="adm-toggle"><input type="checkbox" name="marketing" defaultChecked={Boolean(c.marketing)} aria-label="Email marketing" /><i /></label></div>
        </div></section>
        <section className="adm-card"><h2>Notes and tags</h2><div className="adm-form" style={{ marginTop: 10 }}>
          <label className="adm-field"><span>Note</span><textarea name="note" rows={3} defaultValue={c.note || ''} /></label>
          <label className="adm-field"><span>Tags</span><input type="text" name="tags" defaultValue={(c.tags || []).join(', ')} placeholder="vip, wholesale" /></label>
        </div></section>
        {s?.error && <p className="adm-alert adm-alert--error" role="alert">{s.error}</p>}
        <div className="adm-savebar"><Link className="adm-btn" href="/admin/customers">Cancel</Link><button className="adm-btn adm-btn--primary" disabled={pending}>{pending ? 'Saving…' : 'Save'}</button></div>
      </form>
      {c.id && <form action={deleteCustomer}><input type="hidden" name="id" value={c.id} /><button className="adm-btn adm-btn--danger" onClick={(e) => { if (!confirm('Delete this customer?')) e.preventDefault(); }}>Delete customer</button></form>}
    </>
  );
}
