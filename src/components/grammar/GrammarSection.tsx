"use client";

import { Card } from "antd";

interface GrammarSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function GrammarSection({ title, children, icon }: GrammarSectionProps) {
  return (
    <Card className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        {icon && <span className="text-2xl text-blue-500">{icon}</span>}
        <h2 className="text-xl font-bold text-gray-900 mb-0">{title}</h2>
      </div>
      <div className="text-gray-700">{children}</div>
    </Card>
  );
}
