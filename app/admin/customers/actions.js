'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';

export async function saveCustomer(_p, fd) {
  const { supabase } = await requireAdmin();
  const id = String(fd.get('id') || '');
  const email = String(fd.get('email') || '').trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: 'Enter a valid email address.' };
  const row = {
    email, name: String(fd.get('name') || '').trim(), phone: String(fd.get('phone') || '').trim() || null,
    marketing: fd.has('marketing'), note: String(fd.get('note') || '').slice(0, 2000),
    tags: String(fd.get('tags') || '').split(',').map((s) => s.trim()).filter(Boolean),
    address: { city: String(fd.get('city') || '').trim(), region: String(fd.get('region') || '').trim(), country: String(fd.get('country') || '').trim() },
  };
  const { error } = id ? await supabase.from('customers').update(row).eq('id', id) : await supabase.from('customers').insert(row);
  if (error) return { error: /duplicate|unique/i.test(error.message) ? 'A customer with that email already exists.' : error.message };
  revalidatePath('/admin/customers');
  redirect('/admin/customers');
}

export async function deleteCustomer(fd) {
  const { supabase } = await requireAdmin();
  await supabase.from('customers').delete().eq('id', String(fd.get('id')));
  revalidatePath('/admin/customers');
  redirect('/admin/customers');
}
