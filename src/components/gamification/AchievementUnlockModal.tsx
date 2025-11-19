"use client";

import { Modal, Card, Button, Spin } from "antd";
import { TrophyOutlined, CloseOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { Achievement } from "@/lib/achievements";
import { generateAchievementMessage } from "@/lib/gemini";

interface AchievementUnlockModalProps {
  achievements: Achievement[];
  visible: boolean;
  onClose: () => void;
}

export default function AchievementUnlockModal({
  achievements,
  visible,
  onClose,
}: AchievementUnlockModalProps) {
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && achievements.length > 0) {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Generate AI messages
      generateMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, achievements]);

  const generateMessages = async () => {
    setLoading(true);
    const newMessages: Record<string, string> = {};

    for (const achievement of achievements) {
      try {
        const message = await generateAchievementMessage(
          achievement.title,
          achievement.description
        );
        newMessages[achievement.id] = message;
      } catch {
        newMessages[achievement.id] = achievement.description;
      }
    }

    setMessages(newMessages);
    setLoading(false);
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      width={500}
    >
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="text-center">
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 0.6 }}
              >
                <TrophyOutlined className="text-6xl text-yellow-500 mb-4" />
              </motion.div>

              <h2 className="text-2xl font-bold mb-2">Thành tích mới!</h2>
              <p className="text-gray-600 mb-4">
                Chúc mừng bạn đã mở khóa {achievements.length} thành tích mới!
              </p>

              {loading ? (
                <div className="py-8">
                  <Spin size="large" tip="Đang tạo lời chúc mừng..." />
                </div>
              ) : (
                <div className="space-y-3 mb-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50">
                        <div className="flex items-start gap-3">
                          <div className="text-4xl">{achievement.icon}</div>
                          <div className="text-left flex-1">
                            <h4 className="font-bold mb-2">{achievement.title}</h4>
                            <p className="text-sm text-gray-700 mb-0 leading-relaxed">
                              {messages[achievement.id] || achievement.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              <Button
                type="primary"
                size="large"
                icon={<CloseOutlined />}
                onClick={onClose}
                block
                disabled={loading}
              >
                Tiếp tục học
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
