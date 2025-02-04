import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MentorFormFields } from "./MentorFormFields";
import { useState } from "react";

interface MentorInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mentorEarnings: number;
}

export const MentorInfoDialog = ({ isOpen, onClose, mentorEarnings = 0 }: MentorInfoDialogProps) => {
  const [showForm, setShowForm] = useState(false);

  const handleClose = () => {
    setShowForm(false);
    onClose();
  };

  const platformFee = 2160 * 0.1; // 10% platform fee
  const paymentGatewayFee = 2160 * 0.02; // 2% payment gateway fee

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[800px] w-full p-6 sm:p-8">
        {!showForm ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-light text-center mb-4">
                Mentor Earnings Overview
              </DialogTitle>
              <DialogDescription className="text-center space-y-6">
                <p className="text-gray-600 text-lg">
                  As a mentor on our platform, you'll earn approximately:
                </p>
                <p className="text-3xl sm:text-4xl font-semibold text-primary">
                  ₹{mentorEarnings.toFixed(2)} per student
                </p>
                <div className="text-sm sm:text-base text-gray-500 space-y-2 max-w-md mx-auto">
                  <p>Program Fee: ₹2160</p>
                  <p>Platform Fee (10%): ₹{platformFee.toFixed(2)}</p>
                  <p>Payment Gateway Fee (2%): ₹{paymentGatewayFee.toFixed(2)}</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="mt-8 flex justify-center">
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-2 w-full sm:w-auto"
              >
                Apply Now
              </Button>
            </div>
          </>
        ) : (
          <MentorFormFields onClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};