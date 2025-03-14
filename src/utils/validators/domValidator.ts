
/**
 * Test basic DOM structure of the website
 */
export const testDOMStructure = (): void => {
  // Check for critical elements
  const header = document.querySelector('header');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  
  if (!header) {
    console.warn("Header element is missing");
  }
  
  if (!main) {
    console.warn("Main content element is missing");
  }
  
  if (!footer) {
    console.warn("Footer element is missing");
  }
  
  // Test navigation
  const navLinks = document.querySelectorAll('nav a');
  if (navLinks.length === 0) {
    console.warn("No navigation links found");
  } else {
    console.log(`Found ${navLinks.length} navigation links`);
  }
};
