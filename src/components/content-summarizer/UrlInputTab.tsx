
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface UrlInputTabProps {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  setFileType: React.Dispatch<React.SetStateAction<"pdf" | "video" | null>>;
  isLoading: boolean;
  onSubmit: () => void;
}

export const UrlInputTab = ({
  url,
  setUrl,
  setFileType,
  isLoading,
  onSubmit
}: UrlInputTabProps) => {
  const handleSubmit = () => {
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

    onSubmit();
  };

  return (
    <div className="space-y-6">
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
          onClick={handleSubmit} 
          disabled={!url || isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? "Processing..." : "Summarize Content"}
        </Button>
      </div>
    </div>
  );
};
