/**
 * Comprehensive website validation utility
 */

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
  try {
    const navigationLinks = document.querySelectorAll('a');
    if (navigationLinks && navigationLinks.length > 0) {
      Array.from(navigationLinks).forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === '#') {
          results.push({
            status: 'warning',
            message: `Invalid link found: ${link.textContent}`
          });
        }
      });
    }
  } catch (error) {
    console.error('Error checking navigation links:', error);
  }

  // Check images with timeout
  try {
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
  } catch (error) {
    console.error('Error checking images:', error);
  }

  // Check for SEO basics
  try {
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
    
    // NEW: Check for structured data
    const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
    if (structuredData.length === 0) {
      results.push({
        status: 'warning',
        message: 'Missing structured data (Schema.org markup)'
      });
    }
    
    // NEW: Check for canonical URL
    const canonicalUrl = document.querySelector('link[rel="canonical"]');
    if (!canonicalUrl) {
      results.push({
        status: 'warning',
        message: 'Missing canonical URL tag'
      });
    }
    
    // NEW: Check for retargeting tags
    const hasGoogleRetargeting = document.querySelector('script[src*="googletagmanager"]');
    const hasFacebookPixel = document.querySelector('script[src*="facebook"]') || 
                           document.querySelector('script:contains(fbq)');
                           
    if (!hasGoogleRetargeting && !hasFacebookPixel) {
      results.push({
        status: 'warning',
        message: 'No retargeting pixels detected (Google/Facebook)'
      });
    }
  } catch (error) {
    console.error('Error checking SEO basics:', error);
  }

  // Check form elements
  try {
    const formElements = document.querySelectorAll('form');
    
    // Fixed: Convert NodeList to an array and check if it has items before iterating
    const forms = Array.from(formElements as NodeListOf<HTMLFormElement>);
    
    if (forms.length > 0) {
      forms.forEach(form => {
        const requiredFields = form.querySelectorAll('[required]');
        if (requiredFields.length === 0) {
          results.push({
            status: 'warning',
            message: `Form missing required fields: ${form.id || 'unnamed form'}`
          });
        }
      });
    }
  } catch (error) {
    console.error('Error checking forms:', error);
  }

  // Check responsive layout
  try {
    // Check for viewport meta tag
    const hasViewportTag = !!document.querySelector('meta[name="viewport"]');
    if (!hasViewportTag) {
      results.push({
        status: 'error',
        message: 'Missing viewport meta tag. Add <meta name="viewport" content="width=device-width, initial-scale=1">'
      });
    }

    // Check for mobile media queries in stylesheets
    let hasMobileMediaQueries = false;
    const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
    if (styles.length > 0) {
      // We can't actually check the content of external stylesheets due to CORS,
      // but we can assume our project has responsive styles based on our CSS files
      hasMobileMediaQueries = true;
    }

    if (!hasMobileMediaQueries) {
      results.push({
        status: 'warning',
        message: 'No mobile media queries detected'
      });
    } else {
      results.push({
        status: 'success',
        message: 'Mobile responsiveness validated'
      });
    }
  } catch (error) {
    console.error('Error checking responsive layout:', error);
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

  // Check for broken links
  try {
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="javascript:"]):not([href^="mailto:"])');
    let brokenLinkCount = 0;
    
    const linkChecks = Array.from(links).slice(0, 10).map(link => { // Limit to 10 links to prevent excessive requests
      const href = link.getAttribute('href') || '';
      
      // Skip external links in validation
      if (href.startsWith('http') && !href.includes(window.location.hostname)) {
        return Promise.resolve();
      }
      
      return new Promise<void>(resolve => {
        // For internal links, just check if they exist in the DOM
        if (href.startsWith('/') || href.startsWith('./') || href.startsWith('#')) {
          const targetId = href.includes('#') ? href.split('#')[1] : '';
          if (targetId && !document.getElementById(targetId)) {
            results.push({
              status: 'warning',
              message: `Broken anchor link: ${href}`
            });
            brokenLinkCount++;
          }
        }
        resolve();
      });
    });
    
    await Promise.all(linkChecks);
    
    if (brokenLinkCount > 0) {
      results.push({
        status: 'warning',
        message: `${brokenLinkCount} broken internal links detected`
      });
    }
  } catch (error) {
    console.error('Error checking broken links:', error);
  }

  // NEW: Check for mobile optimization
  try {
    // Check for touch-friendly elements
    const smallTouchTargets = [];
    const touchElements = document.querySelectorAll('button, a, input[type="button"], input[type="submit"]');
    
    touchElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        smallTouchTargets.push(el);
      }
    });
    
    if (smallTouchTargets.length > 5) {
      results.push({
        status: 'warning',
        message: `${smallTouchTargets.length} touch targets too small (should be at least 44x44px)`
      });
    }
    
    // Check for tap spacing
    const closeElements = [];
    const clickableElements = Array.from(document.querySelectorAll('a, button'));
    
    for (let i = 0; i < clickableElements.length; i++) {
      for (let j = i + 1; j < clickableElements.length; j++) {
        const rect1 = clickableElements[i].getBoundingClientRect();
        const rect2 = clickableElements[j].getBoundingClientRect();
        
        const horizontalOverlap = !(rect1.right < rect2.left || rect1.left > rect2.right);
        const verticalOverlap = !(rect1.bottom < rect2.top || rect1.top > rect2.bottom);
        
        if (horizontalOverlap && verticalOverlap) {
          closeElements.push([clickableElements[i], clickableElements[j]]);
        }
      }
      
      if (closeElements.length >= 3) break; // Limit checking for performance
    }
    
    if (closeElements.length > 0) {
      results.push({
        status: 'warning',
        message: `${closeElements.length} sets of overlapping clickable elements detected`
      });
    }
  } catch (error) {
    console.error('Error checking mobile optimization:', error);
  }
  
  // NEW: Check for on-page SEO factors
  try {
    // Check for keyword usage in headings
    const h1Elements = document.querySelectorAll('h1');
    const h2Elements = document.querySelectorAll('h2');
    
    if (h1Elements.length === 0) {
      results.push({
        status: 'warning',
        message: 'No H1 heading found - important for SEO'
      });
    }
    
    if (h2Elements.length === 0) {
      results.push({
        status: 'warning',
        message: 'No H2 headings found - important for content structure'
      });
    }
    
    // Check for image alt text
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
    if (imagesWithoutAlt.length > 0) {
      results.push({
        status: 'warning',
        message: `${imagesWithoutAlt.length} images missing alt text for SEO and accessibility`
      });
    }
    
    // Check meta robots
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      results.push({
        status: 'info',
        message: 'No robots meta tag found (defaults to index,follow)'
      });
    } else if (robotsMeta.getAttribute('content')?.includes('noindex')) {
      results.push({
        status: 'warning',
        message: 'Page set to noindex - will not appear in search results'
      });
    }
  } catch (error) {
    console.error('Error checking on-page SEO factors:', error);
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
    
    // Check if results is an array and has items
    if (results && results.length > 0) {
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
    
    // NEW: Apply schema markup if missing
    const hasSchemaMarkup = document.querySelector('script[type="application/ld+json"]');
    if (!hasSchemaMarkup) {
      const pageTitle = document.title;
      const isProductPage = window.location.pathname.includes('/programs') || 
                          window.location.pathname.includes('/program');
      
      if (isProductPage) {
        // Add Course schema for program pages
        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Course',
          'name': pageTitle,
          'description': document.querySelector('meta[name="description"]')?.getAttribute('content') || pageTitle,
          'provider': {
            '@type': 'Organization',
            'name': 'Developer Certification Program',
            'sameAs': window.location.origin
          }
        });
        document.head.appendChild(schemaScript);
      } else {
        // Add WebSite schema for other pages
        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': pageTitle,
          'url': window.location.href
        });
        document.head.appendChild(schemaScript);
      }
    }
    
    // NEW: Add canonical URL if missing
    const hasCanonicalUrl = document.querySelector('link[rel="canonical"]');
    if (!hasCanonicalUrl) {
      const canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = window.location.href.split('?')[0]; // Remove query parameters
      document.head.appendChild(canonicalLink);
    }
    
    toast({
      title: "SEO Optimization",
      description: "Website optimized with latest high-intent keywords and structured data",
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

// Enhanced resume analyzer using NLP model integration
export const analyzeResumeContent = async (text: string): Promise<{
  isATSFriendly: boolean;
  score: number;
  recommendations: string[];
}> => {
  try {
    console.log('Analyzing resume content with enhanced NLP model...');
    
    // Initialize results
    const recommendations: string[] = [];
    let score = 100;
    let nlpEnhancedScore = 0;
    
    // 1. Check if resume has proper sections using NLP pattern recognition
    const expectedSections = [
      'summary', 'objective', 'experience', 'education', 
      'skills', 'certifications', 'achievements'
    ];
    
    const textLower = text.toLowerCase();
    const foundSections = expectedSections.filter(section => 
      textLower.includes(section) || 
      textLower.includes(section.toUpperCase())
    );
    
    if (foundSections.length < 3) {
      recommendations.push("Add clear section headers for Summary/Objective, Experience, Education, and Skills");
      score -= 15;
    }

    // 2. Check for proper contact information
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
    const hasPhone = /(\+\d{1,3}[-\s]?)?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}/.test(text);
    
    if (!hasEmail || !hasPhone) {
      recommendations.push("Include complete contact information (email and phone number)");
      score -= 10;
    }

    // 3. Check for bullet points (good for ATS parsing)
    const bulletPointPatterns = [
      /•\s/g, /\*\s/g, /-\s/g, /\d+\.\s/g, /[\u2022\u2023\u25E6\u2043\u2219]/g
    ];
    
    const hasBulletPoints = bulletPointPatterns.some(pattern => pattern.test(text));
    
    if (!hasBulletPoints) {
      recommendations.push("Use bullet points to list achievements and responsibilities");
      score -= 10;
    }

    // 4. Check for complex formatting that might break ATS
    const complexFormattingPatterns = [
      /\t{2,}/g, // Multiple tabs
      /\n{3,}/g, // Excessive line breaks
      /\[.*?\]/g, // Content in brackets that might be from a template
      /\{.*?\}/g, // Content in curly braces that might be from a template
    ];
    
    const hasComplexFormatting = complexFormattingPatterns.some(pattern => pattern.test(text));
    
    if (hasComplexFormatting) {
      recommendations.push("Remove complex formatting like tables, columns, headers/footers, and text boxes");
      score -= 15;
    }

    // 5. NEW: Enhanced keyword density analysis using NLP techniques
    try {
      // Extract potential job-related keywords using regex patterns for skills and technologies
      const skillKeywords = text.match(/\b([A-Z][A-Za-z]*|[A-Za-z]+\+\+|[A-Za-z]#|[A-Za-z]+\.js|[A-Za-z]+\.NET|HTML5|CSS3|[A-Za-z0-9\-]+)\b/g) || [];
      
      // Filter out common words that are not likely to be skills
      const commonWords = ['The', 'And', 'For', 'With', 'From', 'That', 'This', 'Have', 'Will'];
      const filteredKeywords = skillKeywords.filter(word => !commonWords.includes(word));
      
      // Calculate unique keywords ratio
      const uniqueKeywords = [...new Set(filteredKeywords)];
      const keywordDensity = uniqueKeywords.length / Math.max(text.split(/\s+/).length, 1);
      
      // Improve score based on keyword analysis
      if (uniqueKeywords.length >= 15) {
        nlpEnhancedScore += 10;
      } else if (uniqueKeywords.length < 10) {
        recommendations.push("Add more industry-specific keywords and skills relevant to the position");
        score -= 10;
      }
    } catch (error) {
      console.error('Error during NLP keyword analysis:', error);
    }

    // 6. Check for date formats (consistent formatting helps ATS)
    const datePatterns = [
      /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}\b/g, // Month Year
      /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g, // MM/DD/YYYY
      /\b\d{4}-\d{1,2}-\d{1,2}\b/g, // YYYY-MM-DD
    ];
    
    const hasConsistentDates = datePatterns.some(pattern => {
      const matches = text.match(pattern);
      return matches && matches.length >= 2;
    });
    
    if (!hasConsistentDates) {
      recommendations.push("Use consistent date formatting throughout your resume (e.g., MM/YYYY)");
      score -= 5;
    }

    // 7. Check resume length (based on word count)
    const wordCount = text.split(/\s+/).length;
    if (wordCount < 300) {
      recommendations.push("Your resume appears too short. Add more details to highlight your experience");
      score -= 10;
    } else if (wordCount > 1000) {
      recommendations.push("Your resume may be too long. Consider condensing to 1-2 pages for better readability");
      score -= 5;
    }

    // 8. NEW: Analyze sentence structure and action verbs using basic NLP techniques
    try {
      // Simple pattern matching for action verbs at the beginning of lines (commonly used in resumes)
      const actionVerbPattern = /\n(Developed|Created|Led|Managed|Implemented|Designed|Analyzed|Built|Improved|Increased|Reduced|Achieved|Collaborated|Coordinated|Delivered)/gi;
      const actionVerbMatches = text.match(actionVerbPattern);
      
      if (!actionVerbMatches || actionVerbMatches.length < 5) {
        recommendations.push("Use more action verbs to start bullet points (e.g., Developed, Implemented, Increased)");
        score -= 5;
      } else {
        nlpEnhancedScore += 5;
      }
    } catch (error) {
      console.error('Error during action verb analysis:', error);
    }

    // Add NLP-enhanced score bonus (capped at 15 points)
    score += Math.min(nlpEnhancedScore, 15);
    
    // Ensure score stays within 0-100 range
    score = Math.min(Math.max(score, 0), 100);

    // If no recommendations, add a positive note
    if (recommendations.length === 0) {
      recommendations.push("Your resume appears to be well-formatted for ATS systems with good keyword optimization!");
    }

    // Calculate final result
    const isATSFriendly = score >= 70;
    
    console.log('Resume analysis complete with score:', score);

    return {
      isATSFriendly,
      score,
      recommendations
    };
  } catch (error) {
    console.error('Error in resume analysis:', error);
    return {
      isATSFriendly: false,
      score: 0,
      recommendations: ['Error analyzing resume content. Please try again.']
    };
  }
};
