
/**
 * Utility for validating and fixing broken links
 */

import { toast } from "@/hooks/use-toast";

interface LinkValidationResult {
  url: string;
  text: string | null;
  valid: boolean;
  issue?: string;
}

/**
 * Validate internal links to ensure they point to existing resources
 */
export const validateInternalLinks = (): LinkValidationResult[] => {
  const results: LinkValidationResult[] = [];
  
  try {
    // Get all links in the document
    const links = document.querySelectorAll('a[href]:not([href^="http"]):not([href^="mailto:"]):not([href^="tel:"])');
    
    links.forEach(link => {
      const url = link.getAttribute('href') || '';
      const text = link.textContent;
      
      // Skip empty links and javascript: links
      if (!url || url === '#' || url.startsWith('javascript:')) {
        results.push({
          url,
          text,
          valid: false,
          issue: 'Empty or javascript: link'
        });
        return;
      }
      
      // Handle hash links (check if ID exists)
      if (url.startsWith('#')) {
        const targetId = url.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (!targetElement) {
          results.push({
            url,
            text,
            valid: false,
            issue: `Missing target element with ID: ${targetId}`
          });
          return;
        }
      }
      
      // Check for router paths that should be prefixed with /
      if (!url.startsWith('/') && !url.startsWith('#') && !url.startsWith('.')) {
        results.push({
          url,
          text,
          valid: false,
          issue: `Router link should start with /: ${url}`
        });
        return;
      }
      
      // For other internal links, we can only validate if they have a reasonable format
      results.push({
        url,
        text,
        valid: true
      });
    });
  } catch (error) {
    console.error('Error validating internal links:', error);
  }
  
  return results;
};

/**
 * Fix common link issues automatically
 */
export const fixCommonLinkIssues = (): number => {
  let fixedCount = 0;
  
  try {
    // Fix empty links
    const emptyLinks = document.querySelectorAll('a[href="#"]');
    emptyLinks.forEach(link => {
      // If link has no meaningful function, replace with a span
      if (!link.getAttribute('onclick') && !link.id && !link.classList.contains('js-')) {
        const span = document.createElement('span');
        span.innerHTML = link.innerHTML;
        span.className = link.className;
        link.parentNode?.replaceChild(span, link);
        fixedCount++;
      }
    });
    
    // Fix missing rel attributes for external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
      if (!link.hasAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
        fixedCount++;
      }
    });
    
    // Fix links without text or aria-label
    const emptyTextLinks = document.querySelectorAll('a:not([aria-label])');
    emptyTextLinks.forEach(link => {
      if (!link.textContent?.trim() && !link.hasAttribute('aria-label')) {
        // Try to find an alt text from an image
        const image = link.querySelector('img');
        if (image && image.alt) {
          link.setAttribute('aria-label', image.alt);
          fixedCount++;
        } else {
          link.setAttribute('aria-label', 'Link');
          fixedCount++;
        }
      }
    });
    
    // Fix router links that should start with /
    const routerLinks = document.querySelectorAll('a[href]:not([href^="http"]):not([href^="#"]):not([href^="/"]):not([href^="."]):not([href^="mailto:"]):not([href^="tel:"])');
    routerLinks.forEach(link => {
      const currentHref = link.getAttribute('href') || '';
      if (currentHref) {
        link.setAttribute('href', `/${currentHref}`);
        fixedCount++;
      }
    });
  } catch (error) {
    console.error('Error fixing link issues:', error);
  }
  
  return fixedCount;
};

/**
 * Log link validation issues to console and optionally show a toast
 */
export const reportLinkIssues = (showToast: boolean = true): void => {
  const validationResults = validateInternalLinks();
  const invalidLinks = validationResults.filter(result => !result.valid);
  
  if (invalidLinks.length > 0) {
    console.warn('Found invalid links:', invalidLinks);
    
    if (showToast) {
      toast({
        title: "Link Issues Detected",
        description: `Found ${invalidLinks.length} invalid links. Check console for details.`,
        variant: "destructive",
      });
    }
  }
};

/**
 * Automatically fix and report link issues
 */
export const autoFixAndReportLinkIssues = (): void => {
  const fixedCount = fixCommonLinkIssues();
  reportLinkIssues(fixedCount === 0); // Only show toast if we couldn't fix any issues
  
  if (fixedCount > 0) {
    console.log(`Automatically fixed ${fixedCount} link issues`);
  }
};
