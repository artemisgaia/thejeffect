// Public Supabase settings. Both values are safe to expose to the browser;
// row-level security (supabase/schema.sql) is what protects the data.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// Hostname used to allow Supabase Storage URLs in next/image.
export function supabaseHostname() {
  try {
    return SUPABASE_URL ? new URL(SUPABASE_URL).hostname : null;
  } catch {
    return null;
  }
}
