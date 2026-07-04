'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div style={{ paddingTop: 'calc(var(--announce-h) + var(--header-h) + 60px)', background: 'var(--cream)', minHeight: '80vh', textAlign: 'center' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ color: 'var(--forest)', marginBottom: '24px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: '400', color: 'var(--ink)', marginBottom: '16px' }}>
          Thank you for your order.
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--ink-soft)', lineHeight: '1.8', marginBottom: '32px' }}>
          Your payment was successful and your order is confirmed. You will receive an email confirmation shortly with your receipt and tracking information once your ritual ships.
        </p>

        <div style={{ background: 'var(--cream-2)', padding: '24px', marginBottom: '32px', textAlign: 'left' }}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '.72rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '16px' }}>What happens next</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: "'DM Sans', sans-serif", fontSize: '.88rem', color: 'var(--ink-soft)' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: 'var(--gold)', flexShrink: 0, width: '24px' }}>1</span>
              <span>Order confirmation email sent to your inbox</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: 'var(--gold)', flexShrink: 0, width: '24px' }}>2</span>
              <span>Your order is prepared and packed within 1–2 business days</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: 'var(--gold)', flexShrink: 0, width: '24px' }}>3</span>
              <span>Tracking number emailed once your package ships</span>
            </div>
          </div>
        </div>

        <Link href="/shop" className="btn-primary">
          Continue Shopping →
        </Link>
        <p style={{ marginTop: '24px', fontFamily: "'DM Sans', sans-serif", fontSize: '.78rem', color: 'var(--ink-muted)' }}>
          Questions about your order? <Link href="/contact" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>Contact us</Link>
        </p>
      </div>
    </div>
  );
}
