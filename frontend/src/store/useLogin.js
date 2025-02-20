import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist } from "zustand/middleware";
import api from '../lib/api';

export const useLogin = create(
    persist(
        (set) => ({
            loggedIn: false,
            user: null,
            login: async (formData) => {
                const loadingToast = toast.loading('Logging in...');
                try {
                    const { data } = await api.post('/api/login/', formData);
                    
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
                    toast.error(err.response?.data?.message || err.message || 'Login failed. Please try again.');
                    return false;
                }
            },
            logout: () => {
                toast.success('Logged out successfully');
                set({ loggedIn: false, user: null });
            },
            setUser: (userData) => set({ user: userData }),
        }),
        {
            name: 'user-store',
        }
    )
);