
import { testDOMStructure } from './domValidator';
import { testResponsiveDesign } from './responsiveValidator';
import { testAccessibility } from './accessibilityValidator';
import { testSEOElements } from './seoValidator';
import { testPerformanceMetrics } from './performanceValidator';

/**
 * Run website validation tests to ensure the platform is functioning correctly
 */
export const runWebsiteTest = async (): Promise<void> => {
  console.log("Running website validation tests...");
  
  try {
    // Test DOM structure
    testDOMStructure();
    
    // Test responsive design
    testResponsiveDesign();
    
    // Test accessibility
    await testAccessibility();
    
    // Test SEO elements
    testSEOElements();
    
    // Test performance metrics
    await testPerformanceMetrics();
    
    console.log("Website validation completed successfully");
  } catch (error) {
    console.error("Website validation failed:", error);
    throw error;
  }
};

// Re-export the runSEOOptimizations from seoValidator
export { runSEOOptimizations } from './seoValidator';
