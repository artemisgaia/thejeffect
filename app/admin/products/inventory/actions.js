'use server';
import { revalidatePath, updateTag } from 'next/cache';
import { requireAdmin } from '@/lib/admin/auth';
import { INVENTORY_TAG, PRODUCTS_TAG } from '@/lib/store';

export async function saveInventory(_p, fd) {
  const { supabase } = await requireAdmin();
  const slugs = fd.getAll('slug').map(String);
  const rows = slugs.map((slug, i) => ({
    slug, quantity: Math.max(0, Math.round(Number(fd.getAll('quantity')[i] || 0))),
    track: fd.getAll('track').includes(slug), allow_backorder: fd.getAll('backorder').includes(slug),
    sku: String(fd.getAll('sku')[i] || '').trim() || null, barcode: String(fd.getAll('barcode')[i] || '').trim() || null,
    updated_at: new Date().toISOString(),
  }));
  const { error } = await supabase.from('inventory').upsert(rows);
  if (error) return { error: error.message };
  updateTag(INVENTORY_TAG); updateTag(PRODUCTS_TAG);
  revalidatePath('/shop'); revalidatePath('/admin/products/inventory');
  return { ok: true, message: `Saved ${rows.length} products. Tracked products at 0 now show as sold out.` };
}
