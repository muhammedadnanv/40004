
import React, { useEffect, useState } from 'react';
import { seoOptimizer } from '@/utils/seoOptimizer';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface OnPageOptimizerProps {
  pageName: string;
  targetKeywords?: string[];
  autoOptimize?: boolean;
}

export function OnPageOptimizer({ 
  pageName, 
  targetKeywords = [], 
  autoOptimize = false 
}: OnPageOptimizerProps) {
  const [seoScore, setSeoScore] = useState<number>(0);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [keywordDensity, setKeywordDensity] = useState<{[key: string]: number}>({});

  useEffect(() => {
    // Run initial SEO check
    analyzeOnPageSEO();
    
    // Automatically optimize if specified
    if (autoOptimize) {
      optimizeOnPageSEO();
    }
  }, []);

  const analyzeOnPageSEO = async () => {
    try {
      console.log(`Analyzing on-page SEO for ${pageName}...`);
      
      // Get page content
      const pageContent = document.querySelector('main')?.textContent || '';
      
      // Get keywords if not provided
      let keywords = [...targetKeywords];
      if (keywords.length === 0) {
        const keywordsResult = await seoOptimizer.getKeywords('general', 5, 0.7, 0.8);
        if (keywordsResult.success && keywordsResult.keywords) {
          keywords = keywordsResult.keywords.map(k => k.keyword);
        }
      }
      
      // Calculate keyword density
      const densityMap: {[key: string]: number} = {};
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const matches = pageContent.match(regex) || [];
        const wordCount = pageContent.split(/\s+/).length;
        const density = matches.length / wordCount * 100;
        densityMap[keyword] = parseFloat(density.toFixed(2));
      });
      setKeywordDensity(densityMap);
      
      // Analyze content structure
      const contentAnalysis = seoOptimizer.analyzeContentStructure('main');
      
      // Compile recommendations
      const seoRecommendations: string[] = [];
      
      // Check heading structure
      if (!contentAnalysis.headingStructure?.hasProperHierarchy) {
        seoRecommendations.push(
          'Improve heading structure: Use one H1 heading and multiple H2 subheadings'
        );
      }
      
      // Check keyword density
      const lowDensityKeywords = Object.entries(densityMap)
        .filter(([_, density]) => density < 0.5)
        .map(([keyword]) => keyword);
        
      if (lowDensityKeywords.length > 0) {
        seoRecommendations.push(
          `Increase keyword density for: ${lowDensityKeywords.join(', ')}`
        );
      }
      
      // Check meta tags
      const metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        seoRecommendations.push('Add a meta description with target keywords');
      }
      
      // Check for internal linking
      if (contentAnalysis.internalLinks && contentAnalysis.internalLinks.count < 3) {
        seoRecommendations.push('Add more internal links to improve site structure');
      }
      
      // Check for image optimization
      const images = document.querySelectorAll('img:not([alt])');
      if (images.length > 0) {
        seoRecommendations.push(`Add alt text to ${images.length} images`);
      }
      
      // Calculate overall SEO score
      let score = 100;
      score -= seoRecommendations.length * 10;
      score = Math.max(0, Math.min(100, score));
      
      setSeoScore(score);
      setRecommendations(seoRecommendations);
      
      console.log(`SEO analysis complete for ${pageName}. Score: ${score}`);
      return { score, recommendations: seoRecommendations };
    } catch (error) {
      console.error('Error analyzing on-page SEO:', error);
      return { score: 0, recommendations: ['Error analyzing SEO'] };
    }
  };

  const optimizeOnPageSEO = async () => {
    try {
      setIsOptimizing(true);
      console.log(`Optimizing on-page SEO for ${pageName}...`);
      
      // Get high-intent keywords
      const keywordsResult = await seoOptimizer.getKeywords('general', 5, 0.8, 0.9);
      let highIntentKeywords: string[] = [];
      
      if (keywordsResult.success && keywordsResult.keywords) {
        highIntentKeywords = keywordsResult.keywords.map(k => k.keyword);
      }
      
      // Apply optimizations
      await seoOptimizer.optimizeMetaTags(window.location.href, highIntentKeywords);
      
      // Update schema markup based on page content
      if (pageName.toLowerCase().includes('program') || pageName.toLowerCase().includes('course')) {
        await seoOptimizer.implementSchemaMarkup('Course', {
          name: document.title,
          description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
          keywords: highIntentKeywords.join(', ')
        });
      } else {
        await seoOptimizer.implementSchemaMarkup('Organization', {
          name: "Professional Developer Certification Program",
          description: "Expert mentorship and certification for professional developers",
          keywords: highIntentKeywords.join(', ')
        });
      }
      
      toast({
        title: "On-Page SEO Optimized",
        description: `Enhanced page SEO with high-intent keywords: ${highIntentKeywords.slice(0, 3).join(', ')}`,
        duration: 3000,
      });
      
      // Re-analyze to show improvements
      await analyzeOnPageSEO();
      setIsOptimizing(false);
    } catch (error) {
      console.error('Error optimizing on-page SEO:', error);
      setIsOptimizing(false);
      
      toast({
        title: "SEO Optimization Failed",
        description: "Could not optimize on-page SEO",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">On-Page SEO Score</h3>
        <span className={`text-lg font-bold ${seoScore > 70 ? 'text-green-600' : seoScore > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
          {seoScore}%
        </span>
      </div>
      
      <Progress value={seoScore} className="h-2" />
      
      {recommendations.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Recommendations:</h4>
          <ul className="space-y-1 text-sm">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-gray-700">• {rec}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Keyword Density:</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(keywordDensity).map(([keyword, density]) => (
            <div key={keyword} className="flex justify-between text-sm">
              <span className="text-gray-700">{keyword}:</span>
              <span className={`font-medium ${density >= 0.5 ? 'text-green-600' : 'text-yellow-600'}`}>
                {density}%
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <Button 
        onClick={optimizeOnPageSEO} 
        disabled={isOptimizing}
        className="w-full mt-4"
      >
        {isOptimizing ? 'Optimizing...' : 'Optimize SEO'}
      </Button>
    </div>
  );
}
