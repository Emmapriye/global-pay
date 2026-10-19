import type { CurrencyCode } from '@/lib/money/currencies'
import { formatMoney, splitMoney, type MinorAmount } from '@/lib/money/format'
import { cn } from '@/lib/utils'

type MoneyProps = {
  amountMinor: MinorAmount
  currency: CurrencyCode
  hidden?: boolean
  signed?: boolean
  /** Render the fractional part smaller and muted (for hero balances). */
  emphasizeWhole?: boolean
  className?: string
  fractionClassName?: string
}

/** Presentational only: receives an already-calculated amount and formats it. */
export function Money({
  amountMinor,
  currency,
  hidden = false,
  signed = false,
  emphasizeWhole = false,
  className,
  fractionClassName,
}: MoneyProps) {
  if (hidden) {
    return (
      <span className={cn('tabular', className)}>
        <span aria-hidden="true">••••••</span>
        <span className="sr-only">Balance hidden</span>
      </span>
    )
  }

  if (emphasizeWhole) {
    const { whole, fraction } = splitMoney(amountMinor, currency)
    return (
      <span className={cn('tabular', className)}>
        {whole}
        {fraction && <span className={cn('opacity-60', fractionClassName)}>{fraction}</span>}
      </span>
    )
  }

  return (
    <span className={cn('tabular', className)}>{formatMoney(amountMinor, currency, { signed })}</span>
  )
}
