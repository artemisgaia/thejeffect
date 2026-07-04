export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/checkout/'],
    },
    sitemap: 'https://thejeffect.com/sitemap.xml', // Replace with production URL when deployed
  };
}
