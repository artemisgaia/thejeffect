import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/auth';
import { applySegment } from '@/lib/admin/segments';
import { money, daysAgoIso } from '@/lib/admin/format';
import { PageHead, EmptyState, Badge } from '../_ui/parts';
import Icon from '../_ui/Icon';

export const metadata = { title: 'Customers' };
export const dynamic = 'force-dynamic';

export default async function Customers({ searchParams }) {
  const sp = await searchParams;
  const { supabase } = await requireAdmin();
  const [{ data }, { data: segs }, { data: ab }] = await Promise.all([
    supabase.from('customers').select('*').order('created_at', { ascending: false }).limit(1000),
    supabase.from('segments').select('*').order('created_at', { ascending: true }),
    supabase.from('abandoned_checkouts').select('email,created_at').gte('created_at', daysAgoIso(30)),
  ]);
  const all = data || [];
  const seg = (segs || []).find((s) => s.id === sp?.segment);
  const q = String(sp?.q || '').trim().toLowerCase();
  const ctx = { abandonedEmails: new Set((ab || []).map((a) => String(a.email).toLowerCase())) };
  const rows = applySegment(all, seg?.rule || 'all', ctx).filter((c) => !q || `${c.name} ${c.email}`.toLowerCase().includes(q));
  return (
    <div className="adm-wide">
      <PageHead title="Customers" icon="users">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a className="adm-btn" href="/admin/subscribers/export">Export</a>
        <Link href="/admin/customers/import" className="adm-btn">Import</Link>
        <Link href="/admin/customers/new" className="adm-btn adm-btn--primary"><Icon name="plus" size={14} /> Add customer</Link>
      </PageHead>
      {all.length === 0 ? (
        <EmptyState art="users" title="Add your customers" text="Customers are added automatically when they check out with Stripe. You can also import a CSV or add them by hand." cta="Import customers" href="/admin/customers/import" learn="customers" />
      ) : (
        <div className="adm-table-wrap">
          <form className="adm-toolbar" role="search">
            <select className="adm-input" name="segment" defaultValue={sp?.segment || ''} aria-label="Segment"><option value="">All customers</option>{(segs || []).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
            <input className="adm-input" type="search" name="q" defaultValue={sp?.q || ''} placeholder="Search customers" aria-label="Search customers" />
            <button className="adm-btn" type="submit">Apply</button>
          </form>
          <div className="adm-table-scroll">
            <table className="adm-table">
              <thead><tr><th>Customer name</th><th>Email subscription</th><th>Location</th><th className="num">Orders</th><th className="num">Amount spent</th></tr></thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id}>
                    <td><Link href={`/admin/customers/${c.id}`} className="adm-link" style={{ color: 'inherit', fontWeight: 600 }}>{c.name || c.email}</Link>{(c.tags || []).map((t) => <span key={t} className="adm-pill" style={{ marginLeft: 6 }}>{t}</span>)}</td>
                    <td>{c.marketing ? <Badge tone="ok" fill>Subscribed</Badge> : <Badge>Not subscribed</Badge>}</td>
                    <td>{[c.address?.city, c.address?.region].filter(Boolean).join(', ') || '—'}</td>
                    <td className="num">{c.orders_count}</td>
                    <td className="num">{money(c.total_spent)}</td>
                  </tr>
                ))}
                {rows.length === 0 && <tr><td colSpan={5} className="adm-empty">No customers match.</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="adm-foot">{rows.length} customers</div>
        </div>
      )}
    </div>
  );
}
