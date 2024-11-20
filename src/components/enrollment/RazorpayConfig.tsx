import { RazorpayOptions } from "@/utils/razorpayService";
import { verifyPayment } from "@/utils/razorpayService";

export const createRazorpayOptions = (
  finalAmount: number,
  programTitle: string,
  selectedPlan: string,
  userData: {
    name: string;
    email: string;
    phone: string;
  }
): RazorpayOptions => {
  return {
    key: "rzp_live_5JYQnqKRnKhB5y",
    amount: finalAmount * 100, // Amount in paise
    currency: "INR",
    name: "Dev Mentor Hub",
    description: `Enrollment for ${programTitle} - ${selectedPlan} Plan (₹${finalAmount})`,
    handler: async function(response) {
      if (response.razorpay_payment_id) {
        const verified = await verifyPayment(
          response.razorpay_payment_id,
          response.razorpay_order_id || '',
          response.razorpay_signature || ''
        );
        return verified;
      }
      return false;
    },
    prefill: {
      name: userData.name,
      email: userData.email,
      contact: userData.phone,
    },
    theme: {
      color: "#4A00E0",
    },
    modal: {
      ondismiss: () => {
        return false;
      },
    },
  };
};