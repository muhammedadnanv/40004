import { toast } from "@/hooks/use-toast";

const keralaNames = [
  // Hindu Names (Gen Z)
  "Advaith Namboothiri",
  "Aanya Warrier",
  "Arjun Pisharody",
  "Diya Kartha",
  "Ishaan Thampuran",
  "Kavya Menon",
  "Rithvik Nair",
  "Zara Panicker",
  
  // Muslim Names (Gen Z)
  "Aadil Thangal",
  "Ayra Beevi",
  "Faiz Kurikkal",
  "Inaya Rahman",
  "Zayn Kutty",
  "Myra Beevi",
  "Yusuf Haji",
  
  // Christian Names (Gen Z)
  "Aiden Kuruvilla",
  "Bella Kochamma",
  "Chris Mappillai",
  "Eva Pennamma",
  "Kevin Chandy",
  "Sophia Kunjamma",
  "Zain Muthalali"
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
