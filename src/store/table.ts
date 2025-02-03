import { create } from 'zustand'

type TableState = {
  day: string | null;
  setDay: (day: string | null) => void;
}

export const useTableStore = create<TableState>((set) => ({
    day: null,
    setDay: (day: string | null) => set((state) => ({ ...state, day })),
}));