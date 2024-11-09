import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, Users, Target } from "lucide-react";
import { ProgramCard } from "@/components/ProgramCard";
import { HeroSection } from "@/components/HeroSection";
import { CertificationSection } from "@/components/CertificationSection";
import { FAQSection } from "@/components/FAQSection";
import { WhatsAppSection } from "@/components/WhatsAppSection";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { useEffect } from "react";
import { showRandomJoinNotification } from "@/utils/mockNotifications";

const Index = () => {
  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      showRandomJoinNotification();
    }, 2000);

    const interval = setInterval(() => {
      showRandomJoinNotification();
    }, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const programs = [
    {
      title: "AI Prompt Engineering Mastery",
      description: "Master the art of crafting effective AI prompts. Learn prompt engineering techniques, best practices, and how to get the most out of AI models. Weekly assignments and personalized feedback from experienced mentors.",
      duration: "8 weeks",
      skills: ["Prompt Engineering", "AI Models", "Content Generation", "Problem Solving"],
      category: "AI Development"
    },
    {
      title: "AI + Supabase Integration",
      description: "Learn to build AI-powered applications with Supabase backend. Get weekly tasks to create applications that combine AI capabilities with database management, authentication, and real-time features.",
      duration: "12 weeks",
      skills: ["Supabase", "AI Integration", "Database Design", "API Development"],
      category: "Full Stack AI"
    },
    {
      title: "No-Code Development",
      description: "Build powerful applications without writing code. Learn to use popular no-code platforms and tools. Get weekly projects and guidance on creating functional applications using drag-and-drop interfaces.",
      duration: "10 weeks",
      skills: ["No-Code Tools", "Visual Development", "Automation", "App Design"],
      category: "No-Code"
    },
    {
      title: "Frontend Development with Low-Code",
      description: "Create modern web interfaces using low-code platforms while understanding the fundamentals. Weekly assignments focus on building responsive and interactive web applications with minimal coding.",
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
          <h2 className="text-2xl font-light text-center mb-16">Why Choose Our Mentorship Program?</h2>
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

      <FAQSection />
      <WhatsAppSection />
      <SocialMediaFooter />
    </div>
  );
};

export default Index;