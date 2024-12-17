import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SantaHat } from "lucide-react";

interface ProgramHeaderProps {
  title: string;
  description: string;
  category: string;
}

export const ProgramHeader = ({ title, description, category }: ProgramHeaderProps) => {
  return (
    <CardHeader className="space-y-2 p-6">
      <div className="flex items-center justify-between">
        <Badge 
          variant="secondary" 
          className="w-fit text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          {category}
        </Badge>
        <SantaHat className="w-6 h-6 text-red-500 animate-bounce" />
      </div>
      
      <CardTitle className="text-lg sm:text-xl font-semibold group-hover:premium-gradient transition-colors">
        {title}
      </CardTitle>
      <CardDescription className="text-sm text-gray-600">
        {description}
      </CardDescription>
    </CardHeader>
  );
};