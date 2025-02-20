import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, AlertCircle, Check, Info, Search, Map } from "lucide-react";

const stateGuidelines = [
  {
    id: 1,
    state: "Rajasthan",
    essentialRules: [
      "Carry sufficient water during desert tours",
      "Respect local customs and dress modestly",
      "Avoid outdoor activities during peak afternoon heat",
    ],
    optionalRules: [
      "Consider hiring local guides for fort visits",
      "Learn basic Hindi/Rajasthani phrases",
      "Carry cash as remote areas may not accept cards",
    ],
    permits: [
      "Inner Line Permit for restricted areas",
      "Special photography permits for monuments",
    ],
    safetyTips: [
      "Keep emergency contacts handy",
      "Use registered tourist vehicles",
      "Follow desert safety guidelines",
    ],
  },
  {
    id: 2,
    state: "Kerala",
    essentialRules: [
      "Carry mosquito repellent",
      "Follow boat safety guidelines",
      "Respect wildlife sanctuary rules",
    ],
    optionalRules: [
      "Try traditional Kerala cuisine",
      "Book homestays for authentic experience",
      "Learn basic Malayalam greetings",
    ],
    permits: ["Houseboat permits", "Wildlife sanctuary entry permits"],
    safetyTips: [
      "Be cautious during monsoon season",
      "Follow beach safety flags",
      "Carry necessary medications",
    ],
  },
  {
    id: 3,
    state: "Himachal Pradesh",
    essentialRules: [
      "Obtain necessary trekking permits",
      "Dress in warm layers due to unpredictable weather",
      "Follow local environmental conservation rules",
    ],
    optionalRules: [
      "Learn basic Hindi/Pahari greetings",
      "Respect local traditions and monasteries",
      "Avoid plastic usage",
    ],
    permits: [
      "Protected area permits for border regions",
      "Camping permits for certain areas",
    ],
    safetyTips: [
      "Check weather forecasts before traveling",
      "Hire local guides for high-altitude treks",
      "Carry altitude sickness medication",
    ],
  },
  {
    id: 4,
    state: "Goa",
    essentialRules: [
      "Follow beach safety guidelines",
      "Respect local culture and traditions",
      "Avoid littering and use designated trash bins",
    ],
    optionalRules: [
      "Try local Goan seafood",
      "Rent scooters for easier travel",
      "Explore lesser-known beaches",
    ],
    permits: [
      "Diving and water sports permits",
      "Forest entry permits for wildlife reserves",
    ],
    safetyTips: [
      "Be cautious of strong ocean currents",
      "Avoid isolated areas at night",
      "Stay hydrated in the tropical climate",
    ],
  },
  {
    id: 5,
    state: "Uttarakhand",
    essentialRules: [
      "Follow eco-tourism guidelines",
      "Respect religious sites and customs",
      "Obtain necessary trekking permits",
    ],
    optionalRules: [
      "Try local Garhwali and Kumaoni cuisine",
      "Book government-approved homestays",
      "Learn basic Hindi for communication",
    ],
    permits: [
      "Forest entry permits for trekking",
      "Pilgrimage permits for Kedarnath/Badrinath",
    ],
    safetyTips: [
      "Check road conditions during monsoon",
      "Carry appropriate winter clothing",
      "Follow designated trekking routes",
    ],
  },
  {
    id: 6,
    state: "Karnataka",
    essentialRules: [
      "Respect temple etiquette",
      "Follow wildlife sanctuary guidelines",
      "Carry sufficient water during treks",
    ],
    optionalRules: [
      "Try local Kannada cuisine",
      "Use public transport in Bangalore",
      "Visit during Dasara festival",
    ],
    permits: [
      "Heritage site photography permits",
      "Trekking permits for Western Ghats",
    ],
    safetyTips: [
      "Be cautious during monsoon season",
      "Use registered taxi services",
      "Keep emergency contacts handy",
    ],
  },
  {
    id: 7,
    state: "Gujarat",
    essentialRules: [
      "Respect local customs and traditions",
      "Follow Rann of Kutch visit guidelines",
      "Dress modestly at religious sites",
    ],
    optionalRules: [
      "Try traditional Gujarati thali",
      "Visit during Navratri festival",
      "Book heritage walks in old cities",
    ],
    permits: ["Rann Utsav permits", "Wildlife sanctuary permits"],
    safetyTips: [
      "Stay hydrated in hot climate",
      "Use sunscreen protection",
      "Follow desert safety rules",
    ],
  },
];

const StateCard = ({
  state,
  essentialRules,
  optionalRules,
  permits,
  safetyTips,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300 shadow-xl shadow-indigo-500/10"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
        <MapPin className="w-6 h-6 text-indigo-400" />
      </div>
      <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
        {state}
      </h3>
    </div>

    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <h4 className="font-semibold text-red-400">Essential Rules</h4>
        </div>
        <ul className="space-y-2">
          {essentialRules.map((rule, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-gray-300 group"
            >
              <Check className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors" />
              {rule}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-5 h-5 text-green-400" />
          <h4 className="font-semibold text-green-400">
            Optional Recommendations
          </h4>
        </div>
        <ul className="space-y-2">
          {optionalRules.map((rule, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-gray-300 group"
            >
              <Check className="w-4 h-4 text-green-400 group-hover:text-green-300 transition-colors" />
              {rule}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5 text-indigo-400" />
          <h4 className="font-semibold text-indigo-400">Required Permits</h4>
        </div>
        <ul className="space-y-2">
          {permits.map((permit, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-gray-300 group"
            >
              <Check className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              {permit}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5 text-yellow-400" />
          <h4 className="font-semibold text-yellow-400">Safety Tips</h4>
        </div>
        <ul className="space-y-2">
          {safetyTips.map((tip, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-gray-300 group"
            >
              <Check className="w-4 h-4 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
);

const StateWiseGuidelines = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStates, setFilteredStates] = useState(stateGuidelines);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = stateGuidelines.filter((state) =>
      state.state.toLowerCase().includes(query)
    );
    setFilteredStates(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 p-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-white inline-flex items-center gap-3">
            <Map className="w-8 h-8 text-indigo-400" />
            State Travel Guidelines
          </h1>
          <p className="text-indigo-200/80 text-lg max-w-2xl mx-auto">
            Essential travel information and safety guidelines for Indian states
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 max-w-md mx-auto"
        >
          <div className="relative group">
            <Search className="absolute left-3 top-3 w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            <input
              type="text"
              placeholder="Search state..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none hover:border-indigo-500/50 placeholder:text-gray-400"
            />
          </div>
        </motion.div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {filteredStates.map((stateData) => (
              <StateCard key={stateData.id} {...stateData} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StateWiseGuidelines;
