import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, MessageCircle, Linkedin, ArrowRight, CheckCircle, 
  DollarSign, MapPin, BarChart, User, TrendingUp, Target, Home, ChevronRight 
} from "lucide-react";
import { ResumeBuilder } from "@/components/professional/ResumeBuilder";
import { InterviewPrep } from "@/components/professional/InterviewPrep";
import { LinkedInOptimizer } from "@/components/professional/LinkedInOptimizer";
import { SalaryNegotiationCoach } from "@/components/professional/SalaryNegotiationCoach";
import { CareerPathPlanner } from "@/components/professional/CareerPathPlanner";
import { SkillsGapAnalyzer } from "@/components/professional/SkillsGapAnalyzer";
import { PersonalBrandBuilder } from "@/components/professional/PersonalBrandBuilder";

const FEATURES = [
  {
    id: 'resume',
    title: 'AI Resume Builder',
    description: 'Create professional resumes with industry-specific templates and AI optimization',
    icon: FileText,
    benefits: [
      'Industry-specific templates',
      'AI-powered content optimization', 
      'ATS-friendly formatting',
      'Instant download in multiple formats'
    ]
  },
  {
    id: 'interview',
    title: 'Interview Preparation',
    description: 'Practice mock interviews with AI-driven feedback and coaching',
    icon: MessageCircle,
    benefits: [
      'Behavioral and technical questions',
      'Real-time AI feedback',
      'Performance scoring',
      'Personalized improvement tips'
    ]
  },
  {
    id: 'linkedin',
    title: 'LinkedIn Optimizer',
    description: 'Enhance your professional profile for better networking and opportunities',
    icon: Linkedin,
    benefits: [
      'Profile optimization analysis',
      'Keyword recommendations',
      'Industry trend insights',
      'Professional headline suggestions'
    ]
  },
  {
    id: 'salary',
    title: 'Salary Negotiation Coach',
    description: 'Get AI-powered strategies and scripts for successful salary negotiations',
    icon: DollarSign,
    benefits: [
      'Personalized negotiation strategies',
      'Market research analysis',
      'Custom negotiation scripts',
      'Counter-offer handling tips'
    ]
  },
  {
    id: 'career-path',
    title: 'Career Path Planner',
    description: 'Create a personalized roadmap to achieve your long-term career goals',
    icon: MapPin,
    benefits: [
      'Strategic career milestones',
      'Skill development roadmap',
      'Timeline-based planning',
      'Learning resource recommendations'
    ]
  },
  {
    id: 'skills-gap',
    title: 'Skills Gap Analyzer',
    description: 'Identify skill gaps and get targeted learning recommendations',
    icon: BarChart,
    benefits: [
      'Comprehensive skill assessment',
      'Industry benchmarking',
      'Personalized learning plans',
      'Progress tracking tools'
    ]
  },
  {
    id: 'personal-brand',
    title: 'Personal Brand Builder',
    description: 'Build an authentic professional brand that stands out in your industry',
    icon: User,
    benefits: [
      'Brand strategy development',
      'Content pillar planning',
      'Social media guidance',
      'Visual identity guidelines'
    ]
  }
];

