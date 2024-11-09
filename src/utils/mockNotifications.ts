import { toast } from "@/hooks/use-toast";
import { 
  getUserPreferences, 
  trackUserInteraction,
  getPersonalizedRecommendations,
  getMockUsers
} from "./mockDatabase";

// Helper function to get time-appropriate greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

// Get user's local time
const getUserLocalTime = () => {
  return new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: 'numeric',
    hour12: true 
  });
};

// List of realistic names for notifications
const realisticNames = [
  "Arjun Kumar",
  "Priya Patel",
  "Rahul Sharma",
  "Neha Singh",
  "Amit Verma",
  "Deepika Reddy",
  "Vikram Malhotra",
  "Ananya Desai"
];

const getRandomNames = (count: number) => {
  const shuffled = [...realisticNames].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const showRandomJoinNotification = () => {
  const selectedNames = getRandomNames(3);
  
  toast({
    title: `${getGreeting()} 👋`,
    description: `${selectedNames.join(', ')} just joined our learning community!`,
    duration: 4000,
    className: "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20",
  });
};

export const showPersonalizedRecommendation = () => {
  const userPrefs = getUserPreferences(CURRENT_USER_ID);
  const recommendations = getPersonalizedRecommendations(CURRENT_USER_ID);
  
  if (!userPrefs || recommendations.length === 0) return;

  const topRecommendation = recommendations[0];
  const greeting = getGreeting();
  
  toast({
    title: `${greeting}, learner! 👋`,
    description: `Based on your interests: "${topRecommendation.name}" might be perfect for you!`,
    duration: 6000,
    className: "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20",
  });

  trackUserInteraction(CURRENT_USER_ID, topRecommendation.id, 'recommendation_shown');
};

export const showImmediateJoinNotification = (programTitle: string) => {
  const userPrefs = getUserPreferences(CURRENT_USER_ID);
  const localTime = getUserLocalTime();
  
  if (!userPrefs) return;

  const isRelevantToInterests = userPrefs.interests.some(interest => 
    programTitle.toLowerCase().includes(interest.toLowerCase())
  );

  const matchLevel = isRelevantToInterests ? 
    "This program perfectly matches your interests!" : 
    "Explore something new!";

  const selectedNames = getRandomNames(2);

  toast({
    title: `${matchLevel} ✨`,
    description: `At ${localTime}: ${selectedNames.join(', ')} and others are exploring "${programTitle}". Join them now!`,
    duration: 5000,
    className: "bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20",
  });
};

export const showProgramPopularityNotification = (programTitle: string) => {
  const userPrefs = getUserPreferences(CURRENT_USER_ID);
  
  if (!userPrefs) return;

  const isRelevantToUser = userPrefs.interests.some(interest => 
    programTitle.toLowerCase().includes(interest.toLowerCase())
  );
  
  const userExperience = userPrefs.experienceLevel;
  const enrollmentCount = Math.floor(Math.random() * 50) + 50;
  const localTime = getUserLocalTime();
  
  let message = isRelevantToUser ? 
    `Hot in ${userPrefs.interests[0]}: "${programTitle}" is trending! ${enrollmentCount}+ ${userExperience}-level learners enrolled.` :
    `Trending Now: "${programTitle}" has ${enrollmentCount}+ new enrollments today!`;

  toast({
    title: `${localTime} - Trending Update 🔥`,
    description: message,
    duration: isRelevantToUser ? 6000 : 4000,
    className: `bg-gradient-to-r ${isRelevantToUser ? 
      'from-orange-500/10 to-red-500/10 border-orange-500/20' : 
      'from-gray-500/10 to-blue-500/10 border-gray-500/20'}`,
  });
};

// Simulate current user ID (in a real app, this would come from auth)
const CURRENT_USER_ID = 1;