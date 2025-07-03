
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Share2, Copy, MessageCircle, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ShareProgramCardProps {
  program: {
    title: string;
    description: string;
    duration: string;
    skills: string[];
    category: string;
    regularPrice: number;
  };
  isOpen?: boolean;
  onClose?: () => void;
}

export const ShareProgramCard = ({ program, isOpen, onClose }: ShareProgramCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen || false);
  
  const shareUrl = window.location.href;
  const shareText = `Check out this amazing ${program.title} program! Learn ${program.skills.join(', ')} in just ${program.duration}. Perfect for developers looking to advance their skills.`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out this ${program.title} program`);
    const body = encodeURIComponent(`${shareText}\n\nLearn more: ${shareUrl}`);
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    if (onClose) onClose();
  };

  if (isOpen !== undefined) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Share {program.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Help others discover this amazing program!
            </p>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={handleCopyLink}
              >
                <Copy className="w-4 h-4" />
                Copy Link
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={handleWhatsAppShare}
              >
                <MessageCircle className="w-4 h-4" />
                Share on WhatsApp
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={handleEmailShare}
              >
                <Mail className="w-4 h-4" />
                Share via Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-gray-500 hover:text-primary"
      onClick={() => setIsDialogOpen(true)}
    >
      <Share2 className="w-4 h-4 mr-1" />
      Share
    </Button>
  );
};
