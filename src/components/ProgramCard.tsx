
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { EnrollmentForm } from "./EnrollmentForm";
import { ShareProgramCard } from "./ShareProgramCard";
import { motion } from "framer-motion";
import { ProgramHeader } from "./program/ProgramHeader";
import { ProgramContent } from "./program/ProgramContent";
import { ProgramFooter } from "./program/ProgramFooter";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { InfoIcon, Lock } from "lucide-react";

interface ProgramCardProps {
  program: {
    title: string;
    description: string;
    duration: string;
    skills: string[];
    category: string;
    regularPrice: number;
  };
}

export const ProgramCard = ({ program }: ProgramCardProps) => {
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);
  const currentPrice = 699; // Fixed price for all programs
  
  // Check if programs should be unlocked (July 21, 2025)
  const activationDate = new Date('2025-07-21T00:00:00');
  const currentDate = new Date();
  const isLocked = currentDate < activationDate;

  const handleEnrollmentClick = () => {
    if (!isLocked) {
      setShowEnrollmentForm(true);
    }
  };

  const handleShareClick = () => {
    setShowShareCard(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileHover={{ scale: isLocked ? 1 : 1.02 }}
      whileTap={{ scale: isLocked ? 1 : 0.98 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className={`premium-card overflow-hidden group h-full flex flex-col relative transition-shadow duration-300 mobile-card touch-manipulation ${isLocked ? 'opacity-75 grayscale' : 'hover:shadow-xl'}`}>
        {isLocked && (
          <div className="absolute inset-0 bg-black/10 z-20 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
              <Lock className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        )}
        
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm hover:shadow-md mobile-touch-target touch-manipulation"
                aria-label={`Information about ${program.title}`}
              >
                <InfoIcon className="w-4 h-4 text-purple-600" />
              </button>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              sideOffset={5}
              align="center"
              className="max-w-[250px] p-3 bg-white shadow-lg rounded-lg border border-purple-100 z-50"
            >
              <p className="text-sm text-gray-600">
                {isLocked 
                  ? "This program is currently locked and enrollment is not available."
                  : `${program.title} is designed for both beginners and intermediate-level developers. Get personalized mentorship and hands-on project experience.`
                }
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <ProgramHeader 
          title={program.title}
          description={program.description}
          category={program.category}
        />
        
        <ProgramContent 
          duration={program.duration}
          skills={program.skills}
          title={program.title}
        />

        <ProgramFooter 
          title={program.title}
          onEnrollClick={handleEnrollmentClick}
          onShareClick={handleShareClick}
          currentPrice={currentPrice}
          regularPrice={program.regularPrice}
          isLocked={isLocked}
        />
      </Card>

      {showEnrollmentForm && !isLocked && (
        <EnrollmentForm
          isOpen={showEnrollmentForm}
          onClose={() => setShowEnrollmentForm(false)}
          programTitle={program.title}
          amount={currentPrice}
        />
      )}

      {showShareCard && (
        <ShareProgramCard 
          program={program}
          isOpen={showShareCard}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </motion.div>
  );
};
