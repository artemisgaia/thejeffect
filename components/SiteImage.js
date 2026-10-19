import Image from 'next/image';
import { SITE_SLOTS } from '@/lib/site-slots';
import { siteImageExists } from '@/lib/site-images';

// Fills its (position: relative, sized) parent. Shows the real photo for the
// slot once it exists, otherwise the product packaging render as a fallback.
export default function SiteImage({ slot, alt, sizes = '50vw', priority = false, className = '' }) {
  const def = SITE_SLOTS[slot];
  const real = siteImageExists(slot);
  const src = real ? `/site/${slot}.webp` : `/products/${def.fallback}/${def.fallback}-pack.webp`;

  return (
    <Image
      src={src}
      alt={alt ?? def.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`site-img${real ? '' : ' site-img--pack'}${className ? ` ${className}` : ''}`}
    />
  );
}
