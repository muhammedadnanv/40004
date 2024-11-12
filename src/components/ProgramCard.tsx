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
        <CardHeader className="space-y-3 sm:space-y-4">
          <Badge 
            variant="secondary" 
            className="w-fit text-xs font-light bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
          >
            {program.category}
          </Badge>
          <CardTitle className="text-lg sm:text-xl font-light group-hover:text-primary transition-colors">
            {program.title}
          </CardTitle>
          <CardDescription className="text-sm">{program.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-3 sm:mb-4">Duration: {program.duration}</p>
            <div className="flex flex-wrap gap-2">
              {program.skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="outline"
                  className="text-xs font-light border-primary/20 text-primary/80"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs">Certificate Included</span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 sm:gap-4 pt-4 sm:pt-6">
          <p className="text-base sm:text-lg font-light">₹49</p>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-sm font-light shadow-material-1 hover:shadow-material-2 transition-all duration-300"
            onClick={handleEnrollClick}
          >
            Enroll Now
          </Button>
          <Button 
            variant="ghost"
            className="w-full text-xs text-gray-500 hover:text-primary font-light group"
            onClick={() => window.open('https://www.mygreatlearning.com/academy?referrer_code=GLL44ZJATMMKQ', '_blank')}
          >
            Learn <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
        </CardFooter>
      </Card>

      <EnrollmentForm 
        isOpen={showEnrollmentForm}
        onClose={() => setShowEnrollmentForm(false)}
        programTitle={program.title}
        amount={49}
      />
    </>
  );
};