import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Download, FileText, Sparkles, Plus, Trash2 } from "lucide-react";
import { generateWithGemini } from "@/utils/geminiService";
import { toast } from "sonner";

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  template: string;
}

const TEMPLATES = [
  { id: 'tech', name: 'Software Developer', color: 'bg-blue-50 border-blue-200' },
  { id: 'marketing', name: 'Digital Marketing', color: 'bg-green-50 border-green-200' },
  { id: 'finance', name: 'Finance Professional', color: 'bg-purple-50 border-purple-200' },
  { id: 'design', name: 'UI/UX Designer', color: 'bg-pink-50 border-pink-200' },
  { id: 'management', name: 'Project Manager', color: 'bg-orange-50 border-orange-200' },
  { id: 'sales', name: 'Sales Executive', color: 'bg-cyan-50 border-cyan-200' }
];

export const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    experiences: [],
    education: [],
    skills: [],
    template: ''
  });

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      duration: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      year: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const optimizeWithAI = async () => {
    if (!resumeData.template) {
      toast.error("Please select a template first");
      return;
    }

    setIsOptimizing(true);
    try {
      const template = TEMPLATES.find(t => t.id === resumeData.template);
      const prompt = `Optimize this resume for a ${template?.name} position. Improve the summary, experience descriptions, and suggest relevant skills. Make it ATS-friendly and impactful.

Current Resume Data:
Name: ${resumeData.personalInfo.name}
Summary: ${resumeData.summary}
Experience: ${resumeData.experiences.map(exp => `${exp.title} at ${exp.company}: ${exp.description}`).join('\n')}
Skills: ${resumeData.skills.join(', ')}

Please provide:
1. Optimized summary (max 150 words)
2. Improved experience descriptions
3. Additional relevant skills for ${template?.name}

Format as JSON with keys: summary, experiences (array), additionalSkills (array)`;

      const response = await generateWithGemini({ prompt, temperature: 0.3 });
      
      try {
        const optimizations = JSON.parse(response);
        
        setResumeData(prev => ({
          ...prev,
          summary: optimizations.summary || prev.summary,
          skills: [...prev.skills, ...(optimizations.additionalSkills || [])].filter((skill, index, arr) => arr.indexOf(skill) === index)
        }));

        if (optimizations.experiences && Array.isArray(optimizations.experiences)) {
          setResumeData(prev => ({
            ...prev,
            experiences: prev.experiences.map((exp, index) => ({
              ...exp,
              description: optimizations.experiences[index] || exp.description
            }))
          }));
        }

        toast.success("Resume optimized successfully!");
      } catch (parseError) {
        // If JSON parsing fails, treat as plain text improvements
        setResumeData(prev => ({
          ...prev,
          summary: response.substring(0, 500) // Use first part as summary
        }));
        toast.success("Resume improvements applied!");
      }
    } catch (error) {
      console.error('Error optimizing resume:', error);
      toast.error("Failed to optimize resume. Please try again.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const downloadResume = () => {
    // Create a simple HTML version for download
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${resumeData.personalInfo.name} - Resume</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #333; margin-bottom: 5px; }
          h2 { color: #666; border-bottom: 2px solid #ccc; padding-bottom: 5px; }
          .contact { margin-bottom: 20px; }
          .section { margin-bottom: 25px; }
          .experience, .education { margin-bottom: 15px; }
          .skills { display: flex; flex-wrap: wrap; gap: 10px; }
          .skill { background: #f0f0f0; padding: 5px 10px; border-radius: 15px; }
        </style>
      </head>
      <body>
        <h1>${resumeData.personalInfo.name}</h1>
        <div class="contact">
          <p>${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}</p>
          <p>${resumeData.personalInfo.location}</p>
          ${resumeData.personalInfo.linkedin ? `<p>LinkedIn: ${resumeData.personalInfo.linkedin}</p>` : ''}
          ${resumeData.personalInfo.github ? `<p>GitHub: ${resumeData.personalInfo.github}</p>` : ''}
        </div>
        
        ${resumeData.summary ? `
        <div class="section">
          <h2>Professional Summary</h2>
          <p>${resumeData.summary}</p>
        </div>
        ` : ''}
        
        ${resumeData.experiences.length > 0 ? `
        <div class="section">
          <h2>Experience</h2>
          ${resumeData.experiences.map(exp => `
            <div class="experience">
              <h3>${exp.title} - ${exp.company}</h3>
              <p><em>${exp.duration}</em></p>
              <p>${exp.description}</p>
            </div>
          `).join('')}
        </div>
        ` : ''}
        
        ${resumeData.education.length > 0 ? `
        <div class="section">
          <h2>Education</h2>
          ${resumeData.education.map(edu => `
            <div class="education">
              <h3>${edu.degree}</h3>
              <p>${edu.institution} - ${edu.year}</p>
            </div>
          `).join('')}
        </div>
        ` : ''}
        
        ${resumeData.skills.length > 0 ? `
        <div class="section">
          <h2>Skills</h2>
          <div class="skills">
            ${resumeData.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
          </div>
        </div>
        ` : ''}
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.name || 'resume'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Resume downloaded successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">AI-Powered Resume Builder</h1>
        <p className="text-muted-foreground">Create professional resumes with industry-specific templates and AI optimization</p>
      </div>

      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Choose Template
          </CardTitle>
          <CardDescription>Select an industry-specific template for your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEMPLATES.map(template => (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all ${template.color} ${
                  resumeData.template === template.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setResumeData(prev => ({ ...prev, template: template.id }))}
              >
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">{template.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              value={resumeData.personalInfo.name}
              onChange={(e) => setResumeData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, name: e.target.value }
              }))}
            />
            <Input
              placeholder="Email"
              type="email"
              value={resumeData.personalInfo.email}
              onChange={(e) => setResumeData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, email: e.target.value }
              }))}
            />
            <Input
              placeholder="Phone"
              value={resumeData.personalInfo.phone}
              onChange={(e) => setResumeData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, phone: e.target.value }
              }))}
            />
            <Input
              placeholder="Location"
              value={resumeData.personalInfo.location}
              onChange={(e) => setResumeData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, location: e.target.value }
              }))}
            />
            <Input
              placeholder="LinkedIn URL"
              value={resumeData.personalInfo.linkedin}
              onChange={(e) => setResumeData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
              }))}
            />
            <Input
              placeholder="GitHub URL"
              value={resumeData.personalInfo.github}
              onChange={(e) => setResumeData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, github: e.target.value }
              }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Write a brief professional summary..."
            value={resumeData.summary}
            onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Experience
            <Button onClick={addExperience} size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Experience
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeData.experiences.map((exp, index) => (
            <div key={exp.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Experience {index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                />
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                />
                <Input
                  placeholder="Duration (e.g., Jan 2020 - Present)"
                  value={exp.duration}
                  onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                  className="md:col-span-2"
                />
              </div>
              <Textarea
                placeholder="Describe your responsibilities and achievements..."
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                rows={3}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Education
            <Button onClick={addEducation} size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Education
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Education {index + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                />
                <Input
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                />
                <Input
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
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
            {resumeData.skills.map(skill => (
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

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={optimizeWithAI}
          disabled={isOptimizing || !resumeData.template}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          {isOptimizing ? "Optimizing..." : "AI Optimize"}
        </Button>
        <Button 
          onClick={downloadResume}
          variant="outline"
          disabled={!resumeData.personalInfo.name}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Resume
        </Button>
      </div>
    </div>
  );
};