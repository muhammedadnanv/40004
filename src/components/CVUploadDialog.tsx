
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
import { Upload, CheckCircle, AlertCircle } from "lucide-react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setFile(null);
    setFullName("");
    setEmail("");
    setMessage("");
    setIsATSFriendly(null);
    setIsChecking(false);
    setIsSubmitting(false);
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
  };

  const checkATSCompliance = async () => {
    if (!file) return;
    
    setIsChecking(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
      
      // ATS-friendly if it's a document file (not an image) and valid size
      const isATSCompatible = isDocumentFile && !isImageFile && isValidSize;
      setIsATSFriendly(isATSCompatible);
      
      if (!isATSCompatible) {
        if (isImageFile) {
          toast({
            title: "Resume Check Failed",
            description: "Image files are not ATS-friendly. Please submit a PDF or DOC format resume.",
            variant: "destructive",
          });
        } else if (!isDocumentFile) {
          toast({
            title: "Resume Check Failed",
            description: "Invalid file format. Please submit a PDF or DOC format resume.",
            variant: "destructive",
          });
        } else if (!isValidSize) {
          toast({
            title: "Resume Check Failed",
            description: "File is too large. Maximum size is 5MB.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Resume Check Passed",
          description: "Your resume appears to be ATS-friendly! You can now submit it.",
        });
      }
    } catch (error) {
      console.error("Error checking ATS compliance:", error);
      toast({
        title: "Error",
        description: "Failed to check resume. Please try again.",
        variant: "destructive",
      });
    } finally {
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
                accept=".pdf,.doc,.docx"
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

