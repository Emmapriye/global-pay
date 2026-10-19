import type { CurrencyCode } from './money/currencies'
import type { MinorAmount } from './money/format'

export type Wallet = {
  id: string
  currency: CurrencyCode
  balanceMinor: MinorAmount
  /** Funds reserved by simulated transfers still in progress. */
  pendingMinor: MinorAmount
  /** Masked demo account label. Never a real account number. */
  accountLabel: string
  createdAt: string
}

export type TransferStatus =
  | 'created'
  | 'processing'
  | 'converting'
  | 'sending'
  | 'completed'
  | 'failed'
  | 'cancelled'

export type TransactionType = 'transfer_out' | 'transfer_in' | 'conversion' | 'deposit'

export type Recipient = {
  id: string
  name: string
  country: string
  currency: CurrencyCode
  bankName: string
  /** Last 4 digits only — demo data. */
  accountLast4: string
  email?: string
}

export type Transaction = {
  id: string
  reference: string
  type: TransactionType
  status: TransferStatus
  sourceCurrency: CurrencyCode
  sourceAmountMinor: MinorAmount
  targetCurrency: CurrencyCode
  targetAmountMinor: MinorAmount
  feeMinor: MinorAmount
  rate: number
  counterparty: string
  note?: string
  createdAt: string
}

export type UserProfile = {
  id: string
  fullName: string
  firstName: string
  email: string
  country: string
  baseCurrency: CurrencyCode
}
