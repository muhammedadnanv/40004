
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasFollowed, setHasFollowed] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const handleFollowClick = () => {
    window.open("https://x.com/comicfixin", "_blank");
    setHasFollowed(true);
    toast({
      title: "Thank you!",
      description: "You can now join our WhatsApp groups below.",
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("partnerName", partnerName);

      const response = await fetch("https://formbold.com/s/3Orzd", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Please follow us on Twitter/X to join our WhatsApp groups.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-[425px] mx-auto rounded-lg p-4 sm:p-6">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Join {partnerName} Community
              </DialogTitle>
              <DialogDescription className="text-gray-600 pt-2">
                Fill out the form below to join our community and get access to exclusive resources.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Your Name"
                    {...form.register("name")}
                    className="border-purple-200 focus:border-purple-400 transition-colors h-12 text-base"
                    aria-label="Full name"
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
                    className="border-purple-200 focus:border-purple-400 transition-colors h-12 text-base"
                    aria-label="Email address"
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
                    className="border-purple-200 focus:border-purple-400 transition-colors h-12 text-base"
                    inputMode="tel"
                    aria-label="Phone number"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Input
                    placeholder="Address"
                    {...form.register("address")}
                    className="border-purple-200 focus:border-purple-400 transition-colors h-12 text-base"
                    aria-label="Address"
                  />
                  {form.formState.errors.address && (
                    <p className="text-red-500 text-sm">{form.formState.errors.address.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 text-base py-3 h-12"
                  disabled={isSubmitting}
                  aria-label="Submit form"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </Form>
          </>
        ) : !hasFollowed ? (
          <div className="space-y-5 py-4">
            <p className="text-center text-gray-600">
              Please follow us on Twitter/X to join our WhatsApp groups:
            </p>
            <Button
              className="w-full bg-black hover:bg-black/90 text-white py-3 h-12 text-base"
              onClick={handleFollowClick}
              aria-label="Follow on Twitter/X"
            >
              Follow on Twitter/X
            </Button>
          </div>
        ) : (
          <div className="space-y-5 py-4">
            <p className="text-center text-gray-600">
              Thank you for following! Click any of the links below to join our WhatsApp groups:
            </p>
            <div className="space-y-3">
              {whatsappGroups.map((link, index) => (
                <Button
                  key={index}
                  className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white py-3 h-12 text-base"
                  onClick={() => window.open(link, "_blank")}
                  aria-label={`Join WhatsApp Group ${index + 1}`}
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
