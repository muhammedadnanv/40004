import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Info } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  linkedin: z.string().url("Must be a valid LinkedIn URL"),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  portfolio: z.string().url("Must be a valid URL"),
  experience: z.string().min(100, "Please provide at least 100 characters describing your experience"),
});

type FormData = z.infer<typeof formSchema>;

export const MentorSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      instagram: "",
      twitter: "",
      portfolio: "",
      experience: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value || "");
      });

      const response = await fetch("https://formbold.com/s/3Orzd", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section aria-label="become-mentor" className="py-16 md:py-24 lg:py-32 bg-gradient-to-r from-purple-50 via-white to-purple-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extralight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
            Become a Mentor
          </h2>
          <p className="text-gray-600 mb-4">
            Fill out the form below to apply and start mentoring aspiring developers!
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Info className="w-4 h-4" />
                Learn More About Mentorship
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold mb-4">
                  Mentor Information
                </DialogTitle>
                <DialogDescription className="text-gray-600 space-y-4">
                  <p>
                    As a mentor, you'll receive a "Lickesalary" for each client who joins through your mentorship. Your earnings will be a portion of the client fee after platform and Razorpay cuts (10% platform fee + 2% Razorpay fee).
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="font-medium mb-2">Example Earnings:</p>
                    <ul className="space-y-1">
                      <li>Client fee: ₹499</li>
                      <li>Platform cut (10%): ₹49.90</li>
                      <li>Razorpay fee (2%): ₹9.98</li>
                      <li className="font-medium">Your Lickesalary: ₹439.12</li>
                    </ul>
                  </div>
                  <p>
                    You'll guide mentees through projects, code reviews, and best practices while collaborating with our community. We offer a flexible schedule, compensation based on clients mentored, and a platform to showcase your expertise and expand your professional network.
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
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
                  <FormLabel>Email Address</FormLabel>
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
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram Handle (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="@yourhandle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>X (Twitter) Handle (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="@yourhandle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio/Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourwebsite.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your relevant experience in tech, projects, and mentoring..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};