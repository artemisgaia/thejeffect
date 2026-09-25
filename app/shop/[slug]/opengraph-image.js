import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { PRODUCTS, getProductBySlug, formatMoney } from '@/lib/products';

export const alt = 'The J Effect product';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Prerender every card at build time (reads the image from public/).
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

// Landscape share card: product image left, name and price right.
export default async function Image({ params }) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  const src = join(process.cwd(), 'public', p.gallery[0].src);
  const png = await sharp(await readFile(src)).resize(473, 630, { fit: 'cover' }).png().toBuffer();
  const img = `data:image/png;base64,${png.toString('base64')}`;
  const no = String(p.no).padStart(2, '0');

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#F7F3EC' }}>
        <img src={img} width={473} height={630} alt="" style={{ objectFit: 'cover' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 72px', background: '#243B27', color: '#F7F3EC' }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: '#DDB97A', textTransform: 'uppercase' }}>{`Nº ${no} · ${p.type}`}</div>
          <div style={{ fontSize: 76, lineHeight: 1.02, marginTop: 22 }}>{p.name}</div>
          <div style={{ fontSize: 30, lineHeight: 1.3, marginTop: 18, color: 'rgba(247,243,236,.82)' }}>{p.descriptor}</div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 44, fontSize: 28 }}>
            <span style={{ color: '#DDB97A' }}>{formatMoney(p.price)}</span>
            <span style={{ margin: '0 18px', opacity: 0.4 }}>·</span>
            <span style={{ opacity: 0.8 }}>{p.size}</span>
          </div>
          <div style={{ position: 'absolute', bottom: 44, left: 72, fontSize: 20, letterSpacing: 10, opacity: 0.7 }}>THE J EFFECT</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
