import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabasePublicConfig } from './config'

export async function createSupabaseServerClient() {
  const config = getSupabasePublicConfig()

  if (!config) {
    throw new Error('Supabase environment variables are missing.')
  }

  const cookieStore = await cookies()

  return createServerClient(config.url, config.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options)
          }
        } catch {
          // Server components cannot always modify cookies.
          // Authentication actions can update them when needed.
        }
      },
    },
  })
}
