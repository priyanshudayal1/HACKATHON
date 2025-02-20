import { motion } from "framer-motion";
import { useLogin } from "../../store/useLogin";
import { Mail, Phone, Calendar, User, Plus, Heart, X, Shield, Edit } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../lib/api";

const Profile = () => {
  const { user, setUser } = useLogin();
  const [showModal, setShowModal] = useState(false);
  const [newLovedOne, setNewLovedOne] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  console.log(user);

  // Fetch loved ones when component mounts
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
      } finally {
        setLoading(false);
      }
    };

    fetchLovedOnes();
  }, []); // Added required dependencies

  const handleAddLovedOne = async () => {
    try {
      const { data } = await api.post(
        `/api/add_loved_one/${user.id}/`,
        newLovedOne
      );
      if (data.status === "success") {
        // Update the user state with new loved ones list
        setUser({
          ...user,
          loved_ones: [...(user.loved_ones || []), newLovedOne],
        });
        setNewLovedOne({ name: "", email: "" }); // Reset form
        setShowModal(false); // Close modal
      }
    } catch (err) {
      console.error("Error adding loved one:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Profile Header */}
        <motion.div 
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl hover:border-indigo-500/50 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row items-start gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group transition-all duration-300"
            >
              <span className="text-5xl text-white font-bold group-hover:scale-110 transition-transform">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </span>
            </motion.div>

            <div className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-white">{user?.name || "User Name"}</h1>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-indigo-600/80 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300 backdrop-blur-sm"
                >
                  <Edit className="w-4 h-4" /> Edit Profile
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="space-y-4">
                  {[
                    { icon: Mail, value: user?.email },
                    { icon: Phone, value: user?.phone },
                    { icon: User, value: user?.user_type },
                    { icon: Calendar, value: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }) : 'Not provided' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                      <div className="p-2 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
                        <item.icon className="w-5 h-5 text-indigo-400" />
                      </div>
                      <span className="font-medium">{item.value || "Not provided"}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loved Ones Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl hover:border-indigo-500/50 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-500" />
              <h2 className="text-2xl font-bold text-white">Loved Ones</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-pink-600/80 hover:bg-pink-700 text-white rounded-lg flex items-center gap-2 transition-all duration-300 backdrop-blur-sm"
            >
              <Plus className="w-4 h-4" /> Add Loved One
            </motion.button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Loading loved ones...</p>
            </div>
          ) : user?.loved_ones?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.loved_ones.map((person, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
                      <Shield className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{person.name}</h3>
                      <p className="text-gray-400">{person.email}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/5 backdrop-blur-lg border border-dashed border-white/10 rounded-xl">
              <Heart className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <p className="text-gray-400">No loved ones added yet.</p>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Heart className="w-6 h-6 text-pink-500" /> Add Loved One
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-white" />
              </motion.button>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-indigo-300 mb-2">Name</label>
                <input
                  type="text"
                  value={newLovedOne.name}
                  onChange={(e) => setNewLovedOne({ ...newLovedOne, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-300 mb-2">Email</label>
                <input
                  type="email"
                  value={newLovedOne.email}
                  onChange={(e) => setNewLovedOne({ ...newLovedOne, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter email"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddLovedOne}
                className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl px-6 py-3 font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Loved One
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Profile;
