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

// ============= RATE LIMITING & CACHING =============

// Rate limiting: Giới hạn số lần gọi API
const API_CALL_LIMIT = {
  maxCalls: 10, // Tối đa 10 calls
  windowMs: 60 * 1000, // Trong 1 phút
};

let apiCallHistory: number[] = [];

function checkRateLimit(): boolean {
  const now = Date.now();
  // Xóa các calls cũ ngoài window
  apiCallHistory = apiCallHistory.filter(time => now - time < API_CALL_LIMIT.windowMs);
  
  if (apiCallHistory.length >= API_CALL_LIMIT.maxCalls) {
    console.warn("⚠️ Rate limit reached. Please wait before making more requests.");
    return false;
  }
  
  apiCallHistory.push(now);
  return true;
}

// Cache responses để tránh gọi lại
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const responseCache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 phút

function getCached<T>(key: string): T | null {
  const cached = responseCache.get(key);
  if (!cached) return null;
  
  const now = Date.now();
  if (now - cached.timestamp > CACHE_TTL) {
    responseCache.delete(key);
    return null;
  }
  
  console.log("✅ Cache hit for:", key.substring(0, 50) + "...");
  return cached.data as T;
}

function setCache<T>(key: string, data: T): void {
  responseCache.set(key, { data, timestamp: Date.now() });
}

export async function explainAnswer(
  question: string,
  correctAnswer: string,
  userAnswer: string
): Promise<string> {
  // Check rate limit
  if (!checkRateLimit()) {
    return "⏰ Bạn đã dùng quá nhiều lượt giải thích. Vui lòng đợi 1 phút.";
  }

  // Check cache
  const cacheKey = `explain:${question}:${correctAnswer}:${userAnswer}`;
  const cached = getCached<string>(cacheKey);
  if (cached) return cached;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Prompt rút gọn để tiết kiệm token
    const prompt = `Giải thích ngắn (2-3 câu) bằng tiếng Việt:
Câu hỏi: ${question}
Đáp án đúng: ${correctAnswer}
Học sinh chọn: ${userAnswer}

Giải thích: 1) Tại sao đúng "${correctAnswer}", 2) Ví dụ, 3) Mẹo nhớ.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Cache result
    setCache(cacheKey, text);
    
    return text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Không thể tải giải thích. Vui lòng thử lại sau.";
  }
}

export async function generateMoreQuestions(
  topicTitle: string,
  topicDescription: string,
  existingQuestions: GrammarQuestion[]
): Promise<GrammarQuestion[]> {
  // Check rate limit
  if (!checkRateLimit()) {
    throw new Error("⏰ Đã đạt giới hạn tạo câu hỏi. Vui lòng đợi 1 phút.");
  }

  // Check cache
  const cacheKey = `questions:${topicTitle}`;
  const cached = getCached<GrammarQuestion[]>(cacheKey);
  if (cached) return cached;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Lấy sample ngắn gọn
    const sampleQuestions = existingQuestions.slice(0, 1);
    const sampleJson = JSON.stringify(sampleQuestions, null, 2);

    // Prompt rút gọn
    const prompt = `Tạo 10 câu hỏi trắc nghiệm MỚI về: ${topicTitle}
Mô tả: ${topicDescription}

Format mẫu:
${sampleJson}

Yêu cầu: 10 câu, 4 đáp án, có giải thích tiếng Việt, phù hợp THPT.
Trả về JSON array, bắt đầu bằng [, kết thúc bằng ].`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonText = response.text().trim();

    // Clean up response
    jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const newQuestions: GrammarQuestion[] = JSON.parse(jsonText);

    // Validate and assign unique IDs
    const questions = newQuestions.map((q, index) => ({
      ...q,
      id: `ai-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
    }));
    
    // Cache result
    setCache(cacheKey, questions);
    
    return questions;
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
  // Check rate limit
  if (!checkRateLimit()) {
    console.warn("Rate limit reached, using fallback leaderboard");
    return generateFallbackLeaderboard(userScore);
  }

  // Check cache
  const cacheKey = `leaderboard:${Math.floor(userScore / 100)}`;
  const cached = getCached<LeaderboardUser[]>(cacheKey);
  if (cached) return cached;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Prompt rút gọn
    const prompt = `Tạo top 10 bảng xếp hạng app học tiếng Anh THPT.
Điểm user: ${userScore}
Tạo 10 người với tên Việt, điểm từ ${Math.max(userScore + 50, 500)} đến ${Math.max(userScore + 500, 2000)}, level 1-20, streak 1-30.

Format JSON:
[{"id":"id","name":"Tên","score":1850,"avatar":"T","level":15,"streak":12}]

Sắp xếp giảm dần theo score.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonText = response.text().trim();

    jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const users: LeaderboardUser[] = JSON.parse(jsonText);
    const sortedUsers = users.sort((a, b) => b.score - a.score).slice(0, 10);
    
    // Cache result
    setCache(cacheKey, sortedUsers);
    
    return sortedUsers;
  } catch (error) {
    console.error("Generate Leaderboard Error:", error);
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
  // Check rate limit
  if (!checkRateLimit()) {
    throw new Error("⏰ Đã đạt giới hạn tạo bài học. Vui lòng đợi 1 phút.");
  }

  // Check cache (cache theo ngày)
  const cacheKey = `lesson:${date}`;
  const cached = getCached<DailyMiniLesson>(cacheKey);
  if (cached) return cached;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Prompt rút gọn
    const prompt = `Tạo 1 bài học ngắn ngữ pháp THPT cho ngày ${date}.

