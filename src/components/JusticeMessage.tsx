
import React from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const JusticeMessage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 py-2 bg-black text-white"
    >
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm sm:text-base">
        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" aria-hidden="true" />
        <span className="font-medium">Want Justice for Shahabas</span>
      </div>
    </motion.div>
  );
};
