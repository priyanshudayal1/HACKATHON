import React, { useState } from 'react';
import { motion } from "framer-motion";
import { MapPin, AlertCircle, Check, Info, Search } from 'lucide-react';

const stateGuidelines = [
    {
        id: 1,
        state: "Rajasthan",
        essentialRules: [
            "Carry sufficient water during desert tours",
            "Respect local customs and dress modestly",
            "Avoid outdoor activities during peak afternoon heat"
        ],
        optionalRules: [
            "Consider hiring local guides for fort visits",
            "Learn basic Hindi/Rajasthani phrases",
            "Carry cash as remote areas may not accept cards"
        ],
        permits: ["Inner Line Permit for restricted areas", "Special photography permits for monuments"],
        safetyTips: [
            "Keep emergency contacts handy",
            "Use registered tourist vehicles",
            "Follow desert safety guidelines"
        ]
    },
    {
        id: 2,
        state: "Kerala",
        essentialRules: [
            "Carry mosquito repellent",
            "Follow boat safety guidelines",
            "Respect wildlife sanctuary rules"
        ],
        optionalRules: [
            "Try traditional Kerala cuisine",
            "Book homestays for authentic experience",
            "Learn basic Malayalam greetings"
        ],
        permits: ["Houseboat permits", "Wildlife sanctuary entry permits"],
        safetyTips: [
            "Be cautious during monsoon season",
            "Follow beach safety flags",
            "Carry necessary medications"
        ]
    },
    {
        id: 3,
        state: "Himachal Pradesh",
        essentialRules: [
            "Obtain necessary trekking permits",
            "Dress in warm layers due to unpredictable weather",
            "Follow local environmental conservation rules"
        ],
        optionalRules: [
            "Learn basic Hindi/Pahari greetings",
            "Respect local traditions and monasteries",
            "Avoid plastic usage"
        ],
        permits: ["Protected area permits for border regions", "Camping permits for certain areas"],
        safetyTips: [
            "Check weather forecasts before traveling",
            "Hire local guides for high-altitude treks",
            "Carry altitude sickness medication"
        ]
    },
    {
        id: 4,
        state: "Goa",
        essentialRules: [
            "Follow beach safety guidelines",
            "Respect local culture and traditions",
            "Avoid littering and use designated trash bins"
        ],
        optionalRules: [
            "Try local Goan seafood",
            "Rent scooters for easier travel",
            "Explore lesser-known beaches"
        ],
        permits: ["Diving and water sports permits", "Forest entry permits for wildlife reserves"],
        safetyTips: [
            "Be cautious of strong ocean currents",
            "Avoid isolated areas at night",
            "Stay hydrated in the tropical climate"
        ]
    },
    {
        id: 5,
        state: "Uttarakhand",
        essentialRules: [
            "Follow eco-tourism guidelines",
            "Respect religious sites and customs",
            "Obtain necessary trekking permits"
        ],
        optionalRules: [
            "Try local Garhwali and Kumaoni cuisine",
            "Book government-approved homestays",
            "Learn basic Hindi for communication"
        ],
        permits: ["Forest entry permits for trekking", "Pilgrimage permits for Kedarnath/Badrinath"],
        safetyTips: [
            "Check road conditions during monsoon",
            "Carry appropriate winter clothing",
            "Follow designated trekking routes"
        ]
    }
    ,
    {
        id: 6,
        state: "Karnataka",
        essentialRules: [
            "Respect temple etiquette",
            "Follow wildlife sanctuary guidelines",
            "Carry sufficient water during treks"
        ],
        optionalRules: [
            "Try local Kannada cuisine",
            "Use public transport in Bangalore",
            "Visit during Dasara festival"
        ],
        permits: ["Heritage site photography permits", "Trekking permits for Western Ghats"],
        safetyTips: [
            "Be cautious during monsoon season",
            "Use registered taxi services",
            "Keep emergency contacts handy"
        ]
    },
    {
        id: 7,
        state: "Gujarat",
        essentialRules: [
            "Respect local customs and traditions",
            "Follow Rann of Kutch visit guidelines",
            "Dress modestly at religious sites"
        ],
        optionalRules: [
            "Try traditional Gujarati thali",
            "Visit during Navratri festival",
            "Book heritage walks in old cities"
        ],
        permits: ["Rann Utsav permits", "Wildlife sanctuary permits"],
        safetyTips: [
            "Stay hydrated in hot climate",
            "Use sunscreen protection",
            "Follow desert safety rules"
        ]
    }
];


const StateCard = ({ state, essentialRules, optionalRules, permits, safetyTips }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
    >
        <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
                <MapPin className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white">{state}</h3>
        </div>

        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 text-red-400 mb-3">
                    <AlertCircle className="w-5 h-5" />
                    <h4 className="font-semibold">Essential Rules</h4>
                </div>
                <ul className="space-y-2">
                    {essentialRules.map((rule, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                            <Check className="w-4 h-4 text-red-400" />
                            {rule}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <div className="flex items-center gap-2 text-green-400 mb-3">
                    <Info className="w-5 h-5" />
                    <h4 className="font-semibold">Optional Recommendations</h4>
                </div>
                <ul className="space-y-2">
                    {optionalRules.map((rule, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                            <Check className="w-4 h-4 text-green-400" />
                            {rule}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <div className="flex items-center gap-2 text-indigo-400 mb-3">
                    <AlertCircle className="w-5 h-5" />
                    <h4 className="font-semibold">Required Permits</h4>
                </div>
                <ul className="space-y-2">
                    {permits.map((permit, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                            <Check className="w-4 h-4 text-indigo-400" />
                            {permit}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <div className="flex items-center gap-2 text-yellow-400 mb-3">
                    <AlertCircle className="w-5 h-5" />
                    <h4 className="font-semibold">Safety Tips</h4>
                </div>
                <ul className="space-y-2">
                    {safetyTips.map((tip, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                            <Check className="w-4 h-4 text-yellow-400" />
                            {tip}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </motion.div>
);

const StateWiseGuidelines = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredStates, setFilteredStates] = useState(stateGuidelines);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = stateGuidelines.filter(state =>
            state.state.toLowerCase().includes(query)
        );
        setFilteredStates(filtered);
    };

    return (
        <div className="container mx-auto p-4 text-white">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-8"
            >
                State Travel Guidelines
            </motion.h2>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
            >
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 max-w-md">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search state..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-400"
                    />
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStates.map((stateData) => (
                    <StateCard key={stateData.id} {...stateData} />
                ))}
            </div>
        </div>
    );
};

export default StateWiseGuidelines;
