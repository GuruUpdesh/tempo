import { create } from 'zustand'

type DialogState = {
  dialogs: Record<string, boolean>
  open: (key: string) => void
  close: (key: string) => void
}

export const useDialogStore = create<DialogState>((set) => ({
  dialogs: {},
  open: (key) => set((state) => ({
    dialogs: { ...state.dialogs, [key]: true }
  })),
  close: (key) => set((state) => ({
    dialogs: { ...state.dialogs, [key]: false }
  }))
}))