Chọn 1 chủ đề: Who vs Which, 'ing' sau giới từ, Make vs Do, So sánh, Present Perfect vs Past Simple, Unless vs If not, Although vs Despite, Few vs Little, Used to, Đại từ quan hệ.

Format JSON:
{
  "date":"${date}",
  "title":"Tên bài",
  "description":"2-3 câu",
  "keyPoint":"Điểm chính",
  "examples":[{"en":"...","vi":"..."}],
  "tip":"Mẹo nhớ",
  "quiz":[{"id":"q1","question":"...","options":[],"correctIndex":0,"explanation":"..."}]
}

3 ví dụ, 5 câu quiz. Trả về JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonText = response.text().trim();

    jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const lesson: DailyMiniLesson = JSON.parse(jsonText);

    // Assign unique IDs to quiz questions
    lesson.quiz = lesson.quiz.map((q, index) => ({
      ...q,
      id: `daily-${date}-${index}`,
    }));
    
    // Cache result (dài hạn vì theo ngày)
    setCache(cacheKey, lesson);
    
    return lesson;
  } catch (error) {
    console.error("Generate Daily Lesson Error:", error);
    throw new Error("Không thể tạo bài học. Vui lòng thử lại sau.");
  }
}

// Achievement Motivational Message AI
export async function generateAchievementMessage(
  achievementTitle: string,
  _achievementDescription: string
): Promise<string> {
  // Check rate limit
  if (!checkRateLimit()) {
    return `Chúc mừng! Bạn đã đạt "${achievementTitle}"! Tiếp tục phát huy! 🎉`;
  }

  // Check cache
  const cacheKey = `achievement:${achievementTitle}`;
  const cached = getCached<string>(cacheKey);
  if (cached) return cached;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Tạo 1 câu động viên (1-2 câu) khi học sinh đạt:
Thành tích: ${achievementTitle}

Yêu cầu: Ngắn gọn, nhiệt tình, có emoji, phù hợp THPT Việt Nam.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Cache result
    setCache(cacheKey, text);
    
    return text;
  } catch (error) {
    console.error("Generate Achievement Message Error:", error);
    return `Chúc mừng! Bạn đã đạt "${achievementTitle}"! Tiếp tục phát huy! 🎉`;
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
  // Check rate limit
  if (!checkRateLimit()) {
    throw new Error("⏰ Đã đạt giới hạn tạo chuyên đề. Vui lòng đợi 1 phút.");
  }

  // Check cache
  const cacheKey = `topic:${topicTitle}:${difficulty}`;
  const cached = getCached<AIGrammarTopic>(cacheKey);
  if (cached) return cached;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const difficultyMap = {
      easy: "dễ",
      medium: "trung bình lớp 11-12",
      hard: "nâng cao THPT",
    };

    // Prompt rút gọn
    const prompt = `Tạo chuyên đề ngữ pháp: ${topicTitle}
Độ khó: ${difficultyMap[difficulty]}

Format JSON:
{
  "slug":"slug",
  "title":"${topicTitle}",
  "shortDescription":"2-3 câu",
  "keyPoints":["Điểm 1","Điểm 2","Điểm 3"],
  "examples":[{"en":"...","vi":"..."}],
  "quiz":[{"id":"q1","question":"...","options":[],"correctIndex":0,"explanation":"..."}]
}

3-5 keyPoints, 5 examples, 10 quiz. Trả về JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonText = response.text().trim();

    jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const topic: AIGrammarTopic = JSON.parse(jsonText);

    // Assign unique IDs
    topic.quiz = topic.quiz.map((q, index) => ({
      ...q,
      id: `${topic.slug}-${index}`,
    }));
    
    // Cache result
    setCache(cacheKey, topic);
    
    return topic;
  } catch (error) {
    console.error("Generate Grammar Topic Error:", error);
    throw new Error("Không thể tạo chuyên đề. Vui lòng thử lại sau.");
  }
}
