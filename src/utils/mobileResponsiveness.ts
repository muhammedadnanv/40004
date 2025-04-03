
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

// Calculate fluid typography sizes based on viewport width
export const fluidTypography = (minSize: number, maxSize: number, minWidth = 320, maxWidth = 1200): string => {
  const minSizePx = minSize + 'px';
  const maxSizePx = maxSize + 'px';
  const sizeDiff = maxSize - minSize;
  const widthDiff = maxWidth - minWidth;
  const fluidFormula = `calc(${minSizePx} + ${sizeDiff} * ((100vw - ${minWidth}px) / ${widthDiff}))`;
  
  return `clamp(${minSizePx}, ${fluidFormula}, ${maxSizePx})`;
};

// Adjust font sizes for better readability on mobile
export const optimizeFontsForMobile = (): void => {
  if (isMobileDevice()) {
    const bodyElement = document.querySelector('body');
    if (bodyElement && bodyElement instanceof HTMLElement) {
      // Ensure minimum font size for readability
      bodyElement.style.fontSize = 'min(16px, 4vw)';
      
      // Apply fluid typography to headings
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        if (heading instanceof HTMLElement) {
          // Progressively adjust sizes based on heading level
          if (heading.tagName === 'H1') {
            heading.style.fontSize = fluidTypography(24, 36);
          } else if (heading.tagName === 'H2') {
            heading.style.fontSize = fluidTypography(20, 30);
          } else if (heading.tagName === 'H3') {
            heading.style.fontSize = fluidTypography(18, 24);
          }
          
          // Adjust line height for better readability
          heading.style.lineHeight = '1.3';
        }
      });
    }
  }
};

// Enhance touch targets for better mobile UX
export const enhanceTouchTargets = (): void => {
  if (hasTouchCapability()) {
    const touchElements = document.querySelectorAll('button, a, input, select, [role="button"]');
    
    touchElements.forEach(el => {
      // Cast to HTMLElement to access style properties
      if (el instanceof HTMLElement) {
        // Get current computed styles
        const styles = window.getComputedStyle(el);
        const height = parseInt(styles.height);
        const width = parseInt(styles.width);
        
        // If elements are too small for touch, enhance them
        if (height < 48 || width < 48) { // Increased from 44px to 48px for better touch targets
          // Add more padding for better touch targets
          const currentPaddingY = parseInt(styles.paddingTop) + parseInt(styles.paddingBottom);
          const currentPaddingX = parseInt(styles.paddingLeft) + parseInt(styles.paddingRight);
          
          if (height < 48 && currentPaddingY < 24) { // Increased padding threshold
            const neededPadding = Math.max(0, (48 - height + currentPaddingY) / 2);
            el.style.paddingTop = `${neededPadding}px`;
            el.style.paddingBottom = `${neededPadding}px`;
          }
          
          if (width < 48 && currentPaddingX < 24) { // Increased padding threshold
            const neededPadding = Math.max(0, (48 - width + currentPaddingX) / 2);
            el.style.paddingLeft = `${neededPadding}px`;
            el.style.paddingRight = `${neededPadding}px`;
          }
        }
        
        // Add appropriate feedback for touch interactions
        el.classList.add('touch-manipulation');
        
        // Add active state feedback for touch devices
        if (!el.hasAttribute('data-touch-enhanced')) {
          el.setAttribute('data-touch-enhanced', 'true');
          
          el.addEventListener('touchstart', () => {
            el.classList.add('active-touch');
          }, { passive: true });
          
          el.addEventListener('touchend', () => {
            el.classList.remove('active-touch');
          }, { passive: true });
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
      // Cast to HTMLElement to access style properties
      if (el instanceof HTMLElement) {
        const currentZIndex = parseInt(window.getComputedStyle(el).zIndex);
        
        // Ensure overlay elements have high z-index
        if (!isNaN(currentZIndex) && currentZIndex < 1000) {
          el.style.zIndex = '1000';
        }
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
      
      // Set sizes attribute for responsive images if srcset exists
      if (img.hasAttribute('srcset') && !img.hasAttribute('sizes')) {
        img.setAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
      }
      
      // Add responsive image aspect ratio wrapper if not already wrapped
      const parent = img.parentElement;
      if (parent && !parent.classList.contains('img-wrapper') && !parent.classList.contains('aspect-ratio-container')) {
        // Get image dimensions if available
        const width = img.getAttribute('width');
        const height = img.getAttribute('height');
        
        if (width && height && !isNaN(Number(width)) && !isNaN(Number(height))) {
          const aspectRatio = (Number(height) / Number(width)) * 100;
          
          // Create wrapper with proper aspect ratio to prevent layout shifts
          const wrapper = document.createElement('div');
          wrapper.classList.add('aspect-ratio-container');
          wrapper.style.position = 'relative';
          wrapper.style.width = '100%';
          wrapper.style.paddingBottom = `${aspectRatio}%`;
          
          // Style the image for the wrapper
          if (img instanceof HTMLImageElement) {
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            
            // Replace the image with the wrapper containing the image
            parent.replaceChild(wrapper, img);
            wrapper.appendChild(img);
          }
        }
      }
    });
  }
};

// Apply viewport meta tag if missing
export const ensureViewportMeta = (): void => {
  if (!document.querySelector('meta[name="viewport"]')) {
    const viewportMeta = document.createElement('meta');
    viewportMeta.setAttribute('name', 'viewport');
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0');
    document.head.appendChild(viewportMeta);
  } else {
    // Update existing viewport meta to ensure it has proper values
    const existingViewport = document.querySelector('meta[name="viewport"]');
    if (existingViewport) {
      const content = existingViewport.getAttribute('content') || '';
      if (!content.includes('maximum-scale=')) {
        existingViewport.setAttribute('content', content + ', maximum-scale=5.0');
      }
    }
  }
};

// Apply orientation change handling
export const handleOrientationChange = (): void => {
  // Remove any existing orientation change listeners to prevent duplicates
  window.removeEventListener('orientationchange', () => {});
  
  window.addEventListener('orientationchange', () => {
    // Delay execution to allow the browser to complete the orientation change
    setTimeout(() => {
      // Recalculate and fix touch targets
      enhanceTouchTargets();
      
      // Fix any overlay issues
      fixMobileZIndexIssues();
      
      // Force redraw on some elements that might need it
      document.querySelectorAll('.needs-redraw-on-orientation').forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
          // Force reflow
          void el.offsetHeight;
          el.style.display = '';
        }
      });
      
      // Disable and re-enable transitions during orientation change to prevent visual glitches
      document.body.classList.add('orientation-changing');
      setTimeout(() => {
        document.body.classList.remove('orientation-changing');
      }, 300);
    }, 300);
  });
  
  // Also handle resize events for desktop browser resizing
  let resizeTimeout: number | null = null;
  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      window.clearTimeout(resizeTimeout);
    }
    
    // Add class to disable transitions during resize
    document.body.classList.add('resize-in-progress');
    
    resizeTimeout = window.setTimeout(() => {
      // Re-enable transitions
      document.body.classList.remove('resize-in-progress');
      // Apply optimizations
      enhanceMobileExperience();
    }, 250); // Debounced resize handler
  });
};

