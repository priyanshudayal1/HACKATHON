import { create } from "zustand";
import { toast } from "react-hot-toast";
import { useLogin } from "./useLogin";

export const useRegister = create(() => ({
  register: async (formData) => {
    const loadingToast = toast.loading("Creating your account...");
    try {
      const res = await fetch("/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.status === "success") {
        toast.dismiss(loadingToast);
        toast.success("Registration successful! Redirecting...");
        // Store user data if registration returns it
        if (data.user) {
          useLogin.getState().setUser(data.user);
        }
        return true;
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.message || "Registration failed. Please try again.");
      return false;
    }
  },
}));
