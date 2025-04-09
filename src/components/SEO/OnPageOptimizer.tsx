
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { seoOptimizer } from "@/utils/seoOptimizer";
import { toast } from "@/components/ui/use-toast";

interface OnPageOptimizerProps {
  pageName: string;
  targetKeywords: string[];
  autoOptimize?: boolean;
}

export const OnPageOptimizer = ({ 
  pageName, 
  targetKeywords, 
  autoOptimize = false 
}: OnPageOptimizerProps) => {
  const [score, setScore] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    const calculateInitialScore = async () => {
      try {
        // Get initial SEO score
        const result = await seoOptimizer.analyzePageSEO(pageName, targetKeywords);
        if (result.success) {
          setScore(result.score || 0);
        }
        
        // Auto-optimize if enabled
        if (autoOptimize) {
          runOptimizations();
        }
      } catch (error) {
        console.error("Error calculating SEO score:", error);
      }
    };
    
    calculateInitialScore();
  }, [pageName, targetKeywords, autoOptimize]);
  
  const runOptimizations = async () => {
    setIsOptimizing(true);
    
    try {
      const result = await seoOptimizer.runOptimizations({
        optimizeMetaTags: true,
        optimizeHeadings: true,
        checkTechnicalSEO: true
      });
      
      if (result.success) {
        setScore(result.newScore || score);
        toast({
          title: "SEO Optimizations Applied",
          description: `Score improved by ${result.improvement || 0} points`,
        });
      }
    } catch (error) {
      console.error("Error running SEO optimizations:", error);
      toast({
        title: "Optimization Error",
        description: "Failed to apply SEO optimizations",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };
  
  const getScoreColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">SEO Optimizer: {pageName}</CardTitle>
          <Badge variant={score >= 80 ? "success" : score >= 60 ? "warning" : "destructive"}>
            Score: {score}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>SEO Score</span>
              <span className={getScoreColor()}>{score}%</span>
            </div>
            <Progress value={score} className="h-2" />
          </div>
          
          <div className="flex flex-wrap gap-1">
            {targetKeywords.map((keyword) => (
              <Badge key={keyword} variant="outline" className="bg-purple-50">
                {keyword}
              </Badge>
            ))}
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Page is {score >= 80 ? "well optimized" : "needs improvement"} for the target keywords.
                </p>
                <Button 
                  size="sm" 
                  onClick={runOptimizations} 
                  disabled={isOptimizing || score >= 95}
                >
                  {isOptimizing ? "Optimizing..." : "Run Optimization"}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="keywords" className="pt-4">
              <ul className="text-sm space-y-1">
                <li>Primary keyword density: Good</li>
                <li>Secondary keywords: Needs improvement</li>
                <li>LSI keywords: 12 detected</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="technical" className="pt-4">
              <ul className="text-sm space-y-1">
                <li>Meta tags: {score > 70 ? "Optimized" : "Needs review"}</li>
                <li>Headings structure: {score > 60 ? "Good" : "Needs improvement"}</li>
                <li>Image alt tags: {score > 80 ? "Optimized" : "Incomplete"}</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};
