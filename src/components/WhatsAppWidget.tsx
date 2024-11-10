import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export const WhatsAppWidget = () => {
  const { toast } = useToast();
  const phoneNumber = "919656778508"; // Format: country code (91) + number

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
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <Button 
        onClick={handleWhatsAppClick}
        className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};