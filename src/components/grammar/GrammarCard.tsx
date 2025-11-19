"use client";

import { Card, Tag } from "antd";
import { 
  BookOutlined, 
  CheckCircleOutlined, 
  ExperimentOutlined,
  QuestionCircleOutlined 
} from "@ant-design/icons";
import Link from "next/link";
import { motion } from "framer-motion";
import { GrammarTopic } from "@/data/grammar/grammarCore";

interface GrammarCardProps {
  topic: GrammarTopic;
}

export default function GrammarCard({ topic }: GrammarCardProps) {
  return (
    <Link href={`/grammar/${topic.slug}`} className="no-underline">
      <motion.div
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
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
    </Link>
  );
}
