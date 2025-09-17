// This file contains utilities for validating website structure, content, and SEO factors

// Import toast is not used directly in utility functions

// Website validation result interface
interface ValidationResult {
  score: number;
  issues: ValidationIssue[];
  passes: string[];
}

// Validation issue interface
interface ValidationIssue {
  type: "error" | "warning" | "success"; // Limiting to these three types
  message: string;
  impact: "high" | "medium" | "low";
  element?: string;
}

// SEO validation result interface
interface SEOValidationResult {
  metaTagsScore: number;
  contentScore: number;
  mobileFriendlinessScore: number;
  performanceScore: number;
  overallScore: number;
  recommendations: string[];
}

// Resume analysis result interface
interface ResumeAnalysisResult {
  isATSFriendly: boolean;
  score: number;
  recommendations: string[];
}

// Page speeds data interface
interface PageSpeedData {
  FCP: number; // First Contentful Paint
  LCP: number; // Largest Contentful Paint
  CLS: number; // Cumulative Layout Shift
  TTI: number; // Time to Interactive
  TBT: number; // Total Blocking Time
}

// SEO factors to check
const SEO_FACTORS = [
  'title',
  'meta-description',
  'headings',
  'image-alt',
  'canonical',
  'schema-markup',
  'mobile-friendly',
  'page-speed',
  'content-quality',
  'keyword-usage'
];

// Content elements to validate
const CONTENT_ELEMENTS = [
  'h1',
  'h2',
  'h3',
  'p',
  'img',
  'button',
  'a',
  'ul',
  'ol'
];

// Main function to run website tests
export async function runWebsiteTest(): Promise<ValidationResult> {
  console.log('Running website test...');
  
  const result: ValidationResult = {
    score: 0,
    issues: [],
    passes: []
  };
  
  try {
    // Check if we're in a browser environment
    if (typeof document === 'undefined') {
      throw new Error('This function must be run in a browser environment.');
    }
    
    // Run various checks
    checkMetaTags(result);
    checkContentStructure(result);
    checkMobileFriendliness(result);
    checkAccessibility(result);
    checkPerformance(result);
    checkSEOFactors(result);
    
    // Calculate overall score
    const totalChecks = result.issues.length + result.passes.length;
    const passedChecks = result.passes.length;
    
    if (totalChecks > 0) {
      result.score = Math.round((passedChecks / totalChecks) * 100);
    }
    
    // Log results
    console.log('Website test complete. Score:', result.score);
    console.log('Passes:', result.passes.length);
    console.log('Issues:', result.issues.length);
    
    // Log results to console (toast removed from utility)
    
    return result;
  } catch (error) {
    console.error('Error running website test:', error);
    result.issues.push({
      type: 'error',
      message: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      impact: 'high'
    });
    
    // Error logged to console
    
    return result;
  }
}

// Check meta tags
function checkMetaTags(result: ValidationResult): void {
  console.log('Checking meta tags...');
  
  // Title check
  const title = document.title;
  if (title && title.length > 10 && title.length < 70) {
    result.passes.push('Title has appropriate length');
  } else {
    result.issues.push({
      type: 'warning',
      message: 'Title should be between 10-70 characters',
      impact: 'medium',
      element: 'title'
    });
  }
  
  // Meta description check
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && metaDescription.getAttribute('content')) {
    const descContent = metaDescription.getAttribute('content') || '';
    if (descContent.length > 50 && descContent.length < 160) {
      result.passes.push('Meta description has appropriate length');
    } else {
      result.issues.push({
        type: 'warning',
        message: 'Meta description should be between 50-160 characters',
        impact: 'medium',
        element: 'meta[name="description"]'
      });
    }
  } else {
    result.issues.push({
      type: 'error',
      message: 'Meta description is missing',
      impact: 'high'
    });
  }
  
  // Check canonical link
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    result.passes.push('Canonical link is present');
  } else {
    result.issues.push({
      type: 'warning',
      message: 'Canonical link is missing',
      impact: 'medium'
    });
  }
  
  // Check viewport
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    result.passes.push('Viewport meta tag is present');
  } else {
    result.issues.push({
      type: 'error',
      message: 'Viewport meta tag is missing',
      impact: 'high'
    });
  }
}

