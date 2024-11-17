import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { FormFields } from "./enrollment/FormFields";
import { PaymentDetails } from "./enrollment/PaymentDetails";
import { SuccessCard } from "./enrollment/SuccessCard";
import { initializeRazorpay, verifyPayment } from "@/utils/razorpayService";
import { validateReferralCode } from "@/utils/referralUtils";

const formSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name should only contain letters and spaces"),
  email: z.string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .regex(/^\+?[\d\s-]+$/, "Invalid phone number format"),
  address: z.string()
    .min(10, "Please enter your full address")
    .max(200, "Address is too long"),
  referralCode: z.string().optional(),
});

interface EnrollmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  programTitle: string;
  amount: number;
}

export const EnrollmentForm = ({ isOpen, onClose, programTitle, amount }: EnrollmentFormProps) => {
  const { toast } = useToast();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [finalAmount, setFinalAmount] = useState(amount);
  const [referralApplied, setReferralApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotalAmount = (baseAmount: number) => {
    const tax = baseAmount * 0.05;
    const serviceFee = baseAmount * 0.09;
    return baseAmount + tax + serviceFee;
  };

  const handleReferralCode = async () => {
    const referralCode = form.getValues("referralCode");
    
    try {
      const response = await fetch('/api/validate-referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ referralCode }),
      });

      const data = await response.json();

      if (data.isValid && !referralApplied) {
        const discountAmount = amount * data.discountPercentage;
        const newFinalAmount = Math.max(0, amount - discountAmount);
        
        setFinalAmount(newFinalAmount);
        setReferralApplied(true);
        
        toast({
          title: "Referral Code Applied! 🎉",
          description: `${(data.discountPercentage * 100).toFixed(0)}% discount applied.`,
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate referral code. Please try again.",
        variant: "destructive",
      });
    }
  };

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
      const totalAmount = calculateTotalAmount(finalAmount);
      
      // Save enrollment data first
      const enrollmentResponse = await fetch('/api/save-enrollment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          programTitle,
          amount: totalAmount,
          referralApplied,
        }),
      });

      if (!enrollmentResponse.ok) {
        throw new Error('Failed to save enrollment data');
      }

      const { enrollmentId } = await enrollmentResponse.json();
      
      const options = {
        amount: totalAmount * 100,
        name: "Dev Mentor Hub",
        description: `Enrollment for ${programTitle}`,
        handler: async (response: any) => {
          try {
            await verifyPayment(
              response.razorpay_payment_id, 
              response.razorpay_order_id || '', 
              response.razorpay_signature || ''
            );

            // Update enrollment status
            await fetch(`/api/update-enrollment-status/${enrollmentId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                status: 'completed',
                paymentId: response.razorpay_payment_id,
              }),
            });

            setPaymentSuccess(true);
            setIsProcessing(false);
            toast({
              title: "Payment Successful! 🎉",
              description: "Welcome to Dev Mentor Hub! You can now join our WhatsApp group.",
            });
          } catch (error) {
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
        modal: { ondismiss: () => setIsProcessing(false) },
      };

      await initializeRazorpay(options);
    } catch (error: any) {
      console.error("Enrollment/Payment error:", error);
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormFields form={form} />
              <PaymentDetails 
                finalAmount={finalAmount}
                referralApplied={referralApplied}
                isProcessing={isProcessing}
                onReferralApply={handleReferralCode}
                form={form}
              />
            </form>
          </>
        ) : (
          <SuccessCard onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};