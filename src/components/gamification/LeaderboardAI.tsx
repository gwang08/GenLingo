"use client";

import { useEffect, useState } from "react";
import { Card, Avatar, Tag, Spin, Alert } from "antd";
import { TrophyOutlined, CrownOutlined, FireOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { generateLeaderboard, LeaderboardUser } from "@/lib/gemini";
import { storage, STORAGE_KEYS } from "@/lib/storage";

interface LeaderboardProps {
  currentUserScore: number;
}

interface CachedLeaderboard {
  data: LeaderboardUser[];
  timestamp: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export default function LeaderboardAI({ currentUserScore }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadLeaderboard = async () => {
    try {
      // Check cache first
      const cached = storage.get<CachedLeaderboard | null>(STORAGE_KEYS.LEADERBOARD_CACHE, null);
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setLeaderboard(cached.data);
        setLoading(false);
        return;
      }

      // Generate new leaderboard
      setLoading(true);
      const data = await generateLeaderboard(currentUserScore);
      
      // Cache for 24h
      storage.set(STORAGE_KEYS.LEADERBOARD_CACHE, {
        data,
        timestamp: Date.now(),
      });
      
      setLeaderboard(data);
      setError(false);
    } catch (err) {
      console.error("Leaderboard error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <CrownOutlined className="text-yellow-500 text-xl" />;
    if (rank === 2) return <TrophyOutlined className="text-gray-400 text-xl" />;
    if (rank === 3) return <TrophyOutlined className="text-orange-400 text-xl" />;
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "from-yellow-400 to-orange-500";
    if (rank === 2) return "from-gray-300 to-gray-400";
    if (rank === 3) return "from-orange-300 to-orange-400";
    return "from-blue-50 to-purple-50";
  };

  if (loading) {
    return (
      <Card title={<><TrophyOutlined className="mr-2" />Bảng xếp hạng</>}>
        <div className="flex justify-center items-center py-12">
          <Spin size="large" tip="Đang tải bảng xếp hạng..." />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title={<><TrophyOutlined className="mr-2" />Bảng xếp hạng</>}>
        <Alert
          message="Không thể tải bảng xếp hạng"
          description="Vui lòng thử lại sau"
          type="warning"
          showIcon
        />
      </Card>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <span>
            <TrophyOutlined className="mr-2" />
            Bảng xếp hạng
          </span>
          <Tag color="blue">Top 10 • AI Generated</Tag>
        </div>
      }
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {leaderboard.map((user, index) => {
          const rank = index + 1;
          return (
            <motion.div
              key={user.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg bg-gradient-to-r ${getRankColor(rank)} border ${
                rank <= 3 ? "border-2 border-yellow-300" : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center justify-center w-8">
                    {getRankIcon(rank) || (
                      <span className="font-bold text-gray-600">#{rank}</span>
                    )}
                  </div>

                  <Avatar
                    size={40}
                    className={`${
                      rank === 1
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                        : rank === 2
                        ? "bg-gradient-to-r from-gray-400 to-gray-500"
                        : rank === 3
                        ? "bg-gradient-to-r from-orange-400 to-orange-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {user.avatar}
                  </Avatar>

                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{user.name}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Tag color="blue" className="!m-0">
                        Lv.{user.level}
                      </Tag>
                      <span className="flex items-center gap-1">
                        <FireOutlined className="text-orange-500" />
                        {user.streak} ngày
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold text-blue-600">
                    {user.score.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">điểm</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* User position */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar size={40} className="bg-green-500">
                YOU
              </Avatar>
              <div>
                <div className="font-semibold text-gray-800">Bạn</div>
                <div className="text-sm text-gray-600">Tiếp tục cố gắng!</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-green-600">
                {currentUserScore.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">điểm</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
