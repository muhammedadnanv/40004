// Mock database with optimized personalization algorithms
const MOCK_DB = {
  users: Array.from({ length: 100 }, (_, i) => ({
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
  })),
  
  enrollments: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    programId: Math.floor(Math.random() * 4) + 1,
    userId: Math.floor(Math.random() * 100) + 1,
    enrolledAt: new Date(Date.now() - Math.random() * 5000000000),
    progress: Math.random(),
    completedTasks: Math.floor(Math.random() * 10)
  })),

  programs: [
    { 
      id: 1, 
      name: "AI Prompt Engineering Mastery",
      difficulty: "intermediate",
      topics: ["AI", "Prompt Engineering", "NLP"],
      requiredSkills: ["Basic Programming", "English Writing"]
    },
    { 
      id: 2, 
      name: "AI + Supabase Integration",
      difficulty: "advanced",
      topics: ["AI", "Database", "API Development"],
      requiredSkills: ["JavaScript", "SQL", "API Design"]
    },
    { 
      id: 3, 
      name: "No-Code Development",
      difficulty: "beginner",
      topics: ["No-Code", "Automation", "Design"],
      requiredSkills: ["Basic Computer Skills"]
    },
    { 
      id: 4, 
      name: "Frontend Development with Low-Code",
      difficulty: "intermediate",
      topics: ["Frontend", "Low-Code", "UI/UX"],
      requiredSkills: ["HTML/CSS Basics", "Design Thinking"]
    }
  ],

  userInteractions: new Map()
};

// Enhanced personalization functions
export const getUserPreferences = (userId: number) => {
  const user = MOCK_DB.users.find(u => u.id === userId);
  return user?.preferences || null;
};

export const trackUserInteraction = (userId: number, programId: number, interactionType: string) => {
  const key = `${userId}-${programId}`;
  const currentInteractions = MOCK_DB.userInteractions.get(key) || [];
  const timestamp = new Date();
  
  // Track interaction with weight based on type
  const weight = {
    'view': 1,
    'click': 2,
    'enroll': 5,
    'complete': 10
  }[interactionType] || 1;

  MOCK_DB.userInteractions.set(key, [...currentInteractions, {
    type: interactionType,
    timestamp,
    weight
  }]);
};

export const getPersonalizedRecommendations = (userId: number) => {
  const user = MOCK_DB.users.find(u => u.id === userId);
  if (!user) return [];

  return MOCK_DB.programs.map(program => {
    let score = 0;

    // Interest matching (30% weight)
    const interestMatch = program.topics.some(topic => 
      user.preferences.interests.includes(topic)
    );
    score += interestMatch ? 30 : 0;

    // Experience level matching (20% weight)
    const difficultyMap = { beginner: 0, intermediate: 1, advanced: 2 };
    const experienceLevelMap = { beginner: 0, intermediate: 1, advanced: 2 };
    const levelDifference = Math.abs(
      difficultyMap[program.difficulty as keyof typeof difficultyMap] - 
      experienceLevelMap[user.preferences.experienceLevel as keyof typeof experienceLevelMap]
    );
    score += (2 - levelDifference) * 20;

    // Recent interactions (30% weight)
    const interactions = MOCK_DB.userInteractions.get(`${userId}-${program.id}`) || [];
    const recentInteractions = interactions.filter(i => {
      const daysSinceInteraction = (Date.now() - i.timestamp.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceInteraction <= 7; // Consider last 7 days
    });
    
    const interactionScore = recentInteractions.reduce((acc, interaction) => 
      acc + (interaction.weight * (1 - ((Date.now() - interaction.timestamp.getTime()) / (7 * 24 * 60 * 60 * 1000))))
    , 0);
    score += Math.min(interactionScore * 2, 30); // Cap at 30 points

    // Learning style compatibility (20% weight)
    const learningStyleMatch = program.topics.some(topic => {
      const topicStyle = {
        'AI': ['practical', 'theoretical'],
        'Database': ['practical'],
        'Frontend': ['visual', 'practical'],
        'No-Code': ['visual', 'practical']
      }[topic];
      return topicStyle?.includes(user.preferences.learningStyle);
    });
    score += learningStyleMatch ? 20 : 0;

    return { program, score };
  })
  .sort((a, b) => b.score - a.score)
  .map(({ program }) => program);
};

// Optimized helper functions
export const getMockEnrollments = () => MOCK_DB.enrollments;
export const getMockUsers = () => MOCK_DB.users;
export const getMockPrograms = () => MOCK_DB.programs;

export const getRecentEnrollments = () => {
  const now = Date.now();
  const oneHourAgo = now - 3600000;
  
  return MOCK_DB.enrollments
    .filter(e => e.enrolledAt.getTime() > oneHourAgo)
    .map(e => ({
      programName: MOCK_DB.programs.find(p => p.id === e.programId)?.name,
      userName: MOCK_DB.users.find(u => u.id === e.userId)?.name
    }));
};

export const getPopularPrograms = () => {
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  
  const programScores = MOCK_DB.enrollments
    .filter(e => e.enrolledAt.getTime() > oneWeekAgo)
    .reduce((acc, curr) => {
      acc[curr.programId] = (acc[curr.programId] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

  return Object.entries(programScores)
    .sort(([, a], [, b]) => b - a)
    .map(([programId]) => 
      MOCK_DB.programs.find(p => p.id === Number(programId))?.name
    )
    .filter(Boolean);
};
