import {
  DEMO_RATES,
  DEMO_RECIPIENTS,
  DEMO_TRANSACTIONS,
  DEMO_USER,
  DEMO_WALLETS,
} from '@/lib/demo/data'
import type { DataRepository } from './repository'

export const demoRepository: DataRepository = {
  mode: 'demo',
  async getCurrentUser() {
    return DEMO_USER
  },
  async getWallets() {
    return DEMO_WALLETS
  },
  async getWallet(id) {
    return DEMO_WALLETS.find((wallet) => wallet.id === id) ?? null
  },
  async getRates() {
    return DEMO_RATES
  },
  async getTransactions({ limit } = {}) {
    const sorted = [...DEMO_TRANSACTIONS].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    return typeof limit === 'number' ? sorted.slice(0, limit) : sorted
  },
  async getTransaction(id) {
    return DEMO_TRANSACTIONS.find((txn) => txn.id === id) ?? null
  },
  async getRecipients() {
    return DEMO_RECIPIENTS
  },
}
