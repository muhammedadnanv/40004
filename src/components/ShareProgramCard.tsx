import { Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ShareProgramCardProps {
  program: {
    title: string;
    description: string;
  };
}

export const ShareProgramCard = ({ program }: ShareProgramCardProps) => {
  const websiteUrl = window.location.origin;
  const shareUrl = `${websiteUrl}?program=${encodeURIComponent(program.title)}`;
  
  const shareText = `Join me in mastering ${program.title} with expert mentorship! 🚀`;
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
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
      toast.success(`Sharing on ${platform}! Thank you for spreading the word!`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full hover:bg-[#4A00E0]/10 hover:text-[#4A00E0] transition-all duration-300"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};