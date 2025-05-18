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
import { InfoIcon } from "lucide-react";

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
  // Enrollment is disabled, but we keep the state for future use
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const currentPrice = program.regularPrice;

  // This is a dummy function that does nothing - enrollments are disabled
  const handleEnrollmentClick = () => {
    // Enrollment is disabled, so this function does nothing
    return;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="premium-card overflow-hidden group h-full flex flex-col relative hover:shadow-xl transition-shadow duration-300">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm hover:shadow-md"
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
                {program.title} is designed for both beginners and intermediate-level developers. 
                Get personalized mentorship and hands-on project experience.
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

        <div className="flex justify-between items-center mt-auto p-4">
          <ProgramFooter 
            title={program.title}
            onEnrollClick={handleEnrollmentClick}
            onShareClick={() => {}}
            currentPrice={currentPrice}
            regularPrice={program.regularPrice}
          />
          
          <div className="shrink-0 ml-2">
            <ShareProgramCard program={program} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
