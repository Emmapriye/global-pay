'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { isActivePath, NAV_ITEMS } from './nav-items'

export function MobileNav() {
  const pathname = usePathname()
  const items = NAV_ITEMS.filter((item) => item.mobile)

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2">
        {items.map((item) => {
          const active = isActivePath(pathname, item.href)
          const Icon = item.icon
          const isSend = item.href === '/send'
          return (
            <li key={item.href} className="flex flex-1">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring',
                  active ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {isSend ? (
                  <span
                    className="-mt-6 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-background"
                    aria-hidden="true"
                  >
                    <Icon className="size-5" />
                  </span>
                ) : (
                  <Icon className="size-5" aria-hidden="true" />
                )}
                <span>{isSend ? 'Send' : item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
