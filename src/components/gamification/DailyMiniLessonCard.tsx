"use client";

import { useEffect, useState } from "react";
import { Card, Button, Tag, Spin, Alert, Modal } from "antd";
import { BulbOutlined, ThunderboltOutlined, BookOutlined, TrophyOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { generateDailyMiniLesson, DailyMiniLesson } from "@/lib/gemini";
import { storage, STORAGE_KEYS } from "@/lib/storage";
import Link from "next/link";

interface CachedLesson {
  lesson: DailyMiniLesson;
  timestamp: number;
}

export default function DailyMiniLessonCard() {
  const [lesson, setLesson] = useState<DailyMiniLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [completed, setCompleted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    loadLesson();
    checkCompleted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadLesson = async () => {
    try {
      // Check cache
      const cached = storage.get<CachedLesson | null>(STORAGE_KEYS.DAILY_LESSON_CACHE, null);
      
      if (cached && cached.lesson.date === today) {
        setLesson(cached.lesson);
        setLoading(false);
        return;
      }

      // Generate new lesson
      setLoading(true);
      const newLesson = await generateDailyMiniLesson(today);
      
      // Cache
      storage.set(STORAGE_KEYS.DAILY_LESSON_CACHE, {
        lesson: newLesson,
        timestamp: Date.now(),
      });
      
      setLesson(newLesson);
      setError(false);
    } catch (err) {
      console.error("Daily lesson error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const checkCompleted = () => {
    const completedDate = storage.get<string | null>("daily_lesson_completed", null);
    setCompleted(completedDate === today);
  };

  const handleComplete = () => {
    storage.set("daily_lesson_completed", today);
    setCompleted(true);
    setShowModal(false);
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-black border-0">
        <div className="flex justify-center items-center py-8">
          <Spin size="large" />
        </div>
      </Card>
    );
  }

  if (error || !lesson) {
    return (
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-black border-0">
        <Alert
          message="Không thể tải bài học hôm nay"
          description="Vui lòng thử lại sau"
          type="warning"
          showIcon
        />
      </Card>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-black border-0 shadow-xl"
          styles={{ body: { padding: "24px" } }}
        >
          <div className="flex items-start gap-3 mb-4">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <BulbOutlined className="text-4xl text-yellow-300" />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-black m-0">{lesson.title}</h3>
                <Tag color="orange" icon={<ThunderboltOutlined />}>
                  AI Generated
                </Tag>
              </div>
              <p className="text-gray-800 text-sm mb-0">Bài học mini hôm nay</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-black mb-2">{lesson.description}</p>
            <div className="p-3 bg-white bg-opacity-20 rounded-lg border border-white border-opacity-30">
              <div className="text-xs text-gray-800 mb-1">💡 ĐIỂM CHÍNH</div>
              <div className="font-semibold text-black">{lesson.keyPoint}</div>
            </div>
          </div>

          {!completed && (
            <Button
              type="primary"
              size="large"
              block
              icon={<BookOutlined />}
              onClick={() => setShowModal(true)}
              className="!bg-yellow-400 hover:!bg-yellow-500 !text-purple-900 font-bold border-0"
            >
              Xem bài học đầy đủ
            </Button>
          )}

          {completed && (
            <div className="text-center py-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 rounded-full">
                <TrophyOutlined className="text-yellow-300" />
                <span className="text-black font-medium">Đã hoàn thành!</span>
              </div>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Full Lesson Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <BulbOutlined className="text-yellow-500" />
            <span>{lesson.title}</span>
          </div>
        }
        open={showModal}
        onCancel={() => setShowModal(false)}
        width={700}
        footer={[
          <Button key="close" onClick={() => setShowModal(false)}>
            Đóng
          </Button>,
          <Button
            key="complete"
            type="primary"
            onClick={handleComplete}
            icon={<TrophyOutlined />}
          >
            Đánh dấu hoàn thành
          </Button>,
        ]}
      >
        <div className="py-4">
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">📚 Giải thích</h4>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {lesson.description}
              </ReactMarkdown>
            </div>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Điểm chính</h4>
            <div className="prose prose-sm max-w-none text-blue-800">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {lesson.keyPoint}
              </ReactMarkdown>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">📝 Ví dụ minh họa</h4>
            <div className="space-y-3">
              {lesson.examples.map((example, index) => (
                <div
                  key={index}
                  className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-400"
                >
                  <p className="text-gray-900 font-medium mb-1">EN: {example.en}</p>
                  <p className="text-gray-700 italic mb-0">VI: {example.vi}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-semibold text-yellow-900 mb-2">💭 Mẹo nhớ</h4>
            <div className="prose prose-sm max-w-none text-yellow-800">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {lesson.tip}
              </ReactMarkdown>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">
              🎯 Quiz nhanh ({lesson.quiz.length} câu)
            </h4>
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center">
              <p className="text-gray-700 mb-3">
                Sẵn sàng kiểm tra kiến thức vừa học?
              </p>
              <Link href="/daily-quiz">
                <Button type="primary" size="large" icon={<ThunderboltOutlined />}>
                  Bắt đầu Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
