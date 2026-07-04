import Image from 'next/image';
import { MOSAIC_IMAGES } from '@/lib/products';

export default function ImageMosaic({ images = MOSAIC_IMAGES }) {
  return (
    <section className="section section--sm" aria-label="Gallery">
      <div className="image-mosaic__grid">
        {images.map((img, i) => (
          <div
            key={i}
            className={`mosaic-item${img.tall ? ' mosaic-item--tall' : ''}${img.wide ? ' mosaic-item--wide' : ''}`}
          >
            <Image src={img.src} alt={img.caption || ''} loading="lazy" width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {img.caption && <div className="mosaic-item__cap">{img.caption}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
