"use client";

import { useState } from "react";
import { Form, Input, Button, Typography, Divider, message } from "antd";
import { GoogleOutlined, MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Title, Text } = Typography;

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string; displayName: string }) => {
    setLoading(true);
    try {
      await signup(values.email, values.password, values.displayName);
      message.success("Đăng ký thành công!");
      router.push("/");
    } catch (error: unknown) {
      console.error("Signup error:", error);
      const err = error as { code?: string };
      if (err.code === "auth/email-already-in-use") {
        message.error("Email đã được sử dụng!");
      } else if (err.code === "auth/weak-password") {
        message.error("Mật khẩu quá yếu! Vui lòng dùng mật khẩu mạnh hơn.");
      } else {
        message.error("Đăng ký thất bại. Vui lòng thử lại!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      message.success("Đăng ký Google thành công!");
      router.push("/");
    } catch (error: unknown) {
      console.error("Google signup error:", error);
      message.error("Đăng ký Google thất bại. Vui lòng thử lại!");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <Title level={2} className="text-center mb-6">
        Đăng ký
      </Title>

      <Button
        type="default"
        size="large"
        icon={<GoogleOutlined />}
        onClick={handleGoogleSignup}
        loading={googleLoading}
        className="w-full mb-4"
      >
        Đăng ký với Google
      </Button>

      <Divider>Hoặc</Divider>

      <Form
        name="signup"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="displayName"
          label="Họ và tên"
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Nguyễn Văn A"
            size="large"
          />
        </Form.Item>

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
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Mật khẩu (tối thiểu 6 ký tự)"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập lại mật khẩu"
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
            Đăng ký
          </Button>
        </Form.Item>
      </Form>

      <Text className="block text-center">
        Đã có tài khoản?{" "}
        <Link href="/login" className="text-blue-500 hover:text-blue-600">
          Đăng nhập
        </Link>
      </Text>
    </div>
  );
}
