
/**
 * Test responsive design elements
 */
export const testResponsiveDesign = (): void => {
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (!viewportMeta) {
    console.warn("Viewport meta tag is missing");
  }
  
  // Test for media queries in stylesheets
  let hasMediaQueries = false;
  const styleSheets = Array.from(document.styleSheets);
  
  try {
    for (const sheet of styleSheets) {
      if (sheet.href && !sheet.href.includes(window.location.origin)) {
        // Skip external stylesheets for CORS reasons
        continue;
      }
      
      const rules = Array.from(sheet.cssRules || []);
      for (const rule of rules) {
        if (rule instanceof CSSMediaRule) {
          hasMediaQueries = true;
          break;
        }
      }
      
      if (hasMediaQueries) break;
    }
  } catch (e) {
    console.warn("Could not access some stylesheets, likely due to CORS restrictions");
  }
  
  if (!hasMediaQueries) {
    console.warn("No media queries detected in stylesheets");
  }
  
  // Test for responsive images
  const images = document.querySelectorAll('img');
  let responsiveImagesCount = 0;
  
  images.forEach(img => {
    if (img.srcset || img.sizes || img.classList.contains('responsive')) {
      responsiveImagesCount++;
    }
  });
  
  console.log(`Found ${responsiveImagesCount} of ${images.length} images with responsive attributes`);
};
