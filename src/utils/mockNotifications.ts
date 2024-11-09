import { toast } from "@/components/ui/use-toast";
import { 
  getRecentEnrollments, 
  getPopularPrograms, 
  getUserPreferences,
  trackUserInteraction,
  getPersonalizedRecommendations 
} from "./mockDatabase";

// Simulate current user ID (in a real app, this would come from auth)
const CURRENT_USER_ID = 1;

export const showPersonalizedRecommendation = () => {
  const recommendations = getPersonalizedRecommendations(CURRENT_USER_ID);
  if (recommendations.length === 0) return;

  const topRecommendation = recommendations[0];
  
  toast({
    title: "Recommended for You",
    description: `Based on your interests: ${topRecommendation.name}`,
    duration: 5000,
  });

  // Track this recommendation
  trackUserInteraction(CURRENT_USER_ID, topRecommendation.id, 'recommendation_shown');
};

export const showRandomJoinNotification = () => {
  const recentEnrollments = getRecentEnrollments();
  if (recentEnrollments.length === 0) return;

  const randomEnrollment = recentEnrollments[Math.floor(Math.random() * recentEnrollments.length)];
  
  toast({
    title: "New Enrollment!",
    description: `${randomEnrollment.userName} just joined ${randomEnrollment.programName}!`,
    duration: 3000,
  });
};

export const showProgramPopularityNotification = (programTitle: string) => {
  const popularPrograms = getPopularPrograms();
  const position = popularPrograms.indexOf(programTitle);
  
  if (position === -1) return;
  
  const userPreferences = getUserPreferences(CURRENT_USER_ID);
  const isRelevantToUser = userPreferences?.interests.some(interest => 
    programTitle.toLowerCase().includes(interest.toLowerCase())
  );
  
  const enrollmentCount = Math.floor(Math.random() * 50) + 50;
  
  toast({
    title: isRelevantToUser ? "Trending in Your Interest Area!" : "Program Popularity Update",
    description: `${programTitle} is one of our most popular programs with ${enrollmentCount}+ enrollments!`,
    duration: isRelevantToUser ? 5000 : 3000,
  });
};

export const showImmediateJoinNotification = (programTitle: string) => {
  const recentUsers = getRecentEnrollments()
    .filter(e => e.programName === programTitle)
    .map(e => e.userName);
    
  const count = recentUsers.length;
  const userPreferences = getUserPreferences(CURRENT_USER_ID);
  
  const relevanceMessage = userPreferences?.interests.some(interest => 
    programTitle.toLowerCase().includes(interest.toLowerCase())
  ) ? " This program aligns with your interests!" : "";
  
  toast({
    title: "Join the Community!",
    description: `${count} people enrolled in ${programTitle} recently.${relevanceMessage} Don't miss out!`,
    duration: 4000,
  });
};