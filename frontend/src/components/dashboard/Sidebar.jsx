import { Link, useLocation } from "react-router-dom";
import { Home, User, Map, Bell, MessageCircle, Settings } from "lucide-react";

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen, handleLogout }) => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: User, label: "Profile", path: "/dashboard/profile" },
    { icon: Map, label: "Maps", path: "/dashboard/maps" },
    { icon: Bell, label: "Alerts", path: "/dashboard/alerts" },
    { icon: MessageCircle, label: "Messages", path: "/dashboard/messages" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900/50 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-8">SafeTravel</h2>
        <nav className="space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path) ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-400 hover:bg-white/5'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="absolute bottom-8 left-6 right-6 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
