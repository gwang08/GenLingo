import { GrammarTopic } from "./types";

export const PHRASAL_VERBS_TOPIC: GrammarTopic = {
  slug: "phrasal-verbs",
  title: "Cụm động từ (Phrasal Verbs)",
  shortDescription: "Các phrasal verbs phổ biến trong đề thi THPT - học thuộc để làm nhanh",
  keyPoints: [
    "Look: look after (chăm sóc), look for (tìm kiếm), look up (tra cứu)",
    "Turn: turn on/off (bật/tắt), turn up/down (tăng/giảm âm lượng)",
    "Give: give up (từ bỏ), give in (đầu hàng), give away (cho đi)",
    "Get: get up (thức dậy), get on/off (lên/xuống xe), get over (vượt qua)",
    "Take: take off (cất cánh), take care of (chăm sóc), take after (giống)",
  ],
  examples: [
    {
      en: "Please look after my cat while I'm away.",
      vi: "Hãy chăm sóc con mèo của tôi khi tôi đi vắng.",
    },
    {
      en: "I'm looking for my keys. Have you seen them?",
      vi: "Tôi đang tìm chìa khóa. Bạn có thấy chúng không?",
    },
    {
      en: "Don't give up! You can do it!",
      vi: "Đừng từ bỏ! Bạn làm được mà!",
    },
    {
      en: "The plane will take off at 10 AM.",
      vi: "Máy bay sẽ cất cánh lúc 10 giờ sáng.",
    },
  ],
  quiz: [
    {
      id: "phrasal-1",
      question: "Can you _____ my dog while I'm on vacation?",
      options: ["look after", "look for", "look at", "look up"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'look after' (chăm sóc).",
    },
    {
      id: "phrasal-2",
      question: "I need to _____ this word in the dictionary.",
      options: ["look after", "look for", "look at", "look up"],
      correctIndex: 3,
      explanation: "Đáp án đúng là 'look up' (tra cứu từ điển).",
    },
    {
      id: "phrasal-3",
      question: "Please _____ the lights when you leave the room.",
      options: ["turn on", "turn off", "turn up", "turn down"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'turn off' (tắt đèn).",
    },
    {
      id: "phrasal-4",
      question: "He decided to _____ smoking for health reasons.",
      options: ["give up", "give in", "give away", "give out"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'give up' (từ bỏ, bỏ).",
    },
    {
      id: "phrasal-5",
      question: "What time do you usually _____ in the morning?",
      options: ["get up", "get on", "get off", "get over"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'get up' (thức dậy).",
    },
    {
      id: "phrasal-6",
      question: "The flight was delayed and didn't _____ until midnight.",
      options: ["take off", "take on", "take in", "take after"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'take off' (cất cánh - máy bay).",
    },
    {
      id: "phrasal-7",
      question: "She _____ her mother in appearance.",
      options: ["takes off", "takes on", "takes after", "takes in"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'takes after' (giống ai đó).",
    },
    {
      id: "phrasal-8",
      question: "I'm _____ my glasses. I can't find them anywhere.",
      options: ["looking after", "looking for", "looking at", "looking up"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'looking for' (tìm kiếm).",
    },
    {
      id: "phrasal-9",
      question: "It took her a long time to _____ the breakup.",
      options: ["get up", "get on", "get off", "get over"],
      correctIndex: 3,
      explanation: "Đáp án đúng là 'get over' (vượt qua, khắc phục).",
    },
    {
      id: "phrasal-10",
      question: "Can you _____ the volume? I can't hear the TV.",
      options: ["turn on", "turn off", "turn up", "turn down"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'turn up' (tăng âm lượng).",
    },
  ],
};
