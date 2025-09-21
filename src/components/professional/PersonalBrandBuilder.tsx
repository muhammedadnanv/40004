import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Sparkles, Share2, Globe, MessageSquare, Camera } from "lucide-react";
import { generateWithOpenAI } from "@/utils/openaiService";
import { useToast } from "@/hooks/use-toast";

interface BrandData {
  name: string;
  profession: string;
  industry: string;
  targetAudience: string;
  uniqueValue: string;
  personality: string[];
  goals: string;
  currentPresence: string;
}

interface BrandStrategy {
  brandStatement: string;
  valueProposition: string;
  contentPillars: ContentPillar[];
  socialMediaStrategy: SocialStrategy[];
  contentCalendar: ContentIdea[];
  brandVoice: BrandVoice;
  visualIdentity: VisualGuidelines;
}

interface ContentPillar {
  title: string;
  description: string;
  contentTypes: string[];
  frequency: string;
}

interface SocialStrategy {
  platform: string;
  focus: string;
  contentMix: string[];
  postingFrequency: string;
  engagement: string;
}

interface ContentIdea {
  week: string;
  platform: string;
  contentType: string;
  topic: string;
  purpose: string;
}

interface BrandVoice {
  tone: string;
  vocabulary: string[];
  dosList: string[];
  dontsList: string[];
}

interface VisualGuidelines {
  colorPalette: string[];
  typography: string;
  imageStyle: string;
  logoGuidelines: string;
}

const PERSONALITIES = [
  'Professional', 'Friendly', 'Innovative', 'Authoritative', 'Creative',
  'Approachable', 'Expert', 'Inspiring', 'Authentic', 'Passionate'
];

const INDUSTRIES = [
  'Technology', 'Healthcare', 'Finance', 'Marketing', 'Consulting',
  'Education', 'Design', 'Sales', 'Media', 'Non-profit'
];

