import Image from 'next/image';
import { SITE_SLOTS } from '@/lib/site-slots';
import { siteImageExists } from '@/lib/site-images';
import { getProductBySlug } from '@/lib/products';

// Fills its (position: relative, sized) parent. Shows the real photo for the
// slot once it exists. Until then it borrows the studio photo of one of the
// slot's products when a real one exists; otherwise it stays an empty, plain
// frame. Generated packaging renders are never used.
export default function SiteImage({ slot, alt, sizes = '50vw', priority = false, className = '' }) {
  const def = SITE_SLOTS[slot];
  const real = siteImageExists(slot);

  let src = real ? `/site/${slot}.webp` : null;
  let text = alt ?? def.alt;
  if (!src) {
    const slugs = [...new Set([def.fallback, ...(def.refs || [])])];
    for (const slug of slugs) {
      const hero = getProductBySlug(slug)?.gallery.find((g) => g.kind === 'hero');
      if (hero) { src = hero.src; text = alt ?? hero.alt; break; }
    }
  }
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={text}
      fill
      sizes={sizes}
      priority={priority}
      className={`site-img${real ? '' : ' site-img--fallback'}${className ? ` ${className}` : ''}`}
    />
  );
}
