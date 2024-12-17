import { toast } from "@/components/ui/use-toast";

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

  // Check scripts loading
  const scripts = document.querySelectorAll('script');
  scripts.forEach(script => {
    if (script.src && !script.async && !script.defer) {
      results.push({
        status: 'warning',
        message: `Consider making script async: ${script.src}`
      });
    }
  });

  return results;
};

export const runWebsiteTest = async () => {
  console.log('Starting website validation...');
  
  try {
    const results = await validateWebsiteFeatures();
    
    let hasErrors = false;
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
        toast({
          title: "Validation Warning",
          description: result.message,
          variant: "destructive",
        });
      } else {
        console.info(result.message);
        toast({
          title: "Validation Success",
          description: result.message,
          variant: "default",
        });
      }
    });

    if (!hasErrors) {
      toast({
        title: "Validation Complete",
        description: "No critical issues found",
        variant: "default",
      });
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