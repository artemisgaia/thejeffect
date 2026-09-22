/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'thejeffect.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard.html',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
