import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Please enter your full address"),
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const options = {
        key: "rzp_live_5JYQnqKRnKhB5y",
        amount: amount * 100,
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
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Proceed to Payment</Button>
              </form>
            </Form>
          </>
        ) : (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-center">Payment Successful!</h3>
              <div className="space-y-4">
                <p className="text-center text-gray-600">Please follow these steps:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Join our WhatsApp group using this link: <a href="https://chat.whatsapp.com/COaTqrI651TKlYTPrHOYDn" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Click here to join</a></li>
                  <li>Introduce yourself in the group</li>
                  <li>Share a screenshot of your payment confirmation</li>
                </ol>
                <Button onClick={onClose} className="w-full mt-4">Close</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};