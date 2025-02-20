import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist } from "zustand/middleware";

export const useLogin = create(
    persist(
        (set) => ({
            loggedIn: false,
            user: null,
            login: async (formData) => {
                const loadingToast = toast.loading('Logging in...');
                try {
                    const res = await fetch('/api/login/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                    const data = await res.json();
                    
                    if (data.status === 'success') {
                        toast.dismiss(loadingToast);
                        toast.success('Login successful!');
                        set({ loggedIn: true, user: data.user });
                        return true;
                    } else {
                        throw new Error(data.message);
                    }
                } catch (err) {
                    toast.dismiss(loadingToast);
                    toast.error(err.message || 'Login failed. Please try again.');
                    return false;
                }
            },
            logout: () => set({ loggedIn: false, user: null }),
            setUser: (userData) => set({ user: userData }),
        }),
        {
            name: 'user-store',
        }
    )
);