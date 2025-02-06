import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";

export const EnrollmentAlert = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if it's the first day of the month
    const today = new Date();
    const isFirstDayOfMonth = today.getDate() === 1;

    if (isFirstDayOfMonth) {
      // Show alert after a short delay only if it's the first day of the month
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 right-4 z-50 w-full max-w-[90vw] sm:max-w-md"
    >
      <Alert variant="destructive" className="border-red-500/50 bg-red-500/10">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="text-red-700 font-semibold">Limited Enrollment</AlertTitle>
        <AlertDescription className="text-red-600">
          Only 100 seats available for this month's enrollment. Secure your spot now!
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};