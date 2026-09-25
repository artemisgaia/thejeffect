import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/lib/site-config';

export const alt = 'The J Effect: mindful skincare rituals, made in the USA';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Default share card for every page without its own.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', color: '#F7F3EC',
          background: 'radial-gradient(ellipse at 30% 20%, #355438 0%, #243B27 50%, #1a2b1c 100%)',
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 12, color: '#DDB97A' }}>MINDFUL SKINCARE RITUALS</div>
        <div style={{ fontSize: 120, marginTop: 24, letterSpacing: -2 }}>{SITE_CONFIG.name}</div>
        <div style={{ fontSize: 30, marginTop: 24, color: 'rgba(247,243,236,.8)' }}>
          Clean formulas · Made in the USA
        </div>
      </div>
    ),
    { ...size },
  );
}
