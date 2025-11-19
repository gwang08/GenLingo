"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, Row, Col, Button } from "antd";
import { BookOutlined, TrophyOutlined, RocketOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import DailyMiniLessonCard from "@/components/gamification/DailyMiniLessonCard";
import LeaderboardAI from "@/components/gamification/LeaderboardAI";
import { useUserStats } from "@/hooks/useUserStats";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { stats } = useUserStats();
  
  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const userScore = stats.correctAnswers * 10 + stats.streak * 50;

  return (
    <motion.div
      className="min-h-[calc(100vh-200px)]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Luyện thi tiếng Anh THPT 2025
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Học ngữ pháp theo chuyên đề, luyện quiz thông minh với AI
        </p>
        <div className="mt-6 flex justify-center">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <RocketOutlined className="text-6xl text-blue-500" />
          </motion.div>
        </div>
      </motion.div>

      {/* Daily Mini Lesson AI */}
      {isClient && (
        <motion.div className="mb-8" variants={itemVariants}>
          <DailyMiniLessonCard />
        </motion.div>
      )}

      <Row gutter={[24, 24]} className="max-w-4xl mx-auto w-full">
        <Col xs={24} md={12}>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/grammar" className="no-underline block h-full">
              <Card
                hoverable
                className="h-full text-center transition-all duration-300 hover:shadow-2xl"
              >
                <BookOutlined className="text-6xl text-blue-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Học Ngữ pháp theo chuyên đề
                </h2>
                <p className="text-gray-600 mb-6">
                  Nắm vững các chuyên đề ngữ pháp quan trọng với lý thuyết chi tiết, 
                  ví dụ minh họa và bài tập thực hành
                </p>
                <Button type="primary" size="large" block>
                  Bắt đầu học
                </Button>
              </Card>
            </Link>
          </motion.div>
        </Col>

        <Col xs={24} md={12}>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/quiz" className="no-underline block h-full">
              <Card
                hoverable
                className="h-full text-center transition-all duration-300 hover:shadow-2xl"
              >
                <TrophyOutlined className="text-6xl text-yellow-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Luyện Quiz nhanh
                </h2>
                <p className="text-gray-600 mb-6">
                  Kiểm tra kiến thức với các câu hỏi trắc nghiệm được chọn lọc kỹ càng, 
                  phù hợp với đề thi THPT
                </p>
                <Button type="primary" size="large" block className="!bg-yellow-500 hover:!bg-yellow-600">
                  Làm quiz ngay
                </Button>
              </Card>
            </Link>
          </motion.div>
        </Col>
      </Row>

      {/* Leaderboard AI */}
      {isClient && (
        <motion.div className="mt-8" variants={itemVariants}>
          <LeaderboardAI currentUserScore={userScore} />
        </motion.div>
      )}

      <motion.div className="mt-12 text-center" variants={itemVariants}>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
          <span className="text-sm font-medium text-gray-700">
            Hoàn toàn miễn phí - Tối ưu cho mobile - Không cần đăng ký
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
