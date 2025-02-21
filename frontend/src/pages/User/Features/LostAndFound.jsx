import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader,
  PackageSearch,
  Plus,
  Check,
  MapPin,
  FileText,
  Calendar,
  AlertCircle,
  ShieldCheck,
  X,
  Clock,
  Sparkles,
} from "lucide-react";
import { useLogin } from "../../../store/useLogin";
import { useLostFound } from "../../../store/useLostFound";

const StatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Lost":
        return "bg-red-500/10 border-red-500/30 text-red-400";
      case "Found":
        return "bg-yellow-500/10 border-yellow-500/30 text-yellow-400";
      case "Recovered":
        return "bg-green-500/10 border-green-500/30 text-green-400";
      default:
        return "bg-gray-500/10 border-gray-500/30 text-gray-400";
    }
  };

  return (
    <div
      className={`px-3 py-1 rounded-full border ${getStatusStyles(
        status
      )} text-sm font-medium`}
    >
      {status}
    </div>
  );
};

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  itemDescription,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-indigo-500/20 ring-1 ring-indigo-500/50">
                  <ShieldCheck className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Confirm Recovery
                </h2>
                <button
                  onClick={onClose}
                  className="ml-auto p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <p className="text-gray-300 mb-6">
                Are you sure this item has been recovered?
                <br />
                <span className="text-indigo-400 font-medium">
                  {itemDescription}
                </span>
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg hover:bg-white/10 text-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={onConfirm}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50"
                >
                  <Check className="w-4 h-4" />
                  Confirm Recovery
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const LostAndFound = () => {
  const { user } = useLogin();
  const { items, loading, fetchItems, addItem, updateItemStatus } =
    useLostFound();
  const [newItem, setNewItem] = useState({
    user_id: user?.id || "",
    location: "",
    item_description: "",
    status: "Lost",
    date_found: null,
  });
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    itemId: null,
    description: "",
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
          date_found: null,
        });
      }
    }
  };

  const handleStatusChange = async (reportId, description) => {
    setConfirmationDialog({ isOpen: true, itemId: reportId, description });
  };

  const handleConfirmRecovery = async () => {
    if (confirmationDialog.itemId) {
      await updateItemStatus(confirmationDialog.itemId, "Recovered");
      setConfirmationDialog({ isOpen: false, itemId: null, description: "" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="p-2 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
          <PackageSearch className="w-6 h-6 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">Lost & Found</h1>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Add Item Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Report Item
            </h2>
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <MapPin className="absolute left-3 top-3 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  name="location"
                  value={newItem.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="w-full pl-10 p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <FileText className="absolute left-3 top-3 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  name="item_description"
                  value={newItem.item_description}
                  onChange={handleChange}
                  placeholder="Describe the item"
                  className="w-full pl-10 p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <AlertCircle className="absolute left-3 top-3 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                <select
                  name="status"
                  value={newItem.status}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 rounded-lg bg-white/10 text-white border border-white/20 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 [&>option]:bg-gray-900 [&>option]:text-white"
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </motion.div>
              <motion.button
                onClick={handleAddItem}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50"
              >
                <Plus className="w-5 h-5" />
                Add Item
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Items List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <PackageSearch className="w-5 h-5" />
              Recent Items
            </h2>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader className="w-8 h-8 text-indigo-400 animate-spin" />
              </div>
            ) : items.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-indigo-500/20 hover:scrollbar-thumb-indigo-500/30">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2 flex-1">
                        <p className="font-medium text-white">
                          {item.item_description}
                        </p>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <MapPin className="w-4 h-4 text-indigo-400" />
                            {item.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Calendar className="w-4 h-4 text-indigo-400" />
                            Reported: {formatDate(item.report_date)}
                          </div>
                          {item.date_found && (
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Clock className="w-4 h-4 text-indigo-400" />
                              Found: {formatDate(item.date_found)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <StatusBadge status={item.status} />
                        {item.status === "Lost" && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              handleStatusChange(
                                item.report_id,
                                item.item_description
                              )
                            }
                            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-all duration-300 flex items-center gap-1 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50"
                          >
                            <Check className="w-4 h-4" />
                            Recovered
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Sparkles className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Items Yet
                </h3>
                <p className="text-gray-400">
                  Report a lost or found item to get started
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        onClose={() =>
          setConfirmationDialog({
            isOpen: false,
            itemId: null,
            description: "",
          })
        }
        onConfirm={handleConfirmRecovery}
        itemDescription={confirmationDialog.description}
      />
    </div>
  );
};

export default LostAndFound;
