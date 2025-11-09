import { useEffect } from 'react';
import { enhanceMobileExperience } from '@/utils/mobileResponsiveness';
import { initMobileOptimizations, isMobileDevice } from '@/utils/mobileOptimizations';

export const MobileOptimizer = () => {
  useEffect(() => {
    // Check if on mobile device
    if (!isMobileDevice()) return;

    // Apply legacy mobile optimizations
    enhanceMobileExperience();
    
    // Initialize comprehensive mobile optimizations
    const cleanup = initMobileOptimizations();
    
    // Apply optimizations when the DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      enhanceMobileExperience();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, []);
  
  // This component doesn't render anything
  return null;
};