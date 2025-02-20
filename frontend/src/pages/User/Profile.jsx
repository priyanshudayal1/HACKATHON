import { motion } from "framer-motion";
import { useLogin } from "../../store/useLogin";
import { Mail, Phone, MapPin, Calendar, User } from "lucide-react";

const Profile = () => {
  const { user } = useLogin();

  console.log(user);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
        <div className="flex items-start gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-32 h-32 rounded-full bg-indigo-500/20 flex items-center justify-center"
          >
            <span className="text-5xl text-white">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </span>
          </motion.div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-4">
              {user?.name || "User Name"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5" />
                  <span>{user?.email || "email@example.com"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5" />
                  <span>{user?.phone || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <User className="w-5 h-5" />
                  <span>{user?.user_type || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar className="w-5 h-5" />
                  <span>
                    Joined{" "}
                    {new Date(
                      user?.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
