import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Sparkles, PartyPopper } from "lucide-react";

export const NewYearMessage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show in January
    const currentMonth = new Date().getMonth();
    if (currentMonth === 0) {
      // Show after a slight delay for better UX
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-50 via-white to-purple-50 border-2 border-purple-200">
        <DialogTitle className="sr-only">New Year Message</DialogTitle>
        <DialogDescription className="sr-only">New Year celebration message and invitation</DialogDescription>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-4 py-4"
        >
          <div className="flex justify-center gap-2">
            <PartyPopper className="w-8 h-8 text-purple-600 animate-bounce" />
            <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
          </div>
          
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Happy New Year 2024!
          </h2>
          
          <p className="text-gray-600 px-4">
            Start your tech journey with personalized mentorship. Let's build amazing projects together! 🚀
          </p>
          
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-500"
          >
            Your success story begins here
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};