import { MobileNav } from '@/components/app-shell/mobile-nav'
import { Sidebar } from '@/components/app-shell/sidebar'
import { getRepository } from '@/lib/data'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getRepository().getCurrentUser()

  return (
    <div className="flex min-h-[calc(100dvh-2rem)]">
      <Sidebar userName={user.fullName} userEmail={user.email} />
      <div className="flex min-w-0 flex-1 flex-col pb-24 lg:pb-0">{children}</div>
      <MobileNav />
    </div>
  )
}
