
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { TagIcon } from "lucide-react";
import { getCurrentReferralCode } from "@/utils/referralUtils";
import { useState, useEffect, memo } from "react";

interface ReferralSectionProps {
  form: any;
  onApplyReferral: () => void;
  finalAmount: number;
  referralApplied: boolean;
}

// Using memo to prevent unnecessary re-renders
export const ReferralSection = memo(({ 
  form, 
  onApplyReferral, 
  finalAmount,
  referralApplied 
}: ReferralSectionProps) => {
  const { toast } = useToast();
  const [currentCode, setCurrentCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Load the referral code on component mount
  useEffect(() => {
    const code = getCurrentReferralCode();
    setCurrentCode(code);
    
    // Auto-apply referral code if present in URL
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode && !referralApplied) {
      form.setValue("referralCode", refCode);
    }
  }, []);
  
  const suggestCode = () => {
    if (!currentCode) return;
    
    form.setValue("referralCode", currentCode);
    toast({
      title: "Discount code applied!",
      description: `Added code ${currentCode} to the form. Click Apply Code to activate.`,
      variant: "default",
    });
  };
  
  const handleApplyReferral = async () => {
    if (referralApplied) return;
    setIsLoading(true);
    
    try {
      await onApplyReferral();
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-3 border-t border-b py-4 my-4 border-accent/20">
      <div className="flex items-center gap-2 text-accent">
        <TagIcon className="h-5 w-5" />
        <h3 className="font-medium">Apply Discount Code</h3>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Input 
            placeholder="Enter discount code" 
            {...form.register("referralCode")}
            className="border-accent/30 focus:border-accent transition-colors w-full text-sm sm:text-base"
            aria-label="Discount code"
          />
        </div>
        <Button 
          type="button" 
          variant="referral" 
          onClick={handleApplyReferral}
          className="w-full sm:w-auto text-sm sm:text-base whitespace-nowrap"
          disabled={referralApplied || isLoading}
          aria-label="Apply discount code"
        >
          {isLoading ? "Applying..." : "Apply Code"}
        </Button>
      </div>
      
      {!referralApplied && currentCode && (
        <div className="text-sm text-muted-foreground">
          <button 
            type="button" 
            onClick={suggestCode} 
            className="text-accent underline hover:text-accent/80"
            aria-label="Suggest discount code"
          >
            Try code: {currentCode}
          </button>
        </div>
      )}
      
      <div className="text-right font-semibold text-accent text-sm sm:text-base">
        Total Amount: ₹{finalAmount}
      </div>
    </div>
  );
});

// Add display name for better debugging
ReferralSection.displayName = "ReferralSection";
