import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { showRandomJoinNotification } from "@/utils/mockNotifications";

const IndexPage = () => {
  useEffect(() => {
    showRandomJoinNotification();
    
    const interval = setInterval(() => {
      showRandomJoinNotification();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const programs = [
    {
      title: "AI Prompt Engineering Mastery",
      description: "Master the art of crafting powerful AI prompts",
      duration: "4 Weeks",
      skills: ["Prompt Design", "AI Systems", "NLP"],
      category: "AI Development",
      fee: 99
    },
    {
      title: "AI + Supabase Integration",
      description: "Learn to integrate AI with Supabase",
      duration: "6 Weeks",
      skills: ["AI", "Supabase", "Database"],
      category: "Full Stack AI",
      fee: 129
    },
    {
      title: "No-Code Development",
      description: "Build applications without coding",
      duration: "3 Weeks",
      skills: ["No-Code", "Automation", "Design"],
      category: "Low-Code Development",
      fee: 79
    },
    {
      title: "Frontend Development with Low-Code",
      description: "Create UIs efficiently with low-code tools",
      duration: "5 Weeks",
      skills: ["Frontend", "Low-Code", "UI/UX"],
      category: "Low-Code Development",
      fee: 99
    }
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4">
      <h1 className="text-2xl font-bold text-center my-8">Welcome to AI Learning Paths</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program, index) => (
          <motion.div
            key={program.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group"
          >
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-light">{program.title}</CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    className="text-sm font-medium"
                  >
                    ₹{program.fee}
                  </Button>
                  <span className="text-sm text-gray-600">Duration: {program.duration}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {program.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
