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
            Payment Information
          </DialogTitle>
        </DialogHeader>
        <Alert variant="default" className="mt-4 border-purple-200 bg-purple-50">
          <AlertCircle className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-800">
            For a smooth payment experience:
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>Use your UPI ID or number directly</li>
              <li>Ensure your UPI app is up-to-date</li>
              <li>Keep your screen active during payment</li>
            </ul>
          </AlertDescription>
        </Alert>
        <DialogFooter className="mt-6">
          <Button 
            onClick={() => {
              onClose();
              onProceed();
            }}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
          >
            Proceed to Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};