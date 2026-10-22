import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/auth';
import { RESOURCES, SETTINGS_FORMS, SETTINGS_ALIASES } from '@/lib/admin/resources';
import { PageHead, EmptyState, Cell, Badge } from './parts';
import Icon from './Icon';
import ResourceForm, { SettingsForm } from './ResourceForm';

const has = (v) => Boolean(process.env[v]);

const INTEGRATIONS = [
  ['Supabase', has('NEXT_PUBLIC_SUPABASE_URL') && has('NEXT_PUBLIC_SUPABASE_ANON_KEY'), 'Database, login and image storage'],
  ['Supabase service role', has('SUPABASE_SERVICE_ROLE_KEY'), 'Newsletter sign-ups, Stripe webhook and analytics writes'],
  ['Stripe', has('STRIPE_SECRET_KEY'), 'Checkout, orders and discounts'],
  ['Stripe webhook', has('STRIPE_WEBHOOK_SECRET'), 'Creates orders and customers when someone pays'],
  ['Resend', has('RESEND_API_KEY'), 'Welcome emails and campaigns'],
  ['Formspree', has('FORMSPREE_FORM_ID'), 'Contact form messages'],
  ['Vercel Analytics', true, 'Page views and visitors (view in the Vercel dashboard)'],
];

export function resolve(parts) {
  const key = parts.join('/');
  if (RESOURCES[key]) return { kind: 'list', key, res: RESOURCES[key] };
  const base = parts.slice(0, -1).join('/');
  if (RESOURCES[base] && !RESOURCES[base].readonly) return { kind: parts.at(-1) === 'new' ? 'new' : 'edit', key: base, res: RESOURCES[base], id: parts.at(-1) };
  const alias = SETTINGS_ALIASES[key];
  if (alias) return { kind: 'settings', slug: alias, form: SETTINGS_FORMS[alias] };
  if (parts[0] === 'settings' && parts.length === 2 && SETTINGS_FORMS[parts[1]]) return { kind: 'settings', slug: parts[1], form: SETTINGS_FORMS[parts[1]] };
  return null;
}

export function titleFor(parts) {
  const r = resolve(parts);
  if (!r) return 'Admin';
  return r.kind === 'settings' ? r.form.title : r.res.title;
}

export default async function ResourcePage({ parts, searchParams = {} }) {
  const { supabase } = await requireAdmin();
  const r = resolve(parts);
  if (!r) notFound();

  if (r.kind === 'settings') {
    const { data } = await supabase.from('site_settings').select('value').eq('key', `s:${r.slug}`).maybeSingle();
    return (
      <div className="adm-settings__body" style={{ margin: 0, maxWidth: 'none' }}>
        <div className="adm-narrow" />
        <PageHead title={r.form.title} icon={r.form.icon} />
        {r.slug === 'apps' && (
          <section className="adm-card" style={{ marginBottom: 16 }}>
            <h2>Connected services</h2>
            <p className="adm-card__sub">Keys live in Vercel → Settings → Environment Variables. They are never shown here.</p>
            <ul className="adm-checks">
              {INTEGRATIONS.map(([n, ok, t]) => (
                <li key={n}><i className={`adm-dot ${ok ? 'adm-dot--ok' : 'adm-dot--off'}`} /><div><strong>{n}{ok ? '' : ' · not connected'}</strong><span>{t}</span></div></li>
              ))}
            </ul>
          </section>
        )}
        <SettingsForm slug={r.slug} form={r.form} values={data?.value || {}} />
      </div>
    );
  }

  const { key, res } = r;

  if (r.kind === 'new' || r.kind === 'edit') {
    let initial = {};
    if (r.kind === 'edit') {
      const { data } = await supabase.from(res.table).select('*').eq('id', r.id).maybeSingle();
      if (!data) notFound();
      initial = data;
    }
    return (
      <>
        <div className="adm-narrow" />
        <PageHead title={r.kind === 'new' ? `Add ${res.singular}` : (initial.title || initial.name || initial.code || initial.supplier || `Edit ${res.singular}`)} icon={res.icon} back={{ href: `/admin/${key}`, label: res.title }} />
        <ResourceForm resKey={key} fields={res.fields} initial={initial} id={r.kind === 'edit' ? r.id : ''} singular={res.singular} />
      </>
    );
  }

  // list
  const { data: all } = await supabase.from(res.table).select('*').order(res.order[0], { ascending: res.order[1] }).limit(300);
  const q = String(searchParams.q || '').trim().toLowerCase();
  const rows = (all || []).filter((row) => !q || JSON.stringify(row).toLowerCase().includes(q));
  const addHref = `/admin/${key}/new`;

  return (
    <>
      <PageHead title={res.title} icon={res.icon}>
        {!res.readonly && (all || []).length > 0 && <Link href={addHref} className="adm-btn adm-btn--primary"><Icon name="plus" size={14} /> {res.empty.cta || `Add ${res.singular}`}</Link>}
      </PageHead>
      {(all || []).length === 0 ? (
        <EmptyState art={res.icon === 'orders' ? 'orders' : res.icon} title={res.empty.title} text={res.empty.text} cta={res.readonly ? undefined : res.empty.cta} href={addHref} learn={res.learn} />
      ) : (
        <div className="adm-table-wrap">
          <form className="adm-toolbar" role="search">
            <input className="adm-input" type="search" name="q" defaultValue={searchParams.q || ''} placeholder={`Search ${res.title.toLowerCase()}`} aria-label={`Search ${res.title}`} />
            <button className="adm-btn" type="submit">Search</button>
          </form>
          <div className="adm-table-scroll">
            <table className="adm-table">
              <thead><tr>{res.columns.map((c) => <th key={c.key} className={c.num ? 'num' : ''}>{c.label}</th>)}</tr></thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    {res.columns.map((c, i) => (
                      <td key={c.key} className={c.num ? 'num' : ''} style={c.bold ? { fontWeight: 550 } : undefined}>
                        {i === 0 && !res.readonly ? <Link href={`/admin/${key}/${row.id}`} className="adm-link" style={{ color: 'inherit' }}><Cell col={c} row={row} /></Link> : <Cell col={c} row={row} />}
                      </td>
                    ))}
                  </tr>
                ))}
                {rows.length === 0 && <tr><td colSpan={res.columns.length} className="adm-empty">Nothing matches “{searchParams.q}”.</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="adm-foot">{rows.length} {rows.length === 1 ? res.singular : `${res.singular}s`}</div>
        </div>
      )}
      {(all || []).length > 0 && <p className="adm-learn">Learn more about <a href="https://thejeffect.com" target="_blank" rel="noreferrer">{res.learn || res.title.toLowerCase()}</a></p>}
    </>
  );
}
