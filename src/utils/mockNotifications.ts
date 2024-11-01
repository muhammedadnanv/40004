import { toast } from "@/hooks/use-toast";

const keralaNames = [
  // Hindu Names
  "Aishwarya Nair",
  "Deepika Menon",
  "Karthik Pillai",
  "Lakshmi Devi",
  "Meenakshi Amma",
  "Priya Nambiar",
  "Rahul Krishna",
  "Sreeja Gopinath",
  
  // Muslim Names
  "Ayesha Begum",
  "Fathima Riyas",
  "Mohammed Haris",
  "Naseema Beevi",
  "Rashid Khan",
  "Safiya Nazreen",
  "Zainab Rahman",
  
  // Christian Names
  "Anna Thomas",
  "George Kurian",
  "Mary Joseph",
  "Paul Vincent",
  "Sarah Philip",
  "Thomas John",
  "Teresa George"
];

const programs = [
  "AI + Web Design",
  "AI Prompt Specialist",
  "No-Code AI Tools",
  "AI + Python Development",
  "AI Superbase Creation",
  "Digital Marketing",
  "UI/UX Design",
  "Data Analytics",
  "Mobile App Development",
  "Cloud Computing"
];

export const showRandomJoinNotification = () => {
  const randomName = keralaNames[Math.floor(Math.random() * keralaNames.length)];
  const randomProgram = programs[Math.floor(Math.random() * programs.length)];

  toast({
    title: "New Enrollment! 🎉",
    description: `${randomName} just joined ${randomProgram}`,
  });
};