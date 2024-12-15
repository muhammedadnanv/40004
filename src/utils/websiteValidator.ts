import { toast } from "@/components/ui/use-toast";

interface ValidationResult {
  status: 'success' | 'error';
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
        status: 'error',
        message: `Invalid link found: ${link.textContent}`
      });
    }
  });

  // Check images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.complete || img.naturalHeight === 0) {
      results.push({
        status: 'error',
        message: `Failed to load image: ${img.src}`
      });
    }
  });

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
      status: 'warning',
      message: 'Mobile responsiveness might need attention'
    });
  }

  // Check scripts loading
  const scripts = document.querySelectorAll('script');
  scripts.forEach(script => {
    if (script.src && !script.async) {
      results.push({
        status: 'warning',
        message: `Non-async script found: ${script.src}`
      });
    }
  });

  return results;
};

export const runWebsiteTest = async () => {
  console.log('Starting website validation...');
  
  try {
    const results = await validateWebsiteFeatures();
    
    results.forEach(result => {
      if (result.status === 'error') {
        console.error(result.message);
        toast({
          title: "Validation Error",
          description: result.message,
          variant: "destructive",
        });
      } else {
        console.info(result.message);
        toast({
          title: "Validation Info",
          description: result.message,
        });
      }
    });

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