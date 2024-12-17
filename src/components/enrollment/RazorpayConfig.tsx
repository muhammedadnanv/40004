import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  referralCode: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

// Using live key from Supabase secrets
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_LIVE_KEY || "rzp_live_YOUR_LIVE_KEY_HERE";

export const createRazorpayOptions = (
  data: FormData,
  amount: number,
  programTitle: string,
  onSuccess: () => void,
  onError: (error: { message: string }) => void
) => {
  const options = {
    key: RAZORPAY_KEY,
    amount: amount * 100, // Amount in smallest currency unit (paise)
    currency: "INR",
    name: "Dev Mentor Hub",
    description: `Enrollment for ${programTitle}`,
    image: "https://your-logo-url.com/logo.png",
    prefill: {
      name: data.name,
      email: data.email,
      contact: data.phone,
    },
    notes: {
      address: data.address,
      program: programTitle,
    },
    theme: {
      color: "#7c3aed",
    },
    handler: async function (response: any) {
      console.log("Payment successful, response:", response);
      
      try {
        // Store payment details in Supabase
        const { error } = await supabase
          .from('payments')
          .insert([{
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            program_title: programTitle,
            amount,
            user_name: data.name,
            user_email: data.email,
            user_phone: data.phone,
          }]);

        if (error) {
          console.error("Error storing payment:", error);
          onError({ message: "Payment successful but failed to store details" });
          return;
        }
        
        onSuccess();
      } catch (error: any) {
        console.error("Error processing payment:", error);
        onError({ message: error.message || "Error processing payment" });
      }
    },
    modal: {
      ondismiss: function() {
        console.log("Payment modal dismissed");
        onError({ message: "Payment cancelled by user" });
      },
      confirm_close: true,
      escape: true,
      animation: true,
    },
    retry: {
      enabled: true,
      max_count: 3,
    },
  };

  return options;
};