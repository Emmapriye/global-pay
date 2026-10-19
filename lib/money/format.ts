import { CURRENCIES, type CurrencyCode } from './currencies'

/**
 * All monetary values in the app are integers in the currency's minor unit
 * (cents, pence, yen) to avoid floating-point drift.
 */
export type MinorAmount = number

export function toMajor(amountMinor: MinorAmount, currency: CurrencyCode): number {
  return amountMinor / 10 ** CURRENCIES[currency].decimals
}

export function toMinor(amountMajor: number, currency: CurrencyCode): MinorAmount {
  return Math.round(amountMajor * 10 ** CURRENCIES[currency].decimals)
}

const formatterCache = new Map<string, Intl.NumberFormat>()

function getFormatter(currency: CurrencyCode, options: Intl.NumberFormatOptions) {
  const key = `${currency}:${JSON.stringify(options)}`
  let formatter = formatterCache.get(key)
  if (!formatter) {
    const { locale, decimals } = CURRENCIES[currency]
    formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      ...options,
    })
    formatterCache.set(key, formatter)
  }
  return formatter
}

type FormatOptions = {
  /** Prefix positive values with "+" (useful for incoming activity). */
  signed?: boolean
  /** Compact notation, e.g. "$12.4K". */
  compact?: boolean
}

export function formatMoney(
  amountMinor: MinorAmount,
  currency: CurrencyCode,
  { signed = false, compact = false }: FormatOptions = {},
): string {
  const options: Intl.NumberFormatOptions = {}
  if (signed) options.signDisplay = 'exceptZero'
  if (compact) {
    options.notation = 'compact'
    options.minimumFractionDigits = 0
    options.maximumFractionDigits = 1
  }
  return getFormatter(currency, options).format(toMajor(amountMinor, currency))
}

/** Splits a formatted amount so the fractional part can be styled separately. */
export function splitMoney(amountMinor: MinorAmount, currency: CurrencyCode) {
  const parts = getFormatter(currency, {}).formatToParts(toMajor(amountMinor, currency))
  let whole = ''
  let fraction = ''
  let afterDecimal = false
  for (const part of parts) {
    if (part.type === 'decimal') {
      afterDecimal = true
      fraction += part.value
    } else if (afterDecimal && part.type === 'fraction') {
      fraction += part.value
    } else if (afterDecimal) {
      fraction += part.value
    } else {
      whole += part.value
    }
  }
  return { whole, fraction }
}

export function formatRate(rate: number): string {
  const digits = rate >= 100 ? 2 : 4
  return rate.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}
