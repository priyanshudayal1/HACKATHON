import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/admin/dashboard');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
            <div className="flex items-center justify-center min-h-screen relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 w-full max-w-md mx-4"
                >
                    <motion.h2 
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-white"
                    >
                        Admin Login
                    </motion.h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="username">
                                Username
                            </label>
                            <div className="flex items-center border border-white/10 rounded-lg focus-within:border-indigo-500/50 transition-colors bg-white/5">
                                <User className="ml-3 text-indigo-400" size={20} />
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-3 outline-none bg-transparent text-white placeholder-gray-400"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
                                Password
                            </label>
                            <div className="flex items-center border border-white/10 rounded-lg focus-within:border-indigo-500/50 transition-colors bg-white/5">
                                <Lock className="ml-3 text-indigo-400" size={20} />
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 outline-none bg-transparent text-white placeholder-gray-400"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </motion.div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50"
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