import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
}

export const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null
  });

  useEffect(() => {
    const measurePerformance = () => {
      // Measure Core Web Vitals
      if ('PerformanceObserver' in window) {
        // Measure LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          if (lastEntry) {
            setMetrics(prev => ({ ...prev, lcp: Math.round(lastEntry.startTime) }));
            console.log('LCP:', Math.round(lastEntry.startTime));
          }
        });

        try {
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.log('LCP observer not supported');
        }

        // Measure FID (First Input Delay)
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: any) => {
            if (entry.processingStart && entry.startTime) {
              const fid = entry.processingStart - entry.startTime;
              setMetrics(prev => ({ ...prev, fid: Math.round(fid) }));
              console.log('FID:', Math.round(fid));
            }
          });
        });

        try {
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.log('FID observer not supported');
        }

        // Measure CLS (Cumulative Layout Shift)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              setMetrics(prev => ({ ...prev, cls: Math.round(clsValue * 10000) / 10000 }));
              console.log('CLS:', Math.round(clsValue * 10000) / 10000);
            }
          });
        });

        try {
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.log('CLS observer not supported');
        }

        // Measure Navigation Timing metrics
        const measureNavigationTiming = () => {
          if (performance.getEntriesByType) {
            const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
            if (navigationEntries.length > 0) {
              const entry = navigationEntries[0];
              
              // Time to First Byte
              const ttfb = entry.responseStart - entry.fetchStart;
              setMetrics(prev => ({ ...prev, ttfb: Math.round(ttfb) }));
              console.log('TTFB:', Math.round(ttfb));

              // First Contentful Paint (from paint entries)
              const paintEntries = performance.getEntriesByType('paint');
              const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
              if (fcpEntry) {
                setMetrics(prev => ({ ...prev, fcp: Math.round(fcpEntry.startTime) }));
                console.log('FCP:', Math.round(fcpEntry.startTime));
              }
            }
          }
        };

        // Wait for page load to measure navigation timing
        if (document.readyState === 'complete') {
          measureNavigationTiming();
        } else {
          window.addEventListener('load', measureNavigationTiming);
        }

        // SEO Meta Tags Check
        const checkSEOElements = () => {
          const seoChecks = {
            title: document.title.length > 0 && document.title.length <= 60,
            description: !!document.querySelector('meta[name="description"]'),
            h1: document.querySelectorAll('h1').length === 1,
            canonical: !!document.querySelector('link[rel="canonical"]'),
            ogTags: !!document.querySelector('meta[property^="og:"]'),
            structuredData: !!document.querySelector('script[type="application/ld+json"]'),
            viewport: !!document.querySelector('meta[name="viewport"]')
          };

          console.log('SEO Check Results:', seoChecks);
          
          const seoScore = Object.values(seoChecks).filter(Boolean).length / Object.keys(seoChecks).length * 100;
          console.log('SEO Score:', Math.round(seoScore) + '%');
        };

        checkSEOElements();

        // Cleanup observers on unmount
        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      }
    };

    measurePerformance();
  }, []);

  // Optional: Log performance metrics for debugging
  useEffect(() => {
    if (metrics.lcp !== null || metrics.fid !== null || metrics.cls !== null) {
      console.log('Performance Metrics Update:', metrics);
    }
  }, [metrics]);

  return null; // This is a utility component that doesn't render anything
};

export default PerformanceMonitor;