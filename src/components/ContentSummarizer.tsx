
import React, { useState, ErrorInfo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link } from "lucide-react";
import { FileUploadTab } from "./content-summarizer/FileUploadTab";
import { UrlInputTab } from "./content-summarizer/UrlInputTab";
import { SummaryDialog } from "./content-summarizer/SummaryDialog";
import { generateContentSummary } from "./content-summarizer/summarizer-service";
import { toast } from "@/hooks/use-toast";
import ErrorBoundary from "@/components/ErrorBoundary";

const ErrorFallback = ({ onReset }: { onReset: () => void }) => (
  <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-center">
    <h3 className="text-lg font-medium text-red-800 mb-2">Something went wrong</h3>
    <p className="text-red-600 mb-4">There was an error processing your request.</p>
    <button
      onClick={onReset}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
    >
      Try again
    </button>
  </div>
);

const ContentSummarizer = () => {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"pdf" | "video" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [hasError, setHasError] = useState(false);

  const resetErrorState = () => {
    setHasError(false);
    setIsLoading(false);
  };

  const summarizeContent = async () => {
    setIsLoading(true);
    let contentSource = file ? "file" : "url";
    
    try {
      const generatedSummary = await generateContentSummary(
        fileType, 
        contentSource, 
        file?.name
      );
      
      setSummary(generatedSummary);
      setShowDialog(true);
    } catch (error) {
      console.error("Error summarizing content:", error);
      setHasError(true);
      toast({
        title: "Summarization Failed",
        description: "There was an error processing your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (hasError) {
    return <ErrorFallback onReset={resetErrorState} />;
  }

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Content Summarizer</h2>
        <p className="text-center mb-8 text-gray-600">Upload PDFs, videos, or paste links to get AI-powered summaries in student-friendly formats</p>
        
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload size={16} /> Upload Files
            </TabsTrigger>
            <TabsTrigger value="link" className="flex items-center gap-2">
              <Link size={16} /> Paste URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <FileUploadTab 
              file={file}
              setFile={setFile}
              setFileType={setFileType}
              isLoading={isLoading}
              onSubmit={summarizeContent}
            />
          </TabsContent>

          <TabsContent value="link">
            <UrlInputTab 
              url={url}
              setUrl={setUrl}
              setFileType={setFileType}
              isLoading={isLoading}
              onSubmit={summarizeContent}
            />
          </TabsContent>
        </Tabs>

        <SummaryDialog 
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          summary={summary}
        />
      </div>
    </ErrorBoundary>
  );
};

export default ContentSummarizer;
