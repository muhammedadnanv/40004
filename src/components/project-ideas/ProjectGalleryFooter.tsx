
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProjectGalleryFooterProps {
  filteredProjectsCount: number;
  totalProjectsCount: number;
  isUnlocked: boolean;
  downloadProjects: () => void;
}

export const ProjectGalleryFooter = ({ 
  filteredProjectsCount, 
  totalProjectsCount, 
  isUnlocked, 
  downloadProjects 
}: ProjectGalleryFooterProps) => {
  return (
    <div className="mt-3 sm:mt-4 flex flex-col xs:flex-row justify-between items-center gap-2">
      <p className="text-xs sm:text-sm text-gray-500 text-center xs:text-left">
        Showing {filteredProjectsCount} of {totalProjectsCount} projects
      </p>
      {isUnlocked && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={downloadProjects}
          className="flex items-center gap-2 text-xs sm:text-sm w-full xs:w-auto"
        >
          <Download size={14} className="sm:size-16" />
          Download Ideas
        </Button>
      )}
    </div>
  );
};
