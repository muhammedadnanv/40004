import { toast } from "@/components/ui/use-toast";

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

export const initializeRazorpay = (options: RazorpayOptions): Promise<{ success: boolean; error?: string }> => {
  return new Promise((resolve) => {
    const handlePaymentSuccess = async (response: RazorpayResponse) => {
      try {
        if (response.razorpay_payment_id) {
          const verified = await verifyPayment(
            response.razorpay_payment_id,
            response.razorpay_order_id || '',
            response.razorpay_signature || ''
          );
          resolve({ success: verified });
        } else {
          resolve({ success: false, error: 'Payment ID not received' });
        }
      } catch (error: any) {
        resolve({ success: false, error: error.message });
      }
    };

    if (typeof window.Razorpay === "undefined") {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      
      script.onload = () => {
        const razorpay = new window.Razorpay({
          ...options,
          handler: handlePaymentSuccess
        });
        razorpay.open();
      };
      
      script.onerror = () => {
        toast({
          title: "Payment Error",
          description: "Failed to load Razorpay SDK. Please check your internet connection.",
          variant: "destructive"
        });
        resolve({ success: false, error: "Failed to load Razorpay SDK" });
      };
      
      document.body.appendChild(script);
    } else {
      const razorpay = new window.Razorpay({
        ...options,
        handler: handlePaymentSuccess
      });
      razorpay.open();
    }
  });
};

export const verifyPayment = async (
  paymentId: string, 
  orderId: string, 
  signature: string
): Promise<boolean> => {
  try {
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

    const result = await response.json();
    return result.verified;
  } catch (error) {
    toast({
      title: "Verification Failed",
      description: "Could not verify payment. Please contact support.",
      variant: "destructive"
    });
    throw error;
  }
};