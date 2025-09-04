
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Optimized schema with better error messages
export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
  duration: z.enum(["5-week", "10-week"], { required_error: "Please select a program duration" }),
  referralCode: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

const DODO_PUBLIC_KEY = "pk_test_dodo_12345"; // Using a test key for demo

// Optimized fee calculation with memoization
const feeCalculationCache = new Map<number, number>();

const calculateTotalAmount = (baseAmount: number) => {
  if (feeCalculationCache.has(baseAmount)) {
    return feeCalculationCache.get(baseAmount)!;
  }
  
  const platformFeePercentage = 20; // Updated from 25% to 20%
  const platformFee = (baseAmount * platformFeePercentage) / 100;
  const total = Math.round(baseAmount + platformFee);
  
  feeCalculationCache.set(baseAmount, total);
  return total;
};

// Function to send WhatsApp message
const sendWhatsAppMessage = async (data: FormData, programTitle: string) => {
  const price = data.duration === "5-week" ? "₹399" : "₹999";
  const message = `New enrollment for ${programTitle}%0A%0AName: ${data.name}%0AEmail: ${data.email}%0APhone: ${data.phone}%0ADuration: ${data.duration}%0APrice: ${price}%0A%0APlease contact the student for next steps.`;
  
  const whatsappUrl = `https://wa.me/919656778508?text=${message}`;
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
  
  console.log("WhatsApp message sent with details:", {
    name: data.name,
    email: data.email,
    phone: data.phone,
    duration: data.duration,
    price: price
  });
};

// Mock Dodo payment integration for demo purposes
const mockDodoPayment = (options: any) => {
  console.log("Mock Dodo Payment initiated with options:", options);
  
  // Simulate payment success after 2 seconds
  setTimeout(() => {
    const mockResponse = {
      dodo_payment_id: `pay_${Date.now()}`,
      dodo_order_id: options.order_id,
      dodo_signature: `sig_${Math.random().toString(36).substring(2, 15)}`,
    };
    
    console.log("Mock payment successful:", mockResponse);
    options.handler(mockResponse);
  }, 2000);
};

// Improved email sending with better error handling and retry logic
const sendEnrollmentEmail = async (email: string, name: string, programTitle: string) => {
  const maxRetries = 2;
  let retryCount = 0;
  let success = false;

  while (retryCount <= maxRetries && !success) {
    try {
      const { data, error } = await supabase.functions.invoke('send-enrollment-email', {
        body: {
          to: email,
          userName: name,
          programTitle: programTitle,
          timestamp: new Date().toISOString(),
        },
      });

      if (error) {
        throw error;
      }

      success = true;
      console.log("Enrollment email sent successfully", data);
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

// Optimized Dodo Payment options creation
export const createDodoPaymentOptions = (
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
  
  if (!DODO_PUBLIC_KEY) {
    onError({ message: "Payment configuration error. Please try again later." });
    return null;
  }
  
  // Generate a unique order ID
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
  
  const options = {
    key: DODO_PUBLIC_KEY,
    amount: totalAmount * 100, // Dodo expects amount in paise
    currency: "INR",
    name: "Dev Mentor Hub",
    description: `Enrollment for ${programTitle} - ${data.duration}`,
    order_id: orderId,
    prefill: {
      name: data.name,
      email: data.email,
      contact: data.phone,
    },
    notes: {
      program: programTitle,
      duration: data.duration,
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
      console.log("Dodo payment successful, response:", response);
      
      try {
        // Enhanced payment record with additional metadata
        const paymentRecord = {
          payment_id: response.dodo_payment_id,
          order_id: response.dodo_order_id || orderId,
          signature: response.dodo_signature,
          program_title: programTitle,
          amount: totalAmount,
          duration: data.duration,
          user_name: data.name,
          user_email: data.email,
          user_phone: data.phone,
          status: "completed",
          created_at: new Date().toISOString(),
        };

        const { error } = await supabase
          .from('payments')
          .insert([paymentRecord]);

        if (error) {
          console.error("Error storing payment:", error);
          console.log("Payment details for recovery:", JSON.stringify(paymentRecord));
          
          toast({
            title: "Payment Recorded",
            description: "Your payment was successful but we encountered an issue saving your details. Our team will contact you shortly.",
            variant: "default",
          });
        }

        // Send WhatsApp message with enrollment details
        await sendWhatsAppMessage(data, programTitle);

        // Send enrollment confirmation email
        await sendEnrollmentEmail(data.email, data.name, programTitle);
        
        onSuccess();
        
        toast({
          title: "Enrollment Successful! 🎉",
          description: "Your details have been sent to our team via WhatsApp. Check your email for confirmation.",
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
  };

  // Use mock payment for demo
  mockDodoPayment(options);
  
  return options;
};
