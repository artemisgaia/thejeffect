'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin/auth';
import { parseCsv } from '@/lib/admin/csv';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const money = (v) => Math.max(0, Math.round(Number(String(v || '').replace(/[^0-9.]/g, '')) * 100) || 0);
const yes = (v) => /^(true|yes|1|subscribed)$/i.test(String(v || '').trim());

// Imports a Shopify-style customer CSV (First Name, Last Name, Email, Address1, City, Province Code,
// Country Code, Zip, Phone, Accepts Marketing, Total Spent, Total Orders, Tags, Note, Company).
// Existing emails are left untouched. Nobody is added to Resend or emailed by this import.
export async function importCustomers(_prev, fd) {
  const { supabase } = await requireAdmin();
  const file = fd.get('file');
  if (!file || typeof file === 'string' || !file.size) return { error: 'Choose a CSV file first.' };
  if (file.size > 5_000_000) return { error: 'That file is too large (5 MB max).' };

  const rows = parseCsv(await file.text());
  if (!rows.length) return { error: 'The file has no rows.' };
  if (!('Email' in rows[0])) return { error: 'The CSV needs an "Email" column.' };

  const seen = new Set(); const fresh = []; let noEmail = 0; let invalid = 0; let dupes = 0;
  for (const r of rows) {
    const email = (r.Email || '').toLowerCase();
    if (!email) { noEmail++; continue; }
    if (!EMAIL.test(email)) { invalid++; continue; }
    if (seen.has(email)) { dupes++; continue; }
    seen.add(email);
    const name = [r['First Name'], r['Last Name']].filter(Boolean).join(' ').trim() || r.Name || '';
    const spent = money(r['Total Spent']);
    fresh.push({
      email, name, phone: (r.Phone || '').replace(/[^\d+]/g, '') || null,
      address: { line1: r.Address1 || '', line2: r.Address2 || '', city: r.City || '', region: r['Province Code'] || r.Province || '', postal: r.Zip || '', country: r['Country Code'] || r.Country || '', company: r.Company || '' },
      marketing: yes(r['Accepts Marketing']), tags: (r.Tags || '').split(',').map((s) => s.trim()).filter(Boolean),
      note: r.Note || null, orders_count: Math.round(Number(r['Total Orders'])) || 0, total_spent: spent,
    });
  }

  const { data: existing } = await supabase.from('customers').select('email').limit(100000);
  const have = new Set((existing || []).map((c) => String(c.email).toLowerCase()));
  const toAdd = fresh.filter((c) => !have.has(c.email));
  const skippedExisting = fresh.length - toAdd.length;

  for (let i = 0; i < toAdd.length; i += 200) {
    const { error } = await supabase.from('customers').insert(toAdd.slice(i, i + 200));
    if (error) return { error: `Stopped after ${i} customers: ${error.message}` };
  }
  revalidatePath('/admin/customers'); revalidatePath('/admin');
  return { ok: true, added: toAdd.length, skippedExisting, noEmail, invalid, dupes, total: rows.length };
}
