import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Calendar,
  Users,
  Heart,
  Clock,
  Wallet,
  Palmtree,
  Mountain,
  Utensils,
  Hotel,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { getDestinationSuggestions } from "../../../store/useTravelGuide";
import LoadingOverlay from "../../../components/LoadingOverlay";
import React from "react";

const TravelSuggestion = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const [formData, setFormData] = useState({
    interests: "",
    budget: "",
    duration: "",
    travelers: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.interests) {
      toast.error("Please specify your interests");
      return;
    }
    
    setLoading(true);
    try {
      const response = await getDestinationSuggestions(formData);
      setSuggestions(Array.isArray(response.suggestions) ? response.suggestions : []);
      toast.success("Destinations found successfully!");
    } catch (error) {
      setSuggestions([]);
      toast.error(error.message || "Failed to find destinations");
    }
    setLoading(false);
  };

  const getActivityIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "accommodation": return Hotel;
      case "food": return Utensils;
      case "nature": return Mountain;
      case "leisure": return Palmtree;
      default: return Heart;
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
          Destination Discovery
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
                Interests
              </label>
              <div className="relative group">
                <Heart className="absolute left-3 top-3 w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <input
                  type="text"
                  placeholder="Nature, Adventure, Culture, etc."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none hover:border-indigo-500/50"
                  value={formData.interests}
                  onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-indigo-300 text-sm font-medium ml-1">
                Budget Range
              </label>
              <div className="relative group">
                <Wallet className="absolute left-3 top-3 w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <input
                  type="text"
                  placeholder="Your budget range"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none hover:border-indigo-500/50"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-indigo-300 text-sm font-medium ml-1">
                Duration
              </label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <input
                  type="text"
                  placeholder="How many days?"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none hover:border-indigo-500/50"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-indigo-300 text-sm font-medium ml-1">
                Travelers
              </label>
              <div className="relative group">
                <Users className="absolute left-3 top-3 w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <input
                  type="number"
                  placeholder="Number of travelers"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none hover:border-indigo-500/50"
                  value={formData.travelers}
                  onChange={(e) => setFormData(prev => ({ ...prev, travelers: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Discover Destinations
          </motion.button>
        </motion.form>

        <AnimatePresence>
          {loading && <LoadingOverlay message="Finding Perfect Destinations" />}
        </AnimatePresence>

        <AnimatePresence>
          {suggestions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {suggestions.map((destination, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 shadow-lg shadow-indigo-500/10"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Compass className="w-6 h-6 text-indigo-400" />
                    <h3 className="text-xl font-bold text-white">
                      {destination.name}
                    </h3>
                  </div>

                  <p className="text-gray-300 mb-4">{destination.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mountain className="w-5 h-5 text-indigo-400" />
                      <span>{destination.highlights}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Wallet className="w-5 h-5 text-indigo-400" />
                      <span>{destination.costRange}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-5 h-5 text-indigo-400" />
                      <span>{destination.bestTime}</span>
                    </div>
                  </div>

                  {destination.activities && (
                    <div className="mt-4 p-4 bg-white/5 rounded-lg">
                      <h4 className="text-indigo-300 mb-2">Popular Activities</h4>
                      <ul className="list-disc list-inside text-gray-300">
                        {destination.activities.map((activity, idx) => (
                          <li key={idx}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TravelSuggestion;
