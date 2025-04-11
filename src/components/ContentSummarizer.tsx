
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { FileText, Upload, Link, Loader2 } from "lucide-react";
import { generateAndDownloadPDF } from "@/utils/generatePDF";
import { summarizeContent, processContentUrl } from "@/utils/geminiService";

const ContentSummarizer = () => {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"pdf" | "video" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) {
      return;
    }
    
    if (selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setFileType("pdf");
      toast({
        title: "PDF Selected",
        description: `${selectedFile.name} has been selected for summarization.`,
      });
    } else if (selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
      setFileType("video");
      toast({
        title: "Video Selected",
        description: `${selectedFile.name} has been selected for summarization.`,
      });
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF or video file.",
        variant: "destructive",
      });
    }
  };

  const handleUrlSubmit = async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a valid URL.",
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(url);
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL.",
        variant: "destructive",
      });
      return;
    }

    // Determine content type from URL
    let detectedType: "pdf" | "video" | null = null;
    if (url.endsWith('.pdf')) {
      detectedType = "pdf";
    } else if (url.includes('youtube.com') || url.includes('vimeo.com') || 
              url.endsWith('.mp4') || url.endsWith('.mov') || url.endsWith('.avi')) {
      detectedType = "video";
    }
    
    if (!detectedType) {
      toast({
        title: "Unsupported Content Type",
        description: "URL must point to a PDF or video content.",
        variant: "destructive",
      });
      return;
    }
    
    setFileType(detectedType);
    await summarizeFromUrl(url, detectedType);
  };

  const handleFileSubmit = async () => {
    if (!file || !fileType) {
      toast({
        title: "File Required",
        description: "Please upload a file first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Read file content
      const fileContent = await readFileContent(file);
      
      // Get summary from Gemini API
      const summaryText = await summarizeContent(fileContent, fileType);
      setSummary(summaryText);
      setShowDialog(true);
    } catch (error) {
      console.error("Error processing file:", error);
      setError("Failed to process your file. Please try again or use a different file.");
      toast({
        title: "Summarization Failed",
        description: "There was a problem processing your file.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const summarizeFromUrl = async (contentUrl: string, contentType: "pdf" | "video") => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Process URL to extract content
      const extractedContent = await processContentUrl(contentUrl);
      
      // Get summary from Gemini API
      const summaryText = await summarizeContent(extractedContent, contentType);
      setSummary(summaryText);
      setShowDialog(true);
    } catch (error) {
      console.error("Error processing URL:", error);
      setError("Failed to process the provided URL. Please try again or use a different URL.");
      toast({
        title: "Summarization Failed",
        description: "There was a problem processing the URL content.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to read file content
  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result.toString());
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      
      reader.onerror = () => reject(new Error("Error reading file"));
      
      if (file.type === "application/pdf") {
        // For demonstration, we're just reading as text
        // In production, you'd want to use a PDF parsing library
        reader.readAsText(file);
      } else if (file.type.startsWith("video/")) {
        // For video, we'd normally need a transcription service
        // For demo, we'll just return the file name and info
        resolve(`Video file: ${file.name}, Size: ${Math.round(file.size / 1024)} KB, Type: ${file.type}`);
      } else {
        reject(new Error("Unsupported file type"));
      }
    });
  };

  const handleDownload = () => {
    if (!summary) {
      toast({
        title: "Nothing to Download",
        description: "Please generate a summary first.",
      });
      return;
    }
    
    const filename = file ? file.name.replace(/\.[^/.]+$/, "") + "-summary.txt" : "content-summary.txt";
    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Summary Downloaded",
      description: "Your summarized content has been downloaded as a text file.",
    });
  };

  return (
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

        <TabsContent value="upload" className="space-y-6">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <div className="mb-4">
              <FileText size={48} className="mx-auto text-gray-400" />
            </div>
            <p className="mb-4 text-sm text-gray-500">Upload PDF or video files</p>
            <Input
              id="file-upload"
              type="file"
              accept=".pdf,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Label 
              htmlFor="file-upload" 
              className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
            >
              Select File
            </Label>
            {file && (
              <div className="mt-4 text-sm text-gray-700">
                Selected: {file.name}
              </div>
            )}
          </div>
          <div className="flex justify-center mt-6">
            <Button 
              onClick={handleFileSubmit} 
              disabled={!file || isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Summarize Content"
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="link" className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="url-input">Enter URL of PDF or video content</Label>
            <div className="flex gap-2">
              <Input
                id="url-input"
                placeholder="https://example.com/document.pdf"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Button 
              onClick={handleUrlSubmit} 
              disabled={!url || isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Summarize Content"
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Summarized Content</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Textarea 
              value={summary} 
              readOnly 
              rows={15} 
              className="font-mono text-sm whitespace-pre-wrap"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleDownload} variant="outline">
              Download Summary
            </Button>
            <Button onClick={() => setShowDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentSummarizer;
