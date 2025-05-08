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
  return;
};