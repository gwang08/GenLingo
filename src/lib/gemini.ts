import { GoogleGenerativeAI } from "@google/generative-ai";
import { GrammarQuestion } from "@/data/grammar/grammarCore";

// Get API key - will be undefined on server, available on client
const getApiKey = () => {
  if (typeof window === "undefined") {
    // Server-side: Don't throw error, return dummy key
    return "dummy-key-for-ssr";
  }
  
  // Client-side: Get real key
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error(
      "❌ Missing NEXT_PUBLIC_GEMINI_API_KEY in .env.local file!\n" +
      "Please add: NEXT_PUBLIC_GEMINI_API_KEY=your-key-here"
    );
  }
  
  console.log("🔑 Gemini API Key loaded:", apiKey.substring(0, 10) + "...");
  return apiKey;
};

const genAI = new GoogleGenerativeAI(getApiKey());

export async function explainAnswer(
  question: string,
  correctAnswer: string,
  userAnswer: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Bạn là một giáo viên tiếng Anh giỏi. Học sinh đã trả lời sai câu hỏi sau:

Câu hỏi: ${question}
Đáp án đúng: ${correctAnswer}
Đáp án của học sinh: ${userAnswer}

Hãy giải thích ngắn gọn (2-3 câu) bằng tiếng Việt:
1. Tại sao đáp án đúng là "${correctAnswer}"
2. Một ví dụ minh họa đơn giản
3. Một mẹo nhớ ngắn gọn

Trả lời ngắn gọn, dễ hiểu, thân thiện.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Không thể tải giải thích từ AI. Vui lòng thử lại sau.";
  }
}

export async function generateMoreQuestions(
  topicTitle: string,
  topicDescription: string,
  existingQuestions: GrammarQuestion[]
): Promise<GrammarQuestion[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Lấy sample từ câu hỏi cũ để AI hiểu format
    const sampleQuestions = existingQuestions.slice(0, 2);
    const sampleJson = JSON.stringify(sampleQuestions, null, 2);

    const prompt = `
Bạn là một giáo viên tiếng Anh giỏi. Hãy tạo 10 câu hỏi trắc nghiệm MỚI về chủ đề:

Tên chủ đề: ${topicTitle}
Mô tả: ${topicDescription}

YÊU CẦU:
1. Tạo 10 câu hỏi HOÀN TOÀN MỚI (không trùng với câu hỏi cũ)
2. Mỗi câu có 4 đáp án (options)
3. Format JSON như mẫu dưới đây
4. Câu hỏi phù hợp với học sinh THPT Việt Nam
5. Độ khó từ dễ đến trung bình
6. Có giải thích (explanation) bằng tiếng Việt

FORMAT MẪU:
${sampleJson}

Chỉ trả về JSON array của 10 câu hỏi mới, không có text thừa. Đảm bảo:
- "id" là unique string (dùng timestamp + random)
- "question" là câu hỏi tiếng Anh  
- "options" là array 4 đáp án
- "correctIndex" là số từ 0-3
- "explanation" giải thích ngắn gọn bằng tiếng Việt

Trả về ĐÚNG format JSON, bắt đầu bằng [ và kết thúc bằng ].
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonText = response.text().trim();

    // Clean up response - remove markdown code blocks if present
    jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const newQuestions: GrammarQuestion[] = JSON.parse(jsonText);

    // Validate and assign unique IDs
    return newQuestions.map((q, index) => ({
      ...q,
      id: `ai-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
    }));
  } catch (error) {
    console.error("Generate Questions Error:", error);
    throw new Error("Không thể tạo câu hỏi mới. Vui lòng thử lại sau.");
  }
}

// Leaderboard AI Generation
export interface LeaderboardUser {
  id: string;
  name: string;
  score: number;
  avatar: string;
  level: number;
  streak: number;
}

