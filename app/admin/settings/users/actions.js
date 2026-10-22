'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin/auth';

export async function addAdmin(_p, fd) {
  const { supabase } = await requireAdmin();
  const email = String(fd.get('email') || '').trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: 'Enter a valid email address.' };
  const { error } = await supabase.from('admins').upsert({ email });
  if (error) return { error: error.message };
  revalidatePath('/admin/settings/users');
  return { ok: true, message: `${email} can now sign in to the admin. Create their login under Supabase → Authentication → Users.` };
}

export async function removeAdmin(fd) {
  const { supabase, user } = await requireAdmin();
  const email = String(fd.get('email') || '');
  if (email.toLowerCase() === String(user.email).toLowerCase()) return;
  await supabase.from('admins').delete().eq('email', email);
  revalidatePath('/admin/settings/users');
}
