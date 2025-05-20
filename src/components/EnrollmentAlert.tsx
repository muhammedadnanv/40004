
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LockIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const EnrollmentAlert = () => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    // Programs are closed, so we don't need to show the enrollment alert
    setShow(false);
  }, []);
  
  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("hasShownEnrollmentAlert", "true");
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
          <Alert className="bg-white border-red-200 shadow-lg">
            <LockIcon className="h-4 w-4 text-red-600" />
            <div className="ml-2">
              <AlertTitle className="text-red-700 font-medium">
                Programs Currently Closed
              </AlertTitle>
              <AlertDescription className="text-gray-600 mt-2">
                All programs are currently closed for enrollment. Please check back later for updates.
              </AlertDescription>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  className="border-red-200 text-red-600 hover:bg-red-50 text-xs"
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
