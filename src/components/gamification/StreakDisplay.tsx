"use client";

import { Card, Progress, Tag } from "antd";
import { FireOutlined, TrophyOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
}

export default function StreakDisplay({ currentStreak, longestStreak }: StreakDisplayProps) {
  const getStreakColor = () => {
    if (currentStreak >= 30) return "#ff4d4f";
    if (currentStreak >= 7) return "#faad14";
    if (currentStreak >= 3) return "#52c41a";
    return "#1890ff";
  };

  const getMilestone = () => {
    if (currentStreak >= 30) return 30;
    if (currentStreak >= 7) return 7;
    if (currentStreak >= 3) return 3;
    return 0;
  };

  const getNextMilestone = () => {
    if (currentStreak < 3) return 3;
    if (currentStreak < 7) return 7;
    if (currentStreak < 30) return 30;
    return 365;
  };

  const milestone = getMilestone();
  const nextMilestone = getNextMilestone();
  const progress = ((currentStreak % nextMilestone) / nextMilestone) * 100;

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              scale: currentStreak > 0 ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            <FireOutlined className="text-3xl" style={{ color: getStreakColor() }} />
          </motion.div>
          <div>
            <h3 className="text-lg font-bold mb-0">Chuỗi học liên tục</h3>
            <p className="text-sm text-gray-500 mb-0">Tiếp tục phát huy!</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold" style={{ color: getStreakColor() }}>
            {currentStreak}
          </div>
          <div className="text-xs text-gray-500">ngày</div>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Tiến độ đến {nextMilestone} ngày</span>
          <span>{currentStreak}/{nextMilestone}</span>
        </div>
        <Progress
          percent={progress}
          strokeColor={getStreakColor()}
          showInfo={false}
          size={["100%", 12]}
        />
      </div>

      <div className="flex items-center gap-2">
        <Tag icon={<TrophyOutlined />} color="gold">
          Kỷ lục: {longestStreak} ngày
        </Tag>
        {milestone > 0 && (
          <Tag color={getStreakColor()}>
            {milestone >= 30 ? "Tháng vàng" : milestone >= 7 ? "Tuần hoàn hảo" : "3 ngày kiên trì"}
          </Tag>
        )}
      </div>
    </Card>
  );
}
