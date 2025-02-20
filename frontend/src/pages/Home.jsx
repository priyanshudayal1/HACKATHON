import { motion } from "framer-motion";
import {
  AlertTriangle,
  MapPin,
  Map,
  Cloud,
  Calculator,
  Bus,
  FileCheck,
  Languages,
  Luggage,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.02 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
          <Icon className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const features = [
  {
    icon: AlertTriangle,
    title: "Real-Time Safety Alerts",
    description:
      "AI-powered risk assessment using social media sentiment analysis and government alerts",
  },
  {
    icon: MapPin,
    title: "Smart SOS & Emergency Locator",
    description:
      "One-tap SOS system with live location sharing and nearest safe zones",
  },
  {
    icon: Map,
    title: "Crowdsourced Safety Map",
    description: "Real-time community-based safety insights for travelers",
  },
  {
    icon: Cloud,
    title: "Weather & Disaster Alerts",
    description: "AI-driven natural disaster alerts with evacuation routes",
  },
  {
    icon: Calculator,
    title: "Budget Travel Planner",
    description: "AI-based budget optimizer for affordable travel",
  },
  {
    icon: Bus,
    title: "Transport Guide",
    description: "Real-time local transport fare estimator and trip planning",
  },
  // {
  //   icon: WalletCards,
  //   title: "Expense Splitter",
  //   description: "Automated cost-splitting with UPI integration",
  // },
  {
    icon: FileCheck,
    title: "Digital Permit Guide",
    description: "AI-based permit requirements and application assistance",
  },
  {
    icon: Languages,
    title: "Smart Translator",
    description: "Offline AI-powered language translation",
  },
  {
    icon: Luggage,
    title: "Luggage Recovery",
    description: "Community-powered tracking system for lost belongings",
  },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-white">Yatra Karo</div>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 pt-32 pb-20 text-center relative"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-white mb-6"
        >
          Travel Smart, Travel Safe
        </motion.h1>
        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
        >
          Your AI-powered travel companion for a safer, smarter, and more
          sustainable journey across India
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50">
            Get Started
          </button>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 pb-24 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
