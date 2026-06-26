export interface User {
  id: string
  name: string
  email: string
  phone?: string
  mpesaNumber?: string
  loyaltyPoints: number
  totalTrips: number
  avatarUrl?: string
}

export interface Pass {
  id: string
  passCode: string
  route: string
  plan: 'Daily' | 'Weekly' | 'Monthly'
  tripsLeft: number
  totalTrips: number
  validUntil: string
  isActive: boolean
  price: number
}

export interface Route {
  id: string
  name: string
  from: string
  to: string
  duration: string
  distance: string
  price: number
  coordinates?: [number, number][]
}

export interface Transaction {
  id: string
  description: string
  amount: number
  type: 'credit' | 'debit'
  date: string
  status: 'success' | 'failed' | 'pending'
}

export interface WalletState {
  balance: number
  loyaltyPoints: number
  transactions: Transaction[]
}
