
import { Button } from "@/components/ui/button";
import { MentorInfoDialog } from "./mentor/MentorInfoDialog";
import { useState } from "react";

interface MentorSectionProps {
  mentorEarnings: number;
}

export const MentorSection = ({ mentorEarnings }: MentorSectionProps) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 bg-gradient-to-b from-white via-purple-50/30 to-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8">Become a Mentor</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Join our platform as a mentor and help aspiring developers achieve their goals while earning from your expertise.
        </p>
        <Button 
          onClick={() => setShowDialog(true)}
          className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-5 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
        >
          Apply as Mentor
        </Button>
        <MentorInfoDialog 
          isOpen={showDialog} 
          onClose={() => setShowDialog(false)}
          mentorEarnings={mentorEarnings}
        />
      </div>
    </section>
  );
};
