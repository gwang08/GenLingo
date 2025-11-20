"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Spin, Alert } from "antd";
import { ThunderboltOutlined, FireOutlined, RocketOutlined, BulbOutlined } from "@ant-design/icons";
import QuizRunner from "@/components/quiz/QuizRunner";
import { storage, STORAGE_KEYS } from "@/lib/storage";
import { DailyMiniLesson } from "@/lib/gemini";

type Difficulty = "easy" | "medium" | "hard";

function DailyQuizContent() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [dailyLesson, setDailyLesson] = useState<DailyMiniLesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load daily lesson from cache
    const timer = setTimeout(() => {
      const today = new Date().toISOString().split("T")[0];
      const cached = storage.get<{ lesson: DailyMiniLesson } | null>(
        STORAGE_KEYS.DAILY_LESSON_CACHE,
        null
      );
      
      if (cached && cached.lesson.date === today) {
        setDailyLesson(cached.lesson);
      }
      setLoading(false);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  if (!dailyLesson) {
    return (
      <div className="max-w-2xl mx-auto">
        <Alert
          message="Không tìm thấy bài học hôm nay"
          description="Vui lòng quay lại trang Tiến độ để xem bài học mini hôm nay."
          type="warning"
          showIcon
          action={
            <Button type="primary" onClick={() => router.push("/progress")}>
              Về trang Tiến độ
            </Button>
          }
        />
      </div>
    );
  }

  // Show difficulty selection first
  if (!difficulty) {
    return (
      <div>
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <BulbOutlined className="text-4xl text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-900 m-0">
              {dailyLesson.title}
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-2">
            {dailyLesson.description}
          </p>
          <p className="text-sm text-gray-500">
            {dailyLesson.quiz.length} câu hỏi • Bài học mini hôm nay
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              🎯 Chọn độ khó
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Độ khó sẽ ảnh hưởng đến cách AI giải thích câu trả lời
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card
                hoverable
                className="text-center cursor-pointer border-2 hover:border-green-500 hover:shadow-lg transition-all"
                onClick={() => setDifficulty("easy")}
              >
                <ThunderboltOutlined className="text-5xl text-green-500 mb-3" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dễ</h3>
                <p className="text-gray-600 text-sm mb-0">
                  Giải thích chi tiết, dễ hiểu cho người mới bắt đầu
                </p>
              </Card>

              <Card
                hoverable
                className="text-center cursor-pointer border-2 hover:border-yellow-500 hover:shadow-lg transition-all"
                onClick={() => setDifficulty("medium")}
              >
                <FireOutlined className="text-5xl text-yellow-500 mb-3" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Trung bình</h3>
                <p className="text-gray-600 text-sm mb-0">
                  Phù hợp học sinh lớp 11-12 THPT
                </p>
              </Card>

              <Card
                hoverable
                className="text-center cursor-pointer border-2 hover:border-red-500 hover:shadow-lg transition-all"
                onClick={() => setDifficulty("hard")}
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
    );
  }

  // Show quiz with selected difficulty
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <BulbOutlined className="text-3xl text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-900 m-0">
            Quiz: {dailyLesson.title}
          </h1>
        </div>
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-2">
            Độ khó: <span className="font-bold text-blue-600">
              {difficulty === "easy" ? "🟢 Dễ" : difficulty === "medium" ? "🟡 Trung bình" : "🔴 Khó"}
            </span>
          </p>
          <Button type="link" onClick={() => setDifficulty(null)} size="small">
            Đổi độ khó
          </Button>
        </div>
      </div>

      <QuizRunner
        questionCount={dailyLesson.quiz.length}
        difficulty={difficulty}
        dailyLessonQuiz={dailyLesson.quiz}
        topicTitle={dailyLesson.title}
        topicDescription={dailyLesson.description}
      />
    </div>
  );
}

export default function DailyQuizPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><Spin size="large" /></div>}>
      <DailyQuizContent />
    </Suspense>
  );
}
