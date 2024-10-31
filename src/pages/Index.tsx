import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Award, CheckCircle, Users } from "lucide-react";
import { ProgramCard } from "@/components/ProgramCard";
import { HeroSection } from "@/components/HeroSection";
import { TestimonialSection } from "@/components/TestimonialSection";

const Index = () => {
  const programs = [
    {
      title: "Frontend Development",
      description: "Master modern web development with React, TypeScript, and more",
      duration: "12 weeks",
      skills: ["React", "TypeScript", "CSS", "HTML"],
    },
    {
      title: "Backend Development",
      description: "Build scalable servers and APIs with Node.js and databases",
      duration: "12 weeks",
      skills: ["Node.js", "Express", "MongoDB", "SQL"],
    },
    {
      title: "Full Stack Development",
      description: "Become a complete developer with both frontend and backend skills",
      duration: "16 weeks",
      skills: ["React", "Node.js", "Databases", "DevOps"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4A00E0]/5 to-white">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Dev Mentorship?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Award className="w-12 h-12 text-[#4A00E0] mb-4" />
                <CardTitle>Certification</CardTitle>
                <CardDescription>
                  Receive an industry-recognized certificate upon program completion
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-[#4A00E0] mb-4" />
                <CardTitle>Expert Mentors</CardTitle>
                <CardDescription>
                  Learn from experienced developers working in top tech companies
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
          </div>
        </div>
      </section>

      <TestimonialSection />
    </div>
  );
};

export default Index;