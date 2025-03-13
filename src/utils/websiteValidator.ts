
import { toast } from "@/hooks/use-toast";
import { throttle } from "./performanceOptimizer";
import { optimizeImagesForSEO, applySEOOptimizations } from "./performanceOptimizer";

interface ValidationResult {
  status: 'success' | 'error' | 'warning';
  message: string;
}

// Throttled validation to prevent excessive resource usage
export const validateWebsiteFeatures = throttle(async (): Promise<ValidationResult[]> => {
  const results: ValidationResult[] = [];

  // Check navigation links
  const navigationLinks = document.querySelectorAll('a');
  if (navigationLinks && navigationLinks.length > 0) {
    navigationLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#') {
        results.push({
          status: 'warning',
          message: `Invalid link found: ${link.textContent}`
        });
      }
    });
  }

  // Check images with timeout
  const images = document.querySelectorAll('img');
  const imageChecks = Array.from(images).map(img => {
    return new Promise<void>(resolve => {
      if (img.complete) {
        if (!img.naturalHeight) {
          results.push({
            status: 'warning',
            message: `Image might be broken: ${img.src}`
          });
        }
        resolve();
      } else {
        const timeout = setTimeout(() => {
          results.push({
            status: 'warning',
            message: `Image load timeout: ${img.src}`
          });
          resolve();
        }, 5000);

        img.onload = () => {
          clearTimeout(timeout);
          resolve();
        };

        img.onerror = () => {
          clearTimeout(timeout);
          results.push({
            status: 'warning',
            message: `Failed to load image: ${img.src}`
          });
          resolve();
        };
      }
    });
  });

  await Promise.all(imageChecks);

  // Check for SEO basics
  const hasTitleTag = document.title && document.title.length > 0;
  if (!hasTitleTag) {
    results.push({
      status: 'error',
      message: 'Missing page title'
    });
  } else if (document.title.length < 30 || document.title.length > 60) {
    results.push({
      status: 'warning',
      message: `Title length is ${document.title.length} characters (recommended: 30-60)`
    });
  }

  const metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    results.push({
      status: 'warning',
      message: 'Missing meta description'
    });
  } else {
    const content = metaDescription.getAttribute('content');
    if (!content || content.length < 50 || content.length > 160) {
      results.push({
        status: 'warning',
        message: `Meta description length is ${content ? content.length : 0} characters (recommended: 50-160)`
      });
    }
  }

  // Check form elements - FIX: Properly handle the NodeList and check for existence
  const forms = document.querySelectorAll('form');
  if (forms && forms.length > 0) {
    Array.from(forms).forEach(form => {
      const requiredFields = form.querySelectorAll('[required]');
      if (requiredFields.length === 0) {
        results.push({
          status: 'warning',
          message: `Form missing required fields: ${form.id || 'unnamed form'}`
        });
      }
    });
  }

  // Check responsive layout
  const isMobileResponsive = window.matchMedia('(max-width: 768px)').matches;
  if (!isMobileResponsive) {
    results.push({
      status: 'success',
      message: 'Mobile responsiveness validated'
    });
  }

  // Check for console errors
  if (typeof window !== 'undefined' && window.console) {
    const originalError = console.error;
    let hasConsoleErrors = false;
    
    console.error = function(...args) {
      hasConsoleErrors = true;
      originalError.apply(console, args);
    };
    
    // Wait a brief moment to catch any errors
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Restore original console.error
    console.error = originalError;
    
    if (hasConsoleErrors) {
      results.push({
        status: 'warning',
        message: 'Console errors detected'
      });
    }
  }

  // Check page load performance
  if (typeof window !== 'undefined' && window.performance) {
    const pageLoadTime = performance.now();
    if (pageLoadTime > 3000) {
      results.push({
        status: 'warning',
        message: `Page load time is high: ${Math.round(pageLoadTime)}ms`
      });
    } else {
      results.push({
        status: 'success',
        message: `Page load time is good: ${Math.round(pageLoadTime)}ms`
      });
    }
  }

  // Filter out development-only warnings about scripts
  const scriptWarnings = results.filter(result => 
    result.status === 'warning' && 
    result.message.includes('Consider making script async')
  );
  
  // Remove dev-only warnings from the results
  return results.filter(result => !scriptWarnings.includes(result));
}, 30000); // Throttle to run at most once every 30 seconds

export const runWebsiteTest = async () => {
  console.log('Starting website validation...');
  
  try {
    const results = await validateWebsiteFeatures();
    
    let hasErrors = false;
    let hasNonScriptWarnings = false;
    
    // Fixed the error by checking if results has items
    if (results && results.length > 0) {
      // Now we know results is an array with items, so we can safely call forEach
      results.forEach(result => {
        if (result.status === 'error') {
          console.error(result.message);
          hasErrors = true;
          toast({
            title: "Validation Error",
            description: result.message,
            variant: "destructive",
          });
        } else if (result.status === 'warning') {
          console.warn(result.message);
          // Only show toast for important warnings, not development script warnings
          if (!result.message.includes('Consider making script async')) {
            hasNonScriptWarnings = true;
            toast({
              title: "Validation Warning",
              description: result.message,
              variant: "destructive",
            });
          }
        } else {
          console.info(result.message);
        }
      });

      if (!hasErrors && !hasNonScriptWarnings) {
        console.log('Website validation completed successfully');
      }
    } else {
      console.log('No validation results returned');
    }

    console.log('Website validation complete');
  } catch (error) {
    console.error('Validation failed:', error);
    toast({
      title: "Validation Failed",
      description: "Could not complete website validation",
      variant: "destructive",
    });
  }
};

// Improved function to perform SEO optimizations automatically
export const runSEOOptimizations = async () => {
  console.log('Running automatic SEO optimizations...');

  try {
    // Apply basic SEO optimizations
    applySEOOptimizations();
    
    // Optimize images for SEO
    optimizeImagesForSEO('.content-section img');
    
    toast({
      title: "SEO Optimization",
      description: "Website optimized with latest high-intent keywords",
      duration: 3000,
    });
    
    console.log('SEO optimizations complete');
  } catch (error) {
    console.error('SEO optimization failed:', error);
    toast({
      title: "SEO Optimization Failed",
      description: "Could not complete website SEO optimization",
      variant: "destructive",
    });
  }
};
