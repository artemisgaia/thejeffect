// ──────────────────────────────────────────────────────────────
// THE J EFFECT — Structured data (schema.org JSON-LD)
// Validate with https://search.google.com/test/rich-results
// ──────────────────────────────────────────────────────────────
import { SITE_CONFIG } from './site-config';
import { CATEGORY_META } from './products';

const BASE = SITE_CONFIG.url;
export const abs = (p) => (p.startsWith('http') ? p : `${BASE}${p}`);

export const ORG_ID = `${BASE}/#organization`;
const RETURN_POLICY_ID = `${BASE}/#return-policy`;

// Escape "<" so no string can close the <script> tag early.
export function jsonLd(data) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}

// Site-wide entities, rendered once in the root layout.
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: SITE_CONFIG.name,
        url: BASE,
        slogan: SITE_CONFIG.tagline,
        email: SITE_CONFIG.email,
        sameAs: Object.values(SITE_CONFIG.footer.social).filter(Boolean),
        hasMerchantReturnPolicy: { '@id': RETURN_POLICY_ID },
      },
      {
        '@type': 'MerchantReturnPolicy',
        '@id': RETURN_POLICY_ID,
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/ReturnShippingFees',
        returnShippingFeesAmount: { '@type': 'MonetaryAmount', value: 5, currency: 'USD' },
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE}/#website`,
        url: BASE,
        name: SITE_CONFIG.name,
        publisher: { '@id': ORG_ID },
        inLanguage: 'en-US',
      },
    ],
  };
}

export function categoryUrl(category) {
  return `/shop/category/${CATEGORY_META[category].path}`;
}

function priceValidUntil() {
  return `${new Date().getFullYear() + 1}-12-31`;
}

export function productGraph(p, pairings = []) {
  const url = abs(`/shop/${p.slug}`);
  const cat = CATEGORY_META[p.category];
  const fullName = `${p.name} ${p.descriptor}`;

  const product = {
    '@type': 'Product',
    '@id': `${url}#product`,
    name: fullName,
    alternateName: p.collection ? `${p.collection} ${p.name}` : p.name,
    description: p.short,
    sku: p.sku,
    url,
    ...(p.gallery.length ? { image: p.gallery.map((g) => abs(g.src)) } : {}),
    brand: { '@type': 'Brand', name: SITE_CONFIG.name },
    manufacturer: { '@id': ORG_ID },
    category: `Health & Beauty > Personal Care > ${cat.label}`,
    size: p.size,
    countryOfOrigin: 'US',
    keywords: p.seo.keywords.join(', '),
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Skin type', value: p.skin_types.join(', ') },
      { '@type': 'PropertyValue', name: 'Key ingredients', value: p.key_ingredients.map((k) => k.name).join(', ') },
      { '@type': 'PropertyValue', name: 'Texture', value: p.texture },
      { '@type': 'PropertyValue', name: 'Scent', value: p.scent },
      { '@type': 'PropertyValue', name: 'When to use', value: p.ritual },
      ...p.badges.map((b) => ({ '@type': 'PropertyValue', name: 'Attribute', value: b })),
    ],
    isRelatedTo: pairings.map((q) => ({
      '@type': 'Product',
      name: `${q.name} ${q.descriptor}`,
      url: abs(`/shop/${q.slug}`),
    })),
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'USD',
      price: (p.price / 100).toFixed(2),
      priceValidUntil: priceValidUntil(),
      availability: p.sold_out ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': ORG_ID },
      hasMerchantReturnPolicy: { '@id': RETURN_POLICY_ID },
    },
  };

  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: abs('/shop') },
      { '@type': 'ListItem', position: 3, name: cat.label, item: abs(categoryUrl(p.category)) },
      { '@type': 'ListItem', position: 4, name: p.name, item: url },
    ],
  };

  const faq = {
    '@type': 'FAQPage',
    mainEntity: p.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return { '@context': 'https://schema.org', '@graph': [product, breadcrumbs, faq] };
}

export function itemListGraph(name, url, products) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url: abs(url),
    isPartOf: { '@id': `${BASE}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: abs(`/shop/${p.slug}`),
        name: `${p.name} ${p.descriptor}`,
      })),
    },
  };
}
