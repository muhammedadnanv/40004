
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
      <div className="flex flex-col gap-2 w-full">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Choose Your Duration:</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white p-3 rounded-lg border border-purple-200">
              <p className="text-lg font-bold text-purple-600">₹399</p>
              <p className="text-xs text-gray-600">5 weeks</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-purple-200">
              <p className="text-lg font-bold text-purple-600">₹999</p>
              <p className="text-xs text-gray-600">10 weeks</p>
            </div>
          </div>
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
