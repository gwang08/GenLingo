import { GrammarTopic } from "./types";

export const MODAL_VERBS_TOPIC: GrammarTopic = {
  slug: "modal-verbs",
  title: "Động từ khuyết thiếu (Modal Verbs)",
  shortDescription: "Can, could, may, might, must, should, ought to - cách dùng và phân biệt",
  keyPoints: [
    "Can/Could: khả năng, yêu cầu lịch sự (Could lịch sự hơn Can)",
    "May/Might: khả năng, xin phép (Might ít chắc chắn hơn May)",
    "Must: bắt buộc, chắc chắn (mustn't = không được phép)",
    "Should/Ought to: nên làm gì (lời khuyên)",
    "Don't have to: không cần thiết (khác với mustn't)",
  ],
  examples: [
    {
      en: "I can swim very well.",
      vi: "Tôi có thể bơi rất tốt. (khả năng)",
    },
    {
      en: "You must wear a helmet when riding a motorbike.",
      vi: "Bạn phải đội mũ bảo hiểm khi đi xe máy. (bắt buộc)",
    },
    {
      en: "You should study harder for the exam.",
      vi: "Bạn nên học chăm hơn cho kỳ thi. (lời khuyên)",
    },
    {
      en: "It might rain tomorrow.",
      vi: "Trời có thể sẽ mưa ngày mai. (khả năng không chắc chắn)",
    },
  ],
  quiz: [
    {
      id: "modal-1",
      question: "You _____ smoke in the hospital.",
      options: ["mustn't", "don't have to", "shouldn't", "can't"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'mustn't' (không được phép - cấm).",
    },
    {
      id: "modal-2",
      question: "_____ you speak English?",
      options: ["Can", "Must", "Should", "May"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'Can' (hỏi về khả năng).",
    },
    {
      id: "modal-3",
      question: "You _____ come to the party if you don't want to.",
      options: ["mustn't", "don't have to", "can't", "shouldn't"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'don't have to' (không cần thiết, không bắt buộc).",
    },
    {
      id: "modal-4",
      question: "_____ I borrow your pen?",
      options: ["Can", "Must", "Should", "Ought"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'Can' (xin phép lịch sự).",
    },
    {
      id: "modal-5",
      question: "You _____ see a doctor. You look very tired.",
      options: ["can", "must", "should", "may"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'should' (lời khuyên).",
    },
    {
      id: "modal-6",
      question: "She _____ be at home. I saw her car outside.",
      options: ["can", "could", "must", "should"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'must' (chắc chắn - suy đoán logic).",
    },
    {
      id: "modal-7",
      question: "_____ you help me with this homework?",
      options: ["Could", "Must", "Should", "May"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'Could' (yêu cầu lịch sự).",
    },
    {
      id: "modal-8",
      question: "Students _____ wear uniforms to school.",
      options: ["can", "must", "may", "might"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'must' (bắt buộc).",
    },
    {
      id: "modal-9",
      question: "It _____ snow tomorrow. The weather is very cold.",
      options: ["can", "must", "should", "might"],
      correctIndex: 3,
      explanation: "Đáp án đúng là 'might' (khả năng có thể xảy ra).",
    },
    {
      id: "modal-10",
      question: "You _____ to apologize to her.",
      options: ["ought", "must", "can", "may"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'ought' (ought to = should - nên làm).",
    },
  ],
};
