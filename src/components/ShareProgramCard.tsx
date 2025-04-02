import { Share2, Facebook, Twitter, Linkedin, Link2, TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { getCurrentReferralCode } from "@/utils/referralUtils";
import { useState } from "react";

interface ShareProgramCardProps {
  program: {
    title: string;
    description: string;
  };
}

export const ShareProgramCard = ({ program }: ShareProgramCardProps) => {
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);
  const websiteUrl = window.location.origin;
  
  // Using the current active referral code
  const referralCode = getCurrentReferralCode();
  const shareUrl = `${websiteUrl}?program=${encodeURIComponent(program.title)}&ref=${referralCode}&utm_source=share&utm_medium=referral&utm_campaign=program_share`;
  
  // Create a more concise referral-focused share text
  const shareText = `🎓 Join me in the ${program.title} program!\n\nUse my referral code "${referralCode}" to get 10% off. Let's learn together! 🚀\n\n${shareUrl}`;
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`
  };

  const handleShare = async (platform: string) => {
    setIsSharing(true);
    
    try {
      // Try to use native share on mobile if available
      if (platform === 'native' && navigator.share) {
        await navigator.share({
          title: `${program.title} - Dev Mentor Hub`,
          text: shareText,
          url: shareUrl
        });
        
        toast({
          title: "Shared successfully!",
          description: "Thanks for spreading the word! Your referral code is included in the share.",
        });
        return;
      }
      
      // Otherwise use platform-specific sharing
      const shareWindow = window.open(
        shareLinks[platform as keyof typeof shareLinks],
        'share',
        'width=600,height=400,location=0,menubar=0'
      );
  
      if (shareWindow) {
        shareWindow.focus();
        toast({
          title: `Sharing on ${platform}!`,
          description: "Thanks for spreading the word! Your referral code is included in the share.",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      if ((error as Error).name !== 'AbortError') {
        toast({
          title: "Sharing failed",
          description: "Please try another sharing method",
          variant: "destructive",
        });
      }
    } finally {
      setIsSharing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}`);
      toast({
        title: "Link & Referral Code Copied!",
        description: "Share this with your friends to give them a discount!",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      toast({
        title: "Referral Code Copied!",
        description: `Code ${referralCode} copied to clipboard. Share it with friends!`,
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full hover:bg-[#0097A7]/10 hover:text-[#0097A7] transition-all duration-300"
          disabled={isSharing}
          aria-label="Share this program"
        >
          {isSharing ? (
            <span className="animate-spin" aria-hidden="true">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
          ) : (
            <Share2 className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={copyReferralCode} className="cursor-pointer font-medium">
          <TagIcon className="mr-2 h-4 w-4" />
          Copy Referral Code
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {navigator.share && (
          <DropdownMenuItem onClick={() => handleShare('native')} className="cursor-pointer">
            <Share2 className="mr-2 h-4 w-4" />
            Share Now
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => handleShare('facebook')} className="cursor-pointer">
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('twitter')} className="cursor-pointer">
          <Twitter className="mr-2 h-4 w-4" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('linkedin')} className="cursor-pointer">
          <Linkedin className="mr-2 h-4 w-4" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
          <Link2 className="mr-2 h-4 w-4" />
          Copy Link with Code
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
