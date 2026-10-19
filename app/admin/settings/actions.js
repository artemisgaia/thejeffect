'use server';
import { revalidatePath, updateTag } from 'next/cache';
import { requireAdmin } from '@/lib/admin/auth';
import { SETTINGS_TAG } from '@/lib/store';

function refresh() {
  updateTag(SETTINGS_TAG);
  revalidatePath('/', 'layout');
  revalidatePath('/admin/settings');
}

export async function saveAnnouncement(prevState, formData) {
  const { supabase } = await requireAdmin();
  const text = String(formData.get('text') || '').trim().slice(0, 160);
  const link = String(formData.get('link') || '').trim().slice(0, 300);
  const show = formData.has('show');

  if (show && !text) return { error: 'Write the announcement text, or untick “Show the bar”.' };
  if (link && !/^(\/|https?:\/\/)/.test(link)) return { error: 'The link must start with / or https://' };

  const { error } = await supabase.from('site_settings').upsert({
    key: 'announcement',
    value: { show, text, link },
    updated_at: new Date().toISOString(),
  });
  if (error) return { error: error.message };

  refresh();
  return { ok: true, message: 'Saved. The announcement bar is updated on the site.' };
}

export async function resetAnnouncement() {
  const { supabase } = await requireAdmin();
  await supabase.from('site_settings').delete().eq('key', 'announcement');
  refresh();
}
