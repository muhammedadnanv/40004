import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateReferralCode } from "@/utils/referralUtils";
import { useToast } from "@/hooks/use-toast";

interface ReferralHandlerProps {
  form: UseFormReturn<any>;
  amount: number;
  onAmountChange: (newAmount: number) => void;
}

export const ReferralHandler = ({ form, amount, onAmountChange }: ReferralHandlerProps) => {
  const { toast } = useToast();
  const [referralApplied, setReferralApplied] = useState(false);

  const handleReferralCode = () => {
    const referralCode = form.getValues("referralCode");
    const { isValid, discountPercentage } = validateReferralCode(referralCode || '');

    if (referralCode && isValid && !referralApplied) {
      const discountAmount = amount * discountPercentage;
      const newFinalAmount = Math.max(0, amount - discountAmount);
      
      onAmountChange(newFinalAmount);
      setReferralApplied(true);
      
      toast({
        title: "Referral Code Applied! 🎉",
        description: `${(discountPercentage * 100).toFixed(0)}% discount applied.`,
      });
    } else if (referralApplied) {
      toast({
        title: "Referral Code Already Applied",
        description: "You've already used a referral code.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Invalid Referral Code",
        description: "Please enter a valid referral code.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex-1">
        <Input 
          placeholder="Enter referral code" 
          {...form.register("referralCode")}
          className="border-purple-200 focus:border-purple-400 transition-colors w-full"
        />
      </div>
      <Button 
        type="button" 
        variant="outline" 
        onClick={handleReferralCode}
        className="border-purple-200 hover:bg-purple-50 text-purple-600 hover:text-purple-700 w-full sm:w-auto"
      >
        Apply
      </Button>
    </div>
  );
};