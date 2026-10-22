import 'server-only';

const DAY = 86400000;
const dayKey = (d) => new Date(d).toISOString().slice(0, 10);

export function rangeDays(days) {
  const out = [];
  const end = new Date(); end.setUTCHours(0, 0, 0, 0);
  for (let i = days - 1; i >= 0; i--) out.push(dayKey(end.getTime() - i * DAY));
  return out;
}

// Orders + site events for the last `days`, reduced to what the analytics screens need.
export async function loadAnalytics(supabase, days = 30) {
  const since = new Date(Date.now() - days * DAY).toISOString();
  const [{ data: orders }, { data: events }, { data: customers }] = await Promise.all([
    supabase.from('orders').select('*').gte('created_at', since).order('created_at', { ascending: false }).limit(2000),
    supabase.from('site_events').select('session_id,kind,path,source,device,product,created_at').gte('created_at', since).limit(20000),
    supabase.from('customers').select('id,orders_count,created_at').limit(5000),
  ]);
  const days_ = rangeDays(days);
  const paid = (orders || []).filter((o) => o.status !== 'cancelled' && o.status !== 'pending');

  const salesByDay = Object.fromEntries(days_.map((d) => [d, 0]));
  const ordersByDay = Object.fromEntries(days_.map((d) => [d, 0]));
  paid.forEach((o) => { const k = dayKey(o.created_at); if (k in salesByDay) { salesByDay[k] += o.total - (o.refunded || 0); ordersByDay[k] += 1; } });

  const sessionsByDay = Object.fromEntries(days_.map((d) => [d, new Set()]));
  const sessions = new Set();
  const bySource = {}; const byDevice = {}; const byPath = {}; const cart = new Set(); const checkout = new Set();
  (events || []).forEach((e) => {
    const k = dayKey(e.created_at);
    sessions.add(e.session_id);
    if (sessionsByDay[k]) sessionsByDay[k].add(e.session_id);
    if (e.kind === 'pageview') {
      byPath[e.path] = (byPath[e.path] || 0) + 1;
    }
    if (e.kind === 'add_to_cart') cart.add(e.session_id);
    if (e.kind === 'checkout') checkout.add(e.session_id);
  });
  const firstSeen = new Map();
  (events || []).forEach((e) => { if (!firstSeen.has(e.session_id)) firstSeen.set(e.session_id, e); });
  firstSeen.forEach((e) => {
    bySource[e.source || 'direct'] = (bySource[e.source || 'direct'] || 0) + 1;
    byDevice[e.device || 'unknown'] = (byDevice[e.device || 'unknown'] || 0) + 1;
  });

  const byProduct = {};
  paid.forEach((o) => (o.items || []).forEach((it) => {
    const p = (byProduct[it.slug] ||= { slug: it.slug, name: it.name, units: 0, sales: 0 });
    p.units += it.quantity; p.sales += it.price * it.quantity;
  }));

  const gross = paid.reduce((s, o) => s + o.subtotal, 0);
  const discounts = paid.reduce((s, o) => s + (o.discount || 0), 0);
  const shipping = paid.reduce((s, o) => s + (o.shipping || 0), 0);
  const tax = paid.reduce((s, o) => s + (o.tax || 0), 0);
  const refunds = paid.reduce((s, o) => s + (o.refunded || 0), 0);
  const net = gross - discounts - refunds;
  const total = paid.reduce((s, o) => s + o.total, 0) - refunds;
  const returning = (customers || []).filter((c) => (c.orders_count || 0) > 1).length;
  const buyers = (customers || []).filter((c) => (c.orders_count || 0) > 0).length;

  const top = (obj, n = 8) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n);
  return {
    days: days_, orders: paid, orderCount: paid.length, gross, discounts, shipping, tax, refunds, net, total,
    aov: paid.length ? Math.round(total / paid.length) : 0,
    returningRate: buyers ? Math.round((returning / buyers) * 100) : null,
    fulfilled: paid.filter((o) => o.fulfillment === 'fulfilled').length,
    salesSeries: days_.map((d) => salesByDay[d]),
    ordersSeries: days_.map((d) => ordersByDay[d]),
    sessionsSeries: days_.map((d) => sessionsByDay[d].size),
    sessions: sessions.size,
    pageviews: (events || []).filter((e) => e.kind === 'pageview').length,
    funnel: { sessions: sessions.size, cart: cart.size, checkout: checkout.size, purchased: paid.length },
    conversion: sessions.size ? Math.round((paid.length / sessions.size) * 1000) / 10 : 0,
    bySource: top(bySource), byDevice: top(byDevice), topPages: top(byPath), topProducts: Object.values(byProduct).sort((a, b) => b.sales - a.sales).slice(0, 8),
    hasTraffic: (events || []).length > 0,
  };
}

export async function loadLive(supabase) {
  const since = new Date(Date.now() - 5 * 60000).toISOString();
  const { data: events } = await supabase.from('site_events').select('session_id,kind,path,source,device,created_at').gte('created_at', since).limit(2000);
  const sessions = new Set((events || []).map((e) => e.session_id));
  const cart = new Set((events || []).filter((e) => e.kind === 'add_to_cart').map((e) => e.session_id));
  const checkout = new Set((events || []).filter((e) => e.kind === 'checkout').map((e) => e.session_id));
  const paths = {};
  (events || []).forEach((e) => { if (e.kind === 'pageview') paths[e.path] = (paths[e.path] || 0) + 1; });
  const since24 = new Date(Date.now() - DAY).toISOString();
  const { data: orders } = await supabase.from('orders').select('total,status').gte('created_at', since24);
  return {
    visitors: sessions.size, cart: cart.size, checkout: checkout.size,
    paths: Object.entries(paths).sort((a, b) => b[1] - a[1]).slice(0, 8),
    orders24: (orders || []).length, sales24: (orders || []).reduce((s, o) => s + (o.status === 'paid' ? o.total : 0), 0),
  };
}

// Monthly results from before Stripe (public.history_months), falling back to the built-in copy
// in lib/admin/history.js when the table is empty or missing. All amounts in cents.
export async function loadHistory(supabase) {
  const { data } = await supabase.from('history_months').select('*').order('period_start', { ascending: true });
  if (data && data.length) {
    return data.map((r) => ({ label: r.label, short: new Date(`${r.period_start}T12:00:00Z`).toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }), revenue: r.revenue, profit: r.profit, expenses: r.expenses, orders: r.orders, fulfilled: r.fulfilled, returning: r.returning_customers, fresh: r.new_customers }));
  }
  const { HISTORY } = await import('./history');
  return HISTORY.map((h) => ({ label: h.period, short: h.short, revenue: h.revenue * 100, profit: h.profit * 100, expenses: h.expenses * 100, orders: null, fulfilled: null, returning: null, fresh: null }));
}

export function summarizeHistory(rows) {
  const sum = (k) => rows.reduce((s, r) => s + (r[k] || 0), 0);
  const known = (k) => rows.length > 0 && rows.every((r) => r[k] != null);
  const returning = sum('returning'); const fresh = sum('fresh');
  const orders = known('orders') ? sum('orders') : null;
  return {
    revenue: sum('revenue'), profit: sum('profit'), expenses: sum('expenses'),
    orders, fulfilled: known('fulfilled') ? sum('fulfilled') : null,
    aov: orders ? Math.round(sum('revenue') / orders) : null,
    returningRate: known('returning') && known('fresh') && returning + fresh > 0 ? Math.round((returning / (returning + fresh)) * 100) : null,
  };
}
