'use client';
import { createContext, useContext, useState, useCallback, useSyncExternalStore } from 'react';
import { formatMoney } from '@/lib/format';
import { track } from '@/lib/track';

const CartContext = createContext(null);

const STORAGE_KEY = 'je-cart';
const EMPTY_CART = [];

// Cart lives in a tiny external store so localStorage hydrates without a
// setState-in-effect flash, and stays in sync across browser tabs.
let cartState = EMPTY_CART;
let cartLoaded = false;
const listeners = new Set();

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    cartState = Array.isArray(saved) ? saved : EMPTY_CART;
  } catch (_) {
    cartState = EMPTY_CART;
  }
  cartLoaded = true;
}

function getCartSnapshot() {
  if (!cartLoaded) loadCart();
  return cartState;
}

function getServerCartSnapshot() {
  return EMPTY_CART;
}

function subscribeToCart(listener) {
  listeners.add(listener);
  const onStorage = (e) => {
    if (e.key !== null && e.key !== STORAGE_KEY) return;
    loadCart();
    listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function setCart(update) {
  cartState = typeof update === 'function' ? update(getCartSnapshot()) : update;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState));
  } catch (_) {}
  listeners.forEach((l) => l());
}

export function CartProvider({ children }) {
  const cart = useSyncExternalStore(subscribeToCart, getCartSnapshot, getServerCartSnapshot);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((product, variant) => {
    track('add_to_cart', { product: product.slug });
    setCart((prev) => {
      const key = variant?.id || product.id;
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          slug: product.slug,
          title: product.title,
          variantTitle: variant?.label || null,
          price: variant?.price || product.price,
          stripe_price_id: variant?.stripe_price_id || product.stripe_price_id,
          image: product.images[0] || '',
          quantity: 1,
        },
      ];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const updateQty = useCallback((key, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.key !== key));
    } else {
      setCart((prev) =>
        prev.map((item) => (item.key === key ? { ...item, quantity: qty } : item))
      );
    }
  }, []);

  const clearCart = useCallback(() => setCart(EMPTY_CART), []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotalFormatted = formatMoney(cartTotal);

  // Stripe checkout
  const checkout = useCallback(async () => {
    if (cart.length === 0) return;
    track('checkout');
    try {
      const items = cart.map((item) => ({ slug: item.slug, quantity: item.quantity }));
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert(data.error || 'Checkout failed. Please try again.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Checkout failed. Please try again.');
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartTotal,
        cartTotalFormatted,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
