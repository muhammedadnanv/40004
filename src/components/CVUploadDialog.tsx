import { useState, useRef, ChangeEvent } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Upload, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { analyzeResumeContent } from "@/utils/websiteValidator";
import { Progress } from "@/components/ui/progress";
import { ResumeAnalysisResults } from "./ResumeAnalysisResults";
import { isMobileDevice } from "@/utils/mobileResponsiveness";

export interface CVUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVUploadDialog = ({ isOpen, onClose }: CVUploadDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isATSFriendly, setIsATSFriendly] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<{
    score: number;
    recommendations: string[];
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useState(() => {
    setIsMobile(isMobileDevice());
    
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const resetForm = () => {
    setFile(null);
    setFullName("");
    setEmail("");
    setMessage("");
    setIsATSFriendly(null);
    setIsChecking(false);
    setIsSubmitting(false);
    setAnalysisResults(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setIsATSFriendly(null);
    setAnalysisResults(null);
    
    if (selectedFile && isMobile) {
      toast({
        title: "File Selected",
        description: `"${selectedFile.name}" (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`,
      });
    }
  };

  const checkATSCompliance = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a resume file first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsChecking(true);
    
    try {
      const atsDocumentTypes = [
        "application/pdf", 
        "application/msword", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain"
      ];
      
      const imageTypes = [
        "image/jpeg", 
        "image/png", 
        "image/gif", 
        "image/bmp", 
        "image/tiff", 
        "image/webp"
      ];
      
      const isImageFile = imageTypes.includes(file.type);
      const isDocumentFile = atsDocumentTypes.includes(file.type);
      const isValidSize = file.size < 5 * 1024 * 1024;
      
      if (isImageFile) {
        toast({
          title: "Resume Check Failed",
          description: "Image files are not ATS-friendly. Please submit a PDF or DOC format resume.",
          variant: "destructive",
        });
        setIsATSFriendly(false);
        setIsChecking(false);
        return;
      } 
      
      if (!isDocumentFile) {
        toast({
          title: "Resume Check Failed",
          description: "Invalid file format. Please submit a PDF, DOC, or TXT format resume.",
          variant: "destructive",
        });
        setIsATSFriendly(false);
        setIsChecking(false);
        return;
      } 
      
      if (!isValidSize) {
        toast({
          title: "Resume Check Failed",
          description: "File is too large. Maximum size is 5MB.",
          variant: "destructive",
        });
        setIsATSFriendly(false);
        setIsChecking(false);
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          const text = event.target?.result as string || "";
          
          console.log("Analyzing resume content with NLP enhancements...");
          
          const results = await analyzeResumeContent(text);
          
          setIsATSFriendly(results.isATSFriendly);
          setAnalysisResults({
            score: results.score,
            recommendations: results.recommendations
          });
          
          if (results.isATSFriendly) {
            toast({
              title: "Resume Check Passed",
              description: `Your resume appears to be ATS-friendly with a score of ${results.score}%!`,
            });
          } else {
            toast({
              title: "Resume Check Failed",
              description: "Your resume needs improvement to be fully ATS-friendly. See recommendations below.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Error analyzing resume content:", error);
          toast({
            title: "Analysis Error",
            description: "Failed to analyze resume content. Please try again.",
            variant: "destructive",
          });
          setIsATSFriendly(false);
        } finally {
          setIsChecking(false);
        }
      };
      
      reader.onerror = () => {
        toast({
          title: "File Read Error",
          description: "Failed to read the file. Please try again.",
          variant: "destructive",
        });
        setIsATSFriendly(false);
        setIsChecking(false);
      };
      
      if (file.type === "application/pdf") {
        setIsATSFriendly(true);
        toast({
          title: "Resume Format Check Passed",
          description: "PDF format is ATS-friendly. For more detailed analysis, upload a DOC/DOCX/TXT file.",
        });
        setIsChecking(false);
      } else {
        reader.readAsText(file);
      }
    } catch (error) {
      console.error("Error checking ATS compliance:", error);
      toast({
        title: "Error",
        description: "Failed to check resume. Please try again.",
        variant: "destructive",
      });
      setIsChecking(false);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast({
        title: "No Resume Selected",
        description: "Please upload your resume before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    if (!isATSFriendly) {
      toast({
        title: "ATS Check Required",
        description: "Please ensure your resume is ATS-friendly before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    if (!fullName || !email) {
      toast({
        title: "Missing Information",
        description: "Please complete all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "CV Submitted Successfully!",
        description: "Please email your CV to comicfixxx@gmail.com for additional job placement support.",
      });
      
      handleClose();
    } catch (error) {
      console.error("Error submitting CV:", error);
      toast({
        title: "Error",
        description: "Failed to submit your CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg sm:text-xl responsive-heading">Job Placement Support</DialogTitle>
          <DialogDescription className="text-fluid-sm">
            Upload your CV for review and potential job placement opportunities. We'll check if your resume is ATS-friendly.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4 responsive-padding">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium mobile-form-label">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="mobile-touch-target text-fluid-base"
              aria-required="true"
              autoComplete="name"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="h-12"
              aria-required="true"
              autoComplete="email"
              inputMode="email"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="file" className="text-sm font-medium">
              Your Resume/CV (PDF, DOC or TXT) <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Input
                id="file"
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
                className="h-auto py-2 flex-1"
                required
                aria-required="true"
                aria-describedby="file-format-info"
              />
              <Button 
                onClick={checkATSCompliance} 
                disabled={!file || isChecking}
                size="sm"
                type="button"
                className="w-full sm:w-auto h-10"
              >
                {isChecking ? "Analyzing..." : "Check Resume"}
              </Button>
            </div>
            <p id="file-format-info" className="text-xs text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX, TXT (max 5MB)
            </p>
            
            {isChecking && (
              <div className="my-2 space-y-2">
                <p className="text-sm text-gray-600">Analyzing your resume...</p>
                <Progress value={100} className="h-2 animate-pulse" />
              </div>
            )}
            
            {file && isATSFriendly !== null && (
              <div className={`flex items-center mt-2 text-sm ${isATSFriendly ? 'text-green-600' : 'text-red-600'}`}>
                {isATSFriendly ? (
                  <><CheckCircle className="w-4 h-4 mr-1" /> Your resume appears to be ATS-friendly!</>
                ) : (
                  <><AlertCircle className="w-4 h-4 mr-1" /> Please try again. Your resume is not ATS-friendly.</>
                )}
              </div>
            )}
            
            {analysisResults && (
              <ResumeAnalysisResults 
                isATSFriendly={isATSFriendly || false}
                score={analysisResults.score}
                recommendations={analysisResults.recommendations}
              />
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Additional Information (Optional)
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any additional information you'd like to share..."
              className="min-h-[100px]"
              aria-label="Additional information about your job placement needs"
            />
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
            <p className="text-sm text-blue-700 flex items-center">
              <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
              Need help creating an ATS-friendly resume? Try our <a href="https://sxoresumebulider.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-medium underline ml-1 hover:text-blue-800">SXO Resume Builder</a>
            </p>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="sm:w-auto w-full"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`sm:w-auto w-full ${(!file || !isATSFriendly || !fullName || !email) ? 'opacity-70' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </span>
            ) : "Submit CV"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
