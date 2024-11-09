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
      title: "Web Development Foundations",
      description: "Perfect for complete beginners! Start your coding journey with hands-on projects like personal portfolios and landing pages. Our mentors will guide you through HTML, CSS, and JavaScript basics with weekly project assignments and detailed feedback.",
      duration: "12 weeks",
      skills: ["HTML", "CSS", "JavaScript", "Git"],
      category: "Web Development"
    },
    {
      title: "React Development Path",
      description: "Ready to build modern web apps? This program helps beginners master React through practical projects. You'll create real applications like todo apps, weather dashboards, and social media feeds with step-by-step guidance.",
      duration: "10 weeks",
      skills: ["React", "CSS", "Component Design", "State Management"],
      category: "Frontend"
    },
    {
      title: "Backend Development Journey",
      description: "Start your backend journey with Node.js! Perfect for beginners who want to build server-side applications. You'll create REST APIs, authentication systems, and database-driven applications with weekly project assignments.",
      duration: "12 weeks",
      skills: ["Node.js", "Express", "MongoDB", "API Design"],
      category: "Backend"
    },
    {
      title: "Full Stack Project Builder",
      description: "Begin your full stack journey! This program helps beginners create complete web applications from scratch. You'll build projects like e-commerce platforms and social networks with personalized mentorship and structured weekly tasks.",
      duration: "16 weeks",
      skills: ["MERN Stack", "Database Design", "Authentication", "Deployment"],
      category: "Full Stack"
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
                <CardTitle className="text-lg font-light">Structured Learning Path</CardTitle>
                <CardDescription>Follow a clear roadmap with practical projects designed for beginners</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-4">
                <BookOpen className="w-8 h-8 text-black" />
                <CardTitle className="text-lg font-light">Project-Based Learning</CardTitle>
                <CardDescription>Build real projects with guidance from experienced mentors</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-4">
                <Users className="w-8 h-8 text-black" />
                <CardTitle className="text-lg font-light">1-on-1 Mentorship</CardTitle>
                <CardDescription>Get personalized guidance and code reviews from industry experts</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="programs-section" className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-light text-center mb-16">Start Your Coding Journey Today</h2>
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