
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
    setIsATSFriendly(null); // Reset ATS check when file changes
    setAnalysisResults(null); // Reset analysis results when file changes
  };

  const checkATSCompliance = async () => {
    if (!file) return;
    
    setIsChecking(true);
    
    try {
      // Check if file is a document type (ATS-friendly) rather than an image
      const atsDocumentTypes = [
        "application/pdf", 
        "application/msword", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      
      // Image types that are not ATS-friendly
      const imageTypes = [
        "image/jpeg", 
        "image/png", 
        "image/gif", 
        "image/bmp", 
        "image/tiff", 
        "image/webp"
      ];
      
      // Check if the file is ATS-friendly (document format, not an image)
      const isImageFile = imageTypes.includes(file.type);
      const isDocumentFile = atsDocumentTypes.includes(file.type);
      const isValidSize = file.size < 5 * 1024 * 1024; // Less than 5MB
      
      // First check file format and size
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
          description: "Invalid file format. Please submit a PDF or DOC format resume.",
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
      
      // If file format is valid, read and analyze the content
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          // Extract text content from the file
          const text = event.target?.result as string || "";
          
          // Analyze the resume content
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
      
      // For PDF files, we'll only be able to check the file type
      // For text-based files, we'll try to read the content
      if (file.type === "application/pdf") {
        // For PDFs, we can only validate the format
        setIsATSFriendly(true);
        toast({
          title: "Resume Format Check Passed",
          description: "PDF format is ATS-friendly. For content analysis, upload a DOC/DOCX file.",
        });
        setIsChecking(false);
      } else {
        // For DOC/DOCX, read as text
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
    if (!file || !isATSFriendly || !fullName || !email) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Success!",
        description: "Please email your CV to comicfixxx@gmail.com for job placement support.",
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
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Job Placement Support</DialogTitle>
          <DialogDescription>
            Upload your CV for review and potential job placement opportunities. We'll check if your resume is ATS-friendly.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="file" className="text-sm font-medium">
              Your Resume/CV (PDF or DOC)
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
                className="flex-1"
                required
              />
              <Button 
                onClick={checkATSCompliance} 
                disabled={!file || isChecking}
                size="sm"
                type="button"
              >
                {isChecking ? "Checking..." : "Check"}
              </Button>
            </div>
            {file && isATSFriendly !== null && (
              <div className={`flex items-center mt-2 text-sm ${isATSFriendly ? 'text-green-600' : 'text-red-600'}`}>
                {isATSFriendly ? (
                  <><CheckCircle className="w-4 h-4 mr-1" /> Your resume appears to be ATS-friendly!</>
                ) : (
                  <><AlertCircle className="w-4 h-4 mr-1" /> Please try again. Your resume is not ATS-friendly.</>
                )}
              </div>
            )}
            
            {/* Show analysis results if available */}
            {analysisResults && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <h4 className="font-medium mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-2" /> Resume Analysis
                </h4>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>ATS-Compatibility Score</span>
                    <span>{analysisResults.score}%</span>
                  </div>
                  <Progress value={analysisResults.score} className="h-2" />
                </div>
                
                {analysisResults.recommendations.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium mb-1">Recommendations:</h5>
                    <ul className="text-sm space-y-1">
                      {analysisResults.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
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
            />
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
            disabled={!file || !isATSFriendly || !fullName || !email || isSubmitting}
            className="sm:w-auto w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit CV"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
