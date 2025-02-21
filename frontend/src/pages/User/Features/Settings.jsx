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
  Bell,
  Lock,
  Edit,
  Save,
} from "lucide-react";
import { useState } from "react";

const ProfileSection = ({
  title,
  icon: Icon,
  value,
  isEditable = false,
  onEdit,
  isEditing,
  editValue,
  onEditChange,
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/50 group-hover:bg-indigo-500/20">
          <Icon className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          {isEditable && isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => onEditChange(e.target.value)}
              className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          ) : (
            <p className="text-white font-medium">{value || "Not provided"}</p>
          )}
        </div>
      </div>
      {isEditable && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onEdit}
          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-indigo-400 transition-all duration-300"
        >
          {isEditing ? (
            <Save className="w-4 h-4" />
          ) : (
            <Edit className="w-4 h-4" />
          )}
        </motion.button>
      )}
    </div>
  </motion.div>
);

const SettingsSection = ({ title, icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-indigo-500/50 transition-all duration-300"
  >
    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
      <Icon className="w-5 h-5 text-indigo-400" />
      {title}
    </h2>
    {children}
  </motion.div>
);

const Settings = () => {
  const { user } = useLogin();
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Format the date joined
  const dateJoined = user?.date_joined
    ? new Date(user.date_joined).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  const handleEdit = (field, value) => {
    if (editingField === field) {
      // Save the changes
      // TODO: Implement save functionality
      setEditingField(null);
    } else {
      setEditingField(field);
      setEditValue(value || "");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="p-3 rounded-xl bg-indigo-500/10 ring-1 ring-indigo-500/50">
          <SettingsIcon className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Profile Information */}
        <SettingsSection title="Profile Information" icon={User}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileSection
              title="Full Name"
              icon={User}
              value={user?.name}
              isEditable
              isEditing={editingField === "name"}
              editValue={editValue}
              onEditChange={setEditValue}
              onEdit={() => handleEdit("name", user?.name)}
            />
            <ProfileSection
              title="Email"
              icon={Mail}
              value={user?.email}
              isEditable
              isEditing={editingField === "email"}
              editValue={editValue}
              onEditChange={setEditValue}
              onEdit={() => handleEdit("email", user?.email)}
            />
            <ProfileSection
              title="Phone"
              icon={Phone}
              value={user?.phone}
              isEditable
              isEditing={editingField === "phone"}
              editValue={editValue}
              onEditChange={setEditValue}
              onEdit={() => handleEdit("phone", user?.phone)}
            />
            <ProfileSection
              title="Account Type"
              icon={Shield}
              value={user?.user_type}
            />
          </div>
        </SettingsSection>

        {/* Security Settings */}
        <SettingsSection title="Security" icon={Lock}>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-white font-medium">Password</p>
                  <p className="text-sm text-gray-400">
                    Last changed 30 days ago
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50"
              >
                Change Password
              </motion.button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-white font-medium">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-gray-400">
                    Add an extra layer of security
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 text-sm font-medium"
              >
                Enable
              </motion.button>
            </div>
          </div>
        </SettingsSection>

        {/* Account Information */}
        <SettingsSection title="Account Information" icon={UserCircle}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <ProfileSection title="Last Login" icon={Clock} value="Just now" />
          </div>
        </SettingsSection>
      </motion.div>
    </div>
  );
};

export default Settings;
