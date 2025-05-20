
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const EnrollmentAlert = () => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    // Show alert after 30 seconds if the user hasn't interacted with it yet
    const timer = setTimeout(() => {
      const hasShownAlert = localStorage.getItem("hasShownEnrollmentAlert");
      if (!hasShownAlert) {
        setShow(true);
      }
    }, 30000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("hasShownEnrollmentAlert", "true");
  };
  
  const handleEnroll = () => {
    setShow(false);
    localStorage.setItem("hasShownEnrollmentAlert", "true");
    // Scroll to programs section
    const programsSection = document.getElementById("programs-section");
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-40 max-w-sm"
        >
          <Alert className="bg-white border-purple-200 shadow-lg">
            <Bell className="h-4 w-4 text-purple-600" />
            <div className="ml-2">
              <AlertTitle className="text-purple-700 font-medium">
                Limited Time Offer!
              </AlertTitle>
              <AlertDescription className="text-gray-600 mt-2">
                Our Professional Developer Certification is now available with Dodo Payment integration. Secure your spot today!
              </AlertDescription>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="default"
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs"
                  size="sm"
                  onClick={handleEnroll}
                >
                  View Programs
                </Button>
                <Button 
                  variant="outline" 
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 text-xs"
                  size="sm"
                  onClick={handleDismiss}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
