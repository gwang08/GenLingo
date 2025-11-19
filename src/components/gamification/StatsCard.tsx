"use client";

import { Card, Row, Col, Statistic, Progress } from "antd";
import {
  CheckCircleOutlined,
  TrophyOutlined,
  FireOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { UserStats } from "@/lib/storage";

interface StatsCardProps {
  stats: UserStats;
}

export default function StatsCard({ stats }: StatsCardProps) {
  const accuracy = stats.totalQuestions > 0
    ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
    : 0;

  return (
    <Card title="Thống kê học tập">
      <Row gutter={[16, 16]}>
        <Col xs={12} md={6}>
          <Card className="text-center bg-blue-50">
            <Statistic
              title="Tổng câu hỏi"
              value={stats.totalQuestions}
              prefix={<BookOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        
        <Col xs={12} md={6}>
          <Card className="text-center bg-green-50">
            <Statistic
              title="Trả lời đúng"
              value={stats.correctAnswers}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Card>
        </Col>
        
        <Col xs={12} md={6}>
          <Card className="text-center bg-yellow-50">
            <Statistic
              title="Quiz hoàn thành"
              value={stats.quizzesCompleted}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
          </Card>
        </Col>
        
        <Col xs={12} md={6}>
          <Card className="text-center bg-red-50">
            <Statistic
              title="Chuỗi học"
              value={stats.streak}
              suffix="ngày"
              prefix={<FireOutlined />}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-700">Độ chính xác</span>
          <span className="font-bold text-blue-600">{accuracy}%</span>
        </div>
        <Progress
          percent={accuracy}
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          size={["100%", 12]}
        />
      </div>

      <Row gutter={16} className="mt-4">
        <Col span={12}>
          <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded">
            <div className="text-2xl font-bold text-purple-600">{stats.perfectScores}</div>
            <div className="text-sm text-gray-700">Điểm tuyệt đối</div>
          </div>
        </Col>
        <Col span={12}>
          <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded">
            <div className="text-2xl font-bold text-orange-600">{stats.topicsCompleted.length}</div>
            <div className="text-sm text-gray-700">Chuyên đề hoàn thành</div>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
