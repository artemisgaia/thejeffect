'use client';
import { useActionState } from 'react';
import { fulfillOrder, refundOrder, saveOrderNote } from './actions';

function Msg({ s }) {
  if (!s) return null;
  return s.error ? <p className="adm-alert adm-alert--error" role="alert">{s.error}</p> : <p className="adm-alert adm-alert--ok" role="status">{s.message}</p>;
}

export function FulfillForm({ id }) {
  const [s, action, pending] = useActionState(fulfillOrder, null);
  return (
    <form action={action} className="adm-form" style={{ padding: 16 }}>
      <input type="hidden" name="id" value={id} />
      <div className="adm-row">
        <label className="adm-field"><span>Carrier</span><input type="text" name="carrier" placeholder="USPS" /></label>
        <label className="adm-field"><span>Tracking number</span><input type="text" name="number" /></label>
      </div>
      <label className="adm-field"><span>Tracking URL (optional)</span><input type="url" name="url" /></label>
      <Msg s={s} />
      <div><button className="adm-btn adm-btn--primary" disabled={pending}>{pending ? 'Saving…' : 'Mark as fulfilled'}</button></div>
    </form>
  );
}

export function RefundForm({ id, max }) {
  const [s, action, pending] = useActionState(refundOrder, null);
  return (
    <form action={action} className="adm-form" style={{ padding: 16 }}>
      <input type="hidden" name="id" value={id} />
      <label className="adm-field"><span>Refund amount</span><div className="adm-money"><input type="number" name="amount" step="0.01" min="0.01" max={(max / 100).toFixed(2)} defaultValue={(max / 100).toFixed(2)} /></div></label>
      <Msg s={s} />
      <div><button className="adm-btn" disabled={pending}>{pending ? 'Refunding…' : 'Refund'}</button></div>
    </form>
  );
}

export function NoteForm({ id, note = '', tags = [] }) {
  const [s, action, pending] = useActionState(saveOrderNote, null);
  return (
    <form action={action} className="adm-form">
      <input type="hidden" name="id" value={id} />
      <label className="adm-field"><span>Notes</span><textarea name="note" rows={3} defaultValue={note} placeholder="Add a note about this order" /></label>
      <label className="adm-field"><span>Tags</span><input type="text" name="tags" defaultValue={tags.join(', ')} placeholder="gift, wholesale" /></label>
      <Msg s={s} />
      <div><button className="adm-btn" disabled={pending}>{pending ? 'Saving…' : 'Save'}</button></div>
    </form>
  );
}
