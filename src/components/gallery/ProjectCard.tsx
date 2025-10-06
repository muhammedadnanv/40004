import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Eye, ExternalLink, Github } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProjectCardProps {
  project: any;
  onUpdate: () => void;
}

export const ProjectCard = ({ project, onUpdate }: ProjectCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(project.likes_count || 0);
  const { toast } = useToast();

  const handleLike = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like projects",
        variant: "destructive",
      });
      return;
    }

    try {
      if (liked) {
        await supabase
          .from("project_likes")
          .delete()
          .eq("project_id", project.id)
          .eq("user_id", user.id);
        
        await supabase
          .from("projects")
          .update({ likes_count: likes - 1 })
          .eq("id", project.id);
        
        setLikes(likes - 1);
        setLiked(false);
      } else {
        await supabase
          .from("project_likes")
          .insert({ project_id: project.id, user_id: user.id });
        
        await supabase
          .from("projects")
          .update({ likes_count: likes + 1 })
          .eq("id", project.id);
        
        setLikes(likes + 1);
        setLiked(true);
      }
      
      onUpdate();
    } catch (error) {
      console.error("Error liking project:", error);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {project.image_url && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-xl font-semibold line-clamp-2">{project.title}</h3>
          <Badge variant={
            project.difficulty === "Beginner" ? "secondary" :
            project.difficulty === "Intermediate" ? "default" :
            "destructive"
          }>
            {project.difficulty}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit">{project.category}</Badge>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tech_stack?.slice(0, 3).map((tech: string) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.tech_stack?.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.tech_stack.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 p-0 h-auto"
            onClick={handleLike}
          >
            <Heart size={16} className={liked ? "fill-current text-red-500" : ""} />
            {likes}
          </Button>
          <span className="flex items-center gap-1">
            <Eye size={16} />
            {project.views_count || 0}
          </span>
        </div>
        
        <div className="flex gap-2">
          {project.demo_url && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} />
              </a>
            </Button>
          )}
          {project.github_url && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <Github size={16} />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
