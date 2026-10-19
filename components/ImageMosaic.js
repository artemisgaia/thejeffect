import SiteImage from '@/components/SiteImage';
import { MOSAIC_IMAGES } from '@/lib/products';

export default function ImageMosaic({ images = MOSAIC_IMAGES }) {
  return (
    <section className="gallery" aria-label="Gallery">
      <div className="image-mosaic__grid">
        {images.map((img, i) => (
          <figure
            key={img.slot}
            className={`mosaic-item reveal reveal--d${(i % 4) + 1}${img.tall ? ' mosaic-item--tall' : ''}${img.wide ? ' mosaic-item--wide' : ''}`}
          >
            <SiteImage slot={img.slot} alt={img.caption || ''} sizes="(min-width: 900px) 33vw, 50vw" />
            {img.caption && <figcaption className="mosaic-item__cap">{img.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}
