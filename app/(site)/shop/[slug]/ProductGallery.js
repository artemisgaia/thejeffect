'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';

// Scroll-snap track: swipe on touch, arrow buttons / thumbnails / arrow keys on desktop.
// Every image is in the DOM so all of them are crawlable.
export default function ProductGallery({ images }) {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  const many = images.length > 1;

  const go = (i) => {
    const el = track.current;
    if (!el || !images.length) return;
    const next = (i + images.length) % images.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' });
    setActive(next);
  };

  const onScroll = () => {
    const el = track.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const onKeyDown = (e) => {
    if (!many) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
  };

  if (!images.length) {
    return (
      <div className="pdp-gallery">
        <div className="pdp-gallery__empty" role="img" aria-label="Product photography coming soon">
          <span>Photography coming soon</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pdp-gallery">
      <div className="pdp-gallery__stage">
        <div
          className="pdp-gallery__track"
          ref={track}
          onScroll={onScroll}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Product images"
        >
          {images.map((img, i) => (
            <figure
              key={img.src}
              className="pdp-gallery__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={1200}
                height={1600}
                sizes="(min-width: 900px) 50vw, 100vw"
                priority={i === 0}
                loading={i === 0 ? undefined : 'lazy'}
              />
            </figure>
          ))}
        </div>

        {many && (
          <>
            <button type="button" className="pdp-gallery__nav pdp-gallery__nav--prev" onClick={() => go(active - 1)} aria-label="Previous image">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button type="button" className="pdp-gallery__nav pdp-gallery__nav--next" onClick={() => go(active + 1)} aria-label="Next image">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
            <p className="pdp-gallery__count" aria-live="polite">{active + 1} / {images.length}</p>
          </>
        )}
      </div>

      {many && (
        <>
          <div className="pdp-gallery__dots" aria-hidden="true">
            {images.map((img, i) => (
              <span key={img.src} className={i === active ? 'is-active' : ''} />
            ))}
          </div>
          <div className="pdp-gallery__thumbs">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className={`pdp-gallery__thumb${i === active ? ' is-active' : ''}`}
                onClick={() => go(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === active}
              >
                <Image src={img.src} alt="" width={120} height={160} loading="lazy" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
