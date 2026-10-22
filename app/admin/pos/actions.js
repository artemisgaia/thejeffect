'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin/auth';
import { getAllProducts } from '@/lib/store';

// Records an in-person sale. Prices are always taken from the catalog, never from the browser.
export async function createPosOrder(_p, fd) {
  const { supabase } = await requireAdmin();
  let cart = [];
  try { cart = JSON.parse(String(fd.get('cart') || '[]')); } catch { return { error: 'Cart is empty.' }; }
  if (!Array.isArray(cart) || cart.length === 0) return { error: 'Add at least one product.' };

  const products = new Map((await getAllProducts()).map((p) => [p.slug, p]));
  const items = [];
  for (const c of cart) {
    const p = products.get(c.slug); const qty = Math.floor(Number(c.quantity));
    if (!p || !(qty >= 1) || qty > 50) return { error: 'A product in the cart is no longer available.' };
    items.push({ slug: p.slug, name: p.name, quantity: qty, price: p.price, image: p.images[0] || '' });
  }
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = Math.min(subtotal, Math.round(Number(fd.get('discount') || 0) * 100));
  const email = String(fd.get('email') || '').trim().toLowerCase();
  const method = String(fd.get('method') || 'cash');
  const total = subtotal - discount;

  let customer_id = null;
  if (email) {
    const { data: c } = await supabase.from('customers').select('*').eq('email', email).maybeSingle();
    if (c) {
      customer_id = c.id;
      await supabase.from('customers').update({ orders_count: (c.orders_count || 0) + 1, total_spent: (c.total_spent || 0) + total, last_order_at: new Date().toISOString() }).eq('id', c.id);
    } else {
      const { data: n } = await supabase.from('customers').insert({ email, name: '', orders_count: 1, total_spent: total, last_order_at: new Date().toISOString() }).select().maybeSingle();
      customer_id = n?.id || null;
    }
  }
  const { data: order, error } = await supabase.from('orders').insert({
    source: 'pos', email: email || null, name: email || 'Walk-in customer', status: 'paid', fulfillment: 'fulfilled', fulfilled_at: new Date().toISOString(),
    subtotal, discount, shipping: 0, tax: 0, total, items, shipping_method: 'In store', note: `Point of Sale · ${method}`, customer_id,
  }).select().maybeSingle();
  if (error) return { error: error.message };

  for (const i of items) {
    const { data: inv } = await supabase.from('inventory').select('*').eq('slug', i.slug).maybeSingle();
    if (inv?.track) await supabase.from('inventory').update({ quantity: Math.max(0, inv.quantity - i.quantity) }).eq('slug', i.slug);
  }
  revalidatePath('/admin/orders'); revalidatePath('/admin');
  return { ok: true, message: `Sale recorded as order #${order?.number ?? ''}.`, number: order?.number };
}
