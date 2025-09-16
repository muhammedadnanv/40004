import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, MessageCircle, Linkedin, ArrowRight, CheckCircle } from "lucide-react";
import { ResumeBuilder } from "@/components/professional/ResumeBuilder";
import { InterviewPrep } from "@/components/professional/InterviewPrep";
import { LinkedInOptimizer } from "@/components/professional/LinkedInOptimizer";

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
  }
];

const ProfessionalDevelopment = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Professional Development Hub</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Accelerate your career with AI-powered tools for resume building, interview preparation, and professional networking
            </p>
          </div>

          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resume">Resume Builder</TabsTrigger>
            <TabsTrigger value="interview">Interview Prep</TabsTrigger>
            <TabsTrigger value="linkedin">LinkedIn Optimizer</TabsTrigger>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </div>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        onClick={() => setActiveTab(feature.id)}
                        className="w-full"
                        variant="outline"
                      >
                        Try {feature.title}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">95%</div>
                    <p className="text-sm text-muted-foreground">ATS Pass Rate</p>
                    <p className="text-xs text-muted-foreground mt-1">Our AI-optimized resumes pass through Applicant Tracking Systems</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">3x</div>
                    <p className="text-sm text-muted-foreground">Interview Success</p>
                    <p className="text-xs text-muted-foreground mt-1">Users report 3x higher interview success rates after practice</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">87%</div>
                    <p className="text-sm text-muted-foreground">Profile Improvement</p>
                    <p className="text-xs text-muted-foreground mt-1">Average LinkedIn profile optimization score improvement</p>
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
        </Tabs>
      </div>
    </div>
  );
};

export default ProfessionalDevelopment;