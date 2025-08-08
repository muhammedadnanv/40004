import { useEffect } from 'react';
import { enhanceMobileExperience } from '@/utils/mobileResponsiveness';

export const MobileOptimizer = () => {
  useEffect(() => {
    // Apply mobile optimizations on component mount
    enhanceMobileExperience();
    
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
    };
  }, []);
  
  // This component doesn't render anything
  return null;
};