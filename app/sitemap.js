import { PRODUCTS, POSTS } from '@/lib/products';
import { SITE_CONFIG } from '@/lib/site-config';

export default async function sitemap() {
  const baseUrl = 'https://thejeffect.com'; // Replace with production URL when deployed

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
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic product routes
  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Dynamic journal routes
  const postRoutes = POSTS.map((post) => ({
    url: `${baseUrl}/journal/${post.slug}`,
    lastModified: new Date(post.date).toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...routes, ...productRoutes, ...postRoutes];
}
