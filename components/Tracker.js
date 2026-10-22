'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { track } from '@/lib/track';

export default function Tracker() {
  const pathname = usePathname();
  useEffect(() => { track('pageview'); }, [pathname]);
  return null;
}
