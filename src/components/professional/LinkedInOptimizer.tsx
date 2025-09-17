import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, AlertCircle, Linkedin, Lightbulb, Target, TrendingUp } from "lucide-react";
import { generateWithGemini } from "@/utils/geminiService";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  headline: string;
  summary: string;
  experience: string;
  skills: string[];
  industry: string;
  targetRole: string;
}

interface OptimizationResult {
  score: number;
  headline: {
    current: string;
    optimized: string;
    feedback: string;
  };
  summary: {
    current: string;
    optimized: string;
    feedback: string;
  };
  keywords: string[];
  recommendations: string[];
  industryTrends: string[];
}

const INDUSTRIES = [
  'Technology', 'Healthcare', 'Finance', 'Marketing', 'Sales', 'Education',
  'Consulting', 'Manufacturing', 'Retail', 'Real Estate', 'Non-profit'
];

const SCORING_CRITERIA = [
  { name: 'Headline Optimization', weight: 20, description: 'Professional headline with keywords' },
  { name: 'Summary Quality', weight: 25, description: 'Compelling summary with achievements' },
  { name: 'Keyword Usage', weight: 20, description: 'Industry-relevant keywords' },
  { name: 'Profile Completeness', weight: 15, description: 'All sections filled out' },
  { name: 'Industry Alignment', weight: 10, description: 'Content matches target industry' },
  { name: 'Professional Tone', weight: 10, description: 'Professional and engaging language' }
];

