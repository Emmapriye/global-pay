/**
 * Supabase integration boundary.
 *
 * The app ships in demo mode. It only switches to Supabase once both public
 * env vars are present AND a Supabase repository has been implemented in
 * `lib/data/supabase-repository.ts`. The service-role key must never be
 * referenced from client code — only from server-only modules.
 */
export type SupabasePublicConfig = {
  url: string
  anonKey: string
}

export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) return null
  return { url, anonKey }
}

export function isSupabaseConfigured(): boolean {
  return getSupabasePublicConfig() !== null
}
