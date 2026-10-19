'use client'

import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { CURRENCIES, CURRENCY_CODES, isCurrencyCode, type CurrencyCode } from '@/lib/money/currencies'
import { cn } from '@/lib/utils'
import { CurrencyBadge } from './currency-badge'

type CurrencySelectorProps = {
  value: CurrencyCode
  onChange: (value: CurrencyCode) => void
  label: string
  /** Visually hide the label while keeping it accessible. */
  hideLabel?: boolean
  options?: readonly CurrencyCode[]
  disabledOptions?: readonly CurrencyCode[]
  tone?: 'default' | 'inverted'
  size?: 'sm' | 'md'
  className?: string
  id?: string
}

/**
 * Native <select> under a styled shell — keeps full keyboard and
 * screen-reader support on every platform.
 */
export function CurrencySelector({
  value,
  onChange,
  label,
  hideLabel = false,
  options = CURRENCY_CODES,
  disabledOptions = [],
  tone = 'default',
  size = 'md',
  className,
  id,
}: CurrencySelectorProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={selectId}
        className={cn(
          'text-xs font-medium',
          tone === 'inverted' ? 'text-charcoal-foreground/70' : 'text-muted-foreground',
          hideLabel && 'sr-only',
        )}
      >
        {label}
      </label>
      <div
        className={cn(
          'relative flex items-center gap-2 rounded-full border transition-colors focus-within:ring-3 focus-within:ring-ring/40',
          tone === 'inverted'
            ? 'border-white/15 bg-white/10 text-charcoal-foreground hover:bg-white/15'
            : 'border-input bg-card text-foreground hover:bg-muted',
          size === 'sm' ? 'h-8 pl-1 pr-7' : 'h-11 pl-1.5 pr-9',
        )}
      >
        <CurrencyBadge currency={value} size={size === 'sm' ? 'sm' : 'md'} className={size === 'sm' ? 'size-6' : 'size-8'} />
        <span className={cn('font-semibold', size === 'sm' ? 'text-xs' : 'text-sm')}>{value}</span>
        <select
          id={selectId}
          value={value}
          onChange={(event) => {
            if (isCurrencyCode(event.target.value)) onChange(event.target.value)
          }}
          className="absolute inset-0 cursor-pointer appearance-none rounded-full opacity-0"
        >
          {options.map((code) => (
            <option key={code} value={code} disabled={disabledOptions.includes(code)}>
              {`${code} — ${CURRENCIES[code].name}`}
            </option>
          ))}
        </select>
        <ChevronDown
          className={cn(
            'pointer-events-none absolute opacity-70',
            size === 'sm' ? 'right-2 size-3.5' : 'right-3 size-4',
          )}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
