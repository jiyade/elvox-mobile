import { create } from "zustand"

const useAuthStore = create((set) => ({
    isAuthenticated: false,
    user: null,
    token: null,

    login: (user, token) => set({ user, token, isAuthenticated: true }),

    logout: () => set({ user: null, token: null, isAuthenticated: false })
}))

export default useAuthStore
