import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Star, Check, IndianRupee } from "lucide-react";

const formatINR = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
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
    stars: 4,
  },
  {
    id: 2,
    name: "Premium Voyager Shield",
    provider: "GlobalGuard",
    price: 49999,
    coverage: 8000000,
    rating: 4.8,
    features: [
      "Medical Emergency",
      "Trip Cancellation",
      "Lost Baggage",
      "Adventure Sports",
      "24/7 Support",
    ],
    stars: 5,
  },
  {
    id: 3,
    name: "Economy Safeguard",
    provider: "TravelSure",
    price: 14999,
    coverage: 2000000,
    rating: 3.9,
    features: ["Medical Emergency", "Lost Baggage"],
    stars: 3,
  },
  {
    id: 4,
    name: "Elite Explorer Plus",
    provider: "TravelMax",
    price: 79999,
    coverage: 12000000,
    rating: 4.9,
    features: [
      "Medical Emergency",
      "Trip Cancellation",
      "Lost Baggage",
      "Adventure Sports",
      "24/7 Support",
      "Luxury Hotel Coverage",
      "Private Transport",
    ],
    stars: 5,
  },
  {
    id: 5,
    name: "Student Traveler",
    provider: "EduGuard",
    price: 9999,
    coverage: 1500000,
    rating: 4.0,
    features: ["Medical Emergency", "Lost Baggage", "Study Interruption Cover"],
    stars: 4,
  },
  {
    id: 6,
    name: "Family Shield Pro",
    provider: "FamilySafe",
    price: 34999,
    coverage: 6000000,
    rating: 4.5,
    features: [
      "Medical Emergency",
      "Trip Cancellation",
      "Lost Baggage",
      "Child Care",
      "Family Visit",
    ],
    stars: 4,
  },
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
    coverage: 0, // Changed from 'all' to 0
  });

  const [filteredInsurance, setFilteredInsurance] = useState(insuranceData);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    // Apply filters
    const filtered = insuranceData.filter((insurance) => {
      return (
        insurance.price >= newFilters.minPrice &&
        insurance.price <= newFilters.maxPrice &&
        insurance.stars >= newFilters.minStars &&
        (newFilters.coverage === 0 ||
          insurance.coverage >= parseInt(newFilters.coverage))
      );
    });
    setFilteredInsurance(filtered);
  };

  const handleStarFilter = (stars) => {
    const newFilters = { ...filters, minStars: stars };
    setFilters(newFilters);

    const filtered = insuranceData.filter((insurance) => {
      return (
        insurance.price >= newFilters.minPrice &&
        insurance.price <= newFilters.maxPrice &&
        insurance.stars >= newFilters.minStars &&
        (newFilters.coverage === 0 ||
          insurance.coverage >= parseInt(newFilters.coverage))
      );
    });
    setFilteredInsurance(filtered);
  };

  return (
    <div className="container mx-auto p-8 text-white relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-gray-900/30 backdrop-blur-3xl -z-10" />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-center"
      >
        Smart Travel Insurance Plans
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="filters mb-12 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {/* Filter boxes with enhanced styling */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-lg shadow-indigo-500/10"
        >
          <label className="text-gray-300 block mb-3 font-medium">
            Min Price
          </label>
          <input
            type="range"
            name="minPrice"
            min="0"
            max="100000"
            step="1000"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-indigo-300 mt-2 block font-medium">
            {formatINR(filters.minPrice)}
          </span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-lg shadow-indigo-500/10"
        >
          <label className="text-gray-300 block mb-3 font-medium">
            Max Price
          </label>
          <input
            type="range"
            name="maxPrice"
            min="0"
            max="100000"
            step="1000"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-indigo-300 mt-2 block font-medium">
            {formatINR(filters.maxPrice)}
          </span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-lg shadow-indigo-500/10"
        >
          <label className="text-gray-300 block mb-3 font-medium">
            Minimum Rating
          </label>
          <StarRating
            rating={filters.minStars}
            onRatingChange={handleStarFilter}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-lg shadow-indigo-500/10"
        >
          <label className="text-gray-300 block mb-3 font-medium">
            Min Coverage
          </label>
          <input
            type="range"
            name="coverage"
            min="0"
            max="10000000"
            step="1000000"
            value={filters.coverage}
            onChange={handleFilterChange}
            className="w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-indigo-300 mt-2 block font-medium">
            {filters.coverage === 0 ? "Any" : `${formatINR(filters.coverage)}`}
          </span>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredInsurance.map((insurance, index) => (
          <motion.div
            key={insurance.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-indigo-500/50 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-indigo-500/50">
                <Shield className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  {insurance.name}
                </h3>
                <p className="text-gray-400">{insurance.provider}</p>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 my-4"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 transition-all duration-300 ${
                    star <= insurance.stars
                      ? "fill-indigo-500 text-indigo-500"
                      : "fill-transparent text-gray-400"
                  }`}
                />
              ))}
            </motion.div>

            <div className="flex items-center gap-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 my-4">
              <IndianRupee className="w-6 h-6" />
              <span>{insurance.price.toLocaleString("en-IN")}</span>
            </div>

            <p className="text-gray-300 font-medium">
              Coverage: {formatINR(insurance.coverage)}
            </p>

            <div className="mt-6">
              <p className="text-gray-300 mb-3 font-medium">Features:</p>
              <ul className="space-y-3">
                {insurance.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-gray-400"
                  >
                    <div className="p-1 rounded-full bg-indigo-500/20">
                      <Check className="w-4 h-4 text-indigo-400" />
                    </div>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50"
            >
              Select Plan
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TravelInsuranceHelper;
