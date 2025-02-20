import { motion } from "framer-motion";
import {
  Map,
  Calculator,
  Bus,
  Luggage,
  MessageCircle,
  User,
  Bell,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100 
      }}
      className="group p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 cursor-pointer hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-500"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50 group-hover:bg-indigo-500/20 transition-all duration-500">
          <Icon className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-indigo-200 transition-colors">{title}</h3>
          <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const features = [
  {
    icon: Calculator,
    title: "Budget Planner",
    description: "AI-based budget optimizer",
    onClick: () => {},
  },
  {
    icon: Map,
    title: "AI Travel Suggestions",
    description: "Personalized travel recommendations",
    onClick: () => {},
  },
  {
    icon: Luggage,
    title: "Lost & Found Items",
    description: "Report and find lost items",
    onClick: () => {},
  },
  {
    icon: Bus,
    title: "Transport Guide",
    description: "Real-time transport fare estimator",
    onClick: () => {},
  },
  {
    icon: Map,
    title: "Smart SOS & Emergency Locator",
    description: "Quick emergency assistance",
    onClick: () => {},
  },
  {
    icon: Map,
    title: "Crowdsourced Safety Map",
    description: "Real-time community safety updates",
    onClick: () => {},
  },
  {
    icon: MessageCircle,
    title: "Weather & Disaster Alerts",
    description: "Real-time weather updates",
    onClick: () => {},
  },
  {
    icon: User,
    title: "Smart Translator",
    description: "Instant language translation",
    onClick: () => {},
  },
  {
    icon: Luggage,
    title: "Travel Insurance Helper",
    description: "Get assistance with travel insurance",
    onClick: () => {},
  },
  {
    icon: Bell,
    title: "Statewise Guidelines",
    description: "Travel guidelines for different states",
    onClick: () => {},
  },
];

const Home = () => {
  const navigate = useNavigate();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(78,76,161,0.2),transparent)]" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-6 h-6 text-indigo-400" />
              <span className="text-xl font-bold text-white">Yatra Karo</span>
            </motion.div>
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex gap-4"
            >
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50"
              >
                Register
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-32 pb-20 text-center relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium"
          >
            Your Smart Travel Companion
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-white mb-6 leading-tight"
          >
            Travel Smart, <br className="hidden sm:block" />Travel Safe
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
          >
            Your AI-powered travel companion for a safer, smarter, and more
            sustainable journey across India
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex gap-4 justify-center"
          >
            <button 
              onClick={() => navigate("/dashboard")}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50 flex items-center gap-2"
            >
              <span>Get Started</span>
              <Sparkles className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 pb-24 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
