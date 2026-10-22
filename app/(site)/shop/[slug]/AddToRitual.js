'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatMoney } from '@/lib/format';

// Add-to-cart button plus the sticky bar ThemeScript reveals on scroll.
export default function AddToRitual({ product }) {
  const { addToCart } = useCart();
  const variant = product.variants[0];
  const soldOut = product.sold_out;
  const [added, setAdded] = useState(false);
  const add = () => {
    if (soldOut) return;
    addToCart(product, variant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };
  const price = formatMoney(variant.price);

  return (
    <>
      <div className="pdp-atc">
        <button className={`btn-primary pdp-atc__btn${added ? ' is-added' : ''}`} onClick={add} disabled={soldOut}>
          {soldOut ? 'Sold out' : added ? 'Added to your ritual ✓' : `Add to Ritual · ${price}`}
        </button>
        <p className="pdp-atc__note">Free U.S. shipping over $50 · 30-day money-back guarantee</p>
      </div>

      <div className="sticky-bar" aria-hidden="true">
        <div className="sticky-bar__inner">
          <div className="sticky-bar__product">
            {product.images[0] && (
              <Image src={product.images[0]} alt="" className="sticky-bar__img" width={44} height={58} />
            )}
            <span className="sticky-bar__name">{product.name}</span>
          </div>
          <span className="sticky-bar__price">{price}</span>
          <button className="btn-primary sticky-bar__atc" onClick={add} tabIndex={-1} disabled={soldOut}>
            {soldOut ? 'Sold out' : 'Add to Ritual'}
          </button>
        </div>
      </div>
    </>
  );
}
