"use client";

import { useState, Suspense } from "react";
import { Button, Card, Spin } from "antd";
import { ThunderboltOutlined, FireOutlined, RocketOutlined } from "@ant-design/icons";
import QuizRunner from "@/components/quiz/QuizRunner";
import LoginRequiredModal from "@/components/auth/LoginRequiredModal";
import { useAuth } from "@/contexts/AuthContext";

type Difficulty = "easy" | "medium" | "hard";

function QuizPageContent() {
  const { user } = useAuth();
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleDifficultySelect = (selectedDifficulty: Difficulty) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setDifficulty(selectedDifficulty);
  };

  if (!difficulty) {
    return (
      <>
        <div>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Quiz Tổng Hợp
            </h1>
            <p className="text-lg text-gray-600">
              Kiểm tra kiến thức của bạn với các câu hỏi được chọn ngẫu nhiên
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                📝 Chọn độ khó
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Chọn mức độ phù hợp với trình độ của bạn
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                  hoverable
                  className="text-center cursor-pointer border-2 hover:border-green-500 hover:shadow-lg transition-all"
                  onClick={() => handleDifficultySelect("easy")}
                >
                  <ThunderboltOutlined className="text-5xl text-green-500 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Dễ</h3>
                  <p className="text-gray-600 text-sm mb-0">
                    Câu hỏi cơ bản, phù hợp người mới bắt đầu
                  </p>
                </Card>

                <Card
                  hoverable
                  className="text-center cursor-pointer border-2 hover:border-yellow-500 hover:shadow-lg transition-all"
                  onClick={() => handleDifficultySelect("medium")}
                >
                  <FireOutlined className="text-5xl text-yellow-500 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Trung bình</h3>
                  <p className="text-gray-600 text-sm mb-0">
                    Câu hỏi ở mức độ lớp 11-12 THPT
                  </p>
                </Card>

                <Card
                  hoverable
                  className="text-center cursor-pointer border-2 hover:border-red-500 hover:shadow-lg transition-all"
                  onClick={() => handleDifficultySelect("hard")}
                >
                  <RocketOutlined className="text-5xl text-red-500 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Khó</h3>
                  <p className="text-gray-600 text-sm mb-0">
                    Câu hỏi nâng cao, ôn thi THPT Quốc gia
                  </p>
                </Card>
              </div>
            </Card>
          </div>
        </div>

        <LoginRequiredModal
          open={showLoginModal}
          onCancel={() => setShowLoginModal(false)}
          feature="quiz tổng hợp"
        />
      </>
    );
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Quiz Tổng Hợp
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Độ khó: <span className="font-bold text-blue-600">
            {difficulty === "easy" ? "Dễ" : difficulty === "medium" ? "Trung bình" : "Khó"}
          </span>
        </p>
        <Button type="link" onClick={() => setDifficulty(null)} size="small">
          Đổi độ khó
        </Button>
      </div>

      <QuizRunner
        questionCount={10}
        difficulty={difficulty}
      />
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><Spin size="large" /></div>}>
      <QuizPageContent />
    </Suspense>
  );
}
