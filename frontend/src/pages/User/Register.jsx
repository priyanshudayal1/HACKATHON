import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Lock,
  UserCircle,
  Shield,
  Users,
  Map,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useRegister } from "../../store/useRegister";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50"
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

const registerFeatures = [
  {
    icon: Shield,
    title: "Secure Registration",
    description: "Your data is protected with advanced encryption",
  },
  {
    icon: Users,
    title: "Join Community",
    description: "Connect with fellow travelers and share experiences",
  },
  {
    icon: Map,
    title: "Smart Features",
    description: "Access to AI-powered travel planning tools",
  },
];

export default function Register() {
  const navigate = useNavigate();
  const register = useRegister((state) => state.register);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    user_type: "Traveler",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) {
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 flex">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Features Section */}
      <div className="hidden lg:flex w-1/2 p-12 items-center">
        <div className="space-y-6 w-full max-w-lg">
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
              TravelGuard AI
            </h1>
            <h2 className="text-4xl font-bold text-white mb-8">
              Join Our Community
            </h2>
          </div>
          {registerFeatures.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Register Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/10"
        >
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2 text-center lg:hidden">
            TravelGuard AI
          </h1>
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white placeholder-white/60"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white placeholder-white/60"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <Phone
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white placeholder-white/60"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white placeholder-white/60"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <UserCircle
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <select
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white [&>option]:bg-white [&>option]:text-gray-900"
                value={formData.user_type}
                onChange={(e) =>
                  setFormData({ ...formData, user_type: e.target.value })
                }
              >
                <option value="Traveler">Traveler</option>
                <option value="Community">Community</option>
              </select>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/25"
              type="submit"
            >
              Register
            </motion.button>

            <p className="text-center text-gray-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
