import { GrammarQuestion, GrammarTopic, GRAMMAR_TOPICS } from "@/data/grammar/grammarCore";

/**
 * Lấy ngẫu nhiên N câu hỏi từ tất cả các topics với độ khó được chọn
 */
export function getRandomQuestions(
  count: number,
  difficulty: "easy" | "medium" | "hard" = "medium"
): GrammarQuestion[] {
  const allQuestions: GrammarQuestion[] = [];
  
  GRAMMAR_TOPICS.forEach((topic: GrammarTopic) => {
    allQuestions.push(...topic.quiz);
  });
  
  // Filter by difficulty if needed (for now, just shuffle all)
  // In future, you can add difficulty field to questions and filter here
  
  // Shuffle và lấy N câu
  const shuffled = allQuestions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Tính điểm quiz
 */
export function calculateScore(
  questions: GrammarQuestion[],
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
