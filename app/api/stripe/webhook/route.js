import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase/service';

// Stripe → The J Effect. Creates orders, customers and abandoned checkouts, and updates
// discount usage and inventory. Set STRIPE_WEBHOOK_SECRET and point a Stripe webhook at
// https://www.thejeffect.com/api/stripe/webhook for: checkout.session.completed,
// checkout.session.expired, charge.refunded.
export const runtime = 'nodejs';

const addr = (s) => (s ? { line1: s.line1, line2: s.line2, city: s.city, region: s.state, postal: s.postal_code, country: s.country } : null);

export async function POST(request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const db = createServiceClient();
  if (!secret || !db) return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 503 });

  const body = await request.text();
  let event;
  try {
    event = getStripe().webhooks.constructEvent(body, request.headers.get('stripe-signature') || '', secret);
  } catch {
    return NextResponse.json({ error: 'Bad signature.' }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    if (event.type === 'checkout.session.completed') {
      const s = await stripe.checkout.sessions.retrieve(event.data.object.id, {
        expand: ['line_items.data.price.product', 'shipping_cost.shipping_rate', 'total_details.breakdown'],
      });
      if (s.payment_status !== 'paid') return NextResponse.json({ ok: true });

      const items = (s.line_items?.data || []).map((li) => {
        const p = li.price?.product;
        return { slug: p?.metadata?.slug || null, name: p?.name || li.description || '', quantity: li.quantity, price: li.price?.unit_amount || 0, image: p?.images?.[0] || '' };
      });
      const email = (s.customer_details?.email || '').toLowerCase();
      const total = s.amount_total || 0;

      let customer_id = null;
      if (email) {
        const { data: c } = await db.from('customers').select('*').eq('email', email).maybeSingle();
        const patch = { orders_count: (c?.orders_count || 0) + 1, total_spent: (c?.total_spent || 0) + total, last_order_at: new Date().toISOString() };
        if (c) { await db.from('customers').update({ ...patch, name: c.name || s.customer_details?.name || '', phone: c.phone || s.customer_details?.phone || null }).eq('id', c.id); customer_id = c.id; }
        else { const { data: n } = await db.from('customers').insert({ email, name: s.customer_details?.name || '', phone: s.customer_details?.phone || null, address: addr(s.customer_details?.address), ...patch }).select().maybeSingle(); customer_id = n?.id || null; }
      }

      let code = null;
      const promoId = s.total_details?.breakdown?.discounts?.[0]?.discount?.promotion_code;
      if (promoId) {
        const promo = await stripe.promotionCodes.retrieve(typeof promoId === 'string' ? promoId : promoId.id).catch(() => null);
        code = promo?.code || null;
        if (code) { const { data: d } = await db.from('discounts').select('id,used').eq('code', code).maybeSingle(); if (d) await db.from('discounts').update({ used: (d.used || 0) + 1 }).eq('id', d.id); }
      }

      await db.from('orders').upsert({
        source: 'online', stripe_session_id: s.id, stripe_payment_intent: typeof s.payment_intent === 'string' ? s.payment_intent : s.payment_intent?.id || null,
        customer_id, email, name: s.customer_details?.name || email, status: 'paid', fulfillment: 'unfulfilled', currency: s.currency || 'usd',
        subtotal: s.amount_subtotal || 0, shipping: s.total_details?.amount_shipping || 0, discount: s.total_details?.amount_discount || 0,
        tax: s.total_details?.amount_tax || 0, total, items, shipping_address: addr(s.shipping_details?.address || s.customer_details?.address),
        shipping_method: s.shipping_cost?.shipping_rate?.display_name || null, discount_code: code,
      }, { onConflict: 'stripe_session_id' });

      for (const it of items) {
        if (!it.slug) continue;
        const { data: inv } = await db.from('inventory').select('quantity,track').eq('slug', it.slug).maybeSingle();
        if (inv?.track) await db.from('inventory').update({ quantity: Math.max(0, inv.quantity - it.quantity) }).eq('slug', it.slug);
      }
      if (email) await db.from('abandoned_checkouts').update({ recovered: true }).eq('email', email);
    }

    if (event.type === 'checkout.session.expired') {
      const s = event.data.object;
      await db.from('abandoned_checkouts').upsert({
        stripe_session_id: s.id, email: s.customer_details?.email || null, total: s.amount_total || 0,
        recovery_url: s.after_expiration?.recovery?.url || null, items: [],
      }, { onConflict: 'stripe_session_id' });
    }

    if (event.type === 'charge.refunded') {
      const ch = event.data.object;
      const pi = typeof ch.payment_intent === 'string' ? ch.payment_intent : ch.payment_intent?.id;
      if (pi) {
        const { data: o } = await db.from('orders').select('id,total').eq('stripe_payment_intent', pi).maybeSingle();
        if (o) await db.from('orders').update({ refunded: ch.amount_refunded, status: ch.amount_refunded >= o.total ? 'refunded' : 'partially_refunded' }).eq('id', o.id);
      }
    }
  } catch (err) {
    console.error('Stripe webhook error:', err);
    return NextResponse.json({ error: 'Webhook handler failed.' }, { status: 500 });
  }
  return NextResponse.json({ received: true });
}
