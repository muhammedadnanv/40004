import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Move project ideas data to a separate file to reduce file size
import { projectIdeas } from "@/data/projectIdeas";

export function ProjectIdeasSection() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { toast } = useToast();

  const handleUnlock = () => {
    setIsUnlocked(true);
    toast({
      title: "Project Ideas Unlocked!",
      description: "You now have access to all project ideas.",
    });
  };

  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl font-light text-center mb-8">Project Ideas Gallery</h2>
        <p className="text-center text-gray-600 mb-12">
          Explore these project ideas to enhance your portfolio and practical skills
        </p>
        
        <div className="relative">
          {!isUnlocked && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-md z-10 flex flex-col items-center justify-center">
              <p className="text-lg mb-4 text-gray-800">Enroll to unlock all project ideas</p>
              <Button onClick={handleUnlock} className="bg-primary hover:bg-primary/90">
                Unlock Project Ideas
              </Button>
            </div>
          )}
          
          <ScrollArea className="h-[600px] rounded-md border p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectIdeas.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
                      <Badge variant={
                        project.difficulty === "Beginner" ? "secondary" :
                        project.difficulty === "Intermediate" ? "default" :
                        "destructive"
                      }>
                        {project.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-500">
                      {project.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
}