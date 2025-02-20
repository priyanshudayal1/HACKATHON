import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const LostAndFound = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        user_id: '', // Set this to the logged-in user's ID
        location: '',
        item_description: '',
        status: 'Lost',
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('/api/lost-found-items/');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleAddItem = async () => {
        if (newItem.item_description.trim()) {
            try {
                const response = await axios.post('/api/add-lost-found-item/', newItem);
                setItems([...items, response.data]);
                setNewItem({
                    user_id: '', // Set this to the logged-in user's ID
                    location: '',
                    item_description: '',
                    status: 'Lost',
                });
            } catch (error) {
                console.error('Error adding item:', error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleStatusChange = async (index) => {
        const item = items[index];
        if (item.status === 'Lost') {
            try {
                await axios.post('/api/update-lost-found-item/', {
                    report_id: item.report_id,
                    status: 'Recovered',
                });
                const updatedItems = items.map((item, i) =>
                    i === index ? { ...item, status: 'Recovered' } : item
                );
                setItems(updatedItems);
            } catch (error) {
                console.error('Error updating item status:', error);
            }
        }
    };

    const getItemClass = (status) => {
        switch (status) {
            case 'Lost':
                return 'bg-red-500';
            case 'Found':
                return 'bg-yellow-500';
            case 'Recovered':
                return 'bg-green-500';
            default:
                return 'bg-white/10';
        }
    };

    return (
        <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg shadow-indigo-500/20 transition-all duration-300">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-white mb-8"
            >
                Lost and Found
            </motion.h1>
            <div className="mb-4">
                <input
                    type="text"
                    name="location"
                    value={newItem.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                />
                <input
                    type="text"
                    name="item_description"
                    value={newItem.item_description}
                    onChange={handleChange}
                    placeholder="Describe the lost item"
                    className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                />
                <select
                    name="status"
                    value={newItem.status}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                >
                    <option value="Lost">Lost</option>
                    <option value="Found">Found</option>
                    <option value="Recovered">Recovered</option>
                </select>
            </div>
            <button
                onClick={handleAddItem}
                className="w-full p-3 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition-all duration-300"
            >
                Add Item
            </button>
            <div className="mt-6">
                <h2 className="text-2xl font-bold text-white mb-4">Items you added</h2>
                <ul className="space-y-4">
                    {items.map((item, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-lg ${getItemClass(item.status)} text-white`}
                        >
                            <p><strong>Location:</strong> {item.location}</p>
                            <p><strong>Description:</strong> {item.item_description}</p>
                            <p><strong>Status:</strong> {item.status}</p>
                            <p><strong>Date:</strong> {item.report_date}</p>
                            {item.status === 'Lost' && (
                                <button
                                    onClick={() => handleStatusChange(index)}
                                    className="mt-2 p-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300"
                                >
                                    Mark as Recovered
                                </button>
                            )}
                        </motion.li>
                    ))}
                </ul>
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-bold text-white mb-4">All Items</h2>
                <ul className="space-y-4">
                    {items.map((item, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-lg ${getItemClass(item.status)} text-white`}
                        >
                            <p><strong>Location:</strong> {item.location}</p>
                            <p><strong>Description:</strong> {item.item_description}</p>
                            <p><strong>Status:</strong> {item.status}</p>
                            <p><strong>Date:</strong> {item.report_date}</p>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LostAndFound;