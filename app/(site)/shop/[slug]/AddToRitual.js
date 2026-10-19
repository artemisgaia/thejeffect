'use client';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatMoney } from '@/lib/format';

// Add-to-cart button plus the sticky bar ThemeScript reveals on scroll.
export default function AddToRitual({ product }) {
  const { addToCart } = useCart();
  const variant = product.variants[0];
  const soldOut = product.sold_out;
  const add = () => { if (!soldOut) addToCart(product, variant); };
  const price = formatMoney(variant.price);

  return (
    <>
      <div className="pdp-atc">
        <button className="btn-primary pdp-atc__btn" onClick={add} disabled={soldOut}>
          {soldOut ? 'Sold out' : `Add to Ritual · ${price}`}
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
