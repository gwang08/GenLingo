"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Layout, Menu, Drawer, Button, Avatar, Dropdown, message } from "antd";
import { 
  HomeOutlined, 
  BookOutlined, 
  MenuOutlined, 
  CloseOutlined,
  ReadOutlined,
  LineChartOutlined,
  ThunderboltOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";

const { Header: AntHeader } = Layout;

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading, isAdmin } = useAuth();
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
      key: "/reading",
      icon: <ReadOutlined />,
      label: "Đọc hiểu",
    },
    {
      key: "/quiz",
      icon: <ThunderboltOutlined />,
      label: "Quiz",
    },
    {
      key: "/progress",
      icon: <LineChartOutlined />,
      label: "Tiến độ",
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    setMobileMenuOpen(false);
    router.push(e.key);
  };

  const handleLogout = async () => {
    try {
      await logout();
      message.success("Đăng xuất thành công!");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      message.error("Đăng xuất thất bại!");
    }
  };

  const userMenuItems = [
    ...(isAdmin ? [{
      key: "admin",
      icon: <DashboardOutlined />,
      label: "Admin Dashboard",
      onClick: () => router.push("/admin"),
    }] : []),
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: handleLogout,
    },
  ];

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
          <div className="desktop-menu flex items-center gap-4">
            <Menu
              mode="horizontal"
              selectedKeys={[pathname]}
              items={menuItems}
              onClick={handleMenuClick}
              className="border-0"
            />
            
            {/* User Menu */}
            {!loading && (
              user ? (
                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                  <Avatar
                    src={user.photoURL}
                    icon={<UserOutlined />}
                    className="cursor-pointer"
                  >
                    {user.displayName?.[0] || user.email?.[0]}
                  </Avatar>
                </Dropdown>
              ) : (
                <Button
                  type="primary"
                  icon={<LoginOutlined />}
                  onClick={() => router.push("/login")}
                >
                  Đăng nhập
                </Button>
              )
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <div className="mobile-menu-button flex items-center gap-2">
            {!loading && user && (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Avatar
                  src={user.photoURL}
                  icon={<UserOutlined />}
                  size="small"
                  className="cursor-pointer"
                >
                  {user.displayName?.[0] || user.email?.[0]}
                </Avatar>
              </Dropdown>
            )}
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
        
        {/* Mobile Login/Logout */}
        {!loading && !user && (
          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={() => {
              setMobileMenuOpen(false);
              router.push("/login");
            }}
            className="w-full mt-4"
          >
            Đăng nhập
          </Button>
        )}
      </Drawer>
    </AntHeader>
  );
}
