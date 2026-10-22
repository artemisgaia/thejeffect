import { requireAdmin } from '@/lib/admin/auth';
import { CATEGORY_META } from '@/lib/products';
import { PageHead } from '../../_ui/parts';
import NewProductForm from './NewProductForm';

export const metadata = { title: 'Add product' };
export const dynamic = 'force-dynamic';

export default async function NewProduct() {
  await requireAdmin();
  const categories = Object.entries(CATEGORY_META).map(([value, m]) => ({ value, label: m.label }));
  return (<><div className="adm-wide" /><PageHead title="Add product" icon="tag" back={{ href: '/admin/products', label: 'Products' }} /><NewProductForm categories={categories} /></>);
}
