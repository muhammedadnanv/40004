
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { TagIcon } from "lucide-react";
import { getCurrentReferralCode } from "@/utils/referralUtils";

interface ReferralSectionProps {
  form: any;
  onApplyReferral: () => void;
  finalAmount: number;
  referralApplied: boolean;
}

export const ReferralSection = ({ 
  form, 
  onApplyReferral, 
  finalAmount,
  referralApplied 
}: ReferralSectionProps) => {
  const { toast } = useToast();
  const currentCode = getCurrentReferralCode();
  
  const suggestCode = () => {
    form.setValue("referralCode", currentCode);
    toast({
      title: "Referral code applied!",
      description: `Added code ${currentCode} to the form. Click Apply Code to activate.`,
      variant: "default",
    });
  };
  
  return (
    <div className="space-y-3 border-t border-b py-4 my-4 border-accent/20">
      <div className="flex items-center gap-2 text-accent">
        <TagIcon className="h-5 w-5" />
        <h3 className="font-medium">Apply Referral Code</h3>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Input 
            placeholder="Enter referral code" 
            {...form.register("referralCode")}
            className="border-accent/30 focus:border-accent transition-colors w-full text-sm sm:text-base"
          />
        </div>
        <Button 
          type="button" 
          variant="referral" 
          onClick={onApplyReferral}
          className="w-full sm:w-auto text-sm sm:text-base whitespace-nowrap"
          disabled={referralApplied}
        >
          Apply Code
        </Button>
      </div>
      
      {!referralApplied && (
        <div className="text-sm text-muted-foreground">
          <button 
            type="button" 
            onClick={suggestCode} 
            className="text-accent underline hover:text-accent/80"
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
};
