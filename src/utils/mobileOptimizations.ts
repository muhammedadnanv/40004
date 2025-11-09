// Mobile-specific performance and UX optimizations

/**
 * Detect if the user is on a mobile device
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.matchMedia('(max-width: 768px)').matches;
};

/**
 * Detect if the device supports touch
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)
  );
};

/**
 * Get viewport dimensions
 */
export const getViewportDimensions = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    isPortrait: window.innerHeight > window.innerWidth,
    isLandscape: window.innerWidth > window.innerHeight,
  };
};

/**
 * Optimize images for mobile devices
 */
export const optimizeImagesForMobile = () => {
  const images = document.querySelectorAll('img');
  
  images.forEach((img) => {
    // Add loading="lazy" if not already present
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Add decoding="async" for better performance
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
    
    // Ensure alt text exists for accessibility
    if (!img.hasAttribute('alt')) {
      img.setAttribute('alt', '');
    }
  });
};

/**
 * Add touch-friendly spacing to interactive elements
 */
export const enhanceTouchTargets = () => {
  const interactiveElements = document.querySelectorAll(
    'button, a, input, select, textarea, [role="button"], [onclick]'
  );
  
  interactiveElements.forEach((element) => {
    const el = element as HTMLElement;
    const rect = el.getBoundingClientRect();
    
    // Ensure minimum touch target size (44x44px per WCAG)
    if (rect.height < 44 || rect.width < 44) {
      el.style.minHeight = '44px';
      el.style.minWidth = '44px';
    }
    
    // Add touch-action for better scroll performance
    if (!el.style.touchAction) {
      el.style.touchAction = 'manipulation';
    }
  });
};

/**
 * Prevent double-tap zoom on specific elements
 */
export const preventDoubleTapZoom = () => {
  let lastTouchEnd = 0;
  
  document.addEventListener(
    'touchend',
    (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    { passive: false }
  );
};

/**
 * Handle orientation changes
 */
export const handleOrientationChange = (callback: () => void) => {
  const handleChange = () => {
    // Wait for orientation change to complete
    setTimeout(callback, 300);
  };
  
  window.addEventListener('orientationchange', handleChange);
  window.addEventListener('resize', handleChange);
  
  return () => {
    window.removeEventListener('orientationchange', handleChange);
    window.removeEventListener('resize', handleChange);
  };
};

/**
 * Optimize scroll performance on mobile
 */
export const optimizeScrollPerformance = () => {
  // Add smooth scrolling
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Enable momentum scrolling on iOS (using type assertion for webkit property)
  (document.body.style as any).webkitOverflowScrolling = 'touch';
  
  // Passive event listeners for better scroll performance
  const scrollElements = document.querySelectorAll('[data-scroll]');
  scrollElements.forEach((element) => {
    element.addEventListener('touchstart', () => {}, { passive: true });
    element.addEventListener('touchmove', () => {}, { passive: true });
  });
};

/**
 * Add viewport height fix for mobile browsers
 * Handles the issue with mobile browser UI hiding/showing
 */
export const fixMobileViewportHeight = () => {
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  setVH();
  
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);
  
  return () => {
    window.removeEventListener('resize', setVH);
    window.removeEventListener('orientationchange', setVH);
  };
};

/**
 * Optimize input focus on mobile
 */
export const optimizeInputFocus = () => {
  const inputs = document.querySelectorAll('input, textarea, select');
  
  inputs.forEach((input) => {
    input.addEventListener('focus', () => {
      // Scroll input into view when focused
      setTimeout(() => {
        (input as HTMLElement).scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 300);
    });
  });
};

/**
 * Comprehensive mobile optimization initialization
 */
export const initMobileOptimizations = () => {
  if (!isMobileDevice()) return;
  
  // Run all optimizations
  optimizeImagesForMobile();
  enhanceTouchTargets();
  optimizeScrollPerformance();
  fixMobileViewportHeight();
  optimizeInputFocus();
  
  // Re-run on DOM changes for dynamic content
  const observer = new MutationObserver(() => {
    optimizeImagesForMobile();
    enhanceTouchTargets();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
  
  return () => observer.disconnect();
};