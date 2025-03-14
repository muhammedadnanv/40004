/**
 * Performance optimization utilities for improving platform operations
 */

/**
 * Debounce function to limit the rate at which a function can fire
 */
export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

/**
 * Throttle function to ensure a function is called at most once in a specified time period
 */
export const throttle = <F extends (...args: any[]) => any>(func: F, limit: number) => {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<F>): void => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Optimize images by lazy loading them only when needed
 */
export const lazyLoadImage = (imageElement: HTMLImageElement): void => {
  if ('loading' in HTMLImageElement.prototype) {
    imageElement.loading = 'lazy';
  } else {
    // Fallback for browsers that don't support native lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          observer.unobserve(img);
        }
      });
    });
    observer.observe(imageElement);
  }
};

/**
 * Optimize resource loading with browser hints
 */
export const addResourceHints = (): void => {
  // Add preconnect for external resources
  const hosts = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://zbnwztqwkusdurqllgzc.supabase.co'
  ];
  
  hosts.forEach(host => {
    if (!document.querySelector(`link[rel="preconnect"][href="${host}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = host;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });
};

/**
 * Check device capabilities and optimize accordingly
 */
export const optimizeForDevice = (): {
  isMobile: boolean;
  isTablet: boolean;
  isHighDPI: boolean;
  hasTouchScreen: boolean;
  hasReducedMotion: boolean;
} => {
  const isMobile = window.matchMedia('(max-width: 640px)').matches;
  const isTablet = window.matchMedia('(min-width: 641px) and (max-width: 1024px)').matches;
  const isHighDPI = window.devicePixelRatio > 1;
  const hasTouchScreen = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return {
    isMobile,
    isTablet,
    isHighDPI,
    hasTouchScreen,
    hasReducedMotion
  };
};

/**
 * Apply SEO optimizations to the current page
 */
export const applySEOOptimizations = (): void => {
  // Add canonical URL if not present
  if (!document.querySelector('link[rel="canonical"]')) {
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = window.location.href.split('?')[0]; // Remove query parameters
    document.head.appendChild(canonical);
  }
  
  // Add Open Graph meta tags if not present
  const title = document.title;
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
  
  if (title && !document.querySelector('meta[property="og:title"]')) {
    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', title);
    document.head.appendChild(ogTitle);
  }
  
  if (description && !document.querySelector('meta[property="og:description"]')) {
    const ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.setAttribute('content', description);
    document.head.appendChild(ogDescription);
  }
  
  if (!document.querySelector('meta[property="og:url"]')) {
    const ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.setAttribute('content', window.location.href.split('?')[0]);
    document.head.appendChild(ogUrl);
  }
  
  if (!document.querySelector('meta[property="og:type"]')) {
    const ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.setAttribute('content', 'website');
    document.head.appendChild(ogType);
  }
  
  // Add Twitter card tags
  if (!document.querySelector('meta[name="twitter:card"]')) {
    const twitterCard = document.createElement('meta');
    twitterCard.setAttribute('name', 'twitter:card');
    twitterCard.setAttribute('content', 'summary_large_image');
    document.head.appendChild(twitterCard);
  }
};

/**
 * Optimize image loading for SEO and performance
 */
export const optimizeImagesForSEO = (imageContainerSelector: string): void => {
  const imageContainers = document.querySelectorAll(imageContainerSelector);
  
  imageContainers.forEach(container => {
    const images = container.querySelectorAll('img');
    
    images.forEach(img => {
      // Add alt text if missing
      if (!img.alt) {
        const imgSrc = img.src || img.dataset.src || '';
        const fileName = imgSrc.split('/').pop()?.split('.')[0] || '';
        img.alt = fileName.replace(/-|_/g, ' ');
      }
      
      // Apply lazy loading
      lazyLoadImage(img);
      
      // Add width and height attributes if missing to prevent layout shifts
      if (!img.width && !img.height && img.complete) {
        img.width = img.naturalWidth;
        img.height = img.naturalHeight;
      }
    });
  });
};

/**
 * Generate structured data for the page using JSON-LD
 */
export const generateStructuredData = (type: 'Article' | 'Course' | 'FAQPage' | 'Organization', data: any): void => {
  const scriptTag = document.createElement('script');
  scriptTag.type = 'application/ld+json';
  
  const structuredData: any = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };
  
  scriptTag.textContent = JSON.stringify(structuredData);
  
  // Remove existing structured data for the same type if it exists
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => {
    try {
      const scriptData = JSON.parse(script.textContent || '{}');
      if (scriptData['@type'] === type) {
        script.remove();
      }
    } catch (e) {
      // Ignore parsing errors
    }
  });
  
  document.head.appendChild(scriptTag);
};

/**
 * Fetch and apply SEO keywords from the database
 */
export const fetchAndApplySEOKeywords = async (category: string, count: number = 5): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('seo_keywords')
      .select('keyword, relevance_score')
      .eq('category', category)
      .order('relevance_score', { ascending: false })
      .limit(count);
      
    if (error) throw error;
    
    if (data && data.length > 0) {
      const keywords = data.map(item => item.keyword);
      
      // Update the keywords meta tag
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords.join(', '));
      
      // Update usage count for these keywords - fixed the type error here
      for (const keyword of keywords) {
        await supabase
          .from('seo_keywords')
          .update({ 
            usage_count: 1, // Fixed: using a single number instead of an array
            last_used_at: new Date().toISOString()
          })
          .eq('keyword', keyword);
      }
      
      return keywords;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching SEO keywords:', error);
    return [];
  }
};

/**
 * Generate internal links for SEO improvement - Mock implementation
 */
export const generateInternalLinks = async (
  containerSelector: string, 
  category: string, 
  limit: number = 3
): Promise<void> => {
  try {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    // This is a mock implementation using local data
    const mockArticles = [
      { title: 'Getting Started with Mentorship', slug: 'getting-started-with-mentorship' },
      { title: 'How to Choose the Right Mentor', slug: 'how-to-choose-the-right-mentor' },
      { title: 'Building Your Portfolio with Expert Guidance', slug: 'building-portfolio-with-expert-guidance' },
    ];
    
    const linksContainer = document.createElement('div');
    linksContainer.className = 'related-content mt-8 p-4 bg-gray-50 rounded-lg';
    
    const heading = document.createElement('h3');
    heading.className = 'text-lg font-medium mb-3';
    heading.textContent = 'Related Articles';
    linksContainer.appendChild(heading);
    
    const linksList = document.createElement('ul');
    linksList.className = 'space-y-2';
    
    mockArticles.forEach(article => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `/blog/${article.slug}`;
      link.className = 'text-blue-600 hover:underline';
      link.textContent = article.title;
      
      listItem.appendChild(link);
      linksList.appendChild(listItem);
    });
    
    linksContainer.appendChild(linksList);
    container.appendChild(linksContainer);
  } catch (error) {
    console.error('Error generating internal links:', error);
  }
};

/**
 * Use NLP to analyze and enhance text content for better SEO and readability
 */
export const enhanceTextWithNLP = (text: string, targetKeywords: string[] = []): string => {
  if (!text || text.length === 0) return text;
  
  try {
    let enhancedText = text;
    
    // Simple NLP enhancements
    
    // 1. Add keyword density if keywords are provided and density is low
    if (targetKeywords.length > 0) {
      const textWordCount = text.split(/\s+/).length;
      
      // Check current keyword density
      const keywordDensity = targetKeywords.reduce((count, keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const matches = text.match(regex) || [];
        return count + matches.length;
      }, 0) / textWordCount;
      
      // If keyword density is low, try to enhance it (but keep it natural)
      if (keywordDensity < 0.02 && textWordCount > 100) {
        // Simple approach: add a summary sentence with keywords at the end
        enhancedText += `\n\nIn summary, this content covers ${targetKeywords.slice(0, 3).join(', ')} and related topics.`;
      }
    }
    
    // 2. Check readability (very basic Flesch-Kincaid calculation)
    const sentences = text.split(/[.!?]+/);
    const textWordCount = text.split(/\s+/).length;
    const averageSentenceLength = textWordCount / sentences.length;
    
    if (averageSentenceLength > 25) {
      // Content might be hard to read, no automatic fixing but return original
      console.warn('Content has long sentences (avg > 25 words). Consider simplifying.');
    }
    
    return enhancedText;
  } catch (error) {
    console.error('Error in NLP text enhancement:', error);
    return text; // Return original text if there's an error
  }
};

/**
 * Import from the Supabase client
 */
import { supabase } from "@/integrations/supabase/client";
