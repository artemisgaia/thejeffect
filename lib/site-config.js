// ──────────────────────────────────────────────────────────────
// THE J EFFECT — Site Configuration
// Update these values with your real content.
// ──────────────────────────────────────────────────────────────

export const SITE_CONFIG = {
  name: 'The J Effect',
  tagline: 'Mindful Skincare Rituals',
  description: 'Clean skincare rituals crafted in the USA. Shop moisturizers, serums, cleansers and ritual bars for luminous, confident skin.',
  url: 'https://thejeffect.com', // Updated for production SEO
  phone: '1-800-J-EFFECT',
  email: 'hello@thejeffect.com',
  address: '123 Luminous Way, Los Angeles, CA 90012',

  announcement: {
    show: true,
    text: (
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        Free shipping on orders over $50 — Made in the USA
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
      </span>
    ),
    link: '/shop',
    bg: '#243B27',
    color: '#F0DEB8',
  },

  nav: [
    { label: 'Shop',         href: '/shop' },
    { label: 'Ritual Guide', href: '/ritual-guide' },
    { label: 'Journal',      href: '/journal' },
    { label: 'About',        href: '/about' },
    { label: 'Contact',      href: '/contact' },
  ],

  footer: {
    tagline:
      'Mindful skincare rituals, crafted in the USA. Made to feel like coming home to yourself.',
    col1: {
      heading: 'Shop',
      links: [
        { label: 'All Products',    href: '/shop' },
        { label: 'Moisturizers',    href: '/shop/category/moisturizers' },
        { label: 'Serums',          href: '/shop/category/serums' },
        { label: 'Cleansers',       href: '/shop/category/cleansers' },
        { label: 'Ritual Bars',     href: '/shop/category/ritual-bars' },
      ],
    },
    col2: {
      heading: 'Explore',
      links: [
        { label: 'Ritual Guide',    href: '/ritual-guide' },
        { label: 'Our Story',       href: '/about' },
        { label: 'Journal',         href: '/journal' },
      ],
    },
    col3: {
      heading: 'Help',
      links: [
        { label: 'Contact Us',        href: '/contact' },
        { label: 'Shipping & Returns', href: '/shipping' },
        { label: 'FAQ',               href: '/faq' },
        { label: 'Privacy Policy',    href: '/privacy' },
        { label: 'Terms of Service',  href: '/terms' },
      ],
    },
    social: {
      instagram: 'https://instagram.com/thejeffect',
      tiktok:    '',
      facebook:  '',
      pinterest: '',
      youtube:   '',
    },
    copyright: '© 2026 The J Effect. All rights reserved.',
    showPaymentIcons: true,
    newsletter: {
      show: true,
      heading: 'Join the Ritual',
      placeholder: 'Your email address',
      btn: 'Subscribe →',
      note: 'No spam. Unsubscribe anytime.',
    },
  },

  trust: [
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>, 
      label: 'Clean Formula' 
    },
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>, 
      label: 'Made in USA' 
    },
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>, 
      label: 'Cruelty Free' 
    },
    { 
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="m9 16 3-3 3 3"></path></svg>, 
      label: 'Free Returns' 
    },
  ],
};
