/**
 * Reading Comprehension Types
 * Format theo đề thi THPT Quốc Gia
 */

export interface ReadingQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ReadingPassage {
  id: string;
  title: string;
  passage: string;
  questions: ReadingQuestion[];
  topic?: string;
  difficulty?: "easy" | "medium" | "hard";
}

export interface ReadingTestResult {
  passageId: string;
  answers: Record<string, number>; // questionId -> selectedIndex
  score: number;
  correctCount: number;
  totalQuestions: number;
}
