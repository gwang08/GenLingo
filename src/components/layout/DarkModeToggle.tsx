"use client";

import { useState, useEffect } from "react";
import { Switch } from "antd";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";
import { storage, STORAGE_KEYS } from "@/lib/storage";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load theme after mount to prevent hydration mismatch
  useEffect(() => {
    // Use setTimeout to avoid cascading setState warning
    const timer = setTimeout(() => {
      const savedTheme = storage.get<string>(STORAGE_KEYS.THEME, "light");
      setIsDark(savedTheme === "dark");
      setMounted(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark, mounted]);

  const toggleTheme = (checked: boolean) => {
    setIsDark(checked);
    storage.set(STORAGE_KEYS.THEME, checked ? "dark" : "light");
  };

  // Render disabled switch during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <Switch
          checked={false}
          checkedChildren={<BulbFilled />}
          unCheckedChildren={<BulbOutlined />}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isDark}
        onChange={toggleTheme}
        checkedChildren={<BulbFilled />}
        unCheckedChildren={<BulbOutlined />}
      />
    </div>
  );
}
