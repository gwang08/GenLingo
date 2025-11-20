"use client";

import { useState } from "react";
import { Form, Input, Button, Typography, Divider, message } from "antd";
import { GoogleOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Title, Text } = Typography;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const isAdmin = await login(values.email, values.password);
      message.success("Đăng nhập thành công!");
      
      // Redirect based on role
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      const err = error as { code?: string };
      if (err.code === "auth/invalid-credential") {
        message.error("Email hoặc mật khẩu không đúng!");
      } else if (err.code === "auth/user-not-found") {
        message.error("Tài khoản không tồn tại!");
      } else if (err.code === "auth/wrong-password") {
        message.error("Mật khẩu không đúng!");
      } else {
        message.error("Đăng nhập thất bại. Vui lòng thử lại!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const isAdmin = await loginWithGoogle();
      message.success("Đăng nhập Google thành công!");
      
      // Redirect based on role
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error: unknown) {
      console.error("Google login error:", error);
      message.error("Đăng nhập Google thất bại. Vui lòng thử lại!");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <Title level={2} className="text-center mb-6">
        Đăng nhập
      </Title>

      <Button
        type="default"
        size="large"
        icon={<GoogleOutlined />}
        onClick={handleGoogleLogin}
        loading={googleLoading}
        className="w-full mb-4"
      >
        Đăng nhập với Google
      </Button>

      <Divider>Hoặc</Divider>

      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="your@email.com"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Mật khẩu"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="w-full"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>

      <Text className="block text-center">
        Chưa có tài khoản?{" "}
        <Link href="/signup" className="text-blue-500 hover:text-blue-600">
          Đăng ký ngay
        </Link>
      </Text>
    </div>
  );
}
