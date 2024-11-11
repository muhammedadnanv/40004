import { getMockEnrollments, getMockUsers, getMockPrograms, getPersonalizedRecommendations } from './mockDatabase';

interface ContentScore {
  id: string;
  score: number;
  lastUpdated: Date;
  engagementRate: number;
  cachedUntil?: Date;
}

// Cache storage
const contentScores = new Map<string, ContentScore>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const SCORE_THRESHOLD = 0.1; // Minimum score difference to trigger update

// Memoized calculation function
const memoizedCalculateTimeWeight = (() => {
  const cache = new Map<string, number>();
  
  return (enrollments: any[]) => {
    const cacheKey = JSON.stringify(enrollments.map(e => e.enrolledAt));
    
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }
    
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    
    const weight = enrollments.reduce((weight, enrollment) => {
      const timeDiff = now - enrollment.enrolledAt.getTime();
      const timeWeight = Math.max(0, 1 - (timeDiff / oneWeek));
      return weight + timeWeight;
    }, 1);
    
    cache.set(cacheKey, weight);
    return weight;
  };
})();

export const analyzeContentPerformance = () => {
  const now = new Date();
  const recentEnrollments = getMockEnrollments();
  const users = getMockUsers();
  const programs = getMockPrograms();
  
  // Batch process programs for better performance
  const updates = programs.map(program => {
    const existingScore = contentScores.get(program.id.toString());
    
    // Skip calculation if cache is still valid
    if (existingScore?.cachedUntil && existingScore.cachedUntil > now) {
      return existingScore;
    }
    
    const programEnrollments = recentEnrollments.filter(e => e.programId === program.id);
    const engagementRate = programEnrollments.length / users.length;
    const timeWeight = memoizedCalculateTimeWeight(programEnrollments);
    const newScore = engagementRate * timeWeight;
    
    // Only update if significant change or cache expired
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
  });

  return updates.sort((a, b) => b.score - a.score);
};

export const getTopPerformingContent = (limit: number = 5) => {
  const cachedScores = Array.from(contentScores.values());
  const now = new Date();
  
  // Check if we need to refresh the analysis
  const needsRefresh = cachedScores.some(score => !score.cachedUntil || score.cachedUntil <= now);
  
  if (needsRefresh) {
    return analyzeContentPerformance().slice(0, limit);
  }
  
  return cachedScores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

export const getContentRecommendations = (userId: number) => {
  const personalizedRecs = getPersonalizedRecommendations(userId);
  const topPerforming = getTopPerformingContent();
  
  // Combine and sort recommendations efficiently
  return personalizedRecs
    .map(program => ({
      ...program,
      score: contentScores.get(program.id.toString())?.score || 0
    }))
    .sort((a, b) => b.score - a.score);
};

export const getContentEngagementStats = () => {
  const scores = Array.from(contentScores.values());
  const now = new Date();
  
  // Check if we need fresh data
  const needsRefresh = scores.some(score => !score.cachedUntil || score.cachedUntil <= now);
  
  if (needsRefresh) {
    analyzeContentPerformance();
  }
  
  const validScores = Array.from(contentScores.values());
  
  return {
    averageEngagement: validScores.reduce((sum, item) => sum + item.engagementRate, 0) / validScores.length,
    topPerforming: getTopPerformingContent(3),
    lastUpdated: now
  };
};