// Check content structure
function checkContentStructure(result: ValidationResult): void {
  console.log('Checking content structure...');
  
  // Check for H1
  const h1Elements = document.querySelectorAll('h1');
  if (h1Elements.length === 1) {
    result.passes.push('Page has exactly one H1 heading');
  } else if (h1Elements.length === 0) {
    result.issues.push({
      type: 'error',
      message: 'Page is missing an H1 heading',
      impact: 'high'
    });
  } else {
    result.issues.push({
      type: 'warning',
      message: `Page has multiple H1 headings (${h1Elements.length})`,
      impact: 'medium'
    });
  }
  
  // Check heading hierarchy
  let prevLevel = 0;
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let headingHierarchyValid = true;
  
  headings.forEach(heading => {
    const level = parseInt(heading.tagName.substring(1), 10);
    
    // Check if heading levels are skipped (e.g., H1 to H3)
    if (level > prevLevel + 1 && prevLevel !== 0) {
      headingHierarchyValid = false;
      result.issues.push({
        type: 'warning',
        message: `Heading level skipped from H${prevLevel} to H${level}`,
        impact: 'medium',
        element: heading.tagName.toLowerCase()
      });
    }
    
    prevLevel = level;
  });
  
  if (headingHierarchyValid) {
    result.passes.push('Heading hierarchy is valid');
  }
  
  // Check for alt text on images
  const images = document.querySelectorAll('img');
  let allImagesHaveAlt = true;
  
  images.forEach(img => {
    if (!img.hasAttribute('alt')) {
      allImagesHaveAlt = false;
      result.issues.push({
        type: 'error',
        message: 'Image missing alt text',
        impact: 'high',
        element: 'img'
      });
    }
  });
  
  if (allImagesHaveAlt && images.length > 0) {
    result.passes.push('All images have alt text');
  }
  
  // Check for empty links
  const links = document.querySelectorAll('a');
  let allLinksHaveText = true;
  
  links.forEach(link => {
    if (!link.textContent?.trim() && !link.querySelector('img')) {
      allLinksHaveText = false;
      result.issues.push({
        type: 'warning',
        message: 'Link has no text or image content',
        impact: 'medium',
        element: 'a'
      });
    }
  });
  
  if (allLinksHaveText && links.length > 0) {
    result.passes.push('All links have text or image content');
  }
}

// Check mobile friendliness
function checkMobileFriendliness(result: ValidationResult): void {
  console.log('Checking mobile friendliness...');
  
  // Check viewport
  const viewport = document.querySelector('meta[name="viewport"]');
  const viewportContent = viewport?.getAttribute('content') || '';
  
  if (viewportContent.includes('width=device-width') && 
      viewportContent.includes('initial-scale=1')) {
    result.passes.push('Viewport is properly configured for mobile');
  } else if (viewport) {
    result.issues.push({
      type: 'warning',
      message: 'Viewport meta tag may not be properly configured for mobile',
      impact: 'medium'
    });
  }
  
  // Check font sizes (must be at least 16px for readability)
  const bodyFontSize = window.getComputedStyle(document.body).fontSize;
  const parsedSize = parseInt(bodyFontSize, 10);
  
  if (parsedSize >= 16) {
    result.passes.push('Body font size is suitable for mobile (≥16px)');
  } else {
    result.issues.push({
      type: 'warning',
      message: 'Body font size may be too small for mobile devices',
      impact: 'medium'
    });
  }
  
  // Check tap target sizes (Google recommends at least 48px height/width with 8px margins)
  const tappableElements = document.querySelectorAll('a, button, input, select, textarea');
  let smallTapTargets = 0;
  
  tappableElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.height < 48 || rect.width < 48) {
      smallTapTargets++;
    }
  });
  
  if (smallTapTargets === 0 && tappableElements.length > 0) {
    result.passes.push('All tap targets are appropriately sized');
  } else if (smallTapTargets > 0) {
    result.issues.push({
      type: 'warning',
      message: `${smallTapTargets} tap targets may be too small for mobile users`,
      impact: 'medium'
    });
  }
}

