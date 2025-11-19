import { GrammarTopic } from "./types";

export const REPORTED_SPEECH_TOPIC: GrammarTopic = {
  slug: "reported-speech",
  title: "Câu tường thuật (Reported Speech)",
  shortDescription: "Chuyển đổi câu trực tiếp sang gián tiếp - kỹ năng quan trọng trong viết và giao tiếp",
  keyPoints: [
    "Lùi thì: Present → Past, Past → Past Perfect",
    "Đổi đại từ: I → he/she, you → I/we, we → they",
    "Đổi trạng từ: now → then, today → that day, here → there",
    "Say/Tell: say (that), tell sb (that)",
    "Câu hỏi: ask/wonder if/whether, ask + Wh-word",
  ],
  examples: [
    {
      en: 'Direct: "I am happy," she said.',
      vi: 'Trực tiếp: "Tôi hạnh phúc," cô ấy nói.',
    },
    {
      en: 'Reported: She said (that) she was happy.',
      vi: 'Gián tiếp: Cô ấy nói rằng cô ấy hạnh phúc.',
    },
    {
      en: 'Direct: "Where do you live?" he asked me.',
      vi: 'Trực tiếp: "Bạn sống ở đâu?" anh ấy hỏi tôi.',
    },
    {
      en: 'Reported: He asked me where I lived.',
      vi: 'Gián tiếp: Anh ấy hỏi tôi rằng tôi sống ở đâu.',
    },
  ],
  quiz: [
    {
      id: "reported-1",
      question: 'She said, "I will go to the party." → She said _____.',
      options: ["she will go to the party", "she would go to the party", "I will go to the party", "I would go to the party"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'she would go to the party'. Lùi thì: will → would, đổi đại từ: I → she.",
    },
    {
      id: "reported-2",
      question: '"Are you coming?" he asked. → He asked me _____.',
      options: ["if I am coming", "if I was coming", "am I coming", "was I coming"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'if I was coming'. Câu hỏi Yes/No dùng if/whether, lùi thì: are → was.",
    },
    {
      id: "reported-3",
      question: '"Don\'t be late!" she told me. → She told me _____.',
      options: ["don't be late", "not to be late", "to not be late", "not be late"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'not to be late'. Câu mệnh lệnh phủ định: tell sb not to do sth.",
    },
    {
      id: "reported-4",
      question: 'Tom said, "I have finished my homework." → Tom said _____.',
      options: ["he has finished his homework", "he had finished his homework", "I have finished my homework", "I had finished his homework"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'he had finished his homework'. Lùi thì: have finished → had finished.",
    },
    {
      id: "reported-5",
      question: '"Where is the station?" she asked. → She asked _____.',
      options: ["where the station is", "where was the station", "where the station was", "where is the station"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'where the station was'. Câu hỏi Wh-: ask + Wh-word + S + V (lùi thì).",
    },
    {
      id: "reported-6",
      question: 'He said, "I am reading a book now." → He said _____.',
      options: ["he was reading a book then", "he is reading a book now", "I was reading a book then", "I am reading a book now"],
      correctIndex: 0,
      explanation: "Đáp án đúng là 'he was reading a book then'. Lùi thì: am reading → was reading, now → then.",
    },
    {
      id: "reported-7",
      question: '"Can you help me?" she asked. → She asked me _____.',
      options: ["can I help her", "if I could help her", "if I can help her", "could I help her"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'if I could help her'. Câu hỏi Yes/No dùng if/whether, lùi thì: can → could.",
    },
    {
      id: "reported-8",
      question: 'Mary said, "I went to the cinema yesterday." → Mary said _____.',
      options: ["she went to the cinema yesterday", "she had gone to the cinema the day before", "I went to the cinema yesterday", "I had gone to the cinema the day before"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'she had gone to the cinema the day before'. Lùi thì: went → had gone, yesterday → the day before.",
    },
    {
      id: "reported-9",
      question: '"Please sit down," he said to me. → He asked me _____.',
      options: ["sit down", "to sit down", "sitting down", "sat down"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'to sit down'. Câu mệnh lệnh khẳng định: ask/tell sb to do sth.",
    },
    {
      id: "reported-10",
      question: 'She asked, "How old are you?" → She asked me _____.',
      options: ["how old I am", "how old I was", "how old am I", "how old was I"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'how old I was'. Câu hỏi Wh-: ask + Wh-word + S + V (lùi thì).",
    },
  ],
};
