'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin/auth';
import { getResend, resendConfig } from '@/lib/resend';

export async function removeSubscriber(formData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get('id') || '');
  if (!id) return;

  const { data: row } = await supabase.from('subscribers').select('email').eq('id', id).maybeSingle();
  await supabase.from('subscribers').delete().eq('id', id);

  // Keep Resend in step so removed people never get a campaign.
  const resend = getResend();
  if (resend && row?.email && resendConfig.segmentId()) {
    await resend.contacts.remove({ email: row.email });
  }
  revalidatePath('/admin/subscribers');
}
