"use client";

import { Layout } from "antd";
import { HeartFilled } from "@ant-design/icons";

const { Footer: AntFooter } = Layout;

export default function Footer() {
  return (
    <AntFooter className="!bg-gray-50 text-center !py-6">
      <p className="text-gray-600 mb-0">
        Made with <HeartFilled className="text-red-500" /> cho kỳ thi THPT Quốc Gia 2025
      </p>
      <p className="text-gray-400 text-sm mt-2 mb-0">
        {new Date().getFullYear()} - Luyện thi tiếng Anh THPT
      </p>
    </AntFooter>
  );
}
