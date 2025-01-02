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

export const MentorInfoDialog = () => {
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
                <li>Client fee: ₹499</li>
                <li>Platform cut (10%): ₹49.90</li>
                <li>Razorpay fee (2%): ₹9.98</li>
                <li className="font-medium">Your Lickesalary: ₹439.12</li>
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