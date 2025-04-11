
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, User, MessageSquare, X, Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface PromotionPopupProps {
  title?: string;
  description?: string;
  buttonText?: string;
  delay?: number;
}

export const PromotionPopup = ({
  title = "Get Exclusive Updates",
  description = "Join our community to receive the latest updates, tips, and special offers.",
  buttonText = "Subscribe Now",
  delay = 5000,
}: PromotionPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Show popup after specified delay if not seen before
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("hasSeenPromotionPopup");
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast({
        title: "Success!",
        description: "Thank you for subscribing to our updates!",
      });
      
      // Mark as seen in local storage
      localStorage.setItem("hasSeenPromotionPopup", "true");
      setIsOpen(false);
      
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
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

  const handleClose = () => {
    setIsOpen(false);
    // Mark as seen even when dismissed
    localStorage.setItem("hasSeenPromotionPopup", "true");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="hidden">Open Popup</PopoverTrigger>
      <PopoverContent 
        className="w-[330px] sm:w-[380px] p-0 border-0 shadow-lg rounded-xl"
        sideOffset={0}
      >
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-t-xl p-4 text-white relative">
          <Button 
            variant="ghost" 
            className="absolute right-2 top-2 h-8 w-8 p-0 text-white hover:bg-white/20 rounded-full" 
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <Bell className="h-6 w-6" />
            <h3 className="font-semibold text-lg">{title}</h3>
          </div>
          <p className="text-sm opacity-90">{description}</p>
        </div>

        <div className="p-4 bg-white rounded-b-xl">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Input
                placeholder="Your Name (Optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 h-10 text-sm border-gray-200 focus:border-purple-400"
              />
              <User className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-10 text-sm border-gray-200 focus:border-purple-400"
                required
              />
              <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <Textarea
                placeholder="Additional Comments (Optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="pl-10 min-h-[80px] text-sm border-gray-200 focus:border-purple-400"
              />
              <MessageSquare className="w-4 h-4 absolute left-3 top-4 text-gray-400" />
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : buttonText}
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};
