import { ShieldAlert } from 'lucide-react'

export function DemoBanner() {
  return (
    <div
      role="note"
      aria-label="Demo notice"
      className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-charcoal px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal-foreground sm:text-xs"
    >
      <ShieldAlert className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
      <span>No real money transfers</span>
      <span className="hidden font-normal normal-case tracking-normal text-charcoal-foreground/70 sm:inline">
        {'· Demo environment with simulated balances and rates'}
      </span>
    </div>
  )
}
