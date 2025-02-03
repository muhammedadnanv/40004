import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MentorFormFields } from "./MentorFormFields";
import { useState } from "react";

interface MentorInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mentorEarnings: number;
}

export const MentorInfoDialog = ({ isOpen, onClose, mentorEarnings }: MentorInfoDialogProps) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] p-6">
        {!showForm ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-light text-center mb-4">
                Mentor Earnings Overview
              </DialogTitle>
              <DialogDescription className="text-center space-y-4">
                <p className="text-gray-600">
                  As a mentor on our platform, you'll earn approximately:
                </p>
                <p className="text-2xl font-semibold text-primary">
                  ₹{mentorEarnings.toFixed(2)} per student
                </p>
                <div className="text-sm text-gray-500 space-y-2">
                  <p>Program Fee: ₹2160</p>
                  <p>Platform Fee (10%): ₹{(2160 * 0.1).toFixed(2)}</p>
                  <p>Payment Gateway Fee (2%): ₹{(2160 * 0.02).toFixed(2)}</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-2"
              >
                Apply Now
              </Button>
            </div>
          </>
        ) : (
          <MentorFormFields onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};