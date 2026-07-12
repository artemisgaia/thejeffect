'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { formatMoney } from '@/lib/products';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('je-cart');
      if (saved) setCart(JSON.parse(saved));
    } catch (_) {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('je-cart', JSON.stringify(cart));
    } catch (_) {}
  }, [cart]);

  const addToCart = useCallback((product, variant) => {
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

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotalFormatted = formatMoney(cartTotal);

  // Stripe checkout
  const checkout = useCallback(async () => {
    if (cart.length === 0) return;
    try {
      const lineItems = cart.map((item) => ({
        price: item.stripe_price_id,
        quantity: item.quantity,
      }));
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lineItems }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert('Checkout failed. Please try again.');
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
