"use client";

import Link from "next/link";
import { Card, Row, Col, Button } from "antd";
import { BookOutlined, TrophyOutlined, RocketOutlined, ReadOutlined } from "@ant-design/icons";
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
  const { stats } = useUserStats();

  const userScore = stats.correctAnswers * 10 + stats.streak * 50;

  return (
    <motion.div
      className="min-h-[calc(100vh-200px)]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="text-center mb-6" variants={itemVariants}>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Luyện thi tiếng Anh THPT 2025
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Học ngữ pháp theo chuyên đề, luyện quiz thông minh với AI
        </p>
        <div className="mt-4 flex justify-center">
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
            <RocketOutlined className="text-5xl text-blue-500" />
          </motion.div>
        </div>
      </motion.div>

      {/* Daily Mini Lesson AI */}
      <motion.div className="mb-6" variants={itemVariants}>
        <DailyMiniLessonCard />
      </motion.div>

      <Row gutter={[24, 24]} className="max-w-6xl mx-auto w-full">
        <Col xs={24} sm={12} lg={8}>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="h-full">
            <Link href="/grammar" className="no-underline block h-full">
              <Card
                hoverable
                className="h-full text-center transition-all duration-300 hover:shadow-2xl flex flex-col"
                style={{ minHeight: '320px' }}
                bodyStyle={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '32px 24px' }}
              >
                <div className="flex flex-col h-full">
                  <BookOutlined className="text-6xl text-blue-500 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Ngữ pháp
                  </h2>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    Học theo chuyên đề với lý thuyết chi tiết, ví dụ minh họa và bài tập thực hành. Bao gồm 9 chủ đề ngữ pháp quan trọng nhất cho kỳ thi THPT.
                  </p>
                  <Button type="primary" size="large" block>
                    Bắt đầu học
                  </Button>
                </div>
              </Card>
            </Link>
          </motion.div>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="h-full">
            <Link href="/reading" className="no-underline block h-full">
              <Card
                hoverable
                className="h-full text-center transition-all duration-300 hover:shadow-2xl flex flex-col"
                style={{ minHeight: '320px' }}
                bodyStyle={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '32px 24px' }}
              >
                <div className="flex flex-col h-full">
                  <ReadOutlined className="text-6xl text-green-500 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Đọc hiểu
                  </h2>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    Luyện với bài đọc 250-300 từ và 10 câu hỏi đa dạng theo format đề thi THPT. AI tạo nội dung mới mỗi lần với 10 chủ đề khác nhau.
                  </p>
                  <Button type="primary" size="large" block className="!bg-green-500 hover:!bg-green-600">
                    Bắt đầu luyện
                  </Button>
                </div>
              </Card>
            </Link>
          </motion.div>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="h-full">
            <Link href="/quiz" className="no-underline block h-full">
              <Card
                hoverable
                className="h-full text-center transition-all duration-300 hover:shadow-2xl flex flex-col"
                style={{ minHeight: '320px' }}
                bodyStyle={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '32px 24px' }}
              >
                <div className="flex flex-col h-full">
                  <TrophyOutlined className="text-6xl text-yellow-500 mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Quiz nhanh
                  </h2>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    Kiểm tra kiến thức với câu hỏi trắc nghiệm đa dạng. AI tạo câu hỏi phù hợp với trình độ của bạn và giải thích chi tiết mỗi đáp án.
                  </p>
                  <Button type="primary" size="large" block className="!bg-yellow-500 hover:!bg-yellow-600">
                    Làm quiz ngay
                  </Button>
                </div>
              </Card>
            </Link>
          </motion.div>
        </Col>
      </Row>

      {/* Leaderboard AI */}
      <motion.div className="mt-6" variants={itemVariants}>
        <LeaderboardAI currentUserScore={userScore} />
      </motion.div>

      <motion.div className="mt-8 text-center" variants={itemVariants}>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full">
          <span className="text-sm font-medium text-gray-700">
            Hoàn toàn miễn phí - Tối ưu cho mobile - Không cần đăng ký
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
