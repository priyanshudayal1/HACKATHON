import { motion } from "framer-motion";
import { Bot, Sparkles, Loader2 } from "lucide-react";

const LoadingOverlay = ({ message = "AI is Processing" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl flex flex-col items-center gap-6 border border-white/20 shadow-xl"
      >
        <div className="relative">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
              borderColor: ['rgb(99 102 241)', 'rgb(168 85 247)', 'rgb(99 102 241)']
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-16 h-16 border-4 border-t-transparent rounded-full"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <Bot className="w-6 h-6 text-indigo-400" />
          </motion.div>
        </div>
        
        <div className="text-center space-y-3">
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-lg font-medium flex items-center gap-2 justify-center"
          >
            <Sparkles className="w-5 h-5 animate-pulse text-indigo-400" />
            {message}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-indigo-300 text-sm"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <p className="max-w-xs bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 text-transparent bg-clip-text animate-pulse">
              Finding the perfect options for your journey...
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="absolute -z-10 inset-0 opacity-30"
          animate={{ 
            background: [
              'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingOverlay;