"use client";

import { Divider, Tag } from "antd";
import { useRouter } from "next/navigation";
import {
  BookOutlined,
  ExperimentOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { GrammarTopic } from "@/data/grammar/grammarCore";
import GrammarSection from "./GrammarSection";
import GrammarQuiz from "./GrammarQuiz";

interface GrammarDetailProps {
  topic: GrammarTopic;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function GrammarDetail({ topic }: GrammarDetailProps) {
  const router = useRouter();
  
  return (
    <motion.div
      className="max-w-5xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <motion.div className="mb-8" variants={itemVariants}>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{topic.title}</h1>
        <p className="text-lg text-gray-600">{topic.shortDescription}</p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <GrammarSection title="Điểm chính" icon={<BookOutlined />}>
          <ul className="space-y-2">
            {topic.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <Tag color="blue" className="mt-1">
                  {index + 1}
                </Tag>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </GrammarSection>
      </motion.div>

      <motion.div variants={itemVariants}>
        <GrammarSection title="Ví dụ minh họa" icon={<ExperimentOutlined />}>
          <div className="space-y-4">
            {topic.examples.map((example, index) => (
              <motion.div
                key={index}
                className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-400"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-gray-900 font-medium mb-2">EN: {example.en}</p>
                <p className="text-gray-700 italic">VI: {example.vi}</p>
              </motion.div>
            ))}
          </div>
        </GrammarSection>
      </motion.div>

      <Divider />

      <motion.div variants={itemVariants}>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <QuestionCircleOutlined className="text-blue-500" />
            Luyện tập ngay
          </h2>
          <p className="text-gray-600 mt-2">
            Kiểm tra kiến thức của bạn với {topic.quiz.length} câu hỏi
          </p>
        </div>

        <GrammarQuiz 
          questions={topic.quiz} 
          topicTitle={topic.title}
          topicDescription={topic.shortDescription}
          onComplete={() => router.push("/")}
        />
      </motion.div>
    </motion.div>
  );
}
