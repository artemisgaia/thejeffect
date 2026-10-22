'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { getStripe } from '@/lib/stripe';
import { toCents } from '@/lib/admin/format';

// Percent and fixed-amount discounts become Stripe coupons + promotion codes, so Stripe
// Checkout validates them (limits, expiry, minimum). Free shipping is applied by our checkout route.
async function syncStripe(d, prev) {
  if (!process.env.STRIPE_SECRET_KEY || d.kind === 'free_shipping') return { stripe_coupon_id: null, stripe_promo_id: null };
  const stripe = getStripe();
  let { stripe_coupon_id: coupon, stripe_promo_id: promo } = prev || {};
  const changed = !prev || prev.kind !== d.kind || prev.value !== d.value || prev.code !== d.code || prev.min_subtotal !== d.min_subtotal
    || prev.usage_limit !== d.usage_limit || String(prev.ends_at || '') !== String(d.ends_at || '');
  if (changed) {
    if (promo) await stripe.promotionCodes.update(promo, { active: false }).catch(() => {});
    const c = await stripe.coupons.create(d.kind === 'percent'
      ? { percent_off: d.value, duration: 'once', name: d.title || d.code }
      : { amount_off: d.value, currency: 'usd', duration: 'once', name: d.title || d.code });
    coupon = c.id;
    const p = await stripe.promotionCodes.create({
      coupon, code: d.code, active: d.active,
      ...(d.usage_limit ? { max_redemptions: d.usage_limit } : {}),
      ...(d.ends_at ? { expires_at: Math.floor(new Date(d.ends_at).getTime() / 1000) } : {}),
      ...(d.min_subtotal ? { restrictions: { minimum_amount: d.min_subtotal, minimum_amount_currency: 'usd' } } : {}),
    });
    promo = p.id;
  } else if (promo) {
    await stripe.promotionCodes.update(promo, { active: d.active });
  }
  return { stripe_coupon_id: coupon, stripe_promo_id: promo };
}

export async function saveDiscount(_p, fd) {
  const { supabase } = await requireAdmin();
  const id = String(fd.get('id') || '');
  const kind = String(fd.get('kind') || 'percent');
  const code = String(fd.get('code') || '').trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
  if (!code) return { error: 'Enter a discount code (letters and numbers).' };
  const value = kind === 'percent' ? Math.round(Number(fd.get('percent') || 0)) : kind === 'fixed' ? toCents(fd.get('amount')) : 0;
  if (kind === 'percent' && !(value > 0 && value <= 100)) return { error: 'Percentage must be between 1 and 100.' };
  if (kind === 'fixed' && !(value > 0)) return { error: 'Enter a discount amount.' };
  const row = {
    code, title: String(fd.get('title') || '').trim() || code, kind, value,
    min_subtotal: toCents(fd.get('min_subtotal')), usage_limit: fd.get('usage_limit') ? Math.round(Number(fd.get('usage_limit'))) : null,
    starts_at: fd.get('starts_at') ? new Date(String(fd.get('starts_at'))).toISOString() : null,
    ends_at: fd.get('ends_at') ? new Date(String(fd.get('ends_at'))).toISOString() : null,
    active: fd.has('active'),
  };
  let prev = null;
  if (id) prev = (await supabase.from('discounts').select('*').eq('id', id).maybeSingle()).data;
  try { Object.assign(row, await syncStripe(row, prev)); } catch (e) { return { error: `Stripe: ${e.message}` }; }
  const { error } = id ? await supabase.from('discounts').update(row).eq('id', id) : await supabase.from('discounts').insert(row);
  if (error) return { error: /duplicate|unique/i.test(error.message) ? 'That code already exists.' : error.message };
  revalidatePath('/admin/discounts');
  redirect('/admin/discounts');
}

export async function deleteDiscount(fd) {
  const { supabase } = await requireAdmin();
  const id = String(fd.get('id'));
  const { data: d } = await supabase.from('discounts').select('*').eq('id', id).maybeSingle();
  if (d?.stripe_promo_id && process.env.STRIPE_SECRET_KEY) await getStripe().promotionCodes.update(d.stripe_promo_id, { active: false }).catch(() => {});
  await supabase.from('discounts').delete().eq('id', id);
  revalidatePath('/admin/discounts');
  redirect('/admin/discounts');
}