export async function generateLeaderboard(
  userScore: number
): Promise<LeaderboardUser[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Bạn là một game designer. Hãy tạo bảng xếp hạng cho app học tiếng Anh THPT.

THÔNG TIN:
- Điểm của user hiện tại: ${userScore}
- Cần tạo 10 người chơi (leaderboard top 10)

YÊU CẦU:
1. Tạo 10 người với tên người Việt Nam thực tế (đa dạng)
2. Điểm số (score) từ ${Math.max(userScore + 50, 500)} đến ${Math.max(userScore + 500, 2000)} (cao hơn user để tạo động lực)
3. Level từ 1-20 (tương ứng với điểm)
4. Streak từ 1-30 ngày
5. Avatar là chữ cái đầu của tên (VD: "Nguyễn Văn A" → "NVA")

FORMAT JSON (chỉ trả về array, không text thừa):
[
  {
    "id": "unique-id-1",
    "name": "Nguyễn Văn An",
    "score": 1850,
    "avatar": "NVA",
    "level": 15,
    "streak": 12
  },
  ...
]

Sắp xếp từ cao xuống thấp theo score.
Đảm bảo score giảm dần, không có 2 người cùng điểm.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonText = response.text().trim();

    // Clean up response
    jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const users: LeaderboardUser[] = JSON.parse(jsonText);

    // Sort by score descending
    return users.sort((a, b) => b.score - a.score).slice(0, 10);
  } catch (error) {
    console.error("Generate Leaderboard Error:", error);
    // Fallback to simple mock if API fails
    return generateFallbackLeaderboard(userScore);
  }
}

function generateFallbackLeaderboard(userScore: number): LeaderboardUser[] {
  const names = [
    "Nguyễn Văn Minh",
    "Trần Thị Hương",
    "Lê Hoàng Long",
    "Phạm Thu Hà",
    "Hoàng Minh Tuấn",
    "Đặng Thị Lan",
    "Vũ Đức Anh",
    "Bùi Thị Mai",
    "Đỗ Quang Hải",
    "Ngô Thị Linh",
  ];

  return names.map((name, index) => {
    const score = Math.max(userScore + 500 - index * 50, 100);
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");

    return {
      id: `user-${index + 1}`,
      name,
      score,
      avatar: initials,
      level: Math.floor(score / 100) + 1,
      streak: Math.floor(Math.random() * 20) + 1,
    };
  });
}

// Daily Mini Lesson AI Generation
export interface DailyMiniLesson {
  date: string;
  title: string;
  description: string;
  keyPoint: string;
  examples: Array<{ en: string; vi: string }>;
  tip: string;
  quiz: GrammarQuestion[];
}

export async function generateDailyMiniLesson(
  date: string
): Promise<DailyMiniLesson> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Bạn là một giáo viên tiếng Anh chuyên nghiệp. Hãy tạo 1 bài học ngắn (mini lesson) cho học sinh THPT ôn thi Quốc gia.

NGÀY: ${date}

YÊU CẦU:
1. Chọn 1 điểm ngữ pháp QUAN TRỌNG, THƯỜNG GẶP trong đề thi THPT
2. Giải thích NGẮN GỌN, DỄ HIỂU (2-3 câu)
3. Đưa 3 ví dụ thực tế (tiếng Anh + dịch tiếng Việt)
4. 1 mẹo nhớ (tip) hữu ích
5. 5 câu quiz kiểm tra nhanh

CHỦ ĐỀ NÊN CHỌN (random 1 trong số này):
- Sự khác biệt: Who vs Which
- Khi nào dùng 'ing' sau giới từ
- Make vs Do: Phân biệt dễ dàng
- So sánh hơn và nhất
- Thì hiện tại hoàn thành vs quá khứ đơn
- Unless vs If not
- Although vs Despite
- Few vs Little
- Used to vs Be used to
- Đại từ quan hệ

FORMAT JSON (chỉ trả về JSON, không text thừa):
{
  "date": "${date}",
  "title": "Tên bài học ngắn gọn",
  "description": "Giải thích 2-3 câu",
  "keyPoint": "Điểm chính cần nhớ",
  "examples": [
    { "en": "Câu tiếng Anh", "vi": "Dịch tiếng Việt" },
    { "en": "Câu tiếng Anh", "vi": "Dịch tiếng Việt" },
    { "en": "Câu tiếng Anh", "vi": "Dịch tiếng Việt" }
  ],
  "tip": "Mẹo nhớ hữu ích",
  "quiz": [
    {
      "id": "q1",
      "question": "Câu hỏi tiếng Anh",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "Giải thích ngắn"
    },
    ... (5 câu)
  ]
}

