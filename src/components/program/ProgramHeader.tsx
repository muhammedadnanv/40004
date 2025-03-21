
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ProgramHeaderProps {
  title: string;
  description: string;
  category: string;
}

export const ProgramHeader = ({ title, description, category }: ProgramHeaderProps) => {
  return (
    <CardHeader className="space-y-2 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <Badge 
          variant="secondary" 
          className="w-fit text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
        >
          {category}
        </Badge>
      </div>
      
      <CardTitle className="text-base sm:text-lg md:text-xl font-semibold group-hover:premium-gradient transition-colors">
        {title}
      </CardTitle>
      <CardDescription className="text-xs sm:text-sm text-gray-600">
        {description}
      </CardDescription>
    </CardHeader>
  );
};
