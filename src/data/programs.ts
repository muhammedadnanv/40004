interface Program {
  title: string;
  description: string;
  duration: string;
  skills: string[];
  category: string;
  regularPrice: number;
}

export const programs: Program[] = [
  {
    title: "AI Development",
    description: "Master AI development with hands-on projects and expert mentorship",
    duration: "8 weeks",
    skills: ["Prompt Engineering", "AI Integration", "LLM Development", "ChatGPT API"],
    category: "AI",
    regularPrice: 199
  },
  {
    title: "Full Stack AI",
    description: "Build complete AI applications with database integration",
    duration: "12 weeks",
    skills: ["Supabase", "APIs", "Databases", "AI Integration"],
    category: "Development",
    regularPrice: 199
  },
  {
    title: "Frontend Development",
    description: "Learn modern frontend development with React and TypeScript",
    duration: "10 weeks",
    skills: ["React", "TypeScript", "UI/UX", "Performance"],
    category: "Development",
    regularPrice: 199
  },
  {
    title: "Low-Code Development",
    description: "Build applications faster with low-code development",
    duration: "10 weeks",
    skills: ["Visual Development", "Automation", "Integration", "Design"],
    category: "Development",
    regularPrice: 199
  }
];