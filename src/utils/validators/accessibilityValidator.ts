
/**
 * Test accessibility features
 */
export const testAccessibility = async (): Promise<void> => {
  // Check for alt text on images
  const images = document.querySelectorAll('img');
  let missingAltCount = 0;
  
  images.forEach(img => {
    if (!img.alt) {
      missingAltCount++;
    }
  });
  
  if (missingAltCount > 0) {
    console.warn(`${missingAltCount} images missing alt text`);
  }
  
  // Check for ARIA attributes
  const ariaElements = document.querySelectorAll('[aria-*]');
  console.log(`Found ${ariaElements.length} elements with ARIA attributes`);
  
  // Check heading hierarchy
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const headingLevels = headings.map(h => parseInt(h.tagName.substring(1)));
  
  // Check if we have an h1
  if (!headingLevels.includes(1)) {
    console.warn("No h1 heading found on the page");
  }
  
  // Check if heading levels are sequential
  let previousLevel = 0;
  let nonSequentialHeadings = 0;
  
  headingLevels.forEach(level => {
    if (level > previousLevel + 1 && previousLevel !== 0) {
      nonSequentialHeadings++;
    }
    previousLevel = level;
  });
  
  if (nonSequentialHeadings > 0) {
    console.warn(`${nonSequentialHeadings} instances of non-sequential heading levels`);
  }
};
