import { requireAdmin } from '@/lib/admin/auth';
import { getAllProducts } from '@/lib/store';
import { PageHead } from '../../_ui/parts';
import InventoryTable from './InventoryTable';

export const metadata = { title: 'Inventory' };
export const dynamic = 'force-dynamic';

export default async function Inventory() {
  const { supabase } = await requireAdmin();
  const [products, { data: inv }] = await Promise.all([getAllProducts(), supabase.from('inventory').select('*')]);
  const by = new Map((inv || []).map((r) => [r.slug, r]));
  const rows = products.map((p) => {
    const r = by.get(p.slug);
    return { slug: p.slug, name: p.name, descriptor: p.descriptor, image: p.images[0] || '', sku: r?.sku || p.sku, barcode: r?.barcode || '', track: r?.track ?? false, backorder: r?.allow_backorder ?? false, quantity: r?.quantity ?? 0 };
  });
  return (
    <div className="adm-wide">
      <PageHead title="Inventory" icon="box" sub="Turn on “Track” for a product and it shows as sold out on the storefront when the available count reaches 0." />
      <InventoryTable rows={rows} />
    </div>
  );
}
