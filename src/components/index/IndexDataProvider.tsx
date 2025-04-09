
import React, { useEffect } from "react";
import { getContentEngagementStats } from "@/utils/contentAdaptation";
import { fetchAndApplySEOKeywords } from "@/utils/performanceOptimizer";
import { runSEOOptimizations, runWebsiteTest } from "@/utils/websiteValidator";
import { initABTesting, trackConversion } from "@/utils/abTesting";
import { applySEOOptimizations } from "@/utils/performanceOptimizer";
import { seoOptimizer } from "@/utils/seoOptimizer";
import { initRetargetingService, trackVisitorEvent } from "@/utils/retargetingService";
import { autoFixAndReportLinkIssues } from "@/utils/linkValidator";
import { enhanceMobileExperience, initializeMobileOptimizations } from "@/utils/mobileResponsiveness";

interface IndexDataProviderProps {
  children: React.ReactNode;
}

export const IndexDataProvider = ({ children }: IndexDataProviderProps) => {
  useEffect(() => {
    const engagementInterval = setInterval(() => {
      const stats = getContentEngagementStats();
      console.log('Content engagement stats:', stats);
    }, 300000);

    initABTesting();
    
    const initializePage = async () => {
      await fetchAndApplySEOKeywords('mentorship', 5);
      runSEOOptimizations();
      
      initRetargetingService({
        trackPageViews: true,
        trackProductViews: true,
        storeUserSegments: true
      });
      
      trackVisitorEvent('pageview', {
        label: 'homepage',
        value: 1
      });
      
      autoFixAndReportLinkIssues();
      
      // Apply mobile optimizations
      initializeMobileOptimizations();
      
      const keywordsResult = await seoOptimizer.getKeywords('mentorship', 10, 0.7, 0.8);
      if (keywordsResult.success && keywordsResult.keywords) {
        console.log('Applied high-intent keywords:', keywordsResult.keywords);
        
        const schemaResult = await seoOptimizer.implementSchemaMarkup('Course', {
          name: "Professional Developer Certification Program",
          description: "Master modern development skills with expert mentorship",
          keywords: keywordsResult.keywords.map(k => k.keyword).join(", ")
        });
        
        if (schemaResult.success) {
          console.log('Schema markup implemented successfully');
        }
      }
      
      setTimeout(() => {
        runWebsiteTest();
      }, 2000);
      
      trackConversion('hero-cta-test', 'page_view');
    };
    
    initializePage();

    const automaticOptimizationInterval = setInterval(async () => {
      await fetchAndApplySEOKeywords('mentorship', 5);
      applySEOOptimizations();
      
      await seoOptimizer.runOptimizations({
        optimizeMetaTags: true,
        checkTechnicalSEO: true
      });
    }, 12 * 60 * 60 * 1000);

    const programButtons = document.querySelectorAll('.program-cta-btn');
    programButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        trackVisitorEvent('action', {
          label: 'program_interest',
          value: 2
        });
      });
    });

    return () => {
      clearInterval(engagementInterval);
      clearInterval(automaticOptimizationInterval);
    };
  }, []);

  return <>{children}</>;
};
