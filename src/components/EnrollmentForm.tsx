import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { FormFields } from "./enrollment/FormFields";
import { SuccessCard } from "./enrollment/SuccessCard";
import { ReferralHandler } from "./enrollment/ReferralHandler";
import { createRazorpayOptions } from "./enrollment/RazorpayConfig";
import { initializeRazorpay } from "@/utils/razorpayService";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Please enter your full address"),
  referralCode: z.string().optional(),
});

interface EnrollmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  programTitle: string;
  amount: number;
  selectedPlan: string;
}

export const EnrollmentForm = ({ 
  isOpen, 
  onClose, 
  programTitle, 
  amount,
  selectedPlan 
}: EnrollmentFormProps) => {
  const { toast } = useToast();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [finalAmount, setFinalAmount] = useState(amount);
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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsProcessing(true);

      const options = createRazorpayOptions(
        finalAmount,
        programTitle,
        selectedPlan,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
        }
      );

      const razorpayResult = await initializeRazorpay(options);
      
      if (razorpayResult) {
        setPaymentSuccess(true);
        toast({
          title: "Payment Successful! 🎉",
          description: "Welcome to Dev Mentor Hub! You can now join our WhatsApp group.",
        });
      }
    } catch (error: any) {
      console.error("Razorpay error:", error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
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
                Enroll in {programTitle} - {selectedPlan} Plan (₹{finalAmount})
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormFields form={form} />
              <ReferralHandler 
                form={form} 
                amount={amount} 
                onAmountChange={setFinalAmount} 
              />
              <div className="text-right font-semibold text-purple-600">
                Total Amount: ₹{finalAmount}
              </div>
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Pay ₹${finalAmount}`}
              </Button>
            </form>
          </>
        ) : (
          <SuccessCard onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};