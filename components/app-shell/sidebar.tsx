'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/brand/logo'
import { cn } from '@/lib/utils'
import { isActivePath, NAV_ITEMS } from './nav-items'

type SidebarProps = {
  userName: string
  userEmail: string
}

export function Sidebar({ userName, userEmail }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="sticky top-8 hidden h-[calc(100dvh-2rem)] w-64 shrink-0 flex-col border-r bg-sidebar px-4 py-6 lg:flex">
      <Logo href="/dashboard" className="px-2" />

      <nav aria-label="Main" className="mt-8 flex-1">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.href)
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring',
                    active
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <Icon className={cn('size-4.5', active && 'text-primary')} aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="flex flex-col gap-3">
        <div className="rounded-xl bg-accent p-3 text-xs text-accent-foreground">
          <p className="font-semibold">Demo mode</p>
          <p className="mt-0.5 text-pretty opacity-80">
            Balances, rates and transfers are simulated. Supabase is not connected yet.
          </p>
        </div>
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
        >
          <span
            className="flex size-9 items-center justify-center rounded-full bg-charcoal text-xs font-semibold text-charcoal-foreground"
            aria-hidden="true"
          >
            {getInitials(userName)}
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">{userName}</span>
            <span className="truncate text-xs text-muted-foreground">{userEmail}</span>
          </span>
        </Link>
      </div>
    </aside>
  )
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
