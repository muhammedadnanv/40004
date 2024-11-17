import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PaymentDetailsProps {
  finalAmount: number;
  referralApplied: boolean;
  isProcessing: boolean;
  onReferralApply: () => void;
  form: any;
}

export const PaymentDetails = ({ 
  finalAmount, 
  referralApplied, 
  isProcessing, 
  onReferralApply,
  form 
}: PaymentDetailsProps) => {
  const tax = finalAmount * 0.05; // 5% tax
  const serviceFee = finalAmount * 0.09; // 9% service fee
  const totalAmount = finalAmount + tax + serviceFee;

  return (
    <div className="space-y-4">
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
          onClick={onReferralApply}
          className="border-purple-200 hover:bg-purple-50 text-purple-600 hover:text-purple-700 w-full sm:w-auto"
        >
          Apply
        </Button>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Program Fee:</span>
          <span>₹{finalAmount}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (5%):</span>
          <span>₹{tax.toFixed(0)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Fee (9%):</span>
          <span>₹{serviceFee.toFixed(0)}</span>
        </div>
        <div className="flex justify-between font-semibold text-purple-600 text-base border-t border-gray-200 pt-2 mt-2">
          <span>Total Amount:</span>
          <span>₹{totalAmount.toFixed(0)}</span>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300"
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Proceed to Payment"}
      </Button>
    </div>
  );
};