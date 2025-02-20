import { useNavigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useLogin } from "../store/useLogin";
import {
  User,
  Settings,
  Map,
  Shield,
  LogOut,
  MessageCircle,
  Bell,
  Home,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const UserDashboardLayout = () => {
  const navigate = useNavigate();
  const { logout } = useLogin();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: User, label: "Profile", path: "/dashboard/profile" },
    { icon: Map, label: "Travel Maps", path: "/dashboard/maps" },
    { icon: Shield, label: "Safety Alerts", path: "/dashboard/alerts" },
    { icon: MessageCircle, label: "Messages", path: "/dashboard/messages" },
    { icon: Bell, label: "Notifications", path: "/dashboard/notifications" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black/20 backdrop-blur-lg rounded-lg text-white"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: isMobileMenuOpen ? 0 : -250 }}
          className={`w-64 h-screen bg-black/20 backdrop-blur-lg border-r border-white/10 fixed md:translate-x-0 z-40
            ${
              isMobileMenuOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }
            transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4">
            <motion.h2
              className="text-xl font-bold text-white mb-8 relative"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                TravelSafe
              </span>
              <div className="absolute -bottom-2 left-0 w-12 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500" />
            </motion.h2>
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <motion.button
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full p-3 text-gray-300 hover:bg-white/10 rounded-lg 
                    transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group"
                >
                  <item.icon className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                  <span className="group-hover:text-blue-400 transition-colors">
                    {item.label}
                  </span>
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-3 text-red-400 hover:bg-red-500/10 rounded-lg 
                  transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group"
              >
                <LogOut className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                <span className="group-hover:text-red-500 transition-colors">
                  Logout
                </span>
              </motion.button>
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="w-full md:ml-64 transition-all duration-300">
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
