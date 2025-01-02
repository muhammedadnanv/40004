import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { MentorInfoDialog } from "./mentor/MentorInfoDialog";
import { MentorFormFields } from "./mentor/MentorFormFields";
import { formSchema, type FormData } from "./mentor/mentorFormSchema";

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
      const response = await fetch("https://formspree.io/f/mnnnonnv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
          <MentorInfoDialog />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
            <MentorFormFields form={form} />
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