"use client";

import { Layout } from "antd";
import Header from "./Header";
import Footer from "./Footer";

const { Content } = Layout;

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="!bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}
