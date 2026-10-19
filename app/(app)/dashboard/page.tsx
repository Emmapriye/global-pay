import type { Metadata } from 'next'
import { BalanceHero } from '@/components/dashboard/balance-hero'
import { BalanceVisibilityProvider } from '@/components/dashboard/balance-visibility'
import { ExchangeRatesCard } from '@/components/dashboard/exchange-rates-card'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { WalletStrip } from '@/components/dashboard/wallet-strip'
import { getRepository } from '@/lib/data'
import { CURRENCY_CODES, type CurrencyCode } from '@/lib/money/currencies'
import type { MinorAmount } from '@/lib/money/format'
import { sumInCurrency } from '@/lib/money/rates'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const repository = getRepository()
  const [user, wallets, rates, transactions] = await Promise.all([
    repository.getCurrentUser(),
    repository.getWallets(),
    repository.getRates(),
    repository.getTransactions({ limit: 5 }),
  ])

  const totals = Object.fromEntries(
    CURRENCY_CODES.map((code) => [code, sumInCurrency(wallets, code, rates)]),
  ) as Record<CurrencyCode, MinorAmount>

  return (
    <BalanceVisibilityProvider>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:px-8 lg:py-8">
        <BalanceHero
          firstName={user.firstName}
          totals={totals}
          defaultCurrency={user.baseCurrency}
          walletCount={wallets.length}
        />
        <div className="flex flex-col gap-8 px-4 lg:px-0">
          <WalletStrip wallets={wallets} />
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <RecentActivity transactions={transactions} />
            </div>
            <div className="lg:col-span-2">
              <ExchangeRatesCard rates={rates} base={user.baseCurrency} />
            </div>
          </div>
        </div>
      </main>
    </BalanceVisibilityProvider>
  )
}
