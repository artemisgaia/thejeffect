// Client-side helper for first-party analytics (see app/api/track). Never throws, never blocks.
const KEY = 'je_sid';

function session() {
  try {
    let id = localStorage.getItem(KEY);
    if (!id) { id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`; localStorage.setItem(KEY, id); }
    return id;
  } catch { return null; }
}

function source() {
  try {
    const u = new URL(window.location.href);
    const utm = u.searchParams.get('utm_source');
    if (utm) { sessionStorage.setItem('je_src', utm); return utm; }
    const saved = sessionStorage.getItem('je_src');
    if (saved) return saved;
    const ref = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : '';
    const src = !ref || ref.endsWith(window.location.hostname.replace(/^www\./, '')) ? 'direct' : ref;
    sessionStorage.setItem('je_src', src);
    return src;
  } catch { return 'direct'; }
}

const device = () => (window.innerWidth < 640 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop');

export function track(kind, extra = {}) {
  try {
    const sid = session();
    if (!sid || window.location.pathname.startsWith('/admin')) return;
    const body = JSON.stringify({ kind, session: sid, path: window.location.pathname, source: source(), device: device(), referrer: document.referrer || null, ...extra });
    if (navigator.sendBeacon) navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }));
    else fetch('/api/track', { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } });
  } catch {}
}
