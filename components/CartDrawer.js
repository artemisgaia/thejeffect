'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatMoney } from '@/lib/format';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, cartTotal, cartTotalFormatted, checkout } = useCart();

  const FREE_SHIPPING_THRESHOLD = 5000; // $50 in cents
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const progress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div
      id="cart-drawer"
      className={`cart-drawer${cartOpen ? ' open' : ''}`}
      aria-hidden={!cartOpen}
      role="dialog"
      aria-label="Shopping cart"
    >
      <div className="cart-drawer__overlay" id="cart-overlay" onClick={() => setCartOpen(false)} />
      <div className="cart-drawer__panel">
        <div className="cart-drawer__header">
          <span className="cart-drawer__title">Your Ritual Bag</span>
          <button className="cart-drawer__close" id="cart-close" aria-label="Close cart" onClick={() => setCartOpen(false)}>✕</button>
        </div>

        {/* Free shipping bar */}
        {cartTotal < FREE_SHIPPING_THRESHOLD && (
          <div style={{ padding: '10px 24px 0', fontSize: '.72rem', color: 'var(--ink-muted)', fontFamily: "var(--font-body)" }}>
            <div style={{ marginBottom: '6px' }}>
              Add <strong style={{ color: 'var(--forest)' }}>{formatMoney(remaining)}</strong> more for free shipping
            </div>
            <div style={{ height: '3px', background: 'var(--cream-3)', borderRadius: '2px' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'var(--gold)', borderRadius: '2px', transition: 'width .4s' }} />
            </div>
          </div>
        )}
        {cartTotal >= FREE_SHIPPING_THRESHOLD && (
          <div style={{ padding: '10px 24px 0', fontSize: '.72rem', color: 'var(--forest)', fontFamily: "var(--font-body)" }}>
            You qualify for free shipping!
          </div>
        )}

        <div className="cart-drawer__body" id="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty" style={{ textAlign: 'center', padding: '60px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: 'var(--cream-3)', marginBottom: '24px' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: '1.6rem', color: 'var(--ink)', marginBottom: '12px' }}>Your ritual bag is empty.</h3>
              <p style={{ fontFamily: "var(--font-body)", color: 'var(--ink-soft)', fontSize: '0.9rem', marginBottom: '32px' }}>Take your time. Intentional skincare shouldn&rsquo;t be rushed.</p>
              <Link href="/shop" className="btn-primary" style={{ display: 'inline-flex' }} onClick={() => setCartOpen(false)}>
                Start Your Ritual →
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.key}>
                {item.image ? (
                  <Image className="cart-item__img" src={item.image} alt={item.title} width={80} height={90} loading="lazy" />
                ) : (
                  <div className="cart-item__img" aria-hidden="true" />
                )}
                <div>
                  <div className="cart-item__title">{item.title}</div>
                  {item.variantTitle && <div className="cart-item__variant">{item.variantTitle}</div>}
                  <div className="cart-item__price">{formatMoney(item.price * item.quantity)}</div>
                  {/* Qty controls */}
                  <div className="cart-item__qty-row">
                    <button className="cart-qty-btn" onClick={() => updateQty(item.key, item.quantity - 1)} aria-label="Decrease quantity">−</button>
                    <span className="cart-qty-num">{item.quantity}</span>
                    <button className="cart-qty-btn" onClick={() => updateQty(item.key, item.quantity + 1)} aria-label="Increase quantity">+</button>
                  </div>
                  <button className="cart-item__remove" onClick={() => removeFromCart(item.key)} aria-label={`Remove ${item.title}`}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer__footer" id="cart-footer">
            <div className="cart-drawer__subtotal">
              <span>Subtotal</span>
              <span id="cart-subtotal">{cartTotalFormatted}</span>
            </div>
            <button
              className="btn-primary cart-drawer__checkout"
              onClick={checkout}
              style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
            >
              Proceed to Checkout →
            </button>
            <p className="cart-drawer__note">Shipping &amp; taxes calculated at checkout</p>
          </div>
        )}
      </div>
    </div>
  );
}
