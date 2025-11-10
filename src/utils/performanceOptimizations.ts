/**
 * Performance optimization utilities for the platform
 */

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);
};

// Implement intersection observer for lazy loading images
export const setupImageLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Debounce function for performance-critical operations
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll and resize events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Prefetch next page resources
export const prefetchRoute = (url: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
};

// Optimize CSS delivery
export const optimizeCSSDelivery = () => {
  // Move non-critical CSS to load after page render
  const criticalCSS = document.querySelector('style[data-critical]');
  if (criticalCSS) {
    // Critical CSS is already inline, load full CSS async
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/styles/main.css';
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
    document.head.appendChild(link);
  }
};

// Reduce main thread blocking
export const scheduleIdleTask = (task: () => void) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(task, { timeout: 2000 });
  } else {
    setTimeout(task, 1);
  }
};

// Optimize bundle size by removing unused code
export const removeUnusedFeatures = () => {
  // Check if features are being used and remove if not
  const unusedElements = document.querySelectorAll('[data-feature-flag]');
  unusedElements.forEach(element => {
    const feature = element.getAttribute('data-feature-flag');
    if (!feature || !isFeatureEnabled(feature)) {
      element.remove();
    }
  });
};

// Simple feature flag check
const isFeatureEnabled = (feature: string): boolean => {
  const enabledFeatures = ['chat', 'analytics', 'seo'];
  return enabledFeatures.includes(feature);
};

// Optimize third-party scripts
export const loadThirdPartyScripts = () => {
  scheduleIdleTask(() => {
    // Load analytics
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = 'https://www.googletagmanager.com/gtag/js';
    document.body.appendChild(script);
  });
};

// Reduce layout shifts
export const preventLayoutShifts = () => {
  // Add explicit dimensions to images
  const images = document.querySelectorAll('img:not([width]):not([height])');
  images.forEach(img => {
    const imgElement = img as HTMLImageElement;
    if (imgElement.naturalWidth && imgElement.naturalHeight) {
      imgElement.setAttribute('width', imgElement.naturalWidth.toString());
      imgElement.setAttribute('height', imgElement.naturalHeight.toString());
    }
  });
};

// Initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  // Run critical optimizations immediately
  preloadCriticalResources();
  preventLayoutShifts();
  
  // Defer non-critical optimizations
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      scheduleIdleTask(() => {
        setupImageLazyLoading();
        optimizeCSSDelivery();
        loadThirdPartyScripts();
        removeUnusedFeatures();
      });
    });
  } else {
    scheduleIdleTask(() => {
      setupImageLazyLoading();
      optimizeCSSDelivery();
      loadThirdPartyScripts();
      removeUnusedFeatures();
    });
  }
};

// Monitor performance metrics
export const monitorPerformance = () => {
  if ('PerformanceObserver' in window) {
    try {
      // Monitor LCP
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        console.info('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // Monitor FID
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          console.info('FID:', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ type: 'first-input', buffered: true });

      // Monitor CLS
      let clsScore = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any) {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
            console.info('CLS:', clsScore);
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.error('Performance monitoring error:', e);
    }
  }
};
