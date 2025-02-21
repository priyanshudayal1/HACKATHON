import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../store/useLogin";
import Sidebar from "./dashboard/Sidebar";
import MobileMenuButton from "./dashboard/MobileMenuButton";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const UserDashboardLayout = () => {
  const navigate = useNavigate();
  const { logout } = useLogin();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            background: [
              'radial-gradient(circle at 0% 0%, rgba(99,102,241,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(168,85,247,0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(99,102,241,0.15) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(78,76,161,0.2),transparent)]" />
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="absolute top-1/4 left-1/4"
        >
          <Sparkles className="w-6 h-6 text-indigo-400/30" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
          className="absolute top-3/4 right-1/4"
        >
          <Sparkles className="w-4 h-4 text-purple-400/30" />
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {!isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <MobileMenuButton
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex relative">
        <Sidebar
          isMobileMenuOpen={!isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          handleLogout={handleLogout}
        />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 md:ml-[280px] transition-all duration-300"
        >
          <div className="container mx-auto p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <Outlet />
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
