import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Wallet,
  MapPin,
  Activity,
  UtensilsCrossed,
  Sparkles,
  Navigation,
} from "lucide-react";
import { useBudgetStore } from "../../../store/useBudget";
import { toast } from "react-hot-toast";
import LoadingOverlay from "../../../components/LoadingOverlay";

const BudgetTrip = () => {
  const [formData, setFormData] = useState({
    days: "",
    budget: "",
    place: "",
    activity: "",
  });

  const { loading, tripPlan, generateTripPlan } = useBudgetStore();
  const [isThinking, setIsThinking] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.days ||
      !formData.budget ||
      !formData.place ||
      !formData.activity
    ) {
      toast.error("Please fill all fields");
      return;
    }
    setIsThinking(true);
    try {
      await generateTripPlan(formData);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900/90 to-gray-900 p-8 relative">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.4),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(78,76,161,0.3),transparent)]" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-indigo-500/50">
            <Navigation className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-200">
            Budget Trip Planner
          </h1>
        </motion.div>

        {/* Enhanced Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 mb-8 hover:border-indigo-500/50 transition-all duration-300 shadow-xl shadow-indigo-500/10"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form Fields with Enhanced Styling */}
            {[
              {
                label: "Duration",
                icon: Calendar,
                type: "number",
                placeholder: "Number of Days",
                value: formData.days,
                onChange: (e) => setFormData({ ...formData, days: e.target.value }),
              },
              {
                label: "Budget",
                icon: Wallet,
                type: "number",
                placeholder: "Amount in INR",
                value: formData.budget,
                onChange: (e) => setFormData({ ...formData, budget: e.target.value }),
              },
              {
                label: "Destination",
                icon: MapPin,
                type: "text",
                placeholder: "Where do you want to go?",
                value: formData.place,
                onChange: (e) => setFormData({ ...formData, place: e.target.value }),
              },
              {
                label: "Activities",
                icon: Activity,
                type: "text",
                placeholder: "What would you like to do?",
                value: formData.activity,
                onChange: (e) => setFormData({ ...formData, activity: e.target.value }),
              },
            ].map((field, index) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <label className="text-indigo-300 text-sm font-medium ml-1 flex items-center gap-2">
                  <field.icon className="w-4 h-4" />
                  {field.label}
                </label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <field.icon className="absolute left-3 top-3 w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none hover:border-indigo-500/50 placeholder:text-gray-400"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Submit Button */}
          <motion.button
            type="submit"
            disabled={loading || isThinking}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50 font-medium flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {loading || isThinking ? (
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span>AI is crafting your perfect trip...</span>
              </div>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Trip Plan</span>
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Loading Overlay */}
        <AnimatePresence>
          {(loading || isThinking) && <LoadingOverlay message="AI is crafting your perfect trip..." />}
        </AnimatePresence>

        {/* Enhanced Trip Plan Display */}
        {tripPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6"
          >
            {tripPlan.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200 mb-4 relative z-10">
                  Day {index + 1}
                </h3>
                <div className="space-y-4 text-gray-300 relative z-10">
                  {[
                    { icon: MapPin, label: "Places", value: day.places },
                    { icon: UtensilsCrossed, label: "Food", value: day.food },
                    { icon: Activity, label: "Activities", value: day.activities },
                    { icon: Wallet, label: "Budget", value: `₹${day.budget}` },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 bg-white/5 p-3 rounded-lg"
                    >
                      <item.icon className="w-5 h-5 text-indigo-400" />
                      <p>
                        <span className="text-indigo-400 font-medium">{item.label}:</span>{" "}
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BudgetTrip;
