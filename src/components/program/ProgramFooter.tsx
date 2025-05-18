
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Share, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProgramFooterProps {
  title: string;
  onEnrollClick: () => void;
  onShareClick: () => void;
  currentPrice: number;
  regularPrice: number;
}

export const ProgramFooter = ({ 
  title, 
  onEnrollClick, 
  onShareClick,
  currentPrice,
}: ProgramFooterProps) => {
  // Calculate reopening date - 7 months from now
  const today = new Date();
  const reopeningDate = new Date(today);
  reopeningDate.setMonth(today.getMonth() + 7);
  const formattedReopeningDate = reopeningDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <CardFooter className="flex flex-col gap-3 p-6 bg-gray-50/50 mt-auto">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <p className="text-lg font-semibold premium-gradient">
            ₹{currentPrice}
          </p>
        </div>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full">
              <Button 
                className="w-full bg-gray-400 hover:bg-gray-500 text-sm font-medium shadow-lg transition-all duration-300 cursor-not-allowed"
                disabled={true}
              >
                Program Closed
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-[250px] p-3 bg-white">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <p className="text-sm text-gray-700">Programs temporarily closed until {formattedReopeningDate} due to mentor unavailability and technical updates.</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
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
