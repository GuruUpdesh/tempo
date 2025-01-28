import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SummaryState {
  summary: string | null
  setSummary: (summary: string | null) => void
  clearSummary: () => void
}

export const useSummaryStore = create<SummaryState>()(
  persist(
    (set) => ({
      summary: null,
      setSummary: (summary) => set({ summary }),
      clearSummary: () => set({ summary: null }),
    }),
    {
      name: 'timelog-summary',
    }
  )
)