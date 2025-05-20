
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Share, LockIcon } from "lucide-react";

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
  return (
    <CardFooter className="flex flex-col gap-3 p-6 bg-gray-50/50 mt-auto">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <p className="text-lg font-semibold premium-gradient">
            ₹{currentPrice}
          </p>
        </div>
      </div>
      
      <Button 
        className="w-full bg-gray-400 hover:bg-gray-500 text-sm font-medium shadow-lg transition-all duration-300 cursor-not-allowed"
        disabled={true}
      >
        <LockIcon className="w-4 h-4 mr-2" /> Programs Closed
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
