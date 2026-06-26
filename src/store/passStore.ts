import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Pass } from '../types'

interface PassState {
  activePass: Pass | null
  passes: Pass[]
  setActivePass: (pass: Pass | null) => void
  addPass: (pass: Pass) => void
}

const mockPass: Pass = {
  id: '1',
  passCode: 'SOKO-1782459392937-KAYMMA',
  route: 'CBD - JKIA',
  plan: 'Weekly',
  tripsLeft: 14,
  totalTrips: 14,
  validUntil: 'Jul 3, 2026',
  isActive: true,
  price: 2500,
}

export const usePassStore = create<PassState>()(
  persist(
    (set) => ({
      activePass: mockPass,
      passes: [mockPass],
      setActivePass: (pass) => set({ activePass: pass }),
      addPass: (pass) =>
        set((state) => ({ passes: [...state.passes, pass], activePass: pass })),
    }),
    { name: 'soko-passes' }
  )
)
