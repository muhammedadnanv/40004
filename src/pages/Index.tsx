
import { HeroSection } from "@/components/HeroSection";
import { ProgramsSection } from "@/components/programs/ProgramsSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { MentorSection } from "@/components/MentorSection";
import { CertificationSection } from "@/components/CertificationSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ProjectIdeasSection } from "@/components/ProjectIdeasSection";
import { ReviewSection } from "@/components/ReviewSection";
import { FAQSection } from "@/components/FAQSection";
import { WhatsAppSection } from "@/components/WhatsAppSection";
import { PartnershipsSection } from "@/components/PartnershipsSection";
import { LearningPathSection } from "@/components/LearningPathSection";
import { ShareSection } from "@/components/ShareSection";
import { SocialMediaFooter } from "@/components/SocialMediaFooter";
import { SEODashboard } from "@/components/SEO/SEODashboard";
import { StructuredDataManager } from "@/components/SEO/StructuredDataManager";
import { CategoryTopper } from "@/components/CategoryTopper";
import { CodeOfConductSection } from "@/components/CodeOfConductSection";
import { PlatformExplanation } from "@/components/PlatformExplanation";
import { AIFeaturesSection } from "@/components/AIFeaturesSection";
import { AIChatWidget } from "@/components/AIChatWidget";
import { SitemapGenerator } from "@/components/SEO/SitemapGenerator";
import { PerformanceMonitor } from "@/components/SEO/PerformanceMonitor";

import { Helmet } from "react-helmet";
import { LeadCollectionPopup } from "@/components/LeadCollectionPopup";
import { AlbatoAdPopup } from "@/components/AlbatoAdPopup";
import { PromotionPopup } from "@/components/PromotionPopup";
import { MainNav } from "@/components/MainNav";

