import { Shield } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const CategoryTopper = () => {
  return (
    <Alert variant="destructive" className="mb-8 border-destructive/50 bg-destructive/10">
      <Shield className="h-4 w-4" />
      <AlertTitle>Important Notice</AlertTitle>
      <AlertDescription className="text-sm">
        We exclusively support and verify mentors in Men's and Women's categories. All other categories are considered potential spam and are not endorsed by our platform.
      </AlertDescription>
    </Alert>
  );
};