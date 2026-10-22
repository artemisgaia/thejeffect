'use client';
import { useMemo, useState, useActionState } from 'react';
import { saveInventory } from './actions';

export default function InventoryTable({ rows }) {
  const [s, action, pending] = useActionState(saveInventory, null);
  const [q, setQ] = useState('');
  const shown = useMemo(() => rows.filter((r) => !q || `${r.name} ${r.sku}`.toLowerCase().includes(q.toLowerCase())), [rows, q]);
  return (
    <form action={action}>
      <div className="adm-table-wrap">
        <div className="adm-toolbar"><input className="adm-input" type="search" placeholder="Search inventory" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search inventory" /></div>
        <div className="adm-table-scroll"><table className="adm-table">
          <thead><tr><th>Product</th><th>SKU</th><th>Barcode</th><th>Track</th><th>Allow backorder</th><th className="num">Available</th></tr></thead>
          <tbody>{shown.map((r) => (
            <tr key={r.slug}>
              <td><div className="adm-prod">{r.image ? /* eslint-disable-next-line @next/next/no-img-element */ <img className="adm-thumb" src={r.image} alt="" loading="lazy" /> : <span className="adm-thumb" />}<div><strong>{r.name}</strong><span>{r.descriptor}</span></div></div><input type="hidden" name="slug" value={r.slug} /></td>
              <td><input className="adm-input" style={{ width: 110 }} name="sku" defaultValue={r.sku} aria-label={`SKU for ${r.name}`} /></td>
              <td><input className="adm-input" style={{ width: 130 }} name="barcode" defaultValue={r.barcode} aria-label={`Barcode for ${r.name}`} /></td>
              <td><input type="checkbox" name="track" value={r.slug} defaultChecked={r.track} aria-label={`Track ${r.name}`} /></td>
              <td><input type="checkbox" name="backorder" value={r.slug} defaultChecked={r.backorder} aria-label={`Backorder ${r.name}`} /></td>
              <td className="num"><input className="adm-input" style={{ width: 84, textAlign: 'right' }} type="number" min="0" name="quantity" defaultValue={r.quantity} aria-label={`Quantity for ${r.name}`} /></td>
            </tr>))}</tbody>
        </table></div>
        <div className="adm-foot">{shown.length} products</div>
      </div>
      {s?.error && <p className="adm-alert adm-alert--error" role="alert" style={{ marginTop: 12 }}>{s.error}</p>}
      {s?.ok && <p className="adm-alert adm-alert--ok" role="status" style={{ marginTop: 12 }}>{s.message}</p>}
      <div className="adm-savebar"><button className="adm-btn adm-btn--primary" disabled={pending}>{pending ? 'Saving…' : 'Save inventory'}</button></div>
    </form>
  );
}
