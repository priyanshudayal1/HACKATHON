import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, ArrowRight, Copy } from "lucide-react";
import { toast } from "react-hot-toast";
import LoadingOverlay from "../../../components/LoadingOverlay";
import { translateText } from '../../../lib/api';

const SmartTranslation = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sourceText: "",
    sourceLang: "en",
    targetLang: "hi",
    translatedText: "",
  });

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'de', name: 'German' }
  ];

  const handleTranslate = async () => {
    if (!formData.sourceText) {
      toast.error("Please enter text to translate");
      return;
    }
    
    setLoading(true);
    try {
      const response = await translateText(formData);
      if (response.status === 'success') {
        setFormData(prev => ({ ...prev, translatedText: response.translatedText }));
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 p-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      <div className="max-w-4xl mx-auto relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-white mb-8 text-center"
        >
          Smart Translation
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Source Text */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <select
                value={formData.sourceLang}
                onChange={(e) => setFormData(prev => ({ ...prev, sourceLang: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none hover:border-indigo-500/50 transition-all duration-300 appearance-none cursor-pointer backdrop-blur-xl"
                style={{
                  WebkitAppearance: 'none',
                  background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238B5CF6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E") no-repeat right 0.5rem center/1.5em`,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }}
              >
                {languages.map(lang => (
                  <option 
                    key={lang.code} 
                    value={lang.code}
                    className="bg-gray-900 text-white hover:bg-indigo-600"
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => copyToClipboard(formData.sourceText)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <Copy className="w-5 h-5 text-indigo-400" />
              </button>
            </div>
            <textarea
              value={formData.sourceText}
              onChange={(e) => setFormData(prev => ({ ...prev, sourceText: e.target.value }))}
              placeholder="Enter text to translate..."
              className="w-full h-64 p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
            />
          </div>

          {/* Target Text */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <select
                value={formData.targetLang}
                onChange={(e) => setFormData(prev => ({ ...prev, targetLang: e.target.value }))}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none hover:border-indigo-500/50 transition-all duration-300 appearance-none cursor-pointer backdrop-blur-xl"
                style={{
                  WebkitAppearance: 'none',
                  background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238B5CF6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E") no-repeat right 0.5rem center/1.5em`,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }}
              >
                {languages.map(lang => (
                  <option 
                    key={lang.code} 
                    value={lang.code}
                    className="bg-gray-900 text-white hover:bg-indigo-600"
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => copyToClipboard(formData.translatedText)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <Copy className="w-5 h-5 text-indigo-400" />
              </button>
            </div>
            <textarea
              value={formData.translatedText}
              readOnly
              placeholder="Translation will appear here..."
              className="w-full h-64 p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
            />
          </div>
        </motion.div>

        <motion.button
          onClick={handleTranslate}
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 w-full py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Languages className="w-5 h-5" />
          Translate
        </motion.button>

        <AnimatePresence>
          {loading && <LoadingOverlay message="Translating..." />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SmartTranslation;
