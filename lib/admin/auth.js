import 'server-only';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { supabaseConfigured } from '@/lib/supabase/config';

// Returns { supabase, user } for a signed-in admin, otherwise null.
// "Admin" means the user's email is in public.admins (see supabase/schema.sql).
export async function getAdmin() {
  if (!supabaseConfigured) return null;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: isAdmin } = await supabase.rpc('is_admin');
  return isAdmin ? { supabase, user } : null;
}

// Call at the top of every admin page and server action. The proxy only does
// an optimistic redirect; this is the check that actually protects the data.
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect('/admin/login');
  return admin;
}
