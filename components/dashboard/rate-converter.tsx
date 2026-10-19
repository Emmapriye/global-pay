'use client'

import { useState } from 'react'
import { ArrowDownUp } from 'lucide-react'
import { AmountInput } from '@/components/money/amount-input'
import { CurrencySelector } from '@/components/money/currency-selector'
import { Money } from '@/components/money/money'
import type { CurrencyCode } from '@/lib/money/currencies'
import { formatRate } from '@/lib/money/format'
import { minorToInput, parseAmountToMinor } from '@/lib/money/parse'
import { convertMinor, getRate, type RateTable } from '@/lib/money/rates'

type RateConverterProps = {
  rates: RateTable
  defaultFrom: CurrencyCode
}

export function RateConverter({ rates, defaultFrom }: RateConverterProps) {
  const [from, setFrom] = useState<CurrencyCode>(defaultFrom)
  const [to, setTo] = useState<CurrencyCode>(defaultFrom === 'GBP' ? 'EUR' : 'GBP')
  const [amount, setAmount] = useState(() => minorToInput(100_000, defaultFrom).replace(/\.00$/, ''))

  const amountMinor = parseAmountToMinor(amount, from)
  const converted = amountMinor === null ? null : convertMinor(amountMinor, from, to, rates)

  function swap() {
    setFrom(to)
    setTo(from)
    setAmount('')
  }

  function changeFrom(next: CurrencyCode) {
    if (next === to) setTo(from)
    setFrom(next)
    setAmount('')
  }

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-muted p-3">
      <span className="text-xs font-semibold text-muted-foreground">Quick converter</span>
      <AmountInput
        label="Amount to convert"
        currency={from}
        value={amount}
        onChange={setAmount}
        trailing={<CurrencySelector label="From currency" hideLabel value={from} onChange={changeFrom} size="sm" />}
      />
      <div className="flex items-center justify-between gap-2">
        <span className="tabular text-xs text-muted-foreground">
          {`1 ${from} = ${formatRate(getRate(rates, from, to))} ${to}`}
        </span>
        <button
          type="button"
          onClick={swap}
          className="flex size-8 items-center justify-center rounded-full border bg-card text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
          aria-label="Swap currencies"
        >
          <ArrowDownUp className="size-4" aria-hidden="true" />
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 rounded-lg border bg-card px-3 py-2.5">
        <output aria-live="polite" className="min-w-0 truncate text-lg font-semibold">
          {converted === null ? (
            <span className="text-muted-foreground">—</span>
          ) : (
            <Money amountMinor={converted} currency={to} />
          )}
        </output>
        <CurrencySelector
          label="To currency"
          hideLabel
          value={to}
          onChange={setTo}
          disabledOptions={[from]}
          size="sm"
        />
      </div>
    </div>
  )
}
