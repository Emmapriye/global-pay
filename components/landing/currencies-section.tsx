import { CurrencyBadge } from '@/components/money/currency-badge'
import { CURRENCIES, CURRENCY_CODES } from '@/lib/money/currencies'
import { formatMoney } from '@/lib/money/format'

const SAMPLE_MINOR: Record<(typeof CURRENCY_CODES)[number], number> = {
  USD: 1_234_567,
  GBP: 1_234_567,
  EUR: 1_234_567,
  JPY: 1_234_567,
}

export function CurrenciesSection() {
  return (
    <section id="currencies" aria-labelledby="currencies-heading" className="scroll-mt-28 bg-background py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-primary">Currencies</span>
          <h2 id="currencies-heading" className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Four currencies, formatted like a local
          </h2>
          <p className="text-pretty text-muted-foreground">
            Yen has no decimal places, euros read the European way, and every amount is stored in minor units to
            avoid rounding errors.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {CURRENCY_CODES.map((code) => (
            <li key={code} className="flex flex-col gap-4 rounded-2xl border bg-card p-4 shadow-xs">
              <div className="flex items-center gap-2.5">
                <CurrencyBadge currency={code} size="sm" />
                <span className="text-sm font-semibold">{code}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="tabular truncate text-lg font-semibold">{formatMoney(SAMPLE_MINOR[code], code)}</span>
                <span className="text-xs text-muted-foreground">{CURRENCIES[code].name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
