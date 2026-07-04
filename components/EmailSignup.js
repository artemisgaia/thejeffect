'use client';
import { useState } from 'react';

export default function EmailSignup({
  eyebrow = 'Stay Connected',
  title = 'A little calm in your inbox.',
  subtitle = 'Ritual guidance, ingredient insight, and early access — at your pace. No noise.',
  placeholder = 'your@email.com',
  btnLabel = 'Subscribe →',
  note = 'No spam. Unsubscribe anytime.',
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setStatus('success'); setEmail(''); }
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="email-signup">
      <div className="email-signup__inner">
        <div className="eyebrow eyebrow--light eyebrow--center reveal">{eyebrow}</div>
        <h2 className="email-signup__title reveal reveal--d1">
          A little <em>calm</em> in your inbox.
        </h2>
        <p className="email-signup__sub reveal reveal--d2">{subtitle}</p>

        <div className="reveal reveal--d3">
          {status === 'success' ? (
            <p style={{ color: 'var(--gold-light)', fontSize: '.88rem', fontFamily: "'DM Sans', sans-serif" }}>
              ✓ You&apos;re in! Check your inbox.
            </p>
          ) : (
            <form className="email-signup__form" onSubmit={handleSubmit}>
              <label htmlFor="email-signup-input" className="visually-hidden">Email address</label>
              <input
                id="email-signup-input"
                type="email"
                name="email"
                className="email-signup__input"
                placeholder={placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
              />
              <button type="submit" className="email-signup__btn" disabled={status === 'loading'}>
                {status === 'loading' ? 'Subscribing…' : btnLabel}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p style={{ color: 'rgba(255,100,100,.8)', fontSize: '.78rem', marginTop: '8px', fontFamily: "'DM Sans', sans-serif" }}>
              Something went wrong. Please try again.
            </p>
          )}
          <p className="email-signup__note">{note}</p>
        </div>
      </div>
    </section>
  );
}
