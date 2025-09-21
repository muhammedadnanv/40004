import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { BarChart, TrendingUp, Target, BookOpen, Clock, AlertTriangle } from "lucide-react";
import { generateWithOpenAI } from "@/utils/openaiService";
import { useToast } from "@/hooks/use-toast";

interface Skill {
  name: string;
  currentLevel: number;
  requiredLevel: number;
  importance: 'Critical' | 'Important' | 'Nice to Have';
}

interface SkillAnalysis {
  overallScore: number;
  criticalGaps: Skill[];
  strengths: Skill[];
  learningPlan: LearningRecommendation[];
  industryBenchmark: number;
  timeToTarget: string;
}

interface LearningRecommendation {
  skill: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedTime: string;
  resources: Resource[];
  milestones: string[];
}

interface Resource {
  type: 'Course' | 'Book' | 'Practice' | 'Certification' | 'Mentor';
  title: string;
  provider: string;
  duration: string;
  cost: 'Free' | 'Paid' | 'Premium';
}

const ROLES = [
  'Software Engineer', 'Data Scientist', 'Product Manager', 'UI/UX Designer',
  'Marketing Manager', 'Sales Representative', 'Project Manager', 'DevOps Engineer',
  'Business Analyst', 'Consultant', 'Financial Analyst', 'HR Manager'
];

const EXPERIENCE_LEVELS = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive Level'];

