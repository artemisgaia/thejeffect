import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './styles/base.css';
import './styles/pages.css';
import './styles/chrome.css';
import './styles/catalog.css';
import './styles/home.css';
import { SITE_CONFIG } from '@/lib/site-config';
import { siteGraph, jsonLd } from '@/lib/seo';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const body = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
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
      <body>{children}</body>
    </html>
  );
}
