
// This file manages visitor retargeting functionality and user segmentation

// Define window.gtag property
declare global {
  interface Window {
    gtag: any;  // Define gtag as any type to resolve TypeScript error
  }
}

// Configuration interface for the retargeting service
interface RetargetingConfig {
  trackPageViews: boolean;
  trackProductViews: boolean;
  storeUserSegments: boolean;
}

// User segment data structure
interface UserSegment {
  id: string;
  name: string;
  criteria: string;
  priority: number;
}

// Event data object structure
interface EventData {
  label?: string;
  value?: number;
  category?: string;
  action?: string;
}

// Visitor data structure
interface VisitorData {
  id: string;
  firstVisit: Date;
  lastVisit: Date;
  pageViews: number;
  segments: string[];
  interests: string[];
}

// Initialize visitor data
let visitorData: VisitorData = {
  id: generateVisitorId(),
  firstVisit: new Date(),
  lastVisit: new Date(),
  pageViews: 0,
  segments: [],
  interests: []
};

// Generate a unique visitor ID
function generateVisitorId(): string {
  return 'visitor_' + Math.random().toString(36).substring(2, 15);
}

// Initialize the retargeting service
export function initRetargetingService(config: RetargetingConfig): void {
  console.log('Initializing retargeting service with config:', config);
  
  // Set up Google Analytics event tracking if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA-TRACKING-ID', {
      send_page_view: config.trackPageViews
    });
  }
  
  // Set up page view tracking
  if (config.trackPageViews) {
    trackPageView();
  }
  
  // Store local visitor data
  storeVisitorData();
}

// Track a visitor event
export function trackVisitorEvent(eventType: string, data: EventData): void {
  console.log('Tracking visitor event:', eventType, data);
  
  // Update visitor data
  visitorData.lastVisit = new Date();
  visitorData.pageViews++;
  
  // Add interest based on event if available
  if (data.category) {
    if (!visitorData.interests.includes(data.category)) {
      visitorData.interests.push(data.category);
    }
  }
  
  // Track with Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventType, {
      event_category: data.category || 'general',
      event_label: data.label || '',
      value: data.value || 1
    });
  }
  
  // Store updated visitor data
  storeVisitorData();
  
  // Run segmentation
  segmentVisitor();
}

// Track a page view
function trackPageView(): void {
  visitorData.pageViews++;
  visitorData.lastVisit = new Date();
  storeVisitorData();
}

// Store visitor data in localStorage
function storeVisitorData(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('visitorData', JSON.stringify(visitorData));
  }
}

// Segment the visitor based on behavior
function segmentVisitor(): void {
  // Basic segmentation logic
  // New visitors (first visit)
  if (isNewVisitor()) {
    addToSegment('new_visitors');
  }
  
  // Returning visitors
  if (isReturningVisitor()) {
    addToSegment('returning_visitors');
  }
  
  // Engaged visitors (viewed multiple pages)
  if (visitorData.pageViews > 3) {
    addToSegment('engaged_visitors');
  }
  
  // High-intent visitors (visited key pages)
  if (visitorData.interests.includes('program')) {
    addToSegment('high_intent_visitors');
  }
}

// Check if this is a new visitor
function isNewVisitor(): boolean {
  const timeSinceFirstVisit = new Date().getTime() - new Date(visitorData.firstVisit).getTime();
  const hoursSinceFirstVisit = timeSinceFirstVisit / (1000 * 60 * 60);
  return hoursSinceFirstVisit < 24;
}

// Check if this is a returning visitor
function isReturningVisitor(): boolean {
  return visitorData.pageViews > 1;
}

// Add visitor to a segment
function addToSegment(segmentId: string): void {
  if (!visitorData.segments.includes(segmentId)) {
    visitorData.segments.push(segmentId);
    console.log(`Visitor added to segment: ${segmentId}`);
    storeVisitorData();
  }
}

// Get recommendations based on visitor segment
export function getPersonalizedRecommendations(): string[] {
  // Default recommendations
  const defaultRecommendations = [
    'Explore our certifications',
    'Check out our mentorship programs',
    'Browse project ideas'
  ];
  
  // Return personalized recommendations if possible
  if (visitorData.segments.includes('high_intent_visitors')) {
    return [
      'Schedule a consultation with a mentor',
      'Start your certification journey today',
      'Enroll in our premium program'
    ];
  }
  
  if (visitorData.segments.includes('engaged_visitors')) {
    return [
      'Join our developer community',
      'Check out our latest success stories',
      'Sign up for a free session'
    ];
  }
  
  return defaultRecommendations;
}

// Get current visitor data
export function getVisitorData(): VisitorData {
  return visitorData;
}
