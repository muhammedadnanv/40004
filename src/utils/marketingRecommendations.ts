import { toast } from "@/hooks/use-toast";

// Marketing strategies database (in a real app, this would come from an API)
const marketingStrategies = [
  {
    category: "Social Media",
    strategies: [
      "Increase engagement through Instagram Reels",
      "Leverage LinkedIn for B2B networking",
      "Create TikTok content for Gen Z audience",
      "Use Twitter Spaces for community building"
    ]
  },
  {
    category: "Content Marketing",
    strategies: [
      "Start a weekly newsletter",
      "Create educational webinars",
      "Develop case studies",
      "Launch a podcast series"
    ]
  },
  {
    category: "Email Marketing",
    strategies: [
      "Segment email lists for better targeting",
      "Implement automated welcome series",
      "A/B test email subject lines",
      "Personalize email content"
    ]
  },
  {
    category: "SEO",
    strategies: [
      "Optimize for voice search",
      "Create long-form content",
      "Focus on local SEO",
      "Improve site speed"
    ]
  }
];

// Mock user preferences (in a real app, this would come from a database)
const userPreferences = {
  interests: ["Social Media", "Content Marketing"],
  experience: "intermediate",
  goals: ["increase_engagement", "build_brand"],
  activeHours: [9, 13, 17, 21] // Hours when user is most active
};

// Function to get random strategy from category
const getRandomStrategy = (category: string) => {
  const categoryData = marketingStrategies.find(s => s.category === category);
  if (!categoryData) return null;
  return categoryData.strategies[Math.floor(Math.random() * categoryData.strategies.length)];
};

// Function to check if current hour is an active hour
const isActiveHour = () => {
  const currentHour = new Date().getHours();
  return userPreferences.activeHours.includes(currentHour);
};

// Function to generate personalized recommendation
const generateRecommendation = () => {
  const category = userPreferences.interests[Math.floor(Math.random() * userPreferences.interests.length)];
  const strategy = getRandomStrategy(category);
  
  if (!strategy) return null;
  
  return {
    category,
    strategy,
    timestamp: new Date().toISOString()
  };
};

// Function to show recommendation notification
const showRecommendation = () => {
  const recommendation = generateRecommendation();
  
  if (!recommendation) return;
  
  toast({
    title: `Marketing Tip: ${recommendation.category} 📈`,
    description: recommendation.strategy,
    duration: 8000,
    className: "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 cursor-pointer hover:scale-105 transition-transform",
  });
};

// Function to start the recommendation system
export const startMarketingRecommendations = () => {
  // Show initial recommendation
  if (isActiveHour()) {
    showRecommendation();
  }
  
  // Set up interval for future recommendations (every 4 hours)
  setInterval(() => {
    if (isActiveHour()) {
      showRecommendation();
    }
  }, 4 * 60 * 60 * 1000); // 4 hours in milliseconds
};

// Function to stop the recommendation system
export const stopMarketingRecommendations = () => {
  // Clear all intervals
  const highestId = window.setTimeout(() => {}, 0);
  for (let i = highestId; i >= 0; i--) {
    window.clearInterval(i);
  }
};