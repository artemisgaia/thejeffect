import ResourcePage, { titleFor } from '../../_ui/resource-page';

export const dynamic = 'force-dynamic';
export const metadata = { title: titleFor(['products', 'transfers']) };

export default async function Page({ searchParams }) {
  return <ResourcePage parts={['products', 'transfers']} searchParams={await searchParams} />;
}
