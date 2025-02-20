import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Calendar,
  Users,
  Heart,
  Wallet,
  Palmtree,
  Mountain,
  MapPin,
  Star,
  Image,
  Navigation,
  Sparkles,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { getDestinationSuggestions } from "../../../store/useTravelGuide";
import LoadingOverlay from "../../../components/LoadingOverlay";

const FormInput = ({
  icon: Icon,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}) => (
  <div className="space-y-2">
    <label className="text-indigo-300 text-sm font-medium ml-1 flex items-center gap-2">
      <Icon className="w-4 h-4" />
      {label}
    </label>
    <motion.div whileHover={{ scale: 1.02 }} className="relative group">
      <div className="absolute left-3 top-3 w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors">
        <Icon />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none hover:border-indigo-500/50"
        value={value}
        onChange={onChange}
      />
    </motion.div>
  </div>
);

const DestinationCard = ({ destination, index }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 shadow-lg shadow-indigo-500/10"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
              <MapPin className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                {destination.name}
              </h3>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm">4.8</span>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-indigo-400 transition-colors"
          >
            {showDetails ? (
              <motion.div animate={{ rotate: 180 }}>
                <Navigation className="w-5 h-5" />
              </motion.div>
            ) : (
              <Navigation className="w-5 h-5" />
            )}
          </motion.button>
        </div>

        <p className="text-gray-300 mb-4 line-clamp-2">
          {destination.description}
        </p>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Mountain className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span className="truncate">{destination.highlights}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Wallet className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span className="truncate">{destination.costRange}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Calendar className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span className="truncate">{destination.bestTime}</span>
          </div>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-6 pt-6 border-t border-white/10"
            >
              {destination.activities && (
                <div className="space-y-4">
                  <h4 className="text-indigo-300 font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Popular Activities
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {destination.activities.map((activity, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2 text-gray-300 bg-white/5 p-3 rounded-lg"
                      >
                        <div className="p-2 rounded-lg bg-indigo-500/10">
                          <Palmtree className="w-4 h-4 text-indigo-400" />
                        </div>
                        <span className="text-sm">{activity}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

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
    let retries = 3;

    while (retries > 0) {
      try {
        const response = await getDestinationSuggestions(formData);
        setSuggestions(
          Array.isArray(response.suggestions) ? response.suggestions : []
        );
        toast.success("Destinations found successfully!");
        break;
      } catch (error) {
        retries--;
        if (retries === 0) {
          setSuggestions([]);
          toast.error(
            error.message || "Failed to find destinations. Please try again."
          );
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="p-2 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
          <Compass className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">
            Destination Discovery
          </h1>
          <p className="text-gray-400">Find your perfect travel destination</p>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-8 hover:border-indigo-500/50 transition-all duration-300 shadow-xl"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            icon={Heart}
            label="Interests"
            placeholder="Nature, Adventure, Culture, etc."
            value={formData.interests}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, interests: e.target.value }))
            }
          />
          <FormInput
            icon={Wallet}
            label="Budget Range"
            placeholder="Your budget range"
            value={formData.budget}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, budget: e.target.value }))
            }
          />
          <FormInput
            icon={Calendar}
            label="Duration"
            placeholder="How many days?"
            value={formData.duration}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, duration: e.target.value }))
            }
          />
          <FormInput
            icon={Users}
            label="Travelers"
            placeholder="Number of travelers"
            type="number"
            value={formData.travelers}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, travelers: e.target.value }))
            }
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Compass className="w-5 h-5" />
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
              <DestinationCard
                key={index}
                destination={destination}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {suggestions && suggestions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Image className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No Destinations Found
          </h3>
          <p className="text-gray-400">
            Try adjusting your preferences to find more destinations
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TravelSuggestion;
