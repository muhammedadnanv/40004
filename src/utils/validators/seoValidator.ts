
/**
 * Test SEO elements
 */
export const testSEOElements = (): void => {
  // Check meta tags
  const metaTags = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
    keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content'),
    ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
    ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
    ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
    twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute('content'),
  };
  
  // Check for missing meta tags
  const missingTags = Object.entries(metaTags)
    .filter(([_, value]) => !value)
    .map(([key]) => key);
  
  if (missingTags.length > 0) {
    console.warn(`Missing meta tags: ${missingTags.join(', ')}`);
  }
  
  // Check for canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    console.warn("Canonical link is missing");
  }
  
  // Check for structured data
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
  
  if (structuredData.length === 0) {
    console.warn("No structured data (JSON-LD) found");
  } else {
    console.log(`Found ${structuredData.length} structured data elements`);
  }
  
  // Check for internal links
  const internalLinks = document.querySelectorAll(`a[href^="${window.location.origin}"], a[href^="/"]`);
  console.log(`Found ${internalLinks.length} internal links`);
};

/**
 * Run basic SEO optimizations for the current page
 */
export const runSEOOptimizations = (): void => {
  console.log("Running SEO optimizations...");
  
  // Add canonical URL if missing
  if (!document.querySelector('link[rel="canonical"]')) {
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = window.location.href.split('?')[0]; // Remove query params
    document.head.appendChild(canonicalLink);
    console.log("Added canonical URL");
  }
  
  // Ensure meta description exists
  if (!document.querySelector('meta[name="description"]')) {
    const metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    metaDesc.content = 'Expert mentorship platform for tech professionals. Build real-world projects with personalized guidance.';
    document.head.appendChild(metaDesc);
    console.log("Added meta description");
  }
  
  // Add Open Graph tags if missing
  if (!document.querySelector('meta[property="og:title"]')) {
    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = document.title;
    document.head.appendChild(ogTitle);
    console.log("Added OG title");
  }
  
  console.log("SEO optimizations completed");
};
