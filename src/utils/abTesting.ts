
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Types for A/B testing
interface ABTestVariant {
  id: string;
  name: string;
  weight: number; // 0-100 percentage
}

interface ABTest {
  id: string;
  name: string;
  description: string;
  active: boolean;
  variants: ABTestVariant[];
  startDate: Date;
  endDate?: Date;
}

// Local storage key for storing user's test assignments
const AB_TEST_ASSIGNMENTS_KEY = 'ab_test_assignments';

// In-memory storage for active tests
const activeTests: ABTest[] = [];

/**
 * Initialize A/B testing system
 */
export const initABTesting = async () => {
  try {
    // We'll use local mock data for now, but this could fetch from Supabase in the future
    const mockTests: ABTest[] = [
      {
        id: 'hero-cta-test',
        name: 'Hero CTA Button',
        description: 'Testing different CTA button texts and colors',
        active: true,
        variants: [
          { id: 'control', name: 'Original', weight: 50 },
          { id: 'variant-1', name: 'Start Learning Now', weight: 25 },
          { id: 'variant-2', name: 'Get Expert Guidance', weight: 25 }
        ],
        startDate: new Date(),
      },
      {
        id: 'mentor-profile-test',
        name: 'Mentor Profile Layout',
        description: 'Testing different mentor profile layouts',
        active: true,
        variants: [
          { id: 'control', name: 'Original Grid', weight: 50 },
          { id: 'variant-1', name: 'Card Layout', weight: 50 }
        ],
        startDate: new Date(),
      }
    ];
    
    // Store the mock tests in the active tests array
    activeTests.push(...mockTests);
    
    console.log('A/B testing initialized with mock tests');
  } catch (error) {
    console.error('Failed to initialize A/B testing:', error);
  }
};

/**
 * Get the assigned variant for a specific test
 * @param testId The ID of the test
 * @returns The assigned variant ID or null if not assigned
 */
export const getTestVariant = (testId: string): string | null => {
  try {
    // Get stored assignments from local storage
    const storedAssignments = localStorage.getItem(AB_TEST_ASSIGNMENTS_KEY);
    const assignments = storedAssignments ? JSON.parse(storedAssignments) : {};
    
    // If user is already assigned to this test, return the assigned variant
    if (assignments[testId]) {
      return assignments[testId];
    }
    
    // Find the test
    const test = activeTests.find(t => t.id === testId && t.active);
    if (!test) return null;
    
    // Assign user to a variant based on weights
    const randomValue = Math.random() * 100;
    let cumulativeWeight = 0;
    
    for (const variant of test.variants) {
      cumulativeWeight += variant.weight;
      if (randomValue <= cumulativeWeight) {
        // Store the assignment
        assignments[testId] = variant.id;
        localStorage.setItem(AB_TEST_ASSIGNMENTS_KEY, JSON.stringify(assignments));
        
        // Return the assigned variant
        return variant.id;
      }
    }
    
    // Default to the first variant if no match (shouldn't happen with proper weights)
    const defaultVariant = test.variants[0]?.id || null;
    if (defaultVariant) {
      assignments[testId] = defaultVariant;
      localStorage.setItem(AB_TEST_ASSIGNMENTS_KEY, JSON.stringify(assignments));
    }
    
    return defaultVariant;
  } catch (error) {
    console.error(`Error getting test variant for ${testId}:`, error);
    return null;
  }
};

/**
 * Track a conversion event for an A/B test
 * @param testId The ID of the test
 * @param eventName The name of the conversion event
 * @param additionalData Any additional data to track
 */
export const trackConversion = async (
  testId: string, 
  eventName: string, 
  additionalData: Record<string, any> = {}
) => {
  try {
    // Get the user's assigned variant
    const storedAssignments = localStorage.getItem(AB_TEST_ASSIGNMENTS_KEY);
    const assignments = storedAssignments ? JSON.parse(storedAssignments) : {};
    const variantId = assignments[testId];
    
    if (!variantId) {
      console.warn(`No variant assigned for test ${testId}`);
      return;
    }
    
    // In a real implementation, we would send this to analytics or database
    console.log('A/B Test Conversion:', {
      testId,
      variantId,
      eventName,
      timestamp: new Date().toISOString(),
      ...additionalData
    });
    
    // Mock implementation: Consider using Supabase for real tracking
    // await supabase.from('ab_test_conversions').insert({
    //   test_id: testId,
    //   variant_id: variantId,
    //   event_name: eventName,
    //   additional_data: additionalData
    // });
  } catch (error) {
    console.error(`Error tracking conversion for ${testId}:`, error);
  }
};

/**
 * Apply an A/B test variant to a component
 * @param testId The ID of the test
 * @param controlComponent The control variant component
 * @param variants Object mapping variant IDs to their components
 * @returns The component to render based on the assigned variant
 */
export const applyABTest = <T>(
  testId: string,
  controlComponent: T,
  variants: Record<string, T>
): T => {
  try {
    const variantId = getTestVariant(testId);
    
    // If no variant is assigned or the variant isn't in our variants map, return the control
    if (!variantId || !variants[variantId]) {
      return controlComponent;
    }
    
    // Return the component for the assigned variant
    return variants[variantId];
  } catch (error) {
    console.error(`Error applying A/B test ${testId}:`, error);
    return controlComponent;
  }
};

/**
 * Automatically roll out the winning variant of a test
 * @param testId The ID of the test
 * @param winningVariantId The ID of the winning variant
 */
export const rolloutWinningVariant = async (testId: string, winningVariantId: string) => {
  try {
    console.log(`Rolling out winning variant ${winningVariantId} for test ${testId}`);
    
    // Mark the test as inactive
    const testIndex = activeTests.findIndex(t => t.id === testId);
    if (testIndex !== -1) {
      activeTests[testIndex].active = false;
      activeTests[testIndex].endDate = new Date();
    }
    
    // In a real implementation, we would update the database
    // await supabase.from('ab_tests').update({
    //   active: false,
    //   end_date: new Date().toISOString(),
    //   winning_variant_id: winningVariantId
    // }).eq('id', testId);
    
    toast({
      title: "Test Complete",
      description: `The winning variant has been rolled out to all users.`,
      duration: 5000,
    });
  } catch (error) {
    console.error(`Error rolling out winning variant for ${testId}:`, error);
  }
};
