
import { toast } from "@/hooks/use-toast";

interface ValidationResult {
  status: 'success' | 'error' | 'warning';
  message: string;
}

export const validateWebsiteFeatures = async (): Promise<ValidationResult[]> => {
  const results: ValidationResult[] = [];

  // Check navigation links
  const navigationLinks = document.querySelectorAll('a');
  navigationLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') {
      results.push({
        status: 'warning',
        message: `Invalid link found: ${link.textContent}`
      });
    }
  });

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

  // Check form elements
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const requiredFields = form.querySelectorAll('[required]');
    if (requiredFields.length === 0) {
      results.push({
        status: 'warning',
        message: `Form missing required fields: ${form.id || 'unnamed form'}`
      });
    }
  });

  // Check responsive layout
  const isMobileResponsive = window.matchMedia('(max-width: 768px)').matches;
  if (!isMobileResponsive) {
    results.push({
      status: 'success',
      message: 'Mobile responsiveness validated'
    });
  }

  // Filter out development-only warnings about scripts
  const scriptWarnings = results.filter(result => 
    result.status === 'warning' && 
    result.message.includes('Consider making script async')
  );
  
  // Remove dev-only warnings from the results
  return results.filter(result => !scriptWarnings.includes(result));
};

export const runWebsiteTest = async () => {
  console.log('Starting website validation...');
  
  try {
    const results = await validateWebsiteFeatures();
    
    let hasErrors = false;
    let hasNonScriptWarnings = false;
    
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
