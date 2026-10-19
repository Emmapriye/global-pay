import type { TransactionType, TransferStatus } from '@/lib/types'

export const TRANSFER_STEPS = [
  { status: 'created', label: 'Created', description: 'Simulated transfer request recorded' },
  { status: 'processing', label: 'Processing', description: 'Simulated compliance and balance checks' },
  { status: 'converting', label: 'Converting', description: 'Simulated currency conversion at the quoted rate' },
  { status: 'sending', label: 'Sending', description: 'Simulated payout — no bank is contacted' },
  { status: 'completed', label: 'Completed', description: 'Simulation finished. No real money moved.' },
] as const satisfies readonly { status: TransferStatus; label: string; description: string }[]

export type StepState = 'complete' | 'current' | 'upcoming' | 'failed'

export const STATUS_LABEL: Record<TransferStatus, string> = {
  created: 'Created',
  processing: 'Processing',
  converting: 'Converting',
  sending: 'Sending',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
}

export type StatusTone = 'success' | 'progress' | 'danger' | 'neutral'

export function getStatusTone(status: TransferStatus): StatusTone {
  if (status === 'completed') return 'success'
  if (status === 'failed') return 'danger'
  if (status === 'cancelled') return 'neutral'
  return 'progress'
}

export function isInProgress(status: TransferStatus): boolean {
  return getStatusTone(status) === 'progress'
}

/**
 * Maps a transfer's status to the visual state of each timeline step.
 * A failed transfer is shown as failing on the step after the last
 * completed one (defaulting to "processing").
 */
export function getTimelineStates(
  status: TransferStatus,
  failedAt: TransferStatus = 'processing',
): StepState[] {
  const order = TRANSFER_STEPS.map((step) => step.status as TransferStatus)
  if (status === 'failed' || status === 'cancelled') {
    const failIndex = Math.max(order.indexOf(failedAt), 1)
    return order.map((_, i) => (i < failIndex ? 'complete' : i === failIndex ? 'failed' : 'upcoming'))
  }
  const currentIndex = order.indexOf(status)
  return order.map((_, i) => {
    if (status === 'completed') return 'complete'
    if (i < currentIndex) return 'complete'
    if (i === currentIndex) return 'current'
    return 'upcoming'
  })
}

export const TYPE_LABEL: Record<TransactionType, string> = {
  transfer_out: 'Sent',
  transfer_in: 'Received',
  conversion: 'Converted',
  deposit: 'Demo top-up',
}

export function isOutgoing(type: TransactionType): boolean {
  return type === 'transfer_out' || type === 'conversion'
}
