
/**
 * Utility functions for enhancing mobile responsiveness
 */

// Check if a device is mobile based on screen size
export const isMobileDevice = (): boolean => {
  return window.innerWidth < 768;
};

// Check if a device is a tablet based on screen size
export const isTabletDevice = (): boolean => {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

// Check if the device has touch capabilities
export const hasTouchCapability = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Adjust font sizes for better readability on mobile
export const optimizeFontsForMobile = (): void => {
  if (isMobileDevice()) {
    const bodyElement = document.querySelector('body');
    if (bodyElement) {
      // Ensure minimum font size for readability
      bodyElement.style.fontSize = 'min(16px, 4vw)';
    }
  }
};

// Enhance touch targets for better mobile UX
export const enhanceTouchTargets = (): void => {
  if (hasTouchCapability()) {
    const touchElements = document.querySelectorAll('button, a, input, select, [role="button"]');
    
    touchElements.forEach(el => {
      const element = el as HTMLElement;
      
      // Get current computed styles
      const styles = window.getComputedStyle(element);
      const height = parseInt(styles.height);
      const width = parseInt(styles.width);
      
      // If elements are too small for touch, enhance them
      if (height < 44 || width < 44) {
        // Add more padding for better touch targets
        const currentPaddingY = parseInt(styles.paddingTop) + parseInt(styles.paddingBottom);
        const currentPaddingX = parseInt(styles.paddingLeft) + parseInt(styles.paddingRight);
        
        if (height < 44 && currentPaddingY < 20) {
          const neededPadding = Math.max(0, (44 - height + currentPaddingY) / 2);
          element.style.paddingTop = `${neededPadding}px`;
          element.style.paddingBottom = `${neededPadding}px`;
        }
        
        if (width < 44 && currentPaddingX < 20) {
          const neededPadding = Math.max(0, (44 - width + currentPaddingX) / 2);
          element.style.paddingLeft = `${neededPadding}px`;
          element.style.paddingRight = `${neededPadding}px`;
        }
      }
    });
  }
};

// Fix z-index issues for mobile overlays
export const fixMobileZIndexIssues = (): void => {
  if (isMobileDevice()) {
    const overlayElements = document.querySelectorAll('.dropdown-menu, .modal, .dialog, .popover, .tooltip');
    
    overlayElements.forEach(el => {
      const element = el as HTMLElement;
      const currentZIndex = parseInt(window.getComputedStyle(element).zIndex);
      
      // Ensure overlay elements have high z-index
      if (!isNaN(currentZIndex) && currentZIndex < 1000) {
        element.style.zIndex = '1000';
      }
    });
  }
};

// Optimize images for mobile bandwidth
export const optimizeImagesForMobile = (): void => {
  if (isMobileDevice()) {
    const images = document.querySelectorAll('img:not([loading="lazy"])');
    
    images.forEach(img => {
      // Add lazy loading to save bandwidth
      img.setAttribute('loading', 'lazy');
      
      // Add decoding async for better performance
      img.setAttribute('decoding', 'async');
    });
  }
};

// Apply viewport meta tag if missing
export const ensureViewportMeta = (): void => {
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewportMeta = document.createElement('meta');
    viewportMeta.setAttribute('name', 'viewport');
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
    document.head.appendChild(viewportMeta);
  }
};

// Run all mobile enhancements
export const enhanceMobileExperience = (): void => {
  try {
    ensureViewportMeta();
    optimizeFontsForMobile();
    enhanceTouchTargets();
    fixMobileZIndexIssues();
    optimizeImagesForMobile();
    
    // Add event listener for orientation changes
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        enhanceTouchTargets();
        fixMobileZIndexIssues();
      }, 300);
    });
    
    console.log('Mobile experience enhancements applied');
  } catch (error) {
    console.error('Error enhancing mobile experience:', error);
  }
};
