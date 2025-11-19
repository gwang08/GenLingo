"use client";

import { useState } from "react";
import { Card, Radio, Button, Alert, Space, message, Spin } from "antd";
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  BulbOutlined,
  ThunderboltOutlined 
} from "@ant-design/icons";
import { GrammarQuestion } from "@/data/grammar/grammarCore";
import { generateMoreQuestions } from "@/lib/gemini";

interface GrammarQuizProps {
  questions: GrammarQuestion[];
  onComplete?: () => void;
  topicTitle?: string;
  topicDescription?: string;
}

export default function GrammarQuiz({ 
  questions: initialQuestions, 
  onComplete,
  topicTitle,
  topicDescription,
}: GrammarQuizProps) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowFeedback(true);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResult(true);
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleGenerateMore = async () => {
    if (!topicTitle || !topicDescription) {
      message.error("Không thể tạo câu hỏi mới cho chuyên đề này");
      return;
    }

    setIsGenerating(true);
    try {
      const newQuestions = await generateMoreQuestions(
        topicTitle,
        topicDescription,
        questions
      );
      setQuestions(newQuestions);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setScore(0);
      setShowResult(false);
      message.success("Đã tạo 10 câu hỏi mới! Bắt đầu làm thôi! 🚀");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      message.error("Không thể tạo câu hỏi mới. Vui lòng thử lại sau.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <Card className="max-w-3xl mx-auto text-center">
        <div className="py-8">
          <h2 className="text-3xl font-bold mb-4">Hoàn thành!</h2>
          <div className="text-6xl mb-4">
            {percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "💪"}
          </div>
          <p className="text-xl mb-2">
            Điểm số: <span className="font-bold text-blue-600">{score}/{questions.length}</span>
          </p>
          <p className="text-lg text-gray-600 mb-6">
            {percentage >= 80 ? "Xuất sắc!" : percentage >= 60 ? "Khá tốt!" : "Cần cố gắng thêm!"}
          </p>
          
          <Space size="middle" className="flex-wrap justify-center">
            <Button size="large" onClick={handleRetry}>
              Làm lại
            </Button>
            
            {topicTitle && topicDescription && (
              <Button
                type="primary"
                size="large"
                icon={isGenerating ? <Spin size="small" /> : <ThunderboltOutlined />}
                onClick={handleGenerateMore}
                loading={isGenerating}
                className="!bg-gradient-to-r from-purple-500 to-pink-500 hover:!from-purple-600 hover:!to-pink-600 border-0"
              >
                {isGenerating ? "Đang tạo..." : "Tạo 10 câu mới bằng AI"}
              </Button>
            )}
            
            <Button size="large" onClick={onComplete}>
              Hoàn thành
            </Button>
          </Space>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            Câu {currentIndex + 1}/{questions.length}
          </span>
          <span className="text-sm font-medium text-blue-600">
            Điểm: {score}/{questions.length}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>

      <Radio.Group
        value={selectedAnswer}
        onChange={(e) => setSelectedAnswer(e.target.value)}
        disabled={showFeedback}
        className="w-full"
      >
        <Space direction="vertical" className="w-full">
          {currentQuestion.options.map((option, index) => (
            <Radio key={index} value={index} className="w-full p-3 border rounded hover:bg-gray-50">
              <span className="font-medium mr-2">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </Radio>
          ))}
        </Space>
      </Radio.Group>

      {showFeedback && (
        <Alert
          className="mt-4"
          message={
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircleOutlined className="text-green-500" />
                  <span className="font-medium">Chính xác!</span>
                </>
              ) : (
                <>
                  <CloseCircleOutlined className="text-red-500" />
                  <span className="font-medium">
                    Chưa đúng. Đáp án đúng là: {String.fromCharCode(65 + currentQuestion.correctIndex)}
                  </span>
                </>
              )}
            </div>
          }
          description={
            <div className="flex items-start gap-2 mt-2">
              <BulbOutlined className="text-yellow-500 mt-1" />
              <span>{currentQuestion.explanation}</span>
            </div>
          }
          type={isCorrect ? "success" : "error"}
          showIcon={false}
        />
      )}

      <div className="mt-6 flex justify-end gap-2">
        {!showFeedback ? (
          <Button
            type="primary"
            size="large"
            onClick={handleAnswer}
            disabled={selectedAnswer === null}
          >
            Kiểm tra
          </Button>
        ) : (
          <Button type="primary" size="large" onClick={handleNext}>
            {isLastQuestion ? "Xem kết quả" : "Câu tiếp theo"}
          </Button>
        )}
      </div>
    </Card>
  );
}
