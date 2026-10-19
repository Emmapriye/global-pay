import { CURRENCIES, type CurrencyCode } from '@/lib/money/currencies'
import { cn } from '@/lib/utils'

const TONES: Record<CurrencyCode, string> = {
  USD: 'bg-emerald-100 text-emerald-800',
  GBP: 'bg-slate-200 text-slate-800',
  EUR: 'bg-teal-100 text-teal-800',
  JPY: 'bg-zinc-200 text-zinc-800',
}

type CurrencyBadgeProps = {
  currency: CurrencyCode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CurrencyBadge({ currency, size = 'md', className }: CurrencyBadgeProps) {
  const { symbol } = CURRENCIES[currency]
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold',
        TONES[currency],
        size === 'sm' && 'size-7 text-xs',
        size === 'md' && 'size-9 text-sm',
        size === 'lg' && 'size-11 text-base',
        className,
      )}
    >
      {symbol}
    </span>
  )
}