// Apply responsive navigation
export const enhanceResponsiveNavigation = (): void => {
  const navElement = document.querySelector('nav');
  if (navElement && isMobileDevice()) {
    // Make navigation more accessible on mobile
    if (navElement instanceof HTMLElement) {
      navElement.classList.add('mobile-optimized');
      
      // Find navigation links and ensure they have proper touch target sizes
      const navLinks = navElement.querySelectorAll('a, button');
      navLinks.forEach(link => {
        if (link instanceof HTMLElement) {
          link.classList.add('touch-improved');
        }
      });
    }
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
    handleOrientationChange();
    enhanceResponsiveNavigation();
    
    // Log success
    console.log('Mobile experience enhancements applied successfully');
  } catch (error) {
    console.error('Error enhancing mobile experience:', error);
  }
};

// Detect slow connections and optimize accordingly
export const detectAndOptimizeForSlowConnections = (): void => {
  // Use the Network Information API if available
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    
    if (connection && (connection.saveData || connection.effectiveType.includes('2g') || connection.effectiveType.includes('slow'))) {
      // Apply aggressive optimizations for slow connections
      const bodyElement = document.body;
      if (bodyElement) {
        bodyElement.classList.add('slow-connection');
      }
      
      // Find and defer non-critical images
      const nonCriticalImages = document.querySelectorAll('img:not(.critical-image)');
      nonCriticalImages.forEach(img => {
        if (!img.hasAttribute('src') && img.hasAttribute('data-src')) {
          // Don't load the image immediately
          img.setAttribute('loading', 'lazy');
          img.setAttribute('decoding', 'async');
          // Move to much further down the loading priority
          if (img instanceof HTMLImageElement) {
            img.style.opacity = '0.1';
          }
        }
      });
      
      // Reduce animation complexity on slow connections
      document.querySelectorAll('.animate-on-scroll, .has-animation').forEach(el => {
        el.classList.add('reduced-motion');
      });
      
      // Disable video autoplay
      document.querySelectorAll('video[autoplay]').forEach(video => {
        video.removeAttribute('autoplay');
        video.setAttribute('preload', 'none');
      });
      
      // Reduce the quality of background images
      document.querySelectorAll('[style*="background-image"]').forEach(el => {
        if (el instanceof HTMLElement) {
          const originalStyle = el.getAttribute('data-original-bg') || el.style.backgroundImage;
          if (!el.hasAttribute('data-original-bg')) {
            el.setAttribute('data-original-bg', originalStyle);
          }
          // Use a lower quality version if available or just add a semi-transparent overlay
          el.style.backgroundImage = 'none';
          el.classList.add('low-quality-bg');
        }
      });
      
      console.log('Slow connection optimizations applied');
    }
  }
};

// Initialize all mobile optimizations
export const initializeMobileOptimizations = (): void => {
  // Run immediately
  enhanceMobileExperience();
  
  // Also run on window resize (debounced)
  let resizeTimeout: number | null = null;
  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      window.clearTimeout(resizeTimeout);
    }
    resizeTimeout = window.setTimeout(() => {
      enhanceMobileExperience();
    }, 250); // Debounce resize events
  });
  
  // Check for slow connections
  detectAndOptimizeForSlowConnections();
  
  // Create a disconnect observer for low bandwidth situations
  if ('connection' in navigator) {
    (navigator as any).connection.addEventListener('change', () => {
      detectAndOptimizeForSlowConnections();
    });
  }
  
  // Add appropriate CSS for orientation changes
  const style = document.createElement('style');
  style.textContent = `
    .orientation-changing * {
      transition: none !important;
    }
    .resize-in-progress * {
      transition: none !important;
    }
    .slow-connection .reduced-motion {
      animation: none !important;
      transition: none !important;
    }
    .active-touch {
      transform: scale(0.98);
      opacity: 0.9;
    }
    .touch-manipulation {
      touch-action: manipulation;
    }
  `;
  document.head.appendChild(style);
};