// Check accessibility
function checkAccessibility(result: ValidationResult): void {
  console.log('Checking accessibility...');
  
  // Check for alt text on images (already checked in content structure)
  
  // Check for form labels
  const formInputs = document.querySelectorAll('input, textarea, select');
  let unlabeledInputs = 0;
  
  formInputs.forEach(input => {
    const inputId = input.getAttribute('id');
    if (inputId) {
      const associatedLabel = document.querySelector(`label[for="${inputId}"]`);
      if (!associatedLabel) {
        unlabeledInputs++;
      }
    } else if (!input.getAttribute('aria-label') && 
               !input.getAttribute('aria-labelledby')) {
      unlabeledInputs++;
    }
  });
  
  if (unlabeledInputs === 0 && formInputs.length > 0) {
    result.passes.push('All form inputs have associated labels');
  } else if (unlabeledInputs > 0) {
    result.issues.push({
      type: 'warning',
      message: `${unlabeledInputs} form inputs lack proper labels`,
      impact: 'high'
    });
  }
  
  // Check heading hierarchy (already checked in content structure)
  
  // Check color contrast (simplified check)
  const bodyStyle = window.getComputedStyle(document.body);
  const bodyColor = bodyStyle.color;
  const bodyBg = bodyStyle.backgroundColor;
  
  if (bodyColor && bodyBg && bodyColor !== bodyBg) {
    result.passes.push('Body text and background have different colors');
  } else {
    result.issues.push({
      type: 'warning',
      message: 'Body text and background colors may not have sufficient contrast',
      impact: 'high'
    });
  }
}

// Check performance (simplified)
function checkPerformance(result: ValidationResult): void {
  console.log('Checking performance...');
  
  // Check image sizes (simplified)
  const images = document.querySelectorAll('img');
  let largeImagesCount = 0;
  
  images.forEach(img => {
    // Check if images have width and height attributes to prevent layout shifts
    if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
      result.issues.push({
        type: 'warning',
        message: 'Image missing width or height attributes (may cause layout shifts)',
        impact: 'medium',
        element: 'img'
      });
    }
  });
  
  // Check for lazy loading on images below the fold
  let imagesWithLazyLoading = 0;
  images.forEach(img => {
    if (img.getAttribute('loading') === 'lazy') {
      imagesWithLazyLoading++;
    }
  });
  
  if (imagesWithLazyLoading > 0) {
    result.passes.push(`${imagesWithLazyLoading} images use lazy loading`);
  } else if (images.length > 3) {
    result.issues.push({
      type: 'warning',
      message: 'No images use lazy loading',
      impact: 'medium'
    });
  }
  
  // Count scripts and estimate impact
  const scripts = document.querySelectorAll('script');
  if (scripts.length > 15) {
    result.issues.push({
      type: 'warning',
      message: `Large number of scripts (${scripts.length}) may impact performance`,
      impact: 'medium'
    });
  } else {
    result.passes.push('Reasonable number of script elements');
  }
  
  // Check for render-blocking resources
  const renderBlockingStyles = document.querySelectorAll('link[rel="stylesheet"]:not([media="print"])');
  const renderBlockingScripts = document.querySelectorAll('script:not([async]):not([defer])');
  
  const totalBlockingResources = renderBlockingStyles.length + renderBlockingScripts.length;
  
  if (totalBlockingResources <= 3) {
    result.passes.push('Few render-blocking resources detected');
  } else {
    result.issues.push({
      type: 'warning',
      message: `${totalBlockingResources} potential render-blocking resources detected`,
      impact: 'medium'
    });
  }
}

