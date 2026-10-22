import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NextResponse } from 'next/server';
import { getAdmin } from '@/lib/admin/auth';

// The financial dashboard is not a public file. It lives in /private and is only
// served here, to a signed-in admin (the proxy also redirects signed-out visitors).
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const admin = await getAdmin();
  if (!admin) return NextResponse.redirect(new URL('/admin/login', request.url));
  const html = await readFile(join(process.cwd(), 'private', 'dashboard.html'), 'utf8');
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