export const SkillsGapAnalyzer = () => {
  const { toast } = useToast();
  const [targetRole, setTargetRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkillName, setNewSkillName] = useState('');
  const [analysis, setAnalysis] = useState<SkillAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const addSkill = () => {
    if (newSkillName.trim() && !skills.find(s => s.name === newSkillName.trim())) {
      setSkills(prev => [...prev, {
        name: newSkillName.trim(),
        currentLevel: 5,
        requiredLevel: 8,
        importance: 'Important'
      }]);
      setNewSkillName('');
    }
  };

  const removeSkill = (skillName: string) => {
    setSkills(prev => prev.filter(s => s.name !== skillName));
  };

  const updateSkill = (skillName: string, field: keyof Skill, value: any) => {
    setSkills(prev => prev.map(skill => 
      skill.name === skillName ? { ...skill, [field]: value } : skill
    ));
  };

  const analyzeSkillGaps = async () => {
    if (!targetRole || skills.length === 0) {
      toast({ title: "Error", description: "Please select a role and add at least one skill", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    try {
      const skillsData = skills.map(skill => 
        `${skill.name}: Current ${skill.currentLevel}/10, Required ${skill.requiredLevel}/10, Importance: ${skill.importance}`
      ).join('\n');

      const prompt = `Analyze the skill gaps for a ${experienceLevel} ${targetRole} position:

Current Skills Assessment:
${skillsData}

Please provide a comprehensive analysis in JSON format with these keys:
- overallScore: overall readiness score (0-100)
- criticalGaps: array of skills with large gaps (name, currentLevel, requiredLevel, importance)
- strengths: array of skills where they excel
- learningPlan: array of recommendations with skill, priority, estimatedTime, resources (type, title, provider, duration, cost), milestones
- industryBenchmark: average score for this role (0-100)
- timeToTarget: estimated time to reach target competency

Focus on practical learning paths and realistic timelines.`;

      const response = await generateWithOpenAI({
        prompt,
        temperature: 0.3,
        maxTokens: 2000
      });

      let parsedAnalysis;
      try {
        parsedAnalysis = JSON.parse(response);
      } catch {
        // Fallback if JSON parsing fails
        const criticalGaps = skills.filter(skill => skill.requiredLevel - skill.currentLevel >= 3);
        const strengths = skills.filter(skill => skill.currentLevel >= skill.requiredLevel);
        
        parsedAnalysis = {
          overallScore: Math.max(10, Math.min(90, 100 - (criticalGaps.length * 15))),
          criticalGaps,
          strengths,
          learningPlan: criticalGaps.map(skill => ({
            skill: skill.name,
            priority: skill.importance === 'Critical' ? 'High' : 'Medium',
            estimatedTime: '2-3 months',
            resources: [
              {
                type: 'Course',
                title: `${skill.name} Fundamentals`,
                provider: 'Online Learning Platform',
                duration: '4-6 weeks',
                cost: 'Paid'
              }
            ],
            milestones: ['Complete basic concepts', 'Build practice project', 'Apply in real scenario']
          })),
          industryBenchmark: 75,
          timeToTarget: '6-12 months'
        };
      }

      setAnalysis(parsedAnalysis);
      toast({ title: "Success", description: "Skill gap analysis completed!" });
    } catch (error) {
      console.error('Error analyzing skills:', error);
      toast({ title: "Error", description: "Failed to analyze skills. Please try again.", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getGapColor = (gap: number) => {
    if (gap <= 1) return 'text-green-600';
    if (gap <= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Important': return 'bg-yellow-100 text-yellow-800';
      case 'Nice to Have': return 'bg-green-100 text-green-800';
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
          <BarChart className="w-8 h-8 text-purple-600" />
          AI Skills Gap Analyzer
        </h1>
        <p className="text-muted-foreground">Identify skill gaps and get personalized learning recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Target Role & Level</CardTitle>
              <CardDescription>Define the position you're aiming for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={targetRole} onValueChange={setTargetRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Target Role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  {EXPERIENCE_LEVELS.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills Assessment</CardTitle>
              <CardDescription>Add skills and rate your current vs required levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g., JavaScript, Leadership, Excel)..."
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button onClick={addSkill}>Add Skill</Button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{skill.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={getImportanceColor(skill.importance)}>
                          {skill.importance}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(skill.name)}
                        >
                          ×
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Level: {skill.currentLevel}/10</label>
                      <Slider
                        value={[skill.currentLevel]}
                        onValueChange={(value) => updateSkill(skill.name, 'currentLevel', value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Required Level: {skill.requiredLevel}/10</label>
                      <Slider
                        value={[skill.requiredLevel]}
                        onValueChange={(value) => updateSkill(skill.name, 'requiredLevel', value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Importance</label>
                      <Select
                        value={skill.importance}
                        onValueChange={(value: 'Critical' | 'Important' | 'Nice to Have') => 
                          updateSkill(skill.name, 'importance', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Critical">Critical</SelectItem>
                          <SelectItem value="Important">Important</SelectItem>
                          <SelectItem value="Nice to Have">Nice to Have</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Gap: 
                        <span className={`font-medium ml-1 ${getGapColor(skill.requiredLevel - skill.currentLevel)}`}>
                          {skill.requiredLevel - skill.currentLevel} points
                        </span>
                      </span>
                      <Progress 
                        value={(skill.currentLevel / skill.requiredLevel) * 100} 
                        className="w-20 h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              onClick={analyzeSkillGaps} 
              disabled={isAnalyzing}
              size="lg"
              className="px-8"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Skill Gaps"}
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {!analysis ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Ready for Analysis?</h3>
                <p className="text-muted-foreground">
                  Add your skills and target role to get a comprehensive skill gap analysis and learning plan.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Overall Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Readiness Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold mb-2">{analysis.overallScore}/100</div>
                    <p className="text-muted-foreground">Current Readiness for {targetRole}</p>
                  </div>
                  <Progress value={analysis.overallScore} className="h-3 mb-4" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium">Industry Benchmark</div>
                      <div className="text-2xl font-bold text-muted-foreground">{analysis.industryBenchmark}/100</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">Time to Target</div>
                      <div className="text-2xl font-bold text-primary">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {analysis.timeToTarget}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Critical Gaps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Critical Skill Gaps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysis.criticalGaps.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">
                      Great! No critical skill gaps identified.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {analysis.criticalGaps.map((skill, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div>
                            <h4 className="font-medium">{skill.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Current: {skill.currentLevel}/10 → Target: {skill.requiredLevel}/10
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className={getImportanceColor(skill.importance)}>
                              {skill.importance}
                            </Badge>
                            <div className="text-sm font-medium text-red-600 mt-1">
                              Gap: {skill.requiredLevel - skill.currentLevel}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-500" />
                    Your Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysis.strengths.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">
                      Keep building your skills to develop strengths.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {analysis.strengths.map((skill, index) => (
                        <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="font-medium text-green-800">{skill.name}</h4>
                          <p className="text-sm text-green-600">
                            {skill.currentLevel}/10 (Target: {skill.requiredLevel}/10)
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Learning Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Personalized Learning Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.learningPlan.map((plan, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">{plan.skill}</h4>
                          <div className="flex gap-2">
                            <Badge className={getPriorityColor(plan.priority)}>
                              {plan.priority} Priority
                            </Badge>
                            <Badge variant="outline">
                              <Clock className="w-3 h-3 mr-1" />
                              {plan.estimatedTime}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-sm mb-2">Learning Resources</h5>
                            <div className="space-y-2">
                              {plan.resources.map((resource, idx) => (
                                <div key={idx} className="text-sm p-2 bg-muted rounded">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">{resource.title}</span>
                                    <Badge variant="outline">{resource.cost}</Badge>
                                  </div>
                                  <div className="text-muted-foreground">
                                    {resource.provider} • {resource.duration}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h5 className="font-medium text-sm mb-2">Learning Milestones</h5>
                            <ul className="space-y-1">
                              {plan.milestones.map((milestone, idx) => (
                                <li key={idx} className="text-sm flex items-start gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                                  {milestone}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
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