// Check SEO factors
function checkSEOFactors(result: ValidationResult): void {
  console.log('Checking SEO factors...');
  
  // Check for structured data
  const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
  if (jsonLdScripts.length > 0) {
    result.passes.push('Structured data (JSON-LD) is present');
  } else {
    result.issues.push({
      type: 'warning',
      message: 'No structured data (JSON-LD) detected',
      impact: 'medium'
    });
  }
  
  // Check for Open Graph tags
  const ogTags = document.querySelectorAll('meta[property^="og:"]');
  if (ogTags.length >= 3) {
    result.passes.push('Open Graph meta tags are present');
  } else {
    result.issues.push({
      type: 'warning',
      message: 'Few or no Open Graph meta tags detected',
      impact: 'medium'
    });
  }
  
  // Check for Twitter Card tags
  const twitterTags = document.querySelectorAll('meta[name^="twitter:"]');
  if (twitterTags.length >= 2) {
    result.passes.push('Twitter Card meta tags are present');
  } else {
    result.issues.push({
      type: 'warning',
      message: 'Few or no Twitter Card meta tags detected',
      impact: 'low'
    });
  }
  
  // Check for robots meta tag
  const robotsTag = document.querySelector('meta[name="robots"]');
  if (robotsTag) {
    result.passes.push('Robots meta tag is present');
  } else {
    result.issues.push({
      type: 'warning',
      message: 'Robots meta tag is missing',
      impact: 'medium'
    });
  }
  
  // Check keyword usage in important elements
  // This is a simplified check that would need to be customized based on target keywords
  const bodyText = document.body.textContent?.toLowerCase() || '';
  const commonKeywords = ['certification', 'developer', 'mentorship', 'projects'];
  
  let keywordsFound = 0;
  commonKeywords.forEach(keyword => {
    if (bodyText.includes(keyword)) {
      keywordsFound++;
    }
  });
  
  if (keywordsFound === commonKeywords.length) {
    result.passes.push('All expected keywords found in page content');
  } else {
    result.issues.push({
      type: 'warning',
      message: `Only ${keywordsFound}/${commonKeywords.length} expected keywords found in content`,
      impact: 'medium'
    });
  }
}

// Run SEO optimizations (to be called separately)
export function runSEOOptimizations(): SEOValidationResult {
  console.log('Running SEO optimizations...');
  
  // This would be more comprehensive in a real implementation
  const result: SEOValidationResult = {
    metaTagsScore: 0,
    contentScore: 0,
    mobileFriendlinessScore: 0,
    performanceScore: 0,
    overallScore: 0,
    recommendations: []
  };
  
  // Check meta tags
  const metaTitle = document.title;
  const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
  
  if (metaTitle && metaTitle.length >= 10 && metaTitle.length <= 60) {
    result.metaTagsScore += 25;
  } else {
    result.recommendations.push('Optimize title length (10-60 characters)');
  }
  
  if (metaDescription && metaDescription.length >= 50 && metaDescription.length <= 160) {
    result.metaTagsScore += 25;
  } else {
    result.recommendations.push('Optimize meta description length (50-160 characters)');
  }
  
  // Check Open Graph tags
  const hasOgTitle = document.querySelector('meta[property="og:title"]') !== null;
  const hasOgDescription = document.querySelector('meta[property="og:description"]') !== null;
  
  if (hasOgTitle && hasOgDescription) {
    result.metaTagsScore += 25;
  } else {
    result.recommendations.push('Add Open Graph meta tags');
  }
  
  // Check Twitter Card tags
  const hasTwitterCard = document.querySelector('meta[name="twitter:card"]') !== null;
  
  if (hasTwitterCard) {
    result.metaTagsScore += 25;
  } else {
    result.recommendations.push('Add Twitter Card meta tags');
  }
  
  // Calculate content score
  const h1Elements = document.querySelectorAll('h1');
  const paragraphs = document.querySelectorAll('p');
  const images = document.querySelectorAll('img');
  
  if (h1Elements.length === 1) {
    result.contentScore += 25;
  } else {
    result.recommendations.push('Use exactly one H1 heading');
  }
  
  if (paragraphs.length >= 3) {
    result.contentScore += 25;
  } else {
    result.recommendations.push('Add more text content (at least 3 paragraphs)');
  }
  
  let allImagesHaveAlt = true;
  images.forEach(img => {
    if (!img.hasAttribute('alt')) {
      allImagesHaveAlt = false;
    }
  });
  
  if (allImagesHaveAlt && images.length > 0) {
    result.contentScore += 25;
  } else {
    result.recommendations.push('Add alt text to all images');
  }
  
  // Check keyword usage
  // Simplified check, would need target keywords in a real implementation
  if (document.body.textContent && document.body.textContent.length > 300) {
    result.contentScore += 25;
  } else {
    result.recommendations.push('Add more content (at least 300 characters)');
  }
  
  // Calculate mobile friendliness score
  const viewport = document.querySelector('meta[name="viewport"]');
  const viewportContent = viewport?.getAttribute('content') || '';
  
  if (viewportContent.includes('width=device-width') && 
      viewportContent.includes('initial-scale=1')) {
    result.mobileFriendlinessScore += 50;
  } else {
    result.recommendations.push('Configure viewport meta tag properly');
  }
  
  // Simplified tap target check
  const tappableElements = document.querySelectorAll('a, button, input, select, textarea');
  let smallTapTargets = 0;
  
  tappableElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.height < 48 || rect.width < 48) {
      smallTapTargets++;
    }
  });
  
  if (smallTapTargets === 0 && tappableElements.length > 0) {
    result.mobileFriendlinessScore += 50;
  } else {
    result.recommendations.push('Ensure tap targets are at least 48px in size');
  }
  
  // Calculate performance score (simplified)
  const renderBlockingStyles = document.querySelectorAll('link[rel="stylesheet"]:not([media="print"])');
  const renderBlockingScripts = document.querySelectorAll('script:not([async]):not([defer])');
  
  const totalBlockingResources = renderBlockingStyles.length + renderBlockingScripts.length;
  
  if (totalBlockingResources <= 3) {
    result.performanceScore += 50;
  } else {
    result.recommendations.push('Reduce render-blocking resources');
  }
  
  // Check for lazy loading
  let imagesWithLazyLoading = 0;
  images.forEach(img => {
    if (img.getAttribute('loading') === 'lazy') {
      imagesWithLazyLoading++;
    }
  });
  
  if (imagesWithLazyLoading > 0 || images.length <= 3) {
    result.performanceScore += 50;
  } else {
    result.recommendations.push('Use lazy loading for images');
  }
  
  // Calculate overall score
  result.overallScore = Math.round(
    (result.metaTagsScore + result.contentScore + 
     result.mobileFriendlinessScore + result.performanceScore) / 4
  );
  
  // Log notification to console
  console.log(`SEO Score: ${result.overallScore}%`, `${result.recommendations.length} recommendations available`);
  
  return result;
}

