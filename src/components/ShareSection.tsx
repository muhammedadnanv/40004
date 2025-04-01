
import { Share2, Facebook, Twitter, Linkedin, Link2, TagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { getCurrentReferralCode, VALID_REFERRAL_CODES } from "@/utils/referralUtils";
import { useState } from "react";

export const ShareSection = () => {
  const { toast } = useToast();
  const websiteUrl = window.location.origin;
  const [displayCode, setDisplayCode] = useState(getCurrentReferralCode());
  
  const shareText = `🎓 Join Dev Mentor Hub and transform your development career with personalized mentorship! Use my referral code "${displayCode}" for 10% off. Let's learn together! 🚀\n\n${websiteUrl}?ref=${displayCode}`;
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}?ref=${displayCode}&quote=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(websiteUrl)}?ref=${displayCode}&summary=${encodeURIComponent(shareText)}`
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
        description: "Thanks for spreading the word! Your referral code is included.",
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
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
  
  const generateNewCode = () => {
    const codes = Object.keys(VALID_REFERRAL_CODES);
    const randomCode = codes[Math.floor(Math.random() * codes.length)];
    setDisplayCode(randomCode);
    toast({
      title: "New Referral Code Generated!",
      description: `Share code ${randomCode} with your friends to give them a discount!`,
    });
  };

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(displayCode);
      toast({
        title: "Referral Code Copied!",
        description: `Code ${displayCode} copied to clipboard. Share it with friends!`,
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
    <section aria-label="share" className="py-16 md:py-24 lg:py-32 bg-gradient-to-r from-[#E5E5E5] via-white to-[#E5E5E5]">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl font-extralight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#2E4053] to-[#0097A7]">
          Share Dev Mentor Hub & Earn Rewards
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-[#0097A7]/20">
          <div className="flex flex-col items-center gap-4 mb-6">
            <TagIcon className="h-8 w-8 text-[#0097A7]" />
            <div>
              <p className="text-lg font-medium text-[#2E4053]">Your Referral Code</p>
              <div className="flex items-center justify-center gap-4 mt-2">
                <span className="text-2xl font-bold text-[#0097A7] bg-[#0097A7]/10 px-4 py-2 rounded-md">
                  {displayCode}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyReferralCode}
                  className="hover:bg-[#0097A7]/10 hover:text-[#0097A7]"
                >
                  <Link2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            Share your unique referral code with friends and help them save 10% on their enrollment. 
            Spread the word about Dev Mentor Hub and empower more developers to achieve their career goals!
          </p>
          <Button 
            variant="referral" 
            className="mb-6"
            onClick={generateNewCode}
          >
            Generate New Code
          </Button>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-[#0097A7]/10 hover:text-[#0097A7] transition-colors"
              onClick={() => handleShare('facebook')}
            >
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-[#0097A7]/10 hover:text-[#0097A7] transition-colors"
              onClick={() => handleShare('twitter')}
            >
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-[#0097A7]/10 hover:text-[#0097A7] transition-colors"
              onClick={() => handleShare('linkedin')}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-[#0097A7]/10 hover:text-[#0097A7] transition-colors"
              onClick={copyToClipboard}
            >
              <Link2 className="mr-2 h-4 w-4" />
              Copy Message
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
