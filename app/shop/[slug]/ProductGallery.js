'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';

// Scroll-snap track: swipe on touch, thumbnails and arrow keys on desktop.
// Every image is in the DOM so all five are crawlable.
export default function ProductGallery({ images, preview }) {
  const track = useRef(null);
  const [active, setActive] = useState(0);

  const go = (i) => {
    const el = track.current;
    if (!el) return;
    const next = (i + images.length) % images.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' });
    setActive(next);
  };

  const onScroll = () => {
    const el = track.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1); }
  };

  return (
    <div className="pdp-gallery">
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

      {images.length > 1 && (
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

      {preview && (
        <p className="gallery-note">Packaging preview. Product photography coming soon.</p>
      )}
    </div>
  );
}
