import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { projectIdeas } from "@/data/projectIdeas";
import { Input } from "@/components/ui/input";

export function ProjectIdeasSection() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [specialCode, setSpecialCode] = useState("");
  const { toast } = useToast();

  const handleUnlock = () => {
    // Check if the special code matches the payment verification code
    // This code should match what's given after payment
    if (specialCode === "DMH2024") {
      setIsUnlocked(true);
      toast({
        title: "Project Ideas Unlocked! 🎉",
        description: "You now have access to all project ideas.",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid unlock code. You can get this after payment.",
        variant: "destructive",
      });
    }
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
              <p className="text-lg mb-4 text-gray-800">Enter your unlock code to access project ideas</p>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
                <Input
                  type="text"
                  placeholder="Enter unlock code"
                  value={specialCode}
                  onChange={(e) => setSpecialCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleUnlock} className="bg-primary hover:bg-primary/90">
                  Unlock Gallery
                </Button>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                You'll receive the unlock code after completing the payment
              </p>
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