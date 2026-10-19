import { requireAdmin } from '@/lib/admin/auth';
import SettingsForm from './SettingsForm';

export const metadata = { title: 'Settings' };
export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from('site_settings').select('value').eq('key', 'announcement').maybeSingle();
  const a = data?.value;

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Settings</h1>
          <p>Site-wide content you can change without a developer.</p>
        </div>
      </header>
      <SettingsForm
        initial={{
          show: a ? a.show !== false : true,
          text: a?.text ?? '',
          link: a?.link ?? '/shop',
          customised: Boolean(a),
        }}
      />
    </>
  );
}
