import Link from 'next/link';
import { requireAdmin } from '@/lib/admin/auth';
import { PageHead } from '../../_ui/parts';
import Icon from '../../_ui/Icon';

export const metadata = { title: 'Themes' };
export const dynamic = 'force-dynamic';

export default async function Themes() {
  await requireAdmin();
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thejeffect.com';
  return (
    <div className="adm-wide">
      <PageHead title="Online Store" icon="store" sub="Live preview of the storefront. The design is maintained in code, so it is view-only here.">
        <a className="adm-btn adm-btn--primary" href={site} target="_blank" rel="noreferrer"><Icon name="external" size={14} /> Visit store</a>
      </PageHead>
      <div className="adm-theme">
        <div className="adm-browser">
          <div className="adm-browser__bar"><i /><i /><i /><span style={{ marginLeft: 8 }}>{site.replace(/^https?:\/\//, '')}</span></div>
          <iframe src="/" title="Storefront preview" loading="lazy" />
        </div>
        <section className="adm-card">
          <h2>Current theme</h2>
          <p className="adm-card__sub">The J Effect · Editorial</p>
          <dl className="adm-kv">
            <div><dt>Framework</dt><dd>Next.js on Vercel</dd></div>
            <div><dt>Fonts</dt><dd>Cormorant Garamond, DM Sans</dd></div>
            <div><dt>Palette</dt><dd>Forest, cream, gold</dd></div>
            <div><dt>Access</dt><dd>View only (no theme editing)</dd></div>
          </dl>
          <div className="adm-actions" style={{ marginTop: 14 }}>
            <Link href="/admin/online-store/pages" className="adm-btn">Pages</Link>
            <Link href="/admin/content/menus" className="adm-btn">Navigation</Link>
            <Link href="/admin/settings/announcement" className="adm-btn">Announcement bar</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
