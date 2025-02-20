import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Loader,
  PackageSearch,
  Plus,
  Check,
  MapPin,
  FileText,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useLogin } from "../../../store/useLogin";
import { useLostFound } from "../../../store/useLostFound";

const LostAndFound = () => {
  const { user } = useLogin();
  const { items, loading, error, fetchItems, addItem, updateItemStatus } =
    useLostFound();
  const [newItem, setNewItem] = useState({
    user_id: user?.id || "",
    location: "",
    item_description: "",
    status: "Lost",
  });

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleAddItem = async () => {
    if (newItem.item_description.trim()) {
      const itemWithUserId = {
        ...newItem,
        user_id: user?.id,
      };
      const success = await addItem(itemWithUserId);
      if (success) {
        setNewItem({
          user_id: user?.id,
          location: "",
          item_description: "",
          status: "Lost",
        });
      }
    }
  };

  const handleStatusChange = async (reportId) => {
    await updateItemStatus(reportId, "Recovered");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const getItemClass = (status) => {
    switch (status) {
      case "Lost":
        return "bg-red-500/10 border-red-500/30 text-red-400";
      case "Found":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-400";
      case "Recovered":
        return "bg-green-500/10 border-green-500/30 text-green-400";
      default:
        return "bg-white/10 border-white/30";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 backdrop-blur-lg">
        <AlertCircle className="w-6 h-6 mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-white"
        >
          Lost and Found
        </motion.h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Add Item Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              Report an Item
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="location"
                  value={newItem.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="w-full pl-10 p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-white/10"
                />
              </div>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="item_description"
                  value={newItem.item_description}
                  onChange={handleChange}
                  placeholder="Describe the item"
                  className="w-full pl-10 p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-white/10"
                />
              </div>
              <select
                name="status"
                value={newItem.status}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-white/10"
              >
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
                <option value="Recovered">Recovered</option>
              </select>
              <button
                onClick={handleAddItem}
                className="w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Item
              </button>
            </div>
          </motion.div>

          {/* Items List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <PackageSearch className="w-5 h-5" />
                Recent Items
              </h2>
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${getItemClass(
                      item.status
                    )} transition-all duration-300`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <p className="font-medium">{item.item_description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <MapPin className="w-4 h-4" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          {item.report_date}
                        </div>
                      </div>
                      {item.status === "Lost" && (
                        <button
                          onClick={() => handleStatusChange(item.report_id)}
                          className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-all duration-300 flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" />
                          Recovered
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LostAndFound;
