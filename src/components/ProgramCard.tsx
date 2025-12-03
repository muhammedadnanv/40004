import { useState } from "react";
import { Card } from "@/components/ui/card";
import { EnrollmentForm } from "./EnrollmentForm";
import { ShareProgramCard } from "./ShareProgramCard";
import { motion } from "framer-motion";
import { ProgramHeader } from "./program/ProgramHeader";
import { ProgramContent } from "./program/ProgramContent";
import { ProgramFooter } from "./program/ProgramFooter";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
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
export const ProgramCard = ({
  program
}: ProgramCardProps) => {
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
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileHover={{
    scale: isLocked ? 1 : 1.02
  }} whileTap={{
    scale: isLocked ? 1 : 0.98
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }} className="h-full">
      

      {showEnrollmentForm && !isLocked && <EnrollmentForm isOpen={showEnrollmentForm} onClose={() => setShowEnrollmentForm(false)} programTitle={program.title} amount={currentPrice} />}

      {showShareCard && <ShareProgramCard program={program} isOpen={showShareCard} onClose={() => setShowShareCard(false)} />}
    </motion.div>;
};