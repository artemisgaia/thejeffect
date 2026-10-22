// Config-driven admin resources. One entry = a Shopify-style list page, an empty
// state, and a create/edit form, all handled by app/admin/[...path].
//
// field types: text | textarea | number | money | select | bool | date | datetime | tags | lines | email | tel | url
// column types: text | money | date | datetime | badge | bool | count | number

const DONE = { paid: 'ok', fulfilled: 'ok', active: 'ok', received: 'ok', live: 'ok', sent: 'ok', completed: 'ok', true: 'ok', open: 'info', ordered: 'info', invoiced: 'info', in_transit: 'info', scheduled: 'info', draft: '', unfulfilled: 'warn', pending: 'warn', refunded: 'danger', cancelled: 'danger' };

export const RESOURCES = {
  'orders/drafts': {
    table: 'draft_orders', title: 'Drafts', singular: 'draft order', icon: 'orders', order: ['created_at', false],
    columns: [
      { key: 'number', label: 'Draft', type: 'text', prefix: '#D' },
      { key: 'created_at', label: 'Date', type: 'date' },
      { key: 'name', label: 'Customer', type: 'text', fallback: 'email' },
      { key: 'status', label: 'Status', type: 'badge', map: DONE },
      { key: 'total', label: 'Total', type: 'money', num: true },
    ],
    fields: [
      { name: 'name', label: 'Customer name', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'total', label: 'Total', type: 'money', help: 'What the customer will be invoiced.' },
      { name: 'discount', label: 'Discount', type: 'money' },
      { name: 'shipping', label: 'Shipping', type: 'money' },
      { name: 'status', label: 'Status', type: 'select', options: ['open', 'invoiced', 'completed'], default: 'open' },
      { name: 'note', label: 'Note', type: 'textarea' },
    ],
    empty: { title: 'Manually create orders and invoices', text: 'Use draft orders to take orders over the phone, email invoices to customers, and collect payments.', cta: 'Create draft order' },
    learn: 'creating draft orders',
  },
  'orders/abandoned': {
    table: 'abandoned_checkouts', title: 'Abandoned checkouts', singular: 'abandoned checkout', icon: 'cart', order: ['created_at', false], readonly: true,
    columns: [
      { key: 'created_at', label: 'Date', type: 'datetime' },
      { key: 'email', label: 'Customer', type: 'text' },
      { key: 'recovered', label: 'Recovery status', type: 'badge', map: { true: 'ok', false: 'warn' }, labels: { true: 'Recovered', false: 'Not recovered' } },
      { key: 'total', label: 'Total', type: 'money', num: true },
    ],
    empty: { title: 'Abandoned checkouts will show here', text: 'See when customers put an item in their cart but don’t check out. Stripe reports them when a checkout session expires.' },
    learn: 'abandoned checkouts',
  },
  'products/collections': {
    table: 'collections', title: 'Collections', singular: 'collection', icon: 'layers', order: ['created_at', true],
    columns: [
      { key: 'title', label: 'Title', type: 'text', bold: true },
      { key: 'product_slugs', label: 'Products', type: 'count', smart: 'kind' },
      { key: 'kind', label: 'Conditions', type: 'text' },
      { key: 'published', label: 'Status', type: 'badge', map: { true: 'ok', false: '' }, labels: { true: 'Active', false: 'Draft' } },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'handle', label: 'URL handle', type: 'text', help: 'Leave blank to generate from the title.' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'kind', label: 'Type', type: 'select', options: ['manual', 'smart'], default: 'manual' },
      { name: 'rule', label: 'Smart rule', type: 'text', help: 'Smart collections include every product in this category or with this tag, for example serum.' },
      { name: 'product_slugs', label: 'Products', type: 'tags', help: 'Comma-separated product slugs for a manual collection.' },
      { name: 'published', label: 'Active', type: 'bool', default: true },
    ],
    empty: { title: 'Group your products', text: 'Collections organize products so customers find them faster.', cta: 'Add collection' },
    learn: 'collections', slugFrom: 'title',
  },
  'products/purchase-orders': {
    table: 'purchase_orders', title: 'Purchase orders', singular: 'purchase order', icon: 'clipboard', order: ['created_at', false],
    columns: [
      { key: 'number', label: 'Purchase order', type: 'text', prefix: '#PO', bold: true },
      { key: 'supplier', label: 'Supplier', type: 'text' },
      { key: 'status', label: 'Status', type: 'badge', map: DONE },
      { key: 'expected_at', label: 'Expected arrival', type: 'date' },
    ],
    fields: [
      { name: 'supplier', label: 'Supplier', type: 'text', required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['draft', 'ordered', 'received', 'cancelled'], default: 'draft' },
      { name: 'expected_at', label: 'Expected arrival', type: 'date' },
      { name: 'note', label: 'Note', type: 'textarea' },
    ],
    empty: { title: 'Manage your purchase orders', text: 'Track inventory you’ve ordered from suppliers, such as Supliful, and receive it into stock.', cta: 'Create purchase order' },
    learn: 'purchase orders',
  },
  'products/transfers': {
    table: 'transfers', title: 'Transfers', singular: 'transfer', icon: 'swap', order: ['created_at', false],
    columns: [
      { key: 'number', label: 'Transfer', type: 'text', prefix: '#T', bold: true },
      { key: 'from_location', label: 'Origin', type: 'text' },
      { key: 'to_location', label: 'Destination', type: 'text' },
      { key: 'status', label: 'Status', type: 'badge', map: DONE },
    ],
    fields: [
      { name: 'from_location', label: 'Origin', type: 'text' },
      { name: 'to_location', label: 'Destination', type: 'text' },
      { name: 'status', label: 'Status', type: 'select', options: ['draft', 'in_transit', 'received'], default: 'draft' },
      { name: 'note', label: 'Note', type: 'textarea' },
    ],
    empty: { title: 'Move inventory between locations', text: 'Move and track inventory between your business locations.', cta: 'Create transfer' },
    learn: 'transfers',
  },
  'products/gift-cards': {
    table: 'gift_cards', title: 'Gift cards', singular: 'gift card', icon: 'gift', order: ['created_at', false],
    columns: [
      { key: 'code', label: 'Code', type: 'text', bold: true },
      { key: 'email', label: 'Recipient', type: 'text' },
      { key: 'initial_value', label: 'Initial value', type: 'money', num: true },
      { key: 'balance', label: 'Balance', type: 'money', num: true },
      { key: 'active', label: 'Status', type: 'badge', map: { true: 'ok', false: 'danger' }, labels: { true: 'Enabled', false: 'Disabled' } },
    ],
    fields: [
      { name: 'code', label: 'Gift card code', type: 'text', generate: 'gift', help: 'Leave blank to generate a code.' },
      { name: 'initial_value', label: 'Initial value', type: 'money', required: true },
      { name: 'email', label: 'Recipient email', type: 'email' },
      { name: 'expires_at', label: 'Expires', type: 'date' },
      { name: 'note', label: 'Note', type: 'textarea' },
      { name: 'active', label: 'Enabled', type: 'bool', default: true },
    ],
    balanceFromInitial: true,
    empty: { title: 'Start selling gift cards', text: 'Create gift cards to sell or send directly to your customers.', cta: 'Create gift card' },
    learn: 'gift cards',
  },
  'customers/segments': {
    table: 'segments', title: 'Segments', singular: 'segment', icon: 'users', order: ['created_at', true],
    columns: [
      { key: 'name', label: 'Name', type: 'text', bold: true },
      { key: 'rule', label: 'Rule', type: 'text' },
      { key: 'created_at', label: 'Created', type: 'date' },
    ],
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'rule', label: 'Who is in this segment', type: 'select', options: ['all', 'purchased', 'repeat', 'never', 'subscribed', 'abandoned_30'], default: 'all' },
    ],
    empty: { title: 'Segment your customers', text: 'Group customers by what they do, then email or discount them.', cta: 'Create segment' },
    learn: 'segments',
  },
  'customers/companies': {
    table: 'companies', title: 'Companies', singular: 'company', icon: 'building', order: ['created_at', false],
    columns: [
      { key: 'name', label: 'Company', type: 'text', bold: true },
      { key: 'contact_name', label: 'Contact', type: 'text' },
      { key: 'payment_terms', label: 'Payment terms', type: 'text' },
      { key: 'discount_percent', label: 'Discount', type: 'number', suffix: '%' },
    ],
    fields: [
      { name: 'name', label: 'Company name', type: 'text', required: true },
      { name: 'contact_name', label: 'Main contact', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Phone', type: 'tel' },
      { name: 'tax_id', label: 'Tax ID / EIN', type: 'text' },
      { name: 'payment_terms', label: 'Payment terms', type: 'select', options: ['Due on receipt', 'Net 15', 'Net 30', 'Net 60'], default: 'Due on receipt' },
      { name: 'discount_percent', label: 'Wholesale discount (%)', type: 'number', default: 0 },
      { name: 'address', label: 'Address', type: 'textarea' },
      { name: 'tags', label: 'Tags', type: 'tags' },
      { name: 'note', label: 'Note', type: 'textarea' },
    ],
    empty: { title: 'Bring the power of customization to your B2B business', text: 'Everything you need for B2B in one place. Get started by adding a company and assigning custom pricing, net payment terms, and permissions for multiple locations and buyers.', cta: 'Add company' },
    learn: 'companies',
  },
  'content/menus': {
    table: 'menus', title: 'Menus', singular: 'menu', icon: 'menu', order: ['created_at', true],
    columns: [{ key: 'title', label: 'Title', type: 'text', bold: true }, { key: 'handle', label: 'Handle', type: 'text' }, { key: 'items', label: 'Items', type: 'lines' }],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'handle', label: 'Handle', type: 'text' },
      { name: 'items', label: 'Menu items', type: 'lines', help: 'One per line, as: Label | /url' },
    ],
    empty: { title: 'Build your navigation', text: 'Menus control the links in your header and footer.', cta: 'Add menu' },
    learn: 'menus', slugFrom: 'title',
  },
  'content/blog-posts': {
    table: 'blog_posts', title: 'Blog posts', singular: 'blog post', icon: 'content', order: ['created_at', false],
    columns: [
      { key: 'title', label: 'Title', type: 'text', bold: true },
      { key: 'author', label: 'Author', type: 'text' },
      { key: 'published', label: 'Visibility', type: 'badge', map: { true: 'ok', false: '' }, labels: { true: 'Visible', false: 'Hidden' } },
      { key: 'created_at', label: 'Date', type: 'date' },
    ],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'handle', label: 'URL handle', type: 'text' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'body', label: 'Content', type: 'textarea', rows: 14 },
      { name: 'author', label: 'Author', type: 'text', default: 'The J Effect' },
      { name: 'published', label: 'Visible', type: 'bool', default: false },
    ],
    empty: { title: 'Publish your first blog post', text: 'Tell your story and share skincare rituals with your customers.', cta: 'Add blog post' },
    learn: 'blog posts', slugFrom: 'title', publishDate: true,
  },
  'content/metaobjects': {
    table: 'metaobject_definitions', title: 'Metaobjects', singular: 'definition', icon: 'database', order: ['created_at', true],
    columns: [{ key: 'name', label: 'Name', type: 'text', bold: true }, { key: 'type', label: 'Type', type: 'text' }, { key: 'fields', label: 'Fields', type: 'lines' }],
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'type', label: 'Type handle', type: 'text', help: 'For example: knowledge_base_fact' },
      { name: 'fields', label: 'Fields', type: 'lines', help: 'One field name per line.' },
    ],
    empty: { title: 'No definitions found', text: 'Define custom content types such as ingredient glossaries, FAQs or press mentions.', cta: 'Add definition' },
    learn: 'metaobjects', slugFrom: 'name', slugField: 'type',
  },
  'content/files': {
    table: 'files', title: 'Files', singular: 'file', icon: 'image', order: ['created_at', false],
    columns: [{ key: 'name', label: 'File name', type: 'text', bold: true }, { key: 'url', label: 'URL', type: 'text' }, { key: 'created_at', label: 'Added', type: 'date' }],
    fields: [
      { name: 'name', label: 'File name', type: 'text', required: true },
      { name: 'url', label: 'File URL', type: 'url', required: true, help: 'Paste the address of an uploaded image, PDF or video.' },
      { name: 'alt', label: 'Alt text', type: 'text' },
    ],
    empty: { title: 'Upload and manage your files', text: 'Keep logos, lookbooks and downloads in one place.', cta: 'Add file' },
    learn: 'files', pathFromUrl: true,
  },
  'markets': {
    table: 'markets', title: 'Markets', singular: 'market', icon: 'globe', order: ['created_at', true],
    columns: [
      { key: 'name', label: 'Market', type: 'text', bold: true },
      { key: 'active', label: 'Status', type: 'badge', map: { true: 'ok', false: '' }, labels: { true: 'Active', false: 'Draft' } },
      { key: 'regions', label: 'Includes', type: 'text' },
      { key: 'currency', label: 'Currency', type: 'text' },
    ],
    fields: [
      { name: 'name', label: 'Market name', type: 'text', required: true },
      { name: 'regions', label: 'Countries and regions', type: 'text' },
      { name: 'currency', label: 'Currency', type: 'select', options: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'], default: 'USD' },
      { name: 'active', label: 'Active', type: 'bool', default: true },
    ],
    empty: { title: 'Sell in more markets', text: 'Create a market for each country or region you sell to.', cta: 'Create market' },
    learn: 'markets',
  },
  'markets/catalogs': {
    table: 'catalogs', title: 'Catalogs', singular: 'catalog', icon: 'layers', order: ['created_at', false],
    columns: [{ key: 'name', label: 'Catalog', type: 'text', bold: true }, { key: 'market', label: 'Market', type: 'text' }, { key: 'price_adjust', label: 'Price adjustment', type: 'number', suffix: '%' }, { key: 'active', label: 'Status', type: 'badge', map: { true: 'ok', false: '' }, labels: { true: 'Active', false: 'Draft' } }],
    fields: [
      { name: 'name', label: 'Catalog name', type: 'text', required: true },
      { name: 'market', label: 'Market', type: 'text' },
      { name: 'price_adjust', label: 'Price adjustment (%)', type: 'number', default: 0, help: 'Negative numbers discount prices.' },
      { name: 'collection_handle', label: 'Collection handle', type: 'text' },
      { name: 'active', label: 'Active', type: 'bool', default: true },
    ],
    empty: { title: 'Personalize buying with catalogs', text: 'Create custom product and pricing offerings for your customers with catalogs.', cta: 'Create catalog' },
    learn: 'catalogs',
  },
  'markets/rollouts': {
    table: 'rollouts', title: 'Rollouts', singular: 'rollout', icon: 'clipboard', order: ['scheduled_at', true],
    columns: [{ key: 'title', label: 'Rollout', type: 'text', bold: true }, { key: 'scheduled_at', label: 'Scheduled', type: 'datetime' }, { key: 'status', label: 'Status', type: 'badge', map: DONE }],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'scheduled_at', label: 'Go live', type: 'datetime' },
      { name: 'summary', label: 'What changes', type: 'textarea' },
      { name: 'status', label: 'Status', type: 'select', options: ['scheduled', 'live', 'cancelled'], default: 'scheduled' },
    ],
    empty: { title: 'Schedule changes to your store', text: 'Prepare changes to themes, discounts, catalogs, and checkout for upcoming launches, temporary events, or A/B tests.', cta: 'Create rollout' },
    learn: 'rollouts',
  },
  'online-store/pages': {
    table: 'pages', title: 'Pages', singular: 'page', icon: 'doc', order: ['created_at', false],
    columns: [{ key: 'title', label: 'Title', type: 'text', bold: true }, { key: 'published', label: 'Visibility', type: 'badge', map: { true: 'ok', false: '' }, labels: { true: 'Visible', false: 'Hidden' } }, { key: 'body', label: 'Content', type: 'excerpt' }, { key: 'updated_at', label: 'Updated', type: 'date' }],
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'handle', label: 'URL handle', type: 'text', help: 'The page appears at /pages/<handle>.' },
      { name: 'body', label: 'Content', type: 'textarea', rows: 14 },
      { name: 'published', label: 'Visible', type: 'bool', default: true },
    ],
    empty: { title: 'Add your first page', text: 'Pages hold content like About, Shipping and Contact.', cta: 'Add page' },
    learn: 'pages', slugFrom: 'title', touchUpdated: true, storefront: (r) => `/pages/${r.handle}`,
  },
  'settings/metafields': {
    table: 'metafield_definitions', title: 'Metafields and metaobjects', singular: 'metafield definition', icon: 'database', order: ['created_at', true], settings: true,
    columns: [{ key: 'resource', label: 'Applies to', type: 'text', bold: true }, { key: 'name', label: 'Name', type: 'text' }, { key: 'key', label: 'Namespace and key', type: 'text' }, { key: 'type', label: 'Type', type: 'text' }],
    fields: [
      { name: 'resource', label: 'Applies to', type: 'select', options: ['Products', 'Variants', 'Collections', 'Customers', 'Orders', 'Draft orders', 'Companies', 'Locations', 'Pages', 'Blog posts', 'Shop'], default: 'Products' },
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'key', label: 'Namespace and key', type: 'text', help: 'For example: custom.shelf_life', placeholder: 'custom.my_field' },
      { name: 'type', label: 'Type', type: 'select', options: ['Single line text', 'Multi-line text', 'Rich text', 'Integer', 'Decimal', 'Boolean', 'Date', 'Date and time', 'URL', 'Color', 'File'], default: 'Single line text' },
      { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
    ],
    empty: { title: 'Add custom data to your store', text: 'Metafield definitions describe extra fields you can attach to products, customers, orders and more. Add the ones you need.', cta: 'Add definition' },
    learn: 'metafields',
  },
  'settings/locations': {
    table: 'locations', title: 'Locations', singular: 'location', icon: 'pin', order: ['created_at', true], settings: true,
    columns: [{ key: 'name', label: 'Location', type: 'text', bold: true }, { key: 'address', label: 'Address', type: 'text' }, { key: 'active', label: 'Status', type: 'badge', map: { true: 'ok', false: '' }, labels: { true: 'Active', false: 'Inactive' } }, { key: 'pos', label: 'Point of Sale', type: 'bool' }],
    fields: [
      { name: 'name', label: 'Location name', type: 'text', required: true },
      { name: 'address', label: 'Address', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'region', label: 'State / region', type: 'text' },
      { name: 'postal', label: 'ZIP / postal code', type: 'text' },
      { name: 'country', label: 'Country', type: 'text', default: 'United States' },
      { name: 'active', label: 'Active', type: 'bool', default: true },
      { name: 'pos', label: 'Fulfill and sell with Point of Sale', type: 'bool', default: false },
    ],
    empty: { title: 'Add a location', text: 'Locations are where you stock inventory and sell in person.', cta: 'Add location' },
    learn: 'locations',
  },
};

