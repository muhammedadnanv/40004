
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    DodoCheckout: any;
  }
}

export type DodoPaymentOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  handler: (response: DodoPaymentResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
  modal?: {
    ondismiss?: () => void;
    confirm_close?: boolean;
    escape?: boolean;
    animation?: boolean;
  };
};

export type DodoPaymentResponse = {
  dodo_payment_id: string;
  dodo_order_id?: string;
  dodo_signature?: string;
};

export const initializeDodoPayment = (options: DodoPaymentOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Mock implementation for demo purposes
    console.log("Initializing mock Dodo payment with options:", options);
    
    // Simulate loading the Dodo payment SDK
    setTimeout(() => {
      try {
        console.log("Mock Dodo payment SDK loaded successfully");
        
        // Simulate opening payment modal
        const mockResponse = {
          dodo_payment_id: `pay_${Date.now()}`,
          dodo_order_id: options.order_id || `order_${Date.now()}`,
          dodo_signature: `sig_${Math.random().toString(36).substring(2, 15)}`,
        };
        
        // Simulate payment success after user interaction
        setTimeout(() => {
          console.log("Mock payment completed:", mockResponse);
          options.handler(mockResponse);
          resolve();
        }, 3000);
        
      } catch (error) {
        console.error("Mock Dodo payment error:", error);
        toast({
          title: "Error",
          description: "Failed to initialize payment gateway. Please try again.",
          variant: "destructive"
        });
        reject(error);
      }
    }, 1000);
  });
};

export const verifyDodoPayment = async (
  paymentId: string,
  orderId: string,
  signature: string,
  amount: number
): Promise<boolean> => {
  try {
    console.log("Verifying payment:", { paymentId, orderId, signature, amount });
    
    // Mock verification - in real implementation, this would call the Supabase function
    const mockVerification = {
      verified: true,
      payment_id: paymentId,
      order_id: orderId,
      amount: amount
    };
    
    console.log("Payment verification result:", mockVerification);
    
    if (mockVerification.verified) {
      toast({
        title: "Payment Verified",
        description: "Your payment has been successfully verified.",
        variant: "default"
      });
      return true;
    } else {
      toast({
        title: "Verification Failed",
        description: "Could not verify payment. Please contact support.",
        variant: "destructive"
      });
      return false;
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    toast({
      title: "Verification Error",
      description: "Error verifying payment. Please contact support.",
      variant: "destructive"
    });
    return false;
  }
};
