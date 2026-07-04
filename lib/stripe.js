// lib/stripe.js — Server-side Stripe client
// This module is ONLY imported in server-side code (API routes).
// Never import it in client components.
//
// The client is created lazily (not at module load) so a missing key
// only fails the checkout request at runtime, not the entire build.

import Stripe from 'stripe';

let stripe = null;

export function getStripe() {
  if (!stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error(
        'Missing STRIPE_SECRET_KEY environment variable. ' +
        'Copy .env.local.example to .env.local and fill in your Stripe keys.'
      );
    }
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
    });
  }
  return stripe;
}
