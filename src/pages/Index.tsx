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
    showRandomJoinNotification();
  }, []);

  const programs = [
    {
      title: "AI Prompt Engineering Fundamentals",
      description: "Master the basics of AI prompt engineering. Learn essential techniques for crafting effective prompts, understanding context, and optimizing AI responses. Perfect for beginners looking to enter the field of AI.",
      duration: "6 weeks",
      skills: ["Basic Prompt Engineering", "Context Design", "Response Optimization", "AI Basics"],
      category: "AI Development"
    },
    {
      title: "Advanced AI Prompt Engineering",
      description: "Take your prompt engineering skills to the next level. Learn advanced techniques for complex use cases, chain-of-thought prompting, and enterprise-level AI applications. For those who understand the basics.",
      duration: "8 weeks",
      skills: ["Advanced Prompting", "Chain-of-Thought", "Enterprise AI", "System Design"],
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
      title: "Frontend Development with Low-Code",
      description: "Get weekly assignments focused on low-code frontend development. Your mentor will provide clear tasks and personalized feedback on your work. Pure mentorship approach - no courses, just practical learning with expert guidance.",
      duration: "10 weeks",
      skills: ["Low-Code Platforms", "UI Design", "Web Development", "Component Building"],
      category: "Frontend Development"
    },
    {
      title: "No-Code Development",
      description: "Learn through doing with our task-based mentorship program. Each week, your mentor will assign practical no-code projects and provide personalized guidance. Focus on hands-on learning with expert feedback - no traditional courses.",
      duration: "10 weeks",
      skills: ["No-Code Tools", "Visual Development", "Automation", "App Design"],
      category: "No-Code Development"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527576539890-dfa815648363')] bg-cover bg-center opacity-5 pointer-events-none"></div>
      <div className="relative">
        <HeroSection />
        
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl font-light text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">Our Task-Based Mentorship Approach</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-none hover:bg-purple-50/50 transition-colors duration-300">
                <CardHeader className="space-y-4">
                  <Award className="w-8 h-8 text-purple-600" />
                  <CardTitle className="text-lg font-light">Weekly Tasks</CardTitle>
                  <CardDescription>Get structured weekly assignments with clear learning objectives</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-0 shadow-none hover:bg-purple-50/50 transition-colors duration-300">
                <CardHeader className="space-y-4">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                  <CardTitle className="text-lg font-light">Personalized Feedback</CardTitle>
                  <CardDescription>Receive detailed feedback on your assignments from experienced mentors</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-0 shadow-none hover:bg-purple-50/50 transition-colors duration-300">
                <CardHeader className="space-y-4">
                  <Users className="w-8 h-8 text-purple-600" />
                  <CardTitle className="text-lg font-light">1-on-1 Mentorship</CardTitle>
                  <CardDescription>Get personalized guidance and support throughout your journey</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="programs-section" className="py-24 px-4 bg-gradient-to-b from-white via-purple-50/30 to-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-light text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">Choose Your Mentorship Path</h2>
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
    </div>
  );
};

export default Index;