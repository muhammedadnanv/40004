import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share } from "lucide-react";
import { ShareProgramCard } from "./ShareProgramCard";
import { EnrollmentForm } from "./EnrollmentForm";
import { showRandomJoinNotification } from "@/utils/mockNotifications";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [selectedPlan, setSelectedPlan] = useState("basic");

  const plans = {
    basic: {
      price: 166,
      features: [
        "Weekly mentorship sessions",
        "Basic project reviews",
        "Community access",
        "Assignment feedback"
      ]
    },
    premium: {
      price: 599,
      features: [
        "All Basic features",
        "Priority support",
        "Extended mentorship hours",
        "Advanced project reviews",
        "Resource library access",
        "Career guidance"
      ]
    }
  };

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
      <CardHeader className="space-y-2 p-3 sm:p-4 md:p-6">
        <Badge 
          variant="secondary" 
          className="w-fit text-[10px] sm:text-xs font-light"
        >
          {program.category}
        </Badge>
        
        <CardTitle className="text-sm sm:text-base md:text-lg lg:text-xl font-light group-hover:text-primary transition-colors">
          {program.title}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">{program.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-4 md:p-6">
        <div>
          <p className="text-xs sm:text-sm text-gray-600 mb-2">Duration: {program.duration}</p>
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

        <Tabs defaultValue="basic" className="w-full" onValueChange={setSelectedPlan}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Plan</TabsTrigger>
            <TabsTrigger value="premium">Premium Plan</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="space-y-2">
            <div className="text-sm sm:text-base md:text-lg font-light">₹{plans.basic.price}</div>
            <ul className="text-xs sm:text-sm space-y-1">
              {plans.basic.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="premium" className="space-y-2">
            <div className="text-sm sm:text-base md:text-lg font-light">₹{plans.premium.price}</div>
            <ul className="text-xs sm:text-sm space-y-1">
              {plans.premium.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 md:p-6">
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
        amount={selectedPlan === "premium" ? plans.premium.price : plans.basic.price}
        selectedPlan={selectedPlan}
      />
      <ShareProgramCard program={program} />
    </Card>
  );
};