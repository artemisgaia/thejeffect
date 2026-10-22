import Link from 'next/link';
import { PageHead } from '../../_ui/parts';

export const metadata = { title: 'Reports' };

const REPORTS = [
  ['Sales over time', 'Sales', '/admin/analytics'], ['Sales by product', 'Sales', '/admin/analytics'], ['Average order value over time', 'Sales', '/admin/analytics'],
  ['Sessions over time', 'Acquisition', '/admin/analytics'], ['Sessions by traffic source', 'Acquisition', '/admin/growth/attribution'], ['Sessions by device type', 'Acquisition', '/admin/analytics'],
  ['Conversion rate breakdown', 'Behavior', '/admin/analytics'], ['Top pages', 'Behavior', '/admin/analytics'], ['Visitors right now', 'Behavior', '/admin/analytics/live'],
  ['Returning customer rate', 'Customers', '/admin/analytics'], ['New vs returning customers', 'Customers', '/admin/customers'], ['Monthly history (Private Office)', 'Finance', '/admin/analytics'],
];

export default function Reports() {
  return (
    <>
      <PageHead title="Reports" icon="chart" />
      <div className="adm-table-wrap">
        <div className="adm-table-scroll">
          <table className="adm-table">
            <thead><tr><th>Name</th><th>Category</th><th>Created by</th></tr></thead>
            <tbody>{REPORTS.map(([n, c, h]) => (<tr key={n}><td><Link href={h} className="adm-link">{n}</Link></td><td><span className="adm-pill">{c}</span></td><td>The J Effect</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
