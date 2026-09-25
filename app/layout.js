import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ThemeScript from '@/components/ThemeScript';
import { SITE_CONFIG } from '@/lib/site-config';
import { siteGraph, jsonLd } from '@/lib/seo';

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
    <html lang="en" className="no-js">
      <head>
        <meta name="theme-color" content="#243B27" />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(siteGraph())} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          {/* Skip link */}
          <a className="skip-link" href="#main-content">Skip to content</a>

          {/* Custom cursor */}
          <div id="je-cursor" aria-hidden="true" />
          <div id="je-cursor-ring" aria-hidden="true" />

          {/* Header */}
          <Header />

          {/* Cart drawer */}
          <CartDrawer />

          {/* Main */}
          <main id="main-content" role="main" tabIndex="-1">
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Theme JS (cursor, scroll, nav, accordions, reveal) */}
          <ThemeScript />
        </CartProvider>
      </body>
    </html>
  );
}
