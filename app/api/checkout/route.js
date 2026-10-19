import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getProducts } from '@/lib/store';
import { shippingOptions } from '@/lib/shipping';

// The browser only sends { slug, quantity }. Names and prices are looked up
// here from the live catalog, so a cart can never set its own price.
export async function POST(request) {
  try {
    const { items } = await request.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    const products = await getProducts();
    const bySlug = new Map(products.map((p) => [p.slug, p]));
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const canShowImages = siteUrl.startsWith('https://');

    const lineItems = [];
    let subtotal = 0;
    for (const item of items) {
      const p = bySlug.get(item?.slug);
      const quantity = Math.floor(Number(item?.quantity));
      if (!p || !(quantity >= 1) || quantity > 20) {
        return NextResponse.json({ error: 'Your cart has an item that is no longer available.' }, { status: 400 });
      }
      if (p.sold_out) {
        return NextResponse.json({ error: `${p.name} is sold out.` }, { status: 409 });
      }
      subtotal += p.price * quantity;
      const image = p.images[0];
      lineItems.push({
        quantity,
        price_data: {
          currency: 'usd',
          unit_amount: p.price,
          product_data: {
            name: `${p.name} ${p.descriptor}`,
            description: p.size,
            metadata: { slug: p.slug, sku: p.sku },
            ...(canShowImages && image ? { images: [image.startsWith('http') ? image : `${siteUrl}${image}`] } : {}),
          },
        },
      });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      shipping_options: shippingOptions(subtotal),
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
      shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'AU'] },
      automatic_tax: { enabled: false },
      allow_promotion_codes: true,
      metadata: { source: 'the-jeffect-website' },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Checkout is unavailable right now. Please try again.' }, { status: 500 });
  }
}
