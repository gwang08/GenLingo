"use client";

import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { useUserStats } from "@/hooks/useUserStats";
import StatsCard from "@/components/gamification/StatsCard";
import StreakDisplay from "@/components/gamification/StreakDisplay";
import AchievementsGrid from "@/components/gamification/AchievementsGrid";
import AchievementUnlockModal from "@/components/gamification/AchievementUnlockModal";
import DailyMiniLessonCard from "@/components/gamification/DailyMiniLessonCard";
import LeaderboardFirestore from "@/components/gamification/LeaderboardFirestore";

export default function ProgressPage() {
  const [isClient, setIsClient] = useState(false);
  const { stats, newAchievements, clearNewAchievements } = useUserStats();

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Tiến độ học tập</h1>
        <p className="text-lg text-gray-700">
          Theo dõi thành tích và cải thiện kỹ năng tiếng Anh của bạn
        </p>
      </div>

      {/* Daily Mini Lesson AI */}
      {isClient && (
        <div className="mb-6">
          <DailyMiniLessonCard />
        </div>
      )}

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <StatsCard stats={stats} />
        </Col>
        <Col xs={24} lg={8}>
          <StreakDisplay
            currentStreak={stats.streak}
            longestStreak={stats.longestStreak}
          />
        </Col>
      </Row>

      <div className="mt-6">
        <AchievementsGrid stats={stats} />
      </div>

      {/* Real-time Leaderboard from Firestore */}
      {isClient && (
        <div className="mt-6">
          <LeaderboardFirestore />
        </div>
      )}

      <AchievementUnlockModal
        achievements={newAchievements}
        visible={newAchievements.length > 0}
        onClose={clearNewAchievements}
      />
    </div>
  );
}
