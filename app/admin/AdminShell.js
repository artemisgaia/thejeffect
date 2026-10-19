import Link from 'next/link';
import AdminNav from './AdminNav';
import { signOut } from './actions';

export default function AdminShell({ email, children }) {
  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <Link href="/admin" className="adm-brand">
          The J Effect
          <span>Admin</span>
        </Link>
        <AdminNav />
        <div className="adm-side__foot">
          <Link href="/" target="_blank" className="adm-side__link">View storefront ↗</Link>
          <p className="adm-side__user" title={email}>{email}</p>
          <form action={signOut}>
            <button type="submit" className="adm-side__signout">Sign out</button>
          </form>
        </div>
      </aside>
      <div className="adm-main">{children}</div>
    </div>
  );
}
