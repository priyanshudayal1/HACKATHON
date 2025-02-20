import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

const LoadingOverlay = ({ message = "AI is Processing" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl flex flex-col items-center gap-6"
      >
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <Bot className="w-6 h-6 text-indigo-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-white text-lg font-medium flex items-center gap-2 justify-center">
            <Sparkles className="w-5 h-5 animate-pulse" />
            {message}
          </p>
          <p className="text-indigo-300 text-sm max-w-xs">
            Analyzing routes and generating the best travel options for you...
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingOverlay;