
import { motion } from "framer-motion";
import { Code, Database, Palette, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const LearningPathSection = () => {
  const paths = [
    {
      icon: Sparkles,
      title: "AI Development",
      description: "Build AI projects with expert mentorship",
      skills: ["Prompt Design", "AI Systems", "NLP", "Integration"],
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Database,
      title: "Full Stack AI",
      description: "Create AI apps with mentor guidance",
      skills: ["Supabase", "APIs", "Databases", "AI Integration"],
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Code,
      title: "Frontend Development",
      description: "Build real frontend projects with mentors",
      skills: ["React", "TypeScript", "UI/UX", "Performance"],
      color: "from-orange-500 to-pink-500"
    },
    {
      icon: Palette,
      title: "Low-Code Development",
      description: "Develop apps with mentor-guided projects",
      skills: ["Visual Dev", "Automation", "Integration", "Design"],
      color: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-12 md:py-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xl sm:text-2xl md:text-3xl font-extralight text-center mb-8 sm:mb-12 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800"
      >
        Choose Your Learning Path
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {paths.map((path, index) => (
          <motion.div
            key={path.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group"
          >
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <CardHeader className="p-4 sm:p-6">
                <path.icon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-base sm:text-lg md:text-xl font-light">{path.title}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{path.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {path.skills.map((skill) => (
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
