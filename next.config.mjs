const RETIRED_PRODUCTS = {
  'spf-serum': 'green-tea-antioxidant-serum',
  'lip-serum': 'raw-shea-butter',
  'aha-exfoliating-toner': 'witch-hazel-pore-toner',
  'eye-cream': 'peptide-eye-gel-cream',
  'retinol-eye-cream': 'peptide-eye-gel-cream',
  'hydrating-face-mask': 'dead-sea-mud-mask',
  'brightening-face-mask': 'dead-sea-mud-mask',
  'facial-mist': 'gentle-balancing-toner',
  'bb-cream-tinted-moisturizer': 'watermelon-hydration-moisturizer',
  'tallow-cream': 'tallow-cream-orange-bergamot',
  'body-lotion': 'raw-shea-butter',
  'firming-body-cream': 'dmae-firming-cream',
  'body-butter': 'raw-shea-butter',
  'body-serum': 'raw-shea-butter',
  'stretch-mark-cream': 'raw-shea-butter',
  'body-oil': 'raw-shea-butter',
  'bath-soak': 'dead-sea-mud-mask',
  'rose-hibiscus-soap': 'calming-lavender-soap',
  'lavender-mint-soap': 'calming-lavender-soap',
  'coffee-scrub-soap': 'coffee-body-scrub',
  'goat-milk-soap': 'oat-milk-honey-soap',
  'dead-sea-salt-soap': 'dead-sea-mud-mask',
};

const FILTER_TO_CATEGORY = {
  'cleanser': 'cleansers', 'toner': 'toners', 'serum': 'serums', 'face-oil': 'face-oils',
  'eye-care': 'eye-care', 'mask': 'masks', 'moisturizer': 'moisturizers', 'body': 'body',
  'ritual-bar': 'ritual-bars', 'hair': 'hair-scalp',
};

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
      // Retired products → closest live product (keeps links and rankings)
      ...Object.entries(RETIRED_PRODUCTS).map(([from, to]) => ({
        source: `/shop/${from}`,
        destination: `/shop/${to}`,
        permanent: true,
      })),
      // Legacy filter URLs → indexable category pages
      ...Object.entries(FILTER_TO_CATEGORY).map(([filter, path]) => ({
        source: '/shop',
        has: [{ type: 'query', key: 'filter', value: filter }],
        destination: `/shop/category/${path}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
