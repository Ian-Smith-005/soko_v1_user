import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Transaction } from '../types'

interface WalletStoreState {
  balance: number
  loyaltyPoints: number
  transactions: Transaction[]
  topUp: (amount: number) => void
  addTransaction: (tx: Omit<Transaction, 'id'>) => void
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Weekly pass - CBD - JKIA',
    amount: 2500,
    type: 'debit',
    date: 'Jun 26, 7:36 AM',
    status: 'success',
  },
]

export const useWalletStore = create<WalletStoreState>()(
  persist(
    (set) => ({
      balance: 0,
      loyaltyPoints: 0,
      transactions: mockTransactions,

      topUp: (amount) =>
        set((state) => ({
          balance: state.balance + amount,
          transactions: [
            {
              id: Date.now().toString(),
              description: 'M-Pesa Top Up',
              amount,
              type: 'credit',
              date: new Date().toLocaleString('en-KE', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
              status: 'success',
            },
            ...state.transactions,
          ],
        })),

      addTransaction: (tx) =>
        set((state) => ({
          transactions: [{ ...tx, id: Date.now().toString() }, ...state.transactions],
        })),
    }),
    { name: 'soko-wallet' }
  )
)
