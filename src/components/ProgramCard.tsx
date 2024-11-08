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
    // Show program popularity notification randomly
    const randomDelay = Math.floor(Math.random() * 30000) + 20000; // Random delay between 20-50 seconds
    const timer = setTimeout(() => {
      showProgramPopularityNotification(program.title);
    }, randomDelay);

    return () => clearTimeout(timer);
  }, [program.title]);

  const handleEnrollClick = () => {
    setShowEnrollmentForm(true);
    // Show immediate join notification
    showImmediateJoinNotification(program.title);
  };

  return (
    <>
      <Card className="flex flex-col h-full transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm border-[#4A00E0]/10 group">
        <CardHeader className="space-y-1.5 sm:space-y-2 p-2.5 sm:p-3 md:p-4 lg:p-6">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2 flex-wrap gap-1.5 sm:gap-2">
            <Badge variant="outline" className="bg-[#4A00E0]/5 text-[#4A00E0] hover:bg-[#4A00E0]/10 transition-colors text-[10px] sm:text-xs md:text-sm">
              {program.category}
            </Badge>
            <ShareProgramCard program={program} />
          </div>
          <CardTitle className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4A00E0] to-purple-600 group-hover:scale-105 transition-transform">
            {program.title}
          </CardTitle>
          <CardDescription className="text-[11px] sm:text-xs md:text-sm lg:text-base text-gray-600">
            {program.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-2 sm:space-y-3 md:space-y-4 p-2.5 sm:p-3 md:p-4 lg:p-6">
          <div>
            <p className="text-[11px] sm:text-xs md:text-sm font-medium mb-1.5 sm:mb-2 text-gray-700">Duration: {program.duration}</p>
            <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
              {program.skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="bg-[#4A00E0]/10 text-[#4A00E0] hover:bg-[#4A00E0]/20 transition-colors group-hover:translate-y-[-2px] text-[9px] sm:text-[10px] md:text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[#4A00E0]">
            <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            <span className="text-[10px] sm:text-xs md:text-sm">Certificate Included</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-1.5 sm:gap-2 md:gap-3 p-2.5 sm:p-3 md:p-4 lg:p-6">
          <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-[#4A00E0]">₹49</p>
          <Button 
            className="w-full bg-[#4A00E0] hover:bg-[#4A00E0]/90 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg text-[10px] sm:text-xs md:text-sm py-1 sm:py-1.5 md:py-2"
            onClick={handleEnrollClick}
          >
            Enroll Now
          </Button>
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <Button 
              variant="link" 
              className="w-full mt-2 text-[10px] sm:text-xs md:text-sm text-gray-600 hover:text-[#4A00E0] flex items-center justify-center gap-1"
              onClick={() => window.open('https://www.mygreatlearning.com/academy?referrer_code=GLL44ZJATMMKQ', '_blank')}
            >
              Learn for Free <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
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