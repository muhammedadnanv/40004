
import React, { useEffect, useState } from 'react';
import { TagIcon, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCurrentReferralCode } from '@/utils/referralUtils';
import { isMobileDevice, hasTouchCapability } from '@/utils/mobileResponsiveness';

export const JusticeMessage = () => {
  // Get a currently active referral code to display
  const currentCode = getCurrentReferralCode();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Handle scroll behavior and device detection
  useEffect(() => {
    setIsMobile(isMobileDevice());
    setIsTouchDevice(hasTouchCapability());
    const handleScroll = () => {
      // Auto-hide on both mobile and desktop after scrolling
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    window.addEventListener('resize', () => {
      setIsMobile(isMobileDevice());
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <motion.div 
      initial={{
        opacity: 0,
        y: -100
      }} 
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -100
      }} 
      transition={{
        duration: 0.5
      }} 
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-600 to-red-600 text-white text-center py-3 px-4 shadow-md"
    >
      <div className="flex items-center justify-center space-x-2">
        <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        <p className="font-medium">
          <span className="hidden sm:inline">IMPORTANT NOTICE:</span> All programs closed for the next 7 months due to mentor unavailability and technical updates.
        </p>
      </div>
    </motion.div>
  );
};
