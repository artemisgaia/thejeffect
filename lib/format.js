// Client-safe helpers. Import from here in 'use client' components so
// the full catalog in lib/products.js stays out of the browser bundle.

// Format price from cents
export function formatMoney(cents) {
  return '$' + (cents / 100).toFixed(2);
}
