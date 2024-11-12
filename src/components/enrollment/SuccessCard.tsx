import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SuccessCardProps {
  onClose: () => void;
}

export const SuccessCard = ({ onClose }: SuccessCardProps) => {
  const handleJoinWhatsApp = () => {
    window.open("https://chat.whatsapp.com/COaTqrI651TKlYTPrHOYDn", "_blank");
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="pt-6 space-y-6">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center justify-center"
        >
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-center bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Payment Successful!
          </h3>
          
          <div className="space-y-4">
            <p className="text-center text-gray-600">Please follow these steps:</p>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
              <li className="transition-all duration-200 hover:text-purple-600">
                Click the button below to join our WhatsApp group
              </li>
              <li className="transition-all duration-200 hover:text-purple-600">
                Introduce yourself in the group
              </li>
              <li className="transition-all duration-200 hover:text-purple-600">
                Share your payment confirmation screenshot
              </li>
            </ol>
            
            <div className="space-y-3 pt-4">
              <Button 
                onClick={handleJoinWhatsApp} 
                className="w-full bg-[#25D366] hover:bg-[#22c55e] text-white transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Join WhatsApp Group
              </Button>
              
              <Button 
                onClick={onClose} 
                variant="outline"
                className="w-full border-purple-200 hover:bg-purple-50 text-purple-600 hover:text-purple-700 transition-all duration-300"
              >
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};