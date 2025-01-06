import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  referralCode: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_LIVE_KEY || "rzp_live_YOUR_LIVE_KEY_HERE";

const calculateTotalAmount = (baseAmount: number) => {
  const platformFeePercentage = 20;
  const platformFee = (baseAmount * platformFeePercentage) / 100;
  return baseAmount + platformFee;
};

const sendEnrollmentEmail = async (email: string, name: string, programTitle: string) => {
  try {
    const response = await fetch('https://zbnwztqwkusdurqllgzc.supabase.co/functions/v1/send-enrollment-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        userName: name,
        programTitle: programTitle,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send enrollment email');
    }
  } catch (error) {
    console.error('Error sending enrollment email:', error);
    // Don't throw here - we don't want to break the enrollment flow if email fails
    toast({
      title: "Note",
      description: "Enrollment successful, but we couldn't send you a confirmation email. Please check your spam folder.",
      variant: "default",
    });
  }
};

export const createRazorpayOptions = (
  data: FormData,
  amount: number,
  programTitle: string,
  onSuccess: () => void,
  onError: (error: { message: string }) => void
) => {
  const totalAmount = calculateTotalAmount(amount);
  
  const options = {
    key: RAZORPAY_KEY,
    amount: totalAmount * 100,
    currency: "INR",
    name: "Dev Mentor Hub",
    description: `Enrollment for ${programTitle} - Base: ₹${amount} + Platform Fee (20%): ₹${totalAmount - amount}`,
    image: "https://your-logo-url.com/logo.png",
    prefill: {
      name: data.name,
      email: data.email,
      contact: data.phone,
    },
    notes: {
      address: data.address,
      program: programTitle,
      baseAmount: `₹${amount}`,
      platformFee: `₹${totalAmount - amount}`,
      totalAmount: `₹${totalAmount}`,
    },
    theme: {
      color: "#7c3aed",
    },
    handler: async function (response: any) {
      console.log("Payment successful, response:", response);
      
      try {
        const { error } = await supabase
          .from('payments')
          .insert([{
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            program_title: programTitle,
            amount: totalAmount,
            user_name: data.name,
            user_email: data.email,
            user_phone: data.phone,
          }]);

        if (error) {
          console.error("Error storing payment:", error);
          onError({ message: "Payment successful but failed to store details" });
          return;
        }

        // Send enrollment confirmation email
        await sendEnrollmentEmail(data.email, data.name, programTitle);
        
        onSuccess();
        
        toast({
          title: "Payment Successful! 🎉",
          description: "Check your email for enrollment confirmation and next steps.",
        });
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