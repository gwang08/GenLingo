import { GrammarTopic } from "./types";

export const RELATIVE_CLAUSES_TOPIC: GrammarTopic = {
  slug: "relative-clauses",
  title: "Mệnh đề quan hệ (Relative Clauses)",
  shortDescription: "Sử dụng who, which, that, whose để nối câu và làm rõ nghĩa - rất hay xuất hiện trong đề thi",
  keyPoints: [
    "Who: thay cho người (làm chủ ngữ hoặc tân ngữ)",
    "Which: thay cho vật, động vật",
    "That: thay cho cả người và vật (restrictive clause)",
    "Whose: chỉ sở hữu (whose + N)",
    "Where: chỉ nơi chốn, When: chỉ thời gian, Why: chỉ lý do",
  ],
  examples: [
    {
      en: "The man who is standing there is my teacher.",
      vi: "Người đàn ông đang đứng kia là giáo viên của tôi. (who = người)",
    },
    {
      en: "The book which I bought yesterday is interesting.",
      vi: "Cuốn sách mà tôi mua hôm qua rất thú vị. (which = vật)",
    },
    {
      en: "The girl whose father is a doctor is very smart.",
      vi: "Cô gái mà cha của cô ấy là bác sĩ rất thông minh. (whose = sở hữu)",
    },
    {
      en: "This is the house where I was born.",
      vi: "Đây là ngôi nhà nơi tôi được sinh ra. (where = nơi chốn)",
    },
  ],
  quiz: [
    {
      id: "relative-1",
      question: "The woman _____ lives next door is a teacher.",
      options: ["who", "which", "whose", "where"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'who'. Dùng 'who' để thay thế cho người làm chủ ngữ.",
    },
    {
      id: "relative-2",
      question: "The book _____ you lent me is very interesting.",
      options: ["who", "which", "whose", "what"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'which'. Dùng 'which' để thay thế cho vật làm tân ngữ.",
    },
    {
      id: "relative-3",
      question: "The boy _____ bicycle was stolen reported it to the police.",
      options: ["who", "which", "whose", "that"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'whose'. Dùng 'whose' để chỉ sở hữu (whose + danh từ).",
    },
    {
      id: "relative-4",
      question: "This is the hotel _____ we stayed last summer.",
      options: ["which", "where", "when", "that"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'where'. Dùng 'where' để thay thế cho nơi chốn.",
    },
    {
      id: "relative-5",
      question: "The man _____ I spoke to was very friendly.",
      options: ["who", "which", "whose", "where"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'who'. Dùng 'who' để thay thế cho người làm tân ngữ.",
    },
    {
      id: "relative-6",
      question: "That's the reason _____ he left early.",
      options: ["which", "where", "why", "when"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'why'. Dùng 'why' để chỉ lý do.",
    },
    {
      id: "relative-7",
      question: "The movie _____ we watched last night was boring.",
      options: ["who", "which", "whose", "where"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'which'. Dùng 'which' để thay thế cho vật.",
    },
    {
      id: "relative-8",
      question: "I remember the day _____ we first met.",
      options: ["which", "where", "when", "who"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'when'. Dùng 'when' để chỉ thời gian.",
    },
    {
      id: "relative-9",
      question: "The students _____ study hard will pass the exam.",
      options: ["who", "which", "whose", "where"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'who'. Dùng 'who' để thay thế cho người làm chủ ngữ.",
    },
    {
      id: "relative-10",
      question: "She married a man _____ family is very rich.",
      options: ["who", "which", "whose", "that"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'whose'. Dùng 'whose' để chỉ sở hữu (whose family).",
    },
  ],
};
