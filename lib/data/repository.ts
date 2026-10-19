import type { RateTable } from '@/lib/money/rates'
import type { Recipient, Transaction, UserProfile, Wallet } from '@/lib/types'

export type DataMode = 'demo' | 'supabase'

/**
 * Every data source (demo, Supabase, …) implements this contract so pages
 * never depend on a specific backend.
 */
export interface DataRepository {
  readonly mode: DataMode
  getCurrentUser(): Promise<UserProfile>
  getWallets(): Promise<Wallet[]>
  getWallet(id: string): Promise<Wallet | null>
  getRates(): Promise<RateTable>
  getTransactions(options?: { limit?: number }): Promise<Transaction[]>
  getTransaction(id: string): Promise<Transaction | null>
  getRecipients(): Promise<Recipient[]>
}
