import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Award, Linkedin, Instagram, Twitter } from "lucide-react";
import { ProgramCard } from "@/components/ProgramCard";
import { HeroSection } from "@/components/HeroSection";

const Index = () => {
  const programs = [
    {
      title: "Frontend Development",
      description: "Master modern web development with React, TypeScript, and more",
      duration: "12 weeks",
      skills: ["JavaScript", "AIScript", "CSS", "HTML"],
    },
    {
      title: "AI + Web Design",
      description: "Learn to create AI-powered web designs and interfaces",
      duration: "10 weeks",
      skills: ["Figma", "AI Tools", "UI/UX", "Web Design"],
    },
    {
      title: "AI Prompt Specialist",
      description: "Master the art of crafting effective AI prompts for various applications",
      duration: "8 weeks",
      skills: ["Prompt Engineering", "GPT", "DALL-E", "Midjourney"],
    },
    {
      title: "No-Code AI Tools",
      description: "Build AI-powered applications without coding",
      duration: "6 weeks",
      skills: ["Bubble", "Adalo", "FlutterFlow", "AI Integration"],
    },
    {
      title: "AI + Python Development",
      description: "Build AI applications with Python and popular frameworks",
      duration: "14 weeks",
      skills: ["Python", "HuggingFace", "APIs", "Machine Learning"],
    },
    {
      title: "AI Superbase Creation",
      description: "Build advanced AI applications with Node.js and modern AI tools",
      duration: "12 weeks",
      skills: ["Node.js", "AI Integration", "Database Design", "API Development"],
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4A00E0]/5 to-white">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Dev Mentorship?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Award className="w-12 h-12 text-[#4A00E0] mb-4" />
                <CardTitle>Certification</CardTitle>
                <CardDescription>
                  Receive a community-recognized certificate upon program completion
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <BookOpen className="w-12 h-12 text-[#4A00E0] mb-4" />
                <CardTitle>Practical Learning</CardTitle>
                <CardDescription>
                  Work on real projects and build a strong portfolio
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-[#4A00E0]/5">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.title} program={program} />
            ))}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
              <p className="text-xl text-gray-600">+24 more programs (30 Programs total)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Links */}
      <footer className="py-8 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-center space-x-6">
            <a 
              href="https://www.linkedin.com/company/comicfix" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#4A00E0] transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://www.instagram.com/comicfix.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#4A00E0] transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://x.com/comicfixin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#4A00E0] transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;