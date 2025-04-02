
import { Share2, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useCallback } from "react";

interface ShareSectionProps {
  title?: string;
  description?: string;
  url?: string;
  disabled?: boolean;
}

export const ShareSection = ({ 
  title = "Dev Mentor Hub",
  description = "Discover top mentorship programs for tech professionals",
  url,
  disabled = false
}: ShareSectionProps) => {
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

  // Use the Web Share API when available, with fallback to clipboard copy
  const handleShare = useCallback(async () => {
    if (disabled) return;
    
    setIsSharing(true);
    
    try {
      const shareUrl = url || window.location.href;
      
      // Add UTM parameters for tracking
      const shareUrlWithUTM = new URL(shareUrl);
      if (!shareUrlWithUTM.searchParams.has('utm_source')) {
        shareUrlWithUTM.searchParams.append('utm_source', 'share_button');
        shareUrlWithUTM.searchParams.append('utm_medium', 'web');
        shareUrlWithUTM.searchParams.append('utm_campaign', 'user_share');
      }
      
      // Check if Web Share API is available and supported
      if (navigator.share && navigator.canShare) {
        const shareData = {
          title,
          text: description,
          url: shareUrlWithUTM.toString(),
        };
        
        // Verify if the data can be shared on this device
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          
          toast({
            title: "Shared successfully!",
            description: "Thanks for sharing Dev Mentor Hub.",
          });
        } else {
          // Fallback to clipboard if share data not supported
          await navigator.clipboard.writeText(shareUrlWithUTM.toString());
          
          toast({
            title: "Link copied to clipboard!",
            description: "Share the link with your friends.",
          });
        }
      } else {
        // Fallback to clipboard for browsers without Web Share API
        await navigator.clipboard.writeText(shareUrlWithUTM.toString());
        
        toast({
          title: "Link copied to clipboard!",
          description: "Share the link with your friends.",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      
      // Only show error if it's not a user cancellation
      if ((error as Error).name !== 'AbortError') {
        toast({
          title: "Sharing failed",
          description: "Please try copying the link manually.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSharing(false);
    }
  }, [title, description, url, disabled, toast]);

  // If disabled, return null to remove from DOM
  if (disabled) {
    return null;
  }

  return (
    <div className="flex items-center justify-center my-6">
      <Button
        onClick={handleShare}
        className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-full"
        disabled={isSharing}
        aria-label="Share this page"
      >
        {isSharing ? (
          <>
            <span className="animate-spin mr-2" aria-hidden="true">
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
            Processing...
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" />
            Share
          </>
        )}
      </Button>
    </div>
  );
};
