export const CURRENCY_CODES = ['USD', 'GBP', 'EUR', 'JPY'] as const

export type CurrencyCode = (typeof CURRENCY_CODES)[number]

export type Currency = {
  code: CurrencyCode
  name: string
  shortName: string
  symbol: string
  /** Number of digits in the minor unit (cents = 2, yen = 0). */
  decimals: number
  /** Locale used for display formatting so each currency reads naturally. */
  locale: string
  region: string
}

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: {
    code: 'USD',
    name: 'US Dollar',
    shortName: 'Dollar',
    symbol: '$',
    decimals: 2,
    locale: 'en-US',
    region: 'United States',
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    shortName: 'Pound',
    symbol: '£',
    decimals: 2,
    locale: 'en-GB',
    region: 'United Kingdom',
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    shortName: 'Euro',
    symbol: '€',
    decimals: 2,
    locale: 'de-DE',
    region: 'Eurozone',
  },
  JPY: {
    code: 'JPY',
    name: 'Japanese Yen',
    shortName: 'Yen',
    symbol: '¥',
    decimals: 0,
    locale: 'en-JP',
    region: 'Japan',
  },
}

export function isCurrencyCode(value: string): value is CurrencyCode {
  return (CURRENCY_CODES as readonly string[]).includes(value)
}

export function getCurrency(code: CurrencyCode): Currency {
  return CURRENCIES[code]
}
