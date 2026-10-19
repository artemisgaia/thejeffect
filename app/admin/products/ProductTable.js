'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { formatMoney } from '@/lib/format';

export default function ProductTable({ rows, categories }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');
  const [status, setStatus] = useState('all');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (cat !== 'all' && r.category !== cat) return false;
      if (status === 'hidden' && r.published) return false;
      if (status === 'sold_out' && !r.sold_out) return false;
      if (status === 'edited' && !r.edited) return false;
      if (!needle) return true;
      return `${r.name} ${r.descriptor} ${r.slug} ${r.no}`.toLowerCase().includes(needle);
    });
  }, [rows, q, cat, status]);

  return (
    <>
      <div className="adm-toolbar">
        <input className="adm-input" type="search" placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
        <select className="adm-input" value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Category">
          <option value="all">All categories</option>
          {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <select className="adm-input" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="all">Any status</option>
          <option value="edited">Edited in admin</option>
          <option value="hidden">Hidden</option>
          <option value="sold_out">Sold out</option>
        </select>
      </div>

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr><th>Product</th><th>Category</th><th className="num">Price</th><th>Status</th><th><span className="visually-hidden">Actions</span></th></tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.slug}>
                <td>
                  <Link href={`/admin/products/${r.slug}`} className="adm-prod">
                    {r.image
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img className="adm-thumb" src={r.image} alt="" loading="lazy" />
                      : <span className="adm-thumb" />}
                    <div><strong>{r.name}</strong><span>Nº {String(r.no).padStart(2, '0')} · {r.descriptor}</span></div>
                  </Link>
                </td>
                <td>{r.categoryLabel}</td>
                <td className="num">{formatMoney(r.price)} <span style={{ color: 'var(--a-muted)' }}>· {r.size}</span></td>
                <td>
                  {!r.published && <span className="adm-badge adm-badge--danger">Hidden</span>}{' '}
                  {r.sold_out && <span className="adm-badge adm-badge--warn">Sold out</span>}{' '}
                  {r.published && r.bestseller && <span className="adm-badge adm-badge--gold">Bestseller</span>}{' '}
                  {r.edited && <span className="adm-badge">Edited</span>}{' '}
                  {r.published && !r.sold_out && !r.edited && !r.bestseller && <span className="adm-badge adm-badge--ok">Live</span>}
                </td>
                <td className="num"><Link href={`/admin/products/${r.slug}`} className="adm-btn adm-btn--small">Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="adm-empty">No products match.</p>}
      </div>
    </>
  );
}
