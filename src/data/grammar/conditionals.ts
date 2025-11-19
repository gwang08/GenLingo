import { GrammarTopic } from "./types";

export const CONDITIONALS_TOPIC: GrammarTopic = {
  slug: "conditionals",
  title: "Câu điều kiện",
  shortDescription: "Các loại câu điều kiện từ Type 0 đến Type 3 - điểm ngữ pháp quan trọng trong đề thi",
  keyPoints: [
    "Type 0: If + Present Simple, Present Simple (Sự thật hiển nhiên)",
    "Type 1: If + Present Simple, will + V (Có thể xảy ra trong tương lai)",
    "Type 2: If + Past Simple, would + V (Không có thật ở hiện tại)",
    "Type 3: If + Past Perfect, would have + V3 (Không có thật trong quá khứ)",
  ],
  examples: [
    {
      en: "If you heat water to 100°C, it boils.",
      vi: "Nếu bạn đun nước đến 100°C, nó sôi. (Type 0 - sự thật)",
    },
    {
      en: "If it rains tomorrow, I will stay home.",
      vi: "Nếu trời mưa ngày mai, tôi sẽ ở nhà. (Type 1 - có thể xảy ra)",
    },
    {
      en: "If I had a million dollars, I would travel the world.",
      vi: "Nếu tôi có một triệu đô la, tôi sẽ đi du lịch thế giới. (Type 2 - không có thật hiện tại)",
    },
    {
      en: "If I had studied harder, I would have passed the exam.",
      vi: "Nếu tôi đã học chăm hơn, tôi đã qua kỳ thi. (Type 3 - không có thật quá khứ)",
    },
  ],
  quiz: [
    {
      id: "cond-1",
      question: "If it _____ tomorrow, we will cancel the picnic.",
      options: ["rain", "rains", "rained", "would rain"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'rains'. Câu điều kiện loại 1: If + Present Simple, will + V.",
    },
    {
      id: "cond-2",
      question: "If I _____ you, I would apologize.",
      options: ["am", "was", "were", "will be"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'were'. Câu điều kiện loại 2 với 'I', ta dùng 'were' thay vì 'was'.",
    },
    {
      id: "cond-3",
      question: "If he _____ harder, he would have succeeded.",
      options: ["worked", "works", "had worked", "has worked"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'had worked'. Câu điều kiện loại 3: If + Past Perfect, would have + V3.",
    },
    {
      id: "cond-4",
      question: "If you heat ice, it _____.",
      options: ["melt", "melts", "will melt", "would melt"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'melts'. Câu điều kiện loại 0 (sự thật hiển nhiên): If + Present, Present.",
    },
    {
      id: "cond-5",
      question: "If I _____ a car, I would drive to work.",
      options: ["have", "had", "will have", "would have"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'had'. Câu điều kiện loại 2: If + Past Simple, would + V.",
    },
    {
      id: "cond-6",
      question: "If she _____ the truth, she wouldn't have been angry.",
      options: ["knows", "knew", "had known", "has known"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'had known'. Câu điều kiện loại 3: If + Past Perfect, would have + V3.",
    },
    {
      id: "cond-7",
      question: "If they invite me, I _____ to the party.",
      options: ["go", "will go", "would go", "went"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'will go'. Câu điều kiện loại 1: If + Present Simple, will + V.",
    },
    {
      id: "cond-8",
      question: "If I _____ rich, I would buy a yacht.",
      options: ["am", "was", "were", "will be"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'were'. Câu điều kiện loại 2, dùng 'were' cho tất cả các ngôi.",
    },
    {
      id: "cond-9",
      question: "If we _____ earlier, we wouldn't have missed the train.",
      options: ["leave", "left", "had left", "have left"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'had left'. Câu điều kiện loại 3: If + Past Perfect, would have + V3.",
    },
    {
      id: "cond-10",
      question: "If you _____ hard, you will pass the exam.",
      options: ["study", "studied", "will study", "would study"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'study'. Câu điều kiện loại 1: If + Present Simple, will + V.",
    },
  ],
};
