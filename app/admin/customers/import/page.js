import { requireAdmin } from '@/lib/admin/auth';
import { PageHead } from '../../_ui/parts';
import ImportForm from './ImportForm';

export const metadata = { title: 'Import customers' };
export const dynamic = 'force-dynamic';

export default async function ImportCustomers() {
  await requireAdmin();
  return (
    <>
      <div className="adm-narrow" />
      <PageHead title="Import customers" icon="users" back={{ href: '/admin/customers', label: 'Customers' }} />
      <section className="adm-card">
        <h2>Upload a CSV</h2>
        <p className="adm-card__sub">Uses the standard Shopify customer format: <code>First Name, Last Name, Email, Phone, Address1, City, Province Code, Country Code, Zip, Accepts Marketing, Total Spent, Total Orders, Tags, Note</code>. Customers already in the admin are not changed. Importing does not email anyone or add them to Resend.</p>
        <ImportForm />
      </section>
    </>
  );
}
