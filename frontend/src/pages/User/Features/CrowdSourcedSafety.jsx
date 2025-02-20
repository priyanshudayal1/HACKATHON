import { useState, useEffect } from "react";
import {
  Search,
  Map as MapIcon,
  Shield,
  AlertTriangle,
  Navigation,
  Eye,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Custom hook to update map view when city changes
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 12);
    }
  }, [center, map]);
  return null;
};

const SafetyLoadingOverlay = ({ message = "Loading Safety Data" }) => {
  return (
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
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl flex flex-col items-center gap-6"
      >
        <div className="flex">
          <div className="w-16 h-16 flex items-center justify-center">
            <div className="animate-spin w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full" />
            <Shield className="w-8 h-8 text-indigo-400 -ml-12" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-white text-lg font-medium flex items-center gap-2 justify-center">
            <Eye className="w-5 h-5 animate-pulse" />
            {message}
          </p>
          <p className="text-indigo-300 text-sm max-w-xs">
            Analyzing safety data and community reports for your location...
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CrowdSourcedSafety = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [cityCoordinates, setCityCoordinates] = useState({
    lat: 20.5937,
    lng: 78.9629,
  }); // India center
  const [isLoading, setIsLoading] = useState(false);

  const popularCities = [
    { name: "Mumbai", coordinates: [19.076, 72.8777] },
    { name: "Delhi", coordinates: [28.6139, 77.209] },
    { name: "Bangalore", coordinates: [12.9716, 77.5946] },
    { name: "Chennai", coordinates: [13.0827, 80.2707] },
    { name: "Kolkata", coordinates: [22.5726, 88.3639] },
    { name: "Hyderabad", coordinates: [17.385, 78.4867] },
  ];

  const handleCitySelect = async (city) => {
    setIsLoading(true);
    setSelectedCity(city.name);
    setCityCoordinates({ lat: city.coordinates[0], lng: city.coordinates[1] });

    // Simulate loading safety data
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 p-6">
      <AnimatePresence>{isLoading && <SafetyLoadingOverlay />}</AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 relative"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="-top-6 -left-6 w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center"
          >
            <ShieldCheck className="w-8 h-8 text-indigo-400" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Crowdsourced Safety Map
          </h1>
          <p className="text-gray-300">
            Explore safety insights and community reports for cities across
            India
          </p>
        </motion.div>

        {/* Search and Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-lg p-4 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300">
              <Search className="w-5 h-5 text-indigo-400" />
              <input
                type="text"
                placeholder="Enter city name..."
                value={selectedCity}
                onChange={(e) => {
                  const city = popularCities.find(
                    (c) => c.name.toLowerCase() === e.target.value.toLowerCase()
                  );
                  if (city) {
                    handleCitySelect(city);
                  } else {
                    setSelectedCity(e.target.value);
                  }
                }}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400"
              />
            </div>
          </motion.div>

          {/* Current Location */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-4 transition-all duration-300 overflow-hidden group"
            onClick={() => {
              setIsLoading(true);
              navigator.geolocation.getCurrentPosition((position) => {
                setCityCoordinates({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
                setTimeout(() => setIsLoading(false), 1500);
              });
            }}
          >
            <motion.div
              className="absolute inset-0 bg-indigo-500/30"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <Navigation className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Use My Location</span>
          </motion.button>
        </div>

        {/* Popular Cities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">
            Popular Cities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCities.map((city) => (
              <button
                key={city.name}
                onClick={() => handleCitySelect(city)}
                className={`p-3 rounded-lg text-sm transition-all duration-300 ${
                  selectedCity === city.name
                    ? "bg-indigo-600 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 hover:border-indigo-500/50 transition-all duration-500"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MapIcon className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-semibold text-white">
                {selectedCity
                  ? `${selectedCity} Safety Map`
                  : "India Safety Map"}
              </h2>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Safe Zones</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">Caution Areas</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="h-[600px] rounded-lg overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none z-10" />
            <MapContainer
              center={[cityCoordinates.lat, cityCoordinates.lng]}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapUpdater center={[cityCoordinates.lat, cityCoordinates.lng]} />
            </MapContainer>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CrowdSourcedSafety;
