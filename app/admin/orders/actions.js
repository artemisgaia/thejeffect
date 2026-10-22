'use server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/admin/auth';
import { getStripe } from '@/lib/stripe';

const done = (id, message) => { revalidatePath(`/admin/orders/${id}`); revalidatePath('/admin/orders'); return { ok: true, message }; };

export async function fulfillOrder(_p, fd) {
  const { supabase } = await requireAdmin();
  const id = String(fd.get('id'));
  const tracking = { carrier: String(fd.get('carrier') || '').trim(), number: String(fd.get('number') || '').trim(), url: String(fd.get('url') || '').trim() };
  const { error } = await supabase.from('orders').update({
    fulfillment: 'fulfilled', fulfilled_at: new Date().toISOString(), tracking: tracking.number || tracking.carrier ? tracking : null,
  }).eq('id', id);
  if (error) return { error: error.message };
  return done(id, 'Marked as fulfilled.');
}

export async function unfulfillOrder(fd) {
  const { supabase } = await requireAdmin();
  const id = String(fd.get('id'));
  await supabase.from('orders').update({ fulfillment: 'unfulfilled', fulfilled_at: null }).eq('id', id);
  done(id);
}

export async function refundOrder(_p, fd) {
  const { supabase } = await requireAdmin();
  const id = String(fd.get('id'));
  const { data: order } = await supabase.from('orders').select('*').eq('id', id).maybeSingle();
  if (!order) return { error: 'Order not found.' };
  const amount = Math.round(Number(fd.get('amount') || 0) * 100);
  const max = order.total - (order.refunded || 0);
  if (!(amount > 0) || amount > max) return { error: `Enter an amount up to ${(max / 100).toFixed(2)}.` };

  let note = 'Refund recorded. Stripe is not connected, so refund the card in your Stripe dashboard.';
  if (process.env.STRIPE_SECRET_KEY && order.stripe_payment_intent) {
    try {
      await getStripe().refunds.create({ payment_intent: order.stripe_payment_intent, amount });
      note = 'Refunded through Stripe.';
    } catch (e) {
      return { error: `Stripe could not refund: ${e.message}` };
    }
  }
  const refunded = (order.refunded || 0) + amount;
  const { error } = await supabase.from('orders').update({ refunded, status: refunded >= order.total ? 'refunded' : 'partially_refunded' }).eq('id', id);
  if (error) return { error: error.message };
  return done(id, note);
}

export async function cancelOrder(fd) {
  const { supabase } = await requireAdmin();
  const id = String(fd.get('id'));
  await supabase.from('orders').update({ status: 'cancelled' }).eq('id', id);
  done(id);
}

export async function saveOrderNote(_p, fd) {
  const { supabase } = await requireAdmin();
  const id = String(fd.get('id'));
  const tags = String(fd.get('tags') || '').split(',').map((s) => s.trim()).filter(Boolean);
  const { error } = await supabase.from('orders').update({ note: String(fd.get('note') || '').slice(0, 2000), tags }).eq('id', id);
  if (error) return { error: error.message };
  return done(id, 'Saved.');
}
