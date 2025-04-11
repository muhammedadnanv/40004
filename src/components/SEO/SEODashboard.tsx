
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
import { toast } from "@/hooks/use-toast";

interface SEODashboardProps {
  pageType?: 'homepage' | 'program' | 'blog' | 'faq' | 'organization';
}

export function SEODashboard({ pageType = 'homepage' }: SEODashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('on-page');
  
  const runFullSEOOptimization = async () => {
    toast({
      title: "Running Full SEO Optimization",
      description: "Optimizing for high-intent keywords and technical factors",
      duration: 3000,
    });
    
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

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">SEO & Retargeting Dashboard</h2>
          <p className="text-gray-500">Optimize your site for search engines and retarget visitors</p>
        </div>
        
        <Button 
          onClick={runFullSEOOptimization}
          className="mt-4 md:mt-0"
        >
          Run Full Optimization
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>On-Page SEO Optimization</span>
              <Badge variant="outline">Google</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="on-page" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="on-page">On-Page</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="schema">Schema</TabsTrigger>
                <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
              </TabsList>
              
              <TabsContent value="on-page" className="pt-4">
                <OnPageOptimizer 
                  pageName={document.title}
                  targetKeywords={getDefaultKeywords()}
                  autoOptimize={false}
                />
              </TabsContent>
              
              <TabsContent value="preview" className="pt-4">
                <GoogleSearchPreview />
              </TabsContent>
              
              <TabsContent value="schema" className="pt-4">
                {pageType === 'organization' && (
                  <StructuredDataManager 
                    type="Organization" 
                    data={{
                      name: "Developer Certification Platform",
                      url: window.location.origin,
                      logo: `${window.location.origin}/logo.png`
                    }}
                  />
                )}
                {pageType === 'program' && (
                  <StructuredDataManager 
                    type="Course" 
                    data={{
                      name: "Professional Developer Certification",
                      description: "Master modern development skills with expert mentorship",
                      provider: {
                        "@type": "Organization",
                        name: "Developer Certification Platform",
                        url: window.location.origin
                      }
                    }}
                  />
                )}
                {pageType === 'faq' && (
                  <StructuredDataManager 
                    type="FAQPage" 
                    data={{
                      mainEntity: [
                        {
                          "@type": "Question",
                          name: "What is the Developer Certification Program?",
                          acceptedAnswer: {
                            "@type": "Answer",
                            text: "Our Developer Certification Program offers mentorship and project-based learning for professional developers."
                          }
                        }
                      ]
                    }}
                  />
                )}
                {pageType === 'blog' && (
                  <StructuredDataManager 
                    type="Article" 
                    data={{
                      headline: "Developer Insights",
                      author: {
                        "@type": "Person",
                        name: "Tech Expert"
                      },
                      datePublished: new Date().toISOString()
                    }}
                  />
                )}
                {pageType === 'homepage' && (
                  <StructuredDataManager 
                    type="Organization" 
                    data={{
                      name: "Developer Certification Platform",
                      url: window.location.origin,
                      logo: `${window.location.origin}/logo.png`,
                      sameAs: [
                        "https://twitter.com/devplatform",
                        "https://linkedin.com/company/devplatform"
                      ]
                    }}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="sitemap" className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DynamicSitemap />
                  <BlogSitemap />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Visitor Retargeting</span>
              <Badge variant="outline">Ads</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Retarget visitors who have shown interest in your programs through these platforms:
              </p>
              
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" onClick={() => createRetargetingPixel('facebook')}>
                  Enable Facebook Retargeting
                </Button>
                
                <Button variant="outline" onClick={() => createRetargetingPixel('google')}>
                  Enable Google Ads Retargeting
                </Button>
                
                <Button variant="outline" onClick={() => createRetargetingPixel('linkedin')}>
                  Enable LinkedIn Retargeting
                </Button>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-2">Benefits:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Recover abandoned enrollment forms</li>
                  <li>• Re-engage with past visitors</li>
                  <li>• Target high-intent users</li>
                  <li>• Personalize ad messaging</li>
                  <li>• Improve conversion rates</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
