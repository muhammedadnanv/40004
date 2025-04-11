
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
import { PromotionPopup } from "@/components/PromotionPopup";
import { useEffect } from "react";
import { getContentEngagementStats } from "@/utils/contentAdaptation";
import { fetchAndApplySEOKeywords } from "@/utils/performanceOptimizer";
import { runSEOOptimizations, runWebsiteTest } from "@/utils/websiteValidator";
import { initABTesting, trackConversion } from "@/utils/abTesting";
import { applySEOOptimizations } from "@/utils/performanceOptimizer";
import { seoOptimizer } from "@/utils/seoOptimizer";
import { initRetargetingService, trackVisitorEvent } from "@/utils/retargetingService";
import { autoFixAndReportLinkIssues } from "@/utils/linkValidator";
import { enhanceMobileExperience, initializeMobileOptimizations } from "@/utils/mobileResponsiveness";
import { OnPageOptimizer } from "@/components/SEO/OnPageOptimizer";
import { GoogleSearchPreview } from "@/components/SEO/GoogleSearchPreview";
import { JusticeMessage } from "@/components/JusticeMessage";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Wand2 } from "lucide-react";

const Index = () => {
  useEffect(() => {
    const engagementInterval = setInterval(() => {
      const stats = getContentEngagementStats();
      console.log('Content engagement stats:', stats);
    }, 300000);

    initABTesting();
    
    const initializePage = async () => {
      await fetchAndApplySEOKeywords('mentorship', 5);
      runSEOOptimizations();
      
      initRetargetingService({
        trackPageViews: true,
        trackProductViews: true,
        storeUserSegments: true
      });
      
      trackVisitorEvent('pageview', {
        label: 'homepage',
        value: 1
      });
      
      autoFixAndReportLinkIssues();
      
      // Apply mobile optimizations
      initializeMobileOptimizations();
      
      const keywordsResult = await seoOptimizer.getKeywords('mentorship', 10, 0.7, 0.8);
      if (keywordsResult.success && keywordsResult.keywords) {
        console.log('Applied high-intent keywords:', keywordsResult.keywords);
        
        const schemaResult = await seoOptimizer.implementSchemaMarkup('Course', {
          name: "Professional Developer Certification Program",
          description: "Master modern development skills with expert mentorship",
          keywords: keywordsResult.keywords.map(k => k.keyword).join(", ")
        });
        
        if (schemaResult.success) {
          console.log('Schema markup implemented successfully');
        }
      }
      
      setTimeout(() => {
        runWebsiteTest();
      }, 2000);
      
      trackConversion('hero-cta-test', 'page_view');
    };
    
    initializePage();

    const automaticOptimizationInterval = setInterval(async () => {
      await fetchAndApplySEOKeywords('mentorship', 5);
      applySEOOptimizations();
      
      await seoOptimizer.runOptimizations({
        optimizeMetaTags: true,
        checkTechnicalSEO: true
      });
    }, 12 * 60 * 60 * 1000);

    const programButtons = document.querySelectorAll('.program-cta-btn');
    programButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        trackVisitorEvent('action', {
          label: 'program_interest',
          value: 2
        });
      });
    });

    return () => {
      clearInterval(engagementInterval);
      clearInterval(automaticOptimizationInterval);
    };
  }, []);

  const programFee = 2160;
  const platformFeePercentage = 10;
  const razorpayFeePercentage = 2;
  
  const platformFee = (programFee * platformFeePercentage) / 100;
  const razorpayFee = (programFee * razorpayFeePercentage) / 100;
  const mentorEarnings = programFee - platformFee - razorpayFee;

  const programs = [
    {
      title: "Frontend Development",
      description: "Build frontend projects with expert mentorship. Get personalized guidance and feedback as you develop practical applications. No courses - just hands-on project experience. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["React", "Angular", "Vue.js", "TypeScript"],
      category: "Frontend Development",
      regularPrice: programFee
    },
    {
      title: "Low-Code Development",
      description: "Create efficient applications using low-code platforms with expert mentorship. Get personalized guidance on your projects. No courses - pure project-based experience. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["Low-Code Platforms", "Visual Development", "Rapid Prototyping", "App Design"],
      category: "Low-Code Development",
      regularPrice: programFee
    },
    {
      title: "No-Code Development",
      description: "Build applications using no-code tools with expert mentorship. Get personalized guidance on your projects. No courses - just hands-on development. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["No-Code Tools", "Visual Development", "Automation", "App Design"],
      category: "No-Code Development",
      regularPrice: programFee
    },
    {
      title: "Full Stack Development",
      description: "Build complete full-stack applications with expert mentorship. Work on real projects with industry best practices. No courses - pure hands-on development. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["RESTful APIs", "Node.js", "Database Design", "Authentication", "Cloud Deployment"],
      category: "Full Stack Development",
      regularPrice: programFee
    },
    {
      title: "UX/UI Development",
      description: "Master the art of creating intuitive and engaging user interfaces with expert mentorship. Apply design principles, conduct user research, and create prototypes through hands-on projects. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"],
      category: "Design",
      regularPrice: programFee
    },
    {
      title: "Graphic Designing",
      description: "Develop your graphic design skills with personalized mentorship. Create compelling visual content through practical projects and expert guidance. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["Adobe Creative Suite", "Typography", "Brand Design", "Digital Illustration", "Layout Design"],
      category: "Design",
      regularPrice: programFee
    },
    {
      title: "Video Editing",
      description: "Master professional video editing techniques with expert mentorship. Apply industry-standard tools and storytelling through hands-on video projects. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["Video Editing Software", "Color Grading", "Motion Graphics", "Sound Design", "Video Production"],
      category: "Media",
      regularPrice: programFee
    },
    {
      title: "Prompt Engineering",
      description: "Master the art of AI prompt engineering with expert guidance. Create effective prompts for various AI models and applications. Build projects with Mentor support.",
      duration: "1 year",
      skills: ["AI Models", "Natural Language Processing", "Context Design", "Output Optimization", "AI Integration"],
      category: "AI Development",
      regularPrice: programFee
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e')] bg-cover bg-center opacity-5 pointer-events-none" />
      
      <div className="relative">
        <JusticeMessage />
        <AlbatoAdPopup />
        <PromotionPopup 
          title="Join Our Community" 
          description="Subscribe to get exclusive project ideas, learning resources, and special offers delivered to your inbox."
          buttonText="Get Valuable Updates"
        />
        
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-3 md:mb-0">
                <Wand2 className="mr-2" />
                <span className="font-medium">NEW:</span>
                <span className="ml-2">Summarize PDFs & Videos with Gemini AI</span>
              </div>
              <Link to="/content-summarizer">
                <Button variant="secondary" size="sm" className="whitespace-nowrap">
                  <FileText className="mr-2 h-4 w-4" />
                  Try it now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
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
        <MentorSection mentorEarnings={mentorEarnings} />
        <FAQSection />
        <WhatsAppSection />

        <div className="hidden">
          <GoogleSearchPreview
            title="Developer Certification with Expert Mentorship | Professional Program"
            description="Master modern development skills with personalized 1:1 expert mentorship. Get certified through our project-based professional learning program."
          />
          <OnPageOptimizer 
            pageName="Homepage" 
            targetKeywords={["developer certification", "expert mentorship", "professional development", "coding mentors"]}
            autoOptimize={true}
          />
        </div>

        <footer className="py-16 md:py-24 lg:py-32">
          <SocialMediaFooter />
        </footer>
      </div>
    </main>
  );
};

export default Index;
