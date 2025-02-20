import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Copy, ArrowRightLeft, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { translateText } from "../../../lib/api";

const SmartTranslation = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sourceText: "",
    sourceLang: "en",
    targetLang: "hi",
    translatedText: "",
  });

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
    { code: "fr", name: "French" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
  ];

  const handleTranslate = async () => {
    if (!formData.sourceText) {
      toast.error("Please enter text to translate");
      return;
    }

    setLoading(true);
    try {
      const response = await translateText(formData);
      if (response.status === "success") {
        setFormData((prev) => ({
          ...prev,
          translatedText: response.translatedText,
        }));
        toast.success("Translation successful!");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Translation failed");
    }
    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 backdrop-blur-[118px]" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse delay-300" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-white inline-flex items-center gap-3"
          >
            <Sparkles className="w-8 h-8 text-indigo-400" />
            Smart Translation
          </motion.h1>
          <p className="text-indigo-200/80 text-lg max-w-2xl mx-auto">
            Break language barriers with our advanced translation technology
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 relative"
        >
          {/* Source Text */}
          <div className="space-y-4 backdrop-blur-lg bg-white/[0.02] p-6 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center">
              <select
                value={formData.sourceLang}
                onChange={(e) => setFormData((prev) => ({ ...prev, sourceLang: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none hover:border-indigo-500/50 transition-all duration-300 appearance-none cursor-pointer backdrop-blur-xl min-w-[140px]"
                style={{
                  WebkitAppearance: "none",
                  background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238B5CF6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E") no-repeat right 0.5rem center/1.5em`,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-gray-900 text-white">
                    {lang.name}
                  </option>
                ))}
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(formData.sourceText)}
                className="p-2.5 hover:bg-white/10 rounded-lg transition-colors group"
              >
                <Copy className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
              </motion.button>
            </div>
            <textarea
              value={formData.sourceText}
              onChange={(e) => setFormData((prev) => ({ ...prev, sourceText: e.target.value }))}
              placeholder="Enter text to translate..."
              className="w-full h-64 p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none resize-none placeholder:text-white/30"
            />
          </div>

          {/* Arrow Icon */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-indigo-600/30 p-3 rounded-full backdrop-blur-sm border border-indigo-500/20"
            >
              <ArrowRightLeft className="w-6 h-6 text-indigo-300" />
            </motion.div>
          </div>

          {/* Target Text */}
          <div className="space-y-4 backdrop-blur-lg bg-white/[0.02] p-6 rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center">
              <select
                value={formData.targetLang}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    targetLang: e.target.value,
                  }))
                }
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none hover:border-indigo-500/50 transition-all duration-300 appearance-none cursor-pointer backdrop-blur-xl min-w-[140px]"
                style={{
                  WebkitAppearance: "none",
                  background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238B5CF6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E") no-repeat right 0.5rem center/1.5em`,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
              >
                {languages.map((lang) => (
                  <option
                    key={lang.code}
                    value={lang.code}
                    className="bg-gray-900 text-white"
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(formData.translatedText)}
                className="p-2.5 hover:bg-white/10 rounded-lg transition-colors group"
              >
                <Copy className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
              </motion.button>
            </div>
            <textarea
              value={formData.translatedText}
              readOnly
              placeholder="Translation will appear here..."
              className="w-full h-64 p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none resize-none placeholder:text-white/30"
            />
          </div>
        </motion.div>

        <motion.button
          onClick={handleTranslate}
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
        >
          <Languages className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Translate Now
        </motion.button>

        <AnimatePresence>
          {loading && <LoadingOverlay message="Translating..." />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SmartTranslation;
