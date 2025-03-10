
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  projects: Array<{
    name: string;
    description: string;
    difficulty: string;
    category: string;
  }>;
  resetFilters: () => void;
}

export const ProjectList = ({ projects, resetFilters }: ProjectListProps) => {
  return (
    <ScrollArea className="h-[450px] sm:h-[500px] md:h-[600px] rounded-md border p-3 sm:p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))
        ) : (
          <div className="col-span-full py-8 sm:py-10 text-center text-gray-500">
            <p className="text-sm sm:text-base">No projects match your search criteria.</p>
            <Button variant="link" onClick={resetFilters}>
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
