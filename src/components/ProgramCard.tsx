import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { EnrollmentForm } from "./EnrollmentForm";
import { ShareProgramCard } from "./ShareProgramCard";
import { showImmediateJoinNotification, showProgramPopularityNotification } from "@/utils/mockNotifications";

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
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const randomDelay = Math.floor(Math.random() * 30000) + 20000;
    const timer = setTimeout(() => {
      showProgramPopularityNotification(program.title);
    }, randomDelay);

    return () => clearTimeout(timer);
  }, [program.title]);

  const handleEnrollClick = () => {
    setShowEnrollmentForm(true);
    showImmediateJoinNotification(program.title);
  };

  return (
    <>
      <Card className="group border-0 shadow-material-1 hover:shadow-material-3 transition-shadow duration-300 ease-in-out animate-scale-in h-full">
        <CardHeader className="space-y-2 sm:space-y-3 p-4 sm:p-6">
          <Badge 
            variant="secondary" 
            className="w-fit text-xs font-light bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
          >
            {program.category}
          </Badge>
          <CardTitle className="text-base sm:text-lg md:text-xl font-light group-hover:text-primary transition-colors">
            {program.title}
          </CardTitle>
          <CardDescription className={`text-xs sm:text-sm ${!isEnrolled ? 'blur-sm' : ''}`}>
            {program.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className={`space-y-3 sm:space-y-4 p-4 sm:p-6 ${!isEnrolled ? 'blur-sm' : ''}`}>
          <div>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Duration: {program.duration}</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {program.skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="outline"
                  className="text-[10px] sm:text-xs font-light border-primary/20 text-primary/80"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-primary">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-[10px] sm:text-xs">Certificate Included</span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 sm:gap-3 p-4 sm:p-6">
          <p className="text-sm sm:text-base md:text-lg font-light">₹49</p>
          {!isEnrolled ? (
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-xs sm:text-sm font-light shadow-material-1 hover:shadow-material-2 transition-all duration-300"
              onClick={handleEnrollClick}
            >
              Enroll Now
            </Button>
          ) : (
            <Button 
              variant="outline"
              className="w-full text-xs sm:text-sm font-light border-primary/20 text-primary/80"
              disabled
            >
              Enrolled
            </Button>
          )}
          <Button 
            variant="ghost"
            className="w-full text-[10px] sm:text-xs text-gray-500 hover:text-primary font-light group"
            onClick={() => window.open('https://www.mygreatlearning.com/academy?referrer_code=GLL44ZJATMMKQ', '_blank')}
          >
            Learn <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
        </CardFooter>
      </Card>

      <EnrollmentForm 
        isOpen={showEnrollmentForm}
        onClose={() => {
          setShowEnrollmentForm(false);
          setIsEnrolled(true);
        }}
        programTitle={program.title}
        amount={49}
      />
    </>
  );
};