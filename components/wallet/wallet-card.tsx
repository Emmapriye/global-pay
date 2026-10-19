import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { CurrencyBadge } from '@/components/money/currency-badge'
import { Money } from '@/components/money/money'
import { CURRENCIES } from '@/lib/money/currencies'
import type { Wallet } from '@/lib/types'
import { cn } from '@/lib/utils'

type WalletCardProps = {
  wallet: Wallet
  hidden?: boolean
  href?: string
  className?: string
}

export function WalletCard({ wallet, hidden = false, href, className }: WalletCardProps) {
  const currency = CURRENCIES[wallet.currency]

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <CurrencyBadge currency={wallet.currency} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{currency.code}</span>
            <span className="text-xs text-muted-foreground">{currency.name}</span>
          </div>
        </div>
        {href && (
          <ArrowUpRight
            className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Demo balance</span>
        <Money
          amountMinor={wallet.balanceMinor}
          currency={wallet.currency}
          hidden={hidden}
          emphasizeWhole
          className="text-2xl font-semibold tracking-tight"
          fractionClassName="text-lg"
        />
      </div>

      <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
        <span className="tabular">{wallet.accountLabel}</span>
        {wallet.pendingMinor > 0 ? (
          <span>
            <Money amountMinor={wallet.pendingMinor} currency={wallet.currency} hidden={hidden} /> pending
          </span>
        ) : (
          <span>No pending</span>
        )}
      </div>
    </>
  )

  const baseClass = cn(
    'group flex flex-col gap-5 rounded-2xl border bg-card p-4 text-card-foreground shadow-xs',
    className,
  )

  if (href) {
    return (
      <Link
        href={href}
        aria-label={`${currency.name} wallet`}
        className={cn(
          baseClass,
          'transition-colors hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        )}
      >
        {content}
      </Link>
    )
  }

  return <article className={baseClass} aria-label={`${currency.name} wallet`}>{content}</article>
}
