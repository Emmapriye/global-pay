import { getStatusTone, STATUS_LABEL } from '@/lib/transfers/status'
import type { TransferStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

const TONE_CLASS = {
  success: 'bg-emerald-50 text-emerald-800 ring-emerald-600/20',
  progress: 'bg-amber-50 text-amber-800 ring-amber-600/25',
  danger: 'bg-red-50 text-red-700 ring-red-600/20',
  neutral: 'bg-muted text-muted-foreground ring-border',
} as const

export function StatusBadge({ status, className }: { status: TransferStatus; className?: string }) {
  const tone = getStatusTone(status)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset',
        TONE_CLASS[tone],
        className,
      )}
    >
      <span
        className={cn(
          'size-1.5 rounded-full bg-current',
          tone === 'progress' && 'animate-pulse motion-reduce:animate-none',
        )}
        aria-hidden="true"
      />
      {STATUS_LABEL[status]}
    </span>
  )
}
