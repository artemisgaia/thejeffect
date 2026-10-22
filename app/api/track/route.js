import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { rateLimit, clientIp } from '@/lib/rate-limit';

// First-party analytics for the admin (sessions, sources, devices, funnel). Stores no
// IP address or personal data: just an anonymous session id kept in the browser.
const KINDS = new Set(['pageview', 'add_to_cart', 'checkout']);
const empty = () => new NextResponse(null, { status: 204 });

export async function POST(request) {
  try {
    if (!rateLimit(`track:${clientIp(request)}`, { limit: 120, windowMs: 60_000 })) return empty();
    const b = await request.json();
    if (!KINDS.has(b.kind) || typeof b.session !== 'string' || b.session.length > 60) return empty();
    const db = createServiceClient();
    if (!db) return empty();
    const clean = (v, n = 200) => (typeof v === 'string' ? v.slice(0, n) : null);
    await db.from('site_events').insert({
      session_id: b.session, kind: b.kind, path: clean(b.path), referrer: clean(b.referrer),
      source: clean(b.source, 60) || 'direct', device: ['mobile', 'tablet', 'desktop'].includes(b.device) ? b.device : null, product: clean(b.product, 100),
    });
  } catch {}
  return empty();
}
