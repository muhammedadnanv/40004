import { getMockEnrollments, getMockUsers, getMockPrograms, getPersonalizedRecommendations } from './mockDatabase';

interface ContentScore {
  id: string;
  score: number;
  lastUpdated: Date;
  engagementRate: number;
  cachedUntil?: Date;
}

// Optimized cache with Map for O(1) lookups
const contentScores = new Map<string, ContentScore>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const SCORE_THRESHOLD = 0.1;

// Memoized time weight calculation with WeakMap for better memory management
const timeWeightCache = new WeakMap();

const calculateTimeWeight = (enrollments: any[]) => {
  const cacheKey = enrollments;
  
  if (timeWeightCache.has(cacheKey)) {
    return timeWeightCache.get(cacheKey);
  }
  
  const now = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  
  // Use reduce instead of forEach for better performance
  const weight = enrollments.reduce((acc, enrollment) => {
    const timeDiff = now - enrollment.enrolledAt.getTime();
    return acc + Math.max(0, 1 - (timeDiff / oneWeek));
  }, 1);
  
  timeWeightCache.set(cacheKey, weight);
  return weight;
};

// Optimized batch processing with Set for deduplication
export const analyzeContentPerformance = () => {
  const now = new Date();
  const recentEnrollments = getMockEnrollments();
  const users = new Set(getMockUsers());
  const programs = getMockPrograms();
  
  return programs.map(program => {
    const existingScore = contentScores.get(program.id.toString());
    
    if (existingScore?.cachedUntil && existingScore.cachedUntil > now) {
      return existingScore;
    }
    
    const programEnrollments = recentEnrollments.filter(e => e.programId === program.id);
    const engagementRate = programEnrollments.length / users.size;
    const timeWeight = calculateTimeWeight(programEnrollments);
    const newScore = engagementRate * timeWeight;
    
    if (!existingScore || 
        Math.abs(existingScore.score - newScore) > SCORE_THRESHOLD || 
        !existingScore.cachedUntil || 
        existingScore.cachedUntil <= now) {
      
      const scoreData: ContentScore = {
        id: program.id.toString(),
        score: newScore,
        lastUpdated: now,
        engagementRate,
        cachedUntil: new Date(now.getTime() + CACHE_DURATION)
      };
      
      contentScores.set(program.id.toString(), scoreData);
      return scoreData;
    }
    
    return existingScore;
  }).sort((a, b) => b.score - a.score);
};

// Optimized content retrieval with caching
export const getTopPerformingContent = (limit: number = 5) => {
  const scores = Array.from(contentScores.values());
  const now = new Date();
  
  if (scores.some(score => !score.cachedUntil || score.cachedUntil <= now)) {
    return analyzeContentPerformance().slice(0, limit);
  }
  
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

// Optimized recommendations with parallel processing
export const getContentRecommendations = (userId: number) => {
  const [personalizedRecs, scores] = [
    getPersonalizedRecommendations(userId),
    Array.from(contentScores.values())
  ];
  
  const scoreMap = new Map(scores.map(s => [s.id, s.score]));
  
  return personalizedRecs
    .map(program => ({
      ...program,
      score: scoreMap.get(program.id.toString()) || 0
    }))
    .sort((a, b) => b.score - a.score);
};

export const getContentEngagementStats = () => {
  const scores = Array.from(contentScores.values());
  const now = new Date();
  
  if (scores.some(score => !score.cachedUntil || score.cachedUntil <= now)) {
    analyzeContentPerformance();
  }
  
  const validScores = Array.from(contentScores.values());
  
  return {
    averageEngagement: validScores.reduce((sum, item) => sum + item.engagementRate, 0) / validScores.length,
    topPerforming: getTopPerformingContent(3),
    lastUpdated: now
  };
};