import { useState, Fragment, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cloud, 
  AlertTriangle, 
  Bell, 
  MapPin, 
  ThermometerSun,
  Wind,
  CloudRain
} from "lucide-react";
import { toast } from "react-hot-toast";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { getLocationAlerts } from '../../../lib/api';

const AlertCard = ({ title, description, type, time, location, severity }) => {
  const getSeverityColor = (sev) => {
    switch (sev?.toLowerCase()) {
      case 'high': return 'bg-red-500/10 border-red-500/50 text-red-400';
      case 'medium': return 'bg-orange-500/10 border-orange-500/50 text-orange-400';
      case 'low': return 'bg-green-500/10 border-green-500/50 text-green-400';
      default: return 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400';
    }
  };

  const getIcon = (alertType) => {
    switch (alertType?.toLowerCase()) {
      case 'weather': return Cloud;
      case 'disaster': return AlertTriangle;
      case 'rainfall': return CloudRain;
      case 'temperature': return ThermometerSun;
      case 'wind': return Wind;
      default: return Bell;
    }
  };

  const Icon = getIcon(type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl backdrop-blur-lg border ${getSeverityColor(severity)} transition-all duration-300`}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-white/5">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-gray-300 text-sm mb-3">{description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Bell className="w-4 h-4" />
              {time}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AlertsSystems = () => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [alerts, setAlerts] = useState([
    {
      title: "Heavy Rainfall Expected",
      description: "Heavy rainfall predicted in the next 24 hours. Please take necessary precautions.",
      type: "rainfall",
      time: "Next 24 hours",
      location: "Mumbai, Maharashtra",
      severity: "high"
    },
    {
      title: "High Temperature Alert",
      description: "Temperature expected to reach 40°C. Stay hydrated and avoid outdoor activities.",
      type: "temperature",
      time: "Today",
      location: "Delhi, NCR",
      severity: "medium"
    },
    {
      title: "Strong Winds Warning",
      description: "Wind speeds may exceed 50 km/h. Secure loose objects and stay indoors.",
      type: "wind",
      time: "Tomorrow",
      location: "Chennai, Tamilnadu",
      severity: "low"
    }
  ]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true); // Add this new state

  // Simulate initial loading (you can remove setTimeout if not needed)
  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 1000);
  }, []);

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      toast.error("Please enter a location");
      return;
    }
    
    setLoading(true);
    let retries = 3;
    
    while (retries > 0) {
      try {
        const response = await getLocationAlerts(location);
        if (response.status === 'success') {
          setNewsArticles(response.news);
          setAnalysis(response.analysis);
          const newAlerts = [
            {
              title: "Safety Analysis",
              description: response.analysis.analysis,
              type: "alert",
              time: "Current",
              location: location,
              severity: "medium"
            },
            ...response.analysis.alerts.map(alert => ({
              title: "Alert",
              description: alert,
              type: "warning",
              time: "Current",
              location: location,
              severity: "high"
            }))
          ];
          setAlerts(newAlerts);
          toast.success("Alerts updated for " + location);
          break;
        }
      } catch (error) {
        retries--;
        if (retries === 0) {
          toast.error("Failed to fetch alerts. Please try again later.");
          // Reset to default alerts if all retries fail
          setAlerts([/* your default alerts */]);
          setNewsArticles([]);
          setAnalysis(null);
        } else {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 p-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

        <div className="max-w-4xl mx-auto relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-white mb-8 text-center"
        >
          Weather & Disaster Alerts
        </motion.h1>

        <motion.form
          onSubmit={handleLocationSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex gap-4">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-indigo-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update Alerts
            </motion.button>
          </div>
        </motion.form>

        <div className="space-y-4">
          {/* Alerts Section */}
          {alerts.map((alert, index) => (
            <AlertCard key={index} {...alert} />
          ))}
          
          {/* News Articles Section */}
          {newsArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 p-6 rounded-xl backdrop-blur-lg border border-white/10 bg-white/5"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Recent News</h2>
              <div className="space-y-3">
                {newsArticles.map((article, index) => (
                  <a
                    key={index}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-indigo-300 hover:text-indigo-200 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{article.published}</p>
                  </a>
                ))}
              </div>
            </motion.div>
          )}

          {analysis && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-6 rounded-xl backdrop-blur-lg border border-white/10 bg-white/5"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Safety Analysis</h2>
              <div className="space-y-4">
                <p className="text-gray-300">{analysis.analysis}</p>
                {analysis.precautions && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-indigo-300 mb-2">Recommended Precautions</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {analysis.precautions.map((precaution, index) => (
                        <li key={index}>{precaution}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        <AnimatePresence>
            {(loading || initialLoading) && (
              <LoadingOverlay 
                message={loading ? "Updating Alerts..." : "Loading Weather & Disaster Alerts"} 
              />
            )}
          </AnimatePresence>
      </div>
      </div>
    </div>
    </Fragment>
  );
};

export default AlertsSystems;
