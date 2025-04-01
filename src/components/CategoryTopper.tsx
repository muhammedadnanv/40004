
import { TagIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { VALID_REFERRAL_CODES } from "@/utils/referralUtils";

export const CategoryTopper = () => {
  // Get a few random referral codes to showcase
  const referralCodes = Object.keys(VALID_REFERRAL_CODES).slice(0, 3);
  
  return (
    <Alert variant="default" className="mb-8 border-accent/50 bg-accent/10">
      <TagIcon className="h-4 w-4" />
      <AlertTitle>Referral Program</AlertTitle>
      <AlertDescription className="text-sm">
        Share your unique referral code with friends and earn rewards when they enroll in our programs. 
        Anyone using a referral code gets a discount on their enrollment.<br />
        Popular codes: {referralCodes.join(", ")}<br />
        Apply the code during checkout to receive your discount instantly.
      </AlertDescription>
    </Alert>
  );
};
