import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface SuccessCardProps {
  onClose: () => void;
}

export const SuccessCard = ({ onClose }: SuccessCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-center">Payment Successful!</h3>
        <div className="space-y-4">
          <p className="text-center text-gray-600">Please follow these steps:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Join our WhatsApp group using this link: <a href="https://chat.whatsapp.com/COaTqrI651TKlYTPrHOYDn" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Click here to join</a></li>
            <li>Introduce yourself in the group</li>
            <li>Share a screenshot of your payment confirmation</li>
          </ol>
          <Button onClick={onClose} className="w-full mt-4">Close</Button>
        </div>
      </CardContent>
    </Card>
  );
};