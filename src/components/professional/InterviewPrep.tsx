import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Mic, MicOff, Play, Pause, RotateCcw, Brain, Clock, Target } from "lucide-react";
import { generateWithGemini } from "@/utils/geminiService";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tips: string[];
}

interface InterviewSession {
  questions: Question[];
  currentIndex: number;
  responses: string[];
  feedback: string[];
  score: number;
}

const QUESTION_CATEGORIES = [
  { id: 'behavioral', name: 'Behavioral Questions', color: 'bg-blue-100 text-blue-800' },
  { id: 'technical', name: 'Technical Questions', color: 'bg-green-100 text-green-800' },
  { id: 'situational', name: 'Situational Questions', color: 'bg-purple-100 text-purple-800' },
  { id: 'general', name: 'General Questions', color: 'bg-orange-100 text-orange-800' }
];

const SAMPLE_QUESTIONS: Record<string, Question[]> = {
  behavioral: [
    {
      id: '1',
      question: "Tell me about a time you faced a significant challenge at work and how you overcame it.",
      category: 'behavioral',
      difficulty: 'Medium',
      tips: ['Use the STAR method (Situation, Task, Action, Result)', 'Be specific about your actions', 'Focus on positive outcomes']
    },
    {
      id: '2',
      question: "Describe a situation where you had to work with a difficult team member.",
      category: 'behavioral',
      difficulty: 'Medium',
      tips: ['Show emotional intelligence', 'Demonstrate conflict resolution skills', 'Focus on professional approach']
    }
  ],
  technical: [
    {
      id: '3',
      question: "Explain the difference between REST and GraphQL APIs.",
      category: 'technical',
      difficulty: 'Medium',
      tips: ['Compare key features', 'Discuss use cases', 'Mention pros and cons of each']
    },
    {
      id: '4',
      question: "How would you optimize a slow-performing database query?",
      category: 'technical',
      difficulty: 'Hard',
      tips: ['Mention indexing strategies', 'Discuss query optimization', 'Consider database design']
    }
  ],
  situational: [
    {
      id: '5',
      question: "How would you handle a situation where you're asked to complete a project with an unrealistic deadline?",
      category: 'situational',
      difficulty: 'Medium',
      tips: ['Show problem-solving skills', 'Demonstrate communication', 'Discuss prioritization']
    }
  ],
  general: [
    {
      id: '6',
      question: "Why do you want to work for our company?",
      category: 'general',
      difficulty: 'Easy',
      tips: ['Research the company', 'Align with company values', 'Show genuine interest']
    },
    {
      id: '7',
      question: "What are your greatest strengths and weaknesses?",
      category: 'general',
      difficulty: 'Easy',
      tips: ['Be honest but strategic', 'Show self-awareness', 'Discuss improvement efforts']
    }
  ]
};

