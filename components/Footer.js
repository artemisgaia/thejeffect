'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Wordmark from '@/components/Wordmark';
import { SITE_CONFIG } from '@/lib/site-config';

export default function Footer() {
  const { footer, name } = SITE_CONFIG;
  const [footerEmail, setFooterEmail] = useState('');
  const [footerSubmitted, setFooterSubmitted] = useState(false);
  const [footerCompany, setFooterCompany] = useState(''); // honeypot
  const [footerError, setFooterError] = useState('');

  const handleFooterNewsletter = async (e) => {
    e.preventDefault();
    if (!footerEmail) return;
    setFooterError('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: footerEmail, company: footerCompany, source: 'footer' }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setFooterError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setFooterSubmitted(true);
      setFooterEmail('');
    } catch {
      setFooterError('Something went wrong. Please try again.');
    }
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">

        {/* Newsletter */}
        {footer.newsletter.show && (
          <div className="footer-newsletter">
            <div className="footer-newsletter__inner">
              <div className="footer-newsletter__text">
                <h3 className="footer-newsletter__heading">{footer.newsletter.heading}</h3>
              </div>
              {footerSubmitted ? (
                <p className="footer-newsletter__done">
                  Welcome to the ritual. Check your inbox soon.
                </p>
              ) : (
                <form className="footer-newsletter__form" onSubmit={handleFooterNewsletter}>
                  <label htmlFor="footer-email" className="visually-hidden">Email address</label>
                  <input
                    type="email"
                    id="footer-email"
                    name="email"
                    className="footer-newsletter__input"
                    placeholder={footer.newsletter.placeholder}
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    required
                  />
                  <input type="text" name="company" value={footerCompany} onChange={(e) => setFooterCompany(e.target.value)} className="visually-hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <button type="submit" className="footer-newsletter__btn">{footer.newsletter.btn}</button>
                </form>
              )}
              {footerError && <p className="footer-newsletter__note" role="alert">{footerError}</p>}
              {footer.newsletter.note && (
                <p className="footer-newsletter__note">{footer.newsletter.note}</p>
              )}
            </div>
          </div>
        )}

        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo-link" aria-label={`${name} home`}>
              <Wordmark className="wordmark--footer" />
            </Link>
            <p className="footer-tagline">{footer.tagline}</p>
            <div className="footer-social">
              {footer.social.instagram && (
                <a href={footer.social.instagram} className="footer-social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              )}
              {footer.social.tiktok && (
                <a href={footer.social.tiktok} className="footer-social-link" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
                  </svg>
                </a>
              )}
              {footer.social.facebook && (
                <a href={footer.social.facebook} className="footer-social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Col 1 */}
          <div className="footer-col">
            <h3 className="footer-col-title">{footer.col1.heading}</h3>
            <ul className="footer-links">
              {footer.col1.links.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Col 2 */}
          <div className="footer-col">
            <h3 className="footer-col-title">{footer.col2.heading}</h3>
            <ul className="footer-links">
              {footer.col2.links.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div className="footer-col">
            <h3 className="footer-col-title">{footer.col3.heading}</h3>
            <ul className="footer-links">
              {footer.col3.links.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-mark" aria-hidden="true">The J Effect</div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">{footer.copyright}</p>
          {footer.showPaymentIcons && (
            <div className="footer-payment" aria-label="Payment methods accepted">
              <span className="footer-payment__icon" aria-label="Visa"><Image src="/payments/visa.svg" alt="Visa" width={40} height={14} /></span>
              <span className="footer-payment__icon" aria-label="Mastercard"><Image src="/payments/mastercard.svg" alt="Mastercard" width={28} height={18} /></span>
              <span className="footer-payment__icon" aria-label="PayPal"><Image src="/payments/paypal.svg" alt="PayPal" width={16} height={18} /></span>
              <span className="footer-payment__icon" aria-label="Stripe"><Image src="/payments/stripe.svg" alt="Stripe" width={36} height={15} /></span>
              <span className="footer-payment__icon" aria-label="Apple Pay"><Image src="/payments/apple-pay.svg" alt="Apple Pay" width={16} height={18} /></span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
