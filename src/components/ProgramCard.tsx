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
      <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-sm border-gray-100">
        <CardHeader className="space-y-2 p-6">
          <Badge variant="secondary" className="w-fit text-xs font-normal bg-gray-50 text-gray-600 hover:bg-gray-100">
            {program.category}
          </Badge>
          <CardTitle className="text-lg font-medium">{program.title}</CardTitle>
          <CardDescription className="text-sm text-gray-500">{program.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-grow space-y-4 px-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Duration: {program.duration}</p>
            <div className="flex flex-wrap gap-1.5">
              {program.skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="outline"
                  className="text-xs font-normal"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs">Certificate Included</span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 p-6 border-t">
          <p className="text-lg font-light">₹49</p>
          <Button 
            className="w-full bg-black hover:bg-gray-800 text-sm font-normal"
            onClick={handleEnrollClick}
          >
            Enroll Now
          </Button>
          <Button 
            variant="ghost"
            className="w-full text-xs text-gray-500 hover:text-gray-800 flex items-center justify-center gap-1"
            onClick={() => window.open('https://www.mygreatlearning.com/academy?referrer_code=GLL44ZJATMMKQ', '_blank')}
          >
            Learn for Free <ExternalLink className="w-3 h-3" />
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