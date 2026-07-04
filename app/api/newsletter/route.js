import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // ──────────────────────────────────────────────────────────
    // TODO: Connect to your email marketing provider here.
    //
    // Example — Klaviyo:
    //   await fetch('https://a.klaviyo.com/api/v2/list/LIST_ID/subscribe', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ api_key: process.env.KLAVIYO_API_KEY, profiles: [{ email }] }),
    //   });
    //
    // Example — Mailchimp:
    //   const md5 = require('md5');
    //   await fetch(`https://us1.api.mailchimp.com/3.0/lists/LIST_ID/members/${md5(email)}`, {
    //     method: 'PUT',
    //     headers: { Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`, 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email_address: email, status_if_new: 'subscribed' }),
    //   });
    // ──────────────────────────────────────────────────────────

    console.log(`[Newsletter] New subscriber: ${email}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Newsletter error:', err);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
