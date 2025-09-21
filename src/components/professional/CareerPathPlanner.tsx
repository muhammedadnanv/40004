import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Target, Clock, TrendingUp, BookOpen, Users } from "lucide-react";
import { generateWithOpenAI } from "@/utils/openaiService";
import { useToast } from "@/hooks/use-toast";

interface CareerData {
  currentRole: string;
  experience: string;
  skills: string[];
  interests: string[];
  targetRole: string;
  timeframe: string;
  industry: string;
  workStyle: string;
}

interface CareerPath {
  milestones: Milestone[];
  skillGaps: SkillGap[];
  timeline: TimelineStep[];
  recommendations: string[];
  resources: Resource[];
}

interface Milestone {
  title: string;
  description: string;
  timeframe: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface SkillGap {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  priority: 'High' | 'Medium' | 'Low';
  resources: string[];
}

interface TimelineStep {
  phase: string;
  duration: string;
  objectives: string[];
  keyActions: string[];
}

interface Resource {
  type: 'Course' | 'Book' | 'Certification' | 'Network' | 'Experience';
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

const TIMEFRAMES = ['6 months', '1 year', '2 years', '3-5 years', '5+ years'];
const WORK_STYLES = ['Remote', 'Hybrid', 'On-site', 'Flexible', 'Travel-heavy'];
const INDUSTRIES = [
  'Technology', 'Healthcare', 'Finance', 'Marketing', 'Sales', 'Education',
  'Consulting', 'Manufacturing', 'Engineering', 'Legal', 'Media', 'Non-profit'
];

export const CareerPathPlanner = () => {
  const { toast } = useToast();
  const [careerData, setCareerData] = useState<CareerData>({
    currentRole: '',
    experience: '',
    skills: [],
    interests: [],
    targetRole: '',
    timeframe: '',
    industry: '',
    workStyle: ''
  });

  const [careerPath, setCareerPath] = useState<CareerPath | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !careerData.skills.includes(newSkill.trim())) {
      setCareerData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setCareerData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !careerData.interests.includes(newInterest.trim())) {
      setCareerData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setCareerData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const generateCareerPath = async () => {
    if (!careerData.currentRole || !careerData.targetRole) {
      toast({ title: "Error", description: "Please fill in current and target roles", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = `Create a comprehensive career development plan for this professional:

Current Status:
- Role: ${careerData.currentRole}
- Experience: ${careerData.experience}
- Skills: ${careerData.skills.join(', ')}
- Interests: ${careerData.interests.join(', ')}

Career Goals:
- Target Role: ${careerData.targetRole}
- Timeframe: ${careerData.timeframe}
- Industry: ${careerData.industry}
- Work Style: ${careerData.workStyle}

Please provide a detailed career path in JSON format with these keys:
- milestones: array of 4-6 key career milestones with title, description, timeframe, difficulty
- skillGaps: array of 5-8 skills they need to develop with currentLevel (1-10), targetLevel (1-10), priority, resources
- timeline: array of 3-4 phases with phase name, duration, objectives, keyActions
- recommendations: array of 6-8 strategic recommendations
- resources: array of 8-10 learning resources with type, title, description, priority

Focus on practical, achievable steps that align with their goals and interests.`;

      const response = await generateWithOpenAI({
        prompt,
        temperature: 0.4,
        maxTokens: 2000
      });

      let parsedPath;
      try {
        parsedPath = JSON.parse(response);
      } catch {
        // Fallback if JSON parsing fails
        parsedPath = {
          milestones: [
            {
              title: "Skill Development Phase",
              description: "Focus on building core competencies for your target role",
              timeframe: "3-6 months",
              difficulty: "Medium"
            },
            {
              title: "Experience Building",
              description: "Gain relevant experience through projects or role transitions",
              timeframe: "6-12 months", 
              difficulty: "Medium"
            },
            {
              title: "Network Expansion",
              description: "Build professional relationships in your target industry",
              timeframe: "Ongoing",
              difficulty: "Easy"
            },
            {
              title: "Role Transition",
              description: "Secure position in your target role",
              timeframe: "12-18 months",
              difficulty: "Hard"
            }
          ],
          skillGaps: [
            {
              skill: "Leadership",
              currentLevel: 5,
              targetLevel: 8,
              priority: "High",
              resources: ["Leadership courses", "Management books", "Mentorship"]
            }
          ],
          timeline: [
            {
              phase: "Foundation Building",
              duration: "0-6 months",
              objectives: ["Skill assessment", "Learning plan creation"],
              keyActions: ["Take courses", "Build portfolio", "Network"]
            }
          ],
          recommendations: [
            "Focus on high-impact skills first",
            "Build a strong professional network",
            "Seek mentorship opportunities",
            "Create a portfolio of relevant work"
          ],
          resources: [
            {
              type: "Course",
              title: "Professional Development Course",
              description: "Build essential career skills",
              priority: "High"
            }
          ]
        };
      }

      setCareerPath(parsedPath);
      toast({ title: "Success", description: "Career path generated successfully!" });
    } catch (error) {
      console.error('Error generating career path:', error);
      toast({ title: "Error", description: "Failed to generate career path. Please try again.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <MapPin className="w-8 h-8 text-blue-600" />
          AI Career Path Planner
        </h1>
        <p className="text-muted-foreground">Get a personalized roadmap to achieve your career goals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Situation</CardTitle>
              <CardDescription>Tell us about your current role and experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Current Job Title"
                value={careerData.currentRole}
                onChange={(e) => setCareerData(prev => ({ ...prev, currentRole: e.target.value }))}
              />
              
              <Input
                placeholder="Years of Experience"
                value={careerData.experience}
                onChange={(e) => setCareerData(prev => ({ ...prev, experience: e.target.value }))}
              />

              <div className="grid grid-cols-2 gap-4">
                <Select value={careerData.industry} onValueChange={(value) => setCareerData(prev => ({ ...prev, industry: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={careerData.workStyle} onValueChange={(value) => setCareerData(prev => ({ ...prev, workStyle: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Work Style" />
                  </SelectTrigger>
                  <SelectContent>
                    {WORK_STYLES.map(style => (
                      <SelectItem key={style} value={style}>{style}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Career Goals</CardTitle>
              <CardDescription>Define where you want to be</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Target Job Title"
                value={careerData.targetRole}
                onChange={(e) => setCareerData(prev => ({ ...prev, targetRole: e.target.value }))}
              />
              
              <Select value={careerData.timeframe} onValueChange={(value) => setCareerData(prev => ({ ...prev, timeframe: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Timeframe to Achieve Goal" />
                </SelectTrigger>
                <SelectContent>
                  {TIMEFRAMES.map(timeframe => (
                    <SelectItem key={timeframe} value={timeframe}>{timeframe}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills & Interests</CardTitle>
              <CardDescription>Add your current skills and interests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Skills */}
              <div>
                <label className="text-sm font-medium mb-2 block">Current Skills</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {careerData.skills.map(skill => (
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
              </div>

              {/* Interests */}
              <div>
                <label className="text-sm font-medium mb-2 block">Interests & Passions</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add an interest..."
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                  />
                  <Button onClick={addInterest} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {careerData.interests.map(interest => (
                    <Badge key={interest} variant="outline" className="flex items-center gap-1">
                      {interest}
                      <button
                        onClick={() => removeInterest(interest)}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              onClick={generateCareerPath} 
              disabled={isGenerating}
              size="lg"
              className="px-8"
            >
              {isGenerating ? "Creating Your Path..." : "Generate Career Path"}
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {!careerPath ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Ready to Plan Your Future?</h3>
                <p className="text-muted-foreground">
                  Fill out your information to get a personalized career development roadmap.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Milestones */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Career Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {careerPath.milestones.map((milestone, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{milestone.title}</h4>
                          <div className="flex gap-2">
                            <Badge className={getDifficultyColor(milestone.difficulty)}>
                              {milestone.difficulty}
                            </Badge>
                            <Badge variant="outline">
                              <Clock className="w-3 h-3 mr-1" />
                              {milestone.timeframe}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skill Gaps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Skill Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {careerPath.skillGaps.map((gap, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{gap.skill}</h4>
                          <Badge className={getPriorityColor(gap.priority)}>
                            {gap.priority} Priority
                          </Badge>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Current: {gap.currentLevel}/10</span>
                            <span>Target: {gap.targetLevel}/10</span>
                          </div>
                          <Progress value={(gap.currentLevel / 10) * 100} className="h-2" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <strong>Resources:</strong> {gap.resources.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Development Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {careerPath.timeline.map((phase, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{phase.phase}</h4>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Objectives:</strong>
                            <ul className="list-disc list-inside mt-1 text-muted-foreground">
                              {phase.objectives.map((obj, idx) => (
                                <li key={idx}>{obj}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>Key Actions:</strong>
                            <ul className="list-disc list-inside mt-1 text-muted-foreground">
                              {phase.keyActions.map((action, idx) => (
                                <li key={idx}>{action}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Recommended Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {careerPath.resources.map((resource, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="secondary">{resource.type}</Badge>
                          <Badge variant="outline" className={getPriorityColor(resource.priority)}>
                            {resource.priority}
                          </Badge>
                        </div>
                        <h5 className="font-medium text-sm">{resource.title}</h5>
                        <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Strategic Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Strategic Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {careerPath.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};