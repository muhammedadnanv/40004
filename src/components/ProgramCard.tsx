import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface ProgramCardProps {
  program: {
    title: string;
    description: string;
    duration: string;
    skills: string[];
  };
}

export const ProgramCard = ({ program }: ProgramCardProps) => {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{program.title}</CardTitle>
        <CardDescription>{program.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Duration: {program.duration}</p>
            <div className="flex flex-wrap gap-2">
              {program.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm">Certificate Included</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <p className="text-2xl font-bold">₹49</p>
        <Button className="w-full">Enroll Now</Button>
      </CardFooter>
    </Card>
  );
};