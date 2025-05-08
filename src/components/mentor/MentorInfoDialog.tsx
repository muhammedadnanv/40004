
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

  const programFee = 199; // Updated from 2160 to 199
  const platformFeePercentage = 20; // Updated from 10% to 20%
  const platformFee = programFee * (platformFeePercentage / 100);
  const paymentGatewayFee = programFee * 0.02; // 2% payment gateway fee

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[800px] w-[calc(100%-2rem)] p-4 sm:p-6 md:p-8 mx-auto">
        {!showForm ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-light text-center mb-3 sm:mb-4">
                Mentor Earnings Overview
              </DialogTitle>
              <div className="text-center space-y-4 sm:space-y-6">
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                  As a mentor on our platform, you'll earn approximately:
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary">
                  ₹{mentorEarnings.toFixed(2)} per student
                </p>
                <div className="text-xs sm:text-sm text-gray-500 space-y-1 sm:space-y-2 max-w-md mx-auto">
                  <p>Program Fee: ₹{programFee}</p>
                  <p>Platform Fee ({platformFeePercentage}%): ₹{platformFee.toFixed(2)}</p>
                  <p>Payment Gateway Fee (2%): ₹{paymentGatewayFee.toFixed(2)}</p>
                </div>
              </div>
            </DialogHeader>
            <div className="mt-6 sm:mt-8 flex justify-center">
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-2 w-full sm:w-auto text-sm sm:text-base"
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
