import { getMockEnrollments, getMockUsers, getMockPrograms, getPersonalizedRecommendations } from './mockDatabase';

interface ContentScore {
  id: string;
  score: number;
  lastUpdated: Date;
  engagementRate: number;
}

const contentScores = new Map<string, ContentScore>();

export const analyzeContentPerformance = () => {
  const recentEnrollments = getMockEnrollments();
  const users = getMockUsers();
  const programs = getMockPrograms();

  // Calculate engagement rates for each program
  programs.forEach(program => {
    const programEnrollments = recentEnrollments.filter(e => e.programId === program.id);
    const totalUsers = users.length;
    
    const engagementRate = programEnrollments.length / totalUsers;
    const timeWeight = calculateTimeWeight(programEnrollments);
    
    const score = engagementRate * timeWeight;

    contentScores.set(program.id.toString(), {
      id: program.id.toString(),
      score,
      lastUpdated: new Date(),
      engagementRate
    });
  });

  return Array.from(contentScores.values())
    .sort((a, b) => b.score - a.score);
};

const calculateTimeWeight = (enrollments: any[]) => {
  const now = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  
  return enrollments.reduce((weight, enrollment) => {
    const timeDiff = now - enrollment.enrolledAt.getTime();
    const timeWeight = Math.max(0, 1 - (timeDiff / oneWeek));
    return weight + timeWeight;
  }, 1);
};

export const getTopPerformingContent = (limit: number = 5) => {
  const scores = analyzeContentPerformance();
  return scores.slice(0, limit);
};

export const getContentRecommendations = (userId: number) => {
  const personalizedRecs = getPersonalizedRecommendations(userId);
  const topPerforming = getTopPerformingContent();
  
  // Combine personalized and trending content
  const recommendations = personalizedRecs.map(program => ({
    ...program,
    score: contentScores.get(program.id.toString())?.score || 0
  }));
  
  return recommendations.sort((a, b) => b.score - a.score);
};

export const getContentEngagementStats = () => {
  const scores = Array.from(contentScores.values());
  
  return {
    averageEngagement: scores.reduce((sum, item) => sum + item.engagementRate, 0) / scores.length,
    topPerforming: getTopPerformingContent(3),
    lastUpdated: new Date()
  };
};