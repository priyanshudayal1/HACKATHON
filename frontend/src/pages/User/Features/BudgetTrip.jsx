import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Wallet,
  MapPin,
  Activity,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";
import { useBudgetStore } from "../../../store/useBudget";
import { toast } from "react-hot-toast";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 p-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      <div className="max-w-4xl mx-auto relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-white mb-8 text-center"
        >
          Plan Your Perfect Trip
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 mb-8 hover:border-indigo-500/50 transition-all duration-300 shadow-xl shadow-indigo-500/10"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-indigo-300 text-sm font-medium ml-1">
                Duration
              </label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <input
                  type="number"
                  placeholder="Number of Days"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none hover:border-indigo-500/50"
                  value={formData.days}
                  onChange={(e) =>
                    setFormData({ ...formData, days: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-indigo-300 text-sm font-medium ml-1">
                Budget
              </label>
              <div className="relative group">
                <Wallet className="absolute left-3 top-3 w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <input
                  type="number"
                  placeholder="Amount in INR"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none hover:border-indigo-500/50"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-indigo-300 text-sm font-medium ml-1">
                Destination
              </label>
              <div className="relative group">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none hover:border-indigo-500/50"
                  value={formData.place}
                  onChange={(e) =>
                    setFormData({ ...formData, place: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-indigo-300 text-sm font-medium ml-1">
                Activities
              </label>
              <div className="relative group">
                <Activity className="absolute left-3 top-3 w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <input
                  type="text"
                  placeholder="What would you like to do?"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none hover:border-indigo-500/50"
                  value={formData.activity}
                  onChange={(e) =>
                    setFormData({ ...formData, activity: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading || isThinking}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50 font-medium relative overflow-hidden"
          >
            {loading || isThinking ? (
              <div className="flex items-center justify-center gap-3">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span>AI is crafting your perfect trip...</span>
              </div>
            ) : (
              "Generate Trip Plan"
            )}
          </motion.button>
        </motion.form>

        <AnimatePresence>
          {(loading || isThinking) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-white text-lg font-medium">
                  AI is Processing
                </p>
                <p className="text-indigo-300 text-sm text-center max-w-xs">
                  Creating a personalized itinerary based on your preferences...
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 shadow-lg shadow-indigo-500/10"
              >
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200 mb-4">
                  Day {index + 1}
                </h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-400" />
                    <p>
                      <span className="text-indigo-400 font-medium">
                        Places:
                      </span>{" "}
                      {day.places}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-indigo-400" />
                    <p>
                      <span className="text-indigo-400 font-medium">Food:</span>{" "}
                      {day.food}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-indigo-400" />
                    <p>
                      <span className="text-indigo-400 font-medium">
                        Activities:
                      </span>{" "}
                      {day.activities}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-indigo-400" />
                    <p>
                      <span className="text-indigo-400 font-medium">
                        Budget:
                      </span>{" "}
                      ₹{day.budget}
                    </p>
                  </div>
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
