import { Check, Loader2, X } from 'lucide-react'
import { getTimelineStates, TRANSFER_STEPS, type StepState } from '@/lib/transfers/status'
import type { TransferStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

const STATE_LABEL: Record<StepState, string> = {
  complete: 'complete',
  current: 'in progress',
  upcoming: 'not started',
  failed: 'failed',
}

export function TransferTimeline({ status }: { status: TransferStatus }) {
  const states = getTimelineStates(status)

  return (
    <div className="flex flex-col gap-4">
      <ol className="flex flex-col" aria-label="Simulated transfer progress">
        {TRANSFER_STEPS.map((step, index) => {
          const state = states[index]
          const isLast = index === TRANSFER_STEPS.length - 1
          return (
            <li key={step.status} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast && (
                <span
                  className={cn(
                    'absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5',
                    state === 'complete' ? 'bg-primary' : 'bg-border',
                  )}
                  aria-hidden="true"
                />
              )}
              <span
                className={cn(
                  'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2',
                  state === 'complete' && 'border-primary bg-primary text-primary-foreground',
                  state === 'current' && 'border-primary bg-card text-primary',
                  state === 'upcoming' && 'border-border bg-card text-muted-foreground',
                  state === 'failed' && 'border-destructive bg-destructive text-white',
                )}
                aria-hidden="true"
              >
                {state === 'complete' && <Check className="size-4" strokeWidth={3} />}
                {state === 'current' && <Loader2 className="size-4 animate-spin motion-reduce:animate-none" />}
                {state === 'failed' && <X className="size-4" strokeWidth={3} />}
                {state === 'upcoming' && <span className="text-xs font-semibold">{index + 1}</span>}
              </span>
              <div className="flex flex-col gap-0.5 pt-1">
                <span
                  className={cn(
                    'text-sm font-semibold',
                    state === 'upcoming' && 'text-muted-foreground',
                    state === 'failed' && 'text-destructive',
                  )}
                >
                  {step.label}
                  <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Simulated
                  </span>
                  <span className="sr-only">{`, ${STATE_LABEL[state]}`}</span>
                </span>
                <span className="text-xs text-muted-foreground">{step.description}</span>
              </div>
            </li>
          )
        })}
      </ol>
      <p className="rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground">
        This timeline is a simulation. GLOBAL PAY demo does not connect to any bank or payment network,
        and no funds are delivered to a real account.
      </p>
    </div>
  )
}
