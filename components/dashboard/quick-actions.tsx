import Link from 'next/link'
import { ArrowLeftRight, Send, UserPlus, Wallet } from 'lucide-react'

const ACTIONS = [
  { href: '/send', label: 'Send', icon: Send, primary: true },
  { href: '/send?to=self', label: 'Convert', icon: ArrowLeftRight },
  { href: '/wallets', label: 'Wallets', icon: Wallet },
  { href: '/recipients', label: 'Recipients', icon: UserPlus },
] as const

export function QuickActions() {
  return (
    <nav aria-label="Quick actions">
      <ul className="grid grid-cols-4 gap-2">
        {ACTIONS.map((action) => {
          const Icon = action.icon
          const primary = 'primary' in action && action.primary
          return (
            <li key={action.label}>
              <Link
                href={action.href}
                className="group flex flex-col items-center gap-2 rounded-xl py-1 text-xs font-medium text-charcoal-foreground/90 focus-visible:outline-2 focus-visible:outline-brand"
              >
                <span
                  className={
                    primary
                      ? 'flex size-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground transition-transform group-hover:scale-105 motion-reduce:transition-none'
                      : 'flex size-12 items-center justify-center rounded-2xl bg-white/10 text-charcoal-foreground transition-colors group-hover:bg-white/15'
                  }
                  aria-hidden="true"
                >
                  <Icon className="size-5" />
                </span>
                {action.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
