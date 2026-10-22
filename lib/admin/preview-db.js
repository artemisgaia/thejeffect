import 'server-only';
import { HISTORY } from './history';

// ──────────────────────────────────────────────────────────────
// LOCAL PREVIEW ONLY. Enabled with ADMIN_PREVIEW=1 and refused whenever
// NODE_ENV is "production", so it can never run on Vercel. It gives the
// admin a small in-memory database with demo rows so every screen can be
// tested without a real Supabase login.
// ──────────────────────────────────────────────────────────────

export const previewEnabled = process.env.ADMIN_PREVIEW === '1' && process.env.NODE_ENV !== 'production';

const day = 86400000;
const iso = (offsetDays, hour = 12) => new Date(Date.now() - offsetDays * day + (hour - 12) * 3600000).toISOString();
let uid = 0;
const id = () => `00000000-0000-4000-8000-${String(++uid).padStart(12, '0')}`;

const ITEMS = [
  { slug: 'vitamin-c-brightening-serum', name: 'Golden Hour', price: 3800, image: '/products/vitamin-c-brightening-serum/vitamin-c-brightening-serum-hero.webp' },
  { slug: 'hyaluronic-acid-serum', name: 'Aqua Lock', price: 3800, image: '/products/hyaluronic-acid-serum/hyaluronic-acid-serum-hero.webp' },
  { slug: 'charcoal-facial-cleanser', name: 'Pure Slate', price: 2600, image: '/products/charcoal-facial-cleanser/charcoal-facial-cleanser-hero.webp' },
  { slug: 'tallow-cream-orange-bergamot', name: 'Citrus Grove', price: 3600, image: '/products/tallow-cream-orange-bergamot/tallow-cream-orange-bergamot-hero.webp' },
  { slug: 'collagen-night-cream', name: 'Moonlit', price: 4200, image: '/products/collagen-night-cream/collagen-night-cream-hero.webp' },
];
const line = (i, q) => ({ ...ITEMS[i % ITEMS.length], quantity: q });

