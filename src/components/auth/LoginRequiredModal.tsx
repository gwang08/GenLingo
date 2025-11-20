"use client";

import { Modal, Button } from "antd";
import { LoginOutlined, UserAddOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface LoginRequiredModalProps {
  open: boolean;
  onCancel: () => void;
  feature?: string; // e.g., "Bài đọc", "Quiz", "Grammar"
}

export default function LoginRequiredModal({ 
  open, 
  onCancel,
  feature = "nội dung này" 
}: LoginRequiredModalProps) {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={420}
      className="login-required-modal"
    >
      <div className="text-center py-4">
        {/* Icon */}
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
            <LockOutlined className="text-4xl text-blue-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Yêu cầu đăng nhập
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Bạn cần đăng nhập để truy cập <span className="font-semibold text-blue-600">{feature}</span>
        </p>

        {/* Benefits */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
          <p className="font-semibold text-gray-900 mb-2">✨ Lợi ích khi đăng nhập:</p>
          <ul className="text-sm text-gray-700 space-y-1 mb-0">
            <li>📊 Theo dõi tiến độ học tập</li>
            <li>🏆 Mở khóa thành tích & phần thưởng</li>
            <li>🔥 Duy trì chuỗi ngày học liên tiếp</li>
            <li>📈 Xem thống kê chi tiết</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            type="primary"
            size="large"
            icon={<LoginOutlined />}
            onClick={handleLogin}
            className="w-full h-12 text-base font-semibold"
          >
            Đăng nhập
          </Button>

          <Button
            size="large"
            icon={<UserAddOutlined />}
            onClick={handleSignup}
            className="w-full h-12 text-base font-semibold"
          >
            Tạo tài khoản mới
          </Button>

          <Button
            type="text"
            onClick={onCancel}
            className="text-gray-500"
          >
            Quay lại
          </Button>
        </div>
      </div>
    </Modal>
  );
}
