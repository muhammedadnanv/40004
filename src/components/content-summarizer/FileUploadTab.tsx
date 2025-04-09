
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FileUploadTabProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setFileType: React.Dispatch<React.SetStateAction<"pdf" | "video" | null>>;
  isLoading: boolean;
  onSubmit: () => void;
}

export const FileUploadTab = ({ 
  file, 
  setFile, 
  setFileType, 
  isLoading, 
  onSubmit 
}: FileUploadTabProps) => {
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

  const handleSubmit = () => {
    if (!file) {
      toast({
        title: "File Required",
        description: "Please upload a file first.",
        variant: "destructive",
      });
      return;
    }

    onSubmit();
  };

  return (
    <div className="space-y-6">
      <div 
        className={`flex flex-col items-center justify-center border-2 border-dashed ${file ? 'border-primary/50' : 'border-gray-300'} rounded-lg p-8 sm:p-12 text-center transition-colors duration-200 hover:border-primary/70`}
        role="region"
        aria-label="File upload area"
      >
        <div className="mb-4">
          <FileText size={48} className={`mx-auto ${file ? 'text-primary/80' : 'text-gray-400'}`} />
        </div>
        <p className="mb-4 text-sm text-gray-500">Upload PDF or video files</p>
        <Input
          id="file-upload"
          type="file"
          accept=".pdf,video/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Upload file input"
        />
        <Label 
          htmlFor="file-upload" 
          className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors duration-200"
        >
          Select File
        </Label>
        {file && (
          <div className="mt-4 text-sm text-gray-700">
            Selected: <span className="font-medium">{file.name}</span>
            <p className="text-xs text-gray-500 mt-1">
              {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <Button 
          onClick={handleSubmit} 
          disabled={!file || isLoading}
          className="w-full sm:w-auto relative overflow-hidden group"
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <span className="inline-block opacity-0">Processing...</span>
              <span className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="ml-2">Processing...</span>
              </span>
            </>
          ) : (
            <span>Summarize Content</span>
          )}
        </Button>
      </div>
    </div>
  );
};
