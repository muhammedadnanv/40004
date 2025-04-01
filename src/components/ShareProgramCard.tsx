
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

interface ShareProgramCardProps {
  program: {
    title: string;
    description: string;
  };
}

export const ShareProgramCard = ({ program }: ShareProgramCardProps) => {
  const { toast } = useToast();
  const websiteUrl = window.location.origin;
  
  // Using the current active referral code
  const referralCode = getCurrentReferralCode();
  const shareUrl = `${websiteUrl}?program=${encodeURIComponent(program.title)}&ref=${referralCode}`;
  
  // Create a more concise referral-focused share text
  const shareText = `🎓 Join me in the ${program.title} program!\n\nUse my referral code "${referralCode}" to get 10% off. Let's learn together! 🚀\n\n${shareUrl}`;
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`
  };

  const handleShare = (platform: string) => {
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
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={copyReferralCode} className="cursor-pointer font-medium">
          <TagIcon className="mr-2 h-4 w-4" />
          Copy Referral Code
        </DropdownMenuItem>
        <DropdownMenuSeparator />
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
