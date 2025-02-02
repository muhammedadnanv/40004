import { CategoryTopper } from "@/components/CategoryTopper";
import { HeroSection } from "@/components/HeroSection";
import { LearningPathSection } from "@/components/LearningPathSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { ProgramsSection } from "@/components/programs/ProgramsSection";
import { CertificationSection } from "@/components/CertificationSection";
import { FAQSection } from "@/components/FAQSection";
import { WhatsAppSection } from "@/components/WhatsAppSection";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { ProjectIdeasSection } from "@/components/ProjectIdeasSection";
import { PartnershipsSection } from "@/components/PartnershipsSection";
import { ReviewSection } from "@/components/ReviewSection";
import { ShareSection } from "@/components/ShareSection";
import { MentorSection } from "@/components/MentorSection";
import { SuccessStoriesSection } from "@/components/SuccessStoriesSection";
import { CodeOfConductSection } from "@/components/CodeOfConductSection";
import { AlbatoAdPopup } from "@/components/AlbatoAdPopup";
import { useEffect } from "react";
import { showRandomJoinNotification } from "@/utils/mockNotifications";
import { getContentEngagementStats } from "@/utils/contentAdaptation";

const Index = () => {
  useEffect(() => {
    showRandomJoinNotification();
    
    const interval = setInterval(() => {
      const stats = getContentEngagementStats();
      console.log('Content engagement stats:', stats);
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const baseProgramPrice = 1500;
  const platformFeePercentage = 20;
  const platformFee = (baseProgramPrice * platformFeePercentage) / 100;
  const totalPrice = baseProgramPrice + platformFee;

  const programs = [
    {
      title: "Frontend Development",
      description: "Build real frontend projects with expert mentorship. Get personalized guidance and feedback as you develop practical applications. No courses - just hands-on project experience with mentor support.",
      duration: "1 year",
      skills: ["React", "Angular", "Vue.js", "TypeScript"],
      category: "Frontend Development",
      regularPrice: totalPrice
    },
    {
      title: "Low-Code Development",
      description: "Create efficient applications using low-code platforms with expert mentorship. Get personalized guidance on your projects. No courses - pure project-based learning with mentor support.",
      duration: "1 year",
      skills: ["Low-Code Platforms", "Visual Development", "Rapid Prototyping", "App Design"],
      category: "Low-Code Development",
      regularPrice: totalPrice
    },
    {
      title: "No-Code Development",
      description: "Build real applications using no-code tools with expert mentorship. Get personalized guidance on your projects. No courses - just hands-on development with dedicated mentor support.",
      duration: "1 year",
      skills: ["No-Code Tools", "Visual Development", "Automation", "App Design"],
      category: "No-Code Development",
      regularPrice: totalPrice
    },
    {
      title: "Full Stack API Development",
      description: "Build complete full-stack applications with expert mentorship. Work on real API projects while learning best practices. No courses - pure hands-on development with personalized mentor guidance.",
      duration: "1 year",
      skills: ["RESTful APIs", "Node.js", "Database Design", "Authentication", "Cloud Deployment"],
      category: "Full Stack Development",
      regularPrice: totalPrice
    },
    {
      title: "UX/UI Development",
      description: "Master the art of creating intuitive and engaging user interfaces with expert mentorship. Learn design principles, user research, and prototyping through hands-on projects.",
      duration: "1 year",
      skills: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"],
      category: "Design",
      regularPrice: totalPrice
    },
    {
      title: "Graphic Designing",
      description: "Develop your graphic design skills with personalized mentorship. Create compelling visual content through practical projects and expert guidance.",
      duration: "1 year",
      skills: ["Adobe Creative Suite", "Typography", "Brand Design", "Digital Illustration", "Layout Design"],
      category: "Design",
      regularPrice: totalPrice
    },
    {
      title: "Video Editing",
      description: "Learn professional video editing techniques with expert mentorship. Master industry-standard tools and storytelling through hands-on video projects.",
      duration: "1 year",
      skills: ["Video Editing Software", "Color Grading", "Motion Graphics", "Sound Design", "Video Production"],
      category: "Media",
      regularPrice: totalPrice
    },
    {
      title: "Prompt Engineering",
      description: "Master the art of AI prompt engineering with expert guidance. Learn to create effective prompts for various AI models and applications.",
      duration: "1 year",
      skills: ["AI Models", "Natural Language Processing", "Context Design", "Output Optimization", "AI Integration"],
      category: "AI Development",
      regularPrice: totalPrice
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e')] bg-cover bg-center opacity-5 pointer-events-none" />
      
      <div className="relative">
        <AlbatoAdPopup />
        <section aria-label="category-notice" className="container mx-auto px-4 pt-8">
          <CategoryTopper />
        </section>

        <HeroSection />
        <LearningPathSection />
        <FeaturesSection />
        <ProgramsSection programs={programs} />
        <PartnershipsSection />
        <SuccessStoriesSection />
        <ProjectIdeasSection />
        <CertificationSection />
        <CodeOfConductSection />
        <ReviewSection />
        <ShareSection />
        <MentorSection />
        <FAQSection />
        <WhatsAppSection />

        <footer className="py-16 md:py-24 lg:py-32">
          <SocialMediaFooter />
        </footer>
      </div>
    </main>
  );
};

export default Index;