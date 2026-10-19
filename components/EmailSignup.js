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
  const [company, setCompany] = useState(''); // honeypot
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company, source: 'home' }),
      });
      if (res.ok) { setStatus('success'); setEmail(''); }
      else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setError('Something went wrong. Please try again.');
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
            <p className="email-signup__done">You&rsquo;re in. Check your inbox.</p>
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
              <input type="text" name="company" value={company} onChange={(e) => setCompany(e.target.value)} className="visually-hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <button type="submit" className="email-signup__btn" disabled={status === 'loading'}>
                {status === 'loading' ? 'Subscribing…' : btnLabel}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="email-signup__error" role="alert">{error}</p>
          )}
          <p className="email-signup__note">{note}</p>
        </div>
      </div>
    </section>
  );
}
