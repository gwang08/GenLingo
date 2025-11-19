import { UserStats } from "./storage";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (stats: UserStats) => boolean;
  unlocked: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_quiz",
    title: "Người mới bắt đầu",
    description: "Hoàn thành quiz đầu tiên",
    icon: "🎯",
    condition: (stats) => stats.quizzesCompleted >= 1,
    unlocked: false,
  },
  {
    id: "perfect_score",
    title: "Điểm tuyệt đối",
    description: "Đạt 100% trong một quiz",
    icon: "⭐",
    condition: (stats) => stats.perfectScores >= 1,
    unlocked: false,
  },
  {
    id: "streak_3",
    title: "Kiên trì 3 ngày",
    description: "Học liên tục 3 ngày",
    icon: "🔥",
    condition: (stats) => stats.streak >= 3,
    unlocked: false,
  },
  {
    id: "streak_7",
    title: "Tuần hoàn hảo",
    description: "Học liên tục 7 ngày",
    icon: "💪",
    condition: (stats) => stats.streak >= 7,
    unlocked: false,
  },
  {
    id: "streak_30",
    title: "Tháng vàng",
    description: "Học liên tục 30 ngày",
    icon: "👑",
    condition: (stats) => stats.streak >= 30,
    unlocked: false,
  },
  {
    id: "master_10",
    title: "Cao thủ ngữ pháp",
    description: "Hoàn thành 10 chuyên đề",
    icon: "📚",
    condition: (stats) => stats.topicsCompleted.length >= 10,
    unlocked: false,
  },
  {
    id: "quiz_master",
    title: "Quiz Master",
    description: "Hoàn thành 20 quiz",
    icon: "🏆",
    condition: (stats) => stats.quizzesCompleted >= 20,
    unlocked: false,
  },
  {
    id: "question_50",
    title: "50 câu hỏi",
    description: "Trả lời đúng 50 câu hỏi",
    icon: "💯",
    condition: (stats) => stats.correctAnswers >= 50,
    unlocked: false,
  },
  {
    id: "question_100",
    title: "Siêu sao THPT",
    description: "Trả lời đúng 100 câu hỏi",
    icon: "🌟",
    condition: (stats) => stats.correctAnswers >= 100,
    unlocked: false,
  },
  {
    id: "perfect_streak_5",
    title: "Thần đồng",
    description: "Đạt 100% trong 5 quiz liên tiếp",
    icon: "🎓",
    condition: (stats) => stats.perfectScores >= 5,
    unlocked: false,
  },
];

export function checkNewAchievements(stats: UserStats, previousStats: UserStats): Achievement[] {
  const newAchievements: Achievement[] = [];
  
  ACHIEVEMENTS.forEach(achievement => {
    const wasUnlocked = previousStats.achievements?.includes(achievement.id);
    const isNowUnlocked = achievement.condition(stats);
    
    if (!wasUnlocked && isNowUnlocked) {
      newAchievements.push(achievement);
    }
  });
  
  return newAchievements;
}