const ProfessionalDevelopment = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const pageUrl = "https://devmentorhub.com/professional-development";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Professional Development Hub",
    "description": "AI-powered career development tools including resume builder, interview prep, LinkedIn optimization, and salary negotiation coaching",
    "url": pageUrl,
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Professional Development Tools Suite",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "featureList": [
        "AI Resume Builder",
        "Interview Preparation",
        "LinkedIn Profile Optimizer",
        "Salary Negotiation Coach",
        "Career Path Planner",
        "Skills Gap Analyzer",
        "Personal Brand Builder"
      ]
    }
  };

  const breadcrumbSchema = {
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
        "name": "Professional Development",
        "item": pageUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Professional Development Hub | AI Resume Builder, Interview Prep & Career Tools | Dev Mentor Hub</title>
        <meta name="description" content="Accelerate your tech career with AI-powered professional development tools. Build ATS-optimized resumes, practice interviews, optimize LinkedIn profile, negotiate salary, and plan your career path. Free career tools for developers." />
        <meta name="keywords" content="professional development, career development tools, AI resume builder, interview preparation, LinkedIn optimization, salary negotiation, career planning, skills assessment, personal branding, tech career tools, developer career growth, job search tools, ATS resume, career coaching" />
        <meta property="og:title" content="Professional Development Hub | Career Tools for Developers | Dev Mentor Hub" />
        <meta property="og:description" content="AI-powered tools for resume building, interview prep, LinkedIn optimization, and career planning. Free career development resources." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content="https://devmentorhub.com/og-professional.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Professional Development Hub | Dev Mentor Hub" />
        <meta name="twitter:description" content="AI-powered career tools for developers - resume builder, interview prep, and more" />
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <a href="/" className="hover:text-primary transition-colors">Home</a>
            </li>
            <ChevronRight className="w-4 h-4" />
            <li className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="text-primary font-medium" aria-current="page">Professional Development</span>
            </li>
          </ol>
        </nav>
        
        <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Professional Development Hub</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Accelerate your career with AI-powered tools for resume building, interview preparation, and professional networking
            </p>
          </div>

          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 max-w-6xl mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="interview">Interview</TabsTrigger>
            <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
            <TabsTrigger value="salary">Salary</TabsTrigger>
            <TabsTrigger value="career-path">Career Path</TabsTrigger>
            <TabsTrigger value="skills-gap">Skills</TabsTrigger>
            <TabsTrigger value="personal-brand">Brand</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Hero Section */}
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Transform Your Professional Journey</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our comprehensive suite of AI-powered tools helps you build compelling resumes, 
                  ace interviews, and optimize your professional online presence for maximum career impact.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button onClick={() => setActiveTab('resume')} size="lg">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-base leading-tight">{feature.title}</CardTitle>
                      </div>
                      <CardDescription className="text-sm">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-0">
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-xs">
                            <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        onClick={() => setActiveTab(feature.id)}
                        className="w-full"
                        variant="outline"
                        size="sm"
                      >
                        Try Tool
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Why Choose Our Professional Development Tools?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">95%</div>
                    <p className="text-xs text-muted-foreground font-medium">ATS Pass Rate</p>
                    <p className="text-xs text-muted-foreground mt-1">AI-optimized resumes</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">3x</div>
                    <p className="text-xs text-muted-foreground font-medium">Interview Success</p>
                    <p className="text-xs text-muted-foreground mt-1">Higher success rates</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">87%</div>
                    <p className="text-xs text-muted-foreground font-medium">Profile Boost</p>
                    <p className="text-xs text-muted-foreground mt-1">LinkedIn improvements</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">$15k</div>
                    <p className="text-xs text-muted-foreground font-medium">Avg. Salary Increase</p>
                    <p className="text-xs text-muted-foreground mt-1">Through negotiations</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">6mo</div>
                    <p className="text-xs text-muted-foreground font-medium">Career Acceleration</p>
                    <p className="text-xs text-muted-foreground mt-1">Faster promotions</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">92%</div>
                    <p className="text-xs text-muted-foreground font-medium">Skill Improvement</p>
                    <p className="text-xs text-muted-foreground mt-1">Competency gains</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary mb-2">5x</div>
                    <p className="text-xs text-muted-foreground font-medium">Brand Visibility</p>
                    <p className="text-xs text-muted-foreground mt-1">Professional presence</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Accelerate Your Career?</h3>
                <p className="mb-6 opacity-90">
                  Join thousands of professionals who have transformed their careers with our AI-powered tools.
                </p>
                <Button 
                  onClick={() => setActiveTab('resume')}
                  size="lg" 
                  variant="secondary"
                >
                  Start Building Your Future
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resume">
            <ResumeBuilder />
          </TabsContent>

          <TabsContent value="interview">
            <InterviewPrep />
          </TabsContent>

          <TabsContent value="linkedin">
            <LinkedInOptimizer />
          </TabsContent>

          <TabsContent value="salary">
            <SalaryNegotiationCoach />
          </TabsContent>

          <TabsContent value="career-path">
            <CareerPathPlanner />
          </TabsContent>

          <TabsContent value="skills-gap">
            <SkillsGapAnalyzer />
          </TabsContent>

          <TabsContent value="personal-brand">
            <PersonalBrandBuilder />
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </>
  );
};

export default ProfessionalDevelopment;