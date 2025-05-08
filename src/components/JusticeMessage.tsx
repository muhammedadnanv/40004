
import React, { useEffect, useState } from 'react';
import { TagIcon } from 'lucide-react';
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

  // Create a more attention-grabbing message for the special code
  const isSpecialCode = currentCode === 'ad4000';
  const discountText = isSpecialCode ? '50% MEGA DISCOUNT' : '10% off';

  // Tap to copy functionality for mobile
  const copyCodeToClipboard = () => {
    if (isTouchDevice) {
      navigator.clipboard.writeText(currentCode).then(() => {
        // Provide visual feedback
        const codeElement = document.getElementById('referral-code');
        if (codeElement) {
          codeElement.classList.add('copied');
          setTimeout(() => {
            codeElement.classList.remove('copied');
          }, 1500);
        }
      }).catch(err => {
        console.error('Could not copy code: ', err);
      });
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-2 px-4 shadow-md"
    >
      <div className="container mx-auto flex items-center justify-center gap-2">
        <TagIcon className="h-4 w-4" />
        <p className="text-sm font-medium">
          <span className="font-bold">Dev Mentor Hub</span> - Use code{" "}
          <span
            id="referral-code"
            className="font-mono bg-white/20 px-2 py-0.5 rounded cursor-pointer transition-all"
            onClick={copyCodeToClipboard}
          >
            {currentCode}
          </span>{" "}
          for {discountText} on all mentorship programs
        </p>
      </div>
    </motion.div>
  );
};
