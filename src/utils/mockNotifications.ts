import { toast } from "@/hooks/use-toast";

const keralaNames = [
  // Hindu Names
  "Achyuthan Namboothiri",
  "Devangana Warrier",
  "Kanakambal Pisharody",
  "Madhusoodanan Kartha",
  "Narayani Thampuratty",
  "Parameswaran Ezhuthachan",
  "Rugmini Amma",
  "Unnikrishnan Panicker",
  
  // Muslim Names
  "Adamkutty Thangal",
  "Fathima Beevi",
  "Hydrose Kurikkal",
  "Kunhipathumma",
  "Moideen Kutty",
  "Safiyath Beevi",
  "Velayudhan Haji",
  
  // Christian Names
  "Annamma Kochamma",
  "Chacko Mappillai",
  "Kunjachan Upadesi",
  "Mariamma Pennamma",
  "Oommen Chandy",
  "Thresiamma Kunjamma",
  "Varkey Muthalali"
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