Trả về ĐÚNG format JSON, bắt đầu bằng { và kết thúc bằng }.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonText = response.text().trim();

    // Clean up response
    jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const lesson: DailyMiniLesson = JSON.parse(jsonText);

    // Assign unique IDs to quiz questions
    lesson.quiz = lesson.quiz.map((q, index) => ({
      ...q,
      id: `daily-${date}-${index}`,
    }));

    return lesson;
  } catch (error) {
    console.error("Generate Daily Lesson Error:", error);
    throw new Error("Không thể tạo bài học. Vui lòng thử lại sau.");
  }
}

// Achievement Motivational Message AI
export async function generateAchievementMessage(
  achievementTitle: string,
  achievementDescription: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Bạn là một HLV động viên học sinh. Hãy tạo 1 câu ĐỘNG VIÊN ngắn gọn (1-2 câu) khi học sinh đạt thành tích:

Thành tích: ${achievementTitle}
Mô tả: ${achievementDescription}

YÊU CẦU:
- Ngắn gọn, súc tích (tối đa 2 câu)
- Nhiệt tình, tích cực
- Phù hợp học sinh THPT Việt Nam
- Có emoji phù hợp
- Khuyến khích tiếp tục học tập

Chỉ trả về câu động viên, không format khác.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Generate Achievement Message Error:", error);
    // Fallback message
    return `Chúc mừng! Bạn đã đạt thành tích "${achievementTitle}"! Tiếp tục phát huy nhé! 🎉`;
  }
}

// Grammar Topic Generator AI
export interface AIGrammarTopic {
  slug: string;
  title: string;
  shortDescription: string;
  keyPoints: string[];
  examples: Array<{ en: string; vi: string }>;
  quiz: GrammarQuestion[];
}

export async function generateGrammarTopic(
  topicTitle: string,
  difficulty: "easy" | "medium" | "hard" = "medium"
): Promise<AIGrammarTopic> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const difficultyDesc = {
      easy: "dễ, cơ bản, phù hợp mới bắt đầu",
      medium: "trung bình, phù hợp lớp 11-12",
      hard: "nâng cao, phù hợp ôn thi THPT Quốc gia",
    };

    const prompt = `
Bạn là giáo viên tiếng Anh chuyên nghiệp. Hãy tạo 1 chuyên đề ngữ pháp hoàn chỉnh.

CHỦ ĐỀ: ${topicTitle}
ĐỘ KHÓ: ${difficultyDesc[difficulty]}

YÊU CẦU:
1. Giải thích ngắn gọn (2-3 câu)
2. 3-5 điểm chính cần nhớ
3. 5 ví dụ minh họa (tiếng Anh + dịch Việt)
4. 10 câu quiz trắc nghiệm
5. Phù hợp học sinh THPT Việt Nam

FORMAT JSON (chỉ trả về JSON, không text thừa):
{
  "slug": "slug-cua-chuyen-de",
  "title": "${topicTitle}",
  "shortDescription": "Mô tả ngắn 2-3 câu",
  "keyPoints": [
    "Điểm 1",
    "Điểm 2",
    "Điểm 3"
  ],
  "examples": [
    { "en": "Example sentence", "vi": "Câu ví dụ dịch" },
    { "en": "Example sentence", "vi": "Câu ví dụ dịch" },
    { "en": "Example sentence", "vi": "Câu ví dụ dịch" },
    { "en": "Example sentence", "vi": "Câu ví dụ dịch" },
    { "en": "Example sentence", "vi": "Câu ví dụ dịch" }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Câu hỏi tiếng Anh",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "Giải thích ngắn"
    },
    ... (10 câu)
  ]
}

Trả về ĐÚNG format JSON.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonText = response.text().trim();

    // Clean up
    jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const topic: AIGrammarTopic = JSON.parse(jsonText);

    // Assign unique IDs
    topic.quiz = topic.quiz.map((q, index) => ({
      ...q,
      id: `${topic.slug}-${index}`,
    }));

    return topic;
  } catch (error) {
    console.error("Generate Grammar Topic Error:", error);
    throw new Error("Không thể tạo chuyên đề. Vui lòng thử lại sau.");
  }
}
