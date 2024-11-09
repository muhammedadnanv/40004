import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, Users } from "lucide-react";
import { ProgramCard } from "@/components/ProgramCard";
import { HeroSection } from "@/components/HeroSection";
import { CertificationSection } from "@/components/CertificationSection";
import { FAQSection } from "@/components/FAQSection";
import { WhatsAppSection } from "@/components/WhatsAppSection";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { ProjectIdeasSection } from "@/components/ProjectIdeasSection";
import { useEffect } from "react";
import { showRandomJoinNotification } from "@/utils/mockNotifications";

const Index = () => {
  useEffect(() => {
    // Start the real-time notifications immediately
    showRandomJoinNotification();
  }, []);

  const programs = [
    {
      title: "AI Prompt Engineering Mastery",
      description: "Join our structured mentorship program focused on AI prompt engineering. You'll receive weekly assignments with clear objectives and get personalized feedback from your dedicated mentor. No courses or videos - just practical tasks and expert guidance.",
      duration: "8 weeks",
      skills: ["Prompt Engineering", "AI Models", "Content Generation", "Problem Solving"],
      category: "AI Development"
    },
    {
      title: "AI + Supabase Integration",
      description: "Get hands-on experience through weekly tasks in AI and Supabase integration. Your mentor will guide you through each assignment, providing detailed feedback and support. Pure mentorship with practical assignments - no courses included.",
      duration: "12 weeks",
      skills: ["Supabase", "AI Integration", "Database Design", "API Development"],
      category: "Full Stack AI"
    },
    {
      title: "No-Code Development",
      description: "Learn through doing with our task-based mentorship program. Each week, your mentor will assign practical no-code projects and provide personalized guidance. Focus on hands-on learning with expert feedback - no traditional courses.",
      duration: "10 weeks",
      skills: ["No-Code Tools", "Visual Development", "Automation", "App Design"],
      category: "No-Code"
    },
    {
      title: "Frontend Development with Low-Code",
      description: "Get weekly assignments focused on low-code frontend development. Your mentor will provide clear tasks and personalized feedback on your work. Pure mentorship approach - no courses, just practical learning with expert guidance.",
      duration: "10 weeks",
      skills: ["Low-Code Platforms", "UI Design", "Web Development", "Component Building"],
      category: "Low-Code"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-light text-center mb-16">Our Task-Based Mentorship Approach</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-4">
                <Award className="w-8 h-8 text-black" />
                <CardTitle className="text-lg font-light">Weekly Tasks</CardTitle>
                <CardDescription>Get structured weekly assignments with clear learning objectives</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-4">
                <BookOpen className="w-8 h-8 text-black" />
                <CardTitle className="text-lg font-light">Personalized Feedback</CardTitle>
                <CardDescription>Receive detailed feedback on your assignments from experienced mentors</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-4">
                <Users className="w-8 h-8 text-black" />
                <CardTitle className="text-lg font-light">1-on-1 Mentorship</CardTitle>
                <CardDescription>Get personalized guidance and support throughout your journey</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="programs-section" className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-light text-center mb-16">Choose Your Mentorship Path</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {programs.map((program) => (
              <ProgramCard key={program.title} program={program} />
            ))}
          </div>
        </div>
      </section>

      <ProjectIdeasSection />
      <FAQSection />
      <WhatsAppSection />
      <SocialMediaFooter />
    </div>
  );
};

export default Index;
