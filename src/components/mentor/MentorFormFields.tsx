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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MentorFormFieldsProps {
  onClose: () => void;
  mentorEarnings?: number;
}

// Function to send WhatsApp notification via edge function
const sendMentorWhatsAppNotification = async (data: MentorFormData) => {
  try {
    const { error } = await supabase.functions.invoke('send-whatsapp-notification', {
      body: {
        type: 'mentor',
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          expertise: `GitHub: ${data.github}, LinkedIn: ${data.linkedin}, CodePen: ${data.codepen}`,
          experience: `Program: ${data.program}`,
          program: data.program
        }
      }
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error sending WhatsApp notification:", error);
    throw error;
  }
};

export function MentorFormFields({ onClose, mentorEarnings = 0 }: MentorFormFieldsProps) {
  const form = useForm<MentorFormData>({
    resolver: zodResolver(mentorFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      github: "",
      linkedin: "",
      codepen: "",
      program: undefined,
    },
  });

  const onSubmit = async (data: MentorFormData) => {
    try {
      console.log("Mentor application data:", data);
      
      // Send WhatsApp notification via edge function
      await sendMentorWhatsAppNotification(data);
      
      toast({
        title: "Application submitted successfully! 🎉",
        description: "Your details have been sent to our team via WhatsApp. We'll review your application and get back to you soon.",
      });
      onClose();
    } catch (error) {
      console.error("Error submitting mentor application:", error);
      toast({
        title: "Error submitting application",
        description: "Please try again later or contact support if the issue persists.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    {...field} 
                    className="border-purple-200 focus:border-purple-400 transition-colors h-12"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="john@example.com" 
                    {...field} 
                    type="email" 
                    className="border-purple-200 focus:border-purple-400 transition-colors h-12"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Phone Number</FormLabel>
              <FormControl>
                <Input 
                  placeholder="1234567890" 
                  {...field} 
                  type="tel" 
                  className="border-purple-200 focus:border-purple-400 transition-colors h-12"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">GitHub Profile</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://github.com/username" 
                    {...field} 
                    type="url" 
                    className="border-purple-200 focus:border-purple-400 transition-colors h-12"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">LinkedIn Profile</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://linkedin.com/in/username" 
                    {...field} 
                    type="url" 
                    className="border-purple-200 focus:border-purple-400 transition-colors h-12"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="codepen"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">CodePen Profile</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://codepen.io/username" 
                    {...field} 
                    type="url" 
                    className="border-purple-200 focus:border-purple-400 transition-colors h-12"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="program"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Select Program to Mentor</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  <div className="flex items-center space-x-2 p-3 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
                    <RadioGroupItem value="5-week" id="mentor-5-week" />
                    <label htmlFor="mentor-5-week" className="flex-1 cursor-pointer">
                      <div className="font-medium text-purple-600">5 Week Program</div>
                      <div className="text-sm text-gray-600">Beginner Level</div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
                    <RadioGroupItem value="10-week" id="mentor-10-week" />
                    <label htmlFor="mentor-10-week" className="flex-1 cursor-pointer">
                      <div className="font-medium text-purple-600">10 Week Program</div>
                      <div className="text-sm text-gray-600">Advanced Level</div>
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white"
          >
            Submit Application
          </Button>
        </div>
      </form>
    </Form>
  );
}