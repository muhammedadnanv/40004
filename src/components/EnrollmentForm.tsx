import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { FormFields } from "./enrollment/FormFields";
import { SuccessCard } from "./enrollment/SuccessCard";
import { generateAndDownloadPDF } from "@/utils/generatePDF";
import { 
  initializeRazorpay, 
  verifyPayment, 
  RazorpayResponse, 
  RazorpayOptions 
} from "@/utils/razorpayService";
import { validateReferralCode } from "@/utils/referralUtils";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Please enter your full address"),
  referralCode: z.string().optional(),
});

// Separate component props
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
  amount 
}: EnrollmentFormProps) => {
  const { toast } = useToast();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [finalAmount, setFinalAmount] = useState(amount);
  const [referralApplied, setReferralApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
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
      const discountAmount = amount * discountPercentage;
      const newFinalAmount = Math.max(0, amount - discountAmount);
      
      setFinalAmount(newFinalAmount);
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

  // Main form submission method
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsProcessing(true);

      const options: RazorpayOptions = {
        key: "rzp_live_5JYQnqKRnKhB5y",
        amount: finalAmount * 100, // Amount in paise
        currency: "INR",
        name: "Dev Mentor Hub",
        description: `Enrollment for ${programTitle}`,
        handler: async (response: RazorpayResponse) => {
          try {
            // Verify payment on the server
            await verifyPayment(
              response.razorpay_payment_id, 
              response.razorpay_order_id || '', 
              response.razorpay_signature || ''
            );

            // Payment successful
            setPaymentSuccess(true);
            setIsProcessing(false);
            toast({
              title: "Payment Successful! 🎉",
              description: "Welcome to Dev Mentor Hub! You can now join our WhatsApp group.",
            });
          } catch (verificationError) {
            setIsProcessing(false);
            toast({
              title: "Payment Verification Failed",
              description: "Your payment could not be verified. Please contact support.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        theme: {
          color: "#4A00E0",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      // Initialize and open Razorpay checkout
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
      <DialogContent className="w-[95%] max-w-[425px] mx-auto rounded-lg">
        {!paymentSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Enroll in {programTitle}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormFields form={form} />
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
                <div className="text-right font-semibold text-purple-600">
                  Total Amount: ₹{finalAmount}
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300"
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
