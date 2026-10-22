import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import './styles/base.css';
import './styles/pages.css';
import './styles/chrome.css';
import './styles/catalog.css';
import './styles/home.css';
import './styles/inner.css';
import { SITE_CONFIG } from '@/lib/site-config';
import { siteGraph, jsonLd } from '@/lib/seo';

// Fonts are bundled in app/fonts (latin subset) so the build never needs to reach Google.
const display = localFont({
  src: [
    { path: './fonts/CormorantGaramond-normal-300.woff2', weight: '300', style: 'normal' },
    { path: './fonts/CormorantGaramond-italic-300.woff2', weight: '300', style: 'italic' },
    { path: './fonts/CormorantGaramond-normal-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/CormorantGaramond-italic-400.woff2', weight: '400', style: 'italic' },
    { path: './fonts/CormorantGaramond-normal-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/CormorantGaramond-italic-500.woff2', weight: '500', style: 'italic' },
    { path: './fonts/CormorantGaramond-normal-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/CormorantGaramond-italic-600.woff2', weight: '600', style: 'italic' },
  ],
  variable: '--font-cormorant',
  display: 'swap',
});

const body = localFont({
  src: [
    { path: './fonts/DMSans-normal-300.woff2', weight: '300', style: 'normal' },
    { path: './fonts/DMSans-normal-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/DMSans-normal-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/DMSans-normal-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: 'website',
    siteName: SITE_CONFIG.name,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`no-js ${display.variable} ${body.variable}`}>
      <head>
        <meta name="theme-color" content="#243B27" />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(siteGraph())} />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
