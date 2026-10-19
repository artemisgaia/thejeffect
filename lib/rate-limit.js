// Best-effort, per-instance limiter for public form endpoints.
// Serverless instances do not share memory, so this only blunts bursts;
// the honeypot fields and Formspree/Resend's own protections do the rest.
const hits = new Map();

export function rateLimit(key, { limit = 5, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 500) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return recent.length <= limit;
}

export function clientIp(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
