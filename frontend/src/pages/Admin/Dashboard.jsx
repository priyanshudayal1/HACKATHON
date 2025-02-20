import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Settings, PlusSquare, List, LogOut, Home } from 'lucide-react';
import { motion } from 'framer-motion';


const AdminDashboard = () => {
    const dashboardItems = [
        { title: 'Home', icon: <Home />, color: 'bg-blue-500/10', path: '/admin/home' },
        { title: 'Add Alerts', icon: <AddAlerts />, color: 'bg-indigo-500/10', path: 'admin/manage-users' },
        { title: 'View Reports', icon: <BarChart />, color: 'bg-green-500/10', path: 'admin/view-reports' },
        { title: 'View Reviews', icon: <PlusSquare />, color: 'bg-orange-500/10', path: 'admin/add-product' },
        { title: '', icon: <List />, color: 'bg-red-500/10', path: 'admin/view-orders' },
        { title: 'Settings', icon: <Settings />, color: 'bg-purple-500/10', path: 'admin/settings' },
        { title: 'Logout', icon: <LogOut />, color: 'bg-brown-500/10', path: '/logout' },
    ];

    return (
        <div className="min-h-screen flex">
            <div className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
                <ul>
                    {dashboardItems.map((item, index) => (
                        <li key={index} className="mb-2">
                            <Link to={item.path} className="flex items-center p-2 rounded hover:bg-gray-700">
                                <div className="p-2 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
                                    {item.icon}
                                </div>
                                <span className="ml-2">{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 p-8">
                <div className="container mx-auto mt-10">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-8 text-center">Admin Dashboard</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {dashboardItems.slice(1).map((item, index) => (
                            <motion.div 
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`p-6 rounded-lg shadow-lg ${item.color} backdrop-blur-lg border border-white/10 hover:border-indigo-500/50`}
                            >
                                <Link to={item.path} className="flex flex-col items-center justify-center h-full text-white">
                                    <div className="p-2 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
                                        {item.icon}
                                    </div>
                                    <p className="mt-2 text-lg font-semibold">{item.title}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
