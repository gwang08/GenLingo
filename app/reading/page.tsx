"use client";

import { useState } from "react";
import { Card, Button, Tag, Row, Col } from "antd";
import { BookOutlined, ThunderboltOutlined, FireOutlined } from "@ant-design/icons";
import ReadingTest from "@/components/reading/ReadingTest";
import { generateReadingTest } from "@/lib/gemini";
import type { ReadingPassage } from "@/data/reading/types";

// Danh sách chủ đề
const READING_TOPICS = [
  { id: "environment", title: "🌍 Môi trường & Khí hậu", emoji: "🌍", color: "green" },
  { id: "technology", title: "💻 Công nghệ & Đời sống", emoji: "💻", color: "blue" },
  { id: "education", title: "🎓 Giáo dục & Nghề nghiệp", emoji: "🎓", color: "purple" },
  { id: "health", title: "💪 Sức khỏe & Thể thao", emoji: "💪", color: "red" },
  { id: "culture", title: "🎭 Văn hóa & Du lịch", emoji: "🎭", color: "orange" },
  { id: "science", title: "🔬 Khoa học & Vũ trụ", emoji: "🔬", color: "cyan" },
  { id: "art", title: "🎨 Nghệ thuật & Sáng tạo", emoji: "🎨", color: "magenta" },
  { id: "history", title: "📜 Lịch sử & Phát minh", emoji: "📜", color: "gold" },
  { id: "wildlife", title: "🦁 Động vật & Thiên nhiên", emoji: "🦁", color: "lime" },
  { id: "society", title: "🏛️ Xã hội & Con người", emoji: "🏛️", color: "geekblue" },
];

export default function ReadingPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [passage, setPassage] = useState<ReadingPassage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTopicSelect = async (topicId: string) => {
    const topic = READING_TOPICS.find(t => t.id === topicId);
    if (!topic) return;

    setSelectedTopic(topicId);
    setIsLoading(true);
    setError(null);
    
    try {
      const newPassage = await generateReadingTest(topic.title);
      setPassage(newPassage);
    } catch (err) {
      console.error("Error generating reading test:", err);
      setError(err instanceof Error ? err.message : "Không thể tạo bài đọc. Vui lòng thử lại.");
      setSelectedTopic(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewTest = async () => {
    if (!selectedTopic) return;
    
    const topic = READING_TOPICS.find(t => t.id === selectedTopic);
    if (!topic) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const newPassage = await generateReadingTest(topic.title);
      setPassage(newPassage);
    } catch (err) {
      console.error("Error generating reading test:", err);
      setError(err instanceof Error ? err.message : "Không thể tạo bài đọc. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setPassage(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOutlined className="text-3xl text-blue-600" />
            <h1 className="text-3xl font-bold">Luyện đọc hiểu</h1>
          </div>
          <p className="text-gray-600">
            Chọn chủ đề và rèn luyện kỹ năng đọc hiểu theo format đề thi THPT Quốc Gia
          </p>
        </div>

        {/* Topic Selection */}
        {!selectedTopic && !passage && (
          <Card>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">📚 Chọn chủ đề bạn muốn luyện tập</h2>
              <p className="text-gray-600">
                AI sẽ tạo bài đọc hiểu 250-300 từ với 10 câu hỏi trắc nghiệm phù hợp THPT
              </p>
            </div>

            <Row gutter={[16, 16]}>
              {READING_TOPICS.map((topic) => (
                <Col xs={24} sm={12} md={8} key={topic.id}>
                  <Card
                    hoverable
                    className="h-full transition-all hover:shadow-lg"
                    onClick={() => handleTopicSelect(topic.id)}
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-3">{topic.emoji}</div>
                      <h3 className="font-semibold mb-2">{topic.title.split(" ").slice(1).join(" ")}</h3>
                      <Tag color={topic.color}>Click để bắt đầu</Tag>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <div className="flex items-start gap-3">
                <ThunderboltOutlined className="text-2xl text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">💡 Mẹo làm bài</h4>
                  <ul className="text-sm text-blue-800 mb-0 pl-4">
                    <li>Đọc lướt cả bài trước để nắm ý chính</li>
                    <li>Đọc kỹ câu hỏi trước khi tìm đáp án</li>
                    <li>Gạch chân từ khóa quan trọng</li>
                    <li>Loại trừ đáp án sai trước</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card>
            <div className="text-center py-12">
              <div className="inline-block">
                <FireOutlined className="text-6xl text-orange-500 animate-pulse mb-4" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI đang tạo bài đọc...</h3>
              <p className="text-gray-600 mb-4">
                Đang gen bài đọc {READING_TOPICS.find(t => t.id === selectedTopic)?.title.split(" ").slice(1).join(" ")}
              </p>
              <div className="flex justify-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card>
            <div className="text-center py-8">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold mb-2 text-red-600">Có lỗi xảy ra</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <div className="flex gap-3 justify-center">
                <Button onClick={handleBackToTopics}>
                  Chọn chủ đề khác
                </Button>
                <Button type="primary" onClick={() => selectedTopic && handleTopicSelect(selectedTopic)}>
                  Thử lại
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Reading Test */}
        {passage && !isLoading && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <Button onClick={handleBackToTopics}>
                ← Chọn chủ đề khác
              </Button>
              <Tag color="blue" className="text-sm">
                {READING_TOPICS.find(t => t.id === selectedTopic)?.emoji} {passage.topic}
              </Tag>
            </div>
            <ReadingTest 
              passage={passage} 
              onNewTest={handleNewTest}
              isLoadingNewTest={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
