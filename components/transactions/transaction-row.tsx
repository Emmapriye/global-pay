import Link from 'next/link'
import { ArrowDownLeft, ArrowLeftRight, ArrowUpRight, Plus } from 'lucide-react'
import { Money } from '@/components/money/money'
import { formatShortDate } from '@/lib/format-date'
import { isOutgoing, TYPE_LABEL } from '@/lib/transfers/status'
import type { Transaction, TransactionType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { StatusBadge } from './status-badge'

const TYPE_ICON: Record<TransactionType, typeof ArrowUpRight> = {
  transfer_out: ArrowUpRight,
  transfer_in: ArrowDownLeft,
  conversion: ArrowLeftRight,
  deposit: Plus,
}

type TransactionRowProps = {
  transaction: Transaction
  hidden?: boolean
}

export function TransactionRow({ transaction, hidden = false }: TransactionRowProps) {
  const Icon = TYPE_ICON[transaction.type]
  const outgoing = isOutgoing(transaction.type)
  const displayCurrency = outgoing ? transaction.sourceCurrency : transaction.targetCurrency
  const displayAmount = outgoing ? -transaction.sourceAmountMinor : transaction.targetAmountMinor

  return (
    <li>
      <Link
        href={`/transactions/${transaction.id}`}
        className="flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring sm:px-3"
      >
        <span
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full',
            outgoing ? 'bg-muted text-foreground' : 'bg-accent text-primary',
          )}
          aria-hidden="true"
        >
          <Icon className="size-4.5" />
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-medium">{transaction.counterparty}</span>
          <span className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
            <span>{TYPE_LABEL[transaction.type]}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={transaction.createdAt}>{formatShortDate(transaction.createdAt)}</time>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span className="hidden font-mono text-[11px] sm:inline">{transaction.reference}</span>
          </span>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1">
          <Money
            amountMinor={displayAmount}
            currency={displayCurrency}
            hidden={hidden}
            signed
            className={cn(
              'text-sm font-semibold',
              !outgoing && 'text-primary',
              transaction.status === 'failed' && 'text-muted-foreground line-through',
            )}
          />
          <StatusBadge status={transaction.status} />
        </div>
      </Link>
    </li>
  )
}
