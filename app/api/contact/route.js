import { NextResponse } from 'next/server';
import { rateLimit, clientIp, EMAIL_RE } from '@/lib/rate-limit';

const clip = (v, max) => String(v ?? '').trim().slice(0, max);

// Validates the contact form, then forwards it to Formspree
// (Formspree emails the team and keeps the submission archive).
export async function POST(request) {
  try {
    if (!rateLimit(`contact:${clientIp(request)}`, { limit: 4, windowMs: 10 * 60_000 })) {
      return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    if (body.company) return NextResponse.json({ success: true }); // honeypot

    const name = clip(body.name, 120);
    const email = clip(body.email, 254).toLowerCase();
    const phone = clip(body.phone, 40);
    const subject = clip(body.subject, 160);
    const message = clip(body.message, 5000);

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (message.length < 5) {
      return NextResponse.json({ error: 'Please write a short message.' }, { status: 400 });
    }

    const formId = process.env.FORMSPREE_FORM_ID;
    if (!formId) {
      console.error('[Contact] FORMSPREE_FORM_ID is not set; message not delivered.');
      return NextResponse.json({ error: 'The contact form is unavailable. Please email us directly.' }, { status: 503 });
    }

    const res = await fetch(`https://formspree.io/f/${encodeURIComponent(formId)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone,
        subject,
        message,
        _subject: subject ? `The J Effect: ${subject}` : 'New message from thejeffect.com',
      }),
    });

    if (!res.ok) {
      console.error('[Contact] Formspree rejected submission:', res.status);
      return NextResponse.json({ error: 'We could not send your message. Please try again.' }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
