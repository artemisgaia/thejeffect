import { requireAdmin } from '@/lib/admin/auth';
import { PageHead } from '../../_ui/parts';
import SettingsForm from './SettingsForm';

export const metadata = { title: 'Announcement bar' };
export const dynamic = 'force-dynamic';

export default async function AnnouncementSettings() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from('site_settings').select('value').eq('key', 'announcement').maybeSingle();
  const a = data?.value;
  return (
    <div className="adm-settings__body" style={{ margin: 0, maxWidth: 'none' }}>
      <PageHead title="Announcement bar" icon="bell" sub="The thin bar above the header on every page of the storefront." />
      <SettingsForm initial={{ show: a ? a.show !== false : true, text: a?.text ?? '', link: a?.link ?? '/shop', customised: Boolean(a) }} />
    </div>
  );
}
