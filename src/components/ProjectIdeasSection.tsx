
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { projectIdeas } from "@/data/projectIdeas";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download } from "lucide-react";

export function ProjectIdeasSection() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [specialCode, setSpecialCode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const { toast } = useToast();

  // Get unique categories
  const categories = Array.from(new Set(projectIdeas.map(project => project.category)));
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  // Filter projects based on search term and filters
  const filteredProjects = projectIdeas.filter(project => {
    const matchesSearch = searchTerm === "" || 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || project.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === null || project.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

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

  // Reset filters function
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setSelectedDifficulty(null);
  };

  // Download project ideas as JSON
  const downloadProjectIdeas = () => {
    const dataStr = JSON.stringify(filteredProjects, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = 'project-ideas.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Download Started",
      description: "Your project ideas are being downloaded as JSON.",
    });
  };

  useEffect(() => {
    // For demo purposes - uncomment to enable auto-unlock
    // setIsUnlocked(true);
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 bg-gray-50" id="project-ideas">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-center mb-4 sm:mb-6">Project Ideas Gallery</h2>
        <p className="text-center text-gray-600 mb-6 md:mb-8 lg:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          Explore these {projectIdeas.length}+ project ideas to enhance your portfolio and practical skills
        </p>
        
        <div className="relative">
          {!isUnlocked && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-md z-10 flex flex-col items-center justify-center p-4">
              <div className="max-w-md w-full bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-center">Access Project Ideas</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">
                  Enter your unlock code to access our full library of project ideas
                </p>
                <div className="flex flex-col gap-3 sm:gap-4">
                  <Input
                    type="text"
                    placeholder="Enter unlock code"
                    value={specialCode}
                    onChange={(e) => setSpecialCode(e.target.value)}
                    className="flex-1"
                    data-testid="unlock-code-input"
                  />
                  <Button 
                    onClick={handleUnlock} 
                    className="w-full bg-primary hover:bg-primary/90"
                    data-testid="unlock-button"
                  >
                    Unlock Gallery
                  </Button>
                </div>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 text-center">
                  You'll receive the unlock code after completing payment
                </p>
              </div>
            </div>
          )}
          
          {/* Search and filter controls - Mobile optimized */}
          <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="search-input"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="whitespace-nowrap text-xs sm:text-sm py-2 px-3"
                >
                  Reset filters
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDifficulty(null)}
                  className={`whitespace-nowrap text-xs sm:text-sm py-2 px-3 ${selectedDifficulty === null ? 'bg-primary/10' : ''}`}
                >
                  All Difficulties
                </Button>
                {difficulties.map(difficulty => (
                  <Button
                    key={difficulty}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`whitespace-nowrap text-xs sm:text-sm py-2 px-3 ${selectedDifficulty === difficulty ? 'bg-primary/10' : ''}`}
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className={`whitespace-nowrap text-xs sm:text-sm py-2 px-3 ${selectedCategory === null ? 'bg-primary/10' : ''}`}
              >
                <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> All Categories
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap text-xs sm:text-sm py-2 px-3 ${selectedCategory === category ? 'bg-primary/10' : ''}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <ScrollArea className="h-[450px] sm:h-[500px] md:h-[600px] rounded-md border p-3 sm:p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow h-full" data-gpteng-selectable>
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
                ))
              ) : (
                <div className="col-span-full py-8 sm:py-10 text-center text-gray-500">
                  <p className="text-sm sm:text-base">No projects match your search criteria.</p>
                  <Button variant="link" onClick={resetFilters} className="mt-2">
                    Reset filters
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="mt-3 sm:mt-4 flex flex-col xs:flex-row justify-between items-center gap-2">
            <p className="text-xs sm:text-sm text-gray-500 text-center xs:text-left">
              Showing {filteredProjects.length} of {projectIdeas.length} projects
            </p>
            {isUnlocked && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={downloadProjectIdeas}
                className="flex items-center gap-2 text-xs sm:text-sm w-full xs:w-auto"
              >
                <Download size={14} className="sm:size-16" />
                Download Ideas
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
