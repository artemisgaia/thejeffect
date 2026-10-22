import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { PageHead } from '../../_ui/parts';
import DiscountForm from '../DiscountForm';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Discount' };

export default async function Discount({ params }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  let d = {};
  if (id !== 'new') {
    const { data } = await supabase.from('discounts').select('*').eq('id', id).maybeSingle();
    if (!data) notFound();
    d = data;
  }
  return (<><div className="adm-narrow" /><PageHead title={id === 'new' ? 'Create discount' : d.code} icon="percent" back={{ href: '/admin/discounts', label: 'Discounts' }} /><DiscountForm d={d} /></>);
}
