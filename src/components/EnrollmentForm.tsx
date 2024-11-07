import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { FormFields } from "./enrollment/FormFields";
import { SuccessCard } from "./enrollment/SuccessCard";
import { generateAndDownloadPDF } from "@/utils/generatePDF";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Please enter your full address"),
  couponCode: z.string().optional(),
});

interface EnrollmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  programTitle: string;
  amount: number;
}

export const EnrollmentForm = ({ isOpen, onClose, programTitle, amount }: EnrollmentFormProps) => {
  const { toast } = useToast();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [finalAmount, setFinalAmount] = useState(amount);
  const [couponApplied, setCouponApplied] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleCouponCode = () => {
    const couponCode = form.getValues("couponCode");
    if (couponCode === "comicfix500" && !couponApplied) {
      setCouponApplied(true);
      toast({
        title: "Success! 🎉",
        description: "Your preview content is downloading...",
      });
      generateAndDownloadPDF();
    } else if (couponApplied) {
      toast({
        title: "Coupon already applied",
        description: "You've already used a coupon code.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Invalid coupon",
        description: "Please enter a valid coupon code.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const options = {
        key: "rzp_live_5JYQnqKRnKhB5y",
        amount: finalAmount * 100,
        currency: "INR",
        name: "Dev Mentor Hub",
        description: `Enrollment for ${programTitle}`,
        prefill: {
          name: data.name,
          email: data.email,
          contact: data.phone,
        },
        handler: function (response: any) {
          toast({
            title: "Payment Successful!",
            description: "You can now join our WhatsApp group.",
          });
          setPaymentSuccess(true);
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        {!paymentSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>Enroll in {programTitle}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormFields form={form} />
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input 
                      placeholder="Enter coupon code" 
                      {...form.register("couponCode")}
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleCouponCode}
                  >
                    Apply
                  </Button>
                </div>
                <div className="text-right font-semibold">
                  Total Amount: ₹{finalAmount}
                </div>
                <Button type="submit" className="w-full">Proceed to Payment</Button>
              </form>
            </Form>
          </>
        ) : (
          <SuccessCard onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};