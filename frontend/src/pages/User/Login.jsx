import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Shield, UserCheck, Clock, Sparkles } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useLogin } from "../../store/useLogin";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
  >
    <div className="flex items-start gap-4">
      <div className="p-2 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50 group-hover:bg-indigo-500/20">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

const loginFeatures = [
  {
    icon: Shield,
    title: "Secure Login",
    description: "Advanced encryption to protect your account and data",
  },
  {
    icon: UserCheck,
    title: "Personalized Experience",
    description: "Access your saved preferences and trip history",
  },
  {
    icon: Clock,
    title: "Quick Access",
    description: "Instant access to all travel safety features",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const login = useLogin((state) => state.login);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    if (success) {
      navigate("/dashboard");
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 flex relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(78,76,161,0.2),transparent)]" />
      </div>
      
      <Toaster position="top-center" reverseOrder={false} />

      {/* Features Section */}
      <div className="hidden lg:flex w-1/2 p-12 items-center relative">
        <div className="space-y-6 w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-8 h-8 text-indigo-400" />
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Yatra Karo
              </h1>
            </div>
            <h2 className="text-4xl font-bold text-white mb-8">
              Welcome Back!
            </h2>
          </motion.div>
          {loginFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative">
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/10 shadow-xl"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Yatra Karo
            </h1>
          </div>
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              className="relative group"
            >
              <Mail className="absolute left-3 top-3 text-gray-400 group-hover:text-indigo-400 transition-colors" size={20} />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white placeholder-white/60 transition-all duration-300"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }} 
              className="relative group"
            >
              <Lock className="absolute left-3 top-3 text-gray-400 group-hover:text-indigo-400 transition-colors" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white placeholder-white/60 transition-all duration-300"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50"
              type="submit"
            >
              Login
            </motion.button>

            <p className="text-center text-gray-300 mt-6">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline transition-colors"
              >
                Register here
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
