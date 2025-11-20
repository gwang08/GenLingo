"use client";

import { useState, useEffect } from "react";
import { Card, Radio, Button, Progress, Alert, Spin, Tag, Space } from "antd";
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  TrophyOutlined,
  ReloadOutlined,
  ThunderboltOutlined 
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import confetti from "canvas-confetti";
import type { ReadingPassage } from "@/data/reading/types";
import { playCorrectSound, playIncorrectSound, playSuccessSound } from "@/lib/soundEffects";

interface ReadingTestProps {
  passage: ReadingPassage;
  onNewTest: () => void;
  isLoadingNewTest?: boolean;
}

export default function ReadingTest({ passage, onNewTest, isLoadingNewTest = false }: ReadingTestProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < passage.questions.length) {
      alert("Vui lòng trả lời hết tất cả câu hỏi!");
      return;
    }
    setSubmitted(true);

    // Play sound effects
    const correctCount = passage.questions.filter(
      (q) => answers[q.id] === q.correctIndex
    ).length;
    const score = Math.round((correctCount / passage.questions.length) * 100);

    if (score === 100) {
      playSuccessSound();
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });
    } else if (score >= 70) {
      playCorrectSound();
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowExplanations({});
  };

  const toggleExplanation = (questionId: string) => {
    setShowExplanations({
      ...showExplanations,
      [questionId]: !showExplanations[questionId],
    });
  };

  const correctCount = passage.questions.filter(
    (q) => answers[q.id] === q.correctIndex
  ).length;
  const score = Math.round((correctCount / passage.questions.length) * 100);
  const allAnswered = Object.keys(answers).length === passage.questions.length;

  // Play sounds when showing results
  useEffect(() => {
    if (submitted) {
      passage.questions.forEach((q) => {
        if (answers[q.id] !== undefined) {
          const isCorrect = answers[q.id] === q.correctIndex;
          if (!isCorrect) {
            setTimeout(() => playIncorrectSound(), 100);
          }
        }
      });
    }
  }, [submitted, answers, passage.questions]);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <Card className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{passage.title}</h2>
            {passage.topic && (
              <Tag color="blue">{passage.topic}</Tag>
            )}
          </div>
          {submitted && (
            <div className="text-right">
              <div className="text-3xl font-bold mb-1" style={{ color: score >= 70 ? "#52c41a" : score >= 50 ? "#faad14" : "#ff4d4f" }}>
                {score}%
              </div>
              <div className="text-sm text-gray-500">
                {correctCount}/{passage.questions.length} câu đúng
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {!submitted && (
          <Progress
            percent={Math.round((Object.keys(answers).length / passage.questions.length) * 100)}
            status="active"
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
          />
        )}
      </Card>

      {/* Reading Passage */}
      <Card title="📖 Đoạn văn" className="mb-6">
        <div className="prose prose-lg max-w-none">
          <div style={{ lineHeight: "1.8", fontSize: "16px" }}>
            {passage.passage.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>
      </Card>

      {/* Questions */}
      <div className="space-y-4 mb-6">
        {passage.questions.map((question, qIndex) => {
          const isAnswered = answers[question.id] !== undefined;
          const isCorrect = answers[question.id] === question.correctIndex;
          const showResult = submitted && isAnswered;

          return (
            <Card
              key={question.id}
              className={`${
                showResult
                  ? isCorrect
                    ? "border-green-500 border-2"
                    : "border-red-500 border-2"
                  : ""
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="flex-1">
                  <span className="font-semibold text-blue-600">Câu {qIndex + 1}:</span>
                  <p className="mt-2 text-base">{question.question}</p>
                </div>
                {showResult && (
                  <div className="ml-4">
                    {isCorrect ? (
                      <CheckCircleOutlined className="text-2xl text-green-500" />
                    ) : (
                      <CloseCircleOutlined className="text-2xl text-red-500" />
                    )}
                  </div>
                )}
              </div>

              <Radio.Group
                value={answers[question.id]}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                disabled={submitted}
                className="w-full"
              >
                <Space direction="vertical" className="w-full">
                  {question.options.map((option, optIndex) => {
                    const isSelected = answers[question.id] === optIndex;
                    const isCorrectOption = optIndex === question.correctIndex;
                    
                    let className = "p-3 border rounded hover:bg-gray-50";
                    if (showResult) {
                      if (isCorrectOption) {
                        className = "p-3 border-2 border-green-500 bg-green-50 rounded";
                      } else if (isSelected && !isCorrect) {
                        className = "p-3 border-2 border-red-500 bg-red-50 rounded";
                      } else {
                        className = "p-3 border rounded opacity-60";
                      }
                    }

                    return (
                      <Radio key={optIndex} value={optIndex} className={className}>
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        {option}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>

              {/* Explanation */}
              {showResult && (
                <div className="mt-4">
                  <Button
                    type="link"
                    onClick={() => toggleExplanation(question.id)}
                    className="p-0"
                  >
                    {showExplanations[question.id] ? "Ẩn giải thích" : "Xem giải thích"}
                  </Button>
                  
                  {showExplanations[question.id] && (
                    <Alert
                      message="Giải thích"
                      description={
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {question.explanation}
                          </ReactMarkdown>
                        </div>
                      }
                      type="info"
                      className="mt-2"
                    />
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <Card>
        {!submitted ? (
          <Button
            type="primary"
            size="large"
            onClick={handleSubmit}
            disabled={!allAnswered}
            block
            icon={<CheckCircleOutlined />}
          >
            {allAnswered ? "Nộp bài" : `Đã trả lời ${Object.keys(answers).length}/${passage.questions.length} câu`}
          </Button>
        ) : (
          <div className="space-y-3">
            {/* Result Summary */}
            <Alert
              message={
                score === 100 ? (
                  <span className="flex items-center gap-2">
                    <TrophyOutlined /> Xuất sắc! Điểm tuyệt đối!
                  </span>
                ) : score >= 70 ? (
                  "Khá tốt! Tiếp tục phát huy!"
                ) : score >= 50 ? (
                  "Cố gắng hơn nữa nhé!"
                ) : (
                  "Hãy học thêm và làm lại!"
                )
              }
              type={score >= 70 ? "success" : score >= 50 ? "warning" : "error"}
              showIcon
            />

            <div className="grid grid-cols-2 gap-3">
              <Button
                size="large"
                onClick={handleReset}
                icon={<ReloadOutlined />}
                block
              >
                Làm lại
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={onNewTest}
                loading={isLoadingNewTest}
                icon={<ThunderboltOutlined />}
                block
              >
                Bài mới
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
