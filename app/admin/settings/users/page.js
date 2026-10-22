import { requireAdmin } from '@/lib/admin/auth';
import { dateShort } from '@/lib/admin/format';
import { PageHead } from '../../_ui/parts';
import AddAdminForm from './AddAdminForm';
import { removeAdmin } from './actions';

export const metadata = { title: 'Users' };
export const dynamic = 'force-dynamic';

export default async function Users() {
  const { supabase, user } = await requireAdmin();
  const { data } = await supabase.from('admins').select('*').order('created_at', { ascending: true });
  return (
    <div className="adm-settings__body" style={{ margin: 0, maxWidth: 'none' }}>
      <PageHead title="Users" icon="user" sub="People who can sign in to this admin." />
      <section className="adm-card adm-card--flush" style={{ marginBottom: 16 }}>
        <table className="adm-table">
          <thead><tr><th>Email</th><th>Added</th><th /></tr></thead>
          <tbody>{(data || []).map((a) => (
            <tr key={a.email}><td>{a.email}{a.email.toLowerCase() === String(user.email).toLowerCase() && <span className="adm-pill" style={{ marginLeft: 8 }}>You</span>}</td><td>{dateShort(a.created_at)}</td>
              <td className="num">{a.email.toLowerCase() !== String(user.email).toLowerCase() && <form action={removeAdmin}><input type="hidden" name="email" value={a.email} /><button className="adm-btn adm-btn--small adm-btn--danger">Remove</button></form>}</td></tr>))}</tbody>
        </table>
      </section>
      <section className="adm-card"><h2>Add a user</h2><p className="adm-card__sub">They also need a login: Supabase → Authentication → Users → Add user.</p><AddAdminForm /></section>
    </div>
  );
}
