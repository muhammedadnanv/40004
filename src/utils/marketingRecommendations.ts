import { toast } from "@/hooks/use-toast";

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

// Optimized user preferences with TypeScript interfaces
interface UserPreference {
  interests: string[];
  experience: string;
  goals: string[];
  activeHours: number[];
}

const userPreferences: UserPreference = {
  interests: ["Social Media", "Content Marketing"],
  experience: "intermediate",
  goals: ["increase_engagement", "build_brand"],
  activeHours: [9, 13, 17, 21]
};

// Optimized strategy selection with Map for O(1) lookups
const strategyMap = new Map(
  marketingStrategies.map(category => [
    category.category,
    category.strategies
  ])
);

const getRandomStrategy = (category: string): string | null => {
  const strategies = strategyMap.get(category);
  return strategies ? 
    strategies[Math.floor(Math.random() * strategies.length)] : 
    null;
};

// Optimized time check with Set for O(1) lookups
const activeHoursSet = new Set(userPreferences.activeHours);
const isActiveHour = () => activeHoursSet.has(new Date().getHours());

const generateRecommendation = () => {
  const category = userPreferences.interests[
    Math.floor(Math.random() * userPreferences.interests.length)
  ];
  const strategy = getRandomStrategy(category);
  
  return strategy ? {
    category,
    strategy,
    timestamp: new Date().toISOString()
  } : null;
};

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

let recommendationInterval: NodeJS.Timeout;

export const startMarketingRecommendations = () => {
  if (isActiveHour()) {
    showRecommendation();
  }
  
  recommendationInterval = setInterval(() => {
    if (isActiveHour()) {
      showRecommendation();
    }
  }, 4 * 60 * 60 * 1000);
};

export const stopMarketingRecommendations = () => {
  if (recommendationInterval) {
    clearInterval(recommendationInterval);
  }
};