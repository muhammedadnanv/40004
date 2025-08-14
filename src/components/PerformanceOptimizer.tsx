import { useEffect } from 'react';
import { 
  optimizeForDevice, 
  addResourceHints, 
  applySEOOptimizations,
  optimizeImagesForSEO
} from '@/utils/performanceOptimizer';
import { enhanceMobileExperience } from '@/utils/mobileResponsiveness';

export const PerformanceOptimizer = () => {
  useEffect(() => {
    const initializeOptimizations = async () => {
      try {
        // Check device capabilities and optimize accordingly
        const deviceInfo = optimizeForDevice();
        console.log('Device capabilities:', deviceInfo);

        // Add resource hints for faster loading
        addResourceHints();

        // Apply SEO optimizations
        applySEOOptimizations();

        // Optimize images for both performance and SEO
        optimizeImagesForSEO('main');

        // Enhanced mobile experience
        if (deviceInfo.isMobile || deviceInfo.isTablet) {
          enhanceMobileExperience();
        }

        // Critical Web Vitals optimization
        if ('PerformanceObserver' in window) {
          // Largest Contentful Paint (LCP)
          const lcpObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              console.log('LCP:', entry.startTime);
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay (FID)
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const fidEntry = entry as any; // Type assertion for FID-specific properties
              console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
            }
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift (CLS)
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            for (const entry of list.getEntries()) {
              const clsEntry = entry as any; // Type assertion for CLS-specific properties
              if (!clsEntry.hadRecentInput) {
                clsValue += clsEntry.value;
              }
            }
            console.log('CLS:', clsValue);
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        }

        // Preload critical resources
        const criticalResources = [
          'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
          'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap'
        ];

        criticalResources.forEach(url => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'style';
          link.href = url;
          document.head.appendChild(link);
        });

        console.log('Performance optimizations applied successfully');
      } catch (error) {
        console.error('Error applying performance optimizations:', error);
      }
    };

    initializeOptimizations();
  }, []);

  // This component doesn't render anything
  return null;
};