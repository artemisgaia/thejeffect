import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/auth';
import { money, dateShort } from '@/lib/admin/format';
import { PageHead, EmptyState, Badge } from '../_ui/parts';
import Icon from '../_ui/Icon';

export const metadata = { title: 'Discounts' };
export const dynamic = 'force-dynamic';

const desc = (d) => (d.kind === 'percent' ? `${d.value}% off` : `${money(d.value)} off`);

export default async function Discounts() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from('discounts').select('*').order('created_at', { ascending: false });
  const rows = data || [];
  return (
    <div className="adm-wide">
      <PageHead title="Discounts" icon="percent"><Link href="/admin/discounts/new" className="adm-btn adm-btn--primary"><Icon name="plus" size={14} /> Create discount</Link></PageHead>
      {rows.length === 0 ? (
        <EmptyState art="discount" title="Manage discounts and promotions" text="Add discount codes that apply at checkout. Percentage and fixed-amount codes are created in Stripe automatically." cta="Create discount" href="/admin/discounts/new" learn="discounts" />
      ) : (
        <div className="adm-table-wrap"><div className="adm-table-scroll"><table className="adm-table">
          <thead><tr><th>Code</th><th>Status</th><th>Discount</th><th className="num">Used</th><th>Ends</th></tr></thead>
          <tbody>{rows.map((d) => (
            <tr key={d.id}>
              <td><Link className="adm-link" style={{ color: 'inherit', fontWeight: 600 }} href={`/admin/discounts/${d.id}`}>{d.code}</Link>{d.title && d.title !== d.code && <div style={{ color: 'var(--a-muted)', fontSize: 12 }}>{d.title}</div>}</td>
              <td>{d.active ? <Badge tone="ok" fill>Active</Badge> : <Badge>Inactive</Badge>}</td>
              <td>{desc(d)}{d.min_subtotal ? ` · min ${money(d.min_subtotal)}` : ''}{d.stripe_promo_id ? '' : d.kind === 'free_shipping' ? '' : ' · not synced to Stripe'}</td>
              <td className="num">{d.used}{d.usage_limit ? ` / ${d.usage_limit}` : ''}</td>
              <td>{dateShort(d.ends_at)}</td>
            </tr>))}</tbody>
        </table></div></div>
      )}
    </div>
  );
}
