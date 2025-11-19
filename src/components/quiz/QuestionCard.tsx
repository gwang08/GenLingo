"use client";

import { useState } from "react";
import { Card, Radio, Space, Button, Spin, Alert } from "antd";
import { BulbOutlined } from "@ant-design/icons";
import { GrammarQuestion } from "@/data/grammar/grammarCore";
import { explainAnswer } from "@/lib/gemini";

interface QuestionCardProps {
  question: GrammarQuestion;
  questionNumber: number;
  selectedAnswer: number | null;
  onSelectAnswer: (answer: number) => void;
  disabled?: boolean;
  showCorrect?: boolean;
}

export default function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onSelectAnswer,
  disabled = false,
  showCorrect = false,
}: QuestionCardProps) {
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const handleAIExplanation = async () => {
    if (selectedAnswer === null) return;
    
    setIsLoadingAI(true);
    const explanation = await explainAnswer(
      question.question,
      question.options[question.correctIndex],
      question.options[selectedAnswer]
    );
    setAiExplanation(explanation);
    setIsLoadingAI(false);
  };

  const getOptionClassName = (optionIndex: number) => {
    if (!showCorrect) return "p-3 border rounded hover:bg-gray-50";
    
    if (optionIndex === question.correctIndex) {
      return "p-3 border-2 border-green-500 bg-green-50 rounded";
    }
    if (optionIndex === selectedAnswer && selectedAnswer !== question.correctIndex) {
      return "p-3 border-2 border-red-500 bg-red-50 rounded";
    }
    return "p-3 border rounded";
  };

  return (
    <Card className="mb-4">
      <div className="mb-3">
        <span className="text-sm font-medium text-blue-600">Câu {questionNumber}</span>
      </div>
      
      <h3 className="text-base font-medium mb-4">{question.question}</h3>

      <Radio.Group
        value={selectedAnswer}
        onChange={(e) => onSelectAnswer(e.target.value)}
        disabled={disabled}
        className="w-full"
      >
        <Space direction="vertical" className="w-full">
          {question.options.map((option, index) => (
            <Radio
              key={index}
              value={index}
              className={getOptionClassName(index)}
            >
              <span className="font-medium mr-2">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </Radio>
          ))}
        </Space>
      </Radio.Group>

      {showCorrect && selectedAnswer !== question.correctIndex && (
        <div className="mt-3">
          <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded mb-2">
            <p className="text-sm text-gray-700 mb-0">
              <strong>Giải thích:</strong> {question.explanation}
            </p>
          </div>
          
          {!aiExplanation && !isLoadingAI && (
            <Button
              type="dashed"
              icon={<BulbOutlined />}
              onClick={handleAIExplanation}
              block
            >
              Giải thích thông minh bằng AI
            </Button>
          )}
          
          {isLoadingAI && (
            <div className="text-center p-4">
              <Spin tip="AI đang phân tích..." />
            </div>
          )}
          
          {aiExplanation && (
            <Alert
              message="Giải thích từ AI"
              description={aiExplanation}
              type="info"
              icon={<BulbOutlined />}
              className="mt-2"
            />
          )}
        </div>
      )}
    </Card>
  );
}
