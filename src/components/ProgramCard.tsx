import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share } from "lucide-react";
import { ShareProgramCard } from "./ShareProgramCard";
import { EnrollmentForm } from "./EnrollmentForm";
import { showRandomJoinNotification } from "@/utils/mockNotifications";
import { motion } from "framer-motion";

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
    const interval = setInterval(() => {
      showRandomJoinNotification();
    }, randomDelay);

    return () => clearInterval(interval);
  }, []);

  const handleEnrollClick = () => {
    setShowEnrollmentForm(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="premium-card overflow-hidden group">
        <CardHeader className="space-y-2 p-6">
          <Badge 
            variant="secondary" 
            className="w-fit text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {program.category}
          </Badge>
          
          <CardTitle className="text-lg sm:text-xl font-semibold group-hover:premium-gradient transition-colors">
            {program.title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            {program.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4 p-6">
          <div>
            <p className="text-sm text-gray-600 mb-3">Duration: {program.duration}</p>
            <div className="flex flex-wrap gap-2">
              {program.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs font-medium bg-white/50 hover:bg-primary/5 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 p-6 bg-gray-50/50">
          <p className="text-lg font-semibold premium-gradient">₹299</p>
          <Button 
            className="w-full bg-primary hover:bg-primary-600 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleEnrollClick}
          >
            Enroll Now
          </Button>
          <Button 
            variant="ghost"
            className="w-full text-xs text-gray-500 hover:text-primary font-medium group"
          >
            Share <Share className="w-3 h-3 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </CardFooter>

        <EnrollmentForm 
          isOpen={showEnrollmentForm}
          onClose={() => setShowEnrollmentForm(false)}
          programTitle={program.title}
          amount={299}
        />
        <ShareProgramCard program={program} />
      </Card>
    </motion.div>
  );
};