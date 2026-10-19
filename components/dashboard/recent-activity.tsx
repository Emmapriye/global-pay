'use client'

import Link from 'next/link'
import { ReceiptText } from 'lucide-react'
import { EmptyState } from '@/components/states/empty-state'
import { TransactionRow } from '@/components/transactions/transaction-row'
import type { Transaction } from '@/lib/types'
import { useBalanceVisibility } from './balance-visibility'
import { SectionHeading } from './section-heading'

export function RecentActivity({ transactions }: { transactions: Transaction[] }) {
  const { hidden } = useBalanceVisibility()

  return (
    <section aria-labelledby="activity-heading" className="flex flex-col gap-3">
      <SectionHeading id="activity-heading" title="Recent activity" href="/transactions" linkLabel="See all" />
      {transactions.length === 0 ? (
        <EmptyState
          icon={ReceiptText}
          title="No activity yet"
          description="Simulated transfers you create will appear here."
          action={
            <Link href="/send" className="text-sm font-medium text-primary hover:underline">
              Start a demo transfer
            </Link>
          }
        />
      ) : (
        <ul className="flex flex-col rounded-2xl border bg-card p-1.5 shadow-xs">
          {transactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} hidden={hidden} />
          ))}
        </ul>
      )}
    </section>
  )
}
