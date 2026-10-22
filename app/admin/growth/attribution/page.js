import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/auth';
import { loadAnalytics } from '@/lib/admin/stats';
import { PageHead } from '../../_ui/parts';
import Chart from '../../_ui/Chart';

export const metadata = { title: 'Attribution' };
export const dynamic = 'force-dynamic';

export default async function Attribution() {
  const { supabase } = await requireAdmin();
  const a = await loadAnalytics(supabase, 30);
  const max = Math.max(1, ...a.bySource.map(([, n]) => n));
  return (
    <div className="adm-wide">
      <PageHead title="Attribution" icon="growth" sub="Where visitors come from. Add ?utm_source=instagram (or any source) to links you share to track campaigns.">
        <Link href="/admin/campaigns" className="adm-btn adm-btn--primary">Create campaign</Link>
      </PageHead>
      <div className="adm-split">
        <section className="adm-card"><h2>Sessions over time</h2><Chart labels={a.days.map((d) => d.slice(5))} series={[{ label: 'Sessions', color: '#5bc0eb', points: a.sessionsSeries, area: true }]} /></section>
        <section className="adm-card">
          <h2>Sessions by source</h2>
          {a.bySource.length === 0 ? <p className="adm-card__sub">No data for this date range</p> : a.bySource.map(([k, n]) => (<div className="adm-bar" key={k}><div><i style={{ width: `${(n / max) * 100}%` }} /></div><span>{k} · {n}</span></div>))}
        </section>
      </div>
    </div>
  );
}
