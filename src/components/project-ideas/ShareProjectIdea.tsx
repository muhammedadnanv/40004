
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareProjectIdeaProps {
  project: {
    name: string;
    description: string;
    difficulty: string;
    category: string;
  };
  onClose: () => void;
}

export const ShareProjectIdea = ({ project, onClose }: ShareProjectIdeaProps) => {
  const { toast } = useToast();
  const websiteUrl = window.location.origin;
  
  // Create project sharing URL
  const shareUrl = `${websiteUrl}/#project-ideas?project=${encodeURIComponent(project.name)}&category=${encodeURIComponent(project.category)}`;
  
  // Create share text with SEO-friendly content
  const shareText = `Check out this ${project.difficulty} level ${project.category} project idea: ${project.name} - ${project.description.substring(0, 100)}... #coding #developer #${project.category.toLowerCase().replace(/\s+/g, '')} #devmentorhub`;
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    const shareWindow = window.open(
      shareLinks[platform],
      'share',
      'width=600,height=400,location=0,menubar=0'
    );

    if (shareWindow) {
      shareWindow.focus();
      toast({
        title: `Sharing to ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
        description: "Thanks for spreading the word about this project idea!",
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${project.name}: ${project.description}\n\n${shareUrl}`);
      toast({
        title: "Copied to clipboard!",
        description: "Project idea details have been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md" aria-labelledby="share-dialog-title">
        <DialogHeader>
          <DialogTitle id="share-dialog-title">Share Project Idea</DialogTitle>
          <DialogDescription>
            Share this {project.difficulty} level {project.category} project with your network
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-4">
          <h3 className="font-semibold mb-1">{project.name}</h3>
          <p className="text-sm text-gray-500 mb-4">{project.description}</p>
          
          <div className="grid grid-cols-2 gap-3 sm:flex sm:space-x-2">
            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2 bg-[#1877F2]/10 hover:bg-[#1877F2]/20"
              onClick={() => handleShare('facebook')}
            >
              <Facebook className="h-4 w-4 text-[#1877F2]" />
              <span>Facebook</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20"
              onClick={() => handleShare('twitter')}
            >
              <Twitter className="h-4 w-4 text-[#1DA1F2]" />
              <span>Twitter</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20"
              onClick={() => handleShare('linkedin')}
            >
              <Linkedin className="h-4 w-4 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center justify-center space-x-2"
              onClick={copyToClipboard}
            >
              <Link2 className="h-4 w-4" />
              <span>Copy Link</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
