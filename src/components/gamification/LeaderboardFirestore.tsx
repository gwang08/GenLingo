"use client";

import { useEffect, useState } from "react";
import { Card, Avatar, Tag, Spin, Alert, Empty } from "antd";
import { TrophyOutlined, CrownOutlined, FireOutlined, StarFilled } from "@ant-design/icons";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

interface LeaderboardUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  stats: {
    totalScore: number;
    streak: number;
    quizzesCompleted: number;
    perfectScores: number;
  };
}

export default function LeaderboardFirestore() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userRank, setUserRank] = useState<number | null>(null);
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    loadLeaderboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      
      // Get all users (no orderBy to avoid index requirement)
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      
      // Map and calculate totalScore for each user
      const users = snapshot.docs.map(doc => {
        const data = doc.data();
        const stats = data.stats || {};
        
        // Calculate totalScore if missing
        if (!stats.totalScore && stats.totalScore !== 0) {
          stats.totalScore = (
            (stats.correctAnswers || 0) * 10 +
            (stats.perfectScores || 0) * 50 +
            (stats.streak || 0) * 20 +
            (stats.quizzesCompleted || 0) * 25 +
            (stats.achievements?.length || 0) * 100
          );
        }
        
        return {
          uid: doc.id,
          displayName: data.displayName || '',
          email: data.email || '',
          photoURL: data.photoURL,
          stats: {
            totalScore: stats.totalScore || 0,
            streak: stats.streak || 0,
            quizzesCompleted: stats.quizzesCompleted || 0,
            perfectScores: stats.perfectScores || 0,
          }
        };
      }) as LeaderboardUser[];
      
      // Sort by totalScore client-side
      users.sort((a, b) => b.stats.totalScore - a.stats.totalScore);
      
      // Take top 10
      const top10 = users.slice(0, 10);
      setLeaderboard(top10);
      
      // Find current user's rank
      if (user) {
        const userIndex = users.findIndex(u => u.uid === user.uid);
        if (userIndex !== -1) {
          setUserRank(userIndex + 1);
          setUserScore(users[userIndex].stats.totalScore || 0);
        }
      }
      
      setError(false);
    } catch (err) {
      console.error("Leaderboard error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <CrownOutlined className="text-yellow-500 text-2xl" />;
    if (rank === 2) return <TrophyOutlined className="text-gray-400 text-2xl" />;
    if (rank === 3) return <TrophyOutlined className="text-orange-400 text-2xl" />;
    return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "from-yellow-50 to-yellow-100 border-yellow-300";
    if (rank === 2) return "from-gray-50 to-gray-100 border-gray-300";
    if (rank === 3) return "from-orange-50 to-orange-100 border-orange-300";
    return "from-white to-gray-50 border-gray-200";
  };

  if (loading) {
    return (
      <Card 
        title={
          <div className="flex items-center gap-2">
            <TrophyOutlined className="text-yellow-500" />
            <span>Bảng xếp hạng</span>
            <Tag color="blue">Top 10</Tag>
          </div>
        }
        className="shadow-lg"
      >
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Spin size="large" />
            <p className="mt-4 text-gray-500">Đang tải bảng xếp hạng...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card 
        title={
          <div className="flex items-center gap-2">
            <TrophyOutlined className="text-yellow-500" />
            <span>Bảng xếp hạng</span>
          </div>
        }
        className="shadow-lg"
      >
        <Alert
          message="Không thể tải bảng xếp hạng"
          description="Vui lòng thử lại sau hoặc kiểm tra kết nối"
          type="error"
          showIcon
        />
      </Card>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <Card 
        title={
          <div className="flex items-center gap-2">
            <TrophyOutlined className="text-yellow-500" />
            <span>Bảng xếp hạng</span>
          </div>
        }
        className="shadow-lg"
      >
        <Empty description="Chưa có dữ liệu xếp hạng" />
      </Card>
    );
  }

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <TrophyOutlined className="text-yellow-500" />
          <span>Bảng xếp hạng</span>
          <Tag color="blue">Top 10</Tag>
          <Tag color="green">Live</Tag>
        </div>
      }
      className="shadow-lg"
    >
      <div className="space-y-3">
        {leaderboard.map((player, index) => {
          const rank = index + 1;
          const isCurrentUser = user && player.uid === user.uid;
          
          return (
            <motion.div
              key={player.uid}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className={`flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r ${getRankColor(
                  rank
                )} border-2 transition-all duration-200 ${
                  isCurrentUser ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-12 text-center">
                  {getRankIcon(rank)}
                </div>

                {/* Avatar */}
                {player.photoURL ? (
                  <Avatar
                    size={48}
                    src={player.photoURL}
                    className="flex-shrink-0"
                  />
                ) : (
                  <Avatar
                    size={48}
                    style={{ 
                      backgroundColor: rank === 1 ? "#faad14" : 
                                     rank === 2 ? "#8c8c8c" : 
                                     rank === 3 ? "#fa8c16" : "#1890ff" 
                    }}
                    className="flex-shrink-0"
                  >
                    {player.displayName?.charAt(0) || player.email.charAt(0).toUpperCase()}
                  </Avatar>
                )}

                {/* Info */}
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">
                    {player.displayName || player.email.split("@")[0]}
                    {rank <= 3 && (
                      <StarFilled className="ml-2 text-yellow-500" />
                    )}
                    {isCurrentUser && (
                      <Tag color="blue" className="ml-2">Bạn</Tag>
                    )}
                  </h4>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FireOutlined className="text-orange-500" />
                      {player.stats?.streak || 0} ngày
                    </span>
                    <span>•</span>
                    <span>{player.stats?.quizzesCompleted || 0} quiz</span>
                    {player.stats?.perfectScores > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-green-600 font-semibold">
                          {player.stats.perfectScores} perfect
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Score */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {(player.stats?.totalScore || 0).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">XP</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Current user position (if not in top 10) */}
      {user && userRank && userRank > 10 && (
        <div className="mt-6 pt-4 border-t-2 border-dashed">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-2 border-blue-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar size={40} className="bg-blue-500">
                  {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <h4 className="font-bold text-gray-900">Bạn</h4>
                  <p className="text-sm text-gray-600 mb-0">
                    Hạng #{userRank} • Tiếp tục phấn đấu!
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-600">
                  {userScore.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">XP</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    
    </Card>
  );
}
