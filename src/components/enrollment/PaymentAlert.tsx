import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface PaymentAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export const PaymentAlert = ({ isOpen, onClose, onProceed }: PaymentAlertProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            WhatsApp UPI Payment
          </DialogTitle>
        </DialogHeader>
        <Alert variant="default" className="mt-4 border-green-200 bg-green-50">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Payment Process:</strong>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>📱 Your details will be sent via WhatsApp</li>
              <li>💰 Payment instructions will follow immediately</li>
              <li>🔗 Use the UPI ID provided for direct payment</li>
              <li>📸 Send payment screenshot for confirmation</li>
              <li>✅ Manual verification by our team</li>
            </ul>
          </AlertDescription>
        </Alert>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>💡 Note:</strong> This will open WhatsApp with your enrollment details and payment instructions. 
            Complete the UPI payment and send the transaction screenshot to confirm your enrollment.
          </p>
        </div>
        <DialogFooter className="mt-6">
          <Button 
            onClick={() => {
              onClose();
              onProceed();
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors"
          >
            Send to WhatsApp & Pay via UPI
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};