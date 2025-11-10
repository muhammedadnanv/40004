
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
            <FormLabel className="text-gray-700 text-base sm:text-sm">Full Name *</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Input 
                  placeholder="Enter your full name" 
                  {...field}
                  onChange={(e) => {
                    // Remove special characters and numbers in real-time
                    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                    field.onChange(value);
                    handleNameChange(value);
                  }}
                  onBlur={field.onBlur}
                  className="border-purple-200 focus:border-purple-400 transition-colors mobile-touch-target text-fluid-base"
                  autoComplete="name"
                  aria-label="Full name"
                  aria-required="true"
                  aria-invalid={!!form.formState.errors.name}
                />
                {nameSuggestions.length > 0 && (
                  <div className="bg-white p-3 rounded-md shadow-lg border border-purple-200 max-h-[200px] overflow-y-auto mobile-safe-area">
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">Suggested Kerala names:</p>
                    {nameSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="text-xs sm:text-sm text-purple-600 cursor-pointer hover:bg-purple-50 p-2 rounded touch-manipulation mobile-touch-target"
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
            <FormMessage className="text-red-500 text-xs sm:text-sm" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 text-base sm:text-sm">Email Address *</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="john@example.com" 
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.value.toLowerCase().trim());
                }}
                onBlur={field.onBlur}
                className="border-purple-200 focus:border-purple-400 transition-colors mobile-touch-target text-fluid-base"
                inputMode="email"
                autoComplete="email"
                aria-label="Email address"
                aria-required="true"
                aria-invalid={!!form.formState.errors.email}
              />
            </FormControl>
            <FormMessage className="text-red-500 text-xs sm:text-sm" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 text-base sm:text-sm">Phone Number *</FormLabel>
            <FormControl>
              <Input 
                type="tel" 
                placeholder="Enter 10-digit mobile number" 
                {...field}
                onChange={(e) => {
                  // Only allow numbers and limit to 10 digits
                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                  field.onChange(value);
                }}
                onBlur={field.onBlur}
                maxLength={10}
                className="border-purple-200 focus:border-purple-400 transition-colors mobile-touch-target text-fluid-base"
                inputMode="numeric"
                autoComplete="tel"
                aria-label="Phone number"
                aria-required="true"
                aria-invalid={!!form.formState.errors.phone}
              />
            </FormControl>
            <FormMessage className="text-red-500 text-xs sm:text-sm" />
            {field.value && field.value.length > 0 && field.value.length < 10 && (
              <p className="text-xs text-gray-500 mt-1">{field.value.length}/10 digits</p>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 text-base sm:text-sm">Program Duration *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                aria-required="true"
              >
                <div className={`flex items-center space-x-2 p-3 sm:p-4 border-2 rounded-lg transition-all mobile-touch-target touch-manipulation ${
                  field.value === "5-week" 
                    ? "border-purple-600 bg-purple-50" 
                    : "border-purple-200 hover:border-purple-400 hover:bg-purple-50"
                }`}>
                  <RadioGroupItem value="5-week" id="5-week" />
                  <label htmlFor="5-week" className="flex-1 cursor-pointer">
                    <div className="font-semibold text-purple-600 text-fluid-base">5 Weeks</div>
                    <div className="text-fluid-sm text-gray-600">₹699 only</div>
                  </label>
                </div>
                <div className={`flex items-center space-x-2 p-3 sm:p-4 border-2 rounded-lg transition-all mobile-touch-target touch-manipulation ${
                  field.value === "10-week" 
                    ? "border-purple-600 bg-purple-50" 
                    : "border-purple-200 hover:border-purple-400 hover:bg-purple-50"
                }`}>
                  <RadioGroupItem value="10-week" id="10-week" />
                  <label htmlFor="10-week" className="flex-1 cursor-pointer">
                    <div className="font-semibold text-purple-600 text-fluid-base">10 Weeks</div>
                    <div className="text-fluid-sm text-gray-600">₹2,999 only</div>
                  </label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-red-500 text-xs sm:text-sm" />
          </FormItem>
        )}
      />
    </>
  );
};
