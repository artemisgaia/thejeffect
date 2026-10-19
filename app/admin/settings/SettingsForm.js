'use client';
import { useActionState } from 'react';
import { saveAnnouncement, resetAnnouncement } from './actions';

export default function SettingsForm({ initial }) {
  const [state, action, pending] = useActionState(saveAnnouncement, null);

  return (
    <>
      <form action={action} className="adm-card adm-form">
        <div>
          <h2>Announcement bar</h2>
          <p className="adm-card__sub">The thin bar above the header on every page.</p>
        </div>
        <label className="adm-switch">
          <input type="checkbox" name="show" defaultChecked={initial.show} />
          <div><strong>Show the bar</strong><span>Untick to hide it completely.</span></div>
        </label>
        <label className="adm-field">
          <span>Text</span>
          <input type="text" name="text" defaultValue={initial.text} maxLength={160} placeholder="Free shipping on orders over $50 — Made in the USA" />
          <small>Use “Reset to default wording” below to restore the original message.</small>
        </label>
        <label className="adm-field">
          <span>Link</span>
          <input type="text" name="link" defaultValue={initial.link} placeholder="/shop" />
        </label>
        <div className="adm-actions">
          <button type="submit" className="adm-btn adm-btn--primary" disabled={pending}>{pending ? 'Saving…' : 'Save'}</button>
          {state?.error && <span className="adm-alert adm-alert--error" role="alert">{state.error}</span>}
          {state?.ok && <span className="adm-alert adm-alert--ok" role="status">{state.message}</span>}
        </div>
      </form>

      {initial.customised && (
        <form action={resetAnnouncement} style={{ marginTop: 16 }}>
          <button type="submit" className="adm-btn adm-btn--danger">Reset to default wording</button>
        </form>
      )}
    </>
  );
}
