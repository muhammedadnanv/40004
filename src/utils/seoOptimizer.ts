
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface SEOOptimizerOptions {
  generateKeywords?: boolean;
  generateBlogPost?: boolean;
  blogTopic?: string;
  blogCategory?: string;
  wordCount?: number;
}

/**
 * Utility for SEO optimization operations
 */
export const seoOptimizer = {
  /**
   * Generate SEO keywords for the specified categories
   * @param quantity Number of keywords to generate
   * @returns Promise resolving to the operation result
   */
  async generateKeywords(quantity: number = 100): Promise<{ success: boolean; message: string }> {
    try {
      const { data, error } = await supabase.functions.invoke('generate-seo-keywords', {
        body: { quantity },
      });

      if (error) throw new Error(error.message);
      
      return {
        success: true,
        message: `Successfully generated ${quantity} SEO keywords`,
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
   * Generate an SEO-optimized blog post
   * @param topic Blog post topic
   * @param category Blog category
   * @param wordCount Approximate word count
   * @returns Promise resolving to the operation result with the created post
   */
  async generateBlogPost(topic: string, category: string, wordCount: number = 1200): Promise<{ 
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
          wordCount
        },
      });

      if (error) throw new Error(error.message);
      
      return {
        success: true,
        message: 'Blog post generated successfully',
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
   * Run a series of SEO optimization tasks
   * @param options Configuration options
   * @returns Promise resolving when all operations complete
   */
  async runOptimizations(options: SEOOptimizerOptions = {}): Promise<void> {
    const tasks: Promise<any>[] = [];
    const results: { operation: string; success: boolean; message: string }[] = [];

    // Generate keywords if requested
    if (options.generateKeywords) {
      tasks.push(
        this.generateKeywords(100).then(result => {
          results.push({
            operation: 'Generate SEO Keywords',
            success: result.success,
            message: result.message
          });
        })
      );
    }

    // Generate blog post if requested
    if (options.generateBlogPost && options.blogTopic && options.blogCategory) {
      tasks.push(
        this.generateBlogPost(
          options.blogTopic, 
          options.blogCategory, 
          options.wordCount
        ).then(result => {
          results.push({
            operation: 'Generate Blog Post',
            success: result.success,
            message: result.message
          });
        })
      );
    }

    // Wait for all tasks to complete
    await Promise.all(tasks);

    // Display results
    results.forEach(result => {
      if (result.success) {
        toast({
          title: `${result.operation} Completed`,
          description: result.message,
        });
      } else {
        toast({
          title: `${result.operation} Failed`,
          description: result.message,
          variant: "destructive",
        });
      }
    });
  }
};
