"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Layout, Menu, Drawer, Button } from "antd";
import { HomeOutlined, BookOutlined, TrophyOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Trang chủ",
    },
    {
      key: "/grammar",
      icon: <BookOutlined />,
      label: "Ngữ pháp",
    },
    {
      key: "/quiz",
      icon: <TrophyOutlined />,
      label: "Luyện Quiz",
    },
    {
      key: "/progress",
      icon: <TrophyOutlined />,
      label: "Tiến độ",
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    setMobileMenuOpen(false);
    router.push(e.key);
  };

  return (
    <AntHeader className="!bg-white !px-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={120}
            className="object-contain"
          />
       
        </Link>

        {/* Desktop Menu */}
        {!isMobile && (
          <div className="desktop-menu">
            <Menu
              mode="horizontal"
              selectedKeys={[pathname]}
              items={menuItems}
              onClick={handleMenuClick}
              className="border-0"
            />
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <div className="mobile-menu-button">
            <Button
              type="text"
              icon={<MenuOutlined className="text-xl" />}
              onClick={() => setMobileMenuOpen(true)}
              className="!p-2"
            />
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
        }
        placement="top"
        closable={false}
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        height="auto"
        className="mobile-menu-drawer"
      >
        <Menu
          mode="vertical"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-0"
        />
      </Drawer>
    </AntHeader>
  );
}
