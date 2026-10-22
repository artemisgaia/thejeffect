import Link from 'next/link';
import Icon from './Icon';
import Art from './Art';
import { money, dateShort, dateTime } from '@/lib/admin/format';

export function PageHead({ title, icon, sub, children, back }) {
  return (
    <>
      {back && <Link href={back.href} className="adm-crumb"><Icon name="back" size={14} /> {back.label}</Link>}
      <header className="adm-head">
        <div>
          <h1>{icon && <Icon name={icon} size={20} />}{title}</h1>
          {sub && <p>{sub}</p>}
        </div>
        {children && <div className="adm-head__actions">{children}</div>}
      </header>
    </>
  );
}

export function Badge({ tone = '', fill = false, children }) {
  return <span className={`adm-badge${tone ? ` adm-badge--${tone}` : ''}`}><i className={fill ? 'fill' : ''} />{children}</span>;
}

export const titleCase = (s) => String(s ?? '').replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());

export function EmptyState({ art = 'box', title, text, cta, href, learn }) {
  return (
    <div className="adm-card adm-card--flush">
      <div className="adm-emptystate">
        <Art name={art} />
        <h2>{title}</h2>
        {text && <p>{text}</p>}
        {cta && href && <Link href={href} className="adm-btn adm-btn--primary">{cta}</Link>}
      </div>
      {learn && <p className="adm-learn">Learn more about <a href="https://thejeffect.com" target="_blank" rel="noreferrer">{learn}</a></p>}
    </div>
  );
}

// Renders one list cell for config-driven tables.
export function Cell({ col, row }) {
  let v = row[col.key];
  if (v == null || v === '') v = col.fallback ? row[col.fallback] : v;
  switch (col.type) {
    case 'money': return v == null ? '—' : money(v);
    case 'date': return dateShort(v);
    case 'datetime': return dateTime(v);
    case 'number': return v == null ? '—' : `${v}${col.suffix || ''}`;
    case 'bool': return v ? <Badge tone="ok" fill>Yes</Badge> : <span style={{ color: 'var(--a-faint)' }}>No</span>;
    case 'count': return col.smart && row[col.smart] === 'smart' ? 'Automated' : Array.isArray(v) ? v.length : 0;
    case 'lines': return String(v || '').split('\n').filter(Boolean).length || '—';
    case 'excerpt': return <span style={{ color: 'var(--a-muted)' }}>{String(v || '').replace(/\s+/g, ' ').slice(0, 80) || '—'}</span>;
    case 'badge': {
      const key = String(v);
      const tone = col.map?.[key] ?? '';
      const label = col.labels?.[key] ?? titleCase(key);
      return <Badge tone={tone} fill={tone === 'ok'}>{label}</Badge>;
    }
    default: return v == null || v === '' ? '—' : `${col.prefix || ''}${v}`;
  }
}
