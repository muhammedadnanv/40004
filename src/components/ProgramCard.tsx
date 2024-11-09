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
      <Card className="border-0 shadow-none hover:bg-gray-50 transition-colors duration-300">
        <CardHeader className="space-y-4">
          <Badge variant="secondary" className="w-fit text-xs font-light bg-gray-100 text-gray-600 hover:bg-gray-200">
            {program.category}
          </Badge>
          <CardTitle className="text-xl font-light">{program.title}</CardTitle>
          <CardDescription className="text-sm">{program.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-4">Duration: {program.duration}</p>
            <div className="flex flex-wrap gap-2">
              {program.skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="outline"
                  className="text-xs font-light"
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

        <CardFooter className="flex flex-col gap-4 pt-6">
          <p className="text-lg font-light">₹49</p>
          <Button 
            className="w-full bg-black hover:bg-gray-900 text-sm font-light"
            onClick={handleEnrollClick}
          >
            Enroll Now
          </Button>
          <Button 
            variant="ghost"
            className="w-full text-xs text-gray-500 hover:text-gray-800 font-light"
            onClick={() => window.open('https://www.mygreatlearning.com/academy?referrer_code=GLL44ZJATMMKQ', '_blank')}
          >
            Learn for Free <ExternalLink className="w-3 h-3 ml-1" />
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