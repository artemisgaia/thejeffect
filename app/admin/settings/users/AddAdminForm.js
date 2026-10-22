'use client';
import { useActionState } from 'react';
import { addAdmin } from './actions';

export default function AddAdminForm() {
  const [s, action, pending] = useActionState(addAdmin, null);
  return (
    <form action={action} className="adm-form">
      <label className="adm-field"><span>Email</span><input type="email" name="email" placeholder="name@thejeffect.com" required /></label>
      {s?.error && <p className="adm-alert adm-alert--error" role="alert">{s.error}</p>}
      {s?.ok && <p className="adm-alert adm-alert--ok" role="status">{s.message}</p>}
      <div><button className="adm-btn adm-btn--primary" disabled={pending}>{pending ? 'Adding…' : 'Add admin'}</button></div>
    </form>
  );
}
