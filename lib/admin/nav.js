// The admin's information architecture, copied from Shopify's: one sidebar,
// sections with sub-pages, and a separate sidebar for Settings.
export const NAV = [
  { href: '/admin', label: 'Home', icon: 'home', exact: true },
  { href: '/admin/orders', label: 'Orders', icon: 'orders', sub: [
    { href: '/admin/orders/drafts', label: 'Drafts' },
    { href: '/admin/orders/abandoned', label: 'Abandoned checkouts' },
  ] },
  { href: '/admin/products', label: 'Products', icon: 'tag', sub: [
    { href: '/admin/products/collections', label: 'Collections' },
    { href: '/admin/products/inventory', label: 'Inventory' },
    { href: '/admin/products/purchase-orders', label: 'Purchase orders' },
    { href: '/admin/products/transfers', label: 'Transfers' },
    { href: '/admin/products/gift-cards', label: 'Gift cards' },
  ] },
  { href: '/admin/customers', label: 'Customers', icon: 'users', sub: [
    { href: '/admin/customers/segments', label: 'Segments' },
    { href: '/admin/customers/companies', label: 'Companies' },
    { href: '/admin/subscribers', label: 'Email subscribers' },
  ] },
  { href: '/admin/growth', label: 'Growth', icon: 'growth', sub: [
    { href: '/admin/growth/attribution', label: 'Attribution' },
    { href: '/admin/campaigns', label: 'Campaigns' },
  ] },
  { href: '/admin/discounts', label: 'Discounts', icon: 'percent' },
  { href: '/admin/content', label: 'Content', icon: 'content', sub: [
    { href: '/admin/content/metaobjects', label: 'Metaobjects' },
    { href: '/admin/content/files', label: 'Files' },
    { href: '/admin/content/menus', label: 'Menus' },
    { href: '/admin/content/blog-posts', label: 'Blog posts' },
  ] },
  { href: '/admin/markets', label: 'Markets', icon: 'globe', sub: [
    { href: '/admin/markets/catalogs', label: 'Catalogs' },
    { href: '/admin/markets/rollouts', label: 'Rollouts' },
  ] },
  { href: '/admin/analytics', label: 'Analytics', icon: 'chart', sub: [
    { href: '/admin/analytics/finance', label: 'Finance' },
    { href: '/admin/analytics/reports', label: 'Reports' },
    { href: '/admin/analytics/live', label: 'Live View' },
  ] },
  { label: 'Sales channels', group: true },
  { href: '/admin/online-store', label: 'Online Store', icon: 'store', sub: [
    { href: '/admin/online-store/themes', label: 'Themes' },
    { href: '/admin/online-store/pages', label: 'Pages' },
    { href: '/admin/online-store/preferences', label: 'Preferences' },
  ] },
  { href: '/admin/pos', label: 'Point of Sale', icon: 'pos' },
];

export const SETTINGS_NAV = [
  { href: '/admin/settings/general', label: 'General', icon: 'store' },
  { href: '/admin/settings/plan', label: 'Plan', icon: 'plan' },
  { href: '/admin/settings/billing', label: 'Billing', icon: 'receipt' },
  { href: '/admin/settings/users', label: 'Users', icon: 'user' },
  { href: '/admin/settings/payments', label: 'Payments', icon: 'card' },
  { href: '/admin/settings/checkout', label: 'Checkout', icon: 'cart' },
  { href: '/admin/settings/customer-accounts', label: 'Customer accounts', icon: 'users' },
  { href: '/admin/settings/shipping', label: 'Shipping and delivery', icon: 'truck' },
  { href: '/admin/settings/taxes', label: 'Taxes and duties', icon: 'percent' },
  { href: '/admin/settings/locations', label: 'Locations', icon: 'pin' },
  { href: '/admin/settings/apps', label: 'Apps', icon: 'plug' },
  { href: '/admin/settings/sales-channels', label: 'Sales channels', icon: 'store' },
  { href: '/admin/settings/domains', label: 'Domains', icon: 'globe' },
  { href: '/admin/settings/customer-events', label: 'Customer events', icon: 'code' },
  { href: '/admin/settings/notifications', label: 'Notifications', icon: 'bell' },
  { href: '/admin/settings/metafields', label: 'Metafields and metaobjects', icon: 'database' },
  { href: '/admin/settings/languages', label: 'Languages', icon: 'lang' },
  { href: '/admin/settings/privacy', label: 'Customer privacy', icon: 'shield' },
  { href: '/admin/settings/policies', label: 'Policies', icon: 'doc' },
  { href: '/admin/settings/announcement', label: 'Announcement bar', icon: 'bell' },
];

// Flat list for the search palette.
export function searchIndex() {
  const out = [];
  for (const n of NAV) {
    if (!n.href) continue;
    out.push({ label: n.label, href: n.href, hint: 'Page' });
    (n.sub || []).forEach((s) => out.push({ label: s.label, href: s.href, hint: n.label }));
  }
  SETTINGS_NAV.forEach((s) => out.push({ label: s.label, href: s.href, hint: 'Settings' }));
  return out;
}
