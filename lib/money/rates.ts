import type { CurrencyCode } from './currencies'
import { toMajor, toMinor, type MinorAmount } from './format'

/**
 * Exchange rates expressed as "units of currency per 1 USD".
 * `source` makes it explicit whether the numbers are static demo values
 * or came from a configured rates provider.
 */
export type RateTable = {
  base: 'USD'
  rates: Record<CurrencyCode, number>
  /** Previous snapshot, used to show a directional change. */
  previous: Record<CurrencyCode, number>
  asOf: string
  source: 'demo' | 'provider'
}

export function getRate(table: RateTable, from: CurrencyCode, to: CurrencyCode): number {
  if (from === to) return 1
  return table.rates[to] / table.rates[from]
}

export function getRateChange(table: RateTable, from: CurrencyCode, to: CurrencyCode): number {
  const current = getRate(table, from, to)
  const previous = from === to ? 1 : table.previous[to] / table.previous[from]
  return previous === 0 ? 0 : (current - previous) / previous
}

export function convertMinor(
  amountMinor: MinorAmount,
  from: CurrencyCode,
  to: CurrencyCode,
  table: RateTable,
): MinorAmount {
  return toMinor(toMajor(amountMinor, from) * getRate(table, from, to), to)
}

export function sumInCurrency(
  balances: { currency: CurrencyCode; balanceMinor: MinorAmount }[],
  target: CurrencyCode,
  table: RateTable,
): MinorAmount {
  return balances.reduce(
    (total, wallet) => total + convertMinor(wallet.balanceMinor, wallet.currency, target, table),
    0,
  )
}
