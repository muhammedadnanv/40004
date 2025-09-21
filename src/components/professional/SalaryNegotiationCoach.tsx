import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, Target, Lightbulb, CheckCircle } from "lucide-react";
import { generateWithOpenAI } from "@/utils/openaiService";
import { useToast } from "@/hooks/use-toast";

interface NegotiationData {
  currentSalary: string;
  targetSalary: string;
  jobTitle: string;
  experience: string;
  location: string;
  industry: string;
  achievements: string;
  marketResearch: string;
}

interface NegotiationAdvice {
  strategy: string;
  talkingPoints: string[];
  counterOfferTips: string[];
  marketAnalysis: string;
  negotiationScript: string;
  confidenceScore: number;
}

const INDUSTRIES = [
  'Technology', 'Healthcare', 'Finance', 'Marketing', 'Sales', 'Education',
  'Consulting', 'Manufacturing', 'Engineering', 'Legal', 'Media'
];

export const SalaryNegotiationCoach = () => {
  const { toast } = useToast();
  const [negotiationData, setNegotiationData] = useState<NegotiationData>({
    currentSalary: '',
    targetSalary: '',
    jobTitle: '',
    experience: '',
    location: '',
    industry: '',
    achievements: '',
    marketResearch: ''
  });

  const [advice, setAdvice] = useState<NegotiationAdvice | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateAdvice = async () => {
    if (!negotiationData.jobTitle || !negotiationData.targetSalary) {
      toast({ title: "Error", description: "Please fill in job title and target salary", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    try {
      const prompt = `As a professional salary negotiation coach, provide comprehensive advice for this salary negotiation:

Job Details:
- Title: ${negotiationData.jobTitle}
- Current Salary: ${negotiationData.currentSalary || 'Not disclosed'}
- Target Salary: ${negotiationData.targetSalary}
- Experience: ${negotiationData.experience}
- Location: ${negotiationData.location}
- Industry: ${negotiationData.industry}
- Key Achievements: ${negotiationData.achievements}
- Market Research: ${negotiationData.marketResearch}

Please provide advice in JSON format with these keys:
- strategy: overall negotiation strategy (200 words)
- talkingPoints: array of 5-7 key points to mention
- counterOfferTips: array of 4-5 tips for handling counteroffers
- marketAnalysis: analysis of the salary request vs market rates
- negotiationScript: sample conversation script
- confidenceScore: score from 1-100 based on preparation level

Focus on professional, data-driven approaches that emphasize value creation.`;

      const response = await generateWithOpenAI({
        prompt,
        temperature: 0.3,
        maxTokens: 1500
      });

      let parsedAdvice;
      try {
        parsedAdvice = JSON.parse(response);
      } catch {
        // Fallback if JSON parsing fails
        parsedAdvice = {
          strategy: "Build a compelling case based on your achievements and market value. Research industry standards and prepare specific examples of your contributions.",
          talkingPoints: [
            "Highlight specific achievements and quantifiable results",
            "Reference market research and industry standards",
            "Emphasize your unique value proposition",
            "Discuss your professional development and growth",
            "Show commitment to company goals"
          ],
          counterOfferTips: [
            "Listen carefully to their concerns",
            "Be prepared to negotiate non-salary benefits",
            "Maintain a collaborative tone",
            "Have a minimum acceptable offer in mind"
          ],
          marketAnalysis: "Based on the information provided, conduct thorough market research to ensure your request aligns with industry standards.",
          negotiationScript: "Thank you for this opportunity. Based on my research and the value I bring to this role, I'd like to discuss the compensation package...",
          confidenceScore: 75
        };
      }

      setAdvice(parsedAdvice);
      toast({ title: "Success", description: "Negotiation advice generated!" });
    } catch (error) {
      console.error('Error generating advice:', error);
      toast({ title: "Error", description: "Failed to generate advice. Please try again.", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <DollarSign className="w-8 h-8 text-green-600" />
          AI Salary Negotiation Coach
        </h1>
        <p className="text-muted-foreground">Get personalized strategies and scripts for successful salary negotiations</p>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Information</CardTitle>
              <CardDescription>Tell us about the position you're negotiating for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Job Title (e.g., Senior Software Engineer)"
                value={negotiationData.jobTitle}
                onChange={(e) => setNegotiationData(prev => ({ ...prev, jobTitle: e.target.value }))}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Current Salary (optional)"
                  value={negotiationData.currentSalary}
                  onChange={(e) => setNegotiationData(prev => ({ ...prev, currentSalary: e.target.value }))}
                />
                <Input
                  placeholder="Target Salary *"
                  value={negotiationData.targetSalary}
                  onChange={(e) => setNegotiationData(prev => ({ ...prev, targetSalary: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Years of Experience"
                  value={negotiationData.experience}
                  onChange={(e) => setNegotiationData(prev => ({ ...prev, experience: e.target.value }))}
                />
                <Input
                  placeholder="Location"
                  value={negotiationData.location}
                  onChange={(e) => setNegotiationData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <Select value={negotiationData.industry} onValueChange={(value) => setNegotiationData(prev => ({ ...prev, industry: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map(industry => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supporting Information</CardTitle>
              <CardDescription>Strengthen your negotiation with achievements and research</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Key achievements and quantifiable results (e.g., increased sales by 30%, led team of 10, etc.)"
                value={negotiationData.achievements}
                onChange={(e) => setNegotiationData(prev => ({ ...prev, achievements: e.target.value }))}
                rows={4}
              />
              
              <Textarea
                placeholder="Market research findings (e.g., salary ranges from Glassdoor, industry reports, etc.)"
                value={negotiationData.marketResearch}
                onChange={(e) => setNegotiationData(prev => ({ ...prev, marketResearch: e.target.value }))}
                rows={3}
              />
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              onClick={generateAdvice} 
              disabled={isAnalyzing}
              size="lg"
              className="px-8"
            >
              {isAnalyzing ? "Analyzing..." : "Generate Negotiation Strategy"}
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {!advice ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Ready to Negotiate?</h3>
                <p className="text-muted-foreground">
                  Fill out the form to get your personalized salary negotiation strategy and talking points.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Confidence Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Negotiation Readiness
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold mb-2">{advice.confidenceScore}/100</div>
                    <p className="text-muted-foreground">Confidence Score</p>
                  </div>
                  <Progress value={advice.confidenceScore} className="h-3" />
                </CardContent>
              </Card>

              {/* Strategy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Negotiation Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{advice.strategy}</p>
                </CardContent>
              </Card>

              {/* Key Points */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Talking Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {advice.talkingPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Counter Offer Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Counter Offer Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {advice.counterOfferTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Market Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{advice.marketAnalysis}</p>
                </CardContent>
              </Card>

              {/* Negotiation Script */}
              <Card>
                <CardHeader>
                  <CardTitle>Sample Negotiation Script</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{advice.negotiationScript}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};