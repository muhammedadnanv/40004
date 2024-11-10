import { toast } from "@/hooks/use-toast";
import { getUserPreferences, trackUserInteraction, getPersonalizedRecommendations } from "./mockDatabase";

// Notification Queue Management
const notificationQueue = new Map<string, NodeJS.Timeout>();
const MIN_NOTIFICATION_INTERVAL = 3000; // 3 seconds
const MAX_NOTIFICATIONS_PER_MINUTE = 4;
let notificationsInLastMinute = 0;
let lastNotificationTime = Date.now();

// Efficient time-based greeting system
const getGreeting = (() => {
  const greetings = {
    lateNight: ["Still up? 🌙", "Night owl! ✨", "Working late? 🌠"],
    morning: ["Good morning ☀️", "Rise and shine! 🌅", "Morning! ☕", "Hello sunshine! 🌞"],
    afternoon: ["Good afternoon 🌤️", "Having a good day? 🌈", "Afternoon! 🌺", "Hello! 👋"],
    evening: ["Good evening 🌆", "Evening! ⭐", "Hi there! 🌙", "Lovely evening! 🌅"],
    night: ["Good night 🌙", "Winding down? ✨", "Night time! 🌠", "Evening! 🌃"]
  };

  return () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) return greetings.lateNight;
    if (hour < 12) return greetings.morning;
    if (hour < 17) return greetings.afternoon;
    if (hour < 21) return greetings.evening;
    return greetings.night;
  };
})();

// Optimized time formatting
const getUserLocalTime = () => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  return formatter.format(new Date());
};

// Efficient name rotation system
class NameRotator {
  private names: string[];
  private currentIndex: number = 0;

  constructor() {
    this.names = [
      "Arjun Kumar", "Priya Patel", "Zhang Wei", "Li Na", "Kim Min-ji",
      "Sofia Müller", "Giovanni Romano", "Pierre Dubois", "Ana García",
      "James Smith", "Isabella Rodriguez", "Miguel Santos", "Sarah Johnson",
      "Kwame Mensah", "Chioma Okafor", "Amir Mohammed", "Zainab Ibrahim",
      "Jack Wilson", "Maia Williams", "Tane Hohepa"
    ];
    this.shuffle();
  }

  private shuffle(): void {
    for (let i = this.names.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.names[i], this.names[j]] = [this.names[j], this.names[i]];
    }
  }

  getNextNames(count: number): string[] {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(this.names[this.currentIndex]);
      this.currentIndex = (this.currentIndex + 1) % this.names.length;
      if (this.currentIndex === 0) this.shuffle();
    }
    return result;
  }
}

const nameRotator = new NameRotator();

// Rate limiting for notifications
const canShowNotification = (): boolean => {
  const now = Date.now();
  if (now - lastNotificationTime < MIN_NOTIFICATION_INTERVAL) return false;

  // Reset counter if a minute has passed
  if (now - lastNotificationTime > 60000) {
    notificationsInLastMinute = 0;
  }

  return notificationsInLastMinute < MAX_NOTIFICATIONS_PER_MINUTE;
};

// Optimized notification display function
const showNotification = (title: string, description: string, duration: number = 4000, className?: string) => {
  if (!canShowNotification()) return;

  lastNotificationTime = Date.now();
  notificationsInLastMinute++;

  toast({
    title,
    description,
    duration,
    className: className || "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20",
  });
};

export const showRandomJoinNotification = () => {
  const greetings = getGreeting();
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  const selectedNames = nameRotator.getNextNames(Math.floor(Math.random() * 2) + 1);
  
  showNotification(
    greeting,
    `${selectedNames.join(', ')} just joined our learning community! (${getUserLocalTime()})`
  );

  // Schedule next notification with dynamic interval
  const nextInterval = Math.floor(Math.random() * 5000) + 3000;
  setTimeout(showRandomJoinNotification, nextInterval);
};

export const showPersonalizedRecommendation = () => {
  const CURRENT_USER_ID = 1; // In a real app, this would come from auth
  const userPrefs = getUserPreferences(CURRENT_USER_ID);
  const recommendations = getPersonalizedRecommendations(CURRENT_USER_ID);
  
  if (!userPrefs || recommendations.length === 0) return;

  const topRecommendation = recommendations[0];
  const greetings = getGreeting();
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  
  showNotification(
    `${greeting}, learner! 👋`,
    `Based on your interests: "${topRecommendation.name}" might be perfect for you!`,
    6000
  );

  trackUserInteraction(CURRENT_USER_ID, topRecommendation.id, 'recommendation_shown');
};

export const showImmediateJoinNotification = (programTitle: string) => {
  const CURRENT_USER_ID = 1;
  const userPrefs = getUserPreferences(CURRENT_USER_ID);
  
  if (!userPrefs) return;

  const isRelevantToInterests = userPrefs.interests.some(interest => 
    programTitle.toLowerCase().includes(interest.toLowerCase())
  );

  const matchLevel = isRelevantToInterests ? 
    "This program perfectly matches your interests!" : 
    "Explore something new!";

  const selectedNames = nameRotator.getNextNames(2);

  showNotification(
    `${matchLevel} ✨`,
    `${selectedNames.join(', ')} and others are exploring "${programTitle}". Join them now!`,
    5000,
    "bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20"
  );
};

export const showProgramPopularityNotification = (programTitle: string) => {
  const CURRENT_USER_ID = 1;
  const userPrefs = getUserPreferences(CURRENT_USER_ID);
  
  if (!userPrefs) return;

  const isRelevantToUser = userPrefs.interests.some(interest => 
    programTitle.toLowerCase().includes(interest.toLowerCase())
  );
  
  const enrollmentCount = Math.floor(Math.random() * 50) + 50;
  
  const message = isRelevantToUser ? 
    `Hot in ${userPrefs.interests[0]}: "${programTitle}" is trending! ${enrollmentCount}+ ${userPrefs.experienceLevel}-level learners enrolled.` :
    `Trending Now: "${programTitle}" has ${enrollmentCount}+ new enrollments today!`;

  showNotification(
    `${getUserLocalTime()} - Trending Update 🔥`,
    message,
    isRelevantToUser ? 6000 : 4000,
    `bg-gradient-to-r ${isRelevantToUser ? 
      'from-orange-500/10 to-red-500/10 border-orange-500/20' : 
      'from-gray-500/10 to-blue-500/10 border-gray-500/20'}`
  );
};