'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { href: '/admin', label: 'Overview', exact: true },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/subscribers', label: 'Subscribers' },
  { href: '/admin/campaigns', label: 'Campaigns' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="adm-nav" aria-label="Admin">
      {ITEMS.map((it) => {
        const active = it.exact ? pathname === it.href : pathname.startsWith(it.href);
        return (
          <Link key={it.href} href={it.href} className={`adm-nav__link${active ? ' is-active' : ''}`} aria-current={active ? 'page' : undefined}>
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
