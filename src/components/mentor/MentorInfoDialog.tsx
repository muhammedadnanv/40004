import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useMemo } from "react";

interface MentorInfoDialogProps {
  programFee?: number;
}

export const MentorInfoDialog = ({ programFee = 2160 }: MentorInfoDialogProps) => {
  const calculations = useMemo(() => {
    const platformFee = (programFee * 0.10).toFixed(2); // 10% platform fee
    const razorpayFee = (programFee * 0.02).toFixed(2); // 2% Razorpay fee
    const mentorEarnings = (programFee - Number(platformFee) - Number(razorpayFee)).toFixed(2);
    
    return {
      platformFee,
      razorpayFee,
      mentorEarnings
    };
  }, [programFee]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
        >
          Learn More About Mentorship <Info className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[500px] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold mb-2">
            Become a Mentor
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Join our platform as a mentor and share your expertise while earning.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium mb-2 text-sm sm:text-base">Example Earnings:</p>
            <div className="space-y-2 text-sm sm:text-base">
              <div className="mb-4">
                <p className="font-medium">Program:</p>
                <p className="text-xl font-bold text-purple-600">₹{programFee}</p>
              </div>
              
              <div className="flex justify-between items-center border-t pt-2">
                <span>Platform cut (10%) program fee:</span>
                <span>₹{calculations.platformFee}</span>
              </div>
              
              <div className="flex justify-between items-center border-t pt-2">
                <span>Razorpay fee (2%) program fee:</span>
                <span>₹{calculations.razorpayFee}</span>
              </div>
              
              <div className="flex justify-between items-center border-t border-purple-200 pt-2 mt-2 font-medium text-purple-700">
                <span>Your earnings:</span>
                <span>₹{calculations.mentorEarnings}</span>
              </div>
            </div>
          </div>
          <p className="text-sm sm:text-base text-gray-600">
            Start mentoring students and earn while helping others grow in their careers.
            Our platform handles all the logistics, payments, and student matching.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};