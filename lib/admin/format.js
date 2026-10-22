// Small formatting helpers shared by admin pages.
export const money = (cents = 0, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: String(currency).toUpperCase() }).format((cents || 0) / 100);

export const dateShort = (v) => {
  if (!v) return '—';
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const dateTime = (v) => {
  if (!v) return '—';
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
};

export const ago = (v) => {
  if (!v) return '—';
  const s = Math.max(1, Math.round((Date.now() - new Date(v).getTime()) / 1000));
  if (s < 60) return 'Just now';
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} hr ago`;
  if (s < 86400 * 30) return `${Math.floor(s / 86400)} d ago`;
  return dateShort(v);
};

export const slugify = (s = '') => String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
export const toCents = (v) => Math.max(0, Math.round(Number(String(v ?? '').replace(/[^0-9.]/g, '')) * 100) || 0);
export const fromCents = (c) => ((c || 0) / 100).toFixed(2);

export const daysAgoIso = (n) => new Date(Date.now() - n * 86400000).toISOString();
