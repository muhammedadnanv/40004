import { toast } from "@/components/ui/use-toast";

// Global type declaration for Razorpay
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, handler: (response: any) => void) => void;
    };
  }
}

export type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
};

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
  };
  theme: {
    color: string;
  };
  modal?: {
    ondismiss: () => void;
  };
};

export const initializeRazorpay = (options: RazorpayOptions) => {
  return new Promise<void>((resolve, reject) => {
    if (typeof window.Razorpay === "undefined") {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', (response: any) => {
          toast({
            title: "Payment Failed",
            description: response.error.description || "Something went wrong with the payment",
            variant: "destructive"
          });
          reject(response.error);
        });
        razorpay.open();
        resolve();
      };
      script.onerror = () => {
        toast({
          title: "Payment Error",
          description: "Failed to load Razorpay SDK. Please check your internet connection.",
          variant: "destructive"
        });
        reject(new Error("Razorpay SDK failed to load"));
      };
      document.body.appendChild(script);
    } else {
      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', (response: any) => {
        toast({
          title: "Payment Failed",
          description: response.error.description || "Something went wrong with the payment",
          variant: "destructive"
        });
        reject(response.error);
      });
      razorpay.open();
      resolve();
    }
  });
};

export const verifyPayment = async (
  paymentId: string, 
  orderId: string, 
  signature: string
) => {
  try {
    // Implement server-side verification logic here
    // This is a placeholder and should be replaced with actual server-side verification
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentId, orderId, signature })
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    return await response.json();
  } catch (error) {
    toast({
      title: "Verification Failed",
      description: "Could not verify payment. Please contact support.",
      variant: "destructive"
    });
    throw error;
  }
};