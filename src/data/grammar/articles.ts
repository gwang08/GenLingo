import { GrammarTopic } from "./types";

export const ARTICLES_TOPIC: GrammarTopic = {
  slug: "articles",
  title: "Mạo từ (Articles: A, An, The)",
  shortDescription: "Cách dùng a, an, the - điểm ngữ pháp dễ nhầm lẫn nhưng rất quan trọng",
  keyPoints: [
    "A/An: mạo từ không xác định (lần đầu nhắc đến)",
    "A + phụ âm, An + nguyên âm (a, e, i, o, u)",
    "The: mạo từ xác định (đã nhắc đến, duy nhất)",
    "Không dùng mạo từ: danh từ số nhiều nói chung, tên riêng, môn học",
    "Dùng The: nhạc cụ, sông, biển, dãy núi, quốc gia số nhiều",
  ],
  examples: [
    {
      en: "I saw a dog. The dog was black.",
      vi: "Tôi thấy một con chó. Con chó đó màu đen. (a = lần đầu, the = đã nhắc)",
    },
    {
      en: "She is an engineer.",
      vi: "Cô ấy là một kỹ sư. (an + nguyên âm)",
    },
    {
      en: "The sun rises in the east.",
      vi: "Mặt trời mọc ở phía đông. (the = duy nhất)",
    },
    {
      en: "I play the piano but my brother plays football.",
      vi: "Tôi chơi piano nhưng anh tôi chơi bóng đá. (nhạc cụ dùng the, môn thể thao không dùng)",
    },
  ],
  quiz: [
    {
      id: "article-1",
      question: "I have _____ apple and _____ orange.",
      options: ["a / a", "an / an", "a / an", "an / a"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'an / an'. Cả 'apple' và 'orange' đều bắt đầu bằng nguyên âm.",
    },
    {
      id: "article-2",
      question: "_____ earth moves around _____ sun.",
      options: ["The / the", "An / the", "The / a", "A / the"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'The / the'. Cả hai đều là duy nhất trong vũ trụ, dùng 'the'.",
    },
    {
      id: "article-3",
      question: "She is _____ most beautiful girl in the class.",
      options: ["a", "an", "the", "no article"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'the'. Dùng 'the' trước so sánh nhất.",
    },
    {
      id: "article-4",
      question: "I play _____ guitar every day.",
      options: ["a", "an", "the", "no article"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'the'. Nhạc cụ luôn dùng 'the'.",
    },
    {
      id: "article-5",
      question: "My favorite subject is _____ English.",
      options: ["a", "an", "the", "no article"],
      correctIndex: 3,
      explanation: "Đáp án đúng là 'no article'. Tên môn học không dùng mạo từ.",
    },
    {
      id: "article-6",
      question: "_____ Nile is the longest river in the world.",
      options: ["A", "An", "The", "No article"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'The'. Tên sông, biển, đại dương dùng 'the'.",
    },
    {
      id: "article-7",
      question: "He wants to be _____ doctor.",
      options: ["a", "an", "the", "no article"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'a'. Nghề nghiệp dùng a/an (doctor bắt đầu bằng phụ âm).",
    },
    {
      id: "article-8",
      question: "I go to _____ school by bus.",
      options: ["a", "an", "the", "no article"],
      correctIndex: 3,
      explanation: "Đáp án đúng là 'no article'. 'Go to school' (đi học) không dùng mạo từ.",
    },
    {
      id: "article-9",
      question: "_____ Mount Everest is the highest mountain.",
      options: ["A", "An", "The", "No article"],
      correctIndex: 3,
      explanation: "Đáp án đúng là 'No article'. Tên núi đơn lẻ không dùng mạo từ.",
    },
    {
      id: "article-10",
      question: "Can you play _____ football?",
      options: ["a", "an", "the", "no article"],
      correctIndex: 3,
      explanation: "Đáp án đúng là 'no article'. Môn thể thao không dùng mạo từ.",
    },
  ],
};
