import { toast } from "@/hooks/use-toast";

const keralaNames = [
  "Arun Kumar",
  "Deepa Menon",
  "Krishnan Nair",
  "Lakshmi Devi",
  "Manoj Varma",
  "Priya Nambiar",
  "Rajesh Pillai",
  "Sreeja Gopinath",
  "Thomas Kurian",
  "Vinod Menon"
];

const programs = [
  "Frontend Development",
  "AI + Web Design",
  "AI Prompt Specialist",
  "No-Code AI Tools",
  "AI + Python Development",
  "AI Superbase Creation"
];

export const showRandomJoinNotification = () => {
  const randomName = keralaNames[Math.floor(Math.random() * keralaNames.length)];
  const randomProgram = programs[Math.floor(Math.random() * programs.length)];

  toast({
    title: "New Enrollment! 🎉",
    description: `${randomName} just joined ${randomProgram}`,
  });
};