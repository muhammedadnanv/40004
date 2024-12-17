import { z } from "zod";

// Form validation schema
export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  referralCode: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

// Using test key for development
const RAZORPAY_KEY = "rzp_test_1DP5mmOlF5G5ag";

export const createRazorpayOptions = (
  data: FormData,
  amount: number,
  programTitle: string,
  onSuccess: () => void,
  onError: (error: { message: string }) => void
) => {
  const options = {
    key: RAZORPAY_KEY,
    amount: amount * 100, // Amount in smallest currency unit
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
    handler: function (response: any) {
      // Store payment details in localStorage
      const paymentDetails = {
        paymentId: response.razorpay_payment_id,
        programTitle,
        amount,
        timestamp: new Date().toISOString(),
        user: {
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
      };
      
      const existingPayments = JSON.parse(localStorage.getItem('payments') || '[]');
      existingPayments.push(paymentDetails);
      localStorage.setItem('payments', JSON.stringify(existingPayments));
      
      console.log("Payment successful:", response);
      onSuccess();
    },
    modal: {
      ondismiss: function() {
        console.log("Payment modal dismissed");
      },
      escape: true,
      animation: true,
    },
  };

  return options;
};