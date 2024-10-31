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
      <Card className="flex flex-col h-full">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="bg-[#4A00E0]/5 text-[#4A00E0] hover:bg-[#4A00E0]/10">
              {program.category}
            </Badge>
          </div>
          <CardTitle>{program.title}</CardTitle>
          <CardDescription>{program.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Duration: {program.duration}</p>
              <div className="flex flex-wrap gap-2">
                {program.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-[#4A00E0]/10 text-[#4A00E0] hover:bg-[#4A00E0]/20">
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
            className="w-full bg-[#4A00E0] hover:bg-[#4A00E0]/90"
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