const Index = () => {
  // Sample programs data
  const programs = [
    {
      title: "Full Stack Web Development",
      description: "Master React, Node.js, and modern web technologies",
      duration: "12 weeks",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      category: "web-development",
      regularPrice: 15000
    },
    {
      title: "Frontend React Mastery",
      description: "Deep dive into React ecosystem and modern frontend",
      duration: "8 weeks",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      category: "frontend",
      regularPrice: 12000
    },
    {
      title: "Backend Development",
      description: "Build scalable APIs and server applications",
      duration: "10 weeks",
      skills: ["Node.js", "Express", "PostgreSQL", "Docker"],
      category: "backend",
      regularPrice: 13000
    }
  ];

  // Mentor earnings: 85% of average program fees (₹399 + ₹999) / 2 = ₹699 * 0.85 = ₹594
  const mentorEarnings = 594;

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Dev Mentor Hub",
    "description": "This platform is exclusively designed to connect students (mentees) with mentors, providing hands-on training through the development of ultra-innovative, visionary projects that build real-world experience and skills",
    "url": "https://devmentorhub.com",
    "courseMode": "online",
    "availableLanguage": "English"
  };

  return (
    <>
      <Helmet>
        <title>Dev Mentor Hub - AI-Powered Mentorship Platform | Transform Your Tech Career</title>
        <meta name="description" content="Join the world's first AI-enhanced mentorship platform connecting students with industry experts. Build innovative projects, accelerate your career, and master cutting-edge technologies with personalized guidance." />
        <meta name="keywords" content="AI mentorship platform, tech career development, programming mentorship, web development training, React courses, Node.js training, full stack bootcamp, coding projects, career acceleration, industry mentors, personalized learning, tech education, software development, project-based learning" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Dev Mentor Hub - AI-Powered Mentorship Platform" />
        <meta property="og:description" content="Transform your tech career with AI-enhanced mentorship. Connect with industry experts, build innovative projects, and accelerate your professional growth." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devmentorhub.com" />
        <meta property="og:image" content="https://devmentorhub.com/og-image.jpg" />
        <meta property="og:site_name" content="Dev Mentor Hub" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dev Mentor Hub - AI-Powered Mentorship Platform" />
        <meta name="twitter:description" content="Transform your tech career with AI-enhanced mentorship and innovative project-based learning." />
        <meta name="twitter:image" content="https://devmentorhub.com/twitter-card.jpg" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="author" content="Dev Mentor Hub" />
        <meta name="publisher" content="Dev Mentor Hub" />
        <meta name="theme-color" content="#6366f1" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://devmentorhub.com" />
        
        {/* Additional Link Tags */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data - Enhanced Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Dev Mentor Hub",
            "alternateName": "DevMentorHub",
            "description": "AI-powered mentorship platform that connects students with industry experts for hands-on training through innovative, real-world projects in web development, programming, and technology.",
            "url": "https://devmentorhub.com",
            "logo": "https://devmentorhub.com/logo.png",
            "image": "https://devmentorhub.com/og-image.jpg",
            "foundingDate": "2024",
            "courseMode": ["online", "blended"],
            "availableLanguage": ["English"],
            "areaServed": "Worldwide",
            "audience": {
              "@type": "EducationalAudience",
              "educationalRole": ["student", "professional"]
            },
            "educationalCredentialAwarded": "Certificate of Completion",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Programming and Web Development Courses",
              "itemListElement": [
                {
                  "@type": "Course",
                  "name": "Full Stack Web Development",
                  "description": "Comprehensive program covering React, Node.js, databases, and modern web technologies",
                  "provider": "Dev Mentor Hub",
                  "courseMode": "online",
                  "educationalLevel": "intermediate"
                },
                {
                  "@type": "Course", 
                  "name": "Frontend React Mastery",
                  "description": "Advanced React ecosystem training with TypeScript and modern frameworks",
                  "provider": "Dev Mentor Hub",
                  "courseMode": "online",
                  "educationalLevel": "intermediate"
                }
              ]
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "availableLanguage": "English"
            },
            "sameAs": [
              "https://linkedin.com/company/dev-mentor-hub",
              "https://twitter.com/devmentorhub"
            ]
          })}
        </script>
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What makes Dev Mentor Hub different from other learning platforms?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dev Mentor Hub is the world's first AI-enhanced mentorship platform that exclusively connects students with industry experts for personalized, project-based learning. Our platform focuses on real-world application through innovative projects rather than just theoretical knowledge."
                }
              },
              {
                "@type": "Question", 
                "name": "How does the AI-powered mentorship work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our AI system analyzes your learning style, career goals, and progress to match you with the most suitable mentors and customize your learning path. It provides personalized recommendations, tracks your progress, and adapts the curriculum to ensure optimal learning outcomes."
                }
              },
              {
                "@type": "Question",
                "name": "What technologies and programming languages can I learn?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer comprehensive programs in web development including React, Node.js, JavaScript, TypeScript, Python, MongoDB, PostgreSQL, Docker, and many other cutting-edge technologies. Our curriculum is constantly updated to reflect industry demands."
                }
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <header>
          <MainNav />
          <CategoryTopper />
        </header>
        <main>
          <HeroSection />
          <PlatformExplanation />
          <AIFeaturesSection />
          <ProgramsSection programs={programs} />
          <FeaturesSection />
          <MentorSection mentorEarnings={mentorEarnings} />
          <CertificationSection />
          <PortfolioSection />
          <ProjectIdeasSection />
          <ReviewSection />
          <LearningPathSection />
          <FAQSection />
          <WhatsAppSection />
          <PartnershipsSection />
          <ShareSection />
          <CodeOfConductSection />
          
        </main>
        <footer>
          <SocialMediaFooter />
        </footer>
        <SEODashboard />
        <StructuredDataManager 
          type="Organization" 
          data={organizationData}
          autoImplement={true}
        />
        <SitemapGenerator />
        <PerformanceMonitor />
        <AIChatWidget />
        <LeadCollectionPopup />
        <AlbatoAdPopup />
        <PromotionPopup />
      </div>
    </>
  );
};

export default Index;
