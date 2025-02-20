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
      icon: User,
      title: "Profile",
      description: "View and edit your profile",
      onClick: () => navigate("/dashboard/profile"),
    },
    {
      icon: Map,
      title: "Maps",
      description: "View travel maps",
      onClick: () => navigate("/dashboard/maps"),
    },
    {
      icon: Bell,
      title: "Alerts",
      description: "View your alerts and updates",
      onClick: () => navigate("/dashboard/alerts"),
    },
    {
      icon: MessageCircle,
      title: "Messages",
      description: "View your messages",
      onClick: () => navigate("/dashboard/messages"),
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Manage your preferences",
      onClick: () => navigate("/dashboard/settings"),
    },
    {
      icon: Calculator,
      title: "Budget Planner",
      description: "AI-based budget optimizer for affordable travel",
      onClick: () => navigate("/dashboard/budget"),
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
