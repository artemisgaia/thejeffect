import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { SUPABASE_URL, SUPABASE_ANON_KEY, supabaseConfigured } from '@/lib/supabase/config';

// Runs on /admin only: refreshes the Supabase session cookie and bounces
// signed-out visitors to the login page. This is an optimistic check; every
// admin page and action re-verifies with requireAdmin() (lib/admin/auth.js).
export async function proxy(request) {
  let response = NextResponse.next({ request });
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');

  if (!supabaseConfigured) return response;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(toSet) {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        response.headers.set('X-Robots-Tag', 'noindex, nofollow');
        toSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  if (!user && pathname !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  if (user && pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  return response;
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
