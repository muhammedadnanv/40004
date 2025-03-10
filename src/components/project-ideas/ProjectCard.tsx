
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: {
    name: string;
    description: string;
    difficulty: string;
    category: string;
  };
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow h-full" data-gpteng-selectable>
      <CardHeader className="p-4 sm:p-6">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base sm:text-lg font-medium">{project.name}</CardTitle>
          <Badge variant={
            project.difficulty === "Beginner" ? "secondary" :
            project.difficulty === "Intermediate" ? "default" :
            "destructive"
          }>
            {project.difficulty}
          </Badge>
        </div>
        <CardDescription className="text-xs sm:text-sm text-gray-500">
          {project.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
        <p className="text-xs sm:text-sm text-gray-600">{project.description}</p>
      </CardContent>
    </Card>
  );
};
