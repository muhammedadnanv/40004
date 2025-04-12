
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Optimized schema with better error messages
export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
  address: z.string().min(5, "Address must be at least 5 characters").max(200, "Address is too long"),
  referralCode: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_LIVE_KEY;

// Optimized fee calculation with memoization
const feeCalculationCache = new Map<number, number>();

const calculateTotalAmount = (baseAmount: number) => {
  if (feeCalculationCache.has(baseAmount)) {
    return feeCalculationCache.get(baseAmount)!;
  }
  
  const platformFeePercentage = 25; // Updated from 20% to 25%
  const platformFee = (baseAmount * platformFeePercentage) / 100;
  const total = Math.round(baseAmount + platformFee);
  
  feeCalculationCache.set(baseAmount, total);
  return total;
};

// Improved email sending with better error handling and retry logic
const sendEnrollmentEmail = async (email: string, name: string, programTitle: string) => {
  const maxRetries = 2;
  let retryCount = 0;
  let success = false;

  while (retryCount <= maxRetries && !success) {
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
          timestamp: new Date().toISOString(), // Add timestamp for logging
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`Email sending failed (attempt ${retryCount + 1}/${maxRetries + 1}):`, 
          response.status, response.statusText, errorData);
        throw new Error(`Failed to send enrollment email: ${response.statusText}`);
      }
      
      success = true;
      console.log("Enrollment email sent successfully");
    } catch (error) {
      console.error(`Email sending error (attempt ${retryCount + 1}/${maxRetries + 1}):`, error);
      retryCount++;
      
      if (retryCount > maxRetries) {
        toast({
          title: "Note",
          description: "Enrollment successful, but confirmation email might be delayed. Please check your spam folder.",
          variant: "default",
        });
      } else {
        // Wait before retry with exponential backoff
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount)));
      }
    }
  }
};

// Optimized Razorpay options creation
export const createRazorpayOptions = (
  data: FormData,
  amount: number,
  programTitle: string,
  onSuccess: () => void,
  onError: (error: { message: string }) => void
) => {
  if (!data || !programTitle) {
    onError({ message: "Missing required data for payment processing." });
    return null;
  }
  
  const totalAmount = calculateTotalAmount(amount);
  
  if (!RAZORPAY_KEY) {
    onError({ message: "Payment configuration error. Please try again later." });
    return null;
  }
  
  const options = {
    key: RAZORPAY_KEY,
    amount: totalAmount * 100, // Razorpay expects amount in paise
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
      baseAmount: `₹${amount}`,
      platformFee: `₹${totalAmount - amount}`,
      totalAmount: `₹${totalAmount}`,
      source: "website",
      timestamp: new Date().toISOString(),
    },
    theme: {
      color: "#7c3aed",
    },
    handler: async function (response: any) {
      console.log("Payment successful, response:", response);
      
      try {
        // Enhanced payment record with additional metadata
        const paymentRecord = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
          program_title: programTitle,
          amount: totalAmount,
          base_amount: amount,
          platform_fee: totalAmount - amount,
          user_name: data.name,
          user_email: data.email,
          user_phone: data.phone,
          referral_code: data.referralCode || null,
          payment_method: "razorpay",
          status: "completed",
          device_info: navigator.userAgent,
          created_at: new Date().toISOString(),
        };

        const { error } = await supabase
          .from('payments')
          .insert([paymentRecord]);

        if (error) {
          console.error("Error storing payment:", error);
          
          // Log payment details separately for recovery in case of database error
          console.log("Payment details for recovery:", JSON.stringify(paymentRecord));
          
          toast({
            title: "Payment Recorded",
            description: "Your payment was successful but we encountered an issue saving your details. Our team will contact you shortly.",
            variant: "default",
          });
          onSuccess(); // Still consider it a success since payment went through
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