// Settings pages that store a small JSON document in site_settings (key = page slug).
export const SETTINGS_FORMS = {
  general: {
    title: 'General', icon: 'store', sections: [
      { title: 'Store details', sub: 'Business entity used for financial products, markets, apps, and taxes.', fields: [
        { name: 'store_name', label: 'Store name', type: 'text', default: 'The J Effect' },
        { name: 'legal_name', label: 'Legal business name', type: 'text', default: 'The J Effect' },
        { name: 'email', label: 'Store contact email', type: 'email', default: 'info@thejeffect.com' },
        { name: 'phone', label: 'Phone', type: 'tel' },
      ] },
      { title: 'Store address', sub: 'Shown on invoices and used as the shipping origin.', fields: [
        { name: 'address', label: 'Address', type: 'text', default: '1600 Vine St' },
        { name: 'city', label: 'City', type: 'text', default: 'Los Angeles' },
        { name: 'region', label: 'State', type: 'text', default: 'CA' },
        { name: 'postal', label: 'ZIP', type: 'text', default: '90028' },
        { name: 'country', label: 'Country', type: 'text', default: 'United States' },
      ] },
      { title: 'Store defaults', fields: [
        { name: 'currency', label: 'Currency display', type: 'select', options: ['USD', 'EUR', 'GBP', 'CAD'], default: 'USD' },
        { name: 'unit_system', label: 'Unit system', type: 'select', options: ['Imperial system', 'Metric system'], default: 'Imperial system' },
        { name: 'weight_unit', label: 'Default weight unit', type: 'select', options: ['Ounce (oz)', 'Pound (lb)', 'Gram (g)', 'Kilogram (kg)'], default: 'Ounce (oz)' },
        { name: 'timezone', label: 'Time zone', type: 'select', options: ['(GMT-08:00) Pacific Time (US & Canada)', '(GMT-05:00) Eastern Time (US & Canada)', '(GMT+00:00) London', '(GMT+01:00) Paris'], default: '(GMT-08:00) Pacific Time (US & Canada)' },
      ] },
    ],
  },
  checkout: {
    title: 'Checkout', icon: 'cart', sections: [
      { title: 'Customer contact method', sub: 'How customers enter their contact details at checkout.', fields: [
        { name: 'contact', label: 'Contact method', type: 'select', options: ['Email', 'Phone number or email'], default: 'Email' },
      ] },
      { title: 'Customer information', fields: [
        { name: 'full_name', label: 'Full name', type: 'select', options: ['Only require last name', 'Require first and last name'], default: 'Require first and last name' },
        { name: 'company', label: 'Company name', type: 'select', options: ["Don't include", 'Optional', 'Required'], default: "Don't include" },
        { name: 'address2', label: 'Address line 2', type: 'select', options: ["Don't include", 'Optional', 'Required'], default: 'Optional' },
        { name: 'phone', label: 'Shipping address phone number', type: 'select', options: ["Don't include", 'Optional', 'Required'], default: "Don't include" },
      ] },
      { title: 'Marketing', fields: [
        { name: 'marketing_optin', label: 'Show a marketing opt-in checkbox', type: 'bool', default: true },
        { name: 'promo_codes', label: 'Allow promotion codes at checkout', type: 'bool', default: true },
        { name: 'free_shipping_threshold', label: 'Free standard shipping over', type: 'money', default: 5000 },
      ] },
    ],
  },
  'customer-accounts': {
    title: 'Customer accounts', icon: 'users', sections: [
      { title: 'Sign-in links', fields: [{ name: 'show_links', label: 'Show sign-in links in the header and at checkout', type: 'bool', default: false }] },
      { title: 'Customer accounts', fields: [
        { name: 'self_serve_returns', label: 'Self-serve returns and cancellations', type: 'bool', default: false },
        { name: 'store_credit', label: 'Store credit: let customers see and spend store credit', type: 'bool', default: true },
      ] },
    ],
  },
  shipping: {
    title: 'Shipping and delivery', icon: 'truck', sections: [
      { title: 'Shipping rates', sub: 'Used by checkout. Amounts are in dollars.', fields: [
        { name: 'free_threshold', label: 'Free standard shipping over', type: 'money', default: 5000 },
        { name: 'standard', label: 'Standard shipping rate', type: 'money', default: 595 },
        { name: 'expedited', label: 'Expedited shipping rate', type: 'money', default: 1295 },
        { name: 'overnight', label: 'Overnight shipping rate', type: 'money', default: 2495 },
      ] },
      { title: 'Delivery methods', fields: [
        { name: 'local_delivery', label: 'Local delivery', type: 'bool', default: false },
        { name: 'pickup', label: 'Pickup in store', type: 'bool', default: false },
      ] },
    ],
  },
  taxes: {
    title: 'Taxes and duties', icon: 'percent', sections: [
      { title: 'Tax service', sub: 'Stripe Tax calculates sales tax at checkout once it is enabled in your Stripe account.', fields: [
        { name: 'stripe_tax', label: 'Collect sales tax with Stripe Tax', type: 'bool', default: false },
        { name: 'prices_include_tax', label: 'Prices include tax', type: 'bool', default: false },
      ] },
      { title: 'Tax regions', fields: [{ name: 'regions', label: 'Regions where you collect tax', type: 'lines', default: 'California' }] },
    ],
  },
  domains: {
    title: 'Domains', icon: 'globe', sections: [
      { title: 'Primary domain', sub: 'Domains are connected in Vercel. This is shown for reference.', fields: [
        { name: 'primary', label: 'Primary domain', type: 'text', default: 'www.thejeffect.com' },
        { name: 'redirect', label: 'Redirect thejeffect.com to the primary domain', type: 'bool', default: true },
      ] },
    ],
  },
  notifications: {
    title: 'Notifications', icon: 'bell', sections: [
      { title: 'Sender email', sub: 'The email your store uses to send and receive emails from your customers.', fields: [
        { name: 'sender', label: 'Sender email', type: 'email', default: 'hello@thejeffect.com' },
        { name: 'reply_to', label: 'Reply-to', type: 'email', default: 'hello@thejeffect.com' },
      ] },
      { title: 'Staff notifications', fields: [
        { name: 'new_order_to', label: 'Send new order emails to', type: 'email', default: 'info@thejeffect.com' },
        { name: 'notify_new_order', label: 'New order', type: 'bool', default: true },
        { name: 'notify_low_stock', label: 'Low stock', type: 'bool', default: true },
      ] },
      { title: 'Webhooks', sub: 'Send JSON notifications about store events to a URL.', fields: [{ name: 'webhook_url', label: 'Webhook URL', type: 'url' }] },
    ],
  },
  languages: {
    title: 'Languages', icon: 'lang', sections: [{ title: 'Store languages', sub: 'The storefront is currently in English.', fields: [{ name: 'default', label: 'Default language', type: 'select', options: ['English'], default: 'English' }] }],
  },
  privacy: {
    title: 'Customer privacy', icon: 'shield', sections: [
      { title: 'Privacy settings', fields: [
        { name: 'cookie_banner', label: 'Cookie banner', type: 'bool', default: false },
        { name: 'data_sharing_page', label: 'Data sharing opt-out page', type: 'bool', default: true },
      ] },
      { title: 'Marketing settings', fields: [
        { name: 'email_marketing_checkout', label: 'Email marketing in checkout', type: 'bool', default: true },
        { name: 'double_opt_in', label: 'Double opt-in for marketing', type: 'bool', default: false },
      ] },
      { title: 'Data storage hosting location', fields: [{ name: 'region', label: 'Region', type: 'select', options: ['United States'], default: 'United States' }] },
    ],
  },
  policies: {
    title: 'Policies', icon: 'doc', sections: [
      { title: 'Return and cancellation rules', fields: [{ name: 'returns_days', label: 'Return window (days)', type: 'number', default: 30 }] },
      { title: 'Written policies', sub: 'Shown in the footer and at checkout.', fields: [
        { name: 'refund_policy', label: 'Return and refund policy', type: 'textarea', rows: 6 },
        { name: 'shipping_policy', label: 'Shipping policy', type: 'textarea', rows: 6 },
        { name: 'contact_info', label: 'Contact information', type: 'textarea', rows: 3, default: 'The J Effect, 1600 Vine St, Los Angeles, CA 90028 · info@thejeffect.com' },
      ] },
    ],
  },
  'customer-events': {
    title: 'Customer events', icon: 'code', sections: [{ title: 'Pixels', sub: 'Add tracking IDs. Vercel Analytics is already installed.', fields: [
      { name: 'meta_pixel', label: 'Meta (Facebook) pixel ID', type: 'text' },
      { name: 'tiktok_pixel', label: 'TikTok pixel ID', type: 'text' },
      { name: 'ga4', label: 'Google Analytics 4 measurement ID', type: 'text' },
    ] }],
  },
  payments: {
    title: 'Payments', icon: 'card', sections: [{ title: 'Stripe', sub: 'Payments are processed by Stripe. The connection is managed in Vercel.', fields: [
      { name: 'statement_descriptor', label: 'Statement descriptor', type: 'text', default: 'THE J EFFECT', help: 'Appears on customer card statements.' },
    ] }],
  },
  plan: {
    title: 'Plan', icon: 'plan', sections: [{ title: 'Plan details', sub: 'Managed by Artemis Gaia.', fields: [
      { name: 'plan', label: 'Plan', type: 'text', default: 'Custom' },
      { name: 'price', label: 'Price per month', type: 'money', default: 7500 },
      { name: 'cycle', label: 'Billing cycle', type: 'select', options: ['Monthly', 'Yearly'], default: 'Monthly' },
    ] }],
  },
  billing: {
    title: 'Billing', icon: 'receipt', sections: [{ title: 'Billing', sub: 'Invoices for the Custom plan ($75 per month) are sent to this address.', fields: [
      { name: 'billing_email', label: 'Billing email', type: 'email', default: 'sales@artemisgaia.co' },
    ] }],
  },
  'sales-channels': {
    title: 'Sales channels', icon: 'store', sections: [{ title: 'Installed channels', fields: [
      { name: 'online_store', label: 'Online Store', type: 'bool', default: true },
      { name: 'pos', label: 'Point of Sale', type: 'bool', default: true },
    ] }],
  },
  apps: {
    title: 'Apps', icon: 'plug', sections: [{ title: 'Connected services', sub: 'Keys are stored in Vercel environment variables.', fields: [] }],
  },
};

SETTINGS_FORMS.preferences = {
  title: 'Preferences', icon: 'store', sections: [
    { title: 'Title and meta description', sub: 'Shown in search results and when the home page is shared.', fields: [
      { name: 'home_title', label: 'Home page title', type: 'text', default: 'The J Effect | Mindful Skincare Rituals' },
      { name: 'home_description', label: 'Meta description', type: 'textarea', rows: 3 },
    ] },
    { title: 'Social sharing image', fields: [{ name: 'social_image', label: 'Image URL (1200 × 628)', type: 'url' }] },
    { title: 'Store access', sub: 'Password protection is managed in Vercel (Deployment Protection) while the store is in development.', fields: [] },
  ],
};

export const SETTINGS_ALIASES = { 'online-store/preferences': 'preferences' };

export function resourceFor(parts) {
  const key = parts.join('/');
  return RESOURCES[key] ? { key, res: RESOURCES[key] } : null;
}
