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
          <DialogTitle>Important Payment Information</DialogTitle>
        </DialogHeader>
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please ensure that you have made the payment through your UPI ID or number. Do not scan the QR code.
          </AlertDescription>
        </Alert>
        <DialogFooter className="mt-4">
          <Button 
            onClick={() => {
              onClose();
              onProceed();
            }}
            className="w-full"
          >
            I Understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};