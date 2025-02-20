import { motion } from "framer-motion";
import { useLogin } from "../../../store/useLogin";
import {
  User,
  Mail,
  Phone,
  Shield,
  UserCircle,
  Clock,
  Calendar,
  Settings as SettingsIcon,
} from "lucide-react";
import { useState } from "react";

const ProfileSection = ({ title, icon: Icon, value }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50"
  >
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50">
        <Icon className="w-5 h-5 text-indigo-400" />
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-white font-medium">{value || "Not provided"}</p>
      </div>
    </div>
  </motion.div>
);

const Settings = () => {
  const { user } = useLogin();
  const [isEditing, setIsEditing] = useState(false);

  // Format the date joined
  const dateJoined = user?.date_joined
    ? new Date(user.date_joined).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="p-3 rounded-xl bg-indigo-500/10 ring-1 ring-indigo-500/50">
            <SettingsIcon className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-gray-400">Manage your account settings and preferences</p>
          </div>
        </motion.div>
      </div>

      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <ProfileSection
          title="Full Name"
          icon={User}
          value={user?.name}
        />
        <ProfileSection
          title="Email"
          icon={Mail}
          value={user?.email}
        />
        <ProfileSection
          title="Phone"
          icon={Phone}
          value={user?.phone}
        />
        <ProfileSection
          title="Account Type"
          icon={Shield}
          value={user?.user_type}
        />
        <ProfileSection
          title="Member Since"
          icon={Calendar}
          value={dateJoined}
        />
        <ProfileSection
          title="Account Status"
          icon={UserCircle}
          value="Active"
        />
      </motion.div>

      {/* Activity Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10"
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-400" />
          Account Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-black/20">
            <p className="text-gray-400 text-sm">Last Login</p>
            <p className="text-white font-medium">Today</p>
          </div>
          <div className="p-4 rounded-lg bg-black/20">
            <p className="text-gray-400 text-sm">Saved Locations</p>
            <p className="text-white font-medium">{user?.saved_locations?.length || 0}</p>
          </div>
          <div className="p-4 rounded-lg bg-black/20">
            <p className="text-gray-400 text-sm">Emergency Contacts</p>
            <p className="text-white font-medium">{user?.loved_ones?.length || 0}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;