function seed() {
  const customers = [
    ['Maya Collins', 'maya.collins@example.com', 3, 15200], ['Jordan Lee', 'jordan.lee@example.com', 1, 6400],
    ['Priya Nair', 'priya.nair@example.com', 2, 11800], ['Sofia Alvarez', 'sofia@example.com', 1, 3800],
    ['Daniel Brooks', 'dbrooks@example.com', 0, 0],
  ].map(([name, email, n, spent], i) => ({
    id: id(), email, name, phone: null, address: { city: 'Los Angeles', region: 'CA', country: 'United States' },
    marketing: i % 2 === 0, tags: i === 0 ? ['vip'] : [], note: null, orders_count: n, total_spent: spent,
    last_order_at: n ? iso(i * 2 + 1) : null, created_at: iso(30 - i * 4),
  }));
  const orders = [
    [1, 0, [line(0, 2), line(2, 1)]], [2, 1, [line(1, 1)]], [3, 2, [line(3, 1), line(4, 1)]], [4, 0, [line(2, 3)]],
    [5, 3, [line(0, 1)]], [6, 2, [line(4, 2)]], [7, 0, [line(1, 2), line(3, 1)]],
  ].map(([n, c, items], i) => {
    const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
    const shipping = subtotal >= 5000 ? 0 : 595;
    return {
      id: id(), number: 1000 + n, source: 'online', stripe_session_id: `cs_demo_${n}`, customer_id: customers[c].id,
      email: customers[c].email, name: customers[c].name, status: i === 5 ? 'refunded' : 'paid',
      fulfillment: i < 4 ? 'fulfilled' : 'unfulfilled', currency: 'usd', subtotal, shipping, discount: i === 2 ? 500 : 0, tax: 0,
      total: subtotal + shipping - (i === 2 ? 500 : 0), refunded: i === 5 ? subtotal : 0, items,
      shipping_address: { line1: '1600 Vine St', city: 'Los Angeles', region: 'CA', postal: '90028', country: 'US' },
      shipping_method: shipping ? 'Standard' : 'Free standard', discount_code: i === 2 ? 'WELCOME5' : null,
      note: null, tags: [], tracking: i < 4 ? { carrier: 'USPS', number: '940011189922', url: '' } : null,
      fulfilled_at: i < 4 ? iso(i * 1.5) : null, created_at: iso(i * 1.1, 10 + i),
    };
  });
  const events = [];
  for (let d = 0; d < 8; d++) {
    for (let s = 0; s < 14 - d; s++) {
      const sid = `s${d}-${s}`;
      const device = ['mobile', 'mobile', 'desktop', 'tablet'][s % 4];
      const source = ['google', 'instagram', 'direct', 'tiktok', 'direct'][s % 5];
      const paths = ['/', '/shop', '/shop/vitamin-c-brightening-serum', '/about'].slice(0, 1 + (s % 4));
      paths.forEach((p) => events.push({ id: events.length + 1, session_id: sid, kind: 'pageview', path: p, referrer: null, source, device, product: null, created_at: iso(d, 9 + (s % 10)) }));
      if (s % 4 === 0) events.push({ id: events.length + 1, session_id: sid, kind: 'add_to_cart', path: '/shop', source, device, product: 'vitamin-c-brightening-serum', created_at: iso(d, 10) });
    }
  }
  for (let s = 0; s < 3; s++) events.push({ id: events.length + 1, session_id: `live${s}`, kind: 'pageview', path: '/shop', source: 'direct', device: 'mobile', created_at: new Date(Date.now() - s * 60000).toISOString() });

  return {
    customers, orders, site_events: events,
    draft_orders: [{ id: id(), number: 1, email: 'wholesale@example.com', name: 'Studio Pearl', items: [line(0, 6)], note: 'Opening order', discount: 0, shipping: 0, total: 22800, status: 'open', payment_url: null, created_at: iso(1) }],
    abandoned_checkouts: [{ id: id(), stripe_session_id: 'cs_ab_1', email: 'daniel.b@example.com', items: [line(4, 1)], total: 4200, recovery_url: 'https://example.com', recovered: false, created_at: iso(2) }],
    discounts: [
      { id: id(), code: 'WELCOME5', title: 'Welcome $5', kind: 'fixed', value: 500, min_subtotal: 3000, usage_limit: 500, used: 12, starts_at: null, ends_at: null, active: true, stripe_coupon_id: null, stripe_promo_id: null, created_at: iso(14) },
      { id: id(), code: 'RITUAL15', title: '15% off the ritual', kind: 'percent', value: 15, min_subtotal: 0, usage_limit: null, used: 4, starts_at: null, ends_at: iso(-20), active: true, stripe_coupon_id: null, stripe_promo_id: null, created_at: iso(6) },
    ],
    gift_cards: [{ id: id(), code: 'GIFT-7QK2-M9PD', initial_value: 5000, balance: 5000, email: 'jordan.lee@example.com', note: 'Birthday', expires_at: null, active: true, created_at: iso(5) }],
    collections: [
      { id: id(), title: 'Home page', handle: 'frontpage', description: 'Featured on the homepage', kind: 'manual', rule: null, product_slugs: ['hyaluronic-acid-serum', 'vitamin-c-brightening-serum', 'niacinamide-10-serum', 'collagen-night-cream'], published: true, created_at: iso(40) },
      { id: id(), title: 'Serums', handle: 'serums', description: null, kind: 'smart', rule: 'serum', product_slugs: [], published: true, created_at: iso(40) },
    ],
    locations: [
      { id: id(), name: 'United States', address: '1600 Vine St', city: 'Los Angeles', region: 'CA', postal: '90028', country: 'United States', active: true, pos: true, created_at: iso(60) },
      { id: id(), name: 'Europe', address: null, city: null, region: null, postal: null, country: 'Europe', active: true, pos: false, created_at: iso(59) },
    ],
    metafield_definitions: [],
    history_months: HISTORY.map((h, i) => ({ id: id(), label: h.period, period_start: `2026-${String(i + 1).padStart(2, '0')}-01`, revenue: h.revenue * 100, profit: h.profit * 100, expenses: h.expenses * 100, orders: null, fulfilled: null, returning_customers: null, new_customers: null, created_at: iso(60) })),
    inventory: [
      { slug: 'vitamin-c-brightening-serum', quantity: 42, track: true, sku: 'JE-006', barcode: null, allow_backorder: false, updated_at: iso(1) },
      { slug: 'hyaluronic-acid-serum', quantity: 0, track: true, sku: 'JE-005', barcode: null, allow_backorder: false, updated_at: iso(1) },
      { slug: 'charcoal-facial-cleanser', quantity: 18, track: true, sku: 'JE-002', barcode: null, allow_backorder: false, updated_at: iso(1) },
    ],
    purchase_orders: [{ id: id(), number: 1, supplier: 'Supliful', status: 'ordered', expected_at: iso(-7).slice(0, 10), items: [{ slug: 'vitamin-c-brightening-serum', quantity: 100, cost: 900 }], note: null, created_at: iso(3) }],
    transfers: [],
    segments: [
      ['Customers who have purchased at least once', 'purchased'], ['Email subscribers', 'subscribed'], ['Abandoned checkouts in the last 30 days', 'abandoned_30'],
      ['Customers who have purchased more than once', 'repeat'], ["Customers who haven't purchased", 'never'],
    ].map(([name, rule]) => ({ id: id(), name, rule, created_at: iso(60) })),
    companies: [{ id: id(), name: 'Studio Pearl', contact_name: 'Ana Pearl', email: 'wholesale@example.com', phone: null, tax_id: null, payment_terms: 'Net 30', discount_percent: 20, address: '88 Melrose Ave, Los Angeles', note: null, tags: ['wholesale'], created_at: iso(8) }],
    markets: [{ id: id(), name: 'United States', regions: 'United States', currency: 'USD', active: true, primary_market: true, created_at: iso(60) }],
    catalogs: ['All products', 'Serums', 'Moisturizers', 'Cleansers', 'Face oils', 'Eye care', 'Treatments', 'Masks', 'Body', 'Ritual bars', 'Hair and scalp'].map((name, i) => ({ id: id(), name, market: 'United States', price_adjust: 0, collection_handle: i ? name.toLowerCase().replace(/ /g, '-') : null, active: true, created_at: iso(60) })),
    rollouts: [],
    pages: [
      { id: id(), title: 'Contact', handle: 'contact', body: 'Write to hello@thejeffect.com', published: true, updated_at: iso(20), created_at: iso(60) },
      { id: id(), title: 'Your Privacy Choices', handle: 'privacy-choices', body: '', published: true, updated_at: iso(0), created_at: iso(0) },
    ],
    blog_posts: [{ id: id(), title: 'Your 3-step morning ritual', handle: 'three-step-morning-ritual', excerpt: 'The right routine...', body: '...', author: 'The J Effect', published: true, published_at: iso(30), created_at: iso(30) }],
    menus: [
      { id: id(), title: 'Main menu', handle: 'main-menu', items: 'Shop | /shop\nRitual Guide | /ritual-guide\nJournal | /journal\nAbout | /about\nContact | /contact', created_at: iso(60) },
      { id: id(), title: 'Footer menu', handle: 'footer', items: 'Shipping & Returns | /shipping\nPrivacy | /privacy\nTerms | /terms', created_at: iso(60) },
    ],
    metaobject_definitions: [], metaobjects: [], files: [],
    subscribers: [
      { id: id(), email: 'maya.collins@example.com', status: 'subscribed', source: 'home', resend_contact_id: null, created_at: iso(10) },
      { id: id(), email: 'lena@example.com', status: 'subscribed', source: 'footer', resend_contact_id: null, created_at: iso(3) },
    ],
    campaigns: [{ id: id(), subject: 'Welcome to the ritual', preview_text: null, body: 'Hello', resend_broadcast_id: null, status: 'sent', recipients: 2, created_by: 'preview', created_at: iso(9), sent_at: iso(9) }],
    admins: [{ email: 'preview@thejeffect.local', created_at: iso(90) }],
    site_settings: [], product_overrides: [],
  };
}

