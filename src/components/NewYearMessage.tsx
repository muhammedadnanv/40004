import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const NewYearMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-4 right-4 z-50 p-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-xl"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
        <p className="text-sm font-medium">
          Start your development journey with us
        </p>
      </div>
    </motion.div>
  );
};