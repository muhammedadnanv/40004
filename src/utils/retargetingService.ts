
/**
 * Utility for visitor retargeting and on-page SEO optimization
 */

import { toast } from "@/hooks/use-toast";

interface RetargetingOptions {
  trackPageViews?: boolean;
  trackProductViews?: boolean;
  trackSearchQueries?: boolean;
  storeUserSegments?: boolean;
}

interface UserSegment {
  id: string;
  name: string;
  criteria: string;
  lastActive: Date;
}

interface RetargetingEvent {
  eventType: 'pageview' | 'productview' | 'search' | 'action';
  path: string;
  timestamp: number;
  data?: Record<string, any>;
}

// Store visitor activity for retargeting
const visitorEvents: RetargetingEvent[] = [];
const userSegments: UserSegment[] = [];

/**
 * Track visitor events for retargeting purposes
 */
export const trackVisitorEvent = (
  eventType: 'pageview' | 'productview' | 'search' | 'action',
  data?: Record<string, any>
): void => {
  try {
    const event: RetargetingEvent = {
      eventType,
      path: window.location.pathname,
      timestamp: Date.now(),
      data
    };
    
    visitorEvents.push(event);
    
    // Store in localStorage for persistence
    const storedEvents = JSON.parse(localStorage.getItem('visitor_events') || '[]');
    storedEvents.push(event);
    localStorage.setItem('visitor_events', JSON.stringify(storedEvents.slice(-100))); // Keep last 100 events
    
    // Sync with analytics service if available
    if (window.gtag) {
      window.gtag('event', eventType, {
        event_category: 'retargeting',
        event_label: data?.label || window.location.pathname,
        value: data?.value
      });
    }
    
    console.log(`Tracked ${eventType} event for retargeting:`, event);
  } catch (error) {
    console.error('Error tracking visitor event:', error);
  }
};

/**
 * Segment users based on their browsing behavior
 */
export const segmentVisitors = (): UserSegment[] => {
  try {
    const storedEvents = JSON.parse(localStorage.getItem('visitor_events') || '[]');
    
    // Clear existing segments
    userSegments.length = 0;
    
    // Define segments based on visitor behavior
    
    // Segment 1: Visitors who viewed multiple program pages
    const programPageViews = storedEvents.filter(
      (event: RetargetingEvent) => 
        event.eventType === 'pageview' && 
        event.path.includes('/programs/')
    );
    
    if (programPageViews.length >= 2) {
      userSegments.push({
        id: 'program-researcher',
        name: 'Program Researcher',
        criteria: 'Viewed multiple program pages',
        lastActive: new Date()
      });
    }
    
    // Segment 2: Visitors who viewed certification information
    const certificationViews = storedEvents.filter(
      (event: RetargetingEvent) => 
        (event.eventType === 'pageview' && event.path.includes('/certification')) ||
        (event.data && event.data.category === 'certification')
    );
    
    if (certificationViews.length > 0) {
      userSegments.push({
        id: 'certification-seeker',
        name: 'Certification Seeker',
        criteria: 'Viewed certification information',
        lastActive: new Date()
      });
    }
    
    // Segment 3: High intent visitors who viewed multiple high-value pages
    const highValuePageViews = storedEvents.filter(
      (event: RetargetingEvent) => 
        event.eventType === 'pageview' && 
        (event.path.includes('/enroll') || 
         event.path.includes('/pricing') || 
         event.path.includes('/mentors'))
    );
    
    if (highValuePageViews.length >= 2) {
      userSegments.push({
        id: 'high-intent-visitor',
        name: 'High Intent Visitor',
        criteria: 'Viewed multiple high-value pages',
        lastActive: new Date()
      });
    }
    
    // Store segments for future use
    localStorage.setItem('user_segments', JSON.stringify(userSegments));
    
    return userSegments;
  } catch (error) {
    console.error('Error segmenting visitors:', error);
    return [];
  }
};

/**
 * Get personalized content recommendations based on visitor segments
 */
export const getPersonalizedRecommendations = (): {
  programs: string[];
  content: string[];
  cta: string;
} => {
  try {
    const segments = JSON.parse(localStorage.getItem('user_segments') || '[]');
    
    // Default recommendations
    const recommendations = {
      programs: ['Frontend Development', 'Full Stack Development'],
      content: ['How to Choose the Right Mentor', 'Certification Benefits'],
      cta: 'Explore Programs'
    };
    
    // Personalize based on segments
    if (segments.some((s: UserSegment) => s.id === 'program-researcher')) {
      recommendations.programs = ['Frontend Development', 'Low-Code Development', 'Full Stack Development'];
      recommendations.content = ['Program Comparison Guide', 'Student Success Stories'];
      recommendations.cta = 'Compare Programs';
    }
    
    if (segments.some((s: UserSegment) => s.id === 'certification-seeker')) {
      recommendations.programs = ['Full Stack Development', 'UX/UI Development'];
      recommendations.content = ['Certification Value Guide', 'Industry Recognition'];
      recommendations.cta = 'Get Certified';
    }
    
    if (segments.some((s: UserSegment) => s.id === 'high-intent-visitor')) {
      recommendations.programs = ['Frontend Development', 'Full Stack Development', 'UX/UI Development'];
      recommendations.content = ['ROI of Our Programs', 'Career Advancement Stories'];
      recommendations.cta = 'Enroll Now';
    }
    
    return recommendations;
  } catch (error) {
    console.error('Error getting personalized recommendations:', error);
    return {
      programs: ['Frontend Development', 'Full Stack Development'],
      content: ['How to Choose the Right Program', 'Benefits of Mentorship'],
      cta: 'Explore Programs'
    };
  }
};

/**
 * Create retargeting pixel or script for external ad platforms
 */
export const createRetargetingPixel = (platform: 'facebook' | 'google' | 'linkedin'): boolean => {
  try {
    switch (platform) {
      case 'facebook':
        // Simulate Facebook Pixel implementation
        console.log('Implementing Facebook Pixel for retargeting');
        break;
      case 'google':
        // Simulate Google Ads Remarketing implementation
        console.log('Implementing Google Ads Remarketing tag');
        break;
      case 'linkedin':
        // Simulate LinkedIn Insight Tag implementation
        console.log('Implementing LinkedIn Insight Tag');
        break;
      default:
        return false;
    }
    
    toast({
      title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Retargeting Enabled`,
      description: "Visitor tracking implemented for personalized ad experiences",
      duration: 3000,
    });
    
    return true;
  } catch (error) {
    console.error(`Error implementing ${platform} retargeting:`, error);
    return false;
  }
};

/**
 * Initialize retargeting service
 */
export const initRetargetingService = (options: RetargetingOptions = {}): void => {
  try {
    console.log('Initializing retargeting service with options:', options);
    
    // Set up page view tracking for retargeting
    if (options.trackPageViews !== false) {
      trackVisitorEvent('pageview');
      
      // Track navigation events
      window.addEventListener('popstate', () => {
        trackVisitorEvent('pageview');
      });
    }
    
    // Run initial segmentation
    const segments = segmentVisitors();
    console.log('Initial visitor segments:', segments);
    
    // Set up regular segmentation updates
    setInterval(() => {
      segmentVisitors();
    }, 10 * 60 * 1000); // Run every 10 minutes
    
    toast({
      title: "Retargeting Service Initialized",
      description: "Visitor tracking enabled for personalized experiences",
      duration: 3000,
    });
  } catch (error) {
    console.error('Error initializing retargeting service:', error);
  }
};
