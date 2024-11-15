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

// Separate types into their own section for better readability
type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal?: {
    ondismiss: () => void;
  };
};

// Validate Razorpay global type
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, handler: (response: any) => void) => void;
    };
  }
}

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Please enter your full address"),
  couponCode: z.string().optional(),
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
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      couponCode: "",
    },
  });

  // Separate method for coupon handling
  const handleCouponCode = () => {
    const couponCode = form.getValues("couponCode");
    if (couponCode === "comicfix500" && !couponApplied) {
      setFinalAmount(prev => Math.max(0, prev - 500));
      setCouponApplied(true);
      toast({
        title: "Coupon Applied Successfully! 🎉",
        description: "₹500 has been deducted from your total amount.",
      });
      generateAndDownloadPDF();
    } else if (couponApplied) {
      toast({
        title: "Coupon already applied",
        description: "You've already used a coupon code.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Invalid coupon",
        description: "Please enter a valid coupon code.",
        variant: "destructive",
      });
    }
  };

  // Separate method for payment success
  const handlePaymentSuccess = (response: RazorpayResponse) => {
    if (response.razorpay_payment_id) {
      setPaymentSuccess(true);
      setIsProcessing(false);
      toast({
        title: "Payment Successful! 🎉",
        description: "Welcome to Dev Mentor Hub! You can now join our WhatsApp group.",
      });
    }
  };

  // Separate method for payment error
  const handlePaymentError = (error: any) => {
    console.error("Payment failed:", error);
    toast({
      title: "Payment Failed",
      description: error?.description || "Something went wrong with the payment. Please try again.",
      variant: "destructive",
    });
    setIsProcessing(false);
  };

  // Main form submission method
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsProcessing(true);

      // Verify Razorpay SDK is loaded
      if (typeof window.Razorpay === "undefined") {
        throw new Error("Razorpay SDK failed to load. Please check your internet connection and try again.");
      }

      const options: RazorpayOptions = {
        key: "rzp_live_5JYQnqKRnKhB5y",
        amount: finalAmount * 100, // Amount in paise
        currency: "INR",
        name: "Dev Mentor Hub",
        description: `Enrollment for ${programTitle}`,
        handler: handlePaymentSuccess,
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

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', handlePaymentError);
      razorpay.open();
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
                      placeholder="Enter coupon code" 
                      {...form.register("couponCode")}
                      className="border-purple-200 focus:border-purple-400 transition-colors w-full"
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleCouponCode}
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