const globalKey = '__jeffectPreviewDb';
const store = () => (globalThis[globalKey] ||= seed());

class Query {
  constructor(table) { this.table = table; this.filters = []; this.sorts = []; this.mode = 'select'; this.payload = null; this.opts = {}; this.lim = null; this.rangeArg = null; this.single = null; }
  select(_cols, opts = {}) { if (this.mode === 'select' || this.mode === 'mutate-select') { this.opts = opts; } this.returning = true; return this; }
  insert(rows) { this.mode = 'insert'; this.payload = Array.isArray(rows) ? rows : [rows]; return this; }
  upsert(rows) { this.mode = 'upsert'; this.payload = Array.isArray(rows) ? rows : [rows]; return this; }
  update(patch) { this.mode = 'update'; this.payload = patch; return this; }
  delete() { this.mode = 'delete'; return this; }
  eq(c, v) { this.filters.push((r) => r[c] === v); return this; }
  neq(c, v) { this.filters.push((r) => r[c] !== v); return this; }
  in(c, vs) { this.filters.push((r) => vs.includes(r[c])); return this; }
  gte(c, v) { this.filters.push((r) => r[c] >= v); return this; }
  lte(c, v) { this.filters.push((r) => r[c] <= v); return this; }
  ilike(c, v) { const n = String(v).replace(/%/g, '').toLowerCase(); this.filters.push((r) => String(r[c] ?? '').toLowerCase().includes(n)); return this; }
  or() { return this; }
  order(c, { ascending = true } = {}) { this.sorts.push([c, ascending]); return this; }
  limit(n) { this.lim = n; return this; }
  range(a, b) { this.rangeArg = [a, b]; return this; }
  single() { this.single = 'one'; return this; }
  maybeSingle() { this.single = 'maybe'; return this; }
  then(res, rej) { return Promise.resolve(this.run()).then(res, rej); }

