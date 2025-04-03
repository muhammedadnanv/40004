
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
      if (window.innerWidth < 640) { // Only for mobile devices
        if (window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
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
      navigator.clipboard.writeText(currentCode)
        .then(() => {
          // Provide visual feedback
          const codeElement = document.getElementById('referral-code');
          if (codeElement) {
            codeElement.classList.add('copied');
            setTimeout(() => {
              codeElement.classList.remove('copied');
            }, 1500);
          }
        })
        .catch(err => {
          console.error('Could not copy code: ', err);
        });
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 py-2 safe-top ${isSpecialCode ? 'bg-gradient-to-r from-purple-700 to-pink-600' : 'bg-[#2E4053]'} text-white shadow-md`}
    >
      <div 
        className="container mx-auto flex items-center justify-center gap-2 text-sm sm:text-base px-2"
        onClick={copyCodeToClipboard}
        role={isTouchDevice ? "button" : undefined}
        aria-label={isTouchDevice ? "Tap to copy code" : undefined}
      >
        <TagIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" aria-hidden="true" />
        <span className="font-medium truncate">
          Use code <span 
            id="referral-code"
            className={`font-bold ${isSpecialCode ? 'text-yellow-300 text-lg px-1' : ''} ${isTouchDevice ? 'underline decoration-dotted' : ''}`}
          >{currentCode}</span> 
          for {discountText} any program
          {isTouchDevice && <span className="ml-1 text-xs opacity-70">(tap to copy)</span>}
        </span>
      </div>
      
      {/* Add styles for the copied animation */}
      <style jsx>{`
        #referral-code.copied {
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        #referral-code.copied {
          animation: pulse 0.5s ease-in-out 2;
        }
      `}</style>
    </motion.div>
  );
};
