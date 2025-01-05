import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Input 
            placeholder="Enter referral code" 
            {...form.register("referralCode")}
            className="border-purple-200 focus:border-purple-400 transition-colors w-full text-sm sm:text-base"
          />
        </div>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onApplyReferral}
          className="border-purple-200 hover:bg-purple-50 text-purple-600 hover:text-purple-700 w-full sm:w-auto text-sm sm:text-base whitespace-nowrap"
          disabled={referralApplied}
        >
          Apply Code
        </Button>
      </div>
      <div className="text-right font-semibold text-purple-600 text-sm sm:text-base">
        Total Amount: ₹{finalAmount}
      </div>
    </>
  );
};