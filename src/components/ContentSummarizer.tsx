
import { useState } from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { FileText, Link as LinkIcon, FileVideo } from "lucide-react";

const ContentSummarizer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [url, setUrl] = useState("");
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [summaryType, setSummaryType] = useState<"url" | "file">("url");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult("");

    try {
      // Mock API call for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      if (summaryType === "url") {
        if (!url) {
          throw new Error("Please enter a valid URL");
        }
        // Mock result for URL summarization
        setResult(`Summary of content from ${url}:\n\nThe provided content discusses advanced techniques for optimizing React applications with a focus on performance considerations. Key points include:\n\n1. Component memoization strategies\n2. Effective state management patterns\n3. Code splitting for improved load times\n4. Reducing bundle sizes through tree-shaking\n5. Server-side rendering considerations`);
      } else {
        if (!fileToUpload) {
          throw new Error("Please select a file to upload");
        }
        // Mock result for file upload
        setResult(`Summary of uploaded file "${fileToUpload.name}":\n\nThe document outlines a comprehensive approach to modern web development workflows with these main sections:\n\n1. Frontend architecture best practices\n2. API design principles for scalability\n3. Testing methodologies for robust applications\n4. Deployment strategies for continuous integration\n5. Performance monitoring and optimization techniques`);
      }

      toast({
        title: "Summary Generated Successfully",
        description: "Your content has been analyzed and summarized.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileToUpload(file);
  };

  // Switch between URL and file upload modes
  const handleSummaryTypeChange = (value: string) => {
    setSummaryType(value as "url" | "file");
  };

  return (
    <Card className="max-w-3xl mx-auto p-6 shadow-lg">
      <Tabs defaultValue="url" onValueChange={handleSummaryTypeChange}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="url">
            <LinkIcon className="w-4 h-4 mr-2" />
            <span>URL</span>
          </TabsTrigger>
          <TabsTrigger value="file">
            <FileText className="w-4 h-4 mr-2" />
            <span>File Upload</span>
          </TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit}>
          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Enter URL to Summarize</Label>
              <Input
                id="url"
                placeholder="https://example.com/article-or-paper"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <p className="text-xs text-gray-500">Supports articles, blog posts, and academic papers</p>
            </div>
          </TabsContent>
          
          <TabsContent value="file" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">Upload PDF or Video</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,video/*"
                  onChange={handleFileChange}
                />
                {fileToUpload && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    {fileToUpload.type.includes("pdf") ? (
                      <FileText className="w-4 h-4" />
                    ) : (
                      <FileVideo className="w-4 h-4" />
                    )}
                    <span>{fileToUpload.name}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">Supports PDF documents and video files up to 100MB</p>
            </div>
          </TabsContent>
          
          <Button 
            type="submit" 
            className="w-full mt-6" 
            disabled={isLoading || (summaryType === "url" ? !url : !fileToUpload)}
          >
            {isLoading ? "Generating Summary..." : "Generate Summary"}
          </Button>
        </form>
      </Tabs>
      
      {result && (
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-medium">Summary</h3>
          <Textarea 
            readOnly 
            value={result} 
            className="min-h-[200px]"
            rows={10}
          />
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => navigator.clipboard.writeText(result)}
            >
              Copy to Clipboard
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ContentSummarizer;
