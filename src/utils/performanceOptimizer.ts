
/**
 * Performance optimization utilities for improving platform operations
 */

/**
 * Debounce function to limit the rate at which a function can fire
 */
export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

/**
 * Throttle function to ensure a function is called at most once in a specified time period
 */
export const throttle = <F extends (...args: any[]) => any>(func: F, limit: number) => {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<F>): void => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Optimize images by lazy loading them only when needed
 */
export const lazyLoadImage = (imageElement: HTMLImageElement): void => {
  if ('loading' in HTMLImageElement.prototype) {
    imageElement.loading = 'lazy';
  } else {
    // Fallback for browsers that don't support native lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          observer.unobserve(img);
        }
      });
    });
    observer.observe(imageElement);
  }
};

/**
 * Optimize resource loading with browser hints
 */
export const addResourceHints = (): void => {
  // Add preconnect for external resources
  const hosts = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://zbnwztqwkusdurqllgzc.supabase.co'
  ];
  
  hosts.forEach(host => {
    if (!document.querySelector(`link[rel="preconnect"][href="${host}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = host;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });
};

/**
 * Check device capabilities and optimize accordingly
 */
export const optimizeForDevice = (): {
  isMobile: boolean;
  isTablet: boolean;
  isHighDPI: boolean;
  hasTouchScreen: boolean;
  hasReducedMotion: boolean;
} => {
  const isMobile = window.matchMedia('(max-width: 640px)').matches;
  const isTablet = window.matchMedia('(min-width: 641px) and (max-width: 1024px)').matches;
  const isHighDPI = window.devicePixelRatio > 1;
  const hasTouchScreen = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return {
    isMobile,
    isTablet,
    isHighDPI,
    hasTouchScreen,
    hasReducedMotion
  };
};
