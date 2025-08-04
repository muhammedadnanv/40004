
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

  // Platform pricing structure: 5-week (₹399) and 10-week (₹999)
  const fiveWeekPrice = 399;
  const tenWeekPrice = 999;
  const platformFeePercentage = 15; // 15% platform fee
  
  // Calculate mentor earnings (85% of program fees)
  const fiveWeekMentorEarning = fiveWeekPrice * 0.85;
  const tenWeekMentorEarning = tenWeekPrice * 0.85;
  const avgMentorEarning = (fiveWeekMentorEarning + tenWeekMentorEarning) / 2;

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
                  As a mentor on our platform, you'll earn 85% of program fees:
                </p>
                <div className="space-y-2">
                  <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary">
                    ₹{fiveWeekMentorEarning.toFixed(0)} (5-week program)
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary">
                    ₹{tenWeekMentorEarning.toFixed(0)} (10-week program)
                  </p>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 space-y-1 sm:space-y-2 max-w-md mx-auto">
                  <p className="font-medium">Pricing Breakdown:</p>
                  <p>5-week Program: ₹{fiveWeekPrice} → Mentor gets ₹{fiveWeekMentorEarning.toFixed(0)} (85%)</p>
                  <p>10-week Program: ₹{tenWeekPrice} → Mentor gets ₹{tenWeekMentorEarning.toFixed(0)} (85%)</p>
                  <p className="text-xs mt-2">Platform fee: {platformFeePercentage}% | Mentor earnings: 85%</p>
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
