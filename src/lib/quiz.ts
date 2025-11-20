import { generateQuizQuestions, QuizQuestion } from "./gemini";

/**
 * Tạo quiz mới bằng AI theo độ khó
 */
export async function generateQuiz(
  difficulty: "easy" | "medium" | "hard" = "medium",
  count: number = 10
): Promise<QuizQuestion[]> {
  return await generateQuizQuestions(difficulty, count);
}

/**
 * Tính điểm quiz
 */
export function calculateScore(
  questions: QuizQuestion[],
  answers: Record<string, number>
): number {
  let correct = 0;
  questions.forEach(q => {
    if (answers[q.id] === q.correctIndex) {
      correct++;
    }
  });
  return Math.round((correct / questions.length) * 100);
}