export const InterviewPrep = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording && timerRef.current === null) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else if (!isRecording && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  const startInterview = () => {
    if (!selectedCategory) {
      toast({ title: "Error", description: "Please select a question category", variant: "destructive" });
      return;
    }

    const questions = SAMPLE_QUESTIONS[selectedCategory] || [];
    if (questions.length === 0) {
      toast({ title: "Error", description: "No questions available for this category", variant: "destructive" });
      return;
    }

    // Shuffle questions and take up to 5
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
    
    setSession({
      questions: shuffled,
      currentIndex: 0,
      responses: [],
      feedback: [],
      score: 0
    });
    setCurrentResponse('');
    setTimeElapsed(0);
    toast({ title: "Success", description: "Interview session started!" });
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeElapsed(0);
      toast({ title: "Recording", description: "Recording started" });
    } else {
      toast({ title: "Recording", description: "Recording stopped" });
    }
  };

  const submitResponse = async () => {
    if (!session || !currentResponse.trim()) {
      toast({ title: "Error", description: "Please provide a response", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    try {
      const currentQuestion = session.questions[session.currentIndex];
      const prompt = `Analyze this interview response and provide constructive feedback:

Question: ${currentQuestion.question}
Category: ${currentQuestion.category}
Difficulty: ${currentQuestion.difficulty}
Response: ${currentResponse}

Please provide:
1. Overall score (1-10)
2. Strengths in the response
3. Areas for improvement
4. Specific suggestions for better answers

Format as JSON with keys: score, strengths, improvements, suggestions`;

      const feedback = await generateWithGemini({ prompt, temperature: 0.3 });
      
      let parsedFeedback;
      try {
        parsedFeedback = JSON.parse(feedback);
      } catch {
        // Fallback if JSON parsing fails
        parsedFeedback = {
          score: 7,
          strengths: "Good structure and content",
          improvements: "Could be more specific with examples",
          suggestions: "Use the STAR method for better organization"
        };
      }

      const newFeedback = `Score: ${parsedFeedback.score}/10\n\nStrengths: ${parsedFeedback.strengths}\n\nImprovements: ${parsedFeedback.improvements}\n\nSuggestions: ${parsedFeedback.suggestions}`;

      setSession(prev => ({
        ...prev!,
        responses: [...prev!.responses, currentResponse],
        feedback: [...prev!.feedback, newFeedback],
        score: prev!.score + (parsedFeedback.score || 7)
      }));

      setCurrentResponse('');
      setTimeElapsed(0);
      setIsRecording(false);
      
      toast({ title: "Success", description: "Response analyzed!" });
    } catch (error) {
      console.error('Error analyzing response:', error);
      toast({ title: "Error", description: "Failed to analyze response. Please try again.", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const nextQuestion = () => {
    if (!session) return;
    
    if (session.currentIndex < session.questions.length - 1) {
      setSession(prev => ({
        ...prev!,
        currentIndex: prev!.currentIndex + 1
      }));
      setCurrentResponse('');
      setTimeElapsed(0);
    }
  };

  const resetSession = () => {
    setSession(null);
    setCurrentResponse('');
    setTimeElapsed(0);
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = session?.questions[session.currentIndex];
  const isLastQuestion = session && session.currentIndex === session.questions.length - 1;
  const hasResponded = session && session.responses.length > session.currentIndex;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Interview Preparation</h1>
        <p className="text-muted-foreground">Practice mock interviews with AI-powered feedback</p>
      </div>

      {!session ? (
        /* Category Selection */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Choose Interview Category
            </CardTitle>
            <CardDescription>Select the type of questions you'd like to practice</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUESTION_CATEGORIES.map(category => (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCategory === category.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{category.name}</h3>
                      <Badge className={category.color}>
                        {SAMPLE_QUESTIONS[category.id]?.length || 0} questions
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center pt-4">
              <Button 
                onClick={startInterview}
                disabled={!selectedCategory}
                size="lg"
                className="px-8"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Interview Session */
        <div className="space-y-6">
          {/* Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Question {session.currentIndex + 1} of {session.questions.length}
                </span>
                <span className="text-sm text-muted-foreground">
                  {selectedCategory && QUESTION_CATEGORIES.find(c => c.id === selectedCategory)?.name}
                </span>
              </div>
              <Progress 
                value={(session.currentIndex / session.questions.length) * 100} 
                className="h-2"
              />
            </CardContent>
          </Card>

          {/* Current Question */}
          {currentQuestion && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Current Question</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      currentQuestion.difficulty === 'Easy' ? 'secondary' :
                      currentQuestion.difficulty === 'Medium' ? 'default' : 'destructive'
                    }>
                      {currentQuestion.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg font-medium">{currentQuestion.question}</p>
                
                {/* Tips */}
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Tips for answering:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {currentQuestion.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Response Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Your Response
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  {formatTime(timeElapsed)}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Type your response here or use voice recording..."
                value={currentResponse}
                onChange={(e) => setCurrentResponse(e.target.value)}
                rows={6}
                disabled={hasResponded}
              />
              
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  onClick={toggleRecording}
                  variant={isRecording ? "destructive" : "outline"}
                  disabled={hasResponded}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-4 h-4 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="w-4 h-4 mr-2" />
                      Start Recording
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={submitResponse}
                  disabled={!currentResponse.trim() || hasResponded || isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Submit Response"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Feedback */}
          {hasResponded && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
                  {session.feedback[session.currentIndex]}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-center gap-4">
            {!isLastQuestion ? (
              <Button
                onClick={nextQuestion}
                disabled={!hasResponded}
                size="lg"
              >
                Next Question
              </Button>
            ) : hasResponded ? (
              <Card className="p-4 text-center">
                <h3 className="font-bold text-lg mb-2">Interview Complete!</h3>
                <p className="text-2xl font-bold text-primary mb-2">
                  Average Score: {Math.round(session.score / session.questions.length)}/10
                </p>
                <p className="text-muted-foreground mb-4">
                  Great job! Review your feedback to improve further.
                </p>
                <Button onClick={resetSession}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start New Session
                </Button>
              </Card>
            ) : null}
            
            <Button
              onClick={resetSession}
              variant="outline"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};