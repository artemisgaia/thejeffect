import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ThemeScript from '@/components/ThemeScript';
import Tracker from '@/components/Tracker';
import { getSiteSettings } from '@/lib/store';

// Storefront shell: announcement bar, header, cart drawer, footer.
// Shared by the (site) layout and the global 404 page.
export default async function SiteChrome({ children }) {
  const { announcement } = await getSiteSettings();

  return (
    <CartProvider>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header announcementOverride={announcement} />
      <CartDrawer />
      <main id="main-content" tabIndex="-1">
        {children}
      </main>
      <Footer />
      <ThemeScript />
      <Tracker />
    </CartProvider>
  );
}
