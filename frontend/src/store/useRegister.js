import { create } from "zustand";
import { toast } from "react-hot-toast";
import { useLogin } from "./useLogin";
import api from '../lib/api';

export const useRegister = create(() => ({
  register: async (formData) => {
    const loadingToast = toast.loading("Creating your account...");
    try {
      const { data } = await api.post("/api/register/", formData);

      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("Registration successful! Redirecting...");
        if (data.user) {
          useLogin.getState().setUser(data.user);
        }
        return true;
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.response?.data?.message || err.message || "Registration failed. Please try again.");
      return false;
    }
  },
}));
