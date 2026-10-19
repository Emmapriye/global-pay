'use client'

import { useId } from 'react'
import { CURRENCIES, type CurrencyCode } from '@/lib/money/currencies'
import { sanitizeAmountInput } from '@/lib/money/parse'
import { cn } from '@/lib/utils'

type AmountInputProps = {
  label: string
  currency: CurrencyCode
  /** Raw text the user typed, e.g. "1250.5". Parsing lives in lib/money. */
  value: string
  onChange: (value: string) => void
  error?: string
  hint?: string
  readOnly?: boolean
  /** Slot for a currency selector rendered inside the field. */
  trailing?: React.ReactNode
  className?: string
  id?: string
}

export function AmountInput({
  label,
  currency,
  value,
  onChange,
  error,
  hint,
  readOnly = false,
  trailing,
  className,
  id,
}: AmountInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
  const { symbol, decimals } = CURRENCIES[currency]

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={inputId} className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div
        className={cn(
          'flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 transition-shadow focus-within:ring-3',
          error ? 'border-destructive focus-within:ring-destructive/20' : 'border-input focus-within:ring-ring/40',
          readOnly && 'bg-muted',
        )}
      >
        <span className="text-xl font-semibold text-muted-foreground" aria-hidden="true">
          {symbol}
        </span>
        <input
          id={inputId}
          inputMode={decimals === 0 ? 'numeric' : 'decimal'}
          autoComplete="off"
          placeholder={decimals === 0 ? '0' : '0.00'}
          value={value}
          readOnly={readOnly}
          onChange={(event) => onChange(sanitizeAmountInput(event.target.value, currency))}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="tabular min-w-0 flex-1 bg-transparent text-2xl font-semibold tracking-tight outline-none placeholder:text-muted-foreground/50 read-only:cursor-default"
        />
        {trailing}
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="text-xs font-medium text-destructive" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
