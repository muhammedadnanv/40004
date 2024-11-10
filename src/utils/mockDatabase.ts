// Optimized mock database with efficient data structures
const MOCK_DB = {
  users: new Map(Array.from({ length: 100 }, (_, i) => [
    i + 1,
    {
      id: i + 1,
      name: `User ${i + 1}`,
      joinedAt: new Date(Date.now() - Math.random() * 10000000000),
      preferences: {
        interests: ['AI Development', 'Full Stack AI', 'No-Code', 'Low-Code'].slice(0, Math.floor(Math.random() * 4) + 1),
        learningStyle: ['visual', 'practical', 'theoretical'][Math.floor(Math.random() * 3)],
        experienceLevel: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)],
        engagementHistory: Array.from({ length: 5 }, () => ({
          programId: Math.floor(Math.random() * 4) + 1,
          engagementScore: Math.random() * 100,
          lastInteraction: new Date(Date.now() - Math.random() * 5000000000)
        }))
      }
    }
  ])),
  
  enrollments: new Map(Array.from({ length: 50 }, (_, i) => [
    i + 1,
    {
      id: i + 1,
      programId: Math.floor(Math.random() * 4) + 1,
      userId: Math.floor(Math.random() * 100) + 1,
      enrolledAt: new Date(Date.now() - Math.random() * 5000000000),
      progress: Math.random(),
      completedTasks: Math.floor(Math.random() * 10)
    }
  ])),

  programs: new Map([
    [1, { 
      id: 1, 
      name: "AI Prompt Engineering Mastery",
      difficulty: "intermediate",
      topics: ["AI", "Prompt Engineering", "NLP"],
      requiredSkills: ["Basic Programming", "English Writing"]
    }],
    [2, { 
      id: 2, 
      name: "AI + Supabase Integration",
      difficulty: "advanced",
      topics: ["AI", "Database", "API Development"],
      requiredSkills: ["JavaScript", "SQL", "API Design"]
    }],
    [3, { 
      id: 3, 
      name: "No-Code Development",
      difficulty: "beginner",
      topics: ["No-Code", "Automation", "Design"],
      requiredSkills: ["Basic Computer Skills"]
    }],
    [4, { 
      id: 4, 
      name: "Frontend Development with Low-Code",
      difficulty: "intermediate",
      topics: ["Frontend", "Low-Code", "UI/UX"],
      requiredSkills: ["HTML/CSS Basics", "Design Thinking"]
    }]
  ]),

  userInteractions: new Map()
};

// Optimized helper functions using Map for O(1) lookups
export const getUserPreferences = (userId: number) => {
  const user = MOCK_DB.users.get(userId);
  return user?.preferences || null;
};

export const trackUserInteraction = (userId: number, programId: number, interactionType: string) => {
  const key = `${userId}-${programId}`;
  const currentInteractions = MOCK_DB.userInteractions.get(key) || [];
  const timestamp = new Date();
  
  const weight = {
    'view': 1,
    'click': 2,
    'enroll': 5,
    'complete': 10
  }[interactionType] || 1;

  MOCK_DB.userInteractions.set(key, [...currentInteractions, { type: interactionType, timestamp, weight }]);
};

// Optimized recommendation algorithm with memoization
const memoizedScores = new Map<string, number>();

export const getPersonalizedRecommendations = (userId: number) => {
  const user = MOCK_DB.users.get(userId);
  if (!user) return [];

  const recommendations = Array.from(MOCK_DB.programs.values()).map(program => {
    const memoKey = `${userId}-${program.id}`;
    if (memoizedScores.has(memoKey)) {
      return { program, score: memoizedScores.get(memoKey)! };
    }

    let score = 0;

    // Interest matching (30% weight) - O(n) where n is number of topics
    const interestMatch = program.topics.some(topic => 
      user.preferences.interests.includes(topic)
    );
    score += interestMatch ? 30 : 0;

    // Experience level matching (20% weight) - O(1)
    const difficultyMap = { beginner: 0, intermediate: 1, advanced: 2 };
    const experienceLevelMap = { beginner: 0, intermediate: 1, advanced: 2 };
    const levelDifference = Math.abs(
      difficultyMap[program.difficulty as keyof typeof difficultyMap] - 
      experienceLevelMap[user.preferences.experienceLevel as keyof typeof experienceLevelMap]
    );
    score += (2 - levelDifference) * 20;

    // Recent interactions (30% weight) - O(m) where m is number of recent interactions
    const interactions = MOCK_DB.userInteractions.get(`${userId}-${program.id}`) || [];
    const recentInteractions = interactions.filter(i => {
      const daysSinceInteraction = (Date.now() - i.timestamp.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceInteraction <= 7;
    });
    
    const interactionScore = recentInteractions.reduce((acc, interaction) => 
      acc + (interaction.weight * (1 - ((Date.now() - interaction.timestamp.getTime()) / (7 * 24 * 60 * 60 * 1000))))
    , 0);
    score += Math.min(interactionScore * 2, 30);

    // Learning style compatibility (20% weight) - O(1)
    const topicStyleMap = {
      'AI': ['practical', 'theoretical'],
      'Database': ['practical'],
      'Frontend': ['visual', 'practical'],
      'No-Code': ['visual', 'practical']
    };
    
    const learningStyleMatch = program.topics.some(topic => {
      const topicStyle = topicStyleMap[topic as keyof typeof topicStyleMap];
      return topicStyle?.includes(user.preferences.learningStyle);
    });
    score += learningStyleMatch ? 20 : 0;

    memoizedScores.set(memoKey, score);
    return { program, score };
  })
  .sort((a, b) => b.score - a.score)
  .map(({ program }) => program);

  // Clear memoized scores after 5 minutes to prevent memory leaks
  setTimeout(() => memoizedScores.clear(), 5 * 60 * 1000);

  return recommendations;
};

// Optimized helper functions using Map methods
export const getMockEnrollments = () => Array.from(MOCK_DB.enrollments.values());
export const getMockUsers = () => Array.from(MOCK_DB.users.values());
export const getMockPrograms = () => Array.from(MOCK_DB.programs.values());

export const getRecentEnrollments = () => {
  const now = Date.now();
  const oneHourAgo = now - 3600000;
  
  return Array.from(MOCK_DB.enrollments.values())
    .filter(e => e.enrolledAt.getTime() > oneHourAgo)
    .map(e => ({
      programName: MOCK_DB.programs.get(e.programId)?.name,
      userName: MOCK_DB.users.get(e.userId)?.name
    }))
    .filter(e => e.programName && e.userName);
};

export const getPopularPrograms = () => {
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  
  const programScores = Array.from(MOCK_DB.enrollments.values())
    .filter(e => e.enrolledAt.getTime() > oneWeekAgo)
    .reduce((acc, curr) => {
      acc.set(curr.programId, (acc.get(curr.programId) || 0) + 1);
      return acc;
    }, new Map<number, number>());

  return Array.from(programScores.entries())
    .sort(([, a], [, b]) => b - a)
    .map(([programId]) => MOCK_DB.programs.get(programId)?.name)
    .filter(Boolean);
};