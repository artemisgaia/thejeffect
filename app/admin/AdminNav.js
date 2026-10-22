'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './_ui/Icon';
import { NAV, SETTINGS_NAV } from '@/lib/admin/nav';

const isActive = (pathname, it) => (it.exact ? pathname === it.href : pathname === it.href || pathname.startsWith(`${it.href}/`));

// Shopify swaps the whole sidebar for the Settings list while you are in Settings.
export default function AdminNav() {
  const pathname = usePathname() || '';
  const inSettings = pathname.startsWith('/admin/settings');

  if (inSettings) {
    return (
      <nav className="adm-nav" aria-label="Settings">
        <Link href="/admin" className="adm-nav__link" style={{ fontWeight: 700 }}>
          <Icon name="back" size={16} /> Settings
        </Link>
        <div style={{ height: 6 }} />
        {SETTINGS_NAV.map((it) => (
          <Link key={it.href} href={it.href} className={`adm-nav__link${isActive(pathname, it) ? ' is-active' : ''}`} aria-current={isActive(pathname, it) ? 'page' : undefined}>
            <Icon name={it.icon} size={16} /> {it.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="adm-nav" aria-label="Admin">
      {NAV.map((it) => {
        if (it.group) return <div key={it.label} className="adm-nav__label">{it.label}</div>;
        const active = isActive(pathname, it);
        return (
          <div key={it.href}>
            <Link href={it.href} prefetch={it.external ? false : undefined} className={`adm-nav__link${active ? ' is-active' : ''}`} aria-current={pathname === it.href ? 'page' : undefined}>
              <Icon name={it.icon} size={16} /> {it.label}
            </Link>
            {active && it.sub && (
              <div className="adm-nav__sub">
                {it.sub.map((s) => (
                  <Link key={s.href} href={s.href} className={`adm-nav__sublink${pathname === s.href || pathname.startsWith(`${s.href}/`) ? ' is-active' : ''}`}>{s.label}</Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
