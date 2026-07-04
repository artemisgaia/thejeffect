'use client';
import { useState } from 'react';

// metadata removed because this is a client component

const DETAILS = [
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>, label: 'Email Us', value: 'hello@thejeffect.com' },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>, label: 'Response Time', value: 'Within 24 hours, Mon–Fri' },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>, label: 'Orders & Returns', value: '30-day return policy' },
  { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>, label: 'Ingredient Questions', value: 'We love talking formulas' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    // TODO: wire to a contact form API (e.g. Resend, Formspree, or a custom route)
    await new Promise((r) => setTimeout(r, 900));
    setStatus('success');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      {/* Left: info panel */}
      <div className="contact-info">
        <div className="eyebrow eyebrow--light reveal">Get in Touch</div>
        <h1 className="contact-info__title reveal reveal--d1">Let&apos;s talk rituals.</h1>
        <p className="contact-info__sub reveal reveal--d2">
          Questions about your order, your routine, or our formulas? We&apos;re here and happy to help. Expect a response within 24 hours.
        </p>
        <div className="contact-details reveal reveal--d3">
          {DETAILS.map((d, i) => (
            <div className="contact-detail" key={i}>
              <span className="contact-detail__icon">{d.icon}</span>
              <div>
                <div className="contact-detail__label">{d.label}</div>
                <div className="contact-detail__val">{d.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: form panel */}
      <div className="contact-form-panel">
        <h2 className="contact-form-panel__title reveal">
          Send us a <em>message.</em>
        </h2>
        <div className="reveal reveal--d1">
          {status === 'success' ? (
            <div className="form-success">Message sent — we&apos;ll be in touch within 24 hours.</div>
          ) : (
            <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label" htmlFor="contact-name">Your Name</label>
                  <input id="contact-name" type="text" name="name" value={form.name} onChange={handleChange} className="form-input" placeholder="Jane Smith" autoComplete="name" />
                </div>
                <div className="form-field">
                  <label className="form-label" htmlFor="contact-email">Email *</label>
                  <input id="contact-email" type="email" name="email" value={form.email} onChange={handleChange} className="form-input" placeholder="jane@email.com" required autoComplete="email" />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="contact-phone">Phone (optional)</label>
                <input id="contact-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} className="form-input" placeholder="+1 (555) 000-0000" autoComplete="tel" />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <input id="contact-subject" type="text" name="subject" value={form.subject} onChange={handleChange} className="form-input" placeholder="Order question, ingredient question, ritual advice…" />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="contact-message">Message *</label>
                <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} className="form-textarea" placeholder="Tell us how we can help…" required />
              </div>
              <div className="form-submit">
                <button type="submit" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending…' : 'Send Message →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
