import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, Users, Sparkles, Star, Rocket, Code, Brain, Target, Zap } from "lucide-react";
import { ProgramCard } from "@/components/ProgramCard";
import { HeroSection } from "@/components/HeroSection";
import { CertificationSection } from "@/components/CertificationSection";
import { FAQSection } from "@/components/FAQSection";
import { WhatsAppSection } from "@/components/WhatsAppSection";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { ProjectIdeasSection } from "@/components/ProjectIdeasSection";
import { CategoryTopper } from "@/components/CategoryTopper";
import { LearningPathSection } from "@/components/LearningPathSection";
import { SuccessStoriesSection } from "@/components/SuccessStoriesSection";
import { PartnershipsSection } from "@/components/PartnershipsSection";
import { ReviewSection } from "@/components/ReviewSection";
import { useEffect } from "react";
import { showRandomJoinNotification } from "@/utils/mockNotifications";
import { getContentRecommendations, getContentEngagementStats } from "@/utils/contentAdaptation";
import { motion } from "framer-motion";

const Index = () => {
  useEffect(() => {
    showRandomJoinNotification();
    
    const interval = setInterval(() => {
      const stats = getContentEngagementStats();
      console.log('Content engagement stats:', stats);
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const programs = [
    {
      title: "Frontend Development",
      description: "Practical weekly assignments in modern frontend development. Get direct mentorship and feedback on each task you complete. Focus on building real projects with expert guidance - no traditional courses.",
      duration: "10 weeks", 
      skills: ["React", "Angular", "Vue.js", "TypeScript"],
      category: "Frontend Development"
    },
    {
      title: "Low-Code Development",
      description: "Weekly hands-on assignments in low-code development platforms. Your mentor provides personalized feedback on each practical task. Pure mentorship program focused on building applications efficiently.",
      duration: "8 weeks",
      skills: ["Low-Code Platforms", "Visual Development", "Rapid Prototyping", "App Design"],
      category: "Low-Code Development"
    },
    {
      title: "No-Code Development",
      description: "Weekly hands-on assignments in no-code development. Your mentor provides personalized feedback on each practical task. Pure mentorship program focused on building real applications - no courses included.",
      duration: "10 weeks",
      skills: ["No-Code Tools", "Visual Development", "Automation", "App Design"],
      category: "No-Code Development"
    },
    {
      title: "Full Stack API Development",
      description: "Comprehensive mentorship in building scalable APIs and full stack applications. Learn best practices in API design, authentication, database modeling, and deployment. Get hands-on experience with real-world projects and weekly feedback.",
      duration: "14 weeks",
      skills: ["RESTful APIs", "Node.js", "Database Design", "Authentication", "Cloud Deployment"],
      category: "Full Stack Development"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e')] bg-cover bg-center opacity-5 pointer-events-none"></div>
      
      <div className="relative">
        <section aria-label="category-notice" className="container mx-auto px-4 pt-8">
          <CategoryTopper />
        </section>

        <section aria-label="hero" className="py-24">
          <HeroSection />
        </section>

        <section aria-label="learning-paths" className="py-24 bg-gradient-to-r from-purple-50 via-white to-purple-50">
          <LearningPathSection />
        </section>

        <section aria-label="features" className="py-24 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent"></div>
          <div className="container mx-auto max-w-5xl relative">
            <motion.h2 
              {...fadeInUp}
              className="text-3xl font-extralight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800"
            >
              Our Task-Based Mentorship Approach <Sparkles className="inline-block w-6 h-6 text-purple-600 animate-pulse" />
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Star, title: "Weekly Tasks", desc: "Structured assignments with clear objectives" },
                { icon: Brain, title: "AI-Powered Learning", desc: "Personalized learning paths and feedback" },
                { icon: Target, title: "Goal-Oriented", desc: "Focus on practical skill development" },
                { icon: Zap, title: "Rapid Progress", desc: "Accelerated learning through hands-on practice" }
              ].map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  {...fadeInUp} 
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="space-y-4">
                      <feature.icon className="w-8 h-8 text-purple-600 group-hover:rotate-12 transition-transform duration-300" />
                      <CardTitle className="text-lg font-light">{feature.title}</CardTitle>
                      <CardDescription className="text-sm">{feature.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="programs-section" aria-label="programs" className="py-24 px-4 bg-gradient-to-b from-white via-purple-50/30 to-white relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')] bg-cover bg-fixed opacity-[0.02] pointer-events-none"></div>
          <div className="container mx-auto max-w-6xl relative">
            <motion.h2 
              {...fadeInUp}
              className="text-3xl font-extralight text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800"
            >
              Choose Your Mentorship Path <Star className="inline-block w-6 h-6 text-purple-600 animate-pulse" />
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={program.title}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProgramCard program={program} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="partnerships" className="py-24">
          <PartnershipsSection />
        </section>

        <section aria-label="success-stories" className="py-24 bg-gradient-to-r from-purple-50 via-white to-purple-50">
          <SuccessStoriesSection />
        </section>

        <section aria-label="project-ideas" className="py-24">
          <ProjectIdeasSection />
        </section>

        <section aria-label="certification" className="py-24">
          <CertificationSection />
        </section>

        <section aria-label="reviews" className="py-24">
          <ReviewSection />
        </section>

        <section aria-label="faq" className="py-24">
          <FAQSection />
        </section>

        <section aria-label="whatsapp" className="py-24">
          <WhatsAppSection />
        </section>

        <footer className="py-24">
          <SocialMediaFooter />
        </footer>
      </div>
    </main>
  );
};

export default Index;
