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
  "Frontend Development",
  "AI + Web Design",
  "AI Prompt Specialist",
  "No-Code AI Tools",
  "AI + Python Development",
  "AI Superbase Creation",
  "AI Prompt Creator",
  "Build AI-powered Chatbot"
];

const locations = [
  "Kochi",
  "Trivandrum",
  "Kozhikode",
  "Thrissur",
  "Kannur",
  "Kollam",
  "Alappuzha"
];

const getRandomElement = (array: string[]) => array[Math.floor(Math.random() * array.length)];

const getTimeAgo = () => {
  const minutes = Math.floor(Math.random() * 5);
  return minutes === 0 ? "just now" : `${minutes} minutes ago`;
};

export const showRandomJoinNotification = () => {
  const randomName = getRandomElement(keralaNames);
  const randomProgram = getRandomElement(programs);
  const randomLocation = getRandomElement(locations);
  const timeAgo = getTimeAgo();

  toast({
    title: `${randomName} joined from ${randomLocation} ${timeAgo} 🎉`,
    description: `Enrolled in ${randomProgram}. Join them now!`,
    duration: 5000,
    className: "bg-gradient-to-r from-[#4A00E0]/10 to-purple-500/10 border-[#4A00E0]/20 cursor-pointer hover:scale-105 transition-transform",
  });
};

// Function to show immediate join notification
export const showImmediateJoinNotification = (programTitle: string) => {
  const randomLocation = getRandomElement(locations);
  
  toast({
    title: "Live Enrollment Alert! 🔥",
    description: `Someone from ${randomLocation} just enrolled in ${programTitle}. Limited seats remaining!`,
    duration: 7000,
    className: "bg-gradient-to-r from-[#4A00E0]/10 to-purple-500/10 border-[#4A00E0]/20 animate-pulse",
  });
};

// Function to show program popularity notification
export const showProgramPopularityNotification = (programTitle: string) => {
  const randomNumber = Math.floor(Math.random() * 20) + 10;
  
  toast({
    title: "Trending Program! 📈",
    description: `${randomNumber} people are viewing ${programTitle} right now. Don't miss out!`,
    duration: 6000,
    className: "bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20",
  });
};