import { GrammarTopic } from "./types";

export const PASSIVE_VOICE_TOPIC: GrammarTopic = {
  slug: "passive-voice",
  title: "Câu bị động",
  shortDescription: "Chuyển đổi câu chủ động sang bị động - kỹ năng cần thiết trong viết và đọc hiểu",
  keyPoints: [
    "Cấu trúc: S + be + V3/ed + (by O)",
    "Present Simple: am/is/are + V3",
    "Past Simple: was/were + V3",
    "Present Perfect: has/have been + V3",
    "Modal verbs: can/will/must + be + V3",
  ],
  examples: [
    {
      en: "Active: People speak English all over the world.",
      vi: "Chủ động: Mọi người nói tiếng Anh khắp thế giới.",
    },
    {
      en: "Passive: English is spoken all over the world.",
      vi: "Bị động: Tiếng Anh được nói khắp thế giới.",
    },
    {
      en: "Active: They built this house in 1990.",
      vi: "Chủ động: Họ xây ngôi nhà này năm 1990.",
    },
    {
      en: "Passive: This house was built in 1990.",
      vi: "Bị động: Ngôi nhà này được xây năm 1990.",
    },
  ],
  quiz: [
    {
      id: "passive-1",
      question: "The book _____ by millions of people every year.",
      options: ["reads", "is read", "was read", "has read"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'is read'. Câu bị động thì hiện tại đơn: is/am/are + V3.",
    },
    {
      id: "passive-2",
      question: "This letter _____ yesterday.",
      options: ["is written", "was written", "has written", "writes"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'was written'. Câu bị động thì quá khứ đơn với 'yesterday': was/were + V3.",
    },
    {
      id: "passive-3",
      question: "The homework must _____ before Friday.",
      options: ["finish", "be finished", "finished", "be finishing"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'be finished'. Với modal verb: must + be + V3.",
    },
    {
      id: "passive-4",
      question: "English _____ all over the world.",
      options: ["speaks", "is spoken", "was spoken", "has spoken"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'is spoken'. Câu bị động thì hiện tại đơn: is/am/are + V3.",
    },
    {
      id: "passive-5",
      question: "The house _____ in 1990.",
      options: ["built", "was built", "is built", "has built"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'was built'. Câu bị động thì quá khứ đơn: was/were + V3.",
    },
    {
      id: "passive-6",
      question: "The report _____ by tomorrow.",
      options: ["will finish", "will be finished", "is finished", "was finished"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'will be finished'. Câu bị động thì tương lai: will + be + V3.",
    },
    {
      id: "passive-7",
      question: "This car _____ by my father last year.",
      options: ["buys", "bought", "was bought", "is bought"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'was bought'. Câu bị động thì quá khứ đơn: was/were + V3.",
    },
    {
      id: "passive-8",
      question: "The window _____ by the children.",
      options: ["breaks", "broke", "was broken", "is breaking"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'was broken'. Câu bị động thì quá khứ đơn: was/were + V3.",
    },
    {
      id: "passive-9",
      question: "These questions can _____ easily.",
      options: ["answer", "be answered", "answered", "be answering"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'be answered'. Với modal verb: can + be + V3.",
    },
    {
      id: "passive-10",
      question: "The project has _____ successfully.",
      options: ["complete", "completed", "been completed", "be completed"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'been completed'. Câu bị động thì hiện tại hoàn thành: has/have + been + V3.",
    },
  ],
};