export const PersonalBrandBuilder = () => {
  const { toast } = useToast();
  const [brandData, setBrandData] = useState<BrandData>({
    name: '',
    profession: '',
    industry: '',
    targetAudience: '',
    uniqueValue: '',
    personality: [],
    goals: '',
    currentPresence: ''
  });

  const [brandStrategy, setBrandStrategy] = useState<BrandStrategy | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const togglePersonality = (trait: string) => {
    setBrandData(prev => ({
      ...prev,
      personality: prev.personality.includes(trait)
        ? prev.personality.filter(p => p !== trait)
        : [...prev.personality, trait]
    }));
  };

  const generateBrandStrategy = async () => {
    if (!brandData.name || !brandData.profession || !brandData.uniqueValue) {
      toast({ title: "Error", description: "Please fill in name, profession, and unique value", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = `Create a comprehensive personal brand strategy for this professional:

Personal Information:
- Name: ${brandData.name}
- Profession: ${brandData.profession}
- Industry: ${brandData.industry}
- Target Audience: ${brandData.targetAudience}
- Unique Value: ${brandData.uniqueValue}
- Personality Traits: ${brandData.personality.join(', ')}
- Goals: ${brandData.goals}
- Current Online Presence: ${brandData.currentPresence}

Please provide a detailed brand strategy in JSON format with these keys:
- brandStatement: compelling 2-sentence brand statement
- valueProposition: clear value proposition
- contentPillars: array of 3-4 content pillars with title, description, contentTypes, frequency
- socialMediaStrategy: array of platform strategies with platform, focus, contentMix, postingFrequency, engagement
- contentCalendar: array of 12 content ideas with week, platform, contentType, topic, purpose
- brandVoice: object with tone, vocabulary array, dosList array, dontsList array
- visualIdentity: object with colorPalette array, typography, imageStyle, logoGuidelines

Focus on authentic, professional branding that showcases expertise and builds trust.`;

      const response = await generateWithOpenAI({
        prompt,
        temperature: 0.4,
        maxTokens: 2500
      });

      let parsedStrategy;
      try {
        parsedStrategy = JSON.parse(response);
      } catch {
        // Fallback if JSON parsing fails
        parsedStrategy = {
          brandStatement: `${brandData.name} is a ${brandData.profession} who helps ${brandData.targetAudience} through ${brandData.uniqueValue}. Known for being ${brandData.personality.slice(0,2).join(' and ')}, ${brandData.name} delivers exceptional results.`,
          valueProposition: `Expert ${brandData.profession} with proven track record in ${brandData.industry}`,
          contentPillars: [
            {
              title: "Industry Insights",
              description: "Share expertise and industry knowledge",
              contentTypes: ["Articles", "Posts", "Videos"],
              frequency: "2x per week"
            },
            {
              title: "Professional Journey",
              description: "Share experiences and lessons learned",
              contentTypes: ["Stories", "Case studies"],
              frequency: "1x per week"
            },
            {
              title: "Thought Leadership",
              description: "Opinion pieces and future predictions",
              contentTypes: ["Articles", "Discussions"],
              frequency: "1x per week"
            }
          ],
          socialMediaStrategy: [
            {
              platform: "LinkedIn",
              focus: "Professional networking and thought leadership",
              contentMix: ["Articles", "Posts", "Comments"],
              postingFrequency: "Daily",
              engagement: "Active commenting and sharing"
            },
            {
              platform: "Twitter",
              focus: "Industry conversations and quick insights",
              contentMix: ["Tweets", "Threads", "Replies"],
              postingFrequency: "3-4x per day",
              engagement: "Join trending conversations"
            }
          ],
          contentCalendar: [
            {
              week: "Week 1",
              platform: "LinkedIn",
              contentType: "Article",
              topic: "Industry trends analysis",
              purpose: "Establish thought leadership"
            }
          ],
          brandVoice: {
            tone: "Professional yet approachable",
            vocabulary: ["innovative", "strategic", "results-driven", "collaborative"],
            dosList: ["Use data to support points", "Share personal experiences", "Engage with others' content"],
            dontsList: ["Be overly promotional", "Use jargon without explanation", "Ignore comments"]
          },
          visualIdentity: {
            colorPalette: ["#2563eb", "#1e40af", "#64748b"],
            typography: "Clean, professional fonts",
            imageStyle: "Professional headshots, industry-relevant images",
            logoGuidelines: "Simple, memorable design reflecting professional expertise"
          }
        };
      }

      setBrandStrategy(parsedStrategy);
      toast({ title: "Success", description: "Personal brand strategy generated!" });
    } catch (error) {
      console.error('Error generating brand strategy:', error);
      toast({ title: "Error", description: "Failed to generate strategy. Please try again.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <User className="w-8 h-8 text-blue-600" />
          Personal Brand Builder
        </h1>
        <p className="text-muted-foreground">Build an authentic professional brand that stands out</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Tell us about yourself and your professional identity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Your Full Name"
                value={brandData.name}
                onChange={(e) => setBrandData(prev => ({ ...prev, name: e.target.value }))}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Your Profession"
                  value={brandData.profession}
                  onChange={(e) => setBrandData(prev => ({ ...prev, profession: e.target.value }))}
                />
                
                <Select value={brandData.industry} onValueChange={(value) => setBrandData(prev => ({ ...prev, industry: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                placeholder="Who is your target audience? (e.g., startup founders, marketing managers, students)"
                value={brandData.targetAudience}
                onChange={(e) => setBrandData(prev => ({ ...prev, targetAudience: e.target.value }))}
                rows={2}
              />

              <Textarea
                placeholder="What unique value do you provide? What makes you different?"
                value={brandData.uniqueValue}
                onChange={(e) => setBrandData(prev => ({ ...prev, uniqueValue: e.target.value }))}
                rows={3}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brand Personality</CardTitle>
              <CardDescription>Select traits that describe your professional persona</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {PERSONALITIES.map(trait => (
                  <Badge
                    key={trait}
                    variant={brandData.personality.includes(trait) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => togglePersonality(trait)}
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Goals & Current Presence</CardTitle>
              <CardDescription>Define your branding objectives and current status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What are your personal branding goals? (e.g., get more speaking opportunities, attract clients, find new job)"
                value={brandData.goals}
                onChange={(e) => setBrandData(prev => ({ ...prev, goals: e.target.value }))}
                rows={3}
              />

              <Textarea
                placeholder="Describe your current online presence (LinkedIn profile, website, social media activity, etc.)"
                value={brandData.currentPresence}
                onChange={(e) => setBrandData(prev => ({ ...prev, currentPresence: e.target.value }))}
                rows={3}
              />
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              onClick={generateBrandStrategy} 
              disabled={isGenerating}
              size="lg"
              className="px-8"
            >
              {isGenerating ? "Building Your Brand..." : "Generate Brand Strategy"}
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {!brandStrategy ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Ready to Build Your Brand?</h3>
                <p className="text-muted-foreground">
                  Fill out your information to get a comprehensive personal branding strategy with content ideas and social media guidance.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="visual">Visual</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {/* Brand Statement */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Brand Statement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg leading-relaxed">{brandStrategy.brandStatement}</p>
                  </CardContent>
                </Card>

                {/* Value Proposition */}
                <Card>
                  <CardHeader>
                    <CardTitle>Value Proposition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed">{brandStrategy.valueProposition}</p>
                  </CardContent>
                </Card>

                {/* Brand Voice */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Brand Voice & Tone
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Tone</h4>
                      <p className="text-sm">{brandStrategy.brandVoice.tone}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Key Vocabulary</h4>
                      <div className="flex flex-wrap gap-2">
                        {brandStrategy.brandVoice.vocabulary.map((word, idx) => (
                          <Badge key={idx} variant="secondary">{word}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2 text-green-600">Do's</h4>
                        <ul className="text-sm space-y-1">
                          {brandStrategy.brandVoice.dosList.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 text-red-600">Don'ts</h4>
                        <ul className="text-sm space-y-1">
                          {brandStrategy.brandVoice.dontsList.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                {/* Content Pillars */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Content Pillars
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {brandStrategy.contentPillars.map((pillar, idx) => (
                        <div key={idx} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{pillar.title}</h4>
                            <Badge variant="outline">{pillar.frequency}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{pillar.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {pillar.contentTypes.map((type, typeIdx) => (
                              <Badge key={typeIdx} variant="secondary">{type}</Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Content Calendar */}
                <Card>
                  <CardHeader>
                    <CardTitle>Content Ideas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {brandStrategy.contentCalendar.map((content, idx) => (
                        <div key={idx} className="p-3 bg-muted rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{content.week}</Badge>
                              <Badge variant="secondary">{content.platform}</Badge>
                            </div>
                            <Badge>{content.contentType}</Badge>
                          </div>
                          <h5 className="font-medium text-sm">{content.topic}</h5>
                          <p className="text-xs text-muted-foreground">{content.purpose}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                {/* Social Media Strategy */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="w-5 h-5" />
                      Social Media Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {brandStrategy.socialMediaStrategy.map((strategy, idx) => (
                        <div key={idx} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{strategy.platform}</h4>
                            <Badge variant="outline">{strategy.postingFrequency}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{strategy.focus}</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-sm mb-2">Content Mix</h5>
                              <div className="flex flex-wrap gap-1">
                                {strategy.contentMix.map((type, typeIdx) => (
                                  <Badge key={typeIdx} variant="secondary" className="text-xs">{type}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium text-sm mb-2">Engagement</h5>
                              <p className="text-xs text-muted-foreground">{strategy.engagement}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="visual" className="space-y-4">
                {/* Visual Identity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      Visual Identity Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Color Palette</h4>
                      <div className="flex gap-2 mb-2">
                        {brandStrategy.visualIdentity.colorPalette.map((color, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded border border-gray-300"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {brandStrategy.visualIdentity.colorPalette.map((color, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">{color}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Typography</h4>
                      <p className="text-sm text-muted-foreground">{brandStrategy.visualIdentity.typography}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Image Style</h4>
                      <p className="text-sm text-muted-foreground">{brandStrategy.visualIdentity.imageStyle}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Logo Guidelines</h4>
                      <p className="text-sm text-muted-foreground">{brandStrategy.visualIdentity.logoGuidelines}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};