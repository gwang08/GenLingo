"use client";

import { Card, Avatar, Tag, Empty } from "antd";
import { 
  TrophyOutlined, 
  CrownOutlined,
  StarFilled 
} from "@ant-design/icons";
import { motion } from "framer-motion";

interface LeaderboardPlayer {
  id: number;
  name: string;
  score: number;
  streak: number;
  avatar: string;
}

// Mock Vietnamese names and data
const MOCK_LEADERBOARD: LeaderboardPlayer[] = [
  { id: 1, name: "Nguyễn Văn An", score: 2850, streak: 45, avatar: "#1890ff" },
  { id: 2, name: "Trần Thị Bình", score: 2720, streak: 38, avatar: "#52c41a" },
  { id: 3, name: "Lê Hoàng Cường", score: 2650, streak: 42, avatar: "#faad14" },
  { id: 4, name: "Phạm Thu Dương", score: 2580, streak: 35, avatar: "#eb2f96" },
  { id: 5, name: "Võ Minh Em", score: 2490, streak: 30, avatar: "#722ed1" },
  { id: 6, name: "Đỗ Thị Hoa", score: 2420, streak: 28, avatar: "#fa8c16" },
  { id: 7, name: "Hoàng Văn Giang", score: 2350, streak: 25, avatar: "#13c2c2" },
  { id: 8, name: "Bùi Thu Hằng", score: 2280, streak: 22, avatar: "#2f54eb" },
  { id: 9, name: "Ngô Quang Huy", score: 2210, streak: 20, avatar: "#f5222d" },
  { id: 10, name: "Đinh Thị Lan", score: 2150, streak: 18, avatar: "#fa541c" },
];

interface LeaderboardProps {
  currentUserScore?: number;
}

export default function Leaderboard({ currentUserScore = 0 }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <CrownOutlined className="text-yellow-500 text-2xl" />;
      case 2:
        return <TrophyOutlined className="text-gray-400 text-2xl" />;
      case 3:
        return <TrophyOutlined className="text-orange-600 text-2xl" />;
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-50 to-yellow-100 border-yellow-300";
      case 2:
        return "from-gray-50 to-gray-100 border-gray-300";
      case 3:
        return "from-orange-50 to-orange-100 border-orange-300";
      default:
        return "from-white to-gray-50 border-gray-200";
    }
  };

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
      {MOCK_LEADERBOARD.length === 0 ? (
        <Empty description="Chưa có dữ liệu xếp hạng" />
      ) : (
        <div className="space-y-3">
          {MOCK_LEADERBOARD.map((player, index) => {
            const rank = index + 1;
            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className={`flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r ${getRankColor(
                    rank
                  )} border-2 transition-all duration-200`}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 text-center">
                    {getRankIcon(rank)}
                  </div>

                  {/* Avatar */}
                  <Avatar
                    size={48}
                    style={{ backgroundColor: player.avatar }}
                    className="flex-shrink-0"
                  >
                    {player.name.charAt(0)}
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">
                      {player.name}
                      {rank <= 3 && (
                        <StarFilled className="ml-2 text-yellow-500" />
                      )}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>Streak: {player.streak} ngày</span>
                      <span>•</span>
                      <span>{player.score} XP</span>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {player.score.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">điểm</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {currentUserScore > 0 && (
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
                  B
                </Avatar>
                <div>
                  <h4 className="font-bold text-gray-900">Bạn</h4>
                  <p className="text-sm text-gray-600 mb-0">
                    Tiếp tục phấn đấu!
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-600">
                  {currentUserScore.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">điểm của bạn</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-gray-500">
        Cập nhật mỗi ngày lúc 00:00
      </div>
    </Card>
  );
}
