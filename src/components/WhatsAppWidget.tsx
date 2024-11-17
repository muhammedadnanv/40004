import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export const WhatsAppWidget = () => {
  const { toast } = useToast();
  const phoneNumber = "919656778508";

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Opening WhatsApp",
      description: "Connecting you to our support team...",
      duration: 3000,
    });
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      <Button 
        onClick={handleWhatsAppClick}
        className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300"
        size="icon"
      >
        <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
      </Button>
    </div>
  );
};