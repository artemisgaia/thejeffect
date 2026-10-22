import ResourcePage, { titleFor } from '../../_ui/resource-page';

export const dynamic = 'force-dynamic';
export const metadata = { title: titleFor(['products', 'gift-cards']) };

export default async function Page({ searchParams }) {
  return <ResourcePage parts={['products', 'gift-cards']} searchParams={await searchParams} />;
}
