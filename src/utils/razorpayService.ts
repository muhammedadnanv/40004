import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export type RazorpayOptions = {
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
    method?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
  modal?: {
    ondismiss?: () => void;
    confirm_close?: boolean;
  };
};

export type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
};

export const initializeRazorpay = (options: RazorpayOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      try {
        const razorpay = new window.Razorpay({
          ...options,
          modal: {
            ...options.modal,
            ondismiss: () => {
              toast({
                title: "Payment Cancelled",
                description: "You cancelled the payment process. Try again when you're ready.",
                variant: "destructive",
              });
              reject(new Error("Payment cancelled by user"));
            },
          },
        });

        razorpay.on('payment.failed', (response: any) => {
          console.error("Payment failed:", response.error);
          toast({
            title: "Payment Failed",
            description: response.error.description || "Something went wrong with the payment. Please try again.",
            variant: "destructive"
          });
          reject(new Error(response.error.description));
        });

        razorpay.open();
        resolve();
      } catch (error) {
        console.error("Razorpay initialization error:", error);
        reject(error);
      }
    };

    script.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to load payment gateway. Please check your internet connection.",
        variant: "destructive"
      });
      reject(new Error("Razorpay SDK failed to load"));
    };

    document.body.appendChild(script);
  });
};

// This function would typically make an API call to your backend
// For now, we'll simulate the verification process
export const verifyPayment = async (
  paymentId: string,
  orderId: string,
  signature: string
): Promise<boolean> => {
  try {
    // In a real application, you would verify the payment with your backend
    // For now, we'll simulate a successful verification
    console.log("Payment verified:", { paymentId, orderId, signature });
    return true;
  } catch (error) {
    console.error("Payment verification failed:", error);
    toast({
      title: "Verification Failed",
      description: "Could not verify payment. Please contact support with your payment ID.",
      variant: "destructive"
    });
    return false;
  }
};