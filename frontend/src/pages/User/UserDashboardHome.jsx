import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../store/useLogin";
import {
  User,
  Settings,
  LogOut,
  Map,
  Bell,
  Shield,
  Calendar,
  Navigation,
  History
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
  const { user, logout } = useLogin();

  const dashboardItems = [
    {
      icon: User,
      title: "Profile",
      description: "View and edit your profile",
      onClick: () => navigate("/profile")
    },
    {
      icon: Map,
      title: "Plan Trip",
      description: "Plan your next adventure",
      onClick: () => navigate("/plan-trip")
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "View your alerts and updates",
      onClick: () => navigate("/notifications")
    },
    {
      icon: Shield,
      title: "Safety Status",
      description: "Check area safety status",
      onClick: () => navigate("/safety")
    },
    {
      icon: Calendar,
      title: "Upcoming Trips",
      description: "View your planned trips",
      onClick: () => navigate("/trips")
    },
    {
      icon: Navigation,
      title: "Active Journey",
      description: "Track your current journey",
      onClick: () => navigate("/active-journey")
    },
    {
      icon: History,
      title: "Travel History",
      description: "View past trips and analytics",
      onClick: () => navigate("/history")
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Manage your preferences",
      onClick: () => navigate("/settings")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-white">TravelSafe</div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/profile")}
                className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                {user?.name || "User"}
              </button>
              <button
                onClick={logout}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24 pb-12">
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
      </div>
    </div>
  );
};

export default UserDashboardHome;
