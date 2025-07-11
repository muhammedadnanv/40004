
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
            <FormLabel className="text-gray-700 text-base sm:text-sm">Full Name</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Input 
                  placeholder="John Doe" 
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleNameChange(e.target.value);
                  }}
                  className="border-purple-200 focus:border-purple-400 transition-colors h-12 text-base"
                  aria-label="Full name"
                />
                {nameSuggestions.length > 0 && (
                  <div className="bg-white p-3 rounded-md shadow-lg border border-purple-200 max-h-[200px] overflow-y-auto">
                    <p className="text-sm text-gray-600 mb-2">Suggestions:</p>
                    {nameSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="text-sm text-purple-600 cursor-pointer hover:bg-purple-50 p-2 rounded touch-manipulation"
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
            <FormLabel className="text-gray-700 text-base sm:text-sm">Email</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="john@example.com" 
                {...field}
                className="border-purple-200 focus:border-purple-400 transition-colors h-12 text-base"
                inputMode="email"
                aria-label="Email address"
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
            <FormLabel className="text-gray-700 text-base sm:text-sm">Phone Number</FormLabel>
            <FormControl>
              <Input 
                type="tel" 
                placeholder="1234567890" 
                {...field}
                className="border-purple-200 focus:border-purple-400 transition-colors h-12 text-base"
                inputMode="tel"
                aria-label="Phone number"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 text-base sm:text-sm">Program Duration</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                <div className="flex items-center space-x-2 p-3 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
                  <RadioGroupItem value="5-week" id="5-week" />
                  <label htmlFor="5-week" className="flex-1 cursor-pointer">
                    <div className="font-medium text-purple-600">5 Weeks</div>
                    <div className="text-sm text-gray-600">₹399</div>
                  </label>
                </div>
                <div className="flex items-center space-x-2 p-3 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
                  <RadioGroupItem value="10-week" id="10-week" />
                  <label htmlFor="10-week" className="flex-1 cursor-pointer">
                    <div className="font-medium text-purple-600">10 Weeks</div>
                    <div className="text-sm text-gray-600">₹999</div>
                  </label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </>
  );
};
