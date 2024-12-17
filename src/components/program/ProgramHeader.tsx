import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ProgramHeaderProps {
  title: string;
  description: string;
  category: string;
}

export const ProgramHeader = ({ title, description, category }: ProgramHeaderProps) => {
  return (
    <CardHeader className="space-y-2 p-6">
      <Badge 
        variant="secondary" 
        className="w-fit text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
      >
        {category}
      </Badge>
      
      <CardTitle className="text-lg sm:text-xl font-semibold group-hover:premium-gradient transition-colors">
        {title}
      </CardTitle>
      <CardDescription className="text-sm text-gray-600">
        {description}
      </CardDescription>
    </CardHeader>
  );
};