'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatMoney } from '@/lib/format';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal, cartTotalFormatted, checkout } = useCart();

  const FREE_SHIPPING = 5000;
  const remaining = Math.max(0, FREE_SHIPPING - cartTotal);
  const progress = Math.min(100, (cartTotal / FREE_SHIPPING) * 100);

  return (
    <div style={{ paddingTop: 'calc(var(--announce-h) + var(--header-h) + 40px)', background: 'var(--cream)', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: '400', color: 'var(--ink)', marginBottom: '8px' }}>Your Ritual Bag</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '.82rem', color: 'var(--ink-muted)', marginBottom: '40px' }}>
          {cart.length} {cart.length === 1 ? 'item' : 'items'}
        </p>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ color: 'var(--cream-3)', marginBottom: '20px' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'var(--ink-muted)', marginBottom: '28px' }}>Your bag is empty.</p>
            <Link href="/shop" className="btn-primary">Start Your Ritual →</Link>
          </div>
        ) : (
          <div className="cart-page__grid">
            {/* Line items */}
            <div>
              {cart.map((item) => (
                <div key={item.key} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '20px', padding: '24px 0', borderBottom: '1px solid var(--cream-3)' }}>
                    <Image src={item.image} alt={item.title} width={100} height={120} style={{ width: '100px', height: '120px', objectFit: 'cover' }} loading="lazy" />
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '.72rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '4px' }}>The J Effect</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: '400', fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '4px' }}>{item.title}</h3>
                    {item.variantTitle && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '.78rem', color: 'var(--ink-muted)', marginBottom: '8px' }}>{item.variantTitle}</div>}
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '.95rem', fontWeight: '500', color: 'var(--ink)', marginBottom: '12px' }}>{formatMoney(item.price * item.quantity)}</div>

                    {/* Qty */}
                    <div className="cart-line__qty">
                      <button className="cart-line__qty-btn" onClick={() => updateQty(item.key, item.quantity - 1)} aria-label="Decrease">−</button>
                      <span className="cart-line__qty-num">{item.quantity}</span>
                      <button className="cart-line__qty-btn" onClick={() => updateQty(item.key, item.quantity + 1)} aria-label="Increase">+</button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.key)}
                      style={{ marginTop: '10px', background: 'none', border: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '.72rem', color: 'var(--ink-muted)', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div style={{ background: 'var(--cream-2)', padding: '32px', border: '1px solid var(--cream-3)', position: 'sticky', top: 'calc(var(--announce-h) + var(--header-h) + 20px)' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: '400', color: 'var(--ink)', marginBottom: '24px' }}>Order Summary</h2>

              {/* Free shipping bar */}
              {cartTotal < FREE_SHIPPING ? (
                <div style={{ marginBottom: '20px', padding: '12px', background: 'var(--cream)', border: '1px solid var(--cream-3)', fontSize: '.75rem', fontFamily: "'DM Sans', sans-serif", color: 'var(--ink-muted)' }}>
                  <div style={{ marginBottom: '8px' }}>Add <strong style={{ color: 'var(--forest)' }}>{formatMoney(remaining)}</strong> more for free shipping</div>
                  <div style={{ height: '3px', background: 'var(--cream-3)', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: 'var(--gold)', borderRadius: '2px', transition: 'width .4s' }} />
                  </div>
                </div>
              ) : (
                <div style={{ marginBottom: '20px', padding: '12px', background: '#e8f5e8', fontSize: '.78rem', fontFamily: "'DM Sans', sans-serif", color: 'var(--forest)', fontWeight: '500' }}>
                  You qualify for free shipping!
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Sans', sans-serif", fontSize: '.88rem', color: 'var(--ink)', marginBottom: '8px' }}>
                <span>Subtotal</span><span style={{ fontWeight: '500' }}>{cartTotalFormatted}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Sans', sans-serif", fontSize: '.82rem', color: 'var(--ink-muted)', marginBottom: '24px' }}>
                <span>Shipping</span><span>{cartTotal >= FREE_SHIPPING ? 'Free' : 'Calculated at checkout'}</span>
              </div>
              <div style={{ height: '1px', background: 'var(--cream-3)', marginBottom: '24px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '28px' }}>
                <span>Total</span><span>{cartTotalFormatted}</span>
              </div>

              <button
                className="btn-primary"
                onClick={checkout}
                style={{ width: '100%', justifyContent: 'center', display: 'flex', marginBottom: '12px' }}
              >
                Checkout with Stripe →
              </button>
              <Link href="/shop" style={{ display: 'block', textAlign: 'center', fontFamily: "'DM Sans', sans-serif", fontSize: '.78rem', color: 'var(--ink-muted)', textDecoration: 'none' }}>
                ← Continue Shopping
              </Link>
              <p style={{ marginTop: '16px', fontSize: '.72rem', color: 'var(--ink-muted)', fontFamily: "'DM Sans', sans-serif", textAlign: 'center' }}>
                Secure checkout via Stripe · SSL encrypted
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
