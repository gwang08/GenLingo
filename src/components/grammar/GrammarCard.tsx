"use client";

import { useState } from "react";
import { Card, Tag } from "antd";
import { 
  BookOutlined, 
  CheckCircleOutlined, 
  ExperimentOutlined,
  QuestionCircleOutlined 
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GrammarTopic } from "@/data/grammar/grammarCore";
import { useAuth } from "@/contexts/AuthContext";
import LoginRequiredModal from "@/components/auth/LoginRequiredModal";

interface GrammarCardProps {
  topic: GrammarTopic;
}

export default function GrammarCard({ topic }: GrammarCardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    router.push(`/grammar/${topic.slug}`);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        onClick={handleClick}
        className="cursor-pointer"
      >
        <Card
          hoverable
          className="h-full transition-all duration-300 hover:shadow-xl"
        >
          <div className="flex items-start gap-4">
            <div className="text-blue-500 text-4xl flex-shrink-0">
              <BookOutlined />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {topic.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {topic.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2">
                <Tag icon={<CheckCircleOutlined />} color="success">
                  {topic.keyPoints.length} điểm chính
                </Tag>
                <Tag icon={<ExperimentOutlined />} color="processing">
                  {topic.examples.length} ví dụ
                </Tag>
                <Tag icon={<QuestionCircleOutlined />} color="warning">
                  {topic.quiz.length} câu hỏi
                </Tag>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <LoginRequiredModal
        open={showLoginModal}
        onCancel={() => setShowLoginModal(false)}
        feature="chuyên đề ngữ pháp"
      />
    </>
  );
}