// Add the missing analyzeResumeContent function
export async function analyzeResumeContent(content: string): Promise<ResumeAnalysisResult> {
  console.log("Analyzing resume content...");
  
  // Default result
  const result: ResumeAnalysisResult = {
    isATSFriendly: false,
    score: 0,
    recommendations: []
  };
  
  try {
    // Basic content analysis for demonstration purposes
    // In a real application, this would use NLP or other advanced techniques
    
    // Check content length
    if (content.length < 300) {
      result.recommendations.push("Resume content is too short. Add more details about your experience.");
    }
    
    // Check for skills section
    if (!content.toLowerCase().includes("skills") && !content.toLowerCase().includes("expertise")) {
      result.recommendations.push("Add a dedicated skills or expertise section to highlight your capabilities.");
    }
    
    // Check for experience section
    if (!content.toLowerCase().includes("experience") && !content.toLowerCase().includes("work history")) {
      result.recommendations.push("Add a clear work experience or employment history section.");
    }
    
    // Check for education section
    if (!content.toLowerCase().includes("education") && !content.toLowerCase().includes("degree")) {
      result.recommendations.push("Include an education section with your qualifications.");
    }
    
    // Check for contact information
    if (!content.toLowerCase().includes("email") && !content.toLowerCase().includes("phone")) {
      result.recommendations.push("Add complete contact information including email and phone number.");
    }
    
    // Check for overly complex language
    const sentences = content.split(/[.!?]+/);
    const longSentences = sentences.filter(s => s.trim().split(" ").length > 25);
    if (longSentences.length > 2) {
      result.recommendations.push("Simplify your language. Some sentences are too long and complex.");
    }
    
    // Check for action verbs
    const actionVerbs = ["managed", "led", "created", "developed", "implemented", "achieved", "increased", "decreased", "improved", "designed", "built"];
    let actionVerbCount = 0;
    
    actionVerbs.forEach(verb => {
      if (content.toLowerCase().includes(verb)) {
        actionVerbCount++;
      }
    });
    
    if (actionVerbCount < 3) {
      result.recommendations.push("Use more action verbs to describe your achievements and responsibilities.");
    }
    
    // Calculate ATS friendliness score based on recommendations
    // Fewer recommendations = higher score
    const maxScore = 100;
    const deductionPerRecommendation = 15;
    result.score = Math.max(0, maxScore - (result.recommendations.length * deductionPerRecommendation));
    
    // Determine if ATS friendly (score above 70)
    result.isATSFriendly = result.score >= 70;
    
    return result;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    result.recommendations.push("An error occurred during resume analysis. Please try again.");
    return result;
  }
}
