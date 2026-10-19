import { TrendingDown, TrendingUp } from 'lucide-react'
import { CurrencyBadge } from '@/components/money/currency-badge'
import { CURRENCY_CODES, type CurrencyCode } from '@/lib/money/currencies'
import { formatRate } from '@/lib/money/format'
import { getRate, getRateChange, type RateTable } from '@/lib/money/rates'
import { formatDateTime } from '@/lib/format-date'
import { cn } from '@/lib/utils'
import { RateConverter } from './rate-converter'
import { SectionHeading } from './section-heading'

type ExchangeRatesCardProps = {
  rates: RateTable
  base: CurrencyCode
}

export function ExchangeRatesCard({ rates, base }: ExchangeRatesCardProps) {
  const quotes = CURRENCY_CODES.filter((code) => code !== base).map((code) => ({
    code,
    rate: getRate(rates, base, code),
    change: getRateChange(rates, base, code),
  }))

  return (
    <section aria-labelledby="rates-heading" className="flex flex-col gap-3">
      <SectionHeading
        id="rates-heading"
        title="Exchange rates"
        meta={
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {rates.source === 'demo' ? 'Static demo' : 'Indicative'}
          </span>
        }
      />
      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-4 shadow-xs">
        <ul className="flex flex-col divide-y">
          {quotes.map((quote) => {
            const up = quote.change >= 0
            return (
              <li key={quote.code} className="flex items-center justify-between gap-3 py-2.5 first:pt-0">
                <div className="flex items-center gap-3">
                  <CurrencyBadge currency={quote.code} size="sm" />
                  <span className="text-sm font-medium">
                    {base}
                    <span className="mx-1 text-muted-foreground" aria-hidden="true">
                      /
                    </span>
                    <span className="sr-only"> to </span>
                    {quote.code}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="tabular text-sm font-semibold">{formatRate(quote.rate)}</span>
                  <span
                    className={cn(
                      'tabular flex w-16 items-center justify-end gap-0.5 text-xs font-medium',
                      up ? 'text-primary' : 'text-destructive',
                    )}
                  >
                    {up ? (
                      <TrendingUp className="size-3.5" aria-hidden="true" />
                    ) : (
                      <TrendingDown className="size-3.5" aria-hidden="true" />
                    )}
                    <span className="sr-only">{up ? 'Up' : 'Down'}</span>
                    {`${Math.abs(quote.change * 100).toFixed(2)}%`}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>

        <RateConverter rates={rates} defaultFrom={base} />

        <p className="text-[11px] text-muted-foreground">
          {`Rates are fixed demo values as of ${formatDateTime(rates.asOf)}. No live rates provider is connected.`}
        </p>
      </div>
    </section>
  )
}
