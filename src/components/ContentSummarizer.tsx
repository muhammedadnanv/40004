import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { FileText, Upload, Link } from "lucide-react";
import { generateAndDownloadPDF } from "@/utils/generatePDF";

const ContentSummarizer = () => {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"pdf" | "video" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [showDialog, setShowDialog] = useState(false);

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

  const handleUrlSubmit = () => {
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

    if (url.endsWith('.pdf')) {
      setFileType("pdf");
    } else if (url.includes('youtube.com') || url.includes('vimeo.com') || 
               url.endsWith('.mp4') || url.endsWith('.mov') || url.endsWith('.avi')) {
      setFileType("video");
    }

    summarizeContent();
  };

  const handleFileSubmit = () => {
    if (!file) {
      toast({
        title: "File Required",
        description: "Please upload a file first.",
        variant: "destructive",
      });
      return;
    }

    summarizeContent();
  };

  const summarizeContent = async () => {
    setIsLoading(true);
    let contentSource = file ? "file" : "url";
    let contentType = fileType;
    let contentUrl = url;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let mockSummary = "";
      if (contentType === "pdf") {
        mockSummary = `# Summary of ${contentSource === "file" ? file?.name : "PDF from URL"}\n\n`;
        mockSummary += "## Key Points\n\n";
        mockSummary += "1. This is a summarized version of the PDF content for easier understanding.\n";
        mockSummary += "2. The document has been processed to extract the main ideas and concepts.\n";
        mockSummary += "3. Technical terms have been simplified for student-friendly comprehension.\n\n";
        mockSummary += "## Main Concepts\n\n";
        mockSummary += "- The document discusses important academic concepts in a structured manner.\n";
        mockSummary += "- Several examples illustrate practical applications of the theories presented.\n";
        mockSummary += "- References to further reading are provided for deeper understanding.\n\n";
        mockSummary += "*Note: This is a demonstration of the summarization feature. In production, actual content from your PDF would be analyzed by the Gemini API.*";
      } else {
        mockSummary = `# Summary of ${contentSource === "file" ? file?.name : "Video from URL"}\n\n`;
        mockSummary += "## Video Overview\n\n";
        mockSummary += "This video covers the following topics:\n\n";
        mockSummary += "1. Introduction to the main subject (00:00 - 02:15)\n";
        mockSummary += "2. Explanation of key concepts with examples (02:16 - 08:45)\n";
        mockSummary += "3. Practical demonstrations and applications (08:46 - 15:30)\n";
        mockSummary += "4. Summary and conclusion (15:31 - end)\n\n";
        mockSummary += "## Key Takeaways\n\n";
        mockSummary += "- The video presents complex ideas in a visual format for better understanding.\n";
        mockSummary += "- Step-by-step explanations make the content accessible to beginners.\n";
        mockSummary += "- Visual aids and animations help clarify difficult concepts.\n\n";
        mockSummary += "*Note: This is a demonstration of the summarization feature. In production, actual content from your video would be analyzed by the Gemini API.*";
      }
      
      setSummary(mockSummary);
      setShowDialog(true);
    } catch (error) {
      console.error("Error summarizing content:", error);
      toast({
        title: "Summarization Failed",
        description: "There was an error processing your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    generateAndDownloadPDF();
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
              {isLoading ? "Processing..." : "Summarize Content"}
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
              {isLoading ? "Processing..." : "Summarize Content"}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

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
