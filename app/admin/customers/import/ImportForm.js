'use client';
import { useActionState } from 'react';
import { importCustomers } from './actions';

export default function ImportForm() {
  const [s, action, pending] = useActionState(importCustomers, null);
  return (
    <form action={action} className="adm-form">
      <label className="adm-field"><span>CSV file</span><input type="file" name="file" accept=".csv,text/csv" required /></label>
      {s?.error && <p className="adm-alert adm-alert--error" role="alert">{s.error}</p>}
      {s?.ok && (
        <div className="adm-alert adm-alert--ok" role="status">
          <strong>Imported {s.added} customers</strong> from {s.total} rows.
          <ul style={{ margin: '6px 0 0 18px' }}>
            {s.skippedExisting > 0 && <li>{s.skippedExisting} already existed and were left unchanged</li>}
            {s.noEmail > 0 && <li>{s.noEmail} rows had no email address, so they were skipped</li>}
            {s.invalid > 0 && <li>{s.invalid} rows had an invalid email</li>}
            {s.dupes > 0 && <li>{s.dupes} duplicate emails in the file</li>}
          </ul>
        </div>
      )}
      <div><button className="adm-btn adm-btn--primary" disabled={pending}>{pending ? 'Importing…' : 'Upload and import'}</button></div>
    </form>
  );
}
