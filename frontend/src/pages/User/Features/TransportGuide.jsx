import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  Route,
  Car,
  Train,
  Bus,
  Timer,
  Wallet,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { getTransportRoutes } from "../../../store/useTravelGuide";
import LoadingOverlay from "../../../components/LoadingOverlay";

const getTransportIcon = (description) => {
  if (description.toLowerCase().includes('train')) return Train;
  if (description.toLowerCase().includes('bus')) return Bus;
  if (description.toLowerCase().includes('taxi') || description.toLowerCase().includes('drive')) return Car;
  return Route;
};

const RouteCard = ({ route, index }) => {
  const Icon = getTransportIcon(route.description);
  const costRange = route.cost;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ delay: index * 0.15, duration: 0.4, type: "spring" }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-500 shadow-xl hover:shadow-indigo-500/30 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-start gap-6 relative z-10">
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-indigo-500/50 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-500">
          <Icon className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 text-gray-300 bg-white/5 rounded-lg p-2"
            >
              <Timer className="w-5 h-5 text-indigo-400" />
              <span className="font-medium">{route.duration}</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 text-gray-300 bg-white/5 rounded-lg p-2"
            >
              <Wallet className="w-5 h-5 text-indigo-400" />
              <span className="font-medium">{costRange}</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 text-gray-300 bg-white/5 rounded-lg p-2"
            >
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span className="font-medium capitalize">{route.crowdLevel}</span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-gray-300 leading-relaxed">{route.description}</p>
      </div>
    </motion.div>
  );
};

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
      setRoutes(Array.isArray(response) ? response : []);
      toast.success("Routes fetched successfully!");
    } catch (error) {
      setRoutes([]);
      toast.error(error.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900/90 to-gray-900 p-8 relative">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.4),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(78,76,161,0.3),transparent)]" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />
      </div>

      <div className="max-w-5xl mx-auto relative">
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
            Transport Guide
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 mb-8 hover:border-indigo-500/50 transition-all duration-300 shadow-xl shadow-indigo-500/10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6 relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <input
                  type="text"
                  placeholder="Source Location"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none hover:border-indigo-500/50 placeholder:text-gray-400"
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <input
                  type="text"
                  placeholder="Destination Location"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none hover:border-indigo-500/50 placeholder:text-gray-400"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 ring-1 ring-indigo-500/50 flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-indigo-400" />
                </div>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50 font-medium flex items-center justify-center gap-2"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span>Finding best routes...</span>
                </div>
              ) : (
                <>
                  <Navigation className="w-5 h-5" />
                  <span>Find Routes</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {loading && (
          <LoadingOverlay message="Finding the best routes for you..." />
        )}

        <AnimatePresence>
          {routes && routes.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {routes.map((route, index) => (
                <RouteCard key={index} route={route} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {routes && routes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl"
          >
            <Sparkles className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Routes Found
            </h3>
            <p className="text-gray-400">
              Try searching for different locations or check back later.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TransportGuide;
