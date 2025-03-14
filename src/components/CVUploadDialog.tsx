
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ResumeAnalysisResults } from "./ResumeAnalysisResults";
import { runWebsiteTest } from "@/utils/validators/websiteValidator";

const CVUploadDialog = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setIsAnalyzing(true);
    setUploadProgress(0);

    // Simulate upload and analysis
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Simulate analysis results
          setTimeout(() => {
            setAnalysisResults({
              isATSFriendly: Math.random() > 0.5, // Random result for demo
              score: Math.floor(Math.random() * 100), // Random score
              recommendations: [
                "Highlight your top skills relevant to the job description.",
                "Quantify your achievements with numbers and data.",
                "Include relevant coursework or projects.",
                "Remove graphics and images for better ATS parsing.",
                "Add more specific technical skills that match the job posting."
              ],
            });
            setIsAnalyzing(false);
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setUploadProgress(0);
    setAnalysisResults(null);
    setIsAnalyzing(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Resume Analysis</DialogTitle>
          <DialogDescription>
            Upload your resume to get instant feedback and suggestions for improvement.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="upload" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upload">Upload Resume</TabsTrigger>
            <TabsTrigger value="results" disabled={!analysisResults}>Analysis Results</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardContent className="grid gap-4">
                <Label htmlFor="cv-upload">Select CV File</Label>
                <Input id="cv-upload" type="file" onChange={handleFileChange} disabled={isAnalyzing} />
                {file && <p>Selected file: {file.name}</p>}

                <Button onClick={handleUpload} disabled={!file || isAnalyzing}>
                  {isAnalyzing ? "Analyzing..." : "Upload and Analyze"}
                </Button>

                {uploadProgress > 0 && (
                  <>
                    <p>Upload Progress: {uploadProgress}%</p>
                    <Progress value={uploadProgress} />
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            {analysisResults ? (
              <ResumeAnalysisResults 
                isATSFriendly={analysisResults.isATSFriendly}
                score={analysisResults.score}
                recommendations={analysisResults.recommendations}
              />
            ) : (
              <p>No analysis results yet. Please upload a resume to get started.</p>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CVUploadDialog;
