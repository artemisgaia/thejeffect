import Link from 'next/link';
import AdminNav from './AdminNav';
import AdminSearch from './AdminSearch';
import Icon from './_ui/Icon';
import { signOut } from './actions';
import { searchIndex } from '@/lib/admin/nav';

export default function AdminShell({ email, children }) {
  const initials = (email || '?').slice(0, 1).toUpperCase();
  return (
    <div className="adm-shell">
      <header className="adm-top">
        <Link href="/admin" className="adm-top__brand"><span className="adm-mark">J</span> The J Effect</Link>
        <AdminSearch items={searchIndex()} />
        <div className="adm-top__right">
          <Link href="/" target="_blank" className="adm-nav__link" style={{ minHeight: 28, padding: '3px 8px' }}><Icon name="external" size={14} /> View store</Link>
          <span className="adm-top__user" title={email}>{email}</span>
          <span className="adm-avatar" aria-hidden="true">{initials}</span>
        </div>
      </header>
      <aside className="adm-side">
        <AdminNav />
        <div className="adm-side__foot">
          <Link href="/admin/settings/general" className="adm-nav__link"><Icon name="settings" size={16} /> Settings</Link>
          <div className="adm-store"><span className="adm-mark">J</span> The J Effect</div>
          <form action={signOut}><button type="submit" className="adm-signout">Sign out</button></form>
        </div>
      </aside>
      <main className="adm-work" id="adm-main"><div className="adm-main">{children}</div></main>
    </div>
  );
}
