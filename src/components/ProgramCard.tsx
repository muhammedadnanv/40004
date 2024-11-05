import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { EnrollmentForm } from "./EnrollmentForm";

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

  return (
    <>
      <Card className="flex flex-col h-full transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur-sm border-[#4A00E0]/10">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="bg-[#4A00E0]/5 text-[#4A00E0] hover:bg-[#4A00E0]/10 transition-colors">
              {program.category}
            </Badge>
          </div>
          <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4A00E0] to-purple-600">
            {program.title}
          </CardTitle>
          <CardDescription className="text-gray-600">{program.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2 text-gray-700">Duration: {program.duration}</p>
              <div className="flex flex-wrap gap-2">
                {program.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="bg-[#4A00E0]/10 text-[#4A00E0] hover:bg-[#4A00E0]/20 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#4A00E0]">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Certificate Included</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-2xl font-bold text-[#4A00E0]">₹49</p>
          <Button 
            className="w-full bg-[#4A00E0] hover:bg-[#4A00E0]/90 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={() => setShowEnrollmentForm(true)}
          >
            Enroll Now
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