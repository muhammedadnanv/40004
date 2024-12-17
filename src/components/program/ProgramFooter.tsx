import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Share, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface ProgramFooterProps {
  title: string;
  onEnrollClick: () => void;
  onShareClick: () => void;
  currentPrice: number;
  regularPrice: number;
  isOfferValid: boolean;
  offerEndDate: Date;
}

export const ProgramFooter = ({ 
  title, 
  onEnrollClick, 
  onShareClick,
  currentPrice,
  regularPrice,
  isOfferValid,
  offerEndDate
}: ProgramFooterProps) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = offerEndDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft("Offer expired");
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    };

    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer);
  }, [offerEndDate]);

  return (
    <CardFooter className="flex flex-col gap-3 p-6 bg-gray-50/50 mt-auto">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <p className="text-lg font-semibold premium-gradient">
            ₹{currentPrice}
            {isOfferValid && regularPrice > currentPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ₹{regularPrice}
              </span>
            )}
          </p>
          {isOfferValid && (
            <span className="text-xs text-gray-500">Limited time offer!</span>
          )}
        </div>
        {isOfferValid && (
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            {timeLeft}
          </div>
        )}
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