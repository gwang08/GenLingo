"use client";

import { useEffect } from "react";
import { Card, Button, Progress, Tag } from "antd";
import {
  TrophyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import confetti from "canvas-confetti";
import { QuizQuestion } from "@/lib/gemini";
import QuestionCard from "./QuestionCard";
import { playSuccessSound } from "@/lib/soundEffects";

interface QuizResultProps {
  questions: QuizQuestion[];
  answers: Record<string, number>;
  score: number;
  onRetry: () => void;
  onBackToHome: () => void;
}

export default function QuizResult({
  questions,
  answers,
  score,
  onRetry,
  onBackToHome,
}: QuizResultProps) {
  const correctCount = questions.filter(
    (q) => answers[q.id] === q.correctIndex
  ).length;

  useEffect(() => {
    if (score === 100) {
      // Perfect score - big celebration!
      playSuccessSound();
      
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 250);
    } else if (score >= 80) {
      // Good score - smaller celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [score]);

  const getScoreColor = (): "success" | "exception" | "normal" => {
    if (score >= 80) return "success";
    if (score >= 60) return "normal";
    return "exception";
  };

  const getScoreMessage = () => {
    if (score >= 80) return "Xuất sắc! Bạn đã nắm vững kiến thức! 🎉";
    if (score >= 60) return "Khá tốt! Hãy ôn lại những phần còn thiếu! 📚";
    return "Cần cố gắng thêm! Đừng bỏ cuộc nhé! 💪";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <div className="text-center">
          <TrophyOutlined className="text-6xl text-yellow-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Kết quả bài làm</h2>
          <p className="text-gray-600 mb-6">{getScoreMessage()}</p>

          <Progress
            type="circle"
            percent={score}
            size={150}
            status={getScoreColor()}
            format={(percent) => (
              <div>
                <div className="text-3xl font-bold">{percent}</div>
                <div className="text-sm text-gray-500">điểm</div>
              </div>
            )}
          />

          <div className="flex justify-center gap-8 mt-6">
            <div className="text-center">
              <CheckCircleOutlined className="text-2xl text-green-500 mb-2" />
              <div className="text-lg font-medium">{correctCount} đúng</div>
            </div>
            <div className="text-center">
              <CloseCircleOutlined className="text-2xl text-red-500 mb-2" />
              <div className="text-lg font-medium">
                {questions.length - correctCount} sai
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              size="large"
              onClick={onRetry}
            >
              Làm lại (AI tạo câu mới)
            </Button>
            
            <Button size="large" onClick={onBackToHome}>
              Về trang chủ
            </Button>
          </div>
        </div>
      </Card>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900">Chi tiết đáp án</h3>
        <p className="text-gray-600">Xem lại các câu hỏi và đáp án đúng</p>
      </div>

      {questions.map((question, index) => {
        const isCorrect = answers[question.id] === question.correctIndex;
        return (
          <div key={question.id} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <Tag color="success" icon={<CheckCircleOutlined />}>
                  Đúng
                </Tag>
              ) : (
                <Tag color="error" icon={<CloseCircleOutlined />}>
                  Sai
                </Tag>
              )}
            </div>
            <QuestionCard
              question={question}
              questionNumber={index + 1}
              selectedAnswer={answers[question.id] ?? null}
              onSelectAnswer={() => {}}
              disabled={true}
              showCorrect={true}
            />
          </div>
        );
      })}
    </div>
  );
}
