import { toast } from "@/components/ui/use-toast";

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
    ondismiss: () => void;
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
                description: "You cancelled the payment process",
                variant: "destructive",
              });
              reject(new Error("Payment cancelled by user"));
            },
          },
        });

        razorpay.on('payment.failed', (response: any) => {
          toast({
            title: "Payment Failed",
            description: response.error.description || "Something went wrong with the payment",
            variant: "destructive"
          });
          reject(new Error(response.error.description));
        });

        razorpay.open();
        resolve();
      } catch (error) {
        reject(error);
      }
    };

    script.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to load Razorpay. Please check your internet connection.",
        variant: "destructive"
      });
      reject(new Error("Razorpay SDK failed to load"));
    };

    document.body.appendChild(script);
  });
};

export const verifyPayment = async (
  paymentId: string,
  orderId: string,
  signature: string
): Promise<any> => {
  try {
    // Here you would typically make an API call to your backend to verify the payment
    // For now, we'll simulate a successful verification
    return {
      success: true,
      paymentId,
      orderId,
      signature
    };
  } catch (error) {
    toast({
      title: "Verification Failed",
      description: "Could not verify payment. Please contact support.",
      variant: "destructive"
    });
    throw error;
  }
};