
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
    const script = document.createElement("script");
    script.src = "https://checkout.dodopayments.com/v1/checkout.js";

    script.onload = () => {
      try {
        const dodo = new window.DodoCheckout({
          ...options,
          modal: {
            ...options.modal,
            ondismiss: () => {
              toast({
                title: "Payment Cancelled",
                description: "You cancelled the payment process. Try again when you're ready.",
                variant: "destructive",
              });
              if (options.modal?.ondismiss) {
                options.modal.ondismiss();
              }
              reject(new Error("Payment cancelled by user"));
            },
          },
        });

        dodo.on('payment.failed', (response: any) => {
          console.error("Payment failed:", response.error);
          toast({
            title: "Payment Failed",
            description: response.error.description || "Something went wrong with the payment. Please try again.",
            variant: "destructive"
          });
          reject(new Error(response.error.description));
        });

        dodo.open();
        resolve();
      } catch (error) {
        console.error("Dodo payment initialization error:", error);
        toast({
          title: "Error",
          description: "Failed to initialize payment gateway. Please try again.",
          variant: "destructive"
        });
        reject(error);
      }
    };

    script.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to load payment gateway. Please check your internet connection.",
        variant: "destructive"
      });
      reject(new Error("Dodo payment SDK failed to load"));
    };

    document.body.appendChild(script);
  });
};

export const verifyDodoPayment = async (
  paymentId: string,
  orderId: string,
  signature: string,
  amount: number
): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('verify-dodo-payment', {
      body: {
        paymentId,
        orderId,
        signature,
        amount
      }
    });

    if (error || !data.verified) {
      console.error("Payment verification failed:", error || data.error);
      toast({
        title: "Verification Failed",
        description: "Could not verify payment. Please contact support with your payment ID.",
        variant: "destructive"
      });
      return false;
    }

    console.log("Payment verified successfully:", data);
    return true;
  } catch (error) {
    console.error("Payment verification error:", error);
    toast({
      title: "Verification Failed",
      description: "Could not verify payment. Please contact support with your payment ID.",
      variant: "destructive"
    });
    return false;
  }
};
