import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../store/useLogin";
import {
  User,
  Settings,
  Map,
  Bell,
  MessageCircle,
  Calculator,
  Bus,
  Luggage,
} from "lucide-react";

const DashboardCard = ({ icon: Icon, title, description, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 cursor-pointer hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
          <Icon className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const UserDashboardHome = () => {
  const navigate = useNavigate();
  const { user } = useLogin();

  const dashboardItems = [
    {
      icon: Calculator,
      title: "Budget Planner",
      description: "AI-based budget optimizer",
      onClick: () => navigate("/dashboard/budget"),
    },
    {
      icon: Luggage, // Updated icon for Lost & Found Items
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
      onClick: () => navigate("/dashboard/emergency"),
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
      icon: Settings,
      title: "Digital Permit Guide",
      description: "Guided instructions for digital permits",
      onClick: () => navigate("/dashboard/digital-permit"),
    },
    {
      icon: User, // Using the User icon for Smart Translator
      title: "Smart Translator",
      description: "Instant language translation",
      onClick: () => navigate("/dashboard/smart-translator"),
    },
  ];

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-white mb-8"
      >
        Welcome back, {user?.name?.split(" ")[0] || "Traveler"}!
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </>
  );
};

export default UserDashboardHome;
