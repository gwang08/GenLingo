import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App } from "antd";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/contexts/AuthContext";
import AppShell from "@/components/layout/AppShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luyện thi Tiếng Anh THPT 2025",
  description: "Ứng dụng học tiếng Anh cho kỳ thi THPT Quốc Gia 2025 - Ngữ pháp và Quiz",
  manifest: "/manifest.json",
  themeColor: "#1890ff",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "THPT English 2025",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#1890ff",
                borderRadius: 8,
                colorText: "#171717",
                colorTextSecondary: "#525252",
                colorTextTertiary: "#737373",
              },
            }}
          >
            <App>
              <AuthProvider>
                <AppShell>{children}</AppShell>
              </AuthProvider>
            </App>
          </ConfigProvider>
        </AntdRegistry>
        <Analytics />
      </body>
    </html>
  );
}
