import { create } from "zustand";
import { toast } from "react-hot-toast";
import api from '../lib/api';

export const useLostFound = create((set) => ({
    items: [],
    loading: false,
    error: null,

    fetchItems: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.get('/api/lost-found-items/');
            if (data.status === 'success') {
                set({ items: data.items || [], loading: false });
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            console.error('Error fetching items:', err);
            set({ 
                error: 'Failed to fetch items. Please try again later.',
                items: [],
                loading: false 
            });
        }
    },

    addItem: async (newItem) => {
        try {
            const response = await api.post('/api/add-lost-found-item/', {
                ...newItem,
                date_found: newItem.status === 'Found' ? new Date().toISOString() : null
            });
            if (response.data.status === 'success') {
                set(state => ({ items: [...state.items, response.data.data] }));
                toast.success('Item added successfully!');
                return true;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to add item';
            toast.error(errorMessage);
            return false;
        }
    },

    updateItemStatus: async (reportId, newStatus) => {
        try {
            await api.post('/api/update-lost-found-item/', {
                report_id: reportId,
                status: newStatus
            });
            set(state => ({
                items: state.items.map(item =>
                    item.report_id === reportId ? { ...item, status: newStatus } : item
                )
            }));
            toast.success('Status updated successfully!');
            return true;
        } catch (error) {
            toast.error('Failed to update status. Please try again.');
            return false;
        }
    }
}));
