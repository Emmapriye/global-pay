'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { CurrencySelector } from '@/components/money/currency-selector'
import { Money } from '@/components/money/money'
import type { CurrencyCode } from '@/lib/money/currencies'
import type { MinorAmount } from '@/lib/money/format'
import { useBalanceVisibility } from './balance-visibility'
import { QuickActions } from './quick-actions'

type BalanceHeroProps = {
  firstName: string
  /** Pre-computed totals of all wallets, one per display currency. */
  totals: Record<CurrencyCode, MinorAmount>
  defaultCurrency: CurrencyCode
  walletCount: number
}

export function BalanceHero({ firstName, totals, defaultCurrency, walletCount }: BalanceHeroProps) {
  const [displayCurrency, setDisplayCurrency] = useState<CurrencyCode>(defaultCurrency)
  const { hidden, toggle } = useBalanceVisibility()

  return (
    <section
      aria-labelledby="balance-heading"
      className="relative overflow-hidden rounded-b-[2rem] bg-charcoal px-5 pb-6 pt-5 text-charcoal-foreground lg:rounded-3xl lg:p-8"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 size-64 rounded-full bg-brand/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-sm text-charcoal-foreground/70">Good to see you,</span>
            <span className="text-lg font-semibold">{firstName}</span>
          </div>
          <span className="rounded-full border border-brand/40 bg-brand/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
            Demo account
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h1 id="balance-heading" className="text-sm text-charcoal-foreground/70">
              Total demo balance
            </h1>
            <button
              type="button"
              onClick={toggle}
              aria-pressed={hidden}
              aria-label={hidden ? 'Show balances' : 'Hide balances'}
              className="rounded-full p-1.5 text-charcoal-foreground/70 transition-colors hover:bg-white/10 hover:text-charcoal-foreground focus-visible:outline-2 focus-visible:outline-brand"
            >
              {hidden ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
            </button>
          </div>
          <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
            <Money
              amountMinor={totals[displayCurrency]}
              currency={displayCurrency}
              hidden={hidden}
              emphasizeWhole
              className="text-[2.5rem] font-semibold leading-none tracking-tight sm:text-5xl"
              fractionClassName="text-2xl sm:text-3xl"
            />
            <CurrencySelector
              label="Display total in"
              hideLabel
              value={displayCurrency}
              onChange={setDisplayCurrency}
              tone="inverted"
              size="sm"
            />
          </div>
          <p className="text-xs text-charcoal-foreground/60">
            {`Across ${walletCount} wallets · converted at static demo rates`}
          </p>
        </div>

        <QuickActions />
      </div>
    </section>
  )
}
