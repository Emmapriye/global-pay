'use client'

import { WalletCard } from '@/components/wallet/wallet-card'
import type { Wallet } from '@/lib/types'
import { useBalanceVisibility } from './balance-visibility'
import { SectionHeading } from './section-heading'

export function WalletStrip({ wallets }: { wallets: Wallet[] }) {
  const { hidden } = useBalanceVisibility()

  return (
    <section aria-labelledby="wallets-heading" className="flex flex-col gap-3">
      <SectionHeading id="wallets-heading" title="Currency wallets" href="/wallets" linkLabel="View all" />
      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 xl:grid-cols-4">
        {wallets.map((wallet) => (
          <li key={wallet.id} className="w-[78%] shrink-0 snap-start sm:w-auto">
            <WalletCard wallet={wallet} hidden={hidden} href={`/wallets/${wallet.currency.toLowerCase()}`} className="h-full" />
          </li>
        ))}
      </ul>
    </section>
  )
}
