import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share, Check } from "lucide-react";
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

interface PricingPlan {
  name: string;
  price: number;
  features: string[];
}

export const ProgramCard = ({ program }: ProgramCardProps) => {
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(plans[0]);

  const plans: PricingPlan[] = [
    {
      name: "Basic",
      price: 166,
      features: [
        "Weekly mentorship sessions",
        "Basic project reviews",
        "Community access",
        "Course materials"
      ]
    },
    {
      name: "Premium",
      price: 599,
      features: [
        "Everything in Basic",
        "Priority support",
        "Extended mentorship hours",
        "Advanced resources",
        "1-on-1 career guidance",
        "Certificate of completion"
      ]
    }
  ];

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
      </CardContent>

      <CardFooter className="flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 md:p-6">
        <Tabs defaultValue="basic" className="w-full" onValueChange={(value) => setSelectedPlan(plans[value === 'basic' ? 0 : 1])}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>
          {plans.map((plan) => (
            <TabsContent key={plan.name.toLowerCase()} value={plan.name.toLowerCase()} className="mt-0">
              <div className="space-y-2">
                <p className="text-lg font-semibold text-primary">₹{plan.price}</p>
                <ul className="space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-xs sm:text-sm flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          ))}
        </Tabs>

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
        amount={selectedPlan.price}
      />
      <ShareProgramCard program={program} />
    </Card>
  );
};