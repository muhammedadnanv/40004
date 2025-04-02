
import React, { useEffect, useState } from 'react';
import { TagIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCurrentReferralCode } from '@/utils/referralUtils';

export const JusticeMessage = () => {
  // Get a currently active referral code to display
  const currentCode = getCurrentReferralCode();
  const [isVisible, setIsVisible] = useState(true);
  
  // Handle scroll behavior for small screens
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 640) { // Only for mobile devices
        if (window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Create a more attention-grabbing message for the special code
  const isSpecialCode = currentCode === 'ad4000';
  const discountText = isSpecialCode ? '50% MEGA DISCOUNT' : '10% off';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 py-2 safe-top ${isSpecialCode ? 'bg-gradient-to-r from-purple-700 to-pink-600' : 'bg-[#2E4053]'} text-white shadow-md`}
    >
      <div className="container mx-auto flex items-center justify-center gap-2 text-sm sm:text-base px-2">
        <TagIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" aria-hidden="true" />
        <span className="font-medium truncate">
          Use code <span className={`font-bold ${isSpecialCode ? 'text-yellow-300 text-lg px-1' : ''}`}>{currentCode}</span> 
          for {discountText} any program
        </span>
      </div>
    </motion.div>
  );
};
