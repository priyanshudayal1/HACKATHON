import { create } from "zustand";

export const useLogin = create((set) => ({
    loggedIn: false,
    login: () => set({ loggedIn: true }),
    logout: () => set({ loggedIn: false }),
    
}));