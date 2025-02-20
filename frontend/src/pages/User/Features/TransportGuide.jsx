import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  Users,
  Route,
  Car,
  Train,
  Bus,
  AlertTriangle,
  Timer,
  Wallet,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { getTransportRoutes } from "../../../store/useTravelGuide";
import LoadingOverlay from "../../../components/LoadingOverlay";
import React from "react";

const TransportGuide = () => {
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState(null);
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.source || !formData.destination) {
      toast.error("Please fill in both locations");
      return;
    }
    setLoading(true);
    try {
      const response = await getTransportRoutes(formData);
      setRoutes(Array.isArray(response.routes) ? response.routes : []);
      toast.success("Routes fetched successfully!");
    } catch (error) {
      setRoutes([]);
      toast.error(error.message || "Something went wrong");
    }
    setLoading(false);
  };

  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "car":
        return Car;
      case "train":
        return Train;
      case "bus":
        return Bus;
      default:
        return Route;
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
          Smart Transport Guide
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
                From
              </label>
              <div className="relative group">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <input
                  type="text"
                  placeholder="Enter starting point"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none hover:border-indigo-500/50"
                  value={formData.source}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, source: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-indigo-300 text-sm font-medium ml-1">
                To
              </label>
              <div className="relative group">
                <Navigation className="absolute left-3 top-3 w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <input
                  type="text"
                  placeholder="Enter destination"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none hover:border-indigo-500/50"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      destination: e.target.value,
                    }))
                  }
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
            Find Smart Routes
          </motion.button>
        </motion.form>

        <AnimatePresence>
          {loading && <LoadingOverlay message="Finding Smart Routes" />}
        </AnimatePresence>

        <AnimatePresence>
          {routes && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6"
            >
              {routes.length > 0 ? (
                routes.map((route, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 shadow-lg shadow-indigo-500/10"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {React.createElement(getTransportIcon(route.type), {
                        className: "w-6 h-6 text-indigo-400",
                      })}
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
                        Route {index + 1}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Timer className="w-5 h-5 text-indigo-400" />
                        <span>{route.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Wallet className="w-5 h-5 text-indigo-400" />
                        <span>{route.cost}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="w-5 h-5 text-indigo-400" />
                        <span>{route.crowdLevel}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 mt-4">{route.description}</p>

                    {route.warning && (
                      <div className="mt-4 flex items-center gap-2 text-yellow-400 bg-yellow-400/10 p-3 rounded-lg">
                        <AlertTriangle className="w-5 h-5" />
                        <p>{route.warning}</p>
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl"
                >
                  <Route className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                  <p className="text-gray-400">
                    No routes found. Try different locations.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TransportGuide;
