'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatMoney } from '@/lib/format';

// Expects the slim shape from toCard() in lib/products.js.
export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const cv = product.variants?.[0] || product;
  const hasCompare = product.compare_at_price && product.compare_at_price > product.price;
  const isBestseller = product.tags.includes('bestseller');
  const isNew = product.tags.includes('new');
  const isSale = hasCompare;
  const href = `/shop/${product.slug}`;

  return (
    <article
      className="product-card reveal"
      data-product-id={product.id}
      data-type={product.type.toLowerCase().replace(/\s+/g, '-')}
    >
      <div className="product-card__media">
        <Link href={href} className="product-card__img-link" aria-label={`View ${product.name} ${product.descriptor}`}>
          {product.images[0] ? (
            <>
              <Image
                className="product-card__img"
                src={product.images[0]}
                alt={product.alt || product.title}
                width={600}
                height={800}
                sizes="(min-width: 1200px) 25vw, (min-width: 600px) 50vw, 100vw"
                loading="lazy"
              />
              {product.images[1] && (
                <Image
                  className="product-card__img product-card__img--hover"
                  src={product.images[1]}
                  alt=""
                  width={600}
                  height={800}
                  sizes="(min-width: 1200px) 25vw, (min-width: 600px) 50vw, 100vw"
                  loading="lazy"
                />
              )}
            </>
          ) : (
            <div className="product-card__img product-card__img--placeholder" />
          )}
        </Link>

        {/* Badges */}
        <div className="product-card__badges" aria-hidden="true">
          {isBestseller && <span className="badge badge--forest">Bestseller</span>}
          {!isBestseller && isNew && <span className="badge badge--gold">New</span>}
          {!isBestseller && !isNew && isSale && <span className="badge badge--sale">Sale</span>}
        </div>

        {/* ATC overlay */}
        <div className="product-card__overlay">
          <button
            className="btn-atc"
            onClick={() => addToCart(product, cv)}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Ritual — {formatMoney(product.price)}
          </button>
        </div>
      </div>

      <div className="product-card__info">
        <div className="product-card__type">
          {product.no ? `Nº ${String(product.no).padStart(2, '0')} · ` : ''}{product.type}
        </div>
        <h3 className="product-card__title">
          <Link href={href}>{product.name}</Link>
        </h3>
        <p className="product-card__descriptor">{product.descriptor}</p>
        <div className="product-card__bottom">
          <span className="product-card__price">
            {formatMoney(product.price)}
            {hasCompare && (
              <span className="product-card__compare">{formatMoney(product.compare_at_price)}</span>
            )}
          </span>
          {product.size && <span className="product-card__size">{product.size}</span>}
        </div>
      </div>
    </article>
  );
}
