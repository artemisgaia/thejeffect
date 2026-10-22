import { requireAdmin } from '@/lib/admin/auth';
import { loadLive } from '@/lib/admin/stats';
import { money } from '@/lib/admin/format';
import { PageHead } from '../../_ui/parts';
import LiveRefresh from './LiveRefresh';

export const metadata = { title: 'Live View' };
export const dynamic = 'force-dynamic';

export default async function Live() {
  const { supabase } = await requireAdmin();
  const l = await loadLive(supabase);
  return (
    <div className="adm-wide">
      <PageHead title="Live View" icon="pulse" sub="Visitors in the last 5 minutes. Refreshes every 15 seconds."><LiveRefresh /></PageHead>
      <div className="adm-grid adm-grid--stats">
        <div className="adm-stat"><span className="adm-stat__label">Visitors right now</span><div className="adm-stat__value">{l.visitors}</div></div>
        <div className="adm-stat"><span className="adm-stat__label">Active carts</span><div className="adm-stat__value">{l.cart}</div></div>
        <div className="adm-stat"><span className="adm-stat__label">Checking out</span><div className="adm-stat__value">{l.checkout}</div></div>
        <div className="adm-stat"><span className="adm-stat__label">Orders, last 24 h</span><div className="adm-stat__value">{l.orders24}</div></div>
        <div className="adm-stat"><span className="adm-stat__label">Sales, last 24 h</span><div className="adm-stat__value">{money(l.sales24)}</div></div>
      </div>
      <section className="adm-card">
        <h2>Pages being viewed</h2>
        {l.paths.length === 0 ? <p className="adm-card__sub">Nobody is browsing right now.</p> : (
          <table className="adm-table"><tbody>{l.paths.map(([p, n]) => (<tr key={p}><td>{p}</td><td className="num">{n}</td></tr>))}</tbody></table>
        )}
      </section>
    </div>
  );
}
