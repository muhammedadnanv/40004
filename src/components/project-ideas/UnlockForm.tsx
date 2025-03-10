
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface UnlockFormProps {
  onUnlock: () => void;
}

export const UnlockForm = ({ onUnlock }: UnlockFormProps) => {
  const [specialCode, setSpecialCode] = useState("");
  const { toast } = useToast();

  const handleUnlock = () => {
    // Check if the special code matches the payment verification code
    if (specialCode === "DMH2024") {
      onUnlock();
      toast({
        title: "Project Ideas Unlocked! 🎉",
        description: "You now have access to all project ideas.",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid unlock code. You can get this after payment.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="absolute inset-0 bg-white/50 backdrop-blur-md z-10 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-center">Access Project Ideas</h3>
        <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">
          Enter your unlock code to access our full library of project ideas
        </p>
        <div className="flex flex-col gap-3 sm:gap-4">
          <Input
            type="text"
            placeholder="Enter unlock code"
            value={specialCode}
            onChange={(e) => setSpecialCode(e.target.value)}
            className="flex-1"
            data-testid="unlock-code-input"
          />
          <Button 
            onClick={handleUnlock} 
            className="w-full bg-primary hover:bg-primary/90"
            data-testid="unlock-button"
          >
            Unlock Gallery
          </Button>
        </div>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 text-center">
          You'll receive the unlock code after completing payment
        </p>
      </div>
    </div>
  );
};
