import { z } from "zod";
import type { RazorpayOptions } from "@/utils/razorpayService";

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Please enter your full address"),
  referralCode: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

const RAZORPAY_KEY_ID = "rzp_test_1234567890"; // Replace with your test key for development

export const createRazorpayOptions = (
  data: FormData,
  amount: number,
  programTitle: string,
  onSuccess: () => void,
  onError: (error: any) => void
): RazorpayOptions => ({
  key: RAZORPAY_KEY_ID,
  amount: amount * 100, // Razorpay expects amount in paise
  currency: "INR",
  name: "Dev Mentor Hub",
  description: `Enrollment for ${programTitle}`,
  handler: async function(response) {
    try {
      // Create a payment verification object
      const verificationData = {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        amount: amount,
        currency: "INR",
        programTitle: programTitle,
        customerDetails: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address
        }
      };

      // Store payment details in localStorage for reference
      localStorage.setItem('lastPaymentDetails', JSON.stringify({
        paymentId: response.razorpay_payment_id,
        amount: amount,
        program: programTitle,
        timestamp: new Date().toISOString()
      }));

      onSuccess();
    } catch (error) {
      console.error("Payment verification failed:", error);
      onError(error);
    }
  },
  prefill: {
    name: data.name,
    email: data.email,
    contact: data.phone,
  },
  notes: {
    address: data.address,
    program: programTitle,
    referralCode: data.referralCode || 'None'
  },
  theme: {
    color: "#7C3AED"
  },
  modal: {
    confirm_close: true,
    ondismiss: () => {
      console.log("Payment cancelled by user");
    }
  }
});