export const LinkedInOptimizer = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<ProfileData>({
    headline: '',
    summary: '',
    experience: '',
    skills: [],
    industry: '',
    targetRole: ''
  });

  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const calculateProfileScore = (data: ProfileData): number => {
    let score = 0;
    
    // Headline (20 points)
    if (data.headline.length > 10) score += 10;
    if (data.headline.length > 50) score += 10;
    
    // Summary (25 points)
    if (data.summary.length > 50) score += 10;
    if (data.summary.length > 200) score += 15;
    
    // Keywords (20 points)
    if (data.skills.length > 3) score += 10;
    if (data.skills.length > 8) score += 10;
    
    // Completeness (15 points)
    if (data.experience.length > 20) score += 7.5;
    if (data.industry) score += 7.5;
    
    // Industry alignment (10 points)
    if (data.targetRole) score += 10;
    
    // Professional tone (10 points) - simplified check
    if (data.headline && data.summary) score += 10;
    
    return Math.round(score);
  };

  const optimizeProfile = async () => {
    if (!profileData.headline && !profileData.summary) {
      toast({ title: "Error", description: "Please fill in at least your headline and summary", variant: "destructive" });
      return;
    }

    setIsOptimizing(true);
    try {
      const prompt = `Optimize this LinkedIn profile for better visibility and professional appeal:

Current Profile:
- Headline: ${profileData.headline}
- Summary: ${profileData.summary}
- Experience: ${profileData.experience}
- Industry: ${profileData.industry}
- Target Role: ${profileData.targetRole}
- Current Skills: ${profileData.skills.join(', ')}

Please provide optimization suggestions in JSON format with these keys:
- optimizedHeadline: improved professional headline (max 120 chars)
- optimizedSummary: enhanced summary (max 2000 chars)
- keywords: array of 10-15 relevant keywords for this industry/role
- recommendations: array of 5-7 specific improvement suggestions
- industryTrends: array of 3-5 current trends relevant to their field

Focus on:
1. ATS-friendly keywords
2. Achievement-oriented language
3. Industry-specific terminology
4. Professional storytelling
5. Call-to-action elements`;

      const response = await generateWithGemini({ prompt, temperature: 0.3 });
      
      let optimizations;
      try {
        optimizations = JSON.parse(response);
      } catch (parseError) {
        // Fallback if JSON parsing fails
        optimizations = {
          optimizedHeadline: profileData.headline || "Professional seeking opportunities",
          optimizedSummary: profileData.summary || "Experienced professional with proven track record",
          keywords: ["Leadership", "Communication", "Problem Solving", "Team Work"],
          recommendations: ["Add specific achievements", "Include industry keywords", "Quantify results"],
          industryTrends: ["Digital transformation", "Remote work", "AI integration"]
        };
      }

      const result: OptimizationResult = {
        score: calculateProfileScore(profileData),
        headline: {
          current: profileData.headline,
          optimized: optimizations.optimizedHeadline,
          feedback: "Improved with industry keywords and value proposition"
        },
        summary: {
          current: profileData.summary,
          optimized: optimizations.optimizedSummary,
          feedback: "Enhanced with achievements and professional storytelling"
        },
        keywords: optimizations.keywords || [],
        recommendations: optimizations.recommendations || [],
        industryTrends: optimizations.industryTrends || []
      };

      setOptimizationResult(result);
      toast({ title: "Success", description: "Profile optimization complete!" });
    } catch (error) {
      console.error('Error optimizing profile:', error);
      toast({ title: "Error", description: "Failed to optimize profile. Please try again.", variant: "destructive" });
    } finally {
      setIsOptimizing(false);
    }
  };

  const applyOptimization = (field: 'headline' | 'summary') => {
    if (!optimizationResult) return;
    
    setProfileData(prev => ({
      ...prev,
      [field]: optimizationResult[field].optimized
    }));
    
    toast({ title: "Success", description: `${field.charAt(0).toUpperCase() + field.slice(1)} updated!` });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Linkedin className="w-8 h-8 text-blue-600" />
          LinkedIn Profile Optimizer
        </h1>
        <p className="text-muted-foreground">Enhance your professional profile with AI-powered optimization</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile Input</TabsTrigger>
          <TabsTrigger value="optimization">Optimization Results</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Enter your current LinkedIn profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Industry</label>
                   <Select value={profileData.industry} onValueChange={(value) => setProfileData(prev => ({ ...prev, industry: value }))}>
                     <SelectTrigger>
                       <SelectValue placeholder="Select Industry" />
                     </SelectTrigger>
                     <SelectContent>
                       {INDUSTRIES.map(industry => (
                         <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Role</label>
                  <Input
                    placeholder="e.g., Software Engineer, Marketing Manager"
                    value={profileData.targetRole}
                    onChange={(e) => setProfileData(prev => ({ ...prev, targetRole: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Headline */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Headline</CardTitle>
              <CardDescription>Your headline appears under your name (120 characters max)</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., Senior Software Engineer | Full-Stack Developer | React & Node.js Expert"
                value={profileData.headline}
                onChange={(e) => setProfileData(prev => ({ ...prev, headline: e.target.value }))}
                rows={2}
                maxLength={120}
              />
              <div className="text-sm text-muted-foreground mt-1">
                {profileData.headline.length}/120 characters
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
              <CardDescription>Your summary section (About section on LinkedIn)</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write about your professional background, achievements, and career goals..."
                value={profileData.summary}
                onChange={(e) => setProfileData(prev => ({ ...prev, summary: e.target.value }))}
                rows={6}
                maxLength={2000}
              />
              <div className="text-sm text-muted-foreground mt-1">
                {profileData.summary.length}/2000 characters
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Key Experience</CardTitle>
              <CardDescription>Highlight your most relevant work experience</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Summarize your key work experiences, achievements, and responsibilities..."
                value={profileData.experience}
                onChange={(e) => setProfileData(prev => ({ ...prev, experience: e.target.value }))}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Add your professional skills and competencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Current Profile Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{calculateProfileScore(profileData)}/100</span>
                  <Button onClick={optimizeProfile} disabled={isOptimizing}>
                    {isOptimizing ? "Analyzing..." : "Optimize Profile"}
                  </Button>
                </div>
                <Progress value={calculateProfileScore(profileData)} className="h-3" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {SCORING_CRITERIA.map(criteria => (
                    <div key={criteria.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{criteria.name} ({criteria.weight}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          {!optimizationResult ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No Optimization Results</h3>
                <p className="text-muted-foreground mb-4">
                  Fill out your profile information and click "Optimize Profile" to see AI-powered suggestions.
                </p>
                <Button onClick={() => setIsOptimizing(true)} disabled={isOptimizing}>
                  Run Optimization
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Overall Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Optimization Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">{optimizationResult.score}/100</div>
                    <p className="text-muted-foreground">Current Profile Score</p>
                  </div>
                </CardContent>
              </Card>

              {/* Headline Optimization */}
              <Card>
                <CardHeader>
                  <CardTitle>Headline Optimization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Current:</h4>
                    <p className="p-3 bg-muted rounded-lg">{optimizationResult.headline.current || "No headline provided"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Optimized:</h4>
                    <p className="p-3 bg-green-50 border border-green-200 rounded-lg">{optimizationResult.headline.optimized}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{optimizationResult.headline.feedback}</p>
                  <Button onClick={() => applyOptimization('headline')} size="sm">
                    Apply Optimization
                  </Button>
                </CardContent>
              </Card>

              {/* Summary Optimization */}
              <Card>
                <CardHeader>
                  <CardTitle>Summary Optimization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Current:</h4>
                    <p className="p-3 bg-muted rounded-lg whitespace-pre-wrap">{optimizationResult.summary.current || "No summary provided"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Optimized:</h4>
                    <p className="p-3 bg-green-50 border border-green-200 rounded-lg whitespace-pre-wrap">{optimizationResult.summary.optimized}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{optimizationResult.summary.feedback}</p>
                  <Button onClick={() => applyOptimization('summary')} size="sm">
                    Apply Optimization
                  </Button>
                </CardContent>
              </Card>

              {/* Keywords */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Recommended Keywords
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {optimizationResult.keywords.map(keyword => (
                      <Badge key={keyword} variant="outline">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Include these keywords throughout your profile to improve discoverability.
                  </p>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Improvement Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {optimizationResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Industry Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Industry Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {optimizationResult.industryTrends.map((trend, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">{trend}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};