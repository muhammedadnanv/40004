
/**
 * Test performance metrics
 */
export const testPerformanceMetrics = async (): Promise<void> => {
  // This is a basic implementation. In a real scenario, we'd use the Performance API more extensively
  if (window.performance) {
    const perfData = window.performance.timing;
    
    // Calculate some basic metrics
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
    const domInteractive = perfData.domInteractive - perfData.navigationStart;
    
    console.log(`Page load time: ${pageLoadTime}ms`);
    console.log(`DOM Content Loaded: ${domContentLoaded}ms`);
    console.log(`DOM Interactive: ${domInteractive}ms`);
    
    // Check for slow performance
    if (pageLoadTime > 3000) {
      console.warn("Page load time is slower than recommended (3000ms)");
    }
  } else {
    console.warn("Performance API not supported in this browser");
  }
  
  // Check for render-blocking resources
  const scripts = document.querySelectorAll('script');
  let blockingScripts = 0;
  
  scripts.forEach(script => {
    if (!script.async && !script.defer && !script.type?.includes('module')) {
      blockingScripts++;
    }
  });
  
  if (blockingScripts > 0) {
    console.warn(`Found ${blockingScripts} potentially render-blocking scripts`);
  }
  
  // Test image optimization
  const images = Array.from(document.querySelectorAll('img'));
  let largeUnoptimizedImages = 0;
  
  // We can only estimate this on the client side
  for (const img of images) {
    if (img.complete && img.naturalWidth > 0) {
      // Assume any image over 100KB that's not using WebP/AVIF might need optimization
      // This is just an example - in reality we can't easily check file size from JS
      const isLargeAndUnoptimized = (
        img.naturalWidth * img.naturalHeight > 500000 && 
        !img.currentSrc.match(/\.(webp|avif)$/i)
      );
      
      if (isLargeAndUnoptimized) {
        largeUnoptimizedImages++;
      }
    }
  }
  
  if (largeUnoptimizedImages > 0) {
    console.warn(`Found ${largeUnoptimizedImages} potentially unoptimized large images`);
  }
};
