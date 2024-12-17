import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Share } from "lucide-react";

interface ProgramFooterProps {
  title: string;
  onEnrollClick: () => void;
  onShareClick: () => void;
}

export const ProgramFooter = ({ title, onEnrollClick, onShareClick }: ProgramFooterProps) => {
  return (
    <CardFooter className="flex flex-col gap-3 p-6 bg-gray-50/50 mt-auto">
      <p className="text-lg font-semibold premium-gradient">
        ₹{title === "ManyChat Automation" ? "599" : "199"}
      </p>
      {title === "ManyChat Automation" && (
        <p className="text-xs text-gray-500">
          *Additional ManyChat platform fees apply. Check pricing on ManyChat website.
        </p>
      )}
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