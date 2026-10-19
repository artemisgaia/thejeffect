import { POSTS, CATEGORY_META } from '@/lib/products';
import { getProducts } from '@/lib/store';
import { SITE_CONFIG } from '@/lib/site-config';
import { categoryUrl } from '@/lib/seo';

export default async function sitemap() {
  const PRODUCTS = await getProducts();
  const baseUrl = SITE_CONFIG.url;
  const today = new Date().toISOString().split('T')[0];

  // Core static routes
  const routes = [
    '',
    '/shop',
    '/ritual-guide',
    '/about',
    '/journal',
    '/faq',
    '/shipping',
    '/privacy',
    '/terms',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route === '/shop' ? 0.9 : 0.6,
  }));

  // Category landing pages
  const categoryRoutes = Object.keys(CATEGORY_META)
    .filter((key) => PRODUCTS.some((p) => p.category === key))
    .map((key) => ({
      url: `${baseUrl}${categoryUrl(key)}`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  // Product pages, with every gallery image for Google Images
  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.9,
    images: product.gallery.map((g) => (g.src.startsWith('http') ? g.src : `${baseUrl}${g.src}`)),
  }));

  // Journal posts
  const postRoutes = POSTS.map((post) => ({
    url: `${baseUrl}/journal/${post.slug}`,
    lastModified: new Date(post.date).toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...routes, ...categoryRoutes, ...productRoutes, ...postRoutes];
}
