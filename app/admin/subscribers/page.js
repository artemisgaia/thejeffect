import { requireAdmin } from '@/lib/admin/auth';
import { removeSubscriber } from './actions';

export const metadata = { title: 'Subscribers' };
export const dynamic = 'force-dynamic';

export default async function SubscribersPage() {
  const { supabase } = await requireAdmin();
  const { data: rows, error } = await supabase
    .from('subscribers')
    .select('id, email, status, source, created_at')
    .order('created_at', { ascending: false })
    .limit(1000);

  const active = (rows || []).filter((r) => r.status === 'subscribed').length;

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Subscribers</h1>
          <p>{active} subscribed. People who join through the site or footer appear here and in your Resend segment.</p>
        </div>
        <a href="/admin/subscribers/export" className="adm-btn">Export CSV</a>
      </header>

      {error && <p className="adm-alert adm-alert--error">{error.message}</p>}

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead><tr><th>Email</th><th>Source</th><th>Status</th><th>Joined</th><th><span className="visually-hidden">Remove</span></th></tr></thead>
          <tbody>
            {(rows || []).map((r) => (
              <tr key={r.id}>
                <td>{r.email}</td>
                <td>{r.source || '—'}</td>
                <td><span className={`adm-badge ${r.status === 'subscribed' ? 'adm-badge--ok' : ''}`}>{r.status}</span></td>
                <td>{new Date(r.created_at).toLocaleDateString()}</td>
                <td className="num">
                  <form action={removeSubscriber}>
                    <input type="hidden" name="id" value={r.id} />
                    <button type="submit" className="adm-btn adm-btn--small adm-btn--danger">Remove</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows?.length && <p className="adm-empty">No subscribers yet.</p>}
      </div>
    </>
  );
}
