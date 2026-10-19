import './admin.css';
import { getAdmin } from '@/lib/admin/auth';
import AdminShell from './AdminShell';

export const metadata = {
  title: { default: 'Admin', template: '%s · Admin' },
  robots: { index: false, follow: false },
};

// Signed-out visitors only ever see the login page (children), never the shell.
export default async function AdminLayout({ children }) {
  const admin = await getAdmin();
  return (
    <div className="adm">
      {admin ? <AdminShell email={admin.user.email}>{children}</AdminShell> : children}
    </div>
  );
}
