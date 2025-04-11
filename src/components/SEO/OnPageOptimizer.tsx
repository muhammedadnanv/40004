
import React, { useState, useEffect } from 'react';
import { seoOptimizer } from "@/utils/seoOptimizer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface OnPageOptimizerProps {
  pageName: string;
  targetKeywords: string[];
  autoOptimize?: boolean;
}

export const OnPageOptimizer: React.FC<OnPageOptimizerProps> = ({ pageName, targetKeywords, autoOptimize = false }) => {
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [pageContent, setPageContent] = useState('');
  const [optimizationResults, setOptimizationResults] = useState<string[]>([]);

  useEffect(() => {
    if (autoOptimize) {
      runAutomaticOptimizations();
    }
  }, [autoOptimize]);

  const runAutomaticOptimizations = async () => {
    try {
      const metaTagsResult = await seoOptimizer.optimizeMetaTags(pageName, targetKeywords);
      if (metaTagsResult && metaTagsResult.success) {
        setMetaTitle(metaTagsResult.suggestions?.title || '');
        setMetaDescription(metaTagsResult.suggestions?.description || '');
        setOptimizationResults(prev => [...prev, 'Meta tags automatically optimized.']);
      } else {
        setOptimizationResults(prev => [...prev, 'Meta tags optimization failed.']);
      }

      // Using analyzeContentStructure instead of optimizeHeadings
      const headingsResult = seoOptimizer.analyzeContentStructure('main');
      if (headingsResult && headingsResult.success) {
        setOptimizationResults(prev => [...prev, 'Headings automatically analyzed.']);
      } else {
        setOptimizationResults(prev => [...prev, 'Headings analysis failed.']);
      }

      // Content optimization message
      setOptimizationResults(prev => [...prev, 'Content optimization capability not available.']);
    } catch (error: any) {
      console.error("Error during automatic SEO optimization:", error);
      setOptimizationResults(prev => [...prev, `Error: ${error.message || 'Unknown error'}`]);
    }
  };

  const handleManualOptimize = async () => {
    try {
      const manualMetaTagsResult = await seoOptimizer.optimizeMetaTags(pageName, targetKeywords);
      if (manualMetaTagsResult && manualMetaTagsResult.success) {
        setMetaTitle(manualMetaTagsResult.suggestions?.title || '');
        setMetaDescription(manualMetaTagsResult.suggestions?.description || '');
        setOptimizationResults(prev => [...prev, 'Meta tags manually optimized.']);
      } else {
        setOptimizationResults(prev => [...prev, 'Meta tags manual optimization failed.']);
      }

      // Using analyzeContentStructure instead of optimizeHeadings
      const manualHeadingsResult = seoOptimizer.analyzeContentStructure('main');
      if (manualHeadingsResult && manualHeadingsResult.success) {
        setOptimizationResults(prev => [...prev, 'Headings manually analyzed.']);
      } else {
        setOptimizationResults(prev => [...prev, 'Headings manual analysis failed.']);
      }

      // Content optimization message
      setOptimizationResults(prev => [...prev, 'Content optimization capability not available.']);
    } catch (error: any) {
      console.error("Error during manual SEO optimization:", error);
      setOptimizationResults(prev => [...prev, `Error: ${error.message || 'Unknown error'}`]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">On-Page SEO Optimizer - {pageName}</h2>

      <div className="mb-4">
        <Label htmlFor="metaTitle">Meta Title</Label>
        <Input
          type="text"
          id="metaTitle"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          className="w-full mt-1"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea
          id="metaDescription"
          value={metaDescription}
          onChange={(e) => setMetaDescription(e.target.value)}
          className="w-full mt-1"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="pageContent">Page Content</Label>
        <Textarea
          id="pageContent"
          value={pageContent}
          onChange={(e) => setPageContent(e.target.value)}
          className="w-full mt-1"
        />
      </div>

      <Button onClick={handleManualOptimize} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Run Manual Optimization
      </Button>

      {optimizationResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold">Optimization Results:</h3>
          <ul>
            {optimizationResults.map((result, index) => (
              <li key={index} className="list-disc ml-5">{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
