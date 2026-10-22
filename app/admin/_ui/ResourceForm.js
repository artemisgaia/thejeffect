'use client';
import { useActionState } from 'react';
import { saveResource, deleteResource, saveSettings } from './resource-actions';
import { fromCents } from '@/lib/admin/format';

const toLocal = (v) => (v ? new Date(v).toISOString().slice(0, 16) : '');
const toDate = (v) => (v ? new Date(v).toISOString().slice(0, 10) : '');

export function Field({ f, value }) {
  const v = value ?? f.default ?? (f.type === 'bool' ? false : '');
  const id = `f-${f.name}`;
  if (f.type === 'bool') {
    return (
      <div className="adm-setting">
        <div><strong>{f.label}</strong>{f.help && <span>{f.help}</span>}</div>
        <label className="adm-toggle"><input type="checkbox" name={f.name} defaultChecked={Boolean(v)} aria-label={f.label} /><i /></label>
      </div>
    );
  }
  let control;
  if (f.type === 'textarea' || f.type === 'lines') {
    control = <textarea id={id} name={f.name} rows={f.rows || 5} defaultValue={v} placeholder={f.placeholder} />;
  } else if (f.type === 'select') {
    control = <select id={id} name={f.name} defaultValue={v}>{f.options.map((o) => <option key={o} value={o}>{o}</option>)}</select>;
  } else if (f.type === 'money') {
    control = <div className="adm-money"><input id={id} name={f.name} type="number" step="0.01" min="0" defaultValue={v === '' ? '' : fromCents(v)} /></div>;
  } else if (f.type === 'number') {
    control = <input id={id} name={f.name} type="number" step="1" defaultValue={v ?? ''} />;
  } else if (f.type === 'tags') {
    control = <input id={id} name={f.name} type="text" defaultValue={Array.isArray(v) ? v.join(', ') : v} />;
  } else if (f.type === 'date') {
    control = <input id={id} name={f.name} type="date" defaultValue={toDate(v)} />;
  } else if (f.type === 'datetime') {
    control = <input id={id} name={f.name} type="datetime-local" defaultValue={toLocal(v)} />;
  } else {
    control = <input id={id} name={f.name} type={f.type === 'email' || f.type === 'tel' || f.type === 'url' ? f.type : 'text'} defaultValue={v} required={f.required} />;
  }
  return (
    <label className="adm-field" htmlFor={id}>
      <span>{f.label}</span>
      {control}
      {f.help && <small>{f.help}</small>}
    </label>
  );
}

export default function ResourceForm({ resKey, fields, initial = {}, id = '', singular = 'item', canDelete = true }) {
  const [state, action, pending] = useActionState(saveResource, null);
  return (
    <>
      <form action={action} className="adm-form">
        <input type="hidden" name="__key" value={resKey} />
        <input type="hidden" name="__id" value={id} />
        <div className="adm-card">
          <div className="adm-form">
            {fields.map((f) => <Field key={f.name} f={f} value={initial[f.name]} />)}
          </div>
        </div>
        {state?.error && <p className="adm-alert adm-alert--error" role="alert">{state.error}</p>}
        <div className="adm-savebar">
          <a href={`/admin/${resKey}`} className="adm-btn">Cancel</a>
          <button type="submit" className="adm-btn adm-btn--primary" disabled={pending}>{pending ? 'Saving…' : id ? 'Save' : `Create ${singular}`}</button>
        </div>
      </form>
      {id && canDelete && (
        <form action={deleteResource} style={{ marginTop: 8 }}>
          <input type="hidden" name="__key" value={resKey} />
          <input type="hidden" name="__id" value={id} />
          <button type="submit" className="adm-btn adm-btn--danger" onClick={(e) => { if (!confirm(`Delete this ${singular}? This can’t be undone.`)) e.preventDefault(); }}>Delete {singular}</button>
        </form>
      )}
    </>
  );
}

export function SettingsForm({ slug, form, values = {} }) {
  const [state, action, pending] = useActionState(saveSettings, null);
  return (
    <form action={action} className="adm-form">
      <input type="hidden" name="__slug" value={slug} />
      {form.sections.map((sec) => (
        <section className="adm-card" key={sec.title}>
          <h2>{sec.title}</h2>
          {sec.sub && <p className="adm-card__sub">{sec.sub}</p>}
          <div className="adm-form">{sec.fields.map((f) => <Field key={f.name} f={f} value={values[f.name]} />)}</div>
        </section>
      ))}
      {state?.error && <p className="adm-alert adm-alert--error" role="alert">{state.error}</p>}
      {state?.ok && <p className="adm-alert adm-alert--ok" role="status">{state.message}</p>}
      <div className="adm-savebar"><button type="submit" className="adm-btn adm-btn--primary" disabled={pending}>{pending ? 'Saving…' : 'Save'}</button></div>
    </form>
  );
}
