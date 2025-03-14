
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Linkedin, Link2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const websiteUrl = window.location.origin;
  
  // Create project sharing URL with UTM parameters for tracking
  const shareUrl = `${websiteUrl}/#project-ideas?project=${encodeURIComponent(project.name)}&category=${encodeURIComponent(project.category)}&utm_source=share&utm_medium=social&utm_campaign=project_sharing`;
  
  // Create share text with SEO-friendly content including hashtags
  const shareText = `Check out this ${project.difficulty} level ${project.category} project idea: ${project.name} - ${project.description.substring(0, 100)}... #coding #developer #${project.category.toLowerCase().replace(/\s+/g, '')} #devmentorhub`;
  
  // Create share links with utm parameters for better tracking
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=coding,${project.category.toLowerCase().replace(/\s+/g, '')}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`
  };

  // Listen for window resize to handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Create structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": `${project.name} - ${project.difficulty} Level ${project.category} Project`,
    "description": project.description,
    "learningResourceType": "Project Idea",
    "educationalLevel": project.difficulty,
    "about": {
      "@type": "Thing",
      "name": project.category
    }
  };

  return (
    <>
      <Helmet>
        <meta name="description" content={`${project.name} - A ${project.difficulty} level ${project.category} project idea. ${project.description.substring(0, 150)}...`} />
        <meta property="og:title" content={`${project.name} - ${project.difficulty} ${project.category} Project`} />
        <meta property="og:description" content={project.description.substring(0, 200)} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.name} - ${project.difficulty} ${project.category} Project`} />
        <meta name="twitter:description" content={project.description.substring(0, 200)} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-md max-w-[95vw] rounded-lg p-4 sm:p-6" aria-labelledby="share-dialog-title">
          <div className="flex items-center justify-between mb-2">
            <DialogTitle id="share-dialog-title" className="text-lg sm:text-xl font-semibold">
              Share Project Idea
            </DialogTitle>
            <DialogClose asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="rounded-full h-8 w-8 sm:h-10 sm:w-10 hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          
          <DialogDescription className="text-sm sm:text-base">
            Share this {project.difficulty} level {project.category} project with your network
          </DialogDescription>
          
          <div className="p-2 sm:p-4">
            <h3 className="font-semibold text-base sm:text-lg mb-1">{project.name}</h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-4 line-clamp-3">{project.description}</p>
            
            <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'sm:flex sm:flex-wrap sm:gap-2'} mb-2`}>
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 h-10 sm:h-auto text-sm sm:text-base"
                onClick={() => handleShare('facebook')}
              >
                <Facebook className="h-4 w-4 text-[#1877F2]" />
                <span className="hidden sm:inline">Facebook</span>
                <span className="sm:hidden">Share</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 h-10 sm:h-auto text-sm sm:text-base"
                onClick={() => handleShare('twitter')}
              >
                <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                <span className="hidden sm:inline">Twitter</span>
                <span className="sm:hidden">Tweet</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 h-10 sm:h-auto text-sm sm:text-base"
                onClick={() => handleShare('linkedin')}
              >
                <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                <span className="hidden sm:inline">LinkedIn</span>
                <span className="sm:hidden">Post</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2 h-10 sm:h-auto text-sm sm:text-base"
                onClick={copyToClipboard}
              >
                <Link2 className="h-4 w-4" />
                <span className="hidden sm:inline">Copy Link</span>
                <span className="sm:hidden">Copy</span>
              </Button>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">
                Sharing helps the community discover more project ideas
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
