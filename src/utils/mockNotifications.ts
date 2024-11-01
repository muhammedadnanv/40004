import { toast } from "@/hooks/use-toast";

const keralaNames = [
  // Hindu Names (Gen Z)
  "Arya Menon",
  "Aarav Nair",
  "Vedika Warrier",
  "Vihaan Namboothiri",
  "Riya Pisharody",
  "Ahaan Panicker",
  "Shaan Thampuran",
  
  // Muslim Names (Gen Z)
  "Ayaan Thangal",
  "Miraal Beevi",
  "Rayyan Kutty",
  "Aleena Rahman",
  "Niyara Kurikkal",
  "Nadia Haji",
  "Lina Beevi",
  
  // Christian Names (Gen Z)
  "Evan Kuruvilla",
  "Maya Kochamma",
  "Naomi Mappillai",
  "Joel Chandy",
  "Elina Kunjamma",
  "Zara Muthalali"
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
