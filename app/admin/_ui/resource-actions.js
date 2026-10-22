'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { RESOURCES, SETTINGS_FORMS } from '@/lib/admin/resources';
import { slugify, toCents } from '@/lib/admin/format';

function coerce(field, formData) {
  const raw = formData.get(field.name);
  switch (field.type) {
    case 'bool': return formData.has(field.name);
    case 'money': return toCents(raw);
    case 'number': return raw === '' || raw == null ? null : Number(raw);
    case 'tags': return String(raw || '').split(',').map((s) => s.trim()).filter(Boolean);
    case 'date': case 'datetime': return raw ? new Date(String(raw)).toISOString() : null;
    default: return String(raw ?? '').trim();
  }
}

const giftCode = () => {
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const part = () => Array.from({ length: 4 }, () => a[Math.floor(Math.random() * a.length)]).join('');
  return `GIFT-${part()}-${part()}`;
};

export async function saveResource(_prev, formData) {
  const { supabase } = await requireAdmin();
  const key = String(formData.get('__key') || '');
  const id = String(formData.get('__id') || '');
  const res = RESOURCES[key];
  if (!res || res.readonly) return { error: 'Unknown resource.' };

  const row = {};
  for (const f of res.fields) {
    const v = coerce(f, formData);
    if (f.required && (v === '' || v == null || (typeof v === 'number' && !v))) return { error: `${f.label} is required.` };
    row[f.name] = v;
  }
  if (res.slugFrom) {
    const field = res.slugField || 'handle';
    row[field] = slugify(row[field] || row[res.slugFrom]);
    if (!row[field]) return { error: 'Add a title so a URL handle can be created.' };
  }
  if (res.fields.some((f) => f.generate === 'gift') && !row.code) row.code = giftCode();
  if (res.table === 'gift_cards') {
    row.code = String(row.code).toUpperCase();
    if (!id) row.balance = row.initial_value;
  }
  if (res.touchUpdated) row.updated_at = new Date().toISOString();
  if (res.publishDate && row.published) row.published_at = new Date().toISOString();
  if (res.pathFromUrl) row.path = row.url;

  const q = id ? supabase.from(res.table).update(row).eq('id', id) : supabase.from(res.table).insert(row);
  const { error } = await q;
  if (error) return { error: /duplicate|unique/i.test(error.message) ? 'That handle or code is already in use.' : error.message };

  revalidatePath(`/admin/${key}`);
  if (res.storefront) revalidatePath('/', 'layout');
  redirect(`/admin/${key}`);
}

export async function deleteResource(formData) {
  const { supabase } = await requireAdmin();
  const key = String(formData.get('__key') || '');
  const id = String(formData.get('__id') || '');
  const res = RESOURCES[key];
  if (!res || res.readonly || !id) return;
  await supabase.from(res.table).delete().eq('id', id);
  revalidatePath(`/admin/${key}`);
  redirect(`/admin/${key}`);
}

export async function saveSettings(_prev, formData) {
  const { supabase } = await requireAdmin();
  const slug = String(formData.get('__slug') || '');
  const form = SETTINGS_FORMS[slug];
  if (!form) return { error: 'Unknown settings page.' };
  const value = {};
  for (const sec of form.sections) for (const f of sec.fields) value[f.name] = coerce(f, formData);
  const { error } = await supabase.from('site_settings').upsert({ key: `s:${slug}`, value, updated_at: new Date().toISOString() });
  if (error) return { error: error.message };
  revalidatePath(`/admin/settings/${slug}`);
  revalidatePath('/', 'layout');
  return { ok: true, message: 'Saved.' };
}
