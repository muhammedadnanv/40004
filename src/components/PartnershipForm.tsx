import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type FormData = z.infer<typeof formSchema>;

const whatsappGroups = [
  "https://chat.whatsapp.com/IeY5W98hw2WHXE3csRs1mh",
  "https://chat.whatsapp.com/DoXqxd9Io4f4GQNTBT88Ze",
  "https://chat.whatsapp.com/Ko1x7Mfccfq8WqKqxeVltV",
  "https://chat.whatsapp.com/IkzR1S5RgrrFABlnOQau7F"
];

interface PartnershipFormProps {
  isOpen: boolean;
  onClose: () => void;
  partnerName: string;
}

export const PartnershipForm = ({ isOpen, onClose, partnerName }: PartnershipFormProps) => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // Here you would typically send the data to your backend
    console.log("Form submitted:", data);
    
    setIsSubmitted(true);
    toast({
      title: "Success!",
      description: "You can now join our WhatsApp groups below.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-[425px] mx-auto rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Join {partnerName} Community
          </DialogTitle>
        </DialogHeader>

        {!isSubmitted ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Input
                  placeholder="Your Name"
                  {...form.register("name")}
                  className="border-purple-200 focus:border-purple-400 transition-colors"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email Address"
                  {...form.register("email")}
                  className="border-purple-200 focus:border-purple-400 transition-colors"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  {...form.register("phone")}
                  className="border-purple-200 focus:border-purple-400 transition-colors"
                />
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  placeholder="Address"
                  {...form.register("address")}
                  className="border-purple-200 focus:border-purple-400 transition-colors"
                />
                {form.formState.errors.address && (
                  <p className="text-red-500 text-sm">{form.formState.errors.address.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300"
              >
                Submit
              </Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-gray-600">
              Thank you for joining! Click any of the links below to join our WhatsApp groups:
            </p>
            <div className="space-y-2">
              {whatsappGroups.map((link, index) => (
                <Button
                  key={index}
                  className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                  onClick={() => window.open(link, "_blank")}
                >
                  Join WhatsApp Group {index + 1}
                </Button>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};