  run() {
    const db = store();
    const rows = (db[this.table] ||= []);
    const pk = this.table === 'inventory' ? 'slug' : this.table === 'admins' ? 'email' : this.table === 'site_settings' ? 'key' : 'id';
    if (this.mode === 'insert' || this.mode === 'upsert') {
      const out = [];
      for (const raw of this.payload) {
        const row = { ...raw };
        if (!row[pk] && pk === 'id') row.id = id();
        if (!row.created_at && this.table !== 'inventory' && this.table !== 'site_settings') row.created_at = new Date().toISOString();
        if (this.table === 'orders' && !row.number) row.number = 1000 + rows.length + 1;
        if ((this.table === 'purchase_orders' || this.table === 'transfers' || this.table === 'draft_orders') && !row.number) row.number = rows.length + 1;
        const at = this.mode === 'upsert' ? rows.findIndex((r) => r[pk] === row[pk]) : -1;
        if (at >= 0) { rows[at] = { ...rows[at], ...row }; out.push(rows[at]); } else { rows.push(row); out.push(row); }
      }
      return this.finish(out);
    }
    let matched = rows.filter((r) => this.filters.every((f) => f(r)));
    if (this.mode === 'update') { matched.forEach((r) => Object.assign(r, this.payload)); return this.finish(matched); }
    if (this.mode === 'delete') { db[this.table] = rows.filter((r) => !matched.includes(r)); return this.finish([]); }
    const count = matched.length;
    for (const [c, asc] of [...this.sorts].reverse()) matched = [...matched].sort((a, b) => (a[c] > b[c] ? 1 : a[c] < b[c] ? -1 : 0) * (asc ? 1 : -1));
    if (this.rangeArg) matched = matched.slice(this.rangeArg[0], this.rangeArg[1] + 1);
    if (this.lim != null) matched = matched.slice(0, this.lim);
    if (this.opts?.head) return { data: null, error: null, count };
    return this.finish(matched, count);
  }
  finish(data, count) {
    if (this.single) {
      const one = data[0] ?? null;
      return { data: one, error: one || this.single === 'maybe' ? null : { message: 'No rows' }, count };
    }
    return { data: data.map((r) => structuredClone(r)), error: null, count: count ?? data.length };
  }
}

export function previewClient() {
  return {
    from: (t) => new Query(t),
    rpc: async (name) => (name === 'is_admin' ? { data: true, error: null } : { data: null, error: null }),
    auth: { getUser: async () => ({ data: { user: { email: 'preview@thejeffect.local' } } }) },
    storage: {
      from: () => ({
        upload: async () => ({ data: {}, error: null }),
        remove: async () => ({ data: {}, error: null }),
        getPublicUrl: (p) => ({ data: { publicUrl: `/${p}` } }),
      }),
    },
  };
}
