import { create } from "zustand";
import { toast } from "react-hot-toast";
import api from '../lib/api';

export const useLostFound = create((set, get) => ({
    items: [],
    loading: false,
    error: null,

    fetchItems: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await api.get('/api/lost-found-items/');
            set({ items: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            console.error('Error fetching items:', error);
            set({ 
                error: 'Failed to fetch items. Please try again later.',
                items: [],
                loading: false 
            });
        }
    },

    addItem: async (newItem) => {
        try {
            const { data } = await api.post('/api/add-lost-found-item/', newItem);
            set(state => ({ items: [...state.items, data] }));
            toast.success('Item added successfully!');
            return true;
        } catch (error) {
            toast.error('Failed to add item. Please try again.');
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
