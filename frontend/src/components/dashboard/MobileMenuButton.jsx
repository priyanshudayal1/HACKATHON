import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MobileMenuButton = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="md:hidden fixed top-4 left-4 z-[60] p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white shadow-lg transition-all duration-300 hover:bg-white/15 hover:border-indigo-500/50 hover:shadow-indigo-500/25 group"
    >
      <div className="relative">
        <AnimatePresence mode="wait">
          {isMobileMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ 
                duration: 0.3,
                ease: [0.23, 1, 0.32, 1] 
              }}
              className="text-indigo-300"
            >
              <X className="w-6 h-6" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.5 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 blur-sm opacity-50"
              >
                <X className="w-6 h-6" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ 
                duration: 0.3,
                ease: [0.23, 1, 0.32, 1] 
              }}
              className="text-indigo-300"
            >
              <Menu className="w-6 h-6" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.5 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 blur-sm opacity-50"
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{ 
          background: [
            'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.15) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.15) 0%, transparent 60%)',
            'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.15) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </motion.button>
  );
};

export default MobileMenuButton;
