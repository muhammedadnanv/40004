
import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { FormFields } from "./enrollment/FormFields";
import { SuccessCard } from "./enrollment/SuccessCard";
import { validateReferralCode, getReferralSuccessMessage } from "@/utils/referralUtils";
import { formSchema, createDodoPaymentOptions } from "./enrollment/RazorpayConfig";
import type { FormData } from "./enrollment/RazorpayConfig";
import { PaymentAlert } from "./enrollment/PaymentAlert";
import { ReferralSection } from "./enrollment/ReferralSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { sendWelcomeNotification } from "@/utils/notificationService";
import { handleWhatsAppUPIPayment, sendPaymentConfirmationViaWhatsApp } from "@/utils/whatsappPaymentService";
import type { StudentData } from "@/utils/whatsappPaymentService";

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
  const [finalAmount, setFinalAmount] = useState(initialAmount);
  const [referralApplied, setReferralApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      duration: undefined,
      referralCode: "",
    },
  });

  const watchedDuration = form.watch("duration");
  const currentPrice = watchedDuration === "5-week" ? 399 : watchedDuration === "10-week" ? 999 : initialAmount;

  const handleReferralCode = () => {
    const referralCode = form.getValues("referralCode");
    const { isValid, discountPercentage } = validateReferralCode(referralCode || '');

    if (referralCode && isValid && !referralApplied) {
      const baseAmount = currentPrice;
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

  const handlePaymentProceed = async () => {
    const data = form.getValues();
    const finalPaymentAmount = referralApplied ? finalAmount : currentPrice;
    
    try {
      setIsProcessing(true);
      
      // Prepare student data
      const studentData: StudentData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        program: programTitle,
        duration: data.duration,
        referralCode: data.referralCode
      };
      
      // Handle WhatsApp UPI payment flow
      const success = handleWhatsAppUPIPayment(studentData, finalPaymentAmount);
      
      if (success) {
        // Send welcome notification
        try {
          await sendWelcomeNotification(data.email, data.name);
        } catch (error) {
          console.error("Error sending welcome notification:", error);
        }
        
        // Set payment success after a delay to show the process
        setTimeout(() => {
          setPaymentSuccess(true);
          setIsProcessing(false);
        }, 3000);
      } else {
        setIsProcessing(false);
      }
    } catch (error: any) {
      console.error("Payment processing error:", error);
      setIsProcessing(false);
      toast({
        title: "Payment Processing Error",
        description: error.message || "Something went wrong with the payment process",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsProcessing(true);
      setShowPaymentAlert(true);
    } catch (error: any) {
      console.error("Payment initialization error:", error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  // Update final amount when duration changes
  React.useEffect(() => {
    if (!referralApplied) {
      setFinalAmount(currentPrice);
    }
  }, [currentPrice, referralApplied]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[95%] max-w-[425px] mx-auto rounded-lg p-4 sm:p-6">
          {!paymentSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  Enroll in {programTitle}
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Complete the form below to enroll in the program. Your details will be sent to our team via WhatsApp.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
                  <FormFields form={form} />
                  <ReferralSection 
                    form={form}
                    onApplyReferral={handleReferralCode}
                    finalAmount={referralApplied ? finalAmount : currentPrice}
                    referralApplied={referralApplied}
                  />
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

      <PaymentAlert 
        isOpen={showPaymentAlert}
        onClose={() => setShowPaymentAlert(false)}
        onProceed={handlePaymentProceed}
      />
    </>
  );
};
