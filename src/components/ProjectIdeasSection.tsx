
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { projectIdeas } from "@/data/projectIdeas";
import { UnlockForm } from "./project-ideas/UnlockForm";
import { SearchFilters } from "./project-ideas/SearchFilters";
import { ProjectList } from "./project-ideas/ProjectList";
import { ProjectGalleryFooter } from "./project-ideas/ProjectGalleryFooter";
import { Helmet } from "react-helmet";

export function ProjectIdeasSection() {
  const [isUnlocked, setIsUnlocked] = useState(false);
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
    <>
      <Helmet>
        <title>Developer Project Ideas Gallery | Find Your Next Coding Project</title>
        <meta name="description" content={`Browse our collection of ${projectIdeas.length}+ coding project ideas across multiple technologies and difficulty levels to enhance your portfolio.`} />
        <meta name="keywords" content="developer projects, coding projects, portfolio projects, beginner coding projects, intermediate projects, advanced projects" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": filteredProjects.slice(0, 10).map((project, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Project",
                "name": project.name,
                "description": project.description,
                "category": project.category,
                "difficulty": project.difficulty
              }
            }))
          })}
        </script>
      </Helmet>
      <section className="py-12 sm:py-16 md:py-24 px-4 bg-gray-50" id="project-ideas">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-center mb-4 sm:mb-6">Project Ideas Gallery</h2>
          <p className="text-center text-gray-600 mb-6 md:mb-8 lg:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
            Explore these {projectIdeas.length}+ project ideas to enhance your portfolio and practical skills
          </p>
          
          <div className="relative">
            {!isUnlocked && (
              <UnlockForm onUnlock={() => setIsUnlocked(true)} />
            )}
            
            <SearchFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              categories={categories}
              difficulties={difficulties}
              resetFilters={resetFilters}
            />
            
            <ProjectList 
              projects={filteredProjects} 
              resetFilters={resetFilters} 
            />
            
            <ProjectGalleryFooter 
              filteredProjectsCount={filteredProjects.length}
              totalProjectsCount={projectIdeas.length}
              isUnlocked={isUnlocked}
              downloadProjects={downloadProjectIdeas}
            />
          </div>
        </div>
      </section>
    </>
  );
}
