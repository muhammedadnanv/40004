import { supabase } from "@/integrations/supabase/client";

interface SEOOptimizerOptions {
  generateKeywords?: boolean;
  generateBlogPost?: boolean;
  blogTopic?: string;
  blogCategory?: string;
  wordCount?: number;
  optimizeMetaTags?: boolean;
  optimizeHeadings?: boolean;
  checkTechnicalSEO?: boolean;
}

interface KeywordData {
  keyword: string;
  searchVolume?: number;
  difficulty?: number;
  intentScore?: number;
  category?: string;
}

/**
 * Enhanced utility for SEO optimization operations with focus on high-intent keywords
 */
export const seoOptimizer = {
  /**
   * Generate SEO keywords for the specified categories with intent scoring
   * @param quantity Number of keywords to generate
   * @param minIntentScore Minimum intent score (0-1) for filtering high-intent keywords
   * @returns Promise resolving to the operation result
   */
  async generateKeywords(quantity: number = 2500, minIntentScore: number = 0.7): Promise<{ success: boolean; message: string; sample?: any[] }> {
    try {
      const { data, error } = await supabase.functions.invoke('generate-seo-keywords', {
        body: { 
          quantity, 
          minIntentScore, 
          includeIntentScoring: true 
        },
      });

      if (error) throw new Error(error.message);
      
      return {
        success: true,
        message: `Successfully generated ${quantity} high-intent SEO keywords`,
        sample: data?.sample,
      };
    } catch (error) {
      console.error('Error generating SEO keywords:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to generate SEO keywords',
      };
    }
  },

  /**
   * Retrieve keywords from the database with enhanced filtering options for high-intent queries
   * @param category Optional category to filter by
   * @param limit Maximum number of keywords to retrieve (default 100)
   * @param minRelevance Minimum relevance score (0-1)
   * @param minIntentScore Minimum intent score (0-1) for high-intent keywords
   * @returns Promise resolving to the retrieved keywords
   */
  async getKeywords(category?: string, limit: number = 100, minRelevance: number = 0.5, minIntentScore: number = 0.7): Promise<{
    success: boolean;
    keywords?: KeywordData[];
    message: string;
  }> {
    try {
      let query = supabase
        .from('seo_keywords')
        .select('*')
        .order('intent_score', { ascending: false })
        .limit(limit);
      
      if (category) {
        query = query.eq('category', category);
      }
      
      if (minRelevance > 0) {
        query = query.gte('relevance_score', minRelevance);
      }
      
      if (minIntentScore > 0) {
        query = query.gte('intent_score', minIntentScore);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return {
        success: true,
        keywords: data,
        message: `Retrieved ${data.length} high-intent keywords${category ? ` in category ${category}` : ''}`
      };
    } catch (error) {
      console.error('Error retrieving keywords:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to retrieve keywords'
      };
    }
  },

  /**
   * Generate an SEO-optimized blog post with high-intent keywords
   * @param topic Blog post topic
   * @param category Blog category
   * @param wordCount Approximate word count
   * @param keywords Array of high-intent keywords to include
   * @returns Promise resolving to the operation result with the created post
   */
  async generateBlogPost(topic: string, category: string, wordCount: number = 1200, keywords?: string[]): Promise<{ 
    success: boolean; 
    message: string;
    post?: any;
  }> {
    try {
      if (!topic) throw new Error('Blog topic is required');
      if (!category) throw new Error('Blog category is required');
      
      const { data, error } = await supabase.functions.invoke('generate-blog-post', {
        body: { 
          topic,
          category,
          wordCount,
          keywords
        },
      });

      if (error) throw new Error(error.message);
      
      return {
        success: true,
        message: 'SEO-optimized blog post generated successfully',
        post: data?.post,
      };
    } catch (error) {
      console.error('Error generating blog post:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to generate blog post',
      };
    }
  },

  /**
   * Optimize meta tags for a given page to improve SEO
   * @param pageUrl URL of the page to optimize
   * @param keywords High-intent keywords to include
   * @returns Promise resolving to the operation result
   */
  async optimizeMetaTags(pageUrl: string, keywords: string[]): Promise<{
    success: boolean;
    message: string;
    suggestions?: {
      title?: string;
      description?: string;
      ogTitle?: string;
      ogDescription?: string;
    };
  }> {
    try {
      if (!pageUrl) throw new Error('Page URL is required');
      if (!keywords || !keywords.length) throw new Error('Keywords are required');
      
      // Get current meta tags from the page (simplified for example)
      const currentTitle = document.title;
      const currentDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      
      // In a real scenario, you would make API call to generate optimized meta tags
      // For this example, we'll just append high-intent keywords
      const suggestions = {
        title: `${currentTitle} | ${keywords[0]}`,
        description: `${currentDescription} Learn about ${keywords.slice(0, 3).join(', ')} and more.`,
        ogTitle: `${currentTitle} | Expert ${keywords[0]} Resources`,
        ogDescription: `Discover professional ${keywords.slice(0, 2).join(' and ')} guidance and certification.`,
      };
      
      return {
        success: true,
        message: 'Meta tag optimization suggestions generated',
        suggestions,
      };
    } catch (error) {
      console.error('Error optimizing meta tags:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to optimize meta tags',
      };
    }
  },

  /**
   * Check and recommend improvements for headings structure and internal linking
   * @param contentSelector CSS selector for the content area to analyze
   * @returns Results of the heading and link analysis
   */
  analyzeContentStructure(contentSelector: string = 'main'): {
    success: boolean;
    message: string;
    headingStructure?: {
      h1Count: number;
      h2Count: number;
      h3Count: number;
      hasProperHierarchy: boolean;
    };
    internalLinks?: {
      count: number;
      missingText: number;
      suggestions: string[];
    };
  } {
    try {
      const contentElement = document.querySelector(contentSelector);
      
      if (!contentElement) {
        return {
          success: false,
          message: `Content element not found with selector: ${contentSelector}`,
        };
      }
      
      // Analyze headings
      const h1Elements = contentElement.querySelectorAll('h1');
      const h2Elements = contentElement.querySelectorAll('h2');
      const h3Elements = contentElement.querySelectorAll('h3');
      
      const hasProperHierarchy = h1Elements.length === 1 && h2Elements.length > 0;
      
      // Analyze internal links
      const internalLinks = contentElement.querySelectorAll('a[href^="/"], a[href^="."], a[href^="#"]');
      
      const missingTextLinks = Array.from(internalLinks).filter(link => !link.textContent?.trim());
      
      const suggestions: string[] = [];
      
      if (h1Elements.length !== 1) {
        suggestions.push('Each page should have exactly one H1 heading for proper SEO structure');
      }
      
      if (h2Elements.length === 0) {
        suggestions.push('Add H2 headings to create a proper content hierarchy');
      }
      
      if (missingTextLinks.length > 0) {
        suggestions.push('Some internal links are missing descriptive anchor text');
      }
      
      return {
        success: true,
        message: 'Content structure analysis completed',
        headingStructure: {
          h1Count: h1Elements.length,
          h2Count: h2Elements.length,
          h3Count: h3Elements.length,
          hasProperHierarchy,
        },
        internalLinks: {
          count: internalLinks.length,
          missingText: missingTextLinks.length,
          suggestions,
        },
      };
    } catch (error) {
      console.error('Error analyzing content structure:', error);
      return {
        success: false,
        message: 'Failed to analyze content structure',
      };
    }
  },

  /**
   * Implement schema markup for improved search visibility
   * @param type Schema type (e.g., 'Organization', 'Course', 'FAQ')
   * @param data Schema data
   * @returns Promise resolving to the operation result
   */
  async implementSchemaMarkup(type: string, data: Record<string, any>): Promise<{
    success: boolean;
    message: string;
    schema?: string;
  }> {
    try {
      if (!type) throw new Error('Schema type is required');
      if (!data) throw new Error('Schema data is required');
      
      // Create basic schema structure
      const schema = {
        '@context': 'https://schema.org',
        '@type': type,
        ...data,
      };
      
      // Convert to JSON string
      const schemaString = JSON.stringify(schema, null, 2);
      
      return {
        success: true,
        message: `${type} schema markup generated successfully`,
        schema: schemaString,
      };
    } catch (error) {
      console.error('Error implementing schema markup:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to implement schema markup',
      };
    }
  },

  /**
   * Check technical SEO aspects of the website
   * @returns Technical SEO analysis results
   */
  checkTechnicalSEO(): {
    success: boolean;
    message: string;
    results: {
      mobileResponsive: boolean;
      httpsEnabled: boolean;
      brokenLinks: { url: string; element: string }[];
      pageSpeed: { score: number; suggestions: string[] };
    };
  } {
    try {
      // Check if page is mobile responsive
      const isMobileResponsive = window.matchMedia('(max-width: 768px)').matches || 
                               document.querySelector('meta[name="viewport"]')?.getAttribute('content')?.includes('width=device-width');
      
      // Check if HTTPS is enabled
      const isHttpsEnabled = window.location.protocol === 'https:';
      
      // Find potentially broken links
      const allLinks = document.querySelectorAll('a');
      const brokenLinks: { url: string; element: string }[] = [];
      
      allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === '#' || href === 'javascript:void(0)') {
          brokenLinks.push({
            url: href || 'empty',
            element: link.outerHTML,
          });
        }
      });
      
      // Simple page speed check (in a real scenario, you would use performance metrics)
      const pageLoadTime = window.performance ? 
        window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart : 
        null;
      
      const pageSpeedScore = pageLoadTime ? Math.max(0, 100 - (pageLoadTime / 100)) : 50;
      const pageSpeedSuggestions: string[] = [];
      
      if (pageSpeedScore < 70) {
        pageSpeedSuggestions.push('Optimize images and use lazy loading');
        pageSpeedSuggestions.push('Minimize render-blocking resources');
      }
      
      if (!isMobileResponsive) {
        pageSpeedSuggestions.push('Improve mobile responsiveness');
      }
      
      return {
        success: true,
        message: 'Technical SEO check completed',
        results: {
          mobileResponsive: !!isMobileResponsive,
          httpsEnabled: isHttpsEnabled,
          brokenLinks,
          pageSpeed: {
            score: pageSpeedScore,
            suggestions: pageSpeedSuggestions,
          },
        },
      };
    } catch (error) {
      console.error('Error checking technical SEO:', error);
      return {
        success: false,
        message: 'Failed to check technical SEO',
        results: {
          mobileResponsive: false,
          httpsEnabled: false,
          brokenLinks: [],
          pageSpeed: { score: 0, suggestions: ['Error performing page speed analysis'] },
        },
      };
    }
  },

  /**
   * Run a comprehensive SEO optimization process
   * @param options Configuration options
   * @returns Promise resolving when all operations complete
   */
  async runOptimizations(options: SEOOptimizerOptions = {}): Promise<void> {
    const tasks: Promise<any>[] = [];
    const results: { operation: string; success: boolean; message: string }[] = [];

    // Generate high-intent keywords if requested
    if (options.generateKeywords) {
      tasks.push(
        this.generateKeywords(2500, 0.7).then(result => {
          results.push({
            operation: 'Generate High-Intent SEO Keywords',
            success: result.success,
            message: result.message
          });
        })
      );
    }

    // Generate blog post if requested
    if (options.generateBlogPost && options.blogTopic && options.blogCategory) {
      // First get some high-intent keywords for the blog post
      const keywordsResult = await this.getKeywords(options.blogCategory, 10, 0.7, 0.8);
      const highIntentKeywords = keywordsResult.success && keywordsResult.keywords 
        ? keywordsResult.keywords.map(k => k.keyword)
        : [];
        
      tasks.push(
        this.generateBlogPost(
          options.blogTopic, 
          options.blogCategory, 
          options.wordCount,
          highIntentKeywords
        ).then(result => {
          results.push({
            operation: 'Generate SEO-Optimized Blog Post',
            success: result.success,
            message: result.message
          });
        })
      );
    }

    // Optimize meta tags if requested
    if (options.optimizeMetaTags) {
      // Get high-intent keywords for meta tag optimization
      const keywordsResult = await this.getKeywords('general', 5, 0.8, 0.9);
      const highIntentKeywords = keywordsResult.success && keywordsResult.keywords 
        ? keywordsResult.keywords.map(k => k.keyword)
        : ['developer certification', 'mentorship', 'professional skills'];
        
      tasks.push(
        this.optimizeMetaTags(window.location.href, highIntentKeywords).then(result => {
          results.push({
            operation: 'Meta Tags Optimization',
            success: result.success,
            message: result.message
          });
        })
      );
    }

    // Analyze headings and internal linking if requested
    if (options.optimizeHeadings) {
      const structureResult = this.analyzeContentStructure('main');
      results.push({
        operation: 'Content Structure Analysis',
        success: structureResult.success,
        message: structureResult.message
      });
    }

    // Check technical SEO if requested
    if (options.checkTechnicalSEO) {
      const technicalResult = this.checkTechnicalSEO();
      results.push({
        operation: 'Technical SEO Check',
        success: technicalResult.success,
        message: technicalResult.message
      });
    }

    // Wait for all tasks to complete
    await Promise.all(tasks);

    console.log("SEO optimization tasks completed:", results);
  }
};
