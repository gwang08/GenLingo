"use client";

import QuizRunner from "@/components/quiz/QuizRunner";

export default function QuizPage() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Quiz Tổng Hợp
        </h1>
        <p className="text-lg text-gray-600">
          Kiểm tra kiến thức của bạn với các câu hỏi được chọn ngẫu nhiên
        </p>
      </div>
      
      <QuizRunner questionCount={10} />
    </div>
  );
}
