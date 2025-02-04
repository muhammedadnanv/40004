import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mentorFormSchema, type MentorFormData } from "./mentorFormSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface MentorFormFieldsProps {
  onClose: () => void;
  mentorEarnings?: number;
}

export function MentorFormFields({ onClose, mentorEarnings = 0 }: MentorFormFieldsProps) {
  const form = useForm<MentorFormData>({
    resolver: zodResolver(mentorFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      expertise: "",
      experience: "",
      linkedin: "",
      github: "",
      portfolio: "",
      motivation: "",
    },
  });

  const onSubmit = async (data: MentorFormData) => {
    try {
      console.log("Form data:", data);
      toast({
        title: "Application submitted successfully!",
        description: "We'll review your application and get back to you soon.",
      });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error submitting application",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} className="w-full" />
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
                  <Input placeholder="john@example.com" {...field} type="email" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 000-0000" {...field} type="tel" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expertise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area of Expertise</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Frontend Development" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 5" {...field} type="number" className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn Profile</FormLabel>
                <FormControl>
                  <Input placeholder="LinkedIn URL" {...field} type="url" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Profile</FormLabel>
                <FormControl>
                  <Input placeholder="GitHub URL" {...field} type="url" className="w-full" />
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
                <FormLabel>Portfolio Website</FormLabel>
                <FormControl>
                  <Input placeholder="Portfolio URL" {...field} type="url" className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="motivation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Why do you want to be a mentor?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your motivation and what you can bring to our community..."
                  className="min-h-[100px] w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {mentorEarnings > 0 && (
          <div className="bg-primary/5 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              As a mentor, you can earn up to ₹{mentorEarnings.toLocaleString()} per student
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-end mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            Submit Application
          </Button>
        </div>
      </form>
    </Form>
  );
}