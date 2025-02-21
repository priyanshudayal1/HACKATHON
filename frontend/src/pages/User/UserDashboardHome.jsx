import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../store/useLogin";
import {
  User,
  Map,
  Bell,
  MessageCircle,
  Calculator,
  Bus,
  Luggage,
  AlertTriangle,
  AlertOctagon,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const ErrorModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl max-w-md w-full mx-4 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-red-500/10 ring-1 ring-red-500/50">
            <AlertOctagon className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Error</h3>
        </div>
        <p className="text-gray-300 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

const ConfirmModal = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-xl max-w-md w-full mx-4 shadow-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-red-500/10 ring-1 ring-red-500/50">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Send SOS Alert</h3>
        </div>
        <p className="text-gray-300 mb-6">
          Are you sure you want to send an SOS alert? This will notify emergency
          services and your emergency contacts with your current location.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <span>Send SOS</span>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const DashboardCard = ({ icon: Icon, title, description, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-indigo-500/10"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50 group-hover:bg-indigo-500/20 transition-all duration-300">
          <Icon className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-indigo-200 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const UserDashboardHome = () => {
  const navigate = useNavigate();
  const { user, sendSOSAlert } = useLogin();
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSendingAlert, setIsSendingAlert] = useState(false);

  const handleSendSOS = async () => {
    try {
      setIsSendingAlert(true);

      if (!navigator.geolocation) {
        throw new Error("Geolocation is not supported by your browser");
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                reject(
                  new Error("Please allow location access to send SOS alerts")
                );
                break;
              case error.POSITION_UNAVAILABLE:
                reject(new Error("Location information is unavailable"));
                break;
              case error.TIMEOUT:
                reject(new Error("Location request timed out"));
                break;
              default:
                reject(new Error("Failed to get your location"));
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      });

      const coordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      const { success, error } = await sendSOSAlert(user.id, coordinates);

      if (!success) {
        throw new Error(error);
      }
    } catch (error) {
      setErrorMessage(error.message || "An unexpected error occurred");
      setShowErrorModal(true);
    } finally {
      setIsSendingAlert(false);
      setShowSOSModal(false);
    }
  };

  const handleOpenSOSModal = () => {
    setShowSOSModal(true);
  };

  const dashboardItems = [
    {
      icon: Calculator,
      title: "Budget Planner",
      description: "AI-based budget optimizer",
      onClick: () => navigate("/dashboard/budget"),
    },
    {
      icon: Map,
      title: "AI Travel Suggestions",
      description: "Personalized travel recommendations",
      onClick: () => navigate("/dashboard/travel-suggestions"),
    },
    {
      icon: Luggage,
      title: "Lost & Found Items",
      description: "Report and find lost items",
      onClick: () => navigate("/dashboard/lost-found"),
    },
    {
      icon: Bus,
      title: "Transport Guide",
      description: "Real-time transport fare estimator",
      onClick: () => navigate("/dashboard/transport"),
    },
    {
      icon: Map,
      title: "Smart SOS & Emergency Locator",
      description: "Quick emergency assistance",
      onClick: handleOpenSOSModal,
    },
    {
      icon: Map,
      title: "Crowdsourced Safety Map",
      description: "Real-time community safety updates",
      onClick: () => navigate("/dashboard/safety-map"),
    },
    {
      icon: MessageCircle,
      title: "Weather & Disaster Alerts",
      description: "Real-time weather updates",
      onClick: () => navigate("/dashboard/weather"),
    },
    {
      icon: User,
      title: "Smart Translator",
      description: "Instant language translation",
      onClick: () => navigate("/dashboard/smart-translator"),
    },
    {
      icon: Luggage,
      title: "Travel Insurance Helper",
      description: "Get assistance with travel insurance",
      onClick: () => navigate("/dashboard/insurance"),
    },
    {
      icon: Bell,
      title: "Statewise Guidelines",
      description: "Travel guidelines for different states",
      onClick: () => navigate("/dashboard/guidelines"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="p-2 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Welcome back, {user?.name?.split(" ")[0] || "Traveler"}!
          </h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dashboardItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DashboardCard {...item} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ConfirmModal
        isOpen={showSOSModal}
        onClose={() => setShowSOSModal(false)}
        onConfirm={handleSendSOS}
        isLoading={isSendingAlert}
      />

      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={errorMessage}
      />
    </>
  );
};

export default UserDashboardHome;
