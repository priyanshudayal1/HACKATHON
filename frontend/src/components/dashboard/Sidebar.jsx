import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Map,
  Bell,
  Settings,
  LogOut,
  Sparkles,
  Package,
  Navigation,
  Shield,
  CloudSun,
  Globe,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NavItem = ({ icon: Icon, label, path, isActive, onClick }) => (
  <motion.div
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
    className="relative group"
  >
    <Link
      to={path}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/50 shadow-lg shadow-indigo-500/10"
          : "text-gray-400 hover:bg-white/5 hover:text-indigo-300"
      }`}
      onClick={onClick}
    >
      <div
        className={`relative transition-transform duration-300 ${
          isActive ? "scale-110" : "group-hover:scale-110"
        }`}
      >
        <Icon className="w-5 h-5" />
        {isActive && (
          <motion.div
            layoutId="nav-icon-glow"
            className="absolute inset-0 blur-sm"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          >
            <Icon className="w-5 h-5 text-indigo-400" />
          </motion.div>
        )}
      </div>
      <span className="flex-1">{label}</span>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <ChevronRight className="w-4 h-4 text-indigo-400" />
        </motion.div>
      )}
    </Link>
    {isActive && (
      <motion.div
        layoutId="nav-active-indicator"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
  </motion.div>
);

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, handleLogout }) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Navigation, label: "Travel Guide", path: "/dashboard/transport" },
    { icon: Map, label: "Safety Map", path: "/dashboard/safety-map" },
    { icon: Package, label: "Lost & Found", path: "/dashboard/lost-found" },
    { icon: Shield, label: "Insurance", path: "/dashboard/insurance" },
    { icon: Globe, label: "Translator", path: "/dashboard/smart-translator" },
    { icon: CloudSun, label: "Weather Alerts", path: "/dashboard/weather" },
    { icon: Bell, label: "Guidelines", path: "/dashboard/guidelines" },
    { icon: User, label: "Profile", path: "/dashboard/profile" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
      className="fixed top-0 left-0 h-full w-[280px] bg-gray-900/50 backdrop-blur-xl border-r border-white/10 transform md:translate-x-0 transition-transform duration-300 ease-in-out z-50"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(99,102,241,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(168,85,247,0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(99,102,241,0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="flex flex-col h-full p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8 group"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-indigo-500/50 relative overflow-hidden"
          >
            <Sparkles className="w-6 h-6 text-indigo-400 relative z-10" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300"
              whileHover={{ opacity: 0.2 }}
            />
          </motion.div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
            Yatra Karo
          </h2>
        </motion.div>

        <nav className="flex-1 space-y-1.5">
          <AnimatePresence>
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <NavItem
                  {...item}
                  isActive={isActive(item.path)}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-4 border-t border-white/10"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            <span>Logout</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
