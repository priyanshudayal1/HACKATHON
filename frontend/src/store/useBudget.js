import { create } from "zustand";

export const useBudgetStore = create((set) => ({
  loading: false,
  tripPlan: null,
  error: null,

  generateTripPlan: async (formData) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch("http://localhost:8000/api/generate-trip/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status === "success") {
        // Check if trip_plan is a string and parse it if needed
        const tripPlanData =
          typeof data.trip_plan === "string"
            ? JSON.parse(data.trip_plan)
            : data.trip_plan;

        set({ tripPlan: tripPlanData, loading: false });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
