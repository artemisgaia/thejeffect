import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/service';
import { getResend, resendConfig } from '@/lib/resend';
import { renderEmail, textToHtml } from '@/lib/email-template';
import { SITE_CONFIG } from '@/lib/site-config';
import { rateLimit, clientIp, EMAIL_RE } from '@/lib/rate-limit';

export async function POST(request) {
  try {
    if (!rateLimit(`newsletter:${clientIp(request)}`)) {
      return NextResponse.json({ error: 'Too many attempts. Please try again shortly.' }, { status: 429 });
    }

    const { email: raw, company, source } = await request.json();
    if (company) return NextResponse.json({ success: true }); // honeypot: bots fill this in

    const email = String(raw || '').trim().toLowerCase();
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const supabase = createServiceClient();
    const resend = getResend();
    if (!supabase && !resend) {
      console.error('[Newsletter] Neither Supabase nor Resend is configured; subscriber not stored.');
      return NextResponse.json({ error: 'Sign-ups are not available right now.' }, { status: 503 });
    }

    // 1. Store the subscriber (Supabase). A duplicate email is fine.
    let isNew = true;
    if (supabase) {
      const { error } = await supabase
        .from('subscribers')
        .insert({ email, source: typeof source === 'string' ? source.slice(0, 40) : 'site' });
      if (error) {
        if (error.code === '23505') isNew = false;
        else console.error('[Newsletter] Supabase insert failed:', error.message);
      }
    }

    // 2. Add to the Resend segment used for broadcasts.
    if (resend && resendConfig.segmentId()) {
      const { error } = await resend.contacts.create({
        email,
        unsubscribed: false,
        segments: [{ id: resendConfig.segmentId() }],
      });
      if (error) console.error('[Newsletter] Resend contact failed:', error.message);
    }

    // 3. Welcome email, only the first time.
    if (resend && isNew) {
      const { error } = await resend.emails.send({
        from: resendConfig.from(),
        to: email,
        replyTo: resendConfig.replyTo(),
        subject: `Welcome to ${SITE_CONFIG.name}`,
        html: renderEmail({
          preview: 'Your ritual starts here.',
          heading: 'Welcome to the ritual.',
          body: textToHtml(
            'Thank you for joining The J Effect. Expect calm, useful notes: ritual guidance, ingredient insight and early access to new formulas.\n\nNo noise, and you can unsubscribe at any time.',
          ),
          cta: { label: 'Explore the shop', url: `${SITE_CONFIG.url}/shop` },
          unsubscribe: false,
        }),
      });
      if (error) console.error('[Newsletter] Welcome email failed:', error.message);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Newsletter error:', err);
    return NextResponse.json({ error: 'Failed to subscribe.' }, { status: 500 });
  }
}
