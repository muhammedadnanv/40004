import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share, ExternalLink } from "lucide-react";
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
      className="h-full" // Added to ensure consistent height
    >
      <Card className="premium-card overflow-hidden group h-full flex flex-col"> {/* Added flex and h-full */}
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
        
        <CardContent className="space-y-4 p-6 flex-grow"> {/* Added flex-grow */}
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
          {program.title === "ManyChat Automation" && (
            <div className="text-sm text-gray-600 mt-2 p-3 bg-purple-50 rounded-md">
              <p>Note: You need to sign up for a ManyChat account separately. Use our partner link to get started:</p>
              <a 
                href="https://manychat.partnerlinks.io/ezwv4iv4rwb5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 flex items-center gap-1 mt-1"
              >
                Sign up for ManyChat <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3 p-6 bg-gray-50/50 mt-auto"> {/* Added mt-auto */}
          <p className="text-lg font-semibold premium-gradient">
            ₹{program.title === "ManyChat Automation" ? "599" : "199"}
          </p>
          {program.title === "ManyChat Automation" && (
            <p className="text-xs text-gray-500">
              *Additional ManyChat platform fees apply. Check pricing on ManyChat website.
            </p>
          )}
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
          amount={program.title === "ManyChat Automation" ? 599 : 199}
        />
        <ShareProgramCard program={program} />
      </Card>
    </motion.div>
  );
};