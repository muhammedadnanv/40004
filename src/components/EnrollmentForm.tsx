import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { FormFields } from "./enrollment/FormFields";
import { SuccessCard } from "./enrollment/SuccessCard";
import { initializeRazorpay } from "@/utils/razorpayService";
import { validateReferralCode } from "@/utils/referralUtils";
import { formSchema, createRazorpayOptions } from "./enrollment/RazorpayConfig";
import type { FormData } from "./enrollment/RazorpayConfig";

interface EnrollmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  programTitle: string;
  amount: number;
}

export const EnrollmentForm = ({ 
  isOpen, 
  onClose, 
  programTitle, 
  amount: initialAmount 
}: EnrollmentFormProps) => {
  const { toast } = useToast();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [finalAmount, setFinalAmount] = useState(programTitle === "ManyChat Automation" ? 599 : initialAmount);
  const [referralApplied, setReferralApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      referralCode: "",
    },
  });

  const handleReferralCode = () => {
    const referralCode = form.getValues("referralCode");
    const { isValid, discountPercentage } = validateReferralCode(referralCode || '');

    if (referralCode && isValid && !referralApplied) {
      const baseAmount = programTitle === "ManyChat Automation" ? 599 : initialAmount;
      const discountAmount = baseAmount * discountPercentage;
      const newFinalAmount = Math.max(0, baseAmount - discountAmount);
      
      setFinalAmount(newFinalAmount);
      setReferralApplied(true);
      
      toast({
        title: "Referral Code Applied! 🎉",
        description: getReferralSuccessMessage(discountPercentage),
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

  const onSubmit = async (data: FormData) => {
    try {
      setIsProcessing(true);

      const options = createRazorpayOptions(
        data,
        finalAmount,
        programTitle,
        () => {
          setPaymentSuccess(true);
          setIsProcessing(false);
          toast({
            title: "Payment Successful! 🎉",
            description: "Welcome to Dev Mentor Hub! You can now join our WhatsApp group.",
          });
        },
        (error) => {
          setIsProcessing(false);
          toast({
            title: "Payment Failed",
            description: error.message || "Something went wrong with the payment",
            variant: "destructive",
          });
        }
      );

      await initializeRazorpay(options);
    } catch (error: any) {
      console.error("Razorpay initialization error:", error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-[425px] mx-auto rounded-lg p-4 sm:p-6">
        {!paymentSuccess ? (
          <>
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Enroll in {programTitle}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                <FormFields form={form} />
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
                    onClick={handleReferralCode}
                    className="border-purple-200 hover:bg-purple-50 text-purple-600 hover:text-purple-700 w-full sm:w-auto text-sm sm:text-base whitespace-nowrap"
                  >
                    Apply Code
                  </Button>
                </div>
                <div className="text-right font-semibold text-purple-600 text-sm sm:text-base">
                  Total Amount: ₹{finalAmount}
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 text-sm sm:text-base py-2 sm:py-3"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Proceed to Payment"}
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <SuccessCard onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};
