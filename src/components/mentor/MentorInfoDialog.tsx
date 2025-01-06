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

export const MentorInfoDialog = ({ programFee = 499 }: MentorInfoDialogProps) => {
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
        <Button variant="outline" className="gap-2">
          <Info className="w-4 h-4" />
          Learn More About Mentorship
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4">
            Mentor Information
          </DialogTitle>
          <DialogDescription className="text-gray-600 space-y-4">
            <p>
              As a mentor, you'll receive a "Lickesalary" for each client who joins through your mentorship. Your earnings will be a portion of the client fee after platform and Razorpay cuts (10% platform fee + 2% Razorpay fee).
            </p>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="font-medium mb-2">Example Earnings:</p>
              <ul className="space-y-1">
                <li>Client fee: ₹{programFee}</li>
                <li>Platform cut (10%): ₹{calculations.platformFee}</li>
                <li>Razorpay fee (2%): ₹{calculations.razorpayFee}</li>
                <li className="font-medium">Your Lickesalary: ₹{calculations.mentorEarnings}</li>
              </ul>
            </div>
            <p>
              You'll guide mentees through projects, code reviews, and best practices while collaborating with our community. We offer a flexible schedule, compensation based on clients mentored, and a platform to showcase your expertise and expand your professional network.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};