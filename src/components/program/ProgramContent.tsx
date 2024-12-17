import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface ProgramContentProps {
  duration: string;
  skills: string[];
  title: string;
}

export const ProgramContent = ({ duration, skills, title }: ProgramContentProps) => {
  return (
    <CardContent className="space-y-4 p-6 flex-grow">
      <div>
        <p className="text-sm text-gray-600 mb-3">Duration: {duration}</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs font-medium bg-white/50 hover:bg-primary/5 transition-colors"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      {title === "ManyChat Automation" && (
        <div className="text-sm text-gray-600 mt-2 p-3 bg-purple-50 rounded-md">
          <p>Note: You need to sign up for a ManyChat account separately. Use our partner link to get started:</p>
          <a 
            href="https://manychat.partnerlinks.io/ezwv4iv4rwb5" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-700 flex items-center gap-1 mt-1"
          >
            Sign up for ManyChat <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </CardContent>
  );
};