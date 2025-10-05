
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
import { AdvertiserSection } from "@/components/AdvertiserSection";

import { Helmet } from "react-helmet-async";
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
        <title>Dev Mentor Hub - AI-Powered Mentorship Platform | Learn Web Development, Programming & Tech Skills Online</title>
        <meta name="description" content="Join India's leading AI-enhanced mentorship platform. Get personalized guidance from industry experts, build real-world projects, and master web development, React, Node.js, AI integration & more. Affordable programs starting at ₹199. Free career support & resume building." />
        <meta name="keywords" content="AI mentorship platform India, online programming mentorship, web development course online, React training India, Node.js mentorship, full stack developer course, coding bootcamp India, project based learning, tech career mentorship, software development training, learn to code online, affordable programming courses, AI integration course, frontend development training, backend development course, career change to tech, programming for beginners, coding mentor online, tech education India, developer certification program" />
        
        {/* Enhanced Open Graph Meta Tags */}
        <meta property="og:title" content="Dev Mentor Hub - Transform Your Tech Career with AI-Powered Mentorship" />
        <meta property="og:description" content="Learn web development, AI integration, and programming from industry experts. Affordable mentorship programs starting at ₹199. Build real projects, get personalized feedback, and accelerate your tech career." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devmentorhub.com" />
        <meta property="og:image" content="https://devmentorhub.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Dev Mentor Hub - AI-Powered Mentorship Platform for Web Development and Programming" />
        <meta property="og:site_name" content="Dev Mentor Hub" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Enhanced Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@devmentorhub" />
        <meta name="twitter:creator" content="@devmentorhub" />
        <meta name="twitter:title" content="Dev Mentor Hub - AI-Powered Mentorship for Tech Careers" />
        <meta name="twitter:description" content="Master web development & programming with personalized mentorship. Real projects, expert guidance, affordable pricing. Start your tech career today!" />
        <meta name="twitter:image" content="https://devmentorhub.com/twitter-card.jpg" />
        <meta name="twitter:image:alt" content="Dev Mentor Hub Platform Preview" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="author" content="Dev Mentor Hub" />
        <meta name="publisher" content="Dev Mentor Hub" />
        <meta name="theme-color" content="#2E4053" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="rating" content="general" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://devmentorhub.com" />
        
        {/* Alternate Links for Multilingual Support (Future) */}
        <link rel="alternate" hrefLang="en" href="https://devmentorhub.com" />
        <link rel="alternate" hrefLang="x-default" href="https://devmentorhub.com" />
        
        {/* Additional Link Tags */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to Important Domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://zbnwztqwkusdurqllgzc.supabase.co" />
        
        {/* BreadcrumbList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://devmentorhub.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Programs",
                "item": "https://devmentorhub.com#programs-section"
              }
            ]
          })}
        </script>
        
        {/* WebSite Schema with Search Action */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Dev Mentor Hub",
            "url": "https://devmentorhub.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://devmentorhub.com/programs?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        
        {/* Enhanced Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Dev Mentor Hub",
            "alternateName": "DevMentorHub",
            "legalName": "Dev Mentor Hub Private Limited",
            "description": "India's leading AI-powered mentorship platform connecting students with industry experts for hands-on training in web development, React, Node.js, AI integration, and modern programming technologies. Affordable, personalized, project-based learning.",
            "url": "https://devmentorhub.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://devmentorhub.com/logo.png",
              "width": 250,
              "height": 60
            },
            "image": {
              "@type": "ImageObject",
              "url": "https://devmentorhub.com/og-image.jpg",
              "width": 1200,
              "height": 630
            },
            "foundingDate": "2024",
            "foundingLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              }
            },
            "courseMode": ["online", "remote"],
            "availableLanguage": ["English", "Hindi"],
            "areaServed": {
              "@type": "Country",
              "name": "India"
            },
            "audience": [
              {
                "@type": "EducationalAudience",
                "educationalRole": "student",
                "audienceType": "Beginners to Intermediate Developers"
              },
              {
                "@type": "PeopleAudience",
                "suggestedMinAge": 18,
                "suggestedMaxAge": 45
              }
            ],
            "educationalCredentialAwarded": {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "Certificate of Completion",
              "recognizedBy": {
                "@type": "Organization",
                "name": "Dev Mentor Hub"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Programming and Web Development Mentorship Programs",
              "itemListElement": [
                {
                  "@type": "Course",
                  "name": "Full Stack Web Development Mentorship",
                  "description": "12-week comprehensive mentorship program covering React, Node.js, MongoDB, Express, and modern full-stack development with real-world projects",
                  "provider": {
                    "@type": "Organization",
                    "name": "Dev Mentor Hub"
                  },
                  "courseMode": "online",
                  "educationalLevel": "Intermediate",
                  "timeRequired": "P12W",
                  "offers": {
                    "@type": "Offer",
                    "price": "15000",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock"
                  },
                  "hasCourseInstance": {
                    "@type": "CourseInstance",
                    "courseMode": "online",
                    "courseWorkload": "PT10H"
                  }
                },
                {
                  "@type": "Course",
                  "name": "Frontend React Mastery",
                  "description": "8-week intensive React mentorship covering TypeScript, Next.js, Tailwind CSS, and modern frontend development practices",
                  "provider": {
                    "@type": "Organization",
                    "name": "Dev Mentor Hub"
                  },
                  "courseMode": "online",
                  "educationalLevel": "Intermediate",
                  "timeRequired": "P8W",
                  "offers": {
                    "@type": "Offer",
                    "price": "12000",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock"
                  }
                },
                {
                  "@type": "Course",
                  "name": "Backend Development with Node.js",
                  "description": "10-week backend development mentorship covering Node.js, Express, PostgreSQL, Docker, and API development",
                  "provider": {
                    "@type": "Organization",
                    "name": "Dev Mentor Hub"
                  },
                  "courseMode": "online",
                  "educationalLevel": "Intermediate",
                  "timeRequired": "P10W",
                  "offers": {
                    "@type": "Offer",
                    "price": "13000",
                    "priceCurrency": "INR",
                    "availability": "https://schema.org/InStock"
                  }
                }
              ]
            },
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "contactType": "Customer Support",
                "telephone": "+91-9656778508",
                "availableLanguage": ["English", "Hindi"],
                "areaServed": "IN"
              }
            ],
            "sameAs": [
              "https://linkedin.com/company/dev-mentor-hub",
              "https://twitter.com/devmentorhub",
              "https://facebook.com/devmentorhub",
              "https://instagram.com/devmentorhub"
            ]
          })}
        </script>
        
        {/* Enhanced FAQ Schema with More Questions */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What makes Dev Mentor Hub different from other online coding platforms?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dev Mentor Hub is India's first AI-enhanced mentorship platform offering pure project-based learning with personalized guidance from industry experts. Unlike traditional courses, you work on real projects with weekly feedback, all at an affordable price of ₹199. We focus on practical skills, not just theory."
                }
              },
              {
                "@type": "Question", 
                "name": "How does the AI-powered mentorship system work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our AI analyzes your learning style, career goals, code quality, and progress to match you with suitable mentors and create personalized learning paths. It provides intelligent recommendations, tracks milestones, adapts curriculum difficulty, and ensures optimal learning outcomes through continuous feedback."
                }
              },
              {
                "@type": "Question",
                "name": "What technologies and programming skills can I learn?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our programs cover modern web development technologies including React, Node.js, JavaScript, TypeScript, Next.js, Express, MongoDB, PostgreSQL, Docker, Git, REST APIs, GraphQL, Tailwind CSS, and AI integration with Supabase. All curricula are updated regularly to match current industry standards."
                }
              },
              {
                "@type": "Question",
                "name": "How much does the mentorship program cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our programs start at just ₹199 for basic mentorship. Full Stack development costs ₹15,000, Frontend React Mastery is ₹12,000, and Backend Development is ₹13,000. We offer installment options, referral discounts, and special promotions regularly."
                }
              },
              {
                "@type": "Question",
                "name": "Do I get a certificate after completing the program?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Upon successful completion of your mentorship program, you receive a Certificate of Completion from Dev Mentor Hub, which demonstrates your practical skills and project experience to potential employers."
                }
              },
              {
                "@type": "Question",
                "name": "What kind of career support do you provide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer comprehensive career support including AI-powered resume optimization, interview preparation system with real question banks, portfolio building guidance, LinkedIn profile optimization, job referrals, and ongoing mentorship even after program completion."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it take to complete a program?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Program duration varies: Frontend React Mastery takes 8 weeks, Backend Development takes 10 weeks, and Full Stack Web Development takes 12 weeks. Each includes weekly tasks, live sessions, and personalized feedback from mentors."
                }
              },
              {
                "@type": "Question",
                "name": "Can beginners join these programs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! Our programs are designed for learners at all levels. Beginners receive foundational training before moving to advanced topics, while experienced developers can skip basics and focus on specialized skills. Our AI adapts the curriculum to your level."
                }
              },
              {
                "@type": "Question",
                "name": "Will I build real projects during the program?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, project-based learning is our core methodology. You'll build 3-5 real-world projects in each program, including e-commerce sites, social media apps, dashboards, and APIs. All projects go into your portfolio to showcase to employers."
                }
              },
              {
                "@type": "Question",
                "name": "What is the refund policy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer a 7-day money-back guarantee if you're not satisfied with the program quality or mentorship. After 7 days, refunds are evaluated case-by-case based on progress and engagement levels."
                }
              }
            ]
          })}
        </script>
        
        {/* ItemList Schema for Programs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Web Development & Programming Mentorship Programs",
            "description": "Comprehensive list of mentorship programs offered by Dev Mentor Hub",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Course",
                  "name": "Full Stack Web Development",
                  "url": "https://devmentorhub.com/programs/fullstack",
                  "description": "Master React, Node.js, and modern web technologies"
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Course",
                  "name": "Frontend React Mastery",
                  "url": "https://devmentorhub.com/programs/frontend",
                  "description": "Deep dive into React ecosystem and modern frontend"
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Course",
                  "name": "Backend Development",
                  "url": "https://devmentorhub.com/programs/backend",
                  "description": "Build scalable APIs and server applications"
                }
              }
            ]
          })}
        </script>
        
        {/* WebPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Dev Mentor Hub - AI-Powered Mentorship Platform",
            "description": "Learn web development and programming with personalized mentorship from industry experts. Affordable programs, real projects, career support.",
            "url": "https://devmentorhub.com",
            "inLanguage": "en-IN",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Dev Mentor Hub",
              "url": "https://devmentorhub.com"
            },
            "primaryImageOfPage": {
              "@type": "ImageObject",
              "url": "https://devmentorhub.com/og-image.jpg",
              "width": 1200,
              "height": 630
            },
            "datePublished": "2024-01-01",
            "dateModified": "2025-01-03",
            "author": {
              "@type": "Organization",
              "name": "Dev Mentor Hub"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Dev Mentor Hub",
              "logo": {
                "@type": "ImageObject",
                "url": "https://devmentorhub.com/logo.png"
              }
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <header role="banner">
          <MainNav />
          <CategoryTopper />
        </header>
        <main role="main" id="main-content">
          {/* Breadcrumb Navigation for SEO */}
          <nav aria-label="Breadcrumb" className="bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
              <ol className="flex items-center space-x-2 text-sm text-gray-600" itemScope itemType="https://schema.org/BreadcrumbList">
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <a href="/" itemProp="item" className="hover:text-primary transition-colors">
                    <span itemProp="name">Home</span>
                  </a>
                  <meta itemProp="position" content="1" />
                </li>
              </ol>
            </div>
          </nav>
          
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
          <AdvertiserSection />
          <PartnershipsSection />
          <ShareSection />
          <CodeOfConductSection />
          
        </main>
        <footer role="contentinfo">
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
