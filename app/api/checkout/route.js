import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';

export async function POST(request) {
  try {
    const { lineItems } = await request.json();

    if (!lineItems || lineItems.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems.map((item) => ({
        price: item.price,
        quantity: item.quantity,
      })),
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
      shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'AU'] },
      automatic_tax: { enabled: false },
      allow_promotion_codes: true,
      metadata: {
        source: 'the-jeffect-website',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: err.message || 'Checkout failed' },
      { status: 500 }
    );
  }
}
