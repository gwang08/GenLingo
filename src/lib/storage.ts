// LocalStorage utilities
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },
};

// User stats type
export interface UserStats {
  totalQuestions: number;
  correctAnswers: number;
  topicsCompleted: string[];
  quizzesCompleted: number;
  perfectScores: number;
  lastActive: string;
  streak: number;
  longestStreak: number;
  achievements: string[];
  dailyChallengeCompleted: boolean;
  soundEnabled: boolean;
  totalScore: number; // NEW: Tổng điểm XP
}

export const defaultUserStats: UserStats = {
  totalQuestions: 0,
  correctAnswers: 0,
  topicsCompleted: [],
  quizzesCompleted: 0,
  perfectScores: 0,
  lastActive: new Date().toISOString().split("T")[0],
  streak: 0,
  longestStreak: 0,
  achievements: [],
  dailyChallengeCompleted: false,
  soundEnabled: true,
  totalScore: 0, // NEW
};

// Calculate total score based on stats
export function calculateTotalScore(stats: UserStats): number {
  return (
    stats.correctAnswers * 10 +        // 10 XP per correct answer
    stats.perfectScores * 50 +          // 50 XP bonus for perfect quiz
    stats.streak * 20 +                 // 20 XP per streak day
    stats.quizzesCompleted * 25 +       // 25 XP per quiz completed
    stats.achievements.length * 100     // 100 XP per achievement
  );
}

export const STORAGE_KEYS = {
  USER_STATS: "thpt_user_stats",
  DAILY_CHALLENGE: "thpt_daily_challenge",
  LEADERBOARD_CACHE: "thpt_leaderboard_cache",
  DAILY_LESSON_CACHE: "thpt_daily_lesson_cache",
} as const;
