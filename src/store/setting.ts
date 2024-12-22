import { create } from 'zustand'

interface StoreProps {
  isEdit: boolean
  setIsEdit: (e: boolean) => void
}

export const useGlobSettingState = create<StoreProps>((set, get) => {
  return {
    isEdit: false,
    setIsEdit: isEdit => {
      set({ isEdit })
    },
  }
})
