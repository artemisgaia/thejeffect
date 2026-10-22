'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LiveRefresh() {
  const router = useRouter();
  useEffect(() => { const t = setInterval(() => router.refresh(), 15000); return () => clearInterval(t); }, [router]);
  return <span className="adm-badge adm-badge--info"><i className="fill" />Live</span>;
}
