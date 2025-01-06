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
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const currentPrice = program.regularPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="premium-card overflow-hidden group h-full flex flex-col relative">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="absolute top-2 right-2 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Program Information"
              >
                <InfoIcon className="w-4 h-4 text-gray-500" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-[200px]">
              <p>The program, {program.title}, is designed for beginners and intermediate-level developers.</p>
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
          onEnrollClick={() => setShowEnrollmentForm(true)}
          onShareClick={() => {}}
          currentPrice={currentPrice}
          regularPrice={program.regularPrice}
        />

        <EnrollmentForm 
          isOpen={showEnrollmentForm}
          onClose={() => setShowEnrollmentForm(false)}
          programTitle={program.title}
          amount={currentPrice}
        />
        <ShareProgramCard program={program} />
      </Card>
    </motion.div>
  );
};