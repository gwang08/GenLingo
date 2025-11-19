import { GrammarTopic } from "./types";

export const TENSES_TOPIC: GrammarTopic = {
  slug: "tenses",
  title: "Thì trong tiếng Anh",
  shortDescription: "Nắm vững 12 thì cơ bản trong tiếng Anh - nền tảng ngữ pháp quan trọng nhất",
  keyPoints: [
    "Present Simple: Diễn tả thói quen, sự thật hiển nhiên",
    "Present Continuous: Hành động đang diễn ra",
    "Present Perfect: Hành động đã hoàn thành, ảnh hưởng đến hiện tại",
    "Past Simple: Hành động đã xảy ra và kết thúc trong quá khứ",
    "Future Simple: Dự đoán, quyết định tức thời về tương lai",
  ],
  examples: [
    {
      en: "I study English every day.",
      vi: "Tôi học tiếng Anh mỗi ngày. (Present Simple - thói quen)",
    },
    {
      en: "She is reading a book now.",
      vi: "Cô ấy đang đọc sách bây giờ. (Present Continuous - đang diễn ra)",
    },
    {
      en: "They have finished their homework.",
      vi: "Họ đã hoàn thành bài tập. (Present Perfect - đã hoàn thành)",
    },
    {
      en: "We went to the cinema yesterday.",
      vi: "Chúng tôi đã đi xem phim hôm qua. (Past Simple - quá khứ)",
    },
  ],
  quiz: [
    {
      id: "tenses-1",
      question: "She _____ to school every morning.",
      options: ["go", "goes", "going", "gone"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'goes'. Với chủ ngữ số ít (she) ở thì hiện tại đơn, động từ cần thêm 's/es'.",
    },
    {
      id: "tenses-2",
      question: "They _____ a movie right now.",
      options: ["watch", "watches", "are watching", "watched"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'are watching'. 'Right now' là dấu hiệu của thì hiện tại tiếp diễn.",
    },
    {
      id: "tenses-3",
      question: "I _____ my homework yesterday.",
      options: ["finish", "finished", "have finished", "am finishing"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'finished'. 'Yesterday' là dấu hiệu của thì quá khứ đơn.",
    },
    {
      id: "tenses-4",
      question: "We _____ each other for 5 years.",
      options: ["know", "knew", "have known", "are knowing"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'have known'. 'For 5 years' là dấu hiệu của thì hiện tại hoàn thành.",
    },
    {
      id: "tenses-5",
      question: "He _____ to London next week.",
      options: ["goes", "went", "will go", "is going"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'will go'. 'Next week' là dấu hiệu của thì tương lai đơn.",
    },
    {
      id: "tenses-6",
      question: "While I _____ TV, the phone rang.",
      options: ["watch", "was watching", "watched", "am watching"],
      correctIndex: 1,
      explanation: "Đáp án đúng là 'was watching'. 'While' + quá khứ tiếp diễn.",
    },
    {
      id: "tenses-7",
      question: "She _____ breakfast when I called her.",
      options: ["has", "had", "was having", "is having"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'was having'. Hành động đang diễn ra trong quá khứ khi có hành động khác xen vào.",
    },
    {
      id: "tenses-8",
      question: "They _____ in this city since 2010.",
      options: ["live", "lived", "have lived", "are living"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'have lived'. 'Since 2010' là dấu hiệu của thì hiện tại hoàn thành.",
    },
    {
      id: "tenses-9",
      question: "By the time you arrive, I _____ my work.",
      options: ["finish", "will finish", "will have finished", "am finishing"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'will have finished'. 'By the time' dùng với thì tương lai hoàn thành.",
    },
    {
      id: "tenses-10",
      question: "Look! The children _____ in the park.",
      options: ["play", "plays", "are playing", "played"],
      correctIndex: 2,
      explanation: "Đáp án đúng là 'are playing'. 'Look!' là dấu hiệu của thì hiện tại tiếp diễn.",
    },
  ],
};
