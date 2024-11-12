import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface FormFieldsProps {
  form: UseFormReturn<any>;
}

export const FormFields = ({ form }: FormFieldsProps) => {
  return (
    <>
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
                className="border-purple-200 focus:border-purple-400 transition-colors"
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
                type="email" 
                placeholder="john@example.com" 
                {...field}
                className="border-purple-200 focus:border-purple-400 transition-colors"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Phone Number</FormLabel>
            <FormControl>
              <Input 
                type="tel" 
                placeholder="1234567890" 
                {...field}
                className="border-purple-200 focus:border-purple-400 transition-colors"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Address</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your full address" 
                {...field}
                className="border-purple-200 focus:border-purple-400 transition-colors"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </>
  );
};