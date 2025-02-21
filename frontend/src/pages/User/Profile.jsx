import { motion, AnimatePresence } from "framer-motion";
import { useLogin } from "../../store/useLogin";
import {
  Mail,
  Phone,
  Calendar,
  User,
  Plus,
  Heart,
  X,
  Shield,
  Edit,
  Save,
  Sparkles,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../lib/api";
import { toast } from "react-hot-toast";

const EmergencyContactCard = ({ contact, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    whileHover={{ scale: 1.02 }}
    className="p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
  >
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
          <Heart className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-white font-medium">{contact.name}</h3>
          <p className="text-gray-400 text-sm">{contact.email}</p>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onDelete(contact)}
        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
      >
        <X className="w-4 h-4" />
      </motion.button>
    </div>
  </motion.div>
);

const AddContactModal = ({ isOpen, onClose, newContact, setNewContact, onAdd }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
        >
          <div className="p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
                  <Heart className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Add Emergency Contact</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="space-y-4">
              <motion.div whileHover={{ scale: 1.02 }} className="relative group">
                <User className="absolute left-3 top-3 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Contact Name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white placeholder-white/60"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="relative group">
                <Mail className="absolute left-3 top-3 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                <input
                  type="email"
                  placeholder="Contact Email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-indigo-500 text-white placeholder-white/60"
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onAdd}
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50"
              >
                <Plus className="w-4 h-4" />
                Add Contact
              </motion.button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const Profile = () => {
  const { user, setUser } = useLogin();
  const [showModal, setShowModal] = useState(false);
  const [newLovedOne, setNewLovedOne] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    const fetchLovedOnes = async () => {
      if (!user?.id) return;
      try {
        const { data } = await api.get(`/api/loved_ones/${user.id}/`);
        if (data.status === "success") {
          setUser({
            ...user,
            loved_ones: data.loved_ones,
          });
        }
      } catch (err) {
        console.error("Error fetching loved ones:", err);
        toast.error("Failed to fetch emergency contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchLovedOnes();
  }, [user?.id, setUser]);

  const handleAddLovedOne = async () => {
    if (!newLovedOne.name || !newLovedOne.email) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const { data } = await api.post(`/api/add_loved_one/${user.id}/`, newLovedOne);
      if (data.status === "success") {
        setUser({
          ...user,
          loved_ones: [...(user.loved_ones || []), newLovedOne],
        });
        setNewLovedOne({ name: "", email: "" });
        setShowModal(false);
        toast.success("Emergency contact added successfully");
      }
    } catch (err) {
      console.error("Error adding loved one:", err);
      toast.error("Failed to add emergency contact");
    }
  };

  const handleDeleteLovedOne = async (contact) => {
    try {
      const { data } = await api.delete(`/api/loved_ones/${user.id}/${contact.id}/`);
      if (data.status === "success") {
        setUser({
          ...user,
          loved_ones: user.loved_ones.filter((l) => l.id !== contact.id),
        });
        toast.success("Emergency contact removed");
      }
    } catch (err) {
      console.error("Error deleting loved one:", err);
      toast.error("Failed to remove emergency contact");
    }
  };

  const handleEditProfile = () => {
    if (isEditing) {
      // Save changes
      // TODO: Implement profile update API call
      setIsEditing(false);
    } else {
      setEditedUser({ ...user });
      setIsEditing(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="p-2 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
          <User className="w-6 h-6 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">Your Profile</h1>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Profile Information</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEditProfile}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4" /> Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4" /> Edit Profile
                  </>
                )}
              </motion.button>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group transition-all duration-300"
              >
                <span className="text-4xl text-white font-bold group-hover:scale-110 transition-transform">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </span>
              </motion.div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{user?.name}</h3>
                <p className="text-gray-400">{user?.user_type}</p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white">{user?.phone || "Not provided"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-sm text-gray-400">Member Since</p>
                  <p className="text-white">
                    {user?.date_joined
                      ? new Date(user.date_joined).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Emergency Contacts</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50"
              >
                <Plus className="w-4 h-4" />
                Add Contact
              </motion.button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
              </div>
            ) : user?.loved_ones?.length > 0 ? (
              <div className="space-y-4">
                <AnimatePresence>
                  {user.loved_ones.map((contact, index) => (
                    <EmergencyContactCard
                      key={contact.id || index}
                      contact={contact}
                      onDelete={handleDeleteLovedOne}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <AlertCircle className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Emergency Contacts</h3>
                <p className="text-gray-400">
                  Add emergency contacts who will be notified in case of an SOS alert
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      <AddContactModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        newContact={newLovedOne}
        setNewContact={setNewLovedOne}
        onAdd={handleAddLovedOne}
      />
    </div>
  );
};

export default Profile;
