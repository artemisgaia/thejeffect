import ResourcePage, { titleFor } from '../_ui/resource-page';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { path } = await params;
  return { title: titleFor(path) };
}

export default async function AdminCatchAll({ params, searchParams }) {
  const { path } = await params;
  return <ResourcePage parts={path} searchParams={await searchParams} />;
}
