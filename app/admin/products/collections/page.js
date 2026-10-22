import ResourcePage, { titleFor } from '../../_ui/resource-page';

export const dynamic = 'force-dynamic';
export const metadata = { title: titleFor(['products', 'collections']) };

export default async function Page({ searchParams }) {
  return <ResourcePage parts={['products', 'collections']} searchParams={await searchParams} />;
}
