import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, MessageSquare } from "lucide-react";

export const LeadCollectionPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("hasSeenLeadPopup");
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("https://formspree.io/f/xqaapwvz", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Thank you for your interest. We'll be in touch soon!",
        });
        localStorage.setItem("hasSeenLeadPopup", "true");
        setIsOpen(false);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Get Exclusive Updates
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Join our community to receive the latest updates, tips, and special offers.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                placeholder="Your Name"
                name="name"
                required
                className="pl-10 border-purple-200 focus:border-purple-400"
              />
              <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                type="email"
                placeholder="Email Address"
                name="email"
                required
                className="pl-10 border-purple-200 focus:border-purple-400"
              />
              <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                placeholder="Message (Optional)"
                name="message"
                className="pl-10 border-purple-200 focus:border-purple-400"
              />
              <MessageSquare className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Stay Updated"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};