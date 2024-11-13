import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { isKeralaName, suggestKeralaNames } from "@/utils/keralaNameValidation";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface FormFieldsProps {
  form: UseFormReturn<any>;
}

export const FormFields = ({ form }: FormFieldsProps) => {
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);

  const handleNameChange = (value: string) => {
    if (value && !isKeralaName(value)) {
      const suggestions = suggestKeralaNames(value);
      setNameSuggestions(suggestions);
      
      toast({
        title: "Name Validation",
        description: "Please enter a Kerala-based name. Some suggestions are provided below.",
        variant: "destructive",
      });
    } else {
      setNameSuggestions([]);
    }
  };

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Full Name</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Input 
                  placeholder="John Doe" 
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleNameChange(e.target.value);
                  }}
                  className="border-purple-200 focus:border-purple-400 transition-colors"
                />
                {nameSuggestions.length > 0 && (
                  <div className="bg-white p-2 rounded-md shadow-lg border border-purple-200">
                    <p className="text-sm text-gray-600 mb-1">Suggestions:</p>
                    {nameSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="text-sm text-purple-600 cursor-pointer hover:bg-purple-50 p-1 rounded"
                        onClick={() => {
                          form.setValue('name', suggestion);
                          setNameSuggestions([]);
                        }}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
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