'use client';
import { useActionState, useState } from 'react';
import { sendTest, sendCampaign } from './actions';
import { renderEmail, textToHtml } from '@/lib/email-template';

export default function CampaignForm({ subscriberCount }) {
  const [v, setV] = useState({ subject: '', preview: '', heading: '', body: '', cta_label: 'Shop now', cta_url: '' });
  const [testState, testAction, testing] = useActionState(sendTest, null);
  const [sendState, sendAction, sending] = useActionState(sendCampaign, null);
  const set = (k) => (e) => setV((cur) => ({ ...cur, [k]: e.target.value }));

  const srcDoc = renderEmail({
    preview: v.preview,
    heading: v.heading,
    body: textToHtml(v.body || 'Your message appears here.\n\nSeparate paragraphs with a blank line.'),
    cta: v.cta_url ? { label: v.cta_label, url: v.cta_url } : null,
    unsubscribe: true,
  });

  const fields = (
    <>
      <input type="hidden" name="subject" value={v.subject} />
      <input type="hidden" name="preview" value={v.preview} />
      <input type="hidden" name="heading" value={v.heading} />
      <input type="hidden" name="body" value={v.body} />
      <input type="hidden" name="cta_label" value={v.cta_label} />
      <input type="hidden" name="cta_url" value={v.cta_url} />
    </>
  );

  return (
    <div className="adm-grid adm-grid--2" style={{ alignItems: 'start' }}>
      <section className="adm-card">
        <h2>Compose</h2>
        <p className="adm-card__sub">Plain text. Use **double asterisks** for bold.</p>
        <div className="adm-form">
          <label className="adm-field"><span>Subject line</span><input type="text" value={v.subject} onChange={set('subject')} maxLength={160} /></label>
          <label className="adm-field"><span>Preview text</span><input type="text" value={v.preview} onChange={set('preview')} maxLength={200} /><small>The grey snippet shown after the subject in the inbox.</small></label>
          <label className="adm-field"><span>Headline</span><input type="text" value={v.heading} onChange={set('heading')} maxLength={160} /></label>
          <label className="adm-field"><span>Body</span><textarea value={v.body} onChange={set('body')} style={{ minHeight: 220 }} maxLength={8000} /></label>
          <div className="adm-row">
            <label className="adm-field"><span>Button label</span><input type="text" value={v.cta_label} onChange={set('cta_label')} maxLength={40} /></label>
            <label className="adm-field"><span>Button link</span><input type="url" value={v.cta_url} onChange={set('cta_url')} placeholder="https://thejeffect.com/shop" /></label>
          </div>

          <form action={testAction} className="adm-actions">
            {fields}
            <button type="submit" className="adm-btn" disabled={testing}>{testing ? 'Sending…' : 'Send test to me'}</button>
            {testState?.error && <span className="adm-alert adm-alert--error" role="alert">{testState.error}</span>}
            {testState?.ok && <span className="adm-alert adm-alert--ok" role="status">{testState.message}</span>}
          </form>

          <form action={sendAction} className="adm-form" style={{ borderTop: '1px solid var(--a-line)', paddingTop: 18 }}>
            {fields}
            <label className="adm-switch">
              <input type="checkbox" name="confirm" />
              <div><strong>Send to all {subscriberCount} subscribers</strong><span>This sends immediately and cannot be undone.</span></div>
            </label>
            <div className="adm-actions">
              <button type="submit" className="adm-btn adm-btn--primary" disabled={sending}>{sending ? 'Sending…' : 'Send campaign'}</button>
              {sendState?.error && <span className="adm-alert adm-alert--error" role="alert">{sendState.error}</span>}
              {sendState?.ok && <span className="adm-alert adm-alert--ok" role="status">{sendState.message}</span>}
            </div>
          </form>
        </div>
      </section>

      <section className="adm-card">
        <h2>Preview</h2>
        <p className="adm-card__sub">Exactly how the email will look.</p>
        <div className="adm-preview"><iframe title="Email preview" srcDoc={srcDoc} sandbox="" /></div>
      </section>
    </div>
  );
}
