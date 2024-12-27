import { Shield } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const CategoryTopper = () => {
  return (
    <Alert variant="destructive" className="mb-8 border-destructive/50 bg-destructive/10">
      <Shield className="h-4 w-4" />
      <AlertTitle>Important Notice</AlertTitle>
      <AlertDescription className="text-sm">
        We exclusively support and verify mentors in Men's and Women's categories. All other categories are considered potential spam and are not endorsed by our platform.<br />
          Make sure you pay the amount quickly; otherwise, the payment will fail, and you'll have to wait 7 days to get the amount credited back to your account.<br />
        Please ensure that you have made the payment through your UPI ID or number. Do not scan the QR code
      </AlertDescription>
    </Alert>
  );
};
