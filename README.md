# Luyện thi Tiếng Anh THPT 2025

Ứng dụng web học tiếng Anh dành cho học sinh ôn thi THPT Quốc Gia 2025 - Mobile-first, PWA enabled, với Gamification đầy đủ.

## Tính năng chính

- Học Ngữ pháp theo chuyên đề: Lý thuyết chi tiết, ví dụ song ngữ, bài tập thực hành
- Quiz tổng hợp: Câu hỏi trắc nghiệm ngẫu nhiên từ tất cả chuyên đề
- AI Explanation: Giải thích thông minh bằng Gemini AI khi trả lời sai
- PWA Support: Cài đặt như app native, hoạt động offline
- UI đẹp với Ant Design: Responsive, tối ưu cho mobile
- Không cần backend: Hoàn toàn static, deploy dễ dàng

## Gamification Features

### Streak System (Chuỗi học liên tục)
- Theo dõi số ngày học liên tục
- Hiển thị progress bar đến milestone tiếp theo
- Badges cho các mốc: 3 ngày, 7 ngày, 30 ngày
- Lưu kỷ lục chuỗi dài nhất

### Achievement System (Hệ thống thành tích)
- 10+ achievements để mở khóa
- Confetti animation khi unlock achievement mới
- Hiển thị collection badges đẹp mắt
- Tabs phân loại: Tất cả / Đã mở / Chưa mở

### Progress Dashboard
- Thống kê tổng hợp: tổng câu hỏi, đúng, sai, độ chính xác
- Card stats với icons màu sắc
- Theo dõi topics đã hoàn thành
- Perfect scores counter

### Dark Mode
- Toggle sáng/tối mượt mà
- Lưu preference vào localStorage
- Icon đẹp với animation

### Confetti Effects
- Khi đạt 100% quiz - Big celebration
- Khi đạt 80%+ - Small celebration
- Khi mở khóa achievement mới

### Framer Motion Animations
- Page transitions mượt mà
- Hover effects trên cards
- Stagger animations cho lists
- Scale animations cho interactions

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Ant Design** + **Tailwind CSS**
- **Google Gemini AI**
- **Next PWA**
- **Vercel Analytics**
- **Framer Motion** - Animations
- **React Confetti** - Celebration effects
- **LocalStorage** - Persistent user data

## Cài đặt và Chạy

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình Environment Variables

Tạo file `.env.local`:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

Lấy API key miễn phí tại: https://makersuite.google.com/app/apikey

### 3. Chạy Development Server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

### 4. Build Production

```bash
npm run build
npm start
```

## PWA Features

- Installable (Add to Home Screen)
- Offline support
- Auto-update service worker
- App-like experience

## Gemini AI Integration

Khi học sinh chọn sai đáp án, có thể nhấn **"Giải thích thông minh bằng AI"** để nhận giải thích chi tiết.

## Deploy lên Vercel

```bash
npm install -g vercel
vercel
```

Nhớ set environment variable `NEXT_PUBLIC_GEMINI_API_KEY` trong Vercel dashboard.

---

Made with cho kỳ thi THPT Quốc Gia 2025
