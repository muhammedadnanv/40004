import { Share2, Facebook, Twitter, Linkedin, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export const ShareSection = () => {
  const { toast } = useToast();
  const websiteUrl = window.location.origin;
  const shareText = `🎓 Join Dev Mentor Hub and transform your development career with personalized mentorship! Let's learn together! 🚀\n\n${websiteUrl}`;
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}&quote=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(websiteUrl)}&summary=${encodeURIComponent(shareText)}`
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
        description: "Thanks for spreading the word!",
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Link Copied!",
        description: "Share this with your friends!",
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
    <section aria-label="share" className="py-16 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 via-white to-purple-50">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl font-extralight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
          Share Dev Mentor Hub
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Help us spread the word about Dev Mentor Hub and empower more developers to achieve their career goals through personalized mentorship.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            className="hover:bg-purple-50 hover:text-purple-600 transition-colors"
            onClick={() => handleShare('facebook')}
          >
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="hover:bg-purple-50 hover:text-purple-600 transition-colors"
            onClick={() => handleShare('twitter')}
          >
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="hover:bg-purple-50 hover:text-purple-600 transition-colors"
            onClick={() => handleShare('linkedin')}
          >
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="hover:bg-purple-50 hover:text-purple-600 transition-colors"
            onClick={copyToClipboard}
          >
            <Link2 className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
        </div>
      </div>
    </section>
  );
};