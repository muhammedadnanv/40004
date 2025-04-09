
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { seoOptimizer } from '@/utils/seoOptimizer';

interface StructuredDataManagerProps {
  pageType: 'homepage' | 'program' | 'blog' | 'faq' | 'organization';
  initialData?: Record<string, any>;
}

export function StructuredDataManager({ 
  pageType,
  initialData
}: StructuredDataManagerProps) {
  const [activeTab, setActiveTab] = useState<string>('preview');
  const [structuredData, setStructuredData] = useState<Record<string, any>>(
    initialData || getDefaultStructuredData(pageType)
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  function getDefaultStructuredData(type: string): Record<string, any> {
    switch (type) {
      case 'homepage':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: document.title,
          url: window.location.href,
        };
      case 'program':
        return {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Professional Development Program',
          description: 'Master modern development skills with expert mentorship',
          provider: {
            '@type': 'Organization',
            name: 'Developer Certification Program',
            sameAs: window.location.origin
          }
        };
      case 'faq':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Sample question?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Sample answer'
              }
            }
          ]
        };
      case 'organization':
      default:
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Developer Certification Program',
          url: window.location.origin,
          logo: `${window.location.origin}/logo.png`
        };
    }
  }

  const generateStructuredData = async () => {
    try {
      setIsGenerating(true);
      
      // Get high-intent keywords
      const keywordsResult = await seoOptimizer.getKeywords(pageType, 5, 0.8, 0.9);
      const highIntentKeywords = keywordsResult.success && keywordsResult.keywords 
        ? keywordsResult.keywords.map(k => k.keyword)
        : ['developer certification', 'mentorship', 'professional skills'];
        
      // Generate appropriate schema based on page type
      const schemaType = pageType === 'program' ? 'Course' : 
                        pageType === 'faq' ? 'FAQPage' : 
                        pageType === 'blog' ? 'Article' : 'Organization';
      
      // Create schema data
      const schemaData: Record<string, any> = {
        name: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        keywords: highIntentKeywords.join(', ')
      };
      
      // Add specific schema properties based on page type
      if (pageType === 'program') {
        schemaData.provider = {
          '@type': 'Organization',
          name: 'Developer Certification Program',
          sameAs: window.location.origin
        };
      }
      
      // Generate the schema
      const schemaResult = await seoOptimizer.implementSchemaMarkup(schemaType, schemaData);
      
      if (schemaResult.success && schemaResult.schema) {
        // Parse the schema to get a proper object
        const parsedSchema = JSON.parse(schemaResult.schema);
        setStructuredData(parsedSchema);
        
        toast({
          title: "Structured Data Generated",
          description: `${schemaType} schema created for improved search visibility`,
          duration: 3000,
        });
      }
      
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating structured data:', error);
      setIsGenerating(false);
      
      toast({
        title: "Schema Generation Failed",
        description: "Could not generate structured data",
        variant: "destructive",
      });
    }
  };

  const installStructuredData = () => {
    try {
      // Create script element for structured data
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
      
      // Remove existing schema if present
      existingScripts.forEach(script => script.remove());
      
      // Create new script element
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData, null, 2);
      
      // Add to document head
      document.head.appendChild(script);
      
      toast({
        title: "Structured Data Installed",
        description: "Schema markup added to page for improved SEO",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error installing structured data:', error);
      
      toast({
        title: "Schema Installation Failed",
        description: "Could not add structured data to page",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Structured Data (Schema)</h3>
      
      <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="pt-4">
          <div className="space-y-2">
            <div className="bg-gray-50 p-2 rounded text-sm">
              <p><span className="font-medium">Type:</span> {structuredData['@type']}</p>
              {structuredData.name && (
                <p><span className="font-medium">Name:</span> {structuredData.name}</p>
              )}
              {structuredData.description && (
                <p><span className="font-medium">Description:</span> {structuredData.description}</p>
              )}
              {structuredData.keywords && (
                <p><span className="font-medium">Keywords:</span> {structuredData.keywords}</p>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={generateStructuredData}
                disabled={isGenerating}
                className="flex-1"
              >
                {isGenerating ? 'Generating...' : 'Generate Schema'}
              </Button>
              
              <Button 
                onClick={installStructuredData}
                className="flex-1"
              >
                Install Schema
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="pt-4">
          <pre className="bg-gray-50 p-2 rounded text-sm overflow-x-auto">
            {JSON.stringify(structuredData, null, 2)}
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  );
}
