import { Check, Loader2 } from 'lucide-react'
import { CurrencyBadge } from '@/components/money/currency-badge'
import { Money } from '@/components/money/money'
import { DEMO_RATES } from '@/lib/demo/data'
import { formatRate } from '@/lib/money/format'
import { convertMinor, getRate } from '@/lib/money/rates'

const PREVIEW_SEND_MINOR = 50_000

/** Decorative product preview. Values come from the same money utilities as the app. */
export function HeroPreview() {
  const received = convertMinor(PREVIEW_SEND_MINOR, 'GBP', 'JPY', DEMO_RATES)
  const rate = getRate(DEMO_RATES, 'GBP', 'JPY')

  return (
    <div className="relative mx-auto w-full max-w-sm lg:max-w-md" aria-hidden="true">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur">
        <div className="flex flex-col gap-3 rounded-[1.5rem] bg-card p-4 text-card-foreground">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">You send</span>
            <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Simulated
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl border p-3">
            <Money amountMinor={PREVIEW_SEND_MINOR} currency="GBP" className="text-2xl font-semibold" />
            <span className="flex items-center gap-2 text-sm font-semibold">
              <CurrencyBadge currency="GBP" size="sm" />
              GBP
            </span>
          </div>
          <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
            <span className="tabular">{`1 GBP = ${formatRate(rate)} JPY`}</span>
            <span>Fee shown before you confirm</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-accent p-3">
            <div className="flex flex-col">
              <span className="text-xs text-accent-foreground/80">Recipient gets</span>
              <Money amountMinor={received} currency="JPY" className="text-2xl font-semibold text-accent-foreground" />
            </div>
            <span className="flex items-center gap-2 text-sm font-semibold text-accent-foreground">
              <CurrencyBadge currency="JPY" size="sm" />
              JPY
            </span>
          </div>

          <ol className="flex flex-col gap-2 border-t pt-3">
            {[
              { label: 'Created', state: 'done' },
              { label: 'Converting', state: 'done' },
              { label: 'Sending', state: 'current' },
            ].map((step) => (
              <li key={step.label} className="flex items-center gap-2.5 text-sm">
                <span
                  className={
                    step.state === 'done'
                      ? 'flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground'
                      : 'flex size-5 items-center justify-center rounded-full border-2 border-primary text-primary'
                  }
                >
                  {step.state === 'done' ? (
                    <Check className="size-3" strokeWidth={3} />
                  ) : (
                    <Loader2 className="size-3 animate-spin motion-reduce:animate-none" />
                  )}
                </span>
                <span className={step.state === 'current' ? 'font-medium' : 'text-muted-foreground'}>
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border bg-card p-3 text-card-foreground shadow-xl sm:block">
        <div className="flex items-center gap-2.5">
          <CurrencyBadge currency="EUR" size="sm" />
          <div className="flex flex-col">
            <span className="text-[11px] text-muted-foreground">EUR wallet</span>
            <Money amountMinor={421_890} currency="EUR" className="text-sm font-semibold" />
          </div>
        </div>
      </div>
    </div>
  )
}
