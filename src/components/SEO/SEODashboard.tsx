import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OnPageOptimizer } from "./OnPageOptimizer";
import { GoogleSearchPreview } from "./GoogleSearchPreview";
import { StructuredDataManager } from "./StructuredDataManager";
import { DynamicSitemap } from "./DynamicSitemap";
import { BlogSitemap } from "./BlogSitemap";
import { Badge } from "@/components/ui/badge";
import { seoOptimizer } from '@/utils/seoOptimizer';
import { initRetargetingService, createRetargetingPixel } from '@/utils/retargetingService';
import { Button } from "@/components/ui/button";

interface SEODashboardProps {
  pageType?: 'homepage' | 'program' | 'blog' | 'faq' | 'organization';
}

export function SEODashboard({
  pageType = 'homepage'
}: SEODashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('on-page');

  const runFullSEOOptimization = async () => {
    console.log("Running Full SEO Optimization");

    // Run comprehensive SEO optimizations
    await seoOptimizer.runOptimizations({
      optimizeMetaTags: true,
      optimizeHeadings: true,
      checkTechnicalSEO: true
    });

    // Initialize retargeting for visitors
    initRetargetingService({
      trackPageViews: true,
      trackProductViews: true,
      storeUserSegments: true
    });

    // Add retargeting pixels
    createRetargetingPixel('google');
  };

  // Define default keywords based on page type
  const getDefaultKeywords = (): string[] => {
    switch (pageType) {
      case 'homepage':
        return ["developer certification", "mentorship", "professional skills", "coding program"];
      case 'program':
        return ["developer course", "certification program", "technical skills", "career advancement"];
      case 'blog':
        return ["programming tips", "development insights", "tech tutorials", "coding guides"];
      case 'faq':
        return ["developer faqs", "program questions", "certification help", "mentorship info"];
      case 'organization':
        return ["tech organization", "development company", "training provider", "certification authority"];
      default:
        return ["developer certification", "mentorship", "professional skills"];
    }
  };

  // Get schema data based on page type
  const getSchemaData = () => {
    switch (pageType) {
      case 'organization':
        return {
          type: "Organization" as const,
          data: {
            name: "Developer Certification Platform",
            url: window.location.origin,
            logo: `${window.location.origin}/logo.png`
          }
        };
      case 'program':
        return {
          type: "Course" as const,
          data: {
            name: "Professional Developer Certification",
            description: "Master modern development skills with expert mentorship",
            provider: {
              "@type": "Organization",
              name: "Developer Certification Platform",
              url: window.location.origin
            }
          }
        };
      case 'faq':
        return {
          type: "FAQPage" as const,
          data: {
            mainEntity: [{
              "@type": "Question",
              name: "What is the Developer Certification Program?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Our Developer Certification Program offers mentorship and project-based learning for professional developers."
              }
            }]
          }
        };
      case 'blog':
        return {
          type: "Article" as const,
          data: {
            headline: "Developer Insights",
            author: {
              "@type": "Person",
              name: "Tech Expert"
            },
            datePublished: new Date().toISOString()
          }
        };
      default:
        return {
          type: "Organization" as const,
          data: {
            name: "Developer Certification Platform",
            url: window.location.origin,
            logo: `${window.location.origin}/logo.png`,
            sameAs: ["https://twitter.com/devplatform", "https://linkedin.com/company/devplatform"]
          }
        };
    }
  };

  return (
    <div className="hidden">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            SEO Dashboard
            <Badge variant="secondary">{pageType}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Button onClick={runFullSEOOptimization} className="w-full">
              Run Full SEO Optimization
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="on-page">On-Page</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="schema">Schema</TabsTrigger>
              <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
              <TabsTrigger value="blog-sitemap">Blog</TabsTrigger>
            </TabsList>
            
            <TabsContent value="on-page" className="space-y-4">
              <OnPageOptimizer 
                pageName={pageType}
                targetKeywords={getDefaultKeywords()}
                autoOptimize={false}
              />
            </TabsContent>
            
            <TabsContent value="preview" className="space-y-4">
              <GoogleSearchPreview 
                title="Dev Mentor Hub - Expert Web Development Training"
                description="Transform your career with expert-led web development programs"
                url="https://devmentorhub.com"
              />
            </TabsContent>
            
            <TabsContent value="schema" className="space-y-4">
              <StructuredDataManager 
                type={getSchemaData().type}
                data={getSchemaData().data}
                autoImplement={false}
              />
            </TabsContent>
            
            <TabsContent value="sitemap" className="space-y-4">
              <DynamicSitemap />
            </TabsContent>
            
            <TabsContent value="blog-sitemap" className="space-y-4">
              <BlogSitemap />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
