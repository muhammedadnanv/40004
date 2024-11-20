import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Please enter your full address"),
  referralCode: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export const createRazorpayOptions = (
  data: FormData,
  amount: number,
  programTitle: string,
  onSuccess: () => void,
  onError: (error: any) => void
) => ({
  key: "rzp_live_5JYQnqKRnKhB5y",
  amount: amount * 100,
  currency: "INR",
  name: "Dev Mentor Hub",
  description: `Enrollment for ${programTitle}`,
  handler: async (response: any) => {
    try {
      await verifyPayment(
        response.razorpay_payment_id,
        response.razorpay_order_id || '',
        response.razorpay_signature || ''
      );
      onSuccess();
    } catch (error) {
      onError(error);
    }
  },
  prefill: {
    name: data.name,
    email: data.email,
    contact: data.phone,
    method: 'upi',
    'contact[address]': data.address
  },
  notes: {
    address: data.address,
    program: programTitle,
    referralCode: data.referralCode || 'None'
  },
  theme: {
    color: "#4A00E0",
  }
});