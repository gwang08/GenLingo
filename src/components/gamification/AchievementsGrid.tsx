"use client";

import { Card, Badge, Empty, Tabs } from "antd";
import { TrophyOutlined, LockOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { UserStats } from "@/lib/storage";

interface AchievementsGridProps {
  stats: UserStats;
}

export default function AchievementsGrid({ stats }: AchievementsGridProps) {
  const unlockedAchievements = ACHIEVEMENTS.filter(a =>
    stats.achievements.includes(a.id)
  );
  
  const lockedAchievements = ACHIEVEMENTS.filter(a =>
    !stats.achievements.includes(a.id)
  );

  const AchievementCard = ({ achievement, unlocked }: { achievement: typeof ACHIEVEMENTS[0]; unlocked: boolean }) => (
    <motion.div
      whileHover={{ scale: unlocked ? 1.05 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <Badge.Ribbon
        text={unlocked ? "Đã mở khóa" : "Bị khóa"}
        color={unlocked ? "gold" : "gray"}
      >
        <Card
          className={`h-full ${unlocked ? "bg-gradient-to-br from-yellow-50 to-orange-50" : "bg-gray-50 opacity-60"}`}
        >
          <div className="text-center">
            <div className={`text-5xl mb-3 ${!unlocked && "grayscale"}`}>
              {unlocked ? achievement.icon : <LockOutlined />}
            </div>
            <h4 className="font-bold mb-2">{achievement.title}</h4>
            <p className="text-sm text-gray-600 mb-0">
              {achievement.description}
            </p>
          </div>
        </Card>
      </Badge.Ribbon>
    </motion.div>
  );

  const tabItems = [
    {
      key: "all",
      label: `Tất cả (${ACHIEVEMENTS.length})`,
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACHIEVEMENTS.map(achievement => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              unlocked={stats.achievements.includes(achievement.id)}
            />
          ))}
        </div>
      ),
    },
    {
      key: "unlocked",
      label: `Đã mở (${unlockedAchievements.length})`,
      children: unlockedAchievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockedAchievements.map(achievement => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              unlocked={true}
            />
          ))}
        </div>
      ) : (
        <Empty description="Chưa có thành tích nào được mở khóa" />
      ),
    },
    {
      key: "locked",
      label: `Chưa mở (${lockedAchievements.length})`,
      children: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockedAchievements.map(achievement => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              unlocked={false}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <TrophyOutlined className="text-yellow-500" />
          <span>Thành tích ({unlockedAchievements.length}/{ACHIEVEMENTS.length})</span>
        </div>
      }
    >
      <Tabs items={tabItems} />
    </Card>
  );
}
