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
  amount: number;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  modal?: {
    ondismiss: () => void;
  };
  key?: string;
  currency?: string;
  theme?: {
    color: string;
  };
};

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_5JYQnqKRnKhB5y';

export const createOrder = async (amount: number) => {
  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Order creation failed:', error);
    throw error;
  }
};

export const initializeRazorpay = async (options: RazorpayOptions) => {
  try {
    const order = await createOrder(options.amount);
    
    const finalOptions = {
      ...options,
      key: RAZORPAY_KEY,
      currency: 'INR',
      theme: { color: "#4A00E0" },
      order_id: order.id,
    };

    return new Promise<void>((resolve, reject) => {
      if (typeof window.Razorpay === "undefined") {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        
        script.onload = () => {
          const razorpay = new window.Razorpay(finalOptions);
          setupRazorpayHandlers(razorpay, reject);
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
        const razorpay = new window.Razorpay(finalOptions);
        setupRazorpayHandlers(razorpay, reject);
        razorpay.open();
        resolve();
      }
    });
  } catch (error) {
    toast({
      title: "Order Creation Failed",
      description: "Unable to create payment order. Please try again.",
      variant: "destructive"
    });
    throw error;
  }
};

const setupRazorpayHandlers = (razorpay: any, reject: (reason?: any) => void) => {
  razorpay.on('payment.failed', (response: any) => {
    toast({
      title: "Payment Failed",
      description: response.error.description || "Something went wrong with the payment",
      variant: "destructive"
    });
    reject(response.error);
  });
};

export const verifyPayment = async (
  paymentId: string, 
  orderId: string, 
  signature: string
) => {
  try {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        paymentId, 
        orderId, 
        signature,
      })
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Payment verification failed');
    }

    return data;
  } catch (error) {
    toast({
      title: "Verification Failed",
      description: "Could not verify payment. Please contact support.",
      variant: "destructive"
    });
    throw error;
  }
};