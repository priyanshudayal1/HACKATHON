import { useState, useEffect } from "react";
import {
  Search,
  Map as MapIcon,
  Shield,
  AlertTriangle,
  Navigation,
  ShieldCheck,
  AlertCircle,
  Sword,
  UserX,
  Skull,
  HomeIcon,
  Pill,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import crimeData from "./crime_data.json";
import L from "leaflet";
import toast, { Toaster } from "react-hot-toast";

// Get distributed coordinates in a circular pattern around city center
const getAreaPosition = (baseCoords, index, totalAreas) => {
  // Create a spiral pattern for better distribution
  const radius = 0.02 * (1 + index / totalAreas); // Increasing radius
  const angle = index * Math.PI * 2 * 1.618; // Golden angle for better distribution
  return [
    baseCoords.lat + radius * Math.cos(angle),
    baseCoords.lng + radius * Math.sin(angle),
  ];
};

// Update getSafetyColor for consistent styling
const getSafetyColor = (safetyLevel) => {
  switch (safetyLevel) {
    case "Safe":
      return "green";
    case "Moderate":
      return "yellow";
    case "Unsafe":
      return "red";
    default:
      return "gray";
  }
};

// Update getMarkerIcon with more detailed styling
const getMarkerIcon = (safetyLevel) => {
  const color = getSafetyColor(safetyLevel);
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div class="relative">
        <div class="absolute -inset-1 bg-${color}-500/30 rounded-full animate-pulse"></div>
        <div class="w-4 h-4 rounded-full bg-${color}-500 shadow-lg shadow-${color}-500/50"></div>
      </div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

// Custom hook to update map view when city changes
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
};

// Crime Icon Component
const CrimeIcon = ({ type }) => {
  const icons = {
    Theft: <HomeIcon className="w-5 h-5 text-red-400" />,
    Assault: <UserX className="w-5 h-5 text-orange-400" />,
    Murder: <Skull className="w-5 h-5 text-red-600" />,
    Burglary: <Sword className="w-5 h-5 text-yellow-400" />,
    "Drug Abuse": <Pill className="w-5 h-5 text-purple-400" />,
  };
  return icons[type] || <AlertCircle className="w-5 h-5 text-gray-400" />;
};

// Area Stats Card Component
const AreaStatsCard = ({ areaData }) => {
  const getSafetyBadgeStyle = (level) => {
    const styles = {
      Safe: "bg-green-500/20 text-green-300",
      Moderate: "bg-yellow-500/20 text-yellow-300",
      Unsafe: "bg-red-500/20 text-red-300",
    };
    return styles[level] || "bg-gray-500/20 text-gray-300";
  };

  const getCrimeColor = (crimeType) => {
    const colors = {
      Theft: "text-blue-400",
      Assault: "text-orange-400",
      Murder: "text-red-400",
      Burglary: "text-yellow-400",
      "Drug Abuse": "text-purple-400",
    };
    return colors[crimeType] || "text-gray-400";
  };

  const getProgressColor = (count) => {
    if (count <= 10) return "bg-green-500/50";
    if (count <= 20) return "bg-yellow-500/50";
    return "bg-red-500/50";
  };

  const maxCrime = Math.max(...Object.values(areaData.crimes));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-black/60 backdrop-blur-md rounded-lg p-4 w-80 border border-white/10"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">{areaData.name}</h3>
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium ${getSafetyBadgeStyle(
            areaData.safety_level
          )}`}
        >
          {areaData.safety_level}
        </div>
      </div>

      <div className="space-y-3">
        {Object.entries(areaData.crimes).map(([crime, count]) => (
          <div key={crime} className="relative">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <CrimeIcon type={crime} />
                <span className={`text-sm ${getCrimeColor(crime)}`}>
                  {crime}
                </span>
              </div>
              <span className="text-white font-medium">{count}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(count / maxCrime) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`h-full rounded-full ${getProgressColor(count)}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-indigo-400" />
            <span className="text-gray-300 text-sm">Total Crimes</span>
          </div>
          <span className="text-white font-bold">{areaData.total_crime}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Loading Overlay Component
const SafetyLoadingOverlay = () => (
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
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <ShieldCheck className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="text-center space-y-2">
        <p className="text-white text-lg font-medium flex items-center gap-2 justify-center">
          <Sparkles className="w-5 h-5 animate-pulse" />
          Loading safety data...
        </p>
        <p className="text-indigo-300 text-sm max-w-xs">
          Analyzing crime statistics and safety insights for your location...
        </p>
      </div>
    </motion.div>
  </motion.div>
);

const CrowdSourcedSafety = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [cityCoordinates, setCityCoordinates] = useState({
    lat: 20.5937,
    lng: 78.9629,
  }); // India center
  const [isLoading, setIsLoading] = useState(false);
  const [cityData, setCityData] = useState(null);
  const [hoveredArea, setHoveredArea] = useState(null);

  const popularCities = [
    { name: "Mumbai", coordinates: [19.076, 72.8777] },
    { name: "Delhi", coordinates: [28.6139, 77.209] },
    { name: "Bangalore", coordinates: [12.9716, 77.5946] },
    { name: "Chennai", coordinates: [13.0827, 80.2707] },
    { name: "Kolkata", coordinates: [22.5726, 88.3639] },
    { name: "Hyderabad", coordinates: [17.385, 78.4867] },
  ];

  const findCityData = (cityName) => {
    for (const state in crimeData) {
      for (const city in crimeData[state]) {
        if (city.toLowerCase() === cityName.toLowerCase()) {
          const data = {};
          // Get all areas for the city
          Object.entries(crimeData[state][city]).forEach(
            ([areaName, areaStats]) => {
              if (areaStats.crimes) {
                // Only include entries with crime data
                data[areaName] = {
                  crimes: {
                    Theft: areaStats.crimes.Theft || 0,
                    Assault: areaStats.crimes.Assault || 0,
                    Murder: areaStats.crimes.Murder || 0,
                    Burglary: areaStats.crimes.Burglary || 0,
                    "Drug Abuse": areaStats.crimes["Drug Abuse"] || 0,
                  },
                  total_crime: areaStats.total_crime || 0,
                  safety_level: areaStats.safety_level || "Unknown",
                };
              }
            }
          );
          return data;
        }
      }
    }
    return null;
  };

  const handleCitySelect = async (city) => {
    setIsLoading(true);
    setSelectedCity(city.name);
    setCityCoordinates({ lat: city.coordinates[0], lng: city.coordinates[1] });

    const data = findCityData(city.name);
    console.log(data);
    if (data) {
      setCityData(data);
    } else {
      toast.error("No crime data available for this city", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        icon: <AlertCircle className="w-5 h-5 text-red-400" />,
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 p-6">
      <Toaster />
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
                className="map-tiles"
              />
              <MapUpdater center={[cityCoordinates.lat, cityCoordinates.lng]} />

              {cityData && (
                <div className="absolute bottom-4 right-4 z-20 space-y-2">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                    <div className="text-white text-sm mb-2">Safety Levels</div>
                    <div className="space-y-1.5">
                      {["Safe", "Moderate", "Unsafe"].map((level) => (
                        <div key={level} className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full bg-${getSafetyColor(
                              level
                            )}-500`}
                          />
                          <span className="text-gray-300 text-sm">{level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {cityData &&
                Object.entries(cityData).map(
                  ([areaName, areaData], index, array) => (
                    <Marker
                      key={areaName}
                      position={getAreaPosition(
                        cityCoordinates,
                        index,
                        array.length
                      )}
                      icon={getMarkerIcon(areaData.safety_level)}
                      eventHandlers={{
                        mouseover: () =>
                          setHoveredArea({ ...areaData, name: areaName }),
                        mouseout: () => setHoveredArea(null),
                      }}
                    />
                  )
                )}
            </MapContainer>

            <AnimatePresence>
              {hoveredArea && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 left-4 z-20"
                >
                  <AreaStatsCard areaData={hoveredArea} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .map-tiles {
          filter: grayscale(1) opacity(0.6);
        }

        .custom-div-icon {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }

        .custom-div-icon .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.2);
          }
        }

        .leaflet-popup-content-wrapper {
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
        }

        .leaflet-popup-tip {
          background: rgba(0, 0, 0, 0.75);
        }

        .area-tooltip {
          transition: all 0.2s ease-in-out;
          transform-origin: center bottom;
        }

        .area-tooltip:hover {
          transform: scale(1.05);
        }

        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
};

export default CrowdSourcedSafety;
