import { requireAdmin } from '@/lib/admin/auth';
import { getAllProducts } from '@/lib/store';
import { PageHead } from '../_ui/parts';
import PosApp from './PosApp';

export const metadata = { title: 'Point of Sale' };
export const dynamic = 'force-dynamic';

export default async function Pos() {
  await requireAdmin();
  const products = (await getAllProducts()).filter((p) => p.published !== false).map((p) => ({ slug: p.slug, name: p.name, descriptor: p.descriptor, price: p.price, image: p.images[0] || '', sold_out: Boolean(p.sold_out) }));
  return (
    <div className="adm-wide">
      <PageHead title="Point of Sale" icon="pos" sub="Ring up in-person sales. They appear in Orders, update customers, and reduce tracked inventory." />
      <PosApp products={products} />
    </div>
  );
}
