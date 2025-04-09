import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";
import { seoOptimizer } from "@/utils/seoOptimizer";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StructuredDataManagerProps {
  pageType?: string;
  pageData?: Record<string, any>;
}

export const StructuredDataManager = ({ 
  pageType = "WebPage", 
  pageData = {} 
}: StructuredDataManagerProps) => {
  const [activeSchemaType, setActiveSchemaType] = useState(pageType);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [activeTab, setActiveTab] = useState("visual");
  
  const schemaTypes = [
    "WebPage",
    "Article",
    "Product",
    "Course",
    "Organization",
    "Event",
    "FAQ",
    "HowTo"
  ];
  
  const generateStructuredData = async () => {
    setIsGenerating(true);
    setStatus("idle");
    
    try {
      const result = await seoOptimizer.implementSchemaMarkup(activeSchemaType, pageData);
      
      if (result.success) {
        setStatus("success");
        toast({
          title: "Schema Generated",
          description: `${activeSchemaType} schema has been added to the page.`,
        });
      } else {
        throw new Error(result.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error generating schema:", error);
      setStatus("error");
      toast({
        title: "Schema Error",
        description: error instanceof Error ? error.message : "Failed to generate schema markup",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Structured Data Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1">
              <Select
                value={activeSchemaType}
                onValueChange={setActiveSchemaType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select schema type" />
                </SelectTrigger>
                <SelectContent>
                  {schemaTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={generateStructuredData} 
              disabled={isGenerating}
              className="whitespace-nowrap"
            >
              {isGenerating ? "Generating..." : "Generate Schema"}
            </Button>
          </div>
          
          {status === "success" && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded">
              <CheckCircle className="h-4 w-4" />
              <span>Schema markup successfully generated</span>
            </div>
          )}
          
          {status === "error" && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
              <AlertCircle className="h-4 w-4" />
              <span>Failed to generate schema markup</span>
            </div>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="visual">Visual Editor</TabsTrigger>
              <TabsTrigger value="code">JSON-LD</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visual" className="pt-4">
              <div className="border rounded p-3 min-h-[150px] bg-gray-50 text-sm">
                <p className="text-gray-500 italic">
                  {status === "success" 
                    ? `${activeSchemaType} schema properties will be displayed here` 
                    : "Generate schema to see visual representation"}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="code" className="pt-4">
              <pre className="border rounded p-3 text-xs overflow-x-auto bg-gray-50 min-h-[150px]">
                {status === "success" 
                  ? `{\n  "@context": "https://schema.org",\n  "@type": "${activeSchemaType}",\n  /* Schema properties will be generated here */\n}` 
                  : "// Schema JSON will appear here after generation"}
              </pre>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};
