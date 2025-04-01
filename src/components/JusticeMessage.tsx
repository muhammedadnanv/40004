
import React from 'react';
import { TagIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCurrentReferralCode } from '@/utils/referralUtils';

export const JusticeMessage = () => {
  // Get a currently active referral code to display
  const currentCode = getCurrentReferralCode();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 py-2 bg-[#2E4053] text-white"
    >
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm sm:text-base">
        <TagIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" aria-hidden="true" />
        <span className="font-medium">Use code <span className="font-bold">{currentCode}</span> for 10% off any program</span>
      </div>
    </motion.div>
  );
};
