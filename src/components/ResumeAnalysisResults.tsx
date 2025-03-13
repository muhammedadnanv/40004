
import React from "react";
import { FileText, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface ResumeAnalysisResultsProps {
  isATSFriendly: boolean;
  score: number;
  recommendations: string[];
}

export const ResumeAnalysisResults = ({ 
  isATSFriendly, 
  score, 
  recommendations 
}: ResumeAnalysisResultsProps) => {
  // Categorize recommendations
  const criticalIssues = recommendations.filter(rec => 
    rec.toLowerCase().includes("remove") || 
    rec.toLowerCase().includes("error") ||
    rec.toLowerCase().includes("invalid")
  );
  
  const majorIssues = recommendations.filter(rec => 
    rec.toLowerCase().includes("add") || 
    rec.toLowerCase().includes("include") ||
    rec.toLowerCase().includes("missing")
  );
  
  const minorIssues = recommendations.filter(rec => 
    !criticalIssues.includes(rec) && !majorIssues.includes(rec)
  );
  
  const getScoreColor = () => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  };
  
  const getProgressColor = () => {
    if (score >= 85) return "bg-green-600";
    if (score >= 70) return "bg-amber-600";
    return "bg-red-600";
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-md space-y-4">
      <h4 className="font-medium flex items-center text-base">
        <FileText className="w-5 h-5 mr-2" /> 
        NLP-Enhanced Resume Analysis
      </h4>
      
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span>ATS-Compatibility Score</span>
          <span className={`font-medium ${getScoreColor()}`}>{score}%</span>
        </div>
        <Progress value={score} className={`h-2 ${getProgressColor()}`} />
      </div>
      
      <div className="flex items-center gap-2 my-2">
        <span className="text-sm font-medium">Status:</span>
        {isATSFriendly ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-3.5 h-3.5 mr-1" />
            ATS-Friendly
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertTriangle className="w-3.5 h-3.5 mr-1" />
            Needs Improvement
          </Badge>
        )}
      </div>
      
      {recommendations.length > 0 && (
        <div>
          <h5 className="text-sm font-medium mb-2 flex items-center">
            <Info className="w-4 h-4 mr-1" /> Detailed Analysis:
          </h5>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Priority</TableHead>
                <TableHead>Recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criticalIssues.map((rec, index) => (
                <TableRow key={`critical-${index}`}>
                  <TableCell>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>
                  </TableCell>
                  <TableCell>{rec}</TableCell>
                </TableRow>
              ))}
              {majorIssues.map((rec, index) => (
                <TableRow key={`major-${index}`}>
                  <TableCell>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Important</Badge>
                  </TableCell>
                  <TableCell>{rec}</TableCell>
                </TableRow>
              ))}
              {minorIssues.map((rec, index) => (
                <TableRow key={`minor-${index}`}>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Suggestion</Badge>
                  </TableCell>
                  <TableCell>{rec}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
