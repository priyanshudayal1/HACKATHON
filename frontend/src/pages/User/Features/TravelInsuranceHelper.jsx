import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Shield, Star, Check, IndianRupee } from 'lucide-react';

const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

const insuranceData = [
    {
        id: 1,
        name: "Basic Travel Guard",
        provider: "SafeTravel Co",
        price: 24999,
        coverage: 4000000,
        rating: 4.2,
        features: ["Medical Emergency", "Trip Cancellation", "Lost Baggage"],
        stars: 4
    },
    {
        id: 2,
        name: "Premium Voyager Shield",
        provider: "GlobalGuard",
        price: 49999,
        coverage: 8000000,
        rating: 4.8,
        features: ["Medical Emergency", "Trip Cancellation", "Lost Baggage", "Adventure Sports", "24/7 Support"],
        stars: 5
    },
    {
        id: 3,
        name: "Economy Safeguard",
        provider: "TravelSure",
        price: 14999,
        coverage: 2000000,
        rating: 3.9,
        features: ["Medical Emergency", "Lost Baggage"],
        stars: 3
    },
    {
        id: 4,
        name: "Elite Explorer Plus",
        provider: "TravelMax",
        price: 79999,
        coverage: 12000000,
        rating: 4.9,
        features: ["Medical Emergency", "Trip Cancellation", "Lost Baggage", "Adventure Sports", "24/7 Support", "Luxury Hotel Coverage", "Private Transport"],
        stars: 5
    },
    {
        id: 5,
        name: "Student Traveler",
        provider: "EduGuard",
        price: 9999,
        coverage: 1500000,
        rating: 4.0,
        features: ["Medical Emergency", "Lost Baggage", "Study Interruption Cover"],
        stars: 4
    },
    {
        id: 6,
        name: "Family Shield Pro",
        provider: "FamilySafe",
        price: 34999,
        coverage: 6000000,
        rating: 4.5,
        features: ["Medical Emergency", "Trip Cancellation", "Lost Baggage", "Child Care", "Family Visit"],
        stars: 4
    }
];

const StarRating = ({ rating, onRatingChange }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                        star <= (hover || rating) 
                            ? "fill-indigo-500 text-indigo-500" 
                            : "fill-transparent text-gray-400"
                    }`}
                    onClick={() => onRatingChange(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                />
            ))}
        </div>
    );
};

const TravelInsuranceHelper = () => {
    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 100000,
        minStars: 0,
        coverage: 0 // Changed from 'all' to 0
    });

    const [filteredInsurance, setFilteredInsurance] = useState(insuranceData);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);

        // Apply filters
        const filtered = insuranceData.filter(insurance => {
            return (
                insurance.price >= newFilters.minPrice &&
                insurance.price <= newFilters.maxPrice &&
                insurance.stars >= newFilters.minStars &&
                (newFilters.coverage === 0 || insurance.coverage >= parseInt(newFilters.coverage))
            );
        });
        setFilteredInsurance(filtered);
    };

    const handleStarFilter = (stars) => {
        const newFilters = { ...filters, minStars: stars };
        setFilters(newFilters);

        const filtered = insuranceData.filter(insurance => {
            return (
                insurance.price >= newFilters.minPrice &&
                insurance.price <= newFilters.maxPrice &&
                insurance.stars >= newFilters.minStars &&
                (newFilters.coverage === 0 || insurance.coverage >= parseInt(newFilters.coverage))
            );
        });
        setFilteredInsurance(filtered);
    };

    return (
        <div className="container mx-auto p-4 text-white">
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-8 text-white"
            >
                Travel Insurance Plans
            </motion.h2>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="filters mb-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
                    <label className="text-gray-300 block mb-2">Min Price</label>
                    <input
                        type="range"
                        name="minPrice"
                        min="0"
                        max="100000"
                        step="1000"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        className="w-full accent-indigo-500"
                    />
                    <span className="text-indigo-400">{formatINR(filters.minPrice)}</span>
                </div>
                
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
                    <label className="text-gray-300 block mb-2">Max Price</label>
                    <input
                        type="range"
                        name="maxPrice"
                        min="0"
                        max="100000"
                        step="1000"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        className="w-full accent-indigo-500"
                    />
                    <span className="text-indigo-400">{formatINR(filters.maxPrice)}</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
                    <label className="text-gray-300 block mb-2">Minimum Rating</label>
                    <StarRating 
                        rating={filters.minStars} 
                        onRatingChange={handleStarFilter}
                    />
                </div>
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
                    <label className="text-gray-300 block mb-2">Min Coverage</label>
                    <input
                        type="range"
                        name="coverage"
                        min="0"
                        max="10000000"
                        step="1000000"
                        value={filters.coverage}
                        onChange={handleFilterChange}
                        className="w-full accent-indigo-500"
                    />
                    <span className="text-indigo-400">
                        {filters.coverage === 0 
                            ? 'Any' 
                            : `${formatINR(filters.coverage)}`
                        }
                    </span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInsurance.map((insurance, index) => (
                    <motion.div
                        key={insurance.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
                                <Shield className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">{insurance.name}</h3>
                                <p className="text-gray-400">{insurance.provider}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-1 my-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                    key={star}
                                    className={`w-5 h-5 ${
                                        star <= insurance.stars 
                                            ? "fill-indigo-500 text-indigo-500" 
                                            : "fill-transparent text-gray-400"
                                    }`}
                                />
                            ))}
                        </div>
                        
                        <div className="flex items-center gap-2 text-2xl font-bold text-indigo-400 my-3">
                            <IndianRupee className="w-5 h-5" />
                            <span>{(insurance.price).toLocaleString('en-IN')}</span>
                        </div>
                        
                        <p className="text-gray-300">
                            Coverage: {formatINR(insurance.coverage)}
                        </p>
                        
                        <div className="mt-4">
                            <p className="text-gray-300 mb-2">Features:</p>
                            <ul className="space-y-2">
                                {insurance.features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2 text-gray-400">
                                        <Check className="w-4 h-4 text-indigo-400" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <button className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
                            Select Plan
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TravelInsuranceHelper;
