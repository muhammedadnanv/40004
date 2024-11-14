import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share } from "lucide-react";
import { ShareProgramCard } from "./ShareProgramCard";
import { EnrollmentForm } from "./EnrollmentForm";
import { showRandomJoinNotification } from "@/utils/mockNotifications";

interface ProgramCardProps {
  program: {
    title: string;
    description: string;
    duration: string;
    skills: string[];
    category: string;
  };
}

export const ProgramCard = ({ program }: ProgramCardProps) => {
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);

  useEffect(() => {
    const randomDelay = Math.floor(Math.random() * 30000) + 20000;
    const interval = setInterval(() => {
      showRandomJoinNotification();
    }, randomDelay);

    return () => clearInterval(interval);
  }, []);

  const handleEnrollClick = () => {
    setShowEnrollmentForm(true);
  };

  return (
    <Card className="group relative bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="space-y-2 p-4 sm:p-6">
        <Badge 
          variant="secondary" 
          className="w-fit text-[10px] sm:text-xs font-light"
        >
          {program.category}
        </Badge>
        
        <CardTitle className="text-base sm:text-lg md:text-xl font-light group-hover:text-primary transition-colors">
          {program.title}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">{program.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
        <div>
          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Duration: {program.duration}</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {program.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-[10px] sm:text-xs font-light bg-white/50"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-6">
        <p className="text-sm sm:text-base md:text-lg font-light">₹69</p>
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-xs sm:text-sm font-light shadow-material-1 hover:shadow-material-2 transition-all duration-300"
          onClick={handleEnrollClick}
        >
          Enroll Now
        </Button>
        <Button 
          variant="ghost"
          className="w-full text-[10px] sm:text-xs text-gray-500 hover:text-primary font-light group"
        >
          Share <Share className="w-3 h-3 ml-2 group-hover:scale-110 transition-transform" />
        </Button>
      </CardFooter>

      <EnrollmentForm 
        isOpen={showEnrollmentForm}
        onClose={() => setShowEnrollmentForm(false)}
        programTitle={program.title}
        amount={69}
      />
      <ShareProgramCard program={program} />
    </Card>
  );
};