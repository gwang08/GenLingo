"use client";

import { Card, Button, Tag, Progress } from "antd";
import { TrophyOutlined, FireFilled, CheckCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { GrammarTopic } from "@/data/grammar/grammarCore";

interface DailyChallengeCardProps {
  topic: GrammarTopic;
  isCompleted: boolean;
  onComplete?: () => void;
}

export default function DailyChallengeCard({ 
  topic, 
  isCompleted 
}: DailyChallengeCardProps) {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  const timeLeft = midnight.getTime() - now.getTime();
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <TrophyOutlined className="text-4xl text-yellow-300" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold mb-1 text-white">
                Thử thách hôm nay
              </h3>
              <p className="text-purple-100 text-sm mb-0">
                Hoàn thành để nhận điểm thưởng!
              </p>
            </div>
          </div>
          
          {isCompleted ? (
            <Tag 
              icon={<CheckCircleOutlined />} 
              color="success" 
              className="text-base px-4 py-1"
            >
              Đã hoàn thành
            </Tag>
          ) : (
            <Tag 
              icon={<FireFilled />} 
              color="warning" 
              className="text-base px-4 py-1"
            >
              Chưa làm
            </Tag>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
          <h4 className="font-bold text-lg mb-2 text-white">{topic.title}</h4>
          <p className="text-purple-100 text-sm mb-3">
            {topic.shortDescription}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-purple-100">
            <span>{topic.quiz.length} câu hỏi</span>
            <span>•</span>
            <span>Bonus: +50 XP</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-purple-100 mb-2">
            <span>Thời gian còn lại</span>
            <span className="font-bold">{hoursLeft}h {minutesLeft}m</span>
          </div>
          <Progress
            percent={((24 * 60 - (hoursLeft * 60 + minutesLeft)) / (24 * 60)) * 100}
            strokeColor={{
              "0%": "#fbbf24",
              "100%": "#ef4444",
            }}
            showInfo={false}
            size={["100%", 8]}
          />
        </div>

        {!isCompleted && (
          <Link href={`/grammar/${topic.slug}`}>
            <Button 
              type="primary" 
              size="large" 
              block
              className="!bg-yellow-400 hover:!bg-yellow-500 !text-purple-900 font-bold border-0"
            >
              Bắt đầu thử thách
            </Button>
          </Link>
        )}
        
        {isCompleted && (
          <div className="text-center py-2 text-purple-100">
            🎉 Xuất sắc! Quay lại vào ngày mai nhé!
          </div>
        )}
      </Card>
    </motion.div>
  );
}
