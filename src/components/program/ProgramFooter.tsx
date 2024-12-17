import { Button } from "@/components/ui/card";
import { CardFooter } from "@/components/ui/card";
import { Share, Clock } from "lucide-react";

interface ProgramFooterProps {
  title: string;
  onEnrollClick: () => void;
  onShareClick: () => void;
}

export const ProgramFooter = ({ title, onEnrollClick, onShareClick }: ProgramFooterProps) => {
  // Calculate end date (10 days from now)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 10);
  const formattedEndDate = endDate.toLocaleDateString();

  return (
    <CardFooter className="flex flex-col gap-3 p-6 bg-gray-50/50 mt-auto">
      <div className="flex items-center justify-between w-full">
        <p className="text-lg font-semibold premium-gradient">
          ₹10
          <span className="text-xs text-gray-500 ml-2 font-normal">Limited time offer!</span>
        </p>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="w-3 h-3 mr-1" />
          Ends {formattedEndDate}
        </div>
      </div>
      <Button 
        className="w-full bg-primary hover:bg-primary-600 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={onEnrollClick}
      >
        Enroll Now
      </Button>
      <Button 
        variant="ghost"
        className="w-full text-xs text-gray-500 hover:text-primary font-medium group"
        onClick={onShareClick}
      >
        Share <Share className="w-3 h-3 ml-2 group-hover:scale-110 transition-transform" />
      </Button>
    </CardFooter>
  );
};