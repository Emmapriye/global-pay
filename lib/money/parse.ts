import { CURRENCIES, type CurrencyCode } from './currencies'
import type { MinorAmount } from './format'

/** Restricts free text to digits and the currency's allowed decimal places. */
export function sanitizeAmountInput(raw: string, currency: CurrencyCode): string {
  const { decimals } = CURRENCIES[currency]
  let cleaned = raw.replace(/,/g, '.').replace(/[^\d.]/g, '')
  if (decimals === 0) return cleaned.replace(/\./g, '').replace(/^0+(?=\d)/, '')
  const [whole, ...rest] = cleaned.split('.')
  cleaned = rest.length ? `${whole}.${rest.join('').slice(0, decimals)}` : whole
  return cleaned.replace(/^0+(?=\d)/, '')
}

/**
 * Parses sanitized input into an integer minor-unit amount using string
 * arithmetic (no floating point). Returns null when the input is empty
 * or not a valid number.
 */
export function parseAmountToMinor(input: string, currency: CurrencyCode): MinorAmount | null {
  const { decimals } = CURRENCIES[currency]
  if (!/^\d+(\.\d*)?$/.test(input)) return null
  const [whole, fraction = ''] = input.split('.')
  const padded = fraction.padEnd(decimals, '0').slice(0, decimals)
  const value = Number(`${whole}${padded}`)
  return Number.isSafeInteger(value) ? value : null
}

/** Converts a minor amount back to an editable string (no grouping). */
export function minorToInput(amountMinor: MinorAmount, currency: CurrencyCode): string {
  const { decimals } = CURRENCIES[currency]
  if (decimals === 0) return String(amountMinor)
  const str = String(amountMinor).padStart(decimals + 1, '0')
  return `${str.slice(0, -decimals)}.${str.slice(-decimals)}`
}
