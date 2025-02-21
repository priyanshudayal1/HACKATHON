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
            
            // New SOS functionality
            sendSOSAlert: async (userId, coordinates) => {
                const loadingToast = toast.loading('Sending SOS alert...');
                try {
                    const { data } = await api.post(`/api/send-sos-alert/${userId}/`, coordinates);
                    
                    if (data.status === 'success') {
                        toast.dismiss(loadingToast);
                        toast.success(data.message);
                        return { success: true, data };
                    } else {
                        throw new Error(data.message);
                    }
                } catch (err) {
                    toast.dismiss(loadingToast);
                    const errorMessage = err.response?.data?.message || err.message || 'Failed to send SOS alert';
                    toast.error(errorMessage);
                    return { success: false, error: errorMessage };
                }
            }
        }),
        {
            name: 'user-store',
        }
    )
);