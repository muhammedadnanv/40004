import { toast } from "@/hooks/use-toast";

const keralaNames = [
  // Hindu Names (Gen Z)
  "Arya",
  "Aarav",
  "Vedika",
  "Vihaan",
  "Riya",
  "Ahaan",
  "Shaan",
  
  // Muslim Names (Gen Z)
  "Ayaan",
  "Miraal",
  "Rayyan",
  "Aleena",
  "Niyara",
  "Nadia",
  "Lina",
  
  // Christian Names (Gen Z)
  "Evan",
  "Maya",
  "Naomi",
  "Joel",
  "Elina",
  "Zara"
];

const programs = [
  "Frontend Development Course",
  "AI + Web Design Course",
  "AI Prompt Specialist Course",
  "No-Code AI Tools Course",
  "AI + Python Development Course",
  "AI Superbase Creation Course",
  "AI Prompt Creator Course",
  "Build AI-powered Chatbot Course"
];

export const showRandomJoinNotification = () => {
  const randomName = keralaNames[Math.floor(Math.random() * keralaNames.length)];
  const randomProgram = programs[Math.floor(Math.random() * programs.length)];

  toast({
    title: "New Enrollment! 🎉",
    description: `${randomName} just joined ${randomProgram}`,
  });
};