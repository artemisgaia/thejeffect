import { requireAdmin } from '@/lib/admin/auth';
import CampaignForm from './CampaignForm';

export const metadata = { title: 'Campaigns' };
export const dynamic = 'force-dynamic';

export default async function CampaignsPage() {
  const { supabase } = await requireAdmin();
  const [{ data: campaigns }, { count }] = await Promise.all([
    supabase.from('campaigns').select('id, subject, status, recipients, sent_at').order('created_at', { ascending: false }).limit(20),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }).eq('status', 'subscribed'),
  ]);

  const ready = Boolean(process.env.RESEND_API_KEY && (process.env.RESEND_SEGMENT_ID || process.env.RESEND_AUDIENCE_ID));

  return (
    <>
      <header className="adm-head">
        <div>
          <h1>Campaigns</h1>
          <p>Write an email in the brand template, send yourself a test, then send it to your list through Resend.</p>
        </div>
      </header>

      {!ready && (
        <p className="adm-alert adm-alert--warn" style={{ marginBottom: 20 }}>
          Set <code>RESEND_API_KEY</code> and <code>RESEND_SEGMENT_ID</code> to enable sending. You can still draft and preview below.
        </p>
      )}

      <CampaignForm subscriberCount={count ?? 0} />

      <section className="adm-card" style={{ marginTop: 24 }}>
        <h2>Sent campaigns</h2>
        <p className="adm-card__sub">Open rates and clicks are in the Resend dashboard.</p>
        {campaigns?.length ? (
          <div className="adm-table-wrap" style={{ border: 0 }}>
            <table className="adm-table">
              <thead><tr><th>Subject</th><th>Status</th><th className="num">Recipients</th><th>Sent</th></tr></thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id}>
                    <td>{c.subject}</td>
                    <td><span className={`adm-badge ${c.status === 'sent' ? 'adm-badge--ok' : ''}`}>{c.status}</span></td>
                    <td className="num">{c.recipients ?? '—'}</td>
                    <td>{c.sent_at ? new Date(c.sent_at).toLocaleString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="adm-empty">Nothing sent yet.</p>}
      </section>
    </>
  );
}
