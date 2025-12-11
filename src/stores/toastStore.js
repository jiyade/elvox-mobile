import { create } from "zustand"

const useToastStore = create((set) => ({
    toast: null,
    setToast: (toast) => set({ toast }),
    clearToast: () => set({ toast: null })
}))

export default useToastStore
