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

interface MentorFormFieldsProps {
  onClose: () => void;
  mentorEarnings?: number;
}

// Function to send WhatsApp message via direct link
const sendMentorWhatsAppMessage = async (data: MentorFormData) => {
  const message = `🔥 *NEW MENTOR APPLICATION* 🔥%0A%0A` +
                 `👤 *Name:* ${data.name}%0A` +
                 `📧 *Email:* ${data.email}%0A` +
                 `📱 *Phone:* ${data.phone}%0A` +
                 `💻 *GitHub:* ${data.github}%0A` +
                 `💼 *LinkedIn:* ${data.linkedin}%0A` +
                 `🎨 *CodePen:* ${data.codepen}%0A` +
                 `📚 *Program:* ${data.program}%0A` +
                 `⏰ *Applied At:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}%0A%0A` +
                 `Please review this mentor application and respond accordingly. 👨‍🏫`;
  
  const whatsappUrl = `https://wa.me/919656778508?text=${message}`;
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
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
      
      // Send WhatsApp message with mentor details
      await sendMentorWhatsAppMessage(data);
      
      toast({
        title: "Application submitted successfully! 🎉",
        description: "Your details are being sent to our team via WhatsApp. We'll review your application and get back to you soon.",
      });
      onClose();
    } catch (error) {
      console.error("Error submitting mentor application:", error);
      toast({
        title: "Error submitting application",
        description: "Please try again later.",
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