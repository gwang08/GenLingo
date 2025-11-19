"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Menu } from "antd";
import { HomeOutlined, BookOutlined, TrophyOutlined } from "@ant-design/icons";
import DarkModeToggle from "./DarkModeToggle";

const { Header: AntHeader } = Layout;

export default function Header() {
  const pathname = usePathname();

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link href="/">Trang chủ</Link>,
    },
    {
      key: "/grammar",
      icon: <BookOutlined />,
      label: <Link href="/grammar">Ngữ pháp</Link>,
    },
    {
      key: "/quiz",
      icon: <TrophyOutlined />,
      label: <Link href="/quiz">Luyện Quiz</Link>,
    },
    {
      key: "/progress",
      icon: <TrophyOutlined />,
      label: <Link href="/progress">Tiến độ</Link>,
    },
  ];

  return (
    <AntHeader className="!bg-white !px-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600 no-underline">
          THPT 2025
        </Link>
        <div className="flex items-center gap-4">
          <Menu
            mode="horizontal"
            selectedKeys={[pathname]}
            items={menuItems}
            className="border-0 flex-1 min-w-0"
          />
          <DarkModeToggle />
        </div>
      </div>
    </AntHeader>
  );
}
