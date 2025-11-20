"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Spin, message } from "antd";
import { generateQuiz, calculateScore } from "@/lib/quiz";
import { QuizQuestion } from "@/lib/gemini";
import { useUserStats } from "@/hooks/useUserStats";
import QuestionCard from "./QuestionCard";
import QuizResult from "./QuizResult";
import AchievementUnlockModal from "@/components/gamification/AchievementUnlockModal";

interface QuizRunnerProps {
  questionCount?: number;
  difficulty?: "easy" | "medium" | "hard";
}

export default function QuizRunner({ 
  questionCount = 10,
  difficulty = "medium",
}: QuizRunnerProps) {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { stats, updateStats, newAchievements, clearNewAchievements } = useUserStats();

  const loadQuestions = async () => {
    setIsLoading(true);
    setAnswers({});
    setShowResult(false);
    
    try {
      const newQuestions = await generateQuiz(difficulty, questionCount);
      setQuestions(newQuestions);
    } catch (error) {
      console.error("Error loading quiz:", error);
      message.error(error instanceof Error ? error.message : "Không thể tải câu hỏi. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleSubmit = () => {
    const finalScore = calculateScore(questions, answers);
    const correctAnswers = questions.filter((q) => answers[q.id] === q.correctIndex).length;
    
    // Update user stats
    updateStats({
      totalQuestions: stats.totalQuestions + questions.length,
      correctAnswers: stats.correctAnswers + correctAnswers,
      quizzesCompleted: stats.quizzesCompleted + 1,
      perfectScores: finalScore === 100 ? stats.perfectScores + 1 : stats.perfectScores,
    });
    
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isAllAnswered = questions.every((q) => answers[q.id] !== undefined);
  const score = showResult ? calculateScore(questions, answers) : 0;

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
        <Spin size="large" />
        <p className="text-gray-600">AI đang tạo câu hỏi cho bạn...</p>
      </div>
    );
  }

  if (showResult) {
    return (
      <>
        <QuizResult
          questions={questions}
          answers={answers}
          score={score}
          onRetry={loadQuestions}
          onBackToHome={() => router.push("/")}
        />
        <AchievementUnlockModal
          achievements={newAchievements}
          visible={newAchievements.length > 0}
          onClose={clearNewAchievements}
        />
      </>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Quiz AI - Độ khó {difficulty === "easy" ? "Dễ" : difficulty === "medium" ? "Trung bình" : "Khó"}
        </h2>
        <p className="text-gray-600">
          Hoàn thành {questions.length} câu hỏi được AI tạo riêng cho bạn
        </p>
        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <p className="text-sm text-gray-700 mb-0">
            <strong>Đã trả lời:</strong> {Object.keys(answers).length}/{questions.length} câu
          </p>
        </div>
      </div>

      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          question={question}
          questionNumber={index + 1}
          selectedAnswer={answers[question.id] ?? null}
          onSelectAnswer={(answer) => handleAnswerSelect(question.id, answer)}
        />
      ))}

      <div className="sticky bottom-0 bg-white border-t shadow-lg p-4 mt-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {Object.keys(answers).length}/{questions.length} câu đã hoàn thành
          </span>
          <Button
            type="primary"
            size="large"
            onClick={handleSubmit}
            disabled={!isAllAnswered}
          >
            Nộp bài
          </Button>
        </div>
      </div>
      
      <AchievementUnlockModal
        achievements={newAchievements}
        visible={newAchievements.length > 0}
        onClose={clearNewAchievements}
      />
    </div>
  );
}
