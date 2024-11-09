// Mock database with pre-computed data for faster access
const MOCK_DB = {
  users: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    joinedAt: new Date(Date.now() - Math.random() * 10000000000)
  })),
  
  enrollments: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    programId: Math.floor(Math.random() * 4) + 1,
    userId: Math.floor(Math.random() * 100) + 1,
    enrolledAt: new Date(Date.now() - Math.random() * 5000000000)
  })),

  programs: [
    { id: 1, name: "AI Prompt Engineering Mastery" },
    { id: 2, name: "AI + Supabase Integration" },
    { id: 3, name: "No-Code Development" },
    { id: 4, name: "Frontend Development with Low-Code" }
  ]
};

// Memoized functions for faster data access
export const getMockEnrollments = () => MOCK_DB.enrollments;
export const getMockUsers = () => MOCK_DB.users;
export const getMockPrograms = () => MOCK_DB.programs;

// Optimized functions for notifications
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
  const enrollmentCounts = MOCK_DB.enrollments.reduce((acc, curr) => {
    acc[curr.programId] = (acc[curr.programId] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return Object.entries(enrollmentCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([programId]) => 
      MOCK_DB.programs.find(p => p.id === Number(programId))?.name
    )
    .filter(Boolean);
};