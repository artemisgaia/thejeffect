// Shipping rates in cents. Mirrors the copy on /shipping and the cart.
export const FREE_SHIPPING_THRESHOLD = 5000;

export const SHIPPING_RATES = [
  { id: 'standard',  label: 'Standard (3–5 business days)', amount: 595,  min: 3, max: 5 },
  { id: 'expedited', label: 'Expedited (2 business days)',  amount: 1295, min: 2, max: 2 },
  { id: 'overnight', label: 'Overnight (order by 12 PM PST)', amount: 2495, min: 1, max: 1 },
];

export function shippingOptions(subtotalCents) {
  return SHIPPING_RATES.map((r) => ({
    shipping_rate_data: {
      type: 'fixed_amount',
      display_name: r.id === 'standard' && subtotalCents >= FREE_SHIPPING_THRESHOLD ? 'Free standard shipping (3–5 business days)' : r.label,
      fixed_amount: {
        amount: r.id === 'standard' && subtotalCents >= FREE_SHIPPING_THRESHOLD ? 0 : r.amount,
        currency: 'usd',
      },
      delivery_estimate: {
        minimum: { unit: 'business_day', value: r.min },
        maximum: { unit: 'business_day', value: r.max },
      },
    },
  }));
}
