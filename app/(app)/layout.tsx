import { redirect } from 'next/navigation'
import { MobileNav } from '@/components/app-shell/mobile-nav'
import { Sidebar } from '@/components/app-shell/sidebar'
import { signOut } from '@/app/(auth)/actions'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServerClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  const fullName =
    typeof user.user_metadata?.full_name === 'string'
      ? user.user_metadata.full_name
      : ''

  const userName = fullName || user.email?.split('@')[0] || 'Account'

  return (
    <div className="flex min-h-[calc(100dvh-2rem)]">
      <Sidebar userName={userName} userEmail={user.email ?? ''} />

      <div className="flex min-w-0 flex-1 flex-col pb-24 lg:pb-0">
        <div className="flex justify-end px-4 pt-4 lg:px-8">
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-lg border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5"
            >
              Sign out
            </button>
          </form>
        </div>

        {children}
      </div>

      <MobileNav />
    </div>
  )
}
