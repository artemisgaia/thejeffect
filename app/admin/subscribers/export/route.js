import { getAdmin } from '@/lib/admin/auth';

// Quote every field and defuse spreadsheet formulas (=, +, -, @).
const csv = (v) => {
  const s = String(v ?? '');
  return `"${(/^[=+\-@]/.test(s) ? `'${s}` : s).replace(/"/g, '""')}"`;
};

export async function GET() {
  const admin = await getAdmin();
  if (!admin) return new Response('Unauthorized', { status: 401 });

  const { data } = await admin.supabase
    .from('subscribers')
    .select('email, status, source, created_at')
    .order('created_at', { ascending: false });

  const lines = ['email,status,source,joined', ...(data || []).map((r) =>
    [r.email, r.status, r.source, r.created_at].map(csv).join(','))];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
