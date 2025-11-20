"use client";

import { useEffect, useState } from "react";
import { Card, Table, Statistic, Row, Col, Button, message } from "antd";
import { UserOutlined, TeamOutlined, TrophyOutlined, DownloadOutlined } from "@ant-design/icons";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Timestamp;
  lastLogin: Timestamp;
  stats: {
    totalQuestions: number;
    correctAnswers: number;
    quizzesCompleted: number;
  };
  deviceInfo: {
    platform: string;
  };
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    recentUsers: 0,
    totalQuizzes: 0,
    avgAccuracy: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersRef = collection(db, "users");
      const q = query(usersRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      
      const userData = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      })) as UserData[];

      setUsers(userData);

      // Calculate stats
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const recentUsers = userData.filter(user => {
        const createdAt = user.createdAt?.toDate();
        return createdAt && createdAt >= sevenDaysAgo;
      }).length;

      const totalQuizzes = userData.reduce((sum, user) => 
        sum + (user.stats?.quizzesCompleted || 0), 0
      );

      // Calculate average accuracy
      const totalQuestions = userData.reduce((sum, user) => 
        sum + (user.stats?.totalQuestions || 0), 0
      );
      const totalCorrect = userData.reduce((sum, user) => 
        sum + (user.stats?.correctAnswers || 0), 0
      );
      const avgAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

      setStats({
        totalUsers: userData.length,
        recentUsers,
        totalQuizzes,
        avgAccuracy,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Không thể tải dữ liệu người dùng!");
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data - User Growth (last 30 days)
  const getUserGrowthData = () => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    const userCounts = last30Days.map(date => {
      return users.filter(user => {
        const userDate = user.createdAt?.toDate().toISOString().split('T')[0];
        return userDate === date;
      }).length;
    });

    return {
      labels: last30Days.map(d => new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })),
      datasets: [
        {
          label: 'Người dùng mới',
          data: userCounts,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
        },
      ],
    };
  };

  // Platform distribution
  const getPlatformData = () => {
    const platforms = users.reduce((acc, user) => {
      const platform = user.deviceInfo?.platform || 'Unknown';
      acc[platform] = (acc[platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      labels: Object.keys(platforms),
      datasets: [
        {
          data: Object.values(platforms),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
          ],
        },
      ],
    };
  };

  // Overall Quiz Stats - TỔNG TẤT CẢ USER THEO THỜI GIAN
  const getQuizStatsData = () => {
    // Lấy 30 ngày gần nhất
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    // Tính tích lũy theo từng ngày
    const dailyStats = last30Days.map(date => {
      // Lọc user đã tạo account trước hoặc vào ngày này
      const usersUpToDate = users.filter(user => {
        const userDate = user.createdAt?.toDate().toISOString().split('T')[0];
        return userDate && userDate <= date;
      });

      // Tổng quiz của tất cả user đến ngày này
      const totalQuizzes = usersUpToDate.reduce((sum, user) => 
        sum + (user.stats?.quizzesCompleted || 0), 0
      );

      // Tổng câu hỏi và câu đúng
      const totalQuestions = usersUpToDate.reduce((sum, user) => 
        sum + (user.stats?.totalQuestions || 0), 0
      );
      const totalCorrect = usersUpToDate.reduce((sum, user) => 
        sum + (user.stats?.correctAnswers || 0), 0
      );
      const accuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

      return {
        totalQuizzes,
        accuracy,
      };
    });

    return {
      labels: last30Days.map(d => new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })),
      datasets: [
        {
          label: 'Tổng Quiz hoàn thành',
          data: dailyStats.map(s => s.totalQuizzes),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.2)',
          yAxisID: 'y',
          tension: 0.4,
        },
        {
          label: 'Tỷ lệ đúng trung bình (%)',
          data: dailyStats.map(s => s.accuracy),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          yAxisID: 'y1',
          tension: 0.4,
        },
      ],
    };
  };

  const exportEmails = () => {
    const emails = users.map(u => u.email).join("\n");
    const blob = new Blob([emails], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "user-emails.txt";
    a.click();
    URL.revokeObjectURL(url);
    message.success("Đã xuất danh sách email!");
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "Tên",
      dataIndex: "displayName",
      key: "displayName",
      width: 180,
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (date: Timestamp) => date?.toDate().toLocaleDateString("vi-VN"),
    },
    {
      title: "Đăng nhập lần cuối",
      dataIndex: "lastLogin",
      key: "lastLogin",
      width: 150,
      render: (date: Timestamp) => date?.toDate().toLocaleDateString("vi-VN"),
    },
    {
      title: "Quiz hoàn thành",
      dataIndex: ["stats", "quizzesCompleted"],
      key: "quizzesCompleted",
      width: 120,
      render: (val: number) => val || 0,
    },
    {
      title: "Tổng câu hỏi",
      dataIndex: ["stats", "totalQuestions"],
      key: "totalQuestions",
      width: 120,
      render: (val: number) => val || 0,
    },
    {
      title: "Câu đúng",
      dataIndex: ["stats", "correctAnswers"],
      key: "correctAnswers",
      width: 100,
      render: (val: number) => val || 0,
    },
    {
      title: "Nền tảng",
      dataIndex: ["deviceInfo", "platform"],
      key: "platform",
      width: 100,
    },
  ];

  return (
    <ProtectedRoute requireAdmin>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>
        
        {/* Statistics Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng người dùng"
                value={stats.totalUsers}
                prefix={<TeamOutlined />}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Người dùng mới (7 ngày)"
                value={stats.recentUsers}
                prefix={<UserOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng quiz hoàn thành"
                value={stats.totalQuizzes}
                prefix={<TrophyOutlined />}
                valueStyle={{ color: "#cf1322" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tỷ lệ đúng trung bình"
                value={stats.avgAccuracy}
                suffix="%"
                prefix={<TrophyOutlined />}
                valueStyle={{ color: "#faad14" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Charts Row */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} lg={16}>
            <Card title="📈 Người dùng mới (30 ngày qua)" loading={loading}>
              <Line 
                data={getUserGrowthData()} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                }}
              />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="💻 Nền tảng sử dụng" loading={loading}>
              <Doughnut 
                data={getPlatformData()}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'bottom' as const,
                    },
                  },
                }}
              />
            </Card>
          </Col>
        </Row>

        {/* Overall Quiz Stats Chart */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24}>
            <Card title={`🏆 Tổng thống kê Quiz (Tất cả ${users.length} người dùng)`} loading={loading}>
              <Line 
                data={getQuizStatsData()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  interaction: {
                    mode: 'index' as const,
                    intersect: false,
                  },
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                  },
                  scales: {
                    y: {
                      type: 'linear' as const,
                      display: true,
                      position: 'left' as const,
                      title: {
                        display: true,
                        text: 'Số lượng Quiz',
                      },
                      beginAtZero: true,
                    },
                    y1: {
                      type: 'linear' as const,
                      display: true,
                      position: 'right' as const,
                      title: {
                        display: true,
                        text: 'Tỷ lệ đúng (%)',
                      },
                      grid: {
                        drawOnChartArea: false,
                      },
                      min: 0,
                      max: 100,
                    },
                  },
                }}
                height={300}
              />
            </Card>
          </Col>
        </Row>

        {/* Users Table */}
        <Card
          title="👥 Danh sách người dùng"
          extra={
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={exportEmails}
              disabled={users.length === 0}
            >
              Xuất Email
            </Button>
          }
        >
          <Table
            columns={columns}
            dataSource={users}
            rowKey="uid"
            loading={loading}
            pagination={{ pageSize: 20 }}
            scroll={{ x: 1200 }}
          />
        </Card>
      </div>
    </ProtectedRoute>
  );
}
