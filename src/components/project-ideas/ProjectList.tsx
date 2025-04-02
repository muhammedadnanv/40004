
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";
import { ShareProjectIdea } from "./ShareProjectIdea";
import { useState } from "react";
import { Share2 } from "lucide-react";

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
  const [sharingProject, setSharingProject] = useState<{
    name: string;
    description: string;
    difficulty: string;
    category: string;
  } | null>(null);

  const handleShareClick = (project: {
    name: string;
    description: string;
    difficulty: string;
    category: string;
  }) => {
    setSharingProject(project);
  };

  const closeShareModal = () => {
    setSharingProject(null);
  };

  return (
    <>
      <ScrollArea className="h-[450px] sm:h-[500px] md:h-[600px] rounded-md border p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={index} className="flex flex-col">
                <ProjectCard project={project} />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 text-xs w-full sm:w-auto flex items-center justify-center gap-1"
                  onClick={() => handleShareClick(project)}
                >
                  <Share2 className="h-3 w-3" />
                  Share Project Idea
                </Button>
              </div>
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

      {sharingProject && (
        <ShareProjectIdea 
          project={sharingProject}
          onClose={closeShareModal}
        />
      )}
    </>
  );
};
