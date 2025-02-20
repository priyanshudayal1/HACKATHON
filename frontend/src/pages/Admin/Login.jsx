import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

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

const adminFeatures = [
    {
        icon: Shield,
        title: "Secure Admin Access",
        description: "Enhanced security protocols for administrative controls",
    },
    {
        icon: Settings,
        title: "System Management",
        description: "Complete control over platform settings and user management",
    },
    {
        icon: User,
        title: "Admin Dashboard",
        description: "Comprehensive overview of system metrics and activities",
    },
];

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your admin login logic here
        navigate('/admin/dashboard');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 flex">
            <Toaster position="top-center" reverseOrder={false} />
            
            {/* Features Section */}
            <div className="hidden lg:flex w-1/2 p-12 items-center">
                <div className="space-y-6 w-full max-w-lg">
                    <div>
                        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">TravelGuard AI</h1>
                        <h2 className="text-4xl font-bold text-white mb-8">Admin Portal</h2>
                    </div>
                    {adminFeatures.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>

            {/* Login Form Section */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/10"
                >
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2 text-center lg:hidden">TravelGuard AI</h1>
                    <h2 className="text-3xl font-bold text-center text-white mb-8">Admin Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div whileHover={{ scale: 1.02 }} className="relative">
                            <User className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white placeholder-white/60"
                                value={formData.username}
                                onChange={e => setFormData({...formData, username: e.target.value})}
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
                                onChange={e => setFormData({...formData, password: e.target.value})}
                                required
                            />
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/25"
                            type="submit"
                        